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
        <TempArticle :propValue="11" fileType="workshop" />
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
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="WqMZGp" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/WqMZGp">
            jq-plugin: dotdotdot-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>官方套件：<a href="https://dotdotdot.frebsite.nl/" target="_blank">dotdotdot</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery.dotdotdot/3.0.0/jquery.dotdotdot.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="dot-text"&gt;
    &lt;p&gt;文字內容...&lt;/p&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.dot-text {
    height: 100px;
    overflow: hidden;
}</code></pre>
        </div>
        <p>如同單行溢出的方法需要 <em>overflow: hidden;</em> 來使區塊隱藏超出的內容，這裡也是基於相同概念。至於高度值則是要讓 JavaScript 判斷監聽的文字內容是否已超過區域範圍，始能進行溢出處理的動作。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function() {
    $(".dot-text").dotdotdot({
        watch: "window"
    });
});</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}</code></pre>
        </div>
        <p>其中參數值 <em>3</em> 表示在行數達到三行，超出的後續文字內容便會直接以「...」替代，我們甚至也不用計算區域高度要設定多少，非常方便。只不過這個屬性的泛用度還沒有很廣泛，且舊版本的瀏覽器普遍不支援，若有需要兼容舊版瀏覽器的使用者，那麼建議還是使用套件來處理會比較穩當。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
