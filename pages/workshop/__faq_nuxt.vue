<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 1, title: '一、錯誤訊息' },
        { id: 2, title: '二、警告提示' },
        { id: 3, title: '三、其他疑難雜症' },
    ]);

    // avtive
    const isActive = ref(0);
</script>

<template>
    <NuxtLayout name="workshop">
        <hgroup class="text-heading">
            <h1>Node.js 常見錯誤訊息問題、除錯建議以及各種疑難雜症彙整</h1>
        </hgroup>
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <h2 v-text="catalog[0].title"></h2>
        <div class="text-accordin is-error">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1001;">
                    <p>ERROR Exiting due to prerender errors.</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常發生在我們使用 <em>npm run generate</em> 打包並生成專案時，它表示在預渲染（prerender）過程中發生了錯誤，導致無法順利完成預渲染。可能原因有很多，如果已檢查過 Vue 組件及其他程式碼都不存在渲染錯誤，那或許是 Nitro 的問題，Nitro 是 Nuxt3 採用的伺服器引擎讓開發者更方便處理跨域問題。總而言之，你可以嘗試在 <b>nuxt.config.ts</b> 設定檔中添加以下程式碼：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">export default defineNuxtConfig({
    nitro: {
        prerender: {
          // Workaround for "Error: [404] Page not found: /manifest.json"
          failOnError: false
        }
    }
});</code></pre>
                    </div>
                    <p>它的作用是告訴預渲染過程中遇到錯誤時是否要立即停止。當設置為 <em>false</em> 時，表示當遇到錯誤時不立即停止，而是繼續執行預渲染過程。這樣可以避免一些輕微的錯誤中斷整個預渲染過程，但同時也可能導致一些錯誤情況被忽略或延遲處理。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-accordin is-others">
        </div>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
