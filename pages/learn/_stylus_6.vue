<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="20" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、媒體查詢（@media）</a></li>
            <li><a href="#act2">二、關鍵影格（@keyframes）</a></li>
            <li><a href="#act3">三、CSS Literal</a></li>
            <li><a href="#act4">四、導入（@import）</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>前面幾篇文章已經將 Stylus 比較常使用的大部份語法介紹完畢，本篇為 Stylus 系列的最後一篇筆記，將剩下的零星但開發專案時仍可能會用到的功能補齊介紹。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、媒體查詢（@media）</h2>
        <p>媒體查詢主要是用來讓網站在不同裝置媒體環境下，顯示不一樣的 CSS 樣式。基本上 Stylus 的 <em>@media</em> 用法和 CSS 差不多，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">@media print
    img
        display none</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media print {
    img {
        display: none;
    }
}</code></pre>
        </div>
        <p>上面範例的 <em>print</em> 指的是 Media Types 中的印刷裝置，如果想多了解這方面資訊，可見 <a href="_css_mq" target="_blank">CSS 的 Media Queries</a> 一文。</p>
        <p><br></p>
        <p>Stylus 的 <em>@media</em> 也可以允許同時指定多個媒體裝置類型及特徵，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">img
    display block
    @media screen and (max-width: 960px)
        display none</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    display: block;
}
@media screen and (max-width: 960px) {
    img {
        display: none;
    }
}</code></pre>
        </div>
        <p><br></p>
        <p>我們也可以在 <em>@media</em> 裡加入 <em>@media</em>，表示裡面的 <em>@media</em> 會包含父層的條件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">img
    width 33%
    @media screen and (max-width: 960px)
        width 50%
        @media screen and (min-width: 768px), screen and (min-height: 800px)
            width 100%</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    width: 33%;
}
@media screen and (max-width: 960px) {
    img {
        width: 50%;
    }
}
@media screen and (max-width: 960px) and (min-width: 768px), screen and (max-width: 960px) and (min-height: 800px) {
    img {
        width: 100%;
    }
}</code></pre>
        </div>
        <p><br></p>
        <p>如果有需要，也可以把 <em>@media</em> 放進 <em>if</em> 或 <em>for</em> 等裡面的表達式，像是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">img
    for i in 1..4
        @media screen and (max-width: 2 * (i * 100)px)
            width: 100px * i</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media screen and (max-width: 200px) {
    img {
        width: 100px;
    }
}
@media screen and (max-width: 400px) {
    img {
        width: 200px;
    }
}
@media screen and (max-width: 600px) {
    img {
        width: 300px;
    }
}
@media screen and (max-width: 800px) {
    img {
        width: 400px;
    }
}</code></pre>
        </div>
        <p><br></p>
        <p>不過每一次使用 <em>@media</em> 都要寫（複製）一長串媒體裝置類型和特徵也是挺麻煩的，這時我們可以把條件預先宣告成變數，然後令 <em>@media</em> 直接引述即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">MQ-960 = 'screen and (max-width: 960px)'
MQ-768 = 'screen and (max-width: 768px)'
MQ-480 = 'screen and (max-width: 480px)'

img
    width 25%
    @media MQ-960
        width 33.33%
    @media MQ-768
        width 50%
    @media MQ-480
        width 100%</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    width: 25%;
}
@media screen and (max-width: 960px) {
    img {
        width: 33.33%;
    }
}
@media screen and (max-width: 768px) {
    img {
        width: 50%;
    }
}
@media screen and (max-width: 480px) {
    img {
        width: 100%;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、關鍵影格（@keyframes）</h2>
        <p><em>@keyframes</em> 是 CSS3 用來定義動畫（<em>animation</em>）規則的語法，而在 Stylus 中使用 <em>@keyframes</em>，可輸出與各大主流瀏覽器兼容的前綴詞，直接省去我們重複書寫或安裝輔助套件的步驟。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">@keyframes fadeIn 
  0
    opacity 0
  100%
    opacity 1</code></pre>
        </div>
        <p>寫法規則與 CSS 原生語法如出一轍，不過我們可以省略嵌套與符號。Stylus 只需要定義標準語法，編譯時就會自動輸出其他前綴詞的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@-moz-keyframes fadeIn {
    0 {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-webkit-keyframes fadeIn {
    0 {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-o-keyframes fadeIn {
    0 {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fadeIn {
    0 {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}</code></pre>
        </div>
        <p><br></p>
        <p>如果不想輸出這些前綴支持相容的屬性，只要添加 <em>vendors = official</em> 這行即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">vendors = official

@keyframes fadeIn 
  0
    opacity 0
  100%
    opacity 1</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes fadeIn {
    0 {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}</code></pre>
        </div>
        <p><br></p>
        <p>我們也可以結合迭代去編譯 <em>@keyframes</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">@keyframes fadeIn
  for i in 0..10
    {10% * i}
        opacity (10% * i)</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes fadeIn {
    0% {
        opacity: 0%;
    }
    10% {
        opacity: 10%;
    }

    /* ...(略)... */

    100% {
        opacity: 100%;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、CSS Literal</h2>
        <p>如果有不想經過編譯直接輸出內容的需求，可以直接把程式碼寫在 <em>@css</em> 的嵌套裡，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">.ie-opacity {
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
}</code></pre>
        </div>
        <p>這是 IE Alpha 透明度的語法，但是在 Stylus 編譯時會發生錯誤導致無法執行編譯，這時我們就可以把它寫進 <em>@css</em> 裡，像這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">@css {
    .ie-opacity {
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
    }
}</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.ie-opacity {
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=25);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=25)";
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、導入（@import）</h2>
        <p>先前曾提過 Stylus 可以一口氣編譯整個資料夾裡的 <b>.styl</b> 檔案，我們不需要一個、一個檔案地下達編譯指令。但由於一個 CSS 檔案對應一個 Style 檔案，輸出檔案太多反而不利網頁管理，因此我們在執行專案前，最好先部屬好 Style 的整體架構，透過 <em>@import</em> 使一支 <b>.styl</b> 檔案去導入其他檔案。如此一來，我們只需要編譯 / 監測該檔案就好，輸出的 CSS 檔也只會有一個。舉例來說：</p>
        <figure>
            <img src="/images/learn/css/stylus-14.jpg">
            <figcaption>專案的 Style 結構。</figcaption>
        </figure>
        <p><b>style.styl</b> 檔案的導入內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">// layout
@import "layout/reset.styl"
@import "layout/grid.styl"
@import "layout/layout.styl"

// pages
@import "pages/index.styl"
@import "pages/about.styl"
@import "pages/news.styl"</code></pre>
        </div>
        <p><br></p>
        <p>執行：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus -w style.styl</code></pre>
        </div>
        <figure>
            <img src="/images/learn/css/stylus-15.jpg">
            <figcaption>編譯輸出的 CSS 檔案。</figcaption>
        </figure>
        <p><b>style.css</b> 的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/*  reset */
/*  grid */
/*  layout */
/*  index */
/*  about */
/*  news */</code></pre>
        </div>
        <p><br></p>
        <p>我們也可以用 <em>*</em> 表示要導入指定目錄內的所有 <b>.styl</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">@import "layout/*"</code></pre>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://stylus-lang.com/" target="_blank">stylus</a></dd>
        </dl>
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
