# ⚒️ El Manual del Artificiero (Deployment Guide)

Este documento contiene los encantamientos necesarios para invocar (ejecutar) y desplegar el proyecto DEVQUEST.

## 📦 Requisitos Previos (The Ingredients)

Asegúrate de tener instaladas las siguientes herramientas en tu taller:
*   **Node.js** (v18 o superior)
*   **npm** o **yarn**
*   **Expo Go** en tu dispositivo móvil (iOS/Android) o un Emulador configurado.

## ⚡ Invocación Local (Development)

Para despertar el Grimorio en tu entorno local:

1.  **Instalar Dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar el Servidor de Metro**:
    ```bash
    npx expo start
    ```

3.  **Abrir el Portal**:
    *   Escanea el código QR con tu móvil (usando Expo Go).
    *   Presiona `a` para abrir en Android Emulator.
    *   Presiona `i` para abrir en iOS Simulator.

4.  **Versión Web**:
    Si prefieres invocar el portal en tu navegador:
    ```bash
    npm run web
    ```
    O presiona `w` en la terminal después de `npm start`.

## 🚀 Despliegue (Build & Release)

Cuando el artefacto esté listo para ser entregado al mundo:

### Despliegue en Vercel (Web)

Para compartir tu creación con otros aventureros a través de la red mágica (Internet):

1.  **Preparación**:
    Asegúrate de que tu código esté en GitHub.

2.  **Configuración en Vercel**:
    *   Importa tu repositorio en Vercel.
    *   La configuración debería detectarse automáticamente gracias al pergamino `vercel.json`.
    *   Si te pregunta:
        *   **Build Command**: `npx expo export -p web`
        *   **Output Directory**: `dist`
        *   **Install Command**: `npm install`

3.  **Despliegue**:
    Vercel construirá el portal y te dará una URL mágica.

### Pre-Build (EAS)
Necesitarás `eas-cli` instalado globalmente:
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Generar APK/IPA
```bash
eas build -p android --profile preview
# o
eas build -p ios --profile preview
```

## 🛡️ Solución de Problemas (Troubleshooting)

*   **Error de Texturas**: Si las imágenes no cargan, verifica `src/shared/assets/AssetManifest.ts` y asegura que los archivos existan en la carpeta `assets`.
*   **Reanimated Crash**: Ejecuta `npx expo start -c` para limpiar la caché del bundler.

---
*Documento sellado por The Artificer.*
