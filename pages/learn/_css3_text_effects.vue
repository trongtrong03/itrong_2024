<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="37" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、文字陰影</a></li>
            <li><a href="#act2">二、文字漸層</a></li>
            <li><a href="#act3">三、文字描邊與鏤空</a></li>
            <li><a href="#act4">四、特效賞析</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>過去 CSS 針對文字的操作大多集中於大小、字距或換行方面的格式調整，較少就文字本身效果方面做變化，而 CSS3 則大幅度補足了這方面的缺憾，不僅可以利用相關屬性給予文字特殊的效果變化，也可以結合其他像是變形（Transform）或濾鏡（Filter）這類型的特效屬型，讓文字有更多元、豐富的呈現方式。本篇文章內容主要介紹些 CSS3 新增的文字特效屬性，以及分享一些網路各路高手利用純 CSS 語法編寫的特效文字創作。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、文字陰影</h2>
        <p>相信不少人都知道 <em>box-shadow</em> 屬性可以用來設置元素陰影，但該屬性只能針對元素本身，無法套用到元素內的文字上，如果想賦予文字陰影，則必須使用 <em>text-shadow</em> 屬性。</p>
        <p>語法規則：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">selector {
    text-shadow: x y blur spread color;
}</code></pre>
        </div>
        <p><em>x</em> 與 <em>y</em> 分別代表水平與垂直位移，<em>blur</em> 表示陰影模糊強度，<em>spread</em> 則是擴散程度，<em>color</em> 為陰影的顏色。基本上它們的預設值為 <em>0</em>（顏色則是黑色），如果沒有填入參數的話該值會視為 <em>0</em>。</p>
        <p>和 <em>box-shadow</em> 相同，單一元素可設置多重陰影，只需要用逗號隔開即可，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h2 {
    text-shadow: 0px 0px 0px red, 2px 2px 2px blue, -2px -2px 2px green;
}</code></pre>
        </div>
        <p><br></p>
        <p>前面有提到 <em>box-shadow</em> 的效果無法單就針對文字去添加陰影，我們來實際看看效果是怎麼樣的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    box-shadow: 0 0 4px 0 #000;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-shadow">
                <p style="box-shadow: 0 0 4px 0 #000;">Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        <p>換成使用 <em>text-shadow</em> 的話：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    text-shadow: 0 0 4px #000;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-shadow">
                <p style="text-shadow: 0 0 4px #000;">Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
        <p>同場加映多重文字陰影的效果展示：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    text-shadow: 2px -2px 2px red, 2px 2px 2px blue, -2px -2px 2px green
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-shadow">
                <p style="text-shadow: 2px -2px 2px red, 2px 2px 2px blue, -2px -2px 2px green">Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、文字漸層</h2>
        <p>實現文字漸層的方法並非單一屬性直接去設置，而核心屬性 <em>background-clip</em> 也並非是單純針對文字特效誕生的屬性，以下我們先來看語法範例，再來講解各屬性的用途：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h1 {
    color: transparent;
    background: linear-gradient(to bottom, #F00 0%,#000 100%);
    -webkit-background-clip: text;  
    background-clip: text;
}</code></pre>
        </div>
        <p>首先，我們必須將文字顏色設置成透明色（<em>transparent</em>），如此在接下來填入背景色漸層與 <em>background-clip</em> 時，才能確保不會被文字顏色給覆蓋過去。而背景（<em>background</em>）的漸層色（<em>linear-gradient</em>）用來決定文字漸層的主要色彩。</p>
        <p>再來說說最重要的 <em>background-clip</em> 屬性，本屬性主要用途在於透過設定裁切範圍，控制圖片顯示區域。它有四種屬性值，以下透過表格來解釋：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">屬性值</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>border-box</em></div>
                    <div class="f-f1">背景延伸至邊框（border），預設值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>padding-box</em></div>
                    <div class="f-f1">背景延伸至內距（padding），但不包含邊框</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>content-box</em></div>
                    <div class="f-f1">背景延伸至元素內容（content），但不包含內距與邊框</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>text</em></div>
                    <div class="f-f1">以元素內文字為延伸範圍，超出部分都會被裁剪掉</div>
                </div>
            </div>
        </div>
        <p>看完 <em>background-clip</em> 介紹，應該就不難理解為什麼要設定文字色彩為透明色，這是為了讓背景延伸範圍只裁切到文字部分，所以與其說是文字漸層，說是讓背景產生文字遮色片的效果也許會更加貼切一些。</p>
        <p>範例：</p>
        <div class="text-example">
            <div class="ex-shadow">
                <p><strong>Lorem ipsum dolor sit amet.</strong></p>
            </div>
        </div>
        <blockquote class="is-warning">
            <p>目前 <em>background-clip</em> 瀏覽器相容性仍不高，建議添加前綴以防部份瀏覽器不支援語法格式。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act3">
        <h2>三、文字描邊與鏤空</h2>
        <p>就像 <em>text-shadow</em> 之於 <em>box-shadow</em>，CSS3 同樣提供設定文字邊框的新屬性，其語法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">selector {
    -webkit-text-stroke: width color;
}</code></pre>
        </div>
        <p><em>-webkit-text-stroke</em> 是同時包含 <em>-webkit-text-stroke-width</em> 和 <em>-webkit-text-stroke-color</em> 兩個屬性的簡寫語法，因此也可以拆寫，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #F00;
}</code></pre>
        </div>
        <p>至於若要將文字鏤空，只需要將文字顏色設置為透明色即可。當然，我們優先會想到使用 <em>color</em> 屬性，不過還有另外一個 CSS3 填色屬性可以運用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    -webkit-text-fill-color: transparent;
}</code></pre>
        </div>
        <p>它與 <em>color</em> 的呈現結果上幾乎無異，但是當兩者同時被設置的時候，因前者權重較高，故會以前者的屬性值為優先顯示結果，不過在瀏覽器相容性方面表現則遠比後者來得差。</p>
        <p>範例：</p>
        <div class="text-example">
            <div class="ex-shadow">
                <p><b>Lorem ipsum dolor sit amet.</b></p>
            </div>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、特效賞析</h2>
        <p>最後這個章節我們來看看一些神人如何活用 CSS 屬性來實現文字的有趣特效吧！</p>
        <div class="text-link">
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-1.jpg">
                </figure>
                <a href="https://codepen.io/prathkum/pen/dyMPErw" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-2.jpg">
                </figure>
                <a href="https://codepen.io/argyleink/pen/wvMxEXM" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-3.jpg">
                </figure>
                <a href="https://codepen.io/havardob/pen/PoPaWaE" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-4.jpg">
                </figure>
                <a href="https://codepen.io/havardob/pen/WNQwvze" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-5.jpg">
                </figure>
                <a href="https://codepen.io/TajShireen/pen/abzmoRE" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-6.jpg">
                </figure>
                <a href="https://codepen.io/RickyMarou/pen/dyoMXYR" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-7.jpg">
                </figure>
                <a href="https://codepen.io/AdamDipinto/pen/EqxaEO" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-8.jpg">
                </figure>
                <a href="https://codepen.io/inegoita/pen/wLxObg" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-9.jpg">
                </figure>
                <a href="https://codepen.io/YusukeNakaya/pen/boyOYm" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-10.jpg">
                </figure>
                <a href="https://codepen.io/uzcho_/pen/LaPqWJ" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-11.jpg">
                </figure>
                <a href="https://codepen.io/GeorgePark/pen/wEQpmo" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-12.jpg">
                </figure>
                <a href="https://codepen.io/markmead/pen/YjQKeZ" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-13.jpg">
                </figure>
                <a href="https://codepen.io/mandymichael/pen/PaBraK" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-14.jpg">
                </figure>
                <a href="https://codepen.io/esse/pen/qxmqPQ" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-15.jpg">
                </figure>
                <a href="https://codepen.io/nathantaylor/pen/veOGMo" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-16.jpg">
                </figure>
                <a href="https://codepen.io/ramenhog/pen/VboyrL" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-17.jpg">
                </figure>
                <a href="https://codepen.io/bennettfeely/pen/EjBqoL" target="_blank"></a>
            </div>
            <div>
                <figure>
                    <img src="/images/learn/css/css3-text-18.jpg">
                </figure>
                <a href="https://codepen.io/Jintos/pen/OJKodm" target="_blank"></a>
            </div>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://www.kip.com.tw/modules/news/article.php?storyid=37" target="_blank">CSS 3背景新屬性：background-clip</a></dd>
            <dd><a href="https://medium.com/coding-hot-pot/%E8%AA%8D%E8%AD%98-css-%E5%B1%AC%E6%80%A7-background-clip-94592b72a0d0" target="_blank">認識 css 屬性 background-clip</a></dd>
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
