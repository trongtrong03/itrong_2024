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
        <TempArticle :propValue="21" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="qjvLNy" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/qjvLNy">
            JQ-image-zoom-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>官方套件：<a href="https://www.elevateweb.co.uk/image-zoom/examples" target="_blank">elevate zoom</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://www.elevateweb.co.uk/wp-content/themes/radial/jquery.elevatezoom.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;img id="imgZoom" src="圖片連結" data-zoom-image="圖片連結"/&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$('#imgZoom').elevateZoom({
    zoomType: "inner",
    cursor: "crosshair",
    zoomWindowFadeIn: 500,
    zoomWindowFadeOut: 500
});</code></pre>
        </div>
        <p>此為基本款，也就是文章開頭預覽範例的樣式，<a href="https://www.elevateweb.co.uk/image-zoom/examples" target="_blank">elevate zoom</a> 裡可以調整的參數尚包含其他呈現方式，以下簡單列舉幾款比較常見的：</p>
        <p><br></p>
        <h3>1. 圓形放大鏡：</h3>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomType: "lens",
    lensShape: "round",
    lensSize: 200
});</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="xxmgzzG" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/xxmgzzG">
            JQ-image-zoom-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>2. 使用滾輪縮放的放大鏡：</h3>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    scrollZoom: true
});</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="yXwZKG" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/yXwZKG">
            JQ-image-zoom-5</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>3. 底圖著色 + 另開放大視窗：</h3>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    tint: true, 
    tintColour: '#000', 
    tintOpacity: 0.5
});</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="xrBmam" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/xrBmam">
            JQ-image-zoom-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>4. 多圖切換且帶有縮圖：</h3>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="img-wrap"&gt;
    &lt;div class="img-main"&gt;
        &lt;img id="imgZoom" src='中圖連結' data-zoom-image="大圖連結"/&gt;
    &lt;/div&gt;
    &lt;div id="gallery" class="img-cont"&gt;
    &lt;a href="#" data-image="中圖連結" data-zoom-image="大圖連結"&gt;
        &lt;img src="縮圖連結" /&gt;
    &lt;/a&gt;
    &lt;a href="#" data-image="中圖連結" data-zoom-image="大圖連結"&gt;
        &lt;img src="縮圖連結" /&gt;
    &lt;/a&gt;
    &lt;a href="#" data-image="中圖連結" data-zoom-image="大圖連結"&gt;
        &lt;img src="縮圖連結" /&gt;
    &lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    gallery: "gallery",
    zoomType: "inner",
    cursor: "crosshair",
    galleryActiveClass: "active",
    imageCrossfade: true,
    loadingIcon: "影像連結"
});</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="js,result" data-slug-hash="vZPbyK" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/vZPbyK">
            JQ-image-zoom-4</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>參數補充：</p>
        <p>放大鏡效果的呈現方式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomType: "inner",
});</code></pre>
        </div>
        <p><em>inner</em> 為顯示於圖片範圍內，<em>lens</em> 為放大鏡尺寸內，沒有設定此行則另開一浮動視窗於一旁。</p>
        <p><br></p>
        <p>滑鼠移入上方的樣式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    cursor: "crosshair",
});</code></pre>
        </div>
        <p>這個參數的值和 CSS <em>cursor</em> 屬性的值所呈現出來的樣式是一樣的。</p>
        <p><br></p>
        <p>底圖著色效果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    tint: true,     // 是否啟用著色功能。
    tintColour: "色彩代碼",      // 著色的顏色
    tintOpacity: 數值           // 著色的透明度
});</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    tint: true, 
    tintColour: "#000", 
    tintOpacity: 0.5
});</code></pre>
        </div>
        <p><br></p>
        <p>是否支援滾輪縮放：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    scrollZoom: true,
});</code></pre>
        </div>
        <p><br></p>
        <p>圓形放大鏡的設定：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomType: "lens",
    lensShape: "round",     // 也可以是 square（方形）
    lensSize: 200           // 放大鏡尺寸
});</code></pre>
        </div>
        <p><br></p>
        <p>修改浮動側欄放大鏡的尺寸：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomWindowWidth: 數值,
    zoomWindowHeight: 數值,
    lensFadeOut: 500
});</code></pre>
        </div>
        <p><br></p>
        <p>漸入漸出的效果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomWindowFadeIn: 數值,
    zoomWindowFadeOut: 數值,
    lensFadeIn: 數值,
    lensFadeOut: 數值,
    lensFadeOut: 500
});</code></pre>
        </div>
        <p><em>zoomWindowFadeIn</em> 和 <em>zoomWindowFadeOut</em> 用於放大視窗內的大圖；<em>lensFadeIn</em> 和 <em>lensFadeOut</em> 效果則用於放大鏡視窗本身。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    zoomWindowFadeIn: 500,
    zoomWindowFadeOut: 500,
    lensFadeIn: 500,
    lensFadeOut: 500
});</code></pre>
        </div>
        <p><br></p>
        <p>多張圖片組成群組：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    gallery: "ID 名稱",
    galleryActiveClass: "選取狀態時的 class 名稱"
});</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    gallery: "gallery",
    galleryActiveClass: "active"
});</code></pre>
        </div>
        <p><br></p>
        <p>是否啟用緩動效果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("#imgZoom").elevateZoom({
    easing: true,
});</code></pre>
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
