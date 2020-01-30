import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

import robotsOptions from './config/robots';

/*
 ** NOTE:
 ** The NODE_ENV will always be equal to 'production' when we generate
 ** the website. Thus, we don't have a dev/production env variable
 ** for the preproduction environnement.
 ** The NETLIFY_ENV variable allow us to set a dev/production variable
 ** totaly decorrelated from the NODE_ENV variable.
 ** SEE: https://www.netlify.com/docs/continuous-deployment/#environment-variables
 */
const netlifyEnv = process.env.NODE_ENV;
const isDevEnv = netlifyEnv === 'development';
const websiteUrl = process.env.URL || `http://${process.env.HOST}:${process.env.PORT}`;

export default {
    mode: 'universal',
    /*
     ** Environnement variables shared for the client and server-side
     */
    env: { cmsToken: process.env.CMS_TOKEN, isDevEnv, websiteUrl },
    /*
     ** Headers of the page
     */
    head: {
        title: 'Stéréosupercopter',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'description',
                content:
                    'Chez Stéréosuper, on aime les défis. On en a même fait toute une liste. 365 jours. 100 missions. Stéréosupercopter.'
            },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            {
                hid: 'author',
                name: 'author',
                content: 'Stéréosuper'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Stéréosupercopter'
            },
            {
                hid: 'og:site_name',
                property: 'og:site_name',
                content: 'Stéréosupercopter'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://stereosupercopter.fr'
            },
            // COMBAK: Update open graph meta image
            /*{
                hid: 'og:image',
                property: 'og:image',
                content: '/images/MyBusinessOgImage.png'
            },*/
            // COMBAK: Update open graph meta image:width
            /*{
                hid: 'og:image:width',
                property: 'og:image:width',
                content: '2000'
            },*/
            // COMBAK: Update open graph meta image:height
            /*{
                hid: 'og:image:height',
                property: 'og:image:height',
                content: '1550'
            },*/
            // COMBAK: Update open graph meta image:type
            /*{
                hid: 'og:image:type',
                property: 'og:image:type',
                content: 'image/png'
            },*/
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: 'Stéréosupercopter'
            },
            // COMBAK: Update open graph meta twitter:card
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
                hid: 'twitter:creator',
                name: 'twitter:creator',
                content: '@stereosuper'
            },
            // COMBAK: Update open graph meta twitter:image
            /*{
                hid: 'twitter:image',
                name: 'twitter:image',
                content: '/images/MyBusinessOgImage.png'
            },*/
            {
                name: 'theme-color',
                content: '#000'
            }
        ],
        link: [
            {
                rel: 'manifest',
                href: '/manifest.json'
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#000'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href: 'https://cloud.typography.com/719316/609682/css/fonts.css'
            }
        ]
    },
    /*
     ** Customize the progress-bar
     */
    loading: '~/components/Loader.vue',
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/globals.js', '~/plugins/breakpoints.js', '~/plugins/fastdom.js'],
    /*
     ** Nuxt.js dev-modules
     ** SEE: https://github.com/Atinux/nuxt-prismic-showcase/tree/master/modules
     */
    buildModules: ['~/modules/static'],
    /*
     ** Crawler config
     */
    crawler: {
        // Blacklisting all the urls containing the strings below
        // SEE: Example below
        // blacklist: ['/wp-json/', '/api.w.org/'],
    },
    generate: {
        fallback: '404.html'
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/dotenv',
        '~/modules/initFragmentMatcher',
        // Doc: https://github.com/nuxt-community/apollo-module
        '@nuxtjs/apollo',
        '@nuxtjs/style-resources',
        '@nuxtjs/sitemap',
        [
            '@nuxtjs/robots',
            robotsOptions({
                env: netlifyEnv,
                url: websiteUrl
            })
        ]
    ],
    /*
     ** Axios module configuration
     ** SEE: https://github.com/nuxt-community/apollo-module
     */
    apollo: {
        clientConfigs: {
            default: '~/cms/apollo-config.js'
        }
    },
    /*
     ** Nuxt Style Resources module configuration
     */
    styleResources: {
        scss: [
            '~/assets/scss/abstracts/_variables.scss',
            '~/assets/scss/abstracts/_animations.scss',
            '~/assets/scss/abstracts/_functions.scss',
            '~/assets/scss/abstracts/_mixins.scss',
            '~/assets/scss/abstracts/_placeholders.scss'
        ]
    },
    /*
     ** Sitemap config
     */
    sitemap: {
        hostname: websiteUrl,
        gzip: true,
        routes: () => {
            let routes = [];
            const routesPath = path.resolve(__dirname, 'dist/routes.json');
            const exists = fs.existsSync(routesPath);
            if (!exists) return routes;
            routes = require(routesPath);
            return routes;
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Used to analyse chunks
         */
        analyze: isDevEnv ? { analyzerMode: 'static' } : false,
        /*
         ** You can extend webpack config here
         */
        transpile: [/gsap/],
        extend(config, ctx) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common';
            delete config.resolve.alias['@@'];
            delete config.resolve.alias['@'];

            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.devtool = '#source-map';
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    include: [path.resolve(__dirname, 'assets', 'js')],
                    exclude: /(node_modules)/,
                    options: {
                        sourceMap: true
                    }
                });
            }
        }
    }
};
