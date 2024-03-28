<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="2" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、語法該如何寫？</a></li>
            <li><a href="#act2">二、Media Types 有哪些類型？</a></li>
            <li><a href="#act3">三、什麼是 Media Features？</a></li>
            <li><a href="#act4">四、是否有其他的邏輯應用方式？</a></li>
            <li><a href="#act5">五、什麼情況我會需要用到 Media Queries？</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>Media Queries 敘述的語意是先「詢問」（query）「媒體」（media）的屬性，然後再針對其定義樣式，不僅可以根據指定的裝置型態（例如螢幕或列印）或特定特徵（例如螢幕解析度或瀏覽器可視範圍寬度）套用指定的樣式屬性，更是實現響應式網頁（RWD）不可或缺的重要方法。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、語法該如何寫？</h2>
        <p>一個 <b>media query</b> 是由一個可選的 <b>media types</b> 及不定數量的 <b>media features</b> 運算式構成。<b>media query</b> 本身具有邏輯的概念，若指定的 <b>media types</b> 與正在顯示的裝置內容相符，且 <b>media features</b> 運算式結果也為 <em>true</em> 時，回傳為 <em>true</em>（套用屬性樣式），否則為 <em>false</em>（不套用屬性樣式）。<br>假如設定的 <b>media types</b> 是未知的類型，則該 <b>media query</b> 將會永遠是 <em>false</em>。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media screen and (min-width: 640px) and (max-width: 1023px) {
    /* CSS */
}</code></pre>
        </div>
        <p>這是 <b>media query</b> 其中一種常見的案例，其構成方式是一個 <b>media types</b>（<em>screen</em>）及兩個 <b>media features</b>（<em>min-width: 640px</em>、<em>max-width: 1023px</em>）。</p>
        <blockquote class="is-info">
            <p>除了 <em>and</em> 之外，還有 <em>or</em>、<em>not</em>、<em>only</em>一共四種應用方法，這部份將保留至後面再提。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act2">
        <h2>二、Media Types 有哪些類型？</h2>
        <p>Media Types 描述裝置類型，有以下四種參數：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">Value</div>
                    <div class="f-f1">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>all</em></div>
                    <div class="f-f1">所有裝置【預設值】</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>print</em></div>
                    <div class="f-f1">印刷裝置，包含使用列印預覽產生的所有畫面 ( 例如列印為 <b>pdf</b> )</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>screen</em></div>
                    <div class="f-f1">螢幕裝置，不屬於 <em>print</em> 和 <em>speech</em> 的設備</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>speech</em></div>
                    <div class="f-f1">朗讀裝置，針對可以「讀出」頁面的設備</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/* print */
@media print and (max-width: 1024px) { /* CSS */ }

/* screen */
@media screen and (min-width: 1024px) { /* CSS */ }

/* speech */
@media speech and (aspect-ratio: 16/9) { /* CSS */ }</code></pre>
        </div>
        <p>也可以同時指定複數的裝置類型，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media screen, print { /* CSS */ }</code></pre>
        </div>
        <p>逗號是邏輯 <em>and</em> 的意思。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、什麼是 Media Features？</h2>
        <p><b>Media features</b> 也可以稱為特徵，用來給 <b>Media Types</b> 更加詳細的設定，要注意的是，每一個特徵都需要用括號包覆起來，並與邏輯關鍵字（<em>and</em>、<em>or</em>、<em>not</em>、<em>only</em>）結合，以下將特徵分門別類為視窗或頁面尺寸、顯示品質、顏色、互動這四大項來一一介紹。</p>
        <p><br></p>
        <h3>視窗或頁面尺寸（Viewport/Page Dimensions）：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Feature</div>
                    <div class="f-f4">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>width</em></div>
                    <div class="f-f4">螢幕寬度，另支援 <em>min-width</em>（最小寬度） 與 <em>max-width</em>（最大寬度）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>height</em></div>
                    <div class="f-f4">螢幕高度，另支援 <em>min-height</em>（最小高度） 與 <em>max-height</em>（最大高度）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>aspect-ratio</em></div>
                    <div class="f-f4">螢幕長寬比例，支援 <em>min-aspect-ratio</em> 與 <em>max-aspect-ratio</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>orientation</em></div>
                    <div class="f-f4">螢幕旋轉方向，選項為 <em>portrait</em>（直向）與 <em>landscape</em>（橫向）</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/* width */
@media (min-width: 1024px) { /* CSS */ }
@media (min-width: 768px) and (max-width: 1023px) { /* CSS */ }
@media (max-width: 767px) { /* CSS */ }

/* height */
@media (max-width: 1080px) { /* CSS */ }

/* aspect-ratio */
@media (aspect-ratio: 1440/1080) { /* CSS */ }
@media (max-aspect-ratio: 16/9) { /* CSS */ }

/* orientation */
@media (orientation: portrait) { /* CSS */ }
@media (orientation: landscape) { /* CSS */ }</code></pre>
        </div>
        <p>特徵運算式彼此之間可以混用，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media screen and (min-width: 960px) and (orientation: landscape) { /* CSS */ }</code></pre>
        </div>
        <p><br></p>
        <h3>顯示品質（Display Quality）：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Feature</div>
                    <div class="f-f4">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>resolution</em></div>
                    <div class="f-f4">解析度（dpi、ppx...等），支援 <em>max-resolution</em> 和 <em>min-resolution</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>scan</em></div>
                    <div class="f-f4">電視掃描方式，有 <em>interlace</em>（交錯式掃描） 和 <em>progressive</em>（漸進式掃描） 這兩個參數，後者是現在大多數電視採用的模式</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>update</em></div>
                    <div class="f-f4">更新媒體，參數有三：<br>
                    <em>none</em> 表示不會更新的顯示裝置，例如列印文件<br>
                    <em>slow</em> 為更新速度慢的顯示裝置<br>
                    <em>fast</em> 表示更新速度快的裝置，例如電腦螢幕</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>overflow-block</em></div>
                    <div class="f-f4">當內容包含 block 特性並超過邊界範圍，參數有四：<br>
                    <em>none</em> 表示任何超過範圍都不顯示，例如看板<br>
                    <em>scroll</em> 表示可滾動查看超出範圍，例如電腦螢幕<br>
                    <em>optional-paged</em> 表示可手動查看超出的內容，例如簡報<br>
                    <em>paged</em> 表示超出的內容會以分頁顯示，例如印表機</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>overflow-inline</em></div>
                    <div class="f-f4">當內容包含 inline 特性並超過邊界範圍，有 <em>none</em> 與 <em>scroll</em> 此二參數</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>grid</em></div>
                    <div class="f-f4">網格媒體，參數為 <em>0</em> 和 <em>1</em></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>顏色（Color）：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Feature</div>
                    <div class="f-f4">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color</em></div>
                    <div class="f-f4">輸出裝置的色彩位元數，0 代表黑白裝置，支援 <em>max-color</em> 和 <em>min-color</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color-index</em></div>
                    <div class="f-f4">輸出裝置的色彩索引位元數，支援 <em>max-color-index</em> 和 <em>min-color-index</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>monochrome</em></div>
                    <div class="f-f4">單色媒體功能，0 代表「不是」單色設備</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color-gamut</em></div>
                    <div class="f-f4">輸出裝置色域，參數有三：<br>
                    <em>srgb</em> 在大多數的顯示器皆獲得支援 
                    <em>p3</em> 色域比 <em>srgb</em> 更廣且包含 <em>srgb</em>
                    <em>rec2020</em> 比 <em>p3</em> 更大且包含 <em>p3</em></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>互動（Interaction）：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Feature</div>
                    <div class="f-f4">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>pointer</em> / <br><em>any-pointer</em></div>
                    <div class="f-f4">指標裝置（例如滑鼠）的準確性，參數有三：<br>
                    <em>none</em> 表示沒有指標裝置
                    <em>coarse</em> 表示精度較差的指標裝置，例如觸控螢幕
                    <em>fine</em> 表示精度比較高的裝置，例如滑鼠或手寫筆</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>hover</em> / <br><em>any-hover</em></div>
                    <div class="f-f4">裝置具備 hover 的能力，參數有 <em>none</em> 與 <em>hover</em></div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、是否有其他的邏輯應用方式？</h2>
        <p>前面曾提過 Media Queries 的邏輯使用除了 <em>and</em> 外，還有另外三種方式，分別是：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">Value</div>
                    <div class="f-f1">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>and</em></div>
                    <div class="f-f1">所有裝置【預設值】</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>or</em></div>
                    <div class="f-f1">「或」的意思，是唯一一個可以用符號（逗號（<em>,</em>））書寫的方法，只要 feature 符合其中一項即可套用</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>not</em></div>
                    <div class="f-f1">可以排除特定裝置媒體，其他裝置媒體可套用樣式</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>only</em></div>
                    <div class="f-f1">可以指定「只有」特定裝置媒體才可套用該樣式</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/* and */
@media (min-width: 960px) and (orientation: landscape) { /* CSS */ }

/* or */
@media (min-height: 680px), screen and (orientation: portrait) { /* CSS */ }

/* not */
@media not screen and (color), print and (color) { /* CSS */ }

/* only */
@media only screen and (color) { /* CSS */ }</code></pre>
        </div>
        <p>此外，<em>and</em> 與 <em>or</em> 可混搭運用，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@media screen and (max-width: 960px) and (min-width: 768px), (orientation: portrait) { /* CSS */}</code></pre>
        </div>
        <p>意思是「螢幕」介於最小寬度 <em>768px</em> 與 最大寬度 <em>960px</em> 之間，或者旋轉方向是直向的時候，套用其屬性樣式。</p>
        <blockquote>
            <p>在定義 <em>not</em> 及 <em>only</em> 時也有需要謹記的地方，若要使用這兩者，後方必須接續 Media Types 始可生效，否則將無任何效果。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act5">
        <h2>五、什麼情況我會需要用到 Media Queries？</h2>
        <p>大致看完 Media Queries 的邏輯和參數後，許多人最關心的莫過於它什麼時候會用到？在網頁程式裡扮演什麼樣的角色？以目前網頁設計環境中，CSS Media Queries 最常使用在網頁響應式設計（Responsive Web Design，RWD）的開發上。有些開發者會透過 JavaScript 程式去判斷使用者的畫面視窗大小，除此之外，我們也能利用 Media Queries 的 <b>Media features</b>「視窗與頁面尺寸」的特徵，讓瀏覽器去判斷使用者目前畫面的大小，去呈現與其相符的 CSS 樣式內容，其中，又以視窗的「寬度」（<em>width</em>）最被廣泛作為判定的依據。</p>
        <p><br></p>
        <p>我們先假定需要實現以下畫面：</p>
        <ol>
            <li><p>當畫面寬度在 <em>1024px</em> 以上時，<em>body</em> 的背景色（<em>background</em>）為 <em>green</em>，且文字大小（<em>font-size</em>）為 <em>24px</em>。</p></li>
            <li><p>當畫面寬度介於 <em>768px</em> 與 <em>1024px</em> 之間，<em>body</em> 背景色為 <em>red</em>，且文字顏色（<em>color</em>）為 <em>white</em>。</p></li>
            <li><p>當畫面寬度在 <em>768px</em> 以下時，<em>body</em> 背景色為 <em>blue</em>。</p></li>
        </ol>
        <p>一般來說，常見的寫法有以下三種格式：</p>
        <p><br></p>
        <h5>1. 寬度由小到大</h5>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">body {
    background: blue;
}
@media (min-width: 768px) {
    body {
        color: white;
        background: red;
    }
}
@media (min-width: 1024px) {
    body {
        font-size: 24px;
        background: green;
    }
}</code></pre>
        </div>
        <p>基於在「相同權重」的前提下，CSS 較後（較下方）的樣式將會覆蓋前者（較上方）相同的樣式屬性，因此由小到大的寫法，可以減少重複書寫樣式的次數。這是因為當上面較小的尺寸沒有相同屬性時，下面新賦予的屬性只會在畫面寬度符合條件時才會被讀取，例如上面範例只有當畫面大於 <em>1024px</em> 條件下，<em>font-size: 24px;</em> 才會套到 <em>body</em> 元素中。</p>
        <p>如果對上面的敘述感到一知半解也沒關係，我們接著來看相反過來寬度由大到小的寫法──另一派開發者習慣的書寫格式。</p>
        <p><br></p>
        <h5>2. 寬度由大到小</h5>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">body {
    font-size: 24px;
    background: green;
}
@media (max-width: 1023px) {
    body {
        font-size: inherit;
        color: white;
        background: red;
    }
}
@media (max-width: 769px) {
    body {
        color: inherit;
        background: blue;
    }
}</code></pre>
        </div>
        <p>你會發現由大到小的寫法，我們會需要在後面小尺寸的 Media Queries 規則中，複寫更多的相同屬性並給予參數去覆蓋前面的值，如果不這麼做，上面的屬性就會一直被套用著。這也是為什麼很多資深開發者，皆認為「由小到大」的寫法才是優良的 Coding Style 習慣，但事實上對很多人來說，由大到小才是最習慣的開發方式，一部分原因往往是他們通常都是先從比較大尺寸的設計稿開始著手進行切版作業，等大尺寸（也就是俗稱的電腦版）完成後才接著向小尺寸（平板、手機版）延續作業的緣故。</p>
        <p><br></p>
        <h5>3. 寬度介於區間內</h5>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">body {
    background: blue;
}
@media (min-width: 768px) and (max-width: 1023px) {
    body {
        color: white;
        background: red;
    }
}
@media (min-width: 1024px) {
    body {
        font-size: 24px;
        background: green;
    }
}</code></pre>
        </div>
        <p>另外還有一種比較少，但也並非全然沒有的人，會使用區間的語法規則來撰寫 Media Queries，它的思維與第一類「由小到大」的開發者類似，雖然看似搞剛，不過對一些人──尤其是對新手來說，區間的寫法反而有助於他們更直觀、迅速了解樣式規則。</p>
        <p><br></p>
        <p>儘管我們可能會常在具權威的 Coding Style 文章看到 Media Queries 應該怎麼寫怎麼寫才是最「正確」的，但其實只要清楚知道自己所使用的邏輯，或是配合團隊的共同規則，那麼也沒那麼必要執著應該是要由小到大、還是要由大到小的書寫方式了。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/CSS/Media_Queries/Using_media_queries" target="_blank">使用 media queries</a></dd>
            <dd><a href="https://www.w3schools.com/css/css3_mediaqueries_ex.asp" target="_blank">CSS Media Queries - Examples</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/201810/css-media-queries.html" target="_blank">CSS Media Queries 詳細介紹</a></dd>
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
