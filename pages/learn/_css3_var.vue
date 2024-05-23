<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、如何宣告變數？' },
        { id: 2, title: '二、宣告變數時要注意什麼？' },
        { id: 3, title: '三、變數作用範圍的影響？' },
        { id: 4, title: '四、RWD 能改變同一變數的值嗎？' },
        { id: 5, title: '五、結合 calc 做加減乘除' },
        { id: 6, title: '六、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="10" fileType="learnCSS" />
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
        <p>初學網頁設計時，應該很常聽到以下這段形容：「HTML 相當於人類的骨幹，CSS 決定外貌，JavaScript 則代表行為。」──事實上，HTML、CSS、JavaScript 各據一方的三國鼎立態勢，隨著 CSS3、HTML5 的問世開始有了變化，CSS3 展現許多有趣又多元的語法屬性，讓網頁得以不依賴 JavaScript 前提下，也能達到一定程度的動態與互動效果。</p>
        <p>除了轉場、動畫這些動態屬性外，CSS3 還可以自訂變數（Variables），提供後續編寫樣式時方便且快速地去使用，在過去如果想要用變數管理一些常用到的屬性值，得仰賴 Less、Sass 之類的 CSS 預處理器，透過程式編譯將變數輸出成靜態 CSS 樣式表裡...如今這樣的需求，已經能輕而易舉地在原生 CSS 樣式裡實現，以下一起來看看具體的應用方法吧！</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>既然序章提到過往我們習慣用 CSS 預處理器來建立變數，管理 CSS 編寫時會重複使用到的參數值，那麼我們就先以其中一種預處理器語言作舉例，認識如何宣告並使用變數。就以 Sass 來說，宣告變數的方法通常是這樣子的（使用 Scss 寫法）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">$text: #000;

p {
    color: $text;
}</code></pre>
        </div>
        <p>透過字符 <em>$</em> 並添加自定義的名稱（<em>text</em>）以表示變數成立，若要取用該變數，只需要在欲使用變數的屬性後方將變數名稱寫入即可。</p>
<p>而如果要用 CSS3 原生變數宣告方法，基本寫法則是這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root {
    --text: #000;
}

p {
    color: var(--$text);
}</code></pre>
        </div>
        <p>對，寫法就是這麼簡單、這麼樸實無華，不僅與傳統預處理器的語法規則大同小異，還直接省略掉了轉譯輸出的動作（假如你是原生 CSS 樣式表的手刻黨）。透過在根元素 <em>root</em> 嵌套裡定義的變數，之後我們可以在任何選擇器裡自由地引用該變數，當瀏覽器載入網頁後，會自動將該變數所定義的值代入到引用選擇器的元素標籤上。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>和 CSS 預處理器的格式不同，原生 CSS 宣告的方式有以下幾個要點需要知道：</p>
        <h3>1. 變數必須在選擇器裡作宣告</h3>
        <p>不像預處理器可以直接在文件初始處宣告變數，原生 CSS 變數宣告必須依附在選擇器內，無論是標籤選擇器、類別選擇器...都可以，在不同種類的選擇器宣告變數，影響的是該變數的「作用範圍」，此部份會留到下一個章節再提。</p>
        <P><br></P>
        <h3>2. 變數名稱前方以 <em>--</em> 開頭</h3>
        <p>避免編譯時無法正確判讀究竟是變數還是屬性，因此 CSS 預處理器定義變數普遍需要使用特殊字符來區分，而原生 CSS 變數名稱則是通過兩個短破折號來作為開頭。</p>
        <p><br></p>
        <h3>3. 以 <em>var()</em> 的格式來使用變數</h3>
        <p>變數宣告完成後，就可以在樣式屬性裡去呼叫它，其語法格式為 <em>var()</em>，括弧裡添加要代入的變數名稱即可。</p>
        <p><br></p>
        <p>儘管以下狀況比較不會發生，但我們還是來談談「如果引用某變數的屬性讀取不到該變數時」的情況。會發生這個問題，通常是開發者引用變數時不慎寫錯該變數名稱，譬如要引用 <em>--text</em>，結果卻錯寫成 <em>--test</em>，或者他想引用的變數從來就沒被宣告，甚至是變數作用範圍並不包含他當下引入的選擇器......行文至此，赫然發現好發率及可能原因似乎也沒想像中那麼低。</p>
        <p>總而言之，如果要避免引用無效或錯誤的變數，導致網頁元素並沒有正確地套用屬性值，我們在開發引用該變數時，可以在變數括號裡再增加一個值，作為變數無法讀取時的替代結果。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root {
    --text: #000;
}

p {
    color: var(--$textt, #000);
}</code></pre>
        </div>
        <p>在 <em>var()</em> 內的引用變數後方再加入另一個屬性值，並以逗號區隔，如此一來當前面的變數無效時，瀏覽器也會抓取後方的替代值，算是防範未然，為可能發生的錯誤增添另一道保險。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>一般情況下，我們會偏好將變數範圍設定為全域的，意即無論在任何有需要引用該變數值的選擇器皆能直接讀取到它，但是前面有提過，原生 CSS 變數必須宣告在選擇器裡，不像 CSS 預處理器可直接在文件任一行直接定義變數。然而如同一般樣式屬性，變數只會在其嵌套所屬的選擇器裡產生效果，它只會在符合該選擇器指定的對象產生作用...那麼我們該怎麼做才能讓原生 CSS 變數也能讓所有選擇器裡的屬性去套用它呢？</p>
        <p>答案其實很簡單，只要稍做換位思考便可明瞭。正所謂「山不轉路轉」，我們只要將變數寫在萬用選擇器 <em>*</em> 或根元素選擇器 <em>:root</em> 即可。只要將變數放在作用範圍較廣（或者說權重較低）的選擇器裡即可，像前面的例子都是將變數宣告在根元素選擇器裡。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root {
    --text: #000;
    --bg: #f2f2f2;
    --size: 30rem;
}</code></pre>
        </div>
        <p>因為 CSS 有權重以及後面覆蓋前面的關係，通常 Coding Style 會習慣將根元素、萬用選擇器的定義寫在文件的起頭處，因此如果我們把變數寫在這些選擇器的好處，除了可以讓所有選擇器裡的屬性都能引用該變數之外，同時也便於管理維護。</p>
        <p>然而，根據開發者習性、團隊原則等原由，是有可能要求變數不要定義為全域可用，將變數作用範圍限制在指定選擇器或一定的範圍內就好。整體來說，CSS 變數的作用範圍可分為以下三種：</p>
        <h3>1. 全域變數</h3>
        <p>前面已有介紹，此處就不再多作著墨。</p>
        <p><br></p>
        <h3>2. 區域變數</h3>
        <p>這裡說的「區域」，泛指除了根元素與萬用選擇器之外的其他選擇器，比如 ID 選擇器、標籤選擇器、類別選擇器...等，在這些選擇器內宣告的變數，在其他選擇器裡去引用將沒有作用。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h1 {
    --text: red;
    color: var(--text);
}

h2 {
    color: var(--text);
}

h3 {
    color: var(--text, green);
}</code></pre>
        </div>
        <p>在 <em>h1</em> 標籤選擇器裡宣告的 <em>--text</em> 變數值，只會作用於網頁裡所有 <em>h1</em> 元素，<em>h2</em>、<em>h3</em> 則沒有效果，其中 <em>h3</em> 由於有額外給予替代值，因此會以替代值為主，至於什麼都沒有的 <em>h2</em> 就只能依照瀏覽器的預設設定了。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <code>
                <p class="codepen" data-height="360" data-default-tab="html,result" data-slug-hash="ExQOXVR" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
                <span>See the Pen <a href="https://codepen.io/itrong/pen/ExQOXVR">
                CSS3: var</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
                </p>
            </code>
        </div>
        <p><br></p>
        <p>看完區域變數的範例，這時可能會有人不免產生好奇：假如全域變數名稱與區域變數名稱「撞名」會怎麼樣？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root{
    --text: red;
}

p {
    --text: blue;
    color: var(--text);
}</code></pre>
        </div>
        <p>答案是會套用區域變數裡的值（<em>blue</em>），理由無它，單純遵循 CSS 權重規則而已，標籤選擇器的權重比根元素選擇器來的優先，換句話說，當變數名稱重複時，權重高的選擇器裡變數值將會蓋過權重較低的選擇器所宣告的值。</p>
        <p><br></p>
        <h3>3. 行內變數</h3>
        <p>CSS 的書寫方式主要分成外部引用 <em>.css</em> 文件、於 HTML <em>&lt;style&gt;</em> 元素標籤裡書寫，以及在 HTML 指定元素裡透過 <em>style</em> 屬性添加樣式這三種方法，而行內變數宣告方式指的是最後者。以下我們直接透過範例來了解：</p>
        <h4>HTML 部分：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;h1 style="--text: red"&gt;This is h1&lt;/h1&gt;</code></pre>
        </div>
        <p><br></p>
        <h4>CSS 部分：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h1 {
    color: var(--text);
}</code></pre>
        </div>
        <p>範例中我們可以看到變數的宣告是直接透過 HTML 元素屬性寫在 <em>&lt;h1&gt;</em> 元素標籤內，然後經由 CSS 指定選擇器去引用它的值。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <code>
                <p class="codepen" data-height="360" data-default-tab="html,result" data-slug-hash="eYVQRKj" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
                <span>See the Pen <a href="https://codepen.io/itrong/pen/eYVQRKj">
                CSS3: var-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
                on <a href="https://codepen.io">CodePen</a>.</span>
                </p>
            </code>
        </div>
        <p><br></p>
        <p>除非必要，一般而言不太建議這種寫法。至於權重部分，若相同的變數名稱在全域、區域皆存在時，元素行內屬性的優先度比前兩者還來的高，因此將會以行內宣告的變數值為主。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>網頁響應式設計的方法是透過 <em>@media query</em> 規則，利用 CSS 後者覆蓋前者的特性，以實現 RWD 的效果。如果想要讓變數在畫面伸縮或不同裝置時可以代換成其他變數值，就只需要像其他屬性設置那般依樣畫葫蘆，將同一個變數名稱置入到指定的 <em>@media query</em> 裡面給予對應的值即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root{
    --center: 30rem;
}

@media only screen and (max-width: 768px) {
    :root{
        --center: 20rem;
    }
}

@media only screen and (max-width: 480px) {
    :root{
        --center: 15rem;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>基本而言，只要是合法的屬性值，都能寫入到變數裡有所作用。其中值得一提的是 <em>calc</em> 這個屬性，<em>calc</em> 屬性可以讓我們直接在 CSS 裡面設定數學公式，由瀏覽器來計算出結果，而且很特別的是運算數值單位可以不一樣，譬如 <em>calc(100% - 40px)</em>，這大大提升了前端切版的靈活度。而這個運算函式裡的數值，同樣可以用變數去給值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root{
    --W: 4rem;
}

.content {
    width: calc(100% - var(--W));
}</code></pre>
        </div>
        <p>也可以直接整個搬進變數裡作宣告：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root{
    --W: calc(100vw - 4rem);
}

.content {
    width: var(--W);
}</code></pre>
        </div>
        <p><br></p>
        <p>以上就是本文對原生 CSS 變數的大略介紹，雖說現階段原生 CSS 仍無法像 CSS 預處理器有大量函式可以運用，但如果你的專案不需要使用函式，只需要簡單的變數去管理網站整體的數值或色碼，那麼原生 CSS 的 Variables 便綽綽有餘，毋須額外安裝預處理器來輔助作業。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <dl>
            <dd><a href="https://www.w3.org/TR/css-variables-1/" target="_blank">CSS Custom Properties for Cascading Variables Module Level 1</a></dd>
            <dd><a href="https://w3c.hexschool.com/blog/21985acb" target="_blank">原生 CSS 變數運用技巧（CSS Variables）</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>