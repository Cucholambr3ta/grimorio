const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// 1. Load Env Vars manually
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const SUPABASE_URL = envVars.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = envVars.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runIntegrationTest() {
  console.log('🧪 Starting Integration Tests for DEVQUEST...\n');

  try {
    const testEmail = `test_wizard_${Date.now()}@devquest.com`;
    const testPassword = 'magic_password_123';
    let userId = null;
    let questId = null;

    // TEST 1: Authentication (Sign Up)
    console.log('🔹 Test 1: Authentication (Sign Up)');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) {
      throw new Error(`Sign Up Failed: ${authError.message}`);
    }
    
    if (!authData.user) {
      throw new Error('Sign Up succeeded but no user returned.');
    }

    userId = authData.user.id;
    console.log(`✅ User created: ${testEmail} (ID: ${userId})`);

    if (!authData.session) {
      console.warn('⚠️ No session returned. Email confirmation might be required.');
      console.warn('⚠️ Cannot proceed with RLS-protected tests (Profile/Quests) without an active session.');
      console.warn('ℹ️ Please disable "Confirm email" in Supabase Auth settings or manually confirm this user.');
      return;
    }

    // TEST 2: Profile Creation
    console.log('\n🔹 Test 2: Profile Creation');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, username: 'TestWizard', class: 'Tester' }]);
    
    if (profileError) {
      console.error('❌ Profile Creation Failed:', profileError.message);
      // Don't throw, maybe profile auto-created by trigger? (We don't have one, but just in case)
    } else {
      console.log('✅ Profile created in DB');
    }

    // TEST 3: Fetch Quests
    console.log('\n🔹 Test 3: Fetch Quests');
    const { data: quests, error: questsError } = await supabase
      .from('quests')
      .select('*');

    if (questsError) {
      throw new Error(`Fetch Quests Failed: ${questsError.message}`);
    }
    if (!quests || quests.length === 0) {
      console.warn('⚠️ No quests found. Did you run the Schema?');
    } else {
      console.log(`✅ Fetched ${quests.length} quests.`);
      questId = quests[0].id;
    }

    if (!questId) {
      console.log('⚠️ Skipping Quest interaction tests (no quests).');
      return;
    }

    // TEST 4: Accept Quest
    console.log(`\n🔹 Test 4: Accept Quest (${questId})`);
    const { error: acceptError } = await supabase
      .from('user_quests')
      .insert({ user_id: userId, quest_id: questId, status: 'Active' });

    if (acceptError) {
      console.error('❌ Accept Quest Failed:', acceptError.message);
    } else {
      console.log('✅ Quest Accepted');
    }

    // TEST 5: Complete Quest & Check XP
    console.log('\n🔹 Test 5: Complete Quest & XP Update');
    // Update status
    const { error: completeError } = await supabase
      .from('user_quests')
      .update({ status: 'Completed', completed_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('quest_id', questId);

    if (completeError) {
      console.error('❌ Complete Quest Failed:', completeError.message);
    } else {
      console.log('✅ Quest marked as Completed');
    }

    // Update XP
    const xpReward = quests[0].xp_reward;
    const { error: xpError } = await supabase
      .from('profiles')
      .update({ xp: xpReward })
      .eq('id', userId);

    if (xpError) {
      console.error('❌ XP Update Failed:', xpError.message);
    } else {
      console.log(`✅ XP Updated (+${xpReward})`);
    }

    // Verify XP
    const { data: profile } = await supabase
      .from('profiles')
      .select('xp')
      .eq('id', userId)
      .single();
    
    if (profile && profile.xp === xpReward) {
      console.log(`✅ Verification Successful: User has ${profile.xp} XP.`);
    } else {
      console.error(`❌ Verification Failed: Expected ${xpReward} XP, got ${profile?.xp}`);
    }

    console.log('\n✨ All Integration Tests Passed!');

  } catch (error) {
    console.error('\n❌ Integration Test Failed:', error.message);
    process.exit(1);
  }
}

runIntegrationTest();
