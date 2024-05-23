<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Transform 的基本語法' },
        { id: 2, title: '二、有哪些變形效果？' },
        { id: 3, title: '三、我能同時套用多個變形效果嗎？' },
        { id: 4, title: '四、如何改變元素變形的中心點起始位置？' },
        { id: 5, title: '五、3D 變形效果的透視概念（perspective）' },
        { id: 6, title: '六、3D 變形效果的屬性運用' },
        { id: 7, title: '七、進階：Transform 的 Matrix（矩陣）' },
        { id: 8, title: '八、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="9" fileType="learnCSS" />
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
        <p>CSS3 中的 Transform 系列屬性是一種使元素形貌產生變化的屬性，它就像 Photoshop 的「變形」功能，可以讓元素旋轉、縮放、傾斜，且變形範圍不僅侷限於二維空間，三維方向同樣可以做變化。Transform 令 HTML 元素運用更加靈活，也降低對外部媒介（譬如：JavaScript、透過專業軟體處理輸出成影像......等）的依賴，是 CSS3 相當具代表性的屬性之一。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>Transform 的 CSS 語法屬性名稱為 <em>transform</em>，和 CSS3 另一個使用率廣泛的 <em>animation</em> 屬性相比，<em>transform</em> 的語法規則比較單純，各種變化效果只需透過 <em>transform</em> 一行就能設置：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">element {
    transform: value(argument);
}</code></pre>
        </div>
        <p><em>value</em> 指的是要變形的效果，例如位移或旋轉，而括號內則是該效果的變量。假設我們要令元素透過變形效果水平向右位移 <em>50px</em>，語法如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: translateX(50px);
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>變形效果分為 2D 與 3D 兩種，由於 3D 變形效果的規則比較複雜，這裡只先談 2D 變形的部分。總的來說，CSS3 Transform 提供四種直觀的效果參數，分別是：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Value</div>
                    <div class="f-f1">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>translate</em></div>
                    <div class="f-f1">位移</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>scale</em></div>
                    <div class="f-f1">縮放</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>rotate</em></div>
                    <div class="f-f1">旋轉</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>skew</em></div>
                    <div class="f-f1">傾斜</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>translate（位移）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: translate(x, y);
}</code></pre>
        </div>
        <p>位移的概念與偏移屬性（<em>top</em>、<em>left</em>...）相似，但它不需要設定 <em>position</em> 屬性。語法內的 <em>x</em>、<em>y</em> 值分別從元素參考點中心往水平（X 軸）與垂直（Y 軸）移動。假設 <em>translate()</em> 裡面只有設定一個值，則視為 <em>x</em> 軸位移，<em>y</em> 軸位移為 <em>0</em>。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="GRpXKWe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-1">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/GRpXKWe">
            css3: transform-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>在範例中 <em>x</em> 值以百分比表示，百分比的位移程度是以元素寬度去計算，例如 <em>50%</em> 即位移該元素一半的寬度。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: translateX(length);
    transform: translateY(length);
}</code></pre>
        </div>
        <p><br></p>
        <h3>scale（縮放）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: scale(x, y);
}</code></pre>
        </div>
        <p>以元素參考點為中心做 X、Y 軸的倍率縮放，它填入的值只能是純數字（因為是倍數的意思），不接受其他單位，例如像素（<em>px</em>）或百分比（<em>%</em>）等都不能加入到屬性值內。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="MWaqWar" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/MWaqWar">
            css3: transform-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>假如只填入一個數字，代表 X 與 Y 軸縮放的倍率相同。此外，如同位移效果，縮放亦可分別定義 X 與 Y 軸的縮放程度：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: scaleX(number);
    transform: scaleY(number);
}</code></pre>
        </div>
        <p><br></p>
        <h3>rotate（旋轉）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: rotate(θ);
}</code></pre>
        </div>
        <p>以元素的參考點為中心進行旋轉，單位為 <em>deg</em>，代表角度，若填入的數字為正值，代表元素以順時針旋轉，負值則為逆時針。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="WNQgNzX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-3">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/WNQgNzX">
            css3: transform-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>skew（傾斜）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: skew(θx, θy);
}</code></pre>
        </div>
        <p>以元素參考點為中心，使其分別向 X、Y 軸傾斜填入的角度。倘若只填入一個值，代表只有 X 軸傾斜，Y 軸不傾斜。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="KKdxKxR" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-4">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/KKdxKxR">
            css3: transform-4</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>看過前面 <em>translate()</em> 與 <em>scale()</em>，應該心裡多少已有些底了吧？只要分別填入 X、Y 軸，就能更針對性地單獨定義其中一個方向的變形屬性，因此傾斜效果也不例外：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: skewX(θ);
    transform: skewY(θ);
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>有些人會疑惑是否能在單一元素同時套用多個 <em>transform</em> 的效果？答案是可以的。但有別於許多人容易搞混的 <em>transition</em> 屬性，是以「逗號」來區隔不同的屬性值數組，<em>transform</em> 則以「空白符」區別不同的變形效果設置。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: translateX(-50%) rotate(45deg) skew(5deg, 15deg);
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>在第二個章節問題中，眼尖的你會發現在我們介紹各種變形效果時，語句裡時不時會提到「以參考點為中心」之句讀，那麼究竟什麼是參考點？要如何知道它中心點的位置？又是否能修改它？</p>
        <p>首先我們要知道，元素進行任何變化時，都必須要以其內部的某一個點為中心，這個點就是參考點，以下拿 Photohop 當作範例：</p>
        <figure>
            <img src="/images/learn/css/transform-1.jpg">
        </figure>
        <p>當編輯綠色圖形變形效果時，其中央有一個圓形的小圓圈，它便是該圖形的參考點。一般而言，HTML 元素的參考點中心為正中央。假如要更改它的參考點，我們可以使用 <em>transform-origin</em> 屬性。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform-origin: x y z;
}</code></pre>
        </div>
        <p>計算起點是以元素的左上角為基準點，參數預設值為 <em>50% 50% 0%</em>，剛好就是元素的正中心。單位除了百分比外，也可以使用固定單位、角度（deg）或是偏移方向的名稱（<em>top</em>、<em>right</em>、<em>bottom</em>、<em>left</em>）。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="rNOZaYa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-origin">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/rNOZaYa">
            css3: transform-origin</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>如果 <em>transform-origin</em> 僅填入一個數值，則代表其三軸參考點位置皆相同；若只填入兩個值，則 Z 軸會被忽略。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>二維與三維最大的不同，在於方向除了 X 軸與 Y 軸外，還多了 Z 軸，示意圖如下：</p>
        <figure>
            <img src="/images/learn/css/transform-3d-1.jpg">
        </figure>
        <p>如果說 X、Y 軸共同交織出平面，那麼 Z 軸則是將平面物件變成立體，假設我們將 X 軸視為螢幕的水平方向，Y 軸為垂直方向，那麼 Z 軸就是一條自螢幕往使用者身上射出的虛擬座標軸。當然，瀏覽器不可能真的創造出立體物件，CSS3 中的 3D 效果利用了 Z 軸「透視」遠近深度的原理，使物件看起來像是立體化了一樣。</p>
        <p>然而，單純賦予元素對象 <em>transform</em> 3D 參數，是無法對其產生 3D 效果的，用來設定 3D 深度遠近的屬性名稱，叫做 <em>perspective</em>。<em>perspective</em> 用途在於定義元素透視點與 XY 軸所形成平面之間的距離，概念如下圖：</p>
        <figure>
            <img src="/images/learn/css/transform-3d-3.jpg">
        </figure>
        <p>示意圖中的「d」指的是物件（元素）到使用者（或稱攝影機）間的距離，而「z」則是物件的 Z 軸（translateZ），當 z 的數值越小，代表物件離我們越近，3D 的變化也越明顯；反之越遠，立體感也越不明顯。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    perspective: 100px;
}

.child {
    transform: ...  /* 屬性 */
}</code></pre>
        </div>
        <p>還有另一種定義 <em>perspective</em> 的方法是透過 <em>transform</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: perspective(100px) rotateX(45deg);
}</code></pre>
        </div>
        <p>以上這兩種方法實現出來的效果是一樣的。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="QWjzQMJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: perspective-1">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/QWjzQMJ">
            CSS3: perspective-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>此外，如果 <em>transform</em> 可以透過 <em>transform-origin</em> 屬性設置參考點，<em>perspective</em> 同樣也可以利用 <em>perspective-origin</em> 定義使用者（攝影機）的視線中心點，例如以下示意圖：</p>
        <figure>
            <img src="/images/learn/css/transform-3d-4.jpg">
        </figure>
        <p>藍色區域就是依據 <em>perspective-origin</em> 調整中心點後投現的可視範圍。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    perspective-origin: center center;    /* 預設值 */
}</code></pre>
        </div>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="bGVOmgM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: perspective-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/bGVOmgM">
            CSS3: perspective-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>（建議與前一個範例 <em>perspective</em> 比較會更容易感受到 <em>perspective-origin</em> 的作用。）</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>基本上，CSS3 Transform 3D 內建的直接效果屬性值與 2D 是一樣的，除了沒有「傾斜」（Skew）以外，有支援另外三個變形效果的 3D 模式：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Value</div>
                    <div class="f-f1">Description</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>translate3d</em></div>
                    <div class="f-f1">位移</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>scale3d</em></div>
                    <div class="f-f1">縮放</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>rotate3d</em></div>
                    <div class="f-f1">旋轉</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>translate3d（位移）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: translate3d(x, y, z);
}</code></pre>
        </div>
        <p><em>x</em>、<em>y</em> 值與 2D 相同，分別是指往水平及垂直方向位移，而 <em>z</em> 值自然指的就是 Z 軸，預設值從 <em>0</em> 開始，數字越大，代表物件越往攝影機的方向靠近；反之數字越小則距離越遠。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="zYveOqV" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: transform3D-1">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/zYveOqV">
            CSS3: transform3D-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>也可以只使用 <em>transform: translateZ(n)</em> 來單獨設定 Z 軸的偏移值。</p>
        <p><br></p>
        <h3>scale3d（縮放）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: scale3d(x, y, z);
}</code></pre>
        </div>
        <p>物件 3D 的縮放其實看不太出效果，但 <em>z</em> 的參數和另外兩個方向一樣皆是指該軸的縮放倍率。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="rNOPaxp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: transform3D-3">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/rNOPaxp">
            CSS3: transform3D-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>也可以只使用 <em>transform: scaleZ(n)</em> 來單獨設定 Z 軸的縮放倍率值。</p>
        <p><br></p>
        <h3>rotate3d（旋轉）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: rotate3d(x, y, z, θ);
}</code></pre>
        </div>
        <p><em>x</em>、<em>y</em>、<em>z</em> 分別對應旋轉軸三個方向的座標（通常會定義在 0 ~ 1 之間），<em>θ</em> 代表旋轉角度，單位可以是 <em>deg</em>（Degress，度）、<em>grad</em>（Gradians，梯度）、<em>turn</em>（Turns，圈數）、<em>rad</em>（Radians，弧度）等。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="oNjmvPB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: transform3D-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/oNjmvPB">
            CSS3: transform3D-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>三個方向的旋轉亦能單獨定義：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: rotateX(θ);
    transform: rotateY(θ);
    transform: rotateZ(θ);
}</code></pre>
        </div>
        <p>※ 避免誤會故提醒一下，上面語法定義單純圖方便，所以將三個 <em>transform</em> 寫在同一元素裡，若要套用複數屬性效果，務必記得正確的書寫方式是通過空白格隔開不同的參數。</p>
        <p><br></p>
        <p>另外補充各個角度單位的標準，請見下表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">單位</div>
                    <div class="f-f1">名稱</div>
                    <div class="f-f6">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>deg</em></div>
                    <div class="f-f1">度</div>
                    <div class="f-f6">一個圓等於 360 度</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>grad</em></div>
                    <div class="f-f1">梯度</div>
                    <div class="f-f6">一個圓等於 400 梯度</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>turn</em></div>
                    <div class="f-f1">圈數</div>
                    <div class="f-f6">一個圓等於 1 圈</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>rad</em></div>
                    <div class="f-f1">弧度</div>
                    <div class="f-f6">一個圓等於 2π 弧度</div>
                </div>
            </div>
        </div>
        <blockquote class="is-info">
            <p>90deg = 100grad = 0.25turn ≈ 1.570796326794897rad</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p>除了熟知的位移（Translate）、旋轉（Rotate）、縮放（Scale）以及傾斜（Skew）這四大基礎變形效果外，CSS3 Transform 屬性其實還有一個「隱藏版」的變形效果──Matrix，也就是矩陣的意思。但要說它是隱藏版其實也不大對，只是因為要會活用這個效果屬性，本身必須具備一定程度的數學底子，對於我們這些非數學應用相關科系領域出身的人來說，並不那麼容易上手，實務上大部分的網頁前端需求也不大會使用到 Matrix，因此該屬性效果自然比起其他幾個基礎效果也較鮮為人知。</p>
        <h3>什麼是矩陣？</h3>
        <p>矩陣是一個由列（row）與行（column）多個元素排成的方陣，例如下圖：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-1.jpg">
        </figure>
        <p>這是一個 <b>3 x 3</b> ──三列三行的矩陣。</p>
        <p>作為解決線性方程式的工具，矩陣的發展歷史相當悠遠，最早的文獻記載可追溯至...嗯，以下省略，本篇不是歷史課，沒有打算對矩陣的前世今生贅述太多，此刻我們只要大概知道數學裡的矩陣大概長什麼模樣，以及在生活中，其實處處都可以看到矩陣的運用。例如：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-2.jpg">
            <figcaption>秀泰影城的票價表。</figcaption>
        </figure>
        <figure>
            <img src="/images/learn/css/transform-matrix-3.jpg">
            <figcaption>台灣高鐵的票價表。</figcaption>
        </figure>
        <p><br></p>
        <h3>矩陣的名詞解釋：</h3>
        <figure>
            <img src="/images/learn/css/transform-matrix-4.jpg">
        </figure>
        <p>一個 <b>m</b> 列 <b>n</b> 行的矩陣稱作 <b>m x n</b> 階矩陣，圖中的矩陣即為 <b>2 x 3</b> 階矩陣。要注意喔，台灣與中國對於行列的定義是相反的，台灣習慣稱橫向的為列，縱向的為行，中國則反之。所以若你閱讀的資料是出自中國作者之手時，要記得自行轉換一下觀念。</p>
        <p>而矩陣中的每一個單位稱為「元」（或元素），假設有人提問「第一列第二行」的元是什麼？答案為「<b>2</b>」。</p>
        <p><br></p>
        <h3>不同矩陣的運算：</h3>
        <p>不同矩陣間的運算方式包含加法、減法與乘法，其中加法與減法必須要複數矩陣彼此間的行列相等，才可以進行元之間的對應。</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-5.jpg">
            <figcaption>兩矩陣間的第一列第一行互相相加（5 + 0），得出答案為 5，其他依此類推。</figcaption>
        </figure>
        <p>至於矩陣相乘的規則就相對複雜多了，其核心規則為：「前行與後列必須相等，則前列與後行相乘後加總」。</p>
        <p>如果要白話一點解釋，那就是「前面矩陣的行」，必須與「後面矩陣的列」數量相等，矩陣相乘才可以成立，而他們的結果則會是「前面矩陣的列」與「後面矩陣的行」相乘後的結果。</p>
        <p>...看上去依然很拗口，沒關係，我們直接看實例。</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-6.jpg">
            <figcaption>A、B、C 分別是一個矩陣。</figcaption>
        </figure>
        <p>同為 <b>2 x 3</b> 矩陣，<b>A</b> 矩陣 與 <b>B</b> 矩陣因不符合「前行後列相等」的規則，故無法進行相乘運算；而 <b>A</b> 矩陣與 <b>C</b> 矩陣則符合原則，相乘運算後將會是一個 <b>2 x 2</b> 的矩陣結果。</p>
        <p>接著我們來瞧瞧所謂「相乘後加總」究竟是怎樣一回事：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-7.jpg">
        </figure>
        <p>上圖分別是 <b>2 x 2</b> 與 <b>2 x 1</b> 的矩陣，套用前行與後列必須相等的條件，確定此矩陣相乘合法（皆為 <b>2</b>），且相乘後的矩陣將會是 <b>2 x 1</b> 矩陣。而新矩陣第一列第一行的元計算則是前列（<b>a</b>、<b>b</b>）與後行（<b>s</b>、<b>t</b>）兩兩對應相乘後再互相加總的結果，第二列第一行的元也是相同的推算方式。</p>
        <p>大概知道運算規則之後，實際練習是最快驗收是否有成功吸收的方式：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-8.jpg">
            <figcaption>請試著計算此矩陣相乘的結果。</figcaption>
        </figure>
        <p>算完了就可以往下滑查看正確答案：</p>
        <p>......<br></p>
        <p>.....<br></p>
        <p>....<br></p>
        <p>...<br></p>
        <p>..<br></p>
        <p>.<br></p>
        <figure>
            <img src="/images/learn/css/transform-matrix-9.jpg">
        </figure>
        <p>如果答對了，恭喜，你應該已經搞懂矩陣相乘的計算方式；答錯也不打緊，以下我們拿相乘結果之第一列第三行的答案「<b>5</b>」來作演算歷程：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-10.jpg">
        </figure>
        <p>謹記一個原則：兩矩陣相乘，前者以橫列去與後者的直行相乘，最後相加便得新矩陣的結果。</p>
        <p>學到這裡，差不多已經可以嘗試去理解 CSS3 <em>transform</em> 屬性中的 <em>matrix</em> 矩陣要如何下定義了，當然矩陣的運算及特殊規則絕對不僅於此，但這裡終究不是數學課，避免混淆，我們對數學矩陣的認識就先到這裡打住，將戰場轉移到 CSS 世界去。</p>
        <p><br></p>
        <h3>CSS Transforem 的 matrix()：</h3>
        <p>在 CSS3 <em>transform</em> 屬性中，<em>matrix</em> 的公式語法是長這個樣子的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix(a, b, c, d, tx, ty);
}</code></pre>
        </div>
        <p>如果要用矩陣來表示，則會是這副模樣：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-11.jpg">
        </figure>
        <p>有些網路文章會將 <em>tx</em> 與 <em>ty</em> 值分別用 <em>e</em>、<em>f</em> 取代，其實概念是一樣的，並無傷大雅。至於第三列為什麼會多補 <em>0 0 1</em>，目前還沒有看到比較詳細明瞭的解釋（也許是與 Z 軸有關？），現階段只好先強硬接受它。</p>
        <p>一個巴掌拍不響，當我們填入 <em>matrix()</em> 裡的六個數值，它們會和元素參考點相乘，計算出最後變化的結果。</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-12.jpg">
        </figure>
        <p><b>x</b>、<b>y</b> 分別指的是元素的參考點座標，根據兩矩陣相乘的結果，最後會得出新的 <b>xy</b> 座標值。以下實際練習一個例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix(1, 0, 0, 1, 20, 20);
}</code></pre>
        </div>
        <p>另外假設元素參考點的 <b>(x, y)</b> 座標值為 <b>(0, 0)</b>，那麼實際代入到公式時會變成這樣：</p>
        <figure>
            <img src="/images/learn/css/transform-matrix-13.jpg">
        </figure>
        <p>由此可知新的參考點座標是 <b>(20, 20)</b>，換言之，該元素的參考點從原先的 <b>(0, 0)</b> 位移到 <b>(20, 20)</b>，相當於元素向水平及垂直方向各偏移了 <em>20px</em> 的位移量...看到這裡，是不是覺得跟 <em>translate</em> 的用法很類似呢？不信的話我們可以看看實例便知：</p>
        <div class="text-codepen">
            <code>
                <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="XWmOBrb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-matrix-1">
                <span>See the Pen <a href="https://codepen.io/itrong/pen/XWmOBrb">
                css3: transform-matrix-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
                </p>
            </code>
        </div>
        <p>是的，不管是 <em>translate</em>、<em>scale</em>、<em>rotate</em>、<em>skew</em>，其實都是從 <em>matrix</em> 衍生出來的快速給值方法。所以 <em>matrix()</em> 裡提供的六個值，各自代表的是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() );
}</code></pre>
        </div>
        <p><br></p>
        <h4>位移：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix(1, 0, 0, 1, tx, ty);
}</code></pre>
        </div>
        <p>上面的介紹中已經提過位移的矩陣表示方法，這裡就不再重複說明。</p>
        <p><br></p>
        <h4>縮放：</h4>
        <p>根據定義，影響矩陣縮放的參數是 <em>matrix()</em> 第一及第四位的數字。</p> 
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix(1, 0, 0, 1, 0, 0);
}</code></pre>
        </div>
        <p>第一個數字改變的是 <b>X</b> 軸方向的縮放倍率，第四個數字則是 <b>Y</b> 軸方向的縮放倍率。範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="RwWveeg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-matrix-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/RwWveeg">
            css3: transform-matrix-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h4>旋轉＆傾斜：</h4>
        <p>這兩個的參數計算方式比起位移和縮放複雜許多，因為它們必須動用到三角函數的概念（什麼賽、摳賽的...），這些東西早就已經通通還給了高中數學老師。再者，用 <em>matrix()</em> 寫旋轉或傾斜實在很沒效率，舉例來說，如果我們要令元素旋轉 <em>30deg</em>，我們可以直接用 <em>rotate()</em> 這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: rotate(30deg);
}</code></pre>
        </div>
        <p>但如果要用矩陣去表示，則會變成一串相當複雜之數字：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix(0.866025, 0.500000, -0.500000, 0.866025, 0, 0);
}</code></pre>
        </div>
        <p>以下提供一個簡易矩陣傾斜變化工具，有興趣的看倌可以玩玩看傾斜角度的變化與矩陣的運算方式，感受矩陣的計算有多複雜。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="eYpxQBp" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-matrix-3">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/eYpxQBp">
            css3: transform-matrix-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>matrix3d()</h3>
        <p>3D 的矩陣變化又比 2D 矩陣複雜更多，其矩陣語法是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix3d(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
}</code></pre>
        </div>
        <p>和 2D 矩陣有點類似，基本數值中的 <em>1</em>（撇除最後一列不算），掌控的就是三軸方向的縮放倍率。範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="LYpozxX" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-matrix3d-1">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/LYpozxX">
            css3: transform-matrix3d-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p><em>translate3d()</em> 的矩陣對應位置則是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    transform: matrix3d(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
    );
}</code></pre>
        </div>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="JjYqrye" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="css3: transform-matrix3d-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/JjYqrye">
            css3: transform-matrix3d-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>目前還不太清楚範例中 <em>matrix3d</em> 的 3D 位移效果為何沒有作用，等日後蒐羅到更多更詳盡的資料時再回頭檢視。至於傾斜與旋轉的部分...姑且先以一句「未完待續」作結吧。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform-function" target="_blank">MDN web docs --transform-function</a></dd>
            <dd><a href="https://juejin.im/post/5ab8b5ed51882548fe4a2069#heading-10" target="_blank">CSS3 transform 属性详解</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform-function#Coordinates_for_3D_graphics" target="_blank">MDN web docs --Coordinates for 3D graphics</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/201506/css-3d.html" target="_blank">玩轉 CSS 3D - 原理篇</a></dd>
            <dd><a href="https://www.itread01.com/content/1544474722.html" target="_blank">前端-CSS（x、y、z）座標的含義，以及變換的使用</a></dd>
            <dd><a href="https://eyesofkids.gitbooks.io/css3/content/contents/transform3d.html" target="_blank">變形(transform) 3D基本使用</a></dd>
            <dd><a href="https://juejin.im/entry/5c98b24af265da60f2070009" target="_blank">看图理解 perspective 和 preserve-3d</a></dd>
            <dd><a href="https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/" target="_blank">好吧，CSS3 3D transform变换，不过如此！</a></dd>
            <dd><a href="https://blog.hinablue.me/css3-matrix3d-yu-rotate3d-zhi-dao-di-zai-zhuan-shi-mo-gui/" target="_blank">[CSS3] matrix3d 與 rotate3d 之到底在轉什麼鬼</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=VGSfnZQQf5w" target="_blank">矩陣的乘法</a></dd>
            <dd><a href="https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/" target="_blank">理解CSS3 transform中的Matrix(矩阵)</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10197360" target="_blank">transform的matrix屬性</a></dd>
            <dd><a href="https://juejin.im/post/5d0ba96df265da1ba252659b" target="_blank">【css基础】如何理解transform的matrix()用法</a></dd>
            <dd><a href="https://www.jianshu.com/p/52e0018e6ce2" target="_blank">CSS3 matrix - matrix3d介绍</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
