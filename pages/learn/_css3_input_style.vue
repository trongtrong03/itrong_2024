<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、客製化 checkbox / radio' },
        { id: 2, title: '二、取消那些煩人的表單預設樣式' },
        { id: 3, title: '三、阻止使用者隨意拖曳 textarea 大小' },
        { id: 4, title: '四、改變 input 的 placeholder 樣式' },
        { id: 5, title: '五、input 的 autofill' },
        { id: 6, title: '六、隨內容自動撐起高度' },
        { id: 7, title: '七、select 也有 placeholder？' },
        { id: 8, title: '八、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="40" fileType="learnList" />
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
        <p>關於表單元素（<em>&lt;input&gt;</em>、<em>&lt;select&gt;</em>、<em>&lt;textarea&gt;</em>...）的樣式呈現，一直以來都是設計師與前端工程師之間溝通的難題之一。大部分的設計師來都不太喜歡瀏覽器預設呈現的表單元素樣式──儘管部份表單元素類別可以兼容 CSS 直接設定的屬性內容，但像核選方塊（<em>checkbox</em>）、單選按鈕（<em>radio</em>）等就無法直接套用指定樣式，必須透過其他方式來達成我們想要的設計。本篇將介紹如何實現上述那些類型的表單元素客製化樣式的方法，除此之外，也將介紹一些 CSS3 表單元素的新增屬性和功用。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>HTML 的 <em>&lt;input&gt;</em> 標籤依據 <em>type</em> 屬性的參數不同，在表單用途上也有很大的不同，其中有兩個性質相似，偶爾新手會搞混使用時機的兩種 Type，分別是 <em>checkbox</em> 與 <em>radio</em>，這兩種的功能基本上都是讓使用者選擇既定的選項，當表單送出後，會將使用者勾選的項目值傳遞給 JavaScript 或後端進行處理。在稱謂上，<em>checkbox</em> 一般稱作「核選方塊」，至於 <em>radio</em> 則以「單選按鈕」稱之居多，這兩者最主要的差別在於前者通常用於複數選擇的表單內容，而後者通常只允許使用者在選擇項目裡選擇其中一項，也就是複選題與單選題的概念。</p>
        <p>關於表單元素深入的用法這裡先不多提，單純來講講 CSS 樣式美化的部分，許多設計師都不甚喜歡瀏覽器預設的表單元素樣式，拿 <em>checkbox</em> 來說，在不設置任何 CSS 樣式的預設模樣，通常會長這樣：</p>
        <div class="text-example">
            <p><input type="checkbox"> 項目一<br><input type="checkbox"> 項目二<br><input type="checkbox"> 項目三</p>
        </div>
        <p>雖然部分樣式可以透過修改 CSS 來改變樣貌，但變化十分有限，充其量也就只能稍微改變方塊的大小、邊框顏色而已，如果想透過 <em>background-image</em> 將設計師設計的圖片替換上去，你會發現這麼作實際上並無作用。</p>
        <p>然而，諺語有云：「山不轉路轉，路不轉人轉」，如果無法直接修飾整個 checbox 本身樣式，我們可以改搭配 <em>&lt;label&gt;</em> 標籤，同時結合 HTML 與 CSS 的語法，改變 checkbox 樣式同時，亦不影響它原本的功能。</p>
        <p>首先是 HTML 結構的部分：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;input type="checkbox" id="c1" name="groupName"&gt;
&lt;label for="c1"&gt;&lt;span&gt;&lt;/span&gt;項目一&lt;/label&gt;</code></pre>
        </div>
        <p>使用 <em>&lt;label&gt;</em> 標籤並添加 <em>for</em> 屬性，可以指定點擊時連攜對應的 <em>&lt;input&gt;</em> ID 名稱。此外，在 <em>&lt;label&gt;</em> 內加入 <em>&lt;span&gt;</em> 目的為用其來設定核選方塊的樣式，當然，要使用別的標籤也可以，但須注意是否合乎內容模型規則。</p>
        <p>再來是 CSS，第一步是先將 checkbox 方塊進行處理：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input[type="checkbox"] {
　　display: none;
}</code></pre>
        </div>
        <p>這麼做的目的是將 <em>&lt;input&gt;</em> 顯示模型指定為隱藏，如此一來原本 <em>&lt;input&gt;</em> 預設的樣式就不會顯示出來了。接著調整 <em>label</em> 標籤裡的 <em>span</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input[type="checkbox"] + label span {
    /* CSS */ 
}</code></pre>
        </div>
        <p>利用組合選擇器的概念，把想要呈現的樣式寫在 <em>span</em> 或你自行指定的其他元素裡（假如你自定義的樣式單純，甚至 <em>label</em> 裡也不需要額外添加其他元素）。這部份設定的是未核選時的狀態，我們必須再加上核選時的樣式，語法為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input[type="checkbox"]:checked + label span {
    /* CSS */ 
}</code></pre>
        </div>
        <p><em>:checked</em> 表示當 <em>input</em> 元素被選取時的狀態，務必記得編寫此一狀態的樣式，才能顯現出 checkbox 在選擇前、後的樣式差異。</p>
        <p><br></p>
        <p>完整範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div&gt;
    &lt;input type="checkbox" id="c1" name="group"&gt;
    &lt;label for="c1"&gt;項目一&lt;/label&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;input type="checkbox" id="c2" name="group"&gt;
    &lt;label for="c2"&gt;項目二&lt;/label&gt;
&lt;/div&gt;
&lt;div&gt;
    &lt;input type="checkbox" id="c3" name="group"&gt;
    &lt;label for="c3"&gt;項目三&lt;/label&gt;
&lt;/div&gt;</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input[type="checkbox"] {
    display: none;
}

input[type="checkbox"] + label::before {
    content: '☆';
    color: gray;
}

input[type="checkbox"]:checked + label {
    color: lightblue;
}

input[type="checkbox"]:checked + label::before {
    content: '★';
    color: darkorange;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-checkbox">
                <div>
                    <input type="checkbox" id="c1" name="group">
                    <label for="c1">項目一</label>
                </div>
                <div>
                    <input type="checkbox" id="c2" name="group">
                    <label for="c2">項目二</label>
                </div>
                <div>
                    <input type="checkbox" id="c3" name="group">
                    <label for="c3">項目三</label>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>至於單選按鈕 <em>radio</em> 也是相同作法，只需要將 CSS <em>input</em> 中的 <em>type</em> 參數改為 <em>radio</em> 即可。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>上一個章節曾提到 HTML 的表單元素在各家瀏覽器都有自己的預設呈現樣式，即便透過 CSS 進行美化，也不見得所有屬性都能完全套用上去，像 <em>checkbox</em>、<em>radio</em> 這類按鈕能透過 <em>label</em> 對應觸發的尚能「繞道」用別種方式去取代其原本的樣式，但其他表單元素可就沒那麼好說話了。所幸，CSS3 新增一籮筐的各種應用屬性中，有一個屬性可以用來對瀏覽器對表單元素預設的樣式外觀進行變化，它就是 <em>appearance</em> 屬性。</p>
        <p>appearance 翻成中文意為「出現」，在 CSS 世界中，這個屬性則是用於改變指定元素對象的「外觀」，什麼意思呢？舉例來說，像 <em>&lt;input&gt;</em>、<em>&lt;select&gt;</em>、<em>&lt;button&gt;</em>......這些可與使用者觸發互動的表單元素，在各大瀏覽器中都有其預設的基本樣式。例如：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="html,result" data-user="itrong" data-slug-hash="qBabOPj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: appearance">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/qBabOPj">
            CSS3: appearance</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>如果我們想改變或重置它們的外觀，就能透過這個屬性去指定想賦予的外觀類型，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    appearance: button;
}</code></pre>
        </div>
        <p>將 <em>div</em> 元素設定為按鈕的外觀。</p>
        <p>關於其可使用的參數值非常繁多，有興趣的可以直接到 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/appearance" target="_blank">MDN web docs</a> 的相關介紹頁面查看。儘管參數值林林總總，一般較常使用到的場合仍是將元素預設外觀重置（類似空白的概念）的時候。例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}</code></pre>
        </div>
        <p>也因為 <em>appearance</em> 屬性仍長期處於非完全被瀏覽器完全相容的狀態，使用時保險起見都會加上不同瀏覽器的前綴詞（Prefix）。</p>
        <figure>
            <img src="/images/learn/css/input-style-1.jpg">
            <figcaption><a href="https://caniuse.com/?search=appearance" target="_blank">Can I use</a> 的相容性一覽表。</figcaption>
        </figure>
        <p>最後來看看我們將前一個範例裡的表單元素通通添加 <em>appearance: none</em> 的結果會變成什麼樣子：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="MWjKaVa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: appearance-2">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/MWjKaVa">
            CSS3: appearance-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>嗯......似乎有些微妙？</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>CSS3 有個 <em>resize</em> 屬性，其目的用於使指定元素是否可以讓使用者調整大小，譬如表單文字區域元素 <em>&lt;textarea&gt;</em> 其範圍右下角的那顆可以拖曳尺寸的小三角形。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">textarea {
    resize: none;
}</code></pre>
        </div>
        <p><em>none</em> 表示目標對象的大小不可調整，這個屬性值一般都用在 <em>&lt;textarea&gt;</em> 居多。我們可以實際比較一下有無添加此屬性的結果：</p>
        <div class="text-example">
            <div class="ex-textarea">
                <div>
                    <p>resize: auto;</p>
                    <textarea></textarea>
                </div>
                <div>
                    <p>resize: none;</p>
                    <textarea></textarea>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>如果要在其他元素上使用這個屬性，則必須另外加上 <em>overflow</em>，且屬性值非 <em>visible</em>，否則 <em>resize</em> 將沒有作用。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    resize: both;
    overflow: auto;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-textarea">
                <div class="add-resize">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, dolorum nemo magnam dignissimos distinctio cum libero, saepe maiores quos iure eaque ea sed aliquid accusantium, facere esse qui sequi praesentium. Quo, esse quibusdam corrupti unde eos doloribus debitis laudantium cupiditate, odit repellat ratione natus ipsam! Dignissimos consectetur repellat numquam, necessitatibus distinctio, aspernatur possimus eos deserunt ratione culpa ullam quam fugiat suscipit in commodi exercitationem rerum impedit doloribus enim, qui quis odio quas itaque sit! Quaerat, delectus. Perferendis tenetur sunt nostrum eos non temporibus excepturi perspiciatis quis? Vitae dolorum, debitis dignissimos eius, alias veniam voluptas consequatur nemo itaque doloribus dolore corporis et praesentium nobis! Necessitatibus perferendis eligendi molestias autem quia porro ut exercitationem nemo ab eum quod, repudiandae minima tempora deleniti delectus distinctio aspernatur reprehenderit voluptas. Vitae harum illum sit nulla facere recusandae molestiae, asperiores rem assumenda optio culpa cupiditate nesciunt officiis quasi expedita, rerum ea alias eum, libero molestias deleniti consequatur sunt modi. Harum nobis quas, et delectus, earum nostrum eos, atque amet quasi ipsam eaque minima alias? Optio obcaecati perspiciatis qui non quasi saepe corporis culpa placeat voluptatem a maxime atque sequi, consequuntur et laudantium modi. Vero nihil, corporis ipsam accusamus debitis, nostrum repellendus exercitationem harum quo sunt amet voluptate iure eos porro provident nam vel ut veritatis ab unde nobis culpa libero. Aperiam dolorem facere laboriosam unde eligendi ratione fugit iure ipsum voluptatum. Accusamus saepe distinctio delectus tempora, magnam quis quas? Tenetur eveniet nulla eligendi non sint. Vero maxime praesentium, quam voluptatibus ipsam distinctio nihil quia quo pariatur voluptates aliquid corporis ipsa numquam reiciendis reprehenderit? Modi dignissimos atque sunt aliquam sit assumenda fugit accusantium laudantium cumque qui tenetur consequatur inventore quia dicta reprehenderit illo provident non harum, quaerat voluptatem vitae aut! Explicabo voluptatibus pariatur modi beatae, nulla quo recusandae voluptate enim est sunt repellendus tenetur laboriosam minus quae?</p>
                </div>
            </div>
        </div>
        <p><em>resize</em> 值為 <em>both</em> 表示元素寬高皆允許使用者拖曳調整尺寸。下方列出 <em>resize</em> 可使用的參數值：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1 is-sticky">屬性</div>
                    <div class="f-f3">用途</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>none</em></div>
                    <div class="f-f3">預設值，表示不允許使用者調整大小</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>both</em></div>
                    <div class="f-f3">表示寬高皆可調整</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>horizontal</em></div>
                    <div class="f-f3">僅允許調整寬度</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>vertical</em></div>
                    <div class="f-f3">僅允許調整高度</div>
                </div>
            </div>
        </div>
        <p>最後談談有關 <em>resize</em> 瀏覽器相容性的問題，雖然 <em>resize</em> 沒有支援瀏覽器前綴詞，但透過 <a href="https://caniuse.com/css-resize" target="_blank">Can I use</a> 可以發現大多主流瀏覽器都已能順利識別該屬性。</p>
        <figure>
            <img src="/images/learn/css/input-style-2.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p><em>placeholder</em> 屬性用於設定表單元素提示訊息的樣式，語法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input::placeholder {
    /* CSS */
}</code></pre>
        </div>
        <p>儘管主流最新版本的瀏覽器皆能識別 <em>::placeholder</em>，但保守起見，個人通常還是會把前綴加上去：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input::-webkit-input-placeholder { /* CSS */ }
input::-moz-placeholder { /* CSS */ }
input:-ms-input-placeholder { /* CSS */ }
input:-moz-placeholder { /* CSS */ }</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input::-webkit-input-placeholder {
  font-size: 16px;
  font-style: italic;
  color: red;
}

input::-moz-placeholder {
  font-size: 16px;
  font-style: italic;
  color: red;
}

input:-ms-input-placeholder {
  font-size: 16px;
  font-style: italic;
  color: red;
}

input:-moz-placeholder {
  font-size: 16px;
  font-style: italic;
  color: red;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-placeholder">
                <input type="text" placeholder="請輸入文字">
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>相信這是不少開發者都會遇到的問題：在 Chrome 瀏覽器裡的表單輸入內容時，輸入框會自動變色，如下圖：</p>
        <figure>
            <img src="/images/learn/css/input-style-3.jpg">
        </figure>
        <p>此為瀏覽器 <b>autoFill</b> 功能，一般預設情況下，瀏覽器為方便使用者操作，會記錄使用者歷史輸入內容，以方便之後使用者再次輸入相同內容時，可直接通過快速選取，省去重新打一樣字串的動作。但是這樣的操作，瀏覽器會在該輸入框內自動帶入填充的樣式，這在一些經過設計的表單畫面上看起來不甚雅觀。而這其實是可以透過 CSS 去改變樣式的，其屬性名稱為 <em>autofill</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-text-fill-color: #FFF;
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 1) inset;
}</code></pre>
        </div>
        <p><em>-webkit-text-fill-color</em> 為文字顏色，輸入框的背景色則透過 <em>-webkit-box-shadow</em> 內陰影（<em>inset</em>）的方式使色彩為白色或其它適合的指定顏色。</p>
        <p>範例演練：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-default-tab="css,result" data-slug-hash="wvqWMGv" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/wvqWMGv">
            CSS-autofill</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <blockquote class="is-warning">
            <p>假如屬性設置後無效，或是有其它原因使你無法單純透過 CSS 解決，那麼也可以直接從 HTML 原始碼著手：</p>
        </blockquote>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;input type="text" autocomplete="off"&gt;</code></pre>
        </div>
        <p>利用 <em>autocomplete</em> 屬性，去關閉表單自動填充字串的功能。也可以直接將該屬性下在 <em>&lt;form&gt;</em> 表單元素，如此整個表單內的輸入框皆會禁用。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;form autocomplete="off"&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>最後額外補充一個和 CSS 沒有什麼關聯的小技巧，這是前陣子開發專案時業主提出的需求，希望使用者在表單欄位輸入內容時，輸入框的高度可以隨著內容換行而自動增高。儘管過去自己也不是沒看過相關案例，但仔細想想還真想不出 <em>input</em>、<em>textarea</em> 屬性可以實現這個效果。經上網搜尋關鍵字發現，類似案例處理方式除了透過 JavaScript 實現之外，還有一個更簡單且單純的方式──那就是使用 <em>contentEditable</em> 方法。</p>
        <p><em>contentEditable</em> 是 HTML 其中一個全域屬性，主要用來設定元素是否可以被編輯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div contentEditable="true"&gt;&lt;/div&gt;</code></pre>
        </div>
        <p>當 <em>contentEditable</em> 屬性值為 <em>true</em> 的時候，表示該元素為可編輯的狀態。我們來看實例，請試著在 <em>div</em> 元素區域中輸入長字串內容：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-default-tab="html,result" data-slug-hash="rNGgQmg" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/rNGgQmg">
            AutoHeight Div</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>至於要獲得 <em>div</em> 元素內容的值，只要透過 JavaScript 去取得就可以了。</p>
        <blockquote class="is-warning">
            <p><em>contentEditable</em> 屬性在 IE 瀏覽器中不能直接使用在 <em>&lt;table&gt;</em> 相關的元素，包含 <em>&lt;tr&gt;</em>、<em>&lt;td&gt;</em>、<em>&lt;col&gt;</em> ...等。</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p>雖然章節標題下的很聳動，但眾所皆知 <em>placeholder</em> 屬性在 <em>&lt;select&gt;</em> 是無效的，不過這也不代表 <em>&lt;select&gt;</em> 就無法實現類似 <em>&lt;input&gt;</em> 提示文字的效果，只是方法會有一些些複雜。</p>
        <p>首先是 HTML 的部份：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;select required&gt;
    &lt;option value="" disabled selected hidden&gt;請選擇項目&lt;/option&gt;
    &lt;option value="1"&gt;選項一&lt;/option&gt;
    &lt;option value="2"&gt;選項二&lt;/option&gt;
    &lt;option value="3"&gt;選項三&lt;/option&gt;
&lt;/select&gt;</code></pre>
        </div>
        <p>這裡主要有兩個要點，第一個是 <em>&lt;select&gt;</em> 標籤的部份，必須添加 <em>required</em> 屬性，此屬性用途為使用者在提交表單之前必須選擇一個值，然而若要該屬性生效有個前提是第一個 <em>&lt;option&gt;</em> 必須為空值。第二個要點承襲第一點，因為要將第一個 <em>&lt;option&gt;</em> 設定為空值，換句話說不該讓使用者可以選擇，所以你會看到 HTML 範例中它加上了 <em>disabled</em> 屬性設定為禁選，同時又加上 <em>hidden</em> 屬性將其從選單下拉選擇時隱藏起來。由於要實現 Placeholder 的效果，所以我們又添加了 <em>selected</em> 屬性，讓第一個項目成為初始被選擇的狀態，藉此優先顯示在尚未開啟的選單上。</p>
        <p>再來是 CSS，透過 <em>:invalid</em> 偽類選擇器，來處理尚未通過驗證的 <em>select</em> 元素：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">select:required:invalid {
    color: red; 
}

option {
    color: #000;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-select">
                <select required>
                    <option value="" disabled selected hidden>請選擇項目</option>
                    <option value="">選項一</option>
                    <option value="">選項二</option>
                    <option value="">選項三</option>
                </select>
            </div>
        </div>
        <p>如此一來，就能讓 <em>&lt;select&gt;</em> 也能製作出類似 <em>&lt;input&gt;</em> Placeholder 提示文字的效果了。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/appearance" target="_blank">MDN web docs</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/contentEditable" target="_blank">HTMLElement.contentEditable</a></dd>
            <dd><a href="https://caniuse.com/?search=appearance" target="_blank">Can I use</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>