<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="34" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Position 是什麼？</a></li>
            <li><a href="#act2">二、Position 有哪些參數？</a></li>
            <li><a href="#act3">三、座標偏移與 z-index</a></li>
            <li><a href="#act4">四、transform 中的 translate 有影響嗎？</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>對絕大多數的網頁前端初學者，包含我在內，<em>position</em> 無非是 CSS 中難以跨越的關卡之一，但偏偏許多排版的呈現，都必須借重 <em>position</em> 的特性，以達到理想中的布局效果。其實只要多花一些時間理解概念並多加練習，<em>position</em> 也沒有想像中那樣困難，本篇文章將一一介紹其幾種固有布局模式屬性的運用概念，以及 CSS3 新增的 <em>sticky</em> 屬性。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>Position 是什麼？</h2>
        <p>CSS 的 <em>position</em> 和 <em>display</em> 屬性可以說是網頁排版裡地位舉足輕重，且所有前端開發者皆不得不學習的兩大重要屬性，<em>position</em> 主要用途在改變當前目標元素相對父元素或瀏覽器的空間位置，雖然用純文字敘述會覺得有些抽象，但後續章節透過示意圖搭配實際演練就會比較容易理解了。</p>
        <p>雖說 <em>position</em> 在 CSS 發展中已經存在很久，但它本身沒有什麼系列屬性，語法規則定義就一種：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: static;
}</code></pre>
        </div>
        <p><em>static</em> 是預設值，表示調用該選擇器的 HTML 元素 <em>position</em> 值為「靜態定位」，不受偏移屬性影響。所謂的偏移屬性指的是 <em>top</em>、<em>right</em>、<em>bottom</em>、<em>left</em> 這四大各自代表不同方向的屬性，依據 <em>position</em> 參數的不同，這些偏移屬性也將會對其產生不同影響。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、Position 有哪些參數？</h2>
        <p><em>position</em> 一共有五個參數，分別是：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">屬性</div>
                    <div class="f-f1">用途</div>
                    <div class="f-f1">偏移與Z軸影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>static</em></div>
                    <div class="f-f1">靜態定位</div>
                    <div class="f-f1">不受影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>relative</em></div>
                    <div class="f-f1">相對定位</div>
                    <div class="f-f1">受影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>absolute</em></div>
                    <div class="f-f1">絕對定位</div>
                    <div class="f-f1">受影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>fixed</em></div>
                    <div class="f-f1">固定定位</div>
                    <div class="f-f1">受影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>sticky</em></div>
                    <div class="f-f1">黏性定位</div>
                    <div class="f-f1">受影響</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>static（靜態定位）</h3>
        <p>此為 <em>position</em> 屬性的預設值，表示元素完全不受偏移屬性與 <em>z-index</em> 的影響。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: static;
}</code></pre>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/position-1.jpg">
        </figure>
        <p><br></p>
        <p>接下來的實際演練裡，我們分別設置三個矩形方塊 A、B、C，A 和 C 是完全不套用任何 <em>position</em> 值的一般方塊，B 則會根據介紹 <em>position</em> 帶入不同參數值，以比較異同。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.B {
    position: static;
    top: 50px;
    left: 50px;
    z-index: 1;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position">
                <ul>
                    <li class="a">
                        <span>A</span>
                    </li>
                    <li class="b" style="position: static; top: 50px; left: 50px; z-index: 1;">
                        <span>B</span>
                    </li>
                    <li class="c">
                        <span>C</span>
                    </li>
                </ul>
            </div>
        </div>
        <p>矩形方塊的 <em>display</em> 值設定為 <em>inline-block</em>，因此兩個方塊呈現並排，但可以發現 B 方塊即使添加了 <em>top</em>、<em>left</em> 屬性，它也沒有按照其設置的參數進行偏移，<em>z-index</em> 亦然。</p>
        <p><br></p>
        <h3>relative（相對定位）</h3>
        <p>設置此屬性值的元素會受到偏移屬性與 <em>z-index</em> 的影響，但偏移不影響後續其他元素，且原本佔據的空間依然佔據著。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: relative;
}</code></pre>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/position-2.jpg">
        </figure>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.B {
    position: relative;
    top: 20px;
    left: -20px;
    z-index: 1;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position">
                <ul>
                    <li class="a">
                        <span>A</span>
                    </li>
                    <li class="b" style="position: relative; top: 20px; left: -20px; z-index: 1;">
                        <span>B</span>
                    </li>
                    <li class="c">
                        <span>C</span>
                    </li>
                </ul>
            </div>
        </div>
        <p>從範例展示中可以看到 B 確實吃到了偏移屬性設定的值，且因為設定 <em>z-index</em> 值的關係，它會疊在沒有設定 <em>z-index</em> 或 <em>z-index</em> 數字小於其數值的上方。而又因為 <em>relative</em> 會保有該元素實體空間的特性，所以會發現 B 方塊移動了，但 C 方塊仍然留在原本位置上。</p>
        <p>另外需要注意的是，偏移的基準點是由元素的左上角為起始點作偏移。</p>
        <p><br></p>
        <h3>absolute（絕對定位）</h3>
        <p>絕對定位與相對定位最大的差別在於使用絕對定位的元素，將不再佔據空間，意即原本所處的空間將由後續其他元素填補，而它則會像「懸浮」般的貼在畫面上。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: absolute;
}</code></pre>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/position-3.jpg">
        </figure>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.B {
    position: absolute;
    top: 20px;
    left: -20px;
    z-index: 1;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position">
                <ul>
                    <li class="a">
                        <span>A</span>
                    </li>
                    <li class="b" style="position: absolute; top: 20px; left: -20px; z-index: 1;">
                        <span>B</span>
                    </li>
                    <li class="c">
                        <span>C</span>
                    </li>
                </ul>
            </div>
        </div>
        <p>絕對定位（<em>absolute</em>）大概也是最多人學習 <em>position</em> 屬性時最難咀嚼下嚥的難關，最常聽到的問題是為什麼設置 <em>absolute</em> 的元素，定位並不在自己預期中的位置，或是為什麼不在父元素區塊範圍之內等等，舉例來說：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="rNegpNR" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS: position-4">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/rNegpNR">
            CSS: position-4</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <blockquote class="is-question">
            <p>從這個案例可以看到子元素的定位（<em>top: 0px</em>、<em>left: 100px</em>）並沒有確實落在父元素左上角開始算起的位置，這是為什麼？</p>
        </blockquote>
        <p>主要是因為絕對定位的元素，會向上參考是否有其他定位（除了 <em>static</em> 之外的定位屬性）的父元素，如果有，則會以該元素作為基準點進行偏移，假如沒有，則會繼續向上找直到根元素（<em>&lt;html&gt;</em>）為止，至於 <em>z-index</em> 也是一樣概念。</p>
        <p>回到上面的範例，由於包含子元素的父元素本身沒有設定 <em>position</em> 屬性，則瀏覽器將採預設值──也就是 <em>static</em>，無定位的情況下屬性為絕對定位的子元素則繼續向上尋求定位基準，最後碰到了根元素，便以其左上角作偏移基準點。</p>
        <p>如果我們給父元素加上 <em>position: relative</em>，就會得到子元素定位基準以父元素為依據的結果。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="QWNRQye" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS: position-5">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/QWNRQye">
            CSS: position-5</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>fixed（固定定位）</h3>
        <p>固定定位與絕對定位的特性有那麼一些類似，都是「浮貼」在畫面上不佔據實體空間。然而不同的是，設定為 <em>fixed</em> 的子元素不會參考父元素是否為除了 <em>static</em> 以外的定位屬性，而是直接以根元素（<em>&lt;html&gt;</em>）的左上角作基準點偏移。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: fixed;
}</code></pre>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/position-4.jpg">
        </figure>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.B {
    position: fixed;
    top: 20px;
    left: -20px;
    z-index: 1;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position">
                <ul>
                    <li class="a">
                        <span>A</span>
                    </li>
                    <li class="b" style="top: 20px; left: -20px; z-index: 1;" :class="fixed==true ? 'is-fixed' : ''">
                        <span>B</span>
                    </li>
                    <li class="c">
                        <span>C</span>
                    </li>
                </ul>
            </div>
            <div class="fixed-status">
                <button id="fixed" @click="fixed = !fixed;">fixed</button>
                <span v-if="fixed == true">:On</span>
                <span v-else>:Off</span>
            </div>
        </div>
        <p>因為 <em>fixed</em> 範例結果的展示比較特別，直接展示結果會影響整篇文章的閱讀性，所以此範例以按鈕觸發的方式來進行展示，當你點擊 <em>fixed</em> 按鈕時，注意整個瀏覽器畫面的左上角。</p>
        <p>當你按下 <em>fixed</em> 按鈕時範例中的 B 方塊 <em>position</em> 值變成 <em>fixed</em> 後，會發現 B 方塊直接以網頁根元素左上角去做偏移定位，不僅如此，當網頁上下捲動，該方塊始終定位在原本的位置紋絲不動，這就是 <em>fixed</em> 的特性。通常這類效果很常運用在網頁中需要懸浮固定在指定位置的功能區塊，例如 Header 導覽列、返回頂部的按鈕......等。</p>
        <p><br></p>
        <h3>sticky（黏性定位）</h3>
        <p><em>sticky</em> CSS3 新增的定位屬性參數，它同時結合了 <em>relative</em> 與 <em>fixed</em> 特性，一般多用於畫面捲動到一定程度時，指定的元素隨即固定在畫面上的場合。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: sticky;
}</code></pre>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/position-5.jpg">
        </figure>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.B {
    position: sticky;
    top: 20px;
    left: -20px;
    z-index: 1;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position">
                <ul>
                    <li class="a">
                        <span>A</span>
                    </li>
                    <li class="b" style="position: sticky; top: 20px; left: -20px; z-index: 1;">
                        <span>B</span>
                    </li>
                    <li class="c">
                        <span>C</span>
                    </li>
                </ul>
            </div>
        </div>
        <p>請在上方範例中試著滾動視窗右側卷軸，會發現使用 <em>sticky</em> 屬性值的元素，不若 <em>fixed</em> 那樣會直接固定在畫面不作任何變化，而是會在它所處的區域開始移動時，依據其設定的 <em>top</em> 值定位於畫面上。</p>
        <blockquote class="is-info">
            <p>過往要實現這樣的效果大多需要依賴 JavaScript 的幫助，但 CSS3 新增此屬性值後只要幾行樣式就能搞定，非常方便。儘管如此，和其他 CSS3 屬性相同，無法為舊版本瀏覽器所相容，因此使用前仍須評估是否要兼顧舊版本的瀏覽器使用者體驗。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act3">
        <h2>三、座標偏移與 z-index</h2>
        <p>這個篇章的重點將重申或補充一些關於座標偏移與 <em>z-index</em> 等屬性的幾個觀念：</p>
        <p><br></p>
        <h3>座標偏移：</h3>
        <p>指的就是 <em>top</em>、<em>right</em>、<em>bottom</em>、<em>left</em> 這四個屬性，分別代表向上、右、下、左偏移。屬性數值的單位可以是任何絕對或相對單位，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: relative;
    top: 50px;
    left: 10%;
}</code></pre>
        </div>
        <p>當元素定位為 <em>relative</em>，其座標以父元素左上角為原點作偏移，而 <em>absolute</em> 則是以父元素整體作偏移。</p>
        <blockquote class="is-warning">
            <p>若 <em>top</em> 與 <em>bottom</em> 同時存在時，則偏移會以 <em>top</em> 值為先，而 <em>left</em> 則優先於 <em>right</em>，除非 <em>top</em>、<em>left</em> 設置為 <em>auto</em>（預設值），才會以另外兩個偏移屬性的參數為主。</p>
        </blockquote>
        <p><br></p>
        <p>另外，當元素同時設置四個方向的偏移屬性且其值皆為 <em>0</em> 的時候，可以有以下兩種效果運用：</p>
        <p>1. 父子元素沒有明確寬高，子元素寬高會填滿整個父元素，等同 <em>width: 100%</em> 與 <em>height: 100%</em> 的效果。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position2">
                parent
                <div class="child1">child</div>
            </div>
        </div>
        <p><br></p>
        <p>2. 父子元素都有明確寬高，子元素加入 <em>margin: auto</em> 屬性，可實現子元素水平垂直居中的效果。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    margin: auto;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position2">
                parent
                <div class="child2">child</div>
            </div>
        </div>
        <p><br></p>
        <h3>z-index：</h3>
        <p><em>z-index</em> 屬性用來設定非無定位（<em>static</em>）之定位元素發生重疊時的前後順序，其預設值是 <em>auto</em>，也可以視作為 <em>0</em>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: relative;
    z-index: 5;
}</code></pre>
        </div>
        <p>參數為純數值，參數值可設定正數和負數，正數數字越大代表越上面。在此語法範例中，只要同階層其他元素的 <em>z-index</em> 小於 <em>5</em>，重疊時皆在該元素之後（或稱下方），假設同時存在複數個參數值皆為 <em>5</em> 的元素發生交疊，則以原始碼較後方的元素會覆蓋前方元素之前。</p>
        <p><br></p>
        <p>另外，多個 <em>z-index</em> 的子元素重疊順序只在擁有 <em>z-index</em> 的第一個父元素內進行比較，假設向上遍歷父元素直至根元素都沒有碰到任何一個 <em>z-index</em>，子元素的 <em>z-index</em> 才可和其他不同父元素及其附屬的子元素比大小。請見下例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="ZEGOwOr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-learn: z-index">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/ZEGOwOr">
            CSS-learn: z-index</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、transform 中的 translate 有影響嗎？</h2>
        <p>這個算是許多初學者實務上容易產生混亂的問題之一，我們都知道影響目標對象位置的 CSS 屬性除了本篇文章介紹的「偏移」屬性外，尚有 <em>transform</em> 的位移函數 <em>translate</em>，那麼，在目標對象已經添加 <em>position</em> 及偏移屬性，或已經使用 <em>translate</em> 函數的情況下，再套用另一個偏移屬性會互相牴觸或影響嗎？</p>
        <p>答案是不會互相牴觸，不過由於偏移與位移會個別運作，因此當兩類屬性同時存在於單一目標對象時，該對象會同時吃偏移屬性的設定和位移函數的值。實務上比較常見兩者同時運用的場合，當屬要將不確定尺寸的對象元素在區域內居中對齊的時候，其寫法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-position2">
                parent
                <div class="child3">child</div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/position" target="_blank">MDN web docs</a></dd>
            <dd><a href="https://www.cnblogs.com/coco1s/p/6402723.html" target="_blank">使用 position:sticky 实现粘性布局</a></dd> 
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
