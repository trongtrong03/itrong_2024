<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 1, title: '一、JavaScript 版本' },
        { id: 2, title: '二、jQuery 版本' },
        { id: 3, title: '三、Vue 版本' },
        { id: 4, title: '三、CSS 版本' },
    ]);
</script>

<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="13" fileType="workshop" />
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
        <p>&lt;picture&gt; 是 HTML5 新增的元素標籤，可依據裡頭設定不同的媒體（media）類型，顯示相對應的影像內容，大多廣泛運用在 RWD 設計上。不過由於是 HTML5 才訂立的標準，舊版本瀏覽器普遍不支援這個標籤，而 <a href="https://scottjehl.github.io/picturefill/" target="_blank">Picturefill.js</a> 的用途即是要讓舊瀏覽器也能識別該標籤。</p>
        <p><br></p>
        <p>官方套件：<a href="https://scottjehl.github.io/picturefill/" target="_blank">Picturefill.js</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdn.rawgit.com/scottjehl/picturefill/3.0.2/dist/picturefill.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;picture&gt;
    &lt;source srcset="large.jpg" media="(min-width: 960px)"&gt;
    &lt;source srcset="middle.jpg" media="(min-width: 768px)"&gt;
    &lt;source srcset="small.jpg" media="(max-width: 480px)"&gt;
    &lt;!--[if IE 9]&gt;&lt;video style="display: none;"&gt;&lt;![endif]--&gt;
    &lt;img src="default.jpg"&gt;
&lt;/picture&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>暫無內容。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
