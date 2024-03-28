<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="16" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、語法格式</a></li>
            <li><a href="#act2">二、使用變數</a></li>
            <li><a href="#act3">三、數學運算</a></li>
            <li><a href="#act4">四、註解</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>從這篇開始的接下來幾篇文章，我們將介紹 Stylus 的語法及函數，來源資料主要參考的是他們的<a href="https://stylus-lang.com/" target="_blank">官方文件</a>，如果看不懂英文文件的說明，官方文件也有提供<a href="https://stylus.bootcss.com/" target="_blank">簡體中文</a>的版本，雖說翻譯稱不上完善，但多看多練習應能克服語言問題。那麼趕緊進入正題吧。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、語法格式</h2>
        <p>儘管 Stylus 允許開發者將傳統的 CSS 書寫方式直接沿用到 Stylus 樣式表裡，但作為預處理器程式語言，Stylus 自然有一套大幅簡化 CSS 語法結構的方式。</p>
        <p><br></p>
        <h3>1. 縮排：</h3>
        <p>以往 CSS 會透過「嵌套」（<em>{ }</em>）方式將屬性寫進選擇器裡，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    line-height: 2;
    font-size: 14px;
    color: #f00;
}</code></pre>
        </div>
        <p>但是 Stylus 可以用縮排取代嵌套，像上面的例子就可以這樣表示：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">p
    line-height 2
    font-size 14px
    color: #f00</code></pre>
        </div>
        <p>CSS 屬性的縮排一般以二或四個空白字元較常見，但縮排只突出一個也是可以的，重點是同一個選擇器的屬性縮排空白字元格必須一致。假如今天我們的 Stylus 寫成這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">p
    line-height 1.5
        font-size 14px
    color: #f00</code></pre>
        </div>
        <p>那麼輸出就會變成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    color: #f00;
}
p line-height 1.5 {
    font-size: 14px;
}</code></pre>
        </div>
        <p>透過上面的輸出結果，我們可以瞭解每一次縮排即為進入下一個階層。因此，當我們要指定選擇器裡其他元素的屬性時，就不用換行重寫選擇器完整的名稱，直接以換行縮排的方式表示即可。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.list {
    width: 80%;
    margin: 0 auto;
}
.list .item {
    display: inline-block;
}
.list .item img {
    display: block;
    width: 100%;
}</code></pre>
        </div>
        <p>如果要指定某個選擇器裡其他元素的屬性，就得將選擇器重複寫一遍，然後再加上指定的元素名稱。假如選擇器是 <em>.class</em> 名稱──如同上面範例，寫起來既費時又不易閱讀，而 Stylus 則可以大幅簡化成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">.list
    width 80%
    margin 0 auto
    .item
        display inline-block
        img
            display block
            width 100%</code></pre>
        </div>
        <p>我們只要熟知縮排的概念，便能輕鬆表示複雜的選擇器結構。</p>
        <p><br></p>
        <h3>2. 符號省略：</h3>
        <p>先前的例子已經展示出：在 Stylus 文件裡，屬性的結尾符號（<em>;</em>）可以省略不寫。除此之外，我們用來分隔選擇器的逗號（<em>,</em>）也可以以換行的方式表示。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">input
select
textarea
button
    background-color #CCC</code></pre>
        </div>
        <p>編譯結果為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input,
select,
textarea,
button {
    background-color: #ccc;
}</code></pre>
        </div>
        <p><br></p>
        <h3>3. 父級選擇器引用：</h3>
        <p>在多數預處理器程式語言中，會使用 <em>&</em> 符號表示父級選擇器。什麼意思呢？假設我們要設定某個選擇器的偽類別選擇器（<em>hover</em>、<em>active</em>、<em>focus</em>...）CSS，就要在偽類別選擇器之前先指定選擇器的名稱，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">button {
    background-color: #00f;
}
button:hover {
    background-color: #f00;
}</code></pre>
        </div>
        <p>在 Stylus 中只需要這樣表示：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">button
    background-color #00f
    &:hover
        background-color #f00</code></pre>
        </div>
        <p><br></p>
        <p>同樣的概念我們也可以用在 <em>.class</em> 上，當 <em>.class</em> 前面加上 <em>&</em> 時，表示指定選擇器含有 <em>.class</em> 時套用其樣式。以下為範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">button
    &.btn-cancel
        background-color #ccc</code></pre>
        </div>
        <p>編譯成 CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">button.btn-cancel {
    background-color: #ccc;
}</code></pre>
        </div>
        <p><br></p>
        <p>如果把 <em>&</em> 放在指定的選擇器後方，則反過來表示上一階層選擇器必須在指定選擇器內才能套用屬性。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">button
    .form &
        border 1px solid #000</code></pre>
        </div>
        <p>編譯成 CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.form button {
    border: 1px solid #000;
}</code></pre>
        </div>
        <p>需要注意的是，上方這種像是反轉階層的使用方式，<em>&</em> 與選擇器之間必須相隔至少一格的空白字元，否則會被判定令該指定選擇器與上一階層的選擇器相連。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">a
    .link&
        text-decoration underline</code></pre>
        </div>
        <p>輸出後會變成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.linka {
    text-decoration: underline;
}</code></pre>
        </div>
        <p>不過我們也可以反過來利用這樣的特性，充分建立起 CSS Coding style 中很重要的一項原則：前綴命名法──將相同功能區塊使用到的 <em>.class</em> 以相同前綴名稱表示它們的關係，增加檢視的易讀性。好比說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">.photo
    &-wrap
        background-color #CCC
        padding 1rem
    &-list
        background-color #EEE
    &-item
        border 1px solid #000</code></pre>
        </div>
        <p>編譯輸出後：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.photo-wrap {
    background-color: #ccc;
    padding: 1rem;
}
.photo-list {
    background-color: #eee;
}
.photo-item {
    border: 1px solid #000;
}</code></pre>
        </div>
        <p>至於要寫得多複雜就看各自開發者或團隊的意思了，走火入魔想連接個四五層以上都是沒問題的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">.photo
    &-list
        &-item
            &-image
                img
                    border 1px solid #000</code></pre>
        </div>
        <p>編譯後：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.photo-list-item-image img {
    border: 1px solid #000;
}</code></pre>
        </div>
        <p>不過依照個人開發經驗，建議盡量不要使用過多的階層語法，否則縱使當下串連的很開心，爾後經過一段時間需要進行維護時，階層過多反而會帶來嚴重的閱讀障礙。因此，適度地使用即可。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、使用變數</h2>
        <p>Stylus 提供將屬性值以變數形式進行事先定義的功能，方便我們快速把屬性值透過變數代入到不同選擇器。當要修改屬性值的時候，只需要編輯該變數即可，不需要逐一修改每個選擇器的值。我們可以直接定義變數的名稱，並指定（<em>=</em>）值即可，或是在變數名稱前加上 <em>$</em> 符號以利辨別。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">itemWidth = 100px
div
    width itemWidth</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 100px;
}</code></pre>
        </div>
        <p>也能加入 <em>$</em> 字符：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">$font-size = 5rem
p
    font-size $font-size</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    font-size: 5rem;
}</code></pre>
        </div>
        <p><br></p>
        <p>儘管變數可以幫助開發者更方便引用、管理屬性值，但使用時仍須注意一些細節：</p>
        <ol>
            <li>雖然變數可以直接以屬性名稱命名（如<em>width</em>、<em>font-size</em>...），但仍應盡量減少使用避免產生混淆。</li>
            <li>變數名稱可使用駝峰命名法或以 <em>-</em> 相接。</li>
            <li>不能使用 <em>$</em> 以外的特殊符號。</li>
            <li><em>$</em> 除了可以放在最前面，也可以插入在變數名稱中，但應該很少人會這樣做。</li>
        </ol>
    </div>
    <div class="text-block" id="act3">
        <h2>三、數學運算</h2>
        <p>如果要在 CSS 裡進行運算，要通過 CSS3 的 <em>calc</em> 屬性來達成。但就和其他預處理器程式語言相同，Stylus 可以直接在屬性值裡進行簡單的數學運算。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 100px - 10px
    height 100px * 2
    margin 10px + 10px auto 0</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 90px;
    height: 200px;
    margin: 20px auto 0;
}</code></pre>
        </div>
        <p><br></p>
        <p>只有 <em>/</em> 比較特別，必須把運算式括號起來，否則整個運算式會直接被編譯出去。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 100px / 10
    height (100px / 10)</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 100px/10;
    height: 10px;
}</code></pre>
        </div>
        <p><br></p>
        <p>當然 Stylus 裡的運算式也有「先乘除後加減」的概念，如果要先執行加減再執行乘除，加減的式子一樣得用括號括起來。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 100px + 10px * 5
    height (100px + 10px) * 5</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 150px;
    height: 550px;
}</code></pre>
        </div>
        <p><br></p>
        <p>值得一提的是，相比 Sass，Stylus 更能處理不同計量單位的運算式。打個比方來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 100% - 10px</code></pre>
        </div>
        <p>Sass 遇到這種單位不同的數值運算通常會噴出錯誤訊息，但 Stylus 對這類無法計算出結果的運算式容許度較高，它會自動將像後面的單位通通轉換為和第一個數值相同的單位進行計算，像上面的範例在 Stylus 會編譯出這樣的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 90%;
}</code></pre>
        </div>
        <p>我們再接著看一例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 100px - 10% - 5cm</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 85px;
}</code></pre>
        </div>
        <p>畢竟經過容錯計算出來的結果，未必是開發者原先預期的答案。如果不像 Sass 直接回返錯誤訊息，就有可能遺漏了錯誤，因此這種高容錯究竟是好還是不好，就見仁見智了。</p>
        <p><br></p>
        <blockquote>
            <p>若要在 Stylus 要使用平方數，使用的不是 <em>^</em>，而是以 <em>**</em> 表示。例如：</p>
        </blockquote>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">div
    width 2px ** 8</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 256px;
}</code></pre>
        </div>
        <p><br></p>
        <p>最後，學以致用的你可能會問，運算式能和變數作結合嗎？答案是肯定的。且看下方範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">$result = 100px + 100px
div
    width $result</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    width: 200px;
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、註解</h2>
        <p>Stylus 提供三種註解方式：</p>
        <p><br></p>
        <h3>1. 單行註解：</h3>
        <p>語法格式為 <em>//</em>，這種註解只會存在於 Sytlus 文件裡，不會被編譯輸出。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">// 首頁
.index-wrap
    background-color #eee   // 背景色</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.index-wrap {
    background-color: #eee;
}</code></pre>
        </div>
        <p><br></p>
        <h3>2. 多行註解：</h3>
        <p>和以往 CSS 使用的註解格式一樣，由 <em>/*</em> 開頭，<em>*/</em> 結尾，中間則是註解內容，允許寫很多行。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">/*
    第一行
    第二行
    第三行
*/
.index-wrap
    background-color #eee</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/*
    第一行
    第二行
    第三行
*/
.index-wrap {
    background-color: #eee;
}</code></pre>
        </div>
        <p>這種註解格式在一般編譯輸出模式下會保留，但如果是壓縮（<em>compress</em>）格式裡就不會被輸出。</p>
        <p><br></p>
        <h3>3. 多行緩衝（buffered）註解：</h3>
        <p>承襲多行註解在壓縮模式下不會被編譯輸出這一點，如果希望註解即使是壓縮模式下也能輸出，則在開頭 <em>/*</em> 後方加上 <em>!</em> 符號。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-stylus">/*!
    第一行
    第二行
    第三行
*/
.index-wrap
    background-color #eee</code></pre>
        </div>
        <p>編譯結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">/*
    第一行
    第二行
    第三行
*/
.index-wrap{background-color:#eee;border:1px solid #000}</code></pre>
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
