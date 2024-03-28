<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="8" fileType="workshop" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act1">一、JavaScript 版本</a></li>
            <li><a href="#act2">二、jQuery 版本</a></li>
            <li><a href="#act3">三、Vue 版本</a></li>
            <li><a href="#act4">四、CSS 版本</a></li>
        </ul>
    </div>
    <div class="text-block" id="act1">
        <h2>一、JavaScript 版本</h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、jQuery 版本</h2>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="MMGRVg" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/MMGRVg">
            jq-plugin: masonry</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>官方套件：<a href="https://masonry.desandro.com/layout.html" target="_blank">Masonry</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="grid-wrap"&gt;
    &lt;div class="grid-item"&gt;
        &lt;img src="filepath/..."&gt;
    &lt;/div&gt;
    &lt;div class="grid-item"&gt;
        &lt;img src="filepath/..."&gt;
    &lt;/div&gt;
    &lt;div class="grid-item"&gt;
        &lt;img src="filepath/..."&gt;
    &lt;/div&gt;
    ...
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.grid-item {
    width: calc(25% - 8px);
}</code></pre>
        </div>
        <p>雖然 <a href="https://masonry.desandro.com/layout.html" target="_blank">Masonry</a> 套件函式功能中有提供瀑布流各欄的寬度參數，但由於該參數的設定僅能給予固定像素值，對 RWD 網頁其實不太友善，在不熟悉語法或不擅自更動開發者邏輯的前提下，可改將欄位寬度值以百分比單位設定在 CSS 裡，上面 CSS 範例裡是以假設瀑布流為四欄作設定（100% / 4 = 25%），並利用 <em>calc</em> 屬性扣掉中間的間隔數值。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function() {
    $(".grid-wrap").masonry({
        itemSelector: ".grid-item",
        gutter: 8,
        horizontalOrder: true
    });
    $(".grid-item").each(function(i){
        setTimeout(function(){
            $(".grid-item").eq(i).addClass("is-visible");
        }, 200 * i);
    });
});</code></pre>
        </div>
        <p><br></p>
        <p>以下列出較常用的 <a href="https://masonry.desandro.com/options" target="_blank">Masonry</a> <em>.masonry()</em> 方法裡可讓開發者自行去作細微的設定參數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(".grid-wrap").masonry({
    itemSelector: ".grid-item",    // 指定瀑布流的子元件
    columnWidth: 160,    // 欄位寬度
    gutter: 8,    // 間隔值
    horizontalOrder: true,    // 是否使子元件維持水平左至右的排序方式
    percentPosition: true,    // 是否將子元件的定位偏移值改成百分比單位
    originLeft: false,    // 設定子元件的起始位置是否由左至右排序
    originTop: false,    // 設定子元件的起始位置是否由上至右排序
    resize: false,    // 設定子元件是否隨視窗縮放調整他的排序換行規則
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vue 版本</h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、CSS 版本</h2>
        <p>暫無內容。</p>
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
</script>