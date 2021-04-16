import de from 'vuetify/es5/locale/de'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - sde",
    title: "sde",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script:[
      { src: "https://www.googleoptimize.com/optimize.js?id=OPT-PTNPVK7", async: true, defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/aws-amplify.js" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/tracking.js", mode: "client" },
    { src: "~/plugins/userlike.js", mode: "client" },
    { src: "~/plugins/userlane.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    /* '@nuxtjs/eslint-module', */
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/gtm"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  gtm: {
    enabled: true,
    id: 'GTM-K4G5GLV&gtm_auth=' + "JKBwuPKx5oDsexOjVn2tHA" + '&gtm_preview=' + "env-290" + '&gtm_cookies_win=x',
    scriptURL: 'https://www.googletagmanager.com/gtm.js'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    breakpoint: {
      thresholds: {
        'xs': 414 + 1,
        'sm': 900 + 1,
        'md': 1024 + 1 + 16,
        'lg': 1280 + 1 + 16
      }
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: '#00AF9C',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5A5F',
          info: '#F7C01A',
          success: '#00AF9C',
          warning: '#F7C01A',
          disabled: '#D9E0E6',
          light: '#FFFFFF'
        }
      },
    },
    global: {
      ripples: false
    },
    icons: {
      iconfont: 'sde-iconfont',
      values: {
        dropdown: 'sde-icon_chevron-down_24px',
        menu: 'sde-icon_menu_hamburguer_24px',
        prev: 'sde-icon_chevron-left_24px',
        next: 'sde-icon_chevron-right_24px',
        delete: 'sde-icon_close_24px',
        checkboxOn: 'sde-icon_check_24px',
        checkboxOff: 'sde-icon_uncheck_24px',
        expand: 'sde-icon_chevron-down_24px',
        info: 'sde-icon_information_24px',
      }
    },
    lang: {
      locales: { de },
      current: 'de',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8081, // default: 3000
  },

  router: {
    middleware:['global']
  }
}
