import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AppDivinaArtesania',
  webDir: 'www',
  // Agregamos la configuración de los Plugins
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500, // Duración de 2.5 segundos
      launchAutoHide: true,     // Se oculta solo al terminar el tiempo
      backgroundColor: "#fdfaf5", // El color crema rústico que definimos
      showSpinner: true,        // Muestra el círculo de carga
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#8d6e63",  // El color café de Divina Artesanía
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;