import "vuetify/styles";
import { createVuetify } from "vuetify";
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#FFFFFF",
          secondary: "#FF8D3F",
          accent: "#2F2E33",
          error: "#D5D6D2",
          info: "#3A5199",
          success: "#756867",
          warning: "#FF8D3F",
        },
      },
    },
  },
});

export default vuetify; 