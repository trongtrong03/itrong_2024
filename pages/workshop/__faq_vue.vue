<template>
    <NuxtLayout name="workshop">
        <hgroup class="text-heading">
            <h1>Vue 常見錯誤訊息問題、除錯建議以及各種疑難雜症彙整</h1>
        </hgroup>
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act1">一、錯誤訊息</a></li>
            <li><a href="#act2">二、警告提示</a></li>
            <li><a href="#act3">三、其他疑難雜症</a></li>
        </ul>
    </div>
    <div class="text-block" id="act1">
        <h2>一、錯誤訊息</h2>
        <div class="text-accordin is-error">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1001;">
                    <p>Uncaught (in promise) Maximum recursive updates exceeded in component. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常發生於使用 <em>reverse()</em> 方法後，導致數據的重新排列，而重新排列可能觸發更新，從而導致遞歸更新。這可能會在 <em>computed</em> 或 <em>watch</em> 中引起問題，因為它們會跟蹤數據的變化並重新計算結果。</p>
                    <p>解決這個問題的方法之一是在 <em>computed</em> 屬性中使用函數，而不是在它們的直接返回值上進行數據操作。這樣做可以防止不必要的更新。此外，也可以考慮在 <em>computed</em> 中使用 <em>watch</em> 來觀察數據的變化，以避免不必要的更新。</p>
                    <p>以下是可能導致渲染出錯的寫法案例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-html">&lt;li v-for="item in lists.reverse().slice(0, 12)" :key="item.id"&gt;&lt;li&gt;</code></pre>
                    </div>
                    <p>解決方式是將 <em>reverse()</em> 方法轉移到 <em>computed</em> 屬性：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">const filteredData = computed(() => {
    return lists.value.slice().reverse().slice(0, 12);
});</code></pre>
                    </div>
                    <p>然後在模版中使用 <em>filteredData</em> ：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-html">&lt;li v-for="item in filteredData" :key="item.id"&gt;&lt;li&gt;</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1002;">
                    <p>"getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤通常發生在你試圖在 Vue 應用程式中使用 Pinia store 之前，忘記了將 Pinia 實例掛載到 Vue 應用程式上，而且必須確保 <em>app.use(pinia)</em> 必須在組件掛載（<em>app.mount</em>）之前先執行。</p>
                    <p>如果使用 Vite 框架，設定通常在 <b>main.js</b> 或 <b>main.ts</b> 文件：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');</code></pre>
                    </div>
                    <p>如果 <em>app.mount</em> 比 <em>app.use</em> 還要早執行便會發生錯誤：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">app.mount('#app');
app.use(pinia);</code></pre>
                    </div>
                    <p>像這樣就不行。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1003;">
                    <p>Vite TS npm run build 發生一堆錯誤警告</p>
                </div>
                <div class="accordin-content">
                    <p>假設 Vite 專案採用 TypeScript 開發模式，但並沒有很嚴謹遵守 TypeScript 的相關規範，在最後打包（npm run build）階段很容易會噴出一堆錯誤警告導致專案無法順利打包，如下圖所示：</p>
                    <figure>
                        <img src="/images/learn/js/vite-faq-1.jpg">
                    </figure>
                    <p>其實許多警告項目也不完全是會影響網頁運行的錯誤，但動輒幾十甚至上百的警告，要一條條處理其實也要花不少時間，如果想要跳過 TypeScript 嚴格規則並快速進行打包，可以找到專案內的 <b>package.json</b> 檔案，找到這一段程式碼：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">"scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force"
},</code></pre>
                    </div>
                    <p>將 <em>type-check</em> 相關的項目移除即可：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">"scripts": {
    "dev": "vite",
    "build": "run-p \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build"
},</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、警告提示</h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、其他疑難雜症</h2>
        <div class="text-accordin is-others">
        </div>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>

<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    const isActive = ref(0);
</script>