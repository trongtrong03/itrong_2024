// https://nuxt.com/docs/api/configuration/nuxt-config


// npm install --save prismjs
// npm i vite-plugin-prismjs
import prismjs from 'vite-plugin-prismjs'
vite: {
    plugins: [
        prismjs({
            languages: ['all'],
            // 配置prism插件 toolbar是后面两个插件依赖的插件.
            // show-language: 显示语言名。
            // copy-to-clipboard: 添加复制代码功能。
            plugins: ['toolbar', 'show-language', 'copy-to-clipboard']
        })
    ]
}


export default defineNuxtConfig({
    components: true,
    
    app: {
        head: {
            title: 'iTrong work studio',
            meta: [
                { name: 'description', content: '網頁介紹'},
                { name: 'keywords', content: '網頁關鍵字'},
                { name: 'viewport', content: 'width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no'},
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }
            ],
            script: [
                { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js' }
            ],
            pageTransition: { name: 'page', mode: 'out-in' }
        },
    },
    
    css: [
        // npm install sass sass-loader --save-dev
        '@/assets/scss/_style.scss'
    ],

    build: {
        // 使 CSS 可以額外輸出成單獨檔案
        extractCSS: true
    },

    nitro: {
        prerender: {
          // Workaround for "Error: [404] Page not found: /manifest.json"
          failOnError: false
        }
    }
})

