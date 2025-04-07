// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify, type ThemeDefinition } from 'vuetify';

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    // Main palette
    background: '#0D1B2A',
    surface: '#1B263B',
    primary: '#415A77',
    secondary: '#778DA9',
    // Variations
    'primary-darken-1': '#344A64',
    'secondary-darken-1': '#647991',
    // Supporting colors
    error: '#E57373',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFD54F',
    accent: '#B39DDB',
    // Text colors
    'on-background': '#E0E1DD',
    'on-surface': '#E0E1DD',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
  defaults: {
    global: {
      ripple: true,
    },
    VBtn: {
      fontWeight: '600',
    },
  },
});
