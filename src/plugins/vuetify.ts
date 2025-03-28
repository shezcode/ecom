// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import { createVuetify, type ThemeDefinition } from 'vuetify';

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1E1E2E',
    surface: '#2A2A3C',
    primary: '#A2E1B8',
    'primary-darken-1': '#80D090',
    secondary: '#9DDCD2',
    'secondary-darken-1': '#7BCBC0',
    error: '#F5A9B8',
    info: '#B1D0F7',
    success: '#B8E0C5',
    warning: '#FFD6AA',
    accent: '#D4BBEB',
    'on-background': '#E9E9F4',
    'on-surface': '#E9E9F4',
  },
};
export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
});
