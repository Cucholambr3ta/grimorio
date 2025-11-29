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

## 🚀 Despliegue (Build & Release)

Cuando el artefacto esté listo para ser entregado al mundo:

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
