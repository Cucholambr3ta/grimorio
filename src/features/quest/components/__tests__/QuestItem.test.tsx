import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuestItem } from '../QuestItem';
import { Quest } from '../../domain/Quest';

const mockQuest: Quest = {
  id: '1',
  title: 'Defeat the Bug',
  description: 'A nasty bug is eating the production database.',
  difficulty: 'Hard',
  xpReward: 500,
  status: 'AVAILABLE'
};

describe('QuestItem', () => {
  it('renders quest title and xp reward', () => {
    const { getByText } = render(<QuestItem quest={mockQuest} onPress={() => {}} />);
    
    expect(getByText('Defeat the Bug')).toBeTruthy();
    expect(getByText('500 XP')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<QuestItem quest={mockQuest} onPress={onPressMock} />);
    
    fireEvent.press(getByText('Defeat the Bug'));
    
    expect(onPressMock).toHaveBeenCalledWith(mockQuest);
  });
});
