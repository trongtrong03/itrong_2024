<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Animation 的基本語法' },
        { id: 2, title: '二、要如何製作動畫影格並讓指定元素取得它？' },
        { id: 3, title: '三、我可以讓動畫延遲播放嗎？' },
        { id: 4, title: '四、我可以讓動畫重複執行嗎？' },
        { id: 5, title: '五、動畫首尾呼應需要設定相同的關鍵影格嗎？' },
        { id: 6, title: '六、如何調整動畫的速度曲線？' },
        { id: 7, title: '七、如何讓元素在動畫執行完後保持最後結束的狀態？' },
        { id: 8, title: '八、補充一：控制動畫運行的狀態' },
        { id: 9, title: '九、補充二：關鍵影格的三兩事' },
        { id: 10, title: '十、結語' },
        { id: 11, title: '十一、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="8" fileType="learnList" />
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
        <p>過去若想製作網頁元素動畫，譬如元素要在時間內改變樣式、延遲多少秒才執行動畫、動畫過渡想遊快變慢...等等，不外乎是透過動態影像（GIF、FLASH...），或利用 JavaScript、jQuery 撰寫腳本去實現，這不僅耗時，也很費力。然而隨著 CSS3 的問世，不僅網頁前端開發產生巨大的變革，它同時也減輕網頁對 Javascript 的重度依賴，「動畫」便是其中一項，CSS3 的 <em>animation</em> 屬性讓網頁動畫製作不再那麼繁瑣，往往只需要設置幾個屬性就能搞定。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>CSS3 定義動畫效果的核心屬性為 <em>animation</em>，它的單一屬性撰寫規則是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">element {
    animation: Name 3s ease-in 1s infinite reverse both paused;
}</code></pre>
        </div>
        <p>當然這種一行式的寫法屬於高手境界，我個人會習慣將它拆分成各自獨立的屬性，然後一一去做設定，儘管比起單行的寫法相對繁瑣些，但拆開的寫法易讀性比較高，未來也會比較容易維護。那麼這些各自的參數值分別有什麼功用？以下透過一張表格簡單說明：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f2">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-name</em></div>
                    <div class="f-f2">動畫的名稱，對應的是 <em>@keyframe</em> 的命名。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-duration</em></div>
                    <div class="f-f2">動畫執行的長度。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-delay</em></div>
                    <div class="f-f2">動畫等待多久後開始執行。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-direction</em></div>
                    <div class="f-f2">動畫執行的方向，例如正敘或倒敘。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-iteration-count</em></div>
                    <div class="f-f2">動畫執行的次數</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-timing-function</em></div>
                    <div class="f-f2">動畫的速度曲線，也可以理解為加速度或是節奏。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-fill-mode</em></div>
                    <div class="f-f2">可決定動畫開始前與結束後的狀態。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>animation-play-state</em></div>
                    <div class="f-f2">控制動畫執行的狀態。</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-delay: .5s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>基本上 CSS3 動畫一個週期由四個階段所組成，分別是「初始狀態」、「等待期」、「執行期」、「完成期」。在初始狀態階段，我們可以先建立好指定元素想呈現的動畫內容（注意喔，這裡用的詞彙是「可以」，意思是說你也可以先設定好動畫相關參數，再來寫動畫內容），定義動畫規則的屬性為 <em>@keyframes</em>，並於自定義的關鍵影格（幀）中設置其他屬性樣式。其語法規則為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes animationName {
    keyframes-selector {
        css-styles;
    }
}</code></pre>
        </div>
        <p><em>animationName</em> 就是這組動畫影格的名稱，以令目標元素的 <em>animation-name</em> 可以指定到它。舉例來說，若要設定一個透明度（<em>opacity</em>）由 <em>0</em> 變為 <em>1</em> 的淡入出現動畫效果，則 <em>@keyframes</em> 動畫規則可以這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}</code></pre>
        </div>
        <p><em>@keyframes</em> 中的 <em>from</em> 其實就是動畫四個階段中的「初始狀態」，一般而言，若指定元素內 <em>opacity</em> 為 <em>0</em>，那麼要指定給它的動畫規則裡的初始值應該也會是 <em>0</em>。<em>to</em> 則是動畫結束處的關鍵影格，假如一個動畫規則沒有設定起始或結束影格，瀏覽器就會以元素自身設置的屬性作為起始或結束狀態。此外，<em>from</em> 與 <em>to</em> 也可以分別用百分比 <em>0%</em> 及 <em>100%</em> 表示，兩者可以混用。</p>
        <p>如果動畫要設置多個關鍵影格，我們可以在理想變化的關鍵點以百分比的方式加入屬性變值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes topMove {
    0% {
        top: 0px;
    }
    20% {
        top: -20px;
    }
    100% {
        top: 80px;
    }
}</code></pre>
        </div>
        <p>其他有關關鍵影格的一些用法和注意事項留到後面的章節再敘述，現在我們已經設定好關鍵影格規則，但動畫並不會自己在瀏覽器中觸發，我們需要在欲執行動畫的元素去呼叫它，這也就是 <em>animation-name</em> 的用處。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-name: fadeIn;
}</code></pre>
        </div>
        <p>再來要設定元素動畫執行的長度，用白話的方式解釋就是指要動畫播放多久的時間。使用屬性為 <em>animation-duration</em>，假設要讓動畫執行三秒：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-duration: 3s;
}</code></pre>
        </div>
        <p>截至目前為止的動畫完整程式碼範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-name: fadeIn;
    animation-duration: 3s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>答案是「可以」，有時我們不想要網頁一載入馬上執行動畫內容，想要等待一些時間再開始播放，而四大階段中的「等待期」指的就是動畫開始觸發前的這段過渡時間。使動畫延遲執行的屬性叫做 <em>animation-delay</em>，例如我們要讓動畫延遲 <em>0.5</em> 後再執行動畫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-delay: .5s;
}</code></pre>
        </div>
        <p>但要注意的是，CSS3 的 <em>animation-delay</em> 屬性只要瀏覽器載入樣式表後就會作用，並不支援使用者的互動行為──像是網頁很常見的滑鼠滾輪觸發動畫事件，這就不在 <em>animation-delay</em> 應用範疇內，如果有類似功能的需求，則還是需要借助 JavaScript 的協助。</p>
        <p>常見的滾輪觸發套件：<a href="https://wowjs.uk/" target="_blank">WOW.js</a>、<a href="https://michalsnik.github.io/aos/" target="_blank">AOS</a>...等。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p><em>animation-iteration-count</em> 可以用來設定動畫的執行次數，通常在主流瀏覽器的內建預設值為 <em>1</em>，也就是目標元素在沒有特別設定此屬性的情況下，動畫內容只會執行一次。假如想要讓動畫無限循環播放，則參數值要設置為 <em>infinite</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-iteration-count: infinite;
}</code></pre>
        </div>
        <p>有趣的是，雖然這個屬性的值不能設置為負數，卻允許使用小數點，假如我們給其 <em>0.5</em> 的值，代表動畫只播放一次動畫關鍵影格規則裡的一半。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>如果我們要製作頭尾相呼應的動畫，對 Animation 相關屬性還沒那麼熟悉的新手直覺想到的可能是在關鍵影格 <em>0%</em> 和 <em>100%</em> 設定一樣的屬性值，然後把其他動畫過程加入在中間的關鍵點。我們拿前面 <em>fadeIn</em> 作為範例，導入前面的思維，將會把關鍵影格規則改寫成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}</code></pre>
        </div>
        <p>這樣的寫法確實能達到預期結果，所以要說它錯似乎也不大對，只不過在簡單的動畫影格規則或許還可以從容應付，然而一旦要製作的動畫關鍵影格很多，又或者是改變的樣式屬性繁雜情況下，這樣的寫法就比較需要勞神費心了。</p>
        <p>事實上，我們只要透過 <em>animation-direction</em> 的設定，就能輕鬆搞定動畫來回的執行方向。例如我們賦予其參數值為 <em>alternate</em>，執行的動畫就會從起始關鍵點，利用一半執行時間跑至結束關鍵點，然後再折返回起始關鍵點：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-direction: alternate;
}</code></pre>
        </div>
        <p>除了 <em>alternate</em> 參數外，還有以下這些參數值可以設定：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f2">方向</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>normal</em>（預設值）</div>
                    <div class="f-f2">0% -> 100%</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>reverse</em></div>
                    <div class="f-f2">100% -> 0%</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>alternate</em></div>
                    <div class="f-f2">0% -> 100% -> 0%</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>alternate-reverse</em></div>
                    <div class="f-f2">100% -> 0% -> 100%</div>
                </div>
            </div>
        </div>
        <p>表中的 <em>0%</em>、<em>100%</em> 指的就是 <em>@keyframes</em> 起始與結束的關鍵影格，所以當我們將參數值設置為 <em>reverse</em> 時，即意味著動畫要採倒敘播放。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>所謂的「速度曲線」指的是動畫執行的過程，可能由快到慢、由慢到快，甚至忽慢忽快，並不完全是如一條水平線平平穩穩般從開始播放到結束。我們也可以將速度曲線理解成是加速度或是節奏，利用不同的節奏，使動畫看起來更加生動活潑、乃至於更貼近真實感。</p>
        <p>在 CSS3，定義動畫速度曲線的屬性為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-timing-function: ease;
}</code></pre>
        </div>
        <p><em>ease</em> 表是動畫到 <em>50%</em> 前會逐漸加速，過了 <em>50%</em> 後則會慢慢減速到結束，而這個值同時也是 <em>animation-timing-function</em> 的預設值。其他的值可透過下表來了解：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f2">方向</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>linear</em></div>
                    <div class="f-f2">頭尾均速</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ease</em>（預設值）</div>
                    <div class="f-f2">低速開始 -> 中間加速 -> 低速結束</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ease-in</em></div>
                    <div class="f-f2">低速開始 -> 加速</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ease-out</em></div>
                    <div class="f-f2">低速結束</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ease-in-out</em></div>
                    <div class="f-f2">低速開始 -> 中間加速 -> 低速結束（較 <em>ease</em> 平緩）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>cubic-bezier(n,n,n,n)</em></div>
                    <div class="f-f2">自定義貝茲曲線數值（0 ~ 1）</div>
                </div>
            </div>
        </div>
        <p>貝茲曲線可以讓開發者自行設定動畫速度曲線兩端的錨點，計算出符合其預想的加速度路徑。假如不太會計算或需要即時結果查看動畫演進的畫面，可以利用 <a href="https://cubic-bezier.com/" target="_blank">https://cubic-bezier.com/</a> 這個線上工具。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p>動畫四階段中，完成期與初始狀態是相對的存在，指的是動畫跑完之後的狀態。有些人會以為關鍵影格的終點格就是完成狀態，但這其實並不是完全正確的說法，如同我們在執行期中會給動畫加上部分控制屬性，它們都會影響該元素在最後動畫完成時的樣式狀態。甚至，當 <em>animation-iteration-count</em> 為 <em>infinite</em>（無限循環）的時候，該目標動畫便沒有完成期可言。</p>
        <p>決定動畫「等待期」與「完成期」狀態的關鍵屬性為 <em>animation-fill-mode</em>，但是在解答標題內容之前，我們先來看在預設值（即不設置該屬性）條件下，元素動畫播放完會是什麼樣子。</p>
        <p>動畫規則為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    background-color: red;
    animation-name: demo;
    animation-delay: 2s;
}

@keyframes demo {
    0% {
        background-color: green;
    }
    100% {
        background-color: blue;
    }
}</code></pre>
        </div>
        <p><em>div</em> 的背景色（<em>background-color</em>）在其初始樣式為「紅色」，並且有兩秒的等待期。而其套用的動畫規則裡，關鍵影格第一格為「綠色」，最後一格為「藍色」。</p>
        <p><br></p>
        <h5>範例一：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-fill-mode: none;
}</code></pre>
        </div>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="VwvBWQe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-animations-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/VwvBWQe">
            CSS-animations-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>你會發現等待期與完成期的背景色都會是「紅色」，也就是說在動畫開始執行之前的等待，以及執行完的最後，目標元素都是以本身設定的 <em>background-color</em> 為主。這也是令許多初學者苦惱的，因為正常預想情境裡，套用動畫的元素應該從動畫關鍵影格的起始影格設定的狀態開始，並保持終點影格的狀態，也就是標題想解決的情況。</p>
        <p>接下來的範例二就是標題要的解答。</p>
        <p><br></p>
        <h5>範例二：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-fill-mode: both;
}</code></pre>
        </div>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="qBOyjzb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-animations-5">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/qBOyjzb">
            CSS-animations-5</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><em>both</em> 這個參數意指包含了 <em>forwards</em> 與 <em>backwards</em> 這兩個值的特性，既可以令目標元素在動畫執行前，先進入動畫關鍵影格的起始影格（綠色），然後在動畫播放結束後，樣式停留在關鍵影格的終點影格（藍色）。</p>
        <p>雖說已經得到標題想要的結果，但以下還是繼續將另外兩個屬性值補完：</p>
        <p><br></p>
        <h5>範例三：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-fill-mode: forwards;
}</code></pre>
        </div>
        <p><em>div</em> 於等待期背景色為「紅色」，完成期則為「藍色」。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="KKdBqEG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-animations-3">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/KKdBqEG">
            CSS-animations-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h5>範例四：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    animation-fill-mode: backwards;
}</code></pre>
        </div>
        <p><em>div</em> 於等待期背景色為「綠色」，完成期則為「紅色」。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="YzyjQbN" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-animations-4">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/YzyjQbN">
            CSS-animations-4</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><em>animation-fill-mode</em> 表格介紹：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>none</em></div>
                    <div class="f-f3">等待期與完成期皆為元素本身的初始樣式，不受 <em>@keyframes</em> 裡定義的樣式影響</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>forwards</em></div>
                    <div class="f-f3">等待期為元素本身的初始樣式，完成期保持關鍵影格最後一格（100%）的樣式</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>backwards</em></div>
                    <div class="f-f3">等待期為關鍵影格第一格（0%）的樣式，完成期跳轉回元素本身的初始樣式</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>both</em></div>
                    <div class="f-f3">等待期為關鍵影格第一格（0%）的樣式，完成期保持關鍵影格最後一格（100%）的樣式</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <p>除了前面林林總總介紹到的 <em>animation</em> 屬性外，還有一種可以控制動畫運行狀態的屬性，名叫 <em>animation-play-state</em>，它有兩個參數值：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>running</em></div>
                    <div class="f-f3">正在運行，為預設值</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>paused</em></div>
                    <div class="f-f3">暫停運行</div>
                </div>
            </div>
        </div>
        <p><em>animation-delay</em> 只是定義動畫延遲播放，而當你設置 <em>animation-play-state</em> 為 <em>paused</em> 的時候，代表動畫將完全處於暫停的狀態。通常此屬性會與 Javascript 搭配，利用事件觸發達到動畫「暫停 / 繼續」的效果。</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="result" data-user="itrong" data-slug-hash="qxZJxj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: animation-play-state">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/qxZJxj">
            CSS3: animation-play-state</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[9].id">
        <h2 v-text="catalog[9].title"></h2>
        <p>第一個章節有介紹關鍵影格的基本語法，這個章節將對其他用法進行補充：</p>
        <h5>多個關鍵影格：</h5>
        <p>倘若動畫規則裡需要多個關鍵影格，我們可以在理想變化的關鍵點以百分比的方式加入屬性變值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes animationName {
    0% {
        top: 0px;
    }
    20% {
        top: -20px;
    }
    100% {
        top: 80px;
    }
}</code></pre>
        </div>
        <p><br></p>
        <h5>關鍵影格重複：</h5>
        <p>假設同個動畫規則裡設定了兩個以上相同百分比的關鍵影格，則會以最後一個百分比關鍵影格裡的屬性為主。</p>
        <p><br></p>
        <h5>關鍵影格屬性數量不固定：</h5>
        <p>不同個關鍵影格裡，屬性數量並不一定都得保持一致，比如中途插值，又或者在之前的某一格開始之後到結束都是相同的值，這些都會令整體動畫規則的各關鍵格裡屬性數量產生變動，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes animationName {
    0% {
        top: 0px;
        left: 0px;
    }
    50% {
        top: -20px;
    }
    100% {
        top: 0px;
        left: 20px;
    }
}</code></pre>
        </div>
        <p><em>left</em> 屬性於關鍵影格 <em>0%</em> 與 <em>100%</em> 的點上都有設置參數值，但 <em>50%</em> 時卻沒有作設定，此時瀏覽器會計算前後影格的值並自動插入到動畫中。需要注意的是，插值的屬性必須是要能計算的屬性，否則是不會有效果的，例如 <em>display</em>、<em>visibility</em>。</p>
        <p><br></p>
        <h5>關鍵影格重複被定義：</h5>
        <p>當動畫規則中重複定義了相同的關鍵影格，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes animationName {
    0% {
        top: 0px;
    }
    50% {
        top: -20px;
        left: 20px;
    }
    50% {
        top: 40px;
    }
    100% {
        top: 80px;
    }
}</code></pre>
        </div>
        <p>關鍵影格 <em>50%</em> 重複寫了兩次，且都包含 <em>top</em> 屬性的設定，此時按照 CSS 規則，較後寫的值會覆蓋掉前面寫的值，至於 <em>left</em> 屬性沒有重複則不受影響。</p>
        <p><br></p>
        <h5>關鍵影格裡的 <em>!imporant</em>：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@keyframes animationName {
    0% {
        top: 0px;
    }
    20% {
        top: -20px !imporant;    /* 會被忽略 */
    }
    100% {
        top: 80px;
    }
}</code></pre>
        </div>
        <p>如果關鍵影格裡的屬性使用到了 <em>!important</em> 參數，其屬性將直接被忽略。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[10].id">
        <h2 v-text="catalog[10].title"></h2>
        <p>儘管不能說 CSS3 <em>animation</em> 可以完全取代 Javascript，畢竟若要更有效地操控動畫，Javascript 仍然比 CSS3 好用許多，但如果只是要實現一些簡單的元素動畫，並設置它的執行時間、循環次數...等，那麼不妨大膽地使用 <em>animation</em> 去實現吧。倘若看完 <em>animation</em> 所有屬性的說明仍然摸不著頭緒要如何下手寫動畫，別擔心，網路上已有許多現成的工具可以輔助開發者達到理想效果，以下列舉幾項實用的工具網站或套件：</p>
        <ul>
            <li><a href="https://animate.style/" target="_blank">Animate.css</a>：提供許多現成的 CSS 動畫並提供下載到自己的專案裡使用。</li>
            <li><a href="http://cssanimate.com/" target="_blank">CSS Animate</a>：可在線上繪製動畫的工具，並直接生成程式碼。</li>
            <li><a href="https://cubic-bezier.com/#.17,.67,.83,.67" target="_blank">線上生成貝茲曲線</a>：透過拉桿調整貝茲曲線，可省下許多自己慢慢手調參數的時間。</li>
        </ul>
        <p>儘管和 CSS 沒有直接關係，不過最後推薦一篇 <a href="https://cssanimation.rocks/cn/principles/" target="_blank">网页动画的十二原则</a> 的文章，當我們多了解現實物件運動的規律後，在創作動畫方面也會得心應手許多。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[11].id">
        <h2 v-text="catalog[11].title"></h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes" target="_blank">MDN web docs --@keyframes</a></dd>
            <dd><a href="https://segmentfault.com/q/1010000003867335" target="_blank">如何理解animation-fill-mode及其使用？</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>