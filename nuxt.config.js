const pkg = require('./package')
const path = require('path')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f60' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/reset.css',
    '~assets/css/solarized-dark.css',
    {src: '~assets/css/mixin.less', lang: 'less'},
    {src: '~assets/css/constant.less', lang: 'less'}
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/highlight', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/highlight'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // less 不需要extend, npm install --save-dev less less-loader 就可以了

    }
  }
}
