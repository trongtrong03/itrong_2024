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
        <TempArticle :propValue="4" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="ywdxdZ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/ywdxdZ">
            jq: plugin-particleground</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>官方套件：<a href="https://jnicol.github.io/particleground/" target="_blank">particleground.js</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://jnicol.github.io/particleground/js/jquery.particleground.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="particles"&gt;&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS：</p>
        <p>此款套件沒有必須添加的 CSS，但假設你想要讓整個螢幕畫面的背景填滿粒子效果，CSS 的部份可以這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">#particles {
  width: 100vw;
  height: 100vh;
  background: #5cbdaa;
  overflow: hidden;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function(){
    $('#particles').particleground({
        dotColor: '#FFF',
        lineColor: '#FFF',
    });
});</code></pre>
        </div>
        <p><br></p>
        <p>其他可調用參數及功能說明：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">dotColor: '#FFF',     // 網點的顏色。
lineColor: '#FFF',      // 網線的顏色。
minSpeedX: 0.1,     // X軸的動畫最小速度。
maxSpeedX: 0.7,     // X軸的動畫最大速度。
minSpeedY: 0.1,     // Y軸的動畫最小速度。
maxSpeedY: 0.7,     // Y軸的動畫最大速度。
directionX: 'center',   // 可以是 'center'，'left' 或者 'right' 之一。 'center' 表示點將從畫布的邊緣反彈。
directionY: 'center',   // 可以是 'center'，'up' 或者 'down' 之一。 'center' 表示點將從畫布的邊緣反彈。
density: 10000,         // 渲染密度，數值越小越密。
particleRadius: 7,      // 網點大小。
lineWidth: 1,       // 線寬。
curvedLines: false,     // 曲線，true 為使用，false 為不使用。
proximity: 100,     // 使網點之間連線的距離，數值越小則要越相近才會連線。
parallax: true,     // 是否啟用視差跟隨效果。
parallaxMultiplier: 5,      // 數值越小，視差跟隨的效果就越極端。</code></pre>
        </div>
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
