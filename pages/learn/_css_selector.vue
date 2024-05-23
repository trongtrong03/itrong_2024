<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、什麼是選擇器？' },
        { id: 2, title: '二、選擇器有哪些類型？' },
        { id: 3, title: '三、如何辨別選擇器的優先順序？' },
        { id: 4, title: '四、如何正確書寫選擇器 Coding Style？' },
        { id: 5, title: '五、進階：CSS3 新增的選擇器一覽' },
        { id: 6, title: '六、裝置可視單位' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="35" fileType="learnList" />
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
        <p>這篇文章要探討的主題是比較偏向基礎面的內容，也就是有關 CSS 選擇器（Selector）的介紹。選擇器是 CSS 語法規則三大核心之一，所以即便你不認識「選擇器」這個名詞，在撰寫語法的過程中也絕對時常編寫到它，選擇器的類型非常多樣，到了 CSS3 更是又新增了更加多元、更加複雜的用法，本篇文章除了介紹目前已知且常用的選擇器類別外，也會針對我們前端開發人員，在書寫 CSS 樣式表定義選擇器時，有哪些需要注意的地方（也就是所謂的 Coding Style）。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>CSS 的語法基本構成為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">selector { property: value; }</code></pre>
        </div>
        <p>其中，選擇器指的就是語法規則裡的 <em>selector</em>，當網頁載入時，符合選擇器條件的 HTML 元素就會遵循其樣式表設定的樣式屬性，來改變本身在瀏覽器預設的值。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    font-size: 24px;
    color: #F00;
}</code></pre>
        </div>
        <p>上面舉例中的 <em>p</em> 便是選擇器的一種，表示 HTML 裡面所有的 <em>p</em> 元素都會套用該選擇器裡面設定的 CSS 樣式屬性。若常去觀賞別人寫的網站，很容易發現其 CSS 樣式表裡每一組 <em>{}</em> 前方大量使用到 <em>#</em> 及 <em>.</em> 開頭，並銜接自己命名的英文詞綴，這些也都是選擇器的種類之一，分別稱為「ID 選擇器」與「類別選擇器」。</p>
        <p>或許你會在某一網站的 CSS 樣式表中，看見它整個 CSS 檔案都是使用 ID 選擇器或類別選擇器進行書寫，但它們絕對不是選擇器唯二（若加上一開始範例裡的標籤選擇器則是唯三）寫法，CSS 發展迄今進入 CSS3 時代，選擇器的種類也變得非常多樣，我們將在下一個章節進行介紹。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>由於 CSS3 選擇器比較複雜，會在後面單獨開篇章進行說明，本章節先來談談 CSS2 以前的選擇器種類有哪些。可別以為因為 CSS3 的問世，這些老一輩就被打入冷宮了，時至今日，這些行之有年的選擇器依然是許多開發者或團隊維持專案一貫撰寫的語法標準。</p>
        <p>簡表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">範例</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">標籤選擇器</div>
                    <div class="f-f3"><em>html</em>、<em>body</em>、<em>p</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">ID 選擇器</div>
                    <div class="f-f3"><em>#wrap</em>、<em>#navList</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">類別選擇器</div>
                    <div class="f-f3"><em>.index</em>、<em>.product-item</em>、<em>.title01</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">萬用選擇器</div>
                    <div class="f-f3"><em>*</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">屬性選擇器</div>
                    <div class="f-f3"><em>[href]</em>、<em>[type="text"]</em>、<em>[data-color^="blue"]</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">組合選擇器</div>
                    <div class="f-f3"><em>h1, h2, h3</em>、<em>ul > li</em>、<em>.a + .b</em>、<em>.a ~ .b</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">偽類別選擇器</div>
                    <div class="f-f3"><em>:hover</em>、<em>:focus</em>、<em>:active</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">偽元素選擇器</div>
                    <div class="f-f3"><em>::before</em>、<em>::after</em>、<em>::placeholder</em> ...</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>標籤選擇器</h3>
        <p>標籤選擇器指的就是 HTML 任一元素（Element）的標籤（Tag），舉凡最常使用到的 <em>&lt;div&gt;</em>、<em>&lt;a&gt;</em>、<em>&lt;p&gt;</em> 等族繁不及備載，當然，也包含將前者所述元素囊括的 <em>&lt;html&gt;</em> 與 <em>&lt;body&gt;</em>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    font-size: 24px;
    color: #F00;
}</code></pre>
        </div>
        <p>需要注意的是，當你指定標籤選擇器來設定樣式時，其樣式屬性的套用範圍將涵蓋整個網頁所有同名元素標籤。除非很確定整個網站所有同名元素都會套用某些共同的樣式，否則一般來說不太建議直接使用標籤選擇器設定屬性。</p>
        <p>儘管還沒說到「權重」的相關內容，不過這裡還是稍微提一下，讓不熟悉的人對 CSS 權重優先度有個大概輪廓：因為標籤選擇器指定的元素標籤屬於廣義且較籠統的，因此在權重優先度分數上是很低的（僅高於萬用選擇器），所謂的低，指的是當元素同時由標籤選擇器及其他的選擇器設定相同的屬性時，其他選擇器裡的屬性值將會蓋過標籤選擇器裡設定的值。</p>
        <p><br></p>
        <h3>ID 選擇器</h3>
        <p>CSS 指的 ID 與 HTML 元素的 ID（Identity）屬性（<em>id</em>）是一樣的東西，我們比較少看到有人會將 HTML 裡的 ID 翻譯成中文去稱呼，簡單來說，ID 就像是我們人類的身分證，每個 ID 都是獨一無二的存在。雖說在 HTML 可以重複使用同名的 ID（但這是錯誤的使用方式），然而能被 JavaScript 存取的只有網頁從上讀下來的第一個 ID，其他同名 ID 則不會有作用。至於對 CSS 而言則沒想這麼多（畢竟它只負責美化），只要符合選擇器條件的都會把屬性套上去。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">#navList {
    min-height: 40px;
    background-color: #000;
    padding: 16px;
}</code></pre>
        </div>
        <p>語法方面，ID 的代表語法符號是 <em>#</em>，後方再加上要檢索的名稱即可。</p>
        <p><br></p>
        <h3>類別選擇器</h3>
        <p>類別選擇器其實指的就是 HTML 元素中的 Class 屬性（<em>class</em>），類別選擇器也是目前 CSS 選擇器最廣泛的使用主流。凡只要有持有該 <em>class</em> 名稱的 HTML 元素，皆會套用該類別選擇器設定的 CSS 樣式。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.name {
    line-height: 2;
    font-size: .875rem;
    font-weight: bold;
}</code></pre>
        </div>
        <p>CSS 用 <em>.</em> 符號來表示類別選擇器，絕大多數過來人都會建議「多使用 class，少使用 ID」，這是因為 <em>class</em> 不單可以同時設定多個類別選擇器，在不同 HTML 元素使用同名 <em>class</em> 時，也能讓 JavaScript 一併存取使用（如果需要針對包含相同名稱標示的元素都執行相同指令），而不像 ID 會受到其唯一性特性的限制。</p>
        <p><br></p>
        <h3>萬用選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">* {
    box-sizing: border-box;
}</code></pre>
        </div>
        <p>就這樣，沒了。</p>
        <p>萬用選擇器的定義很單純，用法也很單純，主要就是以一個 <em>*</em> 符號表示，也不需要在後方添加別的東西（至於 <em>*</em> 如果是加在其他名字後面就是不同的選擇器用法了）。</p>
        <p>在使用概念上和標籤選擇器相似，HTML 所有元素都會套用萬用選擇器設定的樣式，所以非必要的話，應該盡量避免在萬用選擇器裡面添加屬性，除非是很確定網頁每一個元素都需要套用的。放眼坊間，比較常會將之寫進萬用選擇器的屬性為 <em>box-sizing: border-box;</em>（用來控制元素 Box Model 寬高佔據的範圍）。</p>
        <p><br></p>
        <h3>屬性選擇器</h3>
        <p>屬性選擇器名子裡的屬性，不是指 CSS 樣式裡的 Property，而是 HTML 元素裡的 Attribute，比如 <em>a</em> 元素的 <em>href</em> 屬性。屬性選擇器最基本的語法是透過 <em>[]</em> 符號指定要套用樣式的屬性，其公式是這樣的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">[attribute="value"] { /* css */ }</code></pre>
        </div>
        <p>以下舉幾個簡單例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">[title] {
    font-style: italic;
}</code></pre>
        </div>
        <p>首先是單純只有設置屬性選擇器的情況，代表網頁裡所有有設置 <em>title</em> 屬性的 HTML 元素都會套用到設定的樣式。我們也可以在屬性選擇器前面添加不同的選擇器，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img[title] { ... }
/* 所有包含 title 屬性的 img 元素 */

a[href="https://example.com"] { ... }
/* 所有包含 href 屬性值為 https://example.com 的 a 元素 */

button[type="submit"] { ... }
/* 所有包含 type 值為 submit 的 button 元素 */</code></pre>
        </div>
        <p>當然也可以不斷堆加不同的選擇器，讓目標更明確，增強其裡頭 CSS 屬性的權重，像下面這個例子就另外結合標籤與類別這兩個選擇器：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">a.go-top[href="#0"] { ... }</code></pre>
        </div>
        <p>有些人看到這裡心裡可能會產生疑問：既然屬性選擇器指的是 HTML 元素的屬性，那麼 <em>id</em> 和 <em>class</em> 不也是屬性之一嗎？他們能不能被屬性選擇器指定？沒錯，真要說起來，ID 選擇器與類別選擇器確實也是以元素對應的屬性名稱作指定對象，主要差別在於這兩種選擇器已有定義好方便書寫的特殊符號。假如要經由屬性選擇器去設定的話，寫法會是這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">[id="userName"] { ... }
[class="input-box"] { ... }</code></pre>
        </div>
        <p>再怎麼說還是直接用 <em>#</em> 及 <em>.</em> 來寫會比較有效率，也比較容易閱讀。</p>
        <p><br></p>
        <p>前面屬性的給值只有單純使用 <em>=</em> 符，事實上，還有另外幾種追加過濾條件的方法，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">button[data-color*="blue"] {
    color: blue;
}</code></pre>
        </div>
        <p>這段樣式程式碼的意思是所有 <em>&lt;button&gt;</em> 元素中，含有 <em>data-color</em> 屬性且名稱「包含」（<em>*</em>）<em>blue</em> 值者，都會套用這個選擇器裡設定的 CSS 樣式。</p>
        <p>講解完 <em>*</em> 符號，以下接著連同前面介紹過的幾種語法，統整出一張表格，來陳列所有屬性選擇器已知定義的語法：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f1">範例</div>
                    <div class="f-f2">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute]</div>
                    <div class="f-f1"><em>[data-color]</em></div>
                    <div class="f-f2">擁有 <em>data-color</em> 屬性的元素皆會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute="value"]</div>
                    <div class="f-f1"><em>[data-color="blue"]</em></div>
                    <div class="f-f2">擁有 <em>data-color</em> 屬性且屬性值為 <em>blue</em> 的元素才會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute*="value"]</div>
                    <div class="f-f1"><em>[data-color*="blue"]</em></div>
                    <div class="f-f2">只有屬性值中「包含」 <em>blue</em> 字串的元素就會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute~="value"]</div>
                    <div class="f-f1"><em>[data-color~="blue"]</em></div>
                    <div class="f-f2">假如屬性值是複數（以空白區隔），只要「其中有一個」值是 <em>blue</em> 就會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute^="value"]</div>
                    <div class="f-f1"><em>[data-color^="blue"]</em></div>
                    <div class="f-f2">屬性值「開頭」是 <em>blue</em> 的元素才會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute|="value"]</div>
                    <div class="f-f1"><em>[data-color|="blue"]</em></div>
                    <div class="f-f2">屬性值是 <em>blue</em> 或開頭是 <em>blue-</em> 的元素才會套用樣式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">[attribute$="value"]</div>
                    <div class="f-f1"><em>[data-color$="blue"]</em></div>
                    <div class="f-f2">屬性值「結尾」是 <em>blue</em> 的元素才會套用樣式。</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>組合選擇器</h3>
        <p>又稱「後代選擇器」、「子選擇器」、「相鄰兄弟選擇器」，所謂組合，指的是不同選擇器之間的組合應用，它可以讓指定的樣式套用範圍擴展至鄰近或囊括的其他元素。</p>
        <p>組合選擇器的應用字符一共有四種，以下用一張表格，並使用 <em>A</em>、<em>B</em> 表示兩個不同的選擇器名稱以作說明：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f1">範例</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">後代選擇器</div>
                    <div class="f-f1"><em>A B</em></div>
                    <div class="f-f4">指定 A 元素 / 選擇器內所有的 B 元素 / 選擇器。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">子代選擇器</div>
                    <div class="f-f1"><em>A > B</em></div>
                    <div class="f-f4">指定 A 元素 / 選擇器 下一層的 B 元素 / 選擇器。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">兄弟選擇器</div>
                    <div class="f-f1"><em>A ~ B</em></div>
                    <div class="f-f4">指定在 A 元素 / 選擇器 之後所有同層的 B 元素 / 選擇器。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">相鄰兄弟選擇器</div>
                    <div class="f-f1"><em>A + B</em></div>
                    <div class="f-f4">指定在 A 元素 / 選擇器 之後相鄰的 B 元素 / 選擇器（不能被任何其他元素相隔）。</div>
                </div>
            </div>
        </div>
        <p>以下實際舉幾個例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p .title { ... }
/* 指定所有 p 元素裡含有 .title 類別選擇器的元素 */

ul > li > a { ... }
/* 指定所有 ul 下一層 li 的下一層之 a 元素 */

input[type="checkbox"] + label { ... }
/* 指定所有 checkbox input 相鄰的 label 元素 */</code></pre>
        </div>
        <p>除了上述這四項組合，還有一種名叫「群組選擇器」的用法，指的是當你同時要指定多個元素套用相同樣式的方法，概念很簡單，只要在不同選擇器之間加上 <em>,</em>（逗號）分隔即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h1,
p { ... }

.class1,
.class2,
.class3 { ... }</code></pre>
        </div>
        <p><br></p>
        <h3>偽類別選擇器</h3>
        <p>偽類別（Pseudo-classes）選擇器主要依據指定元素的狀態，去套用其設定的屬性樣式，所謂的「狀態」，包含未訪問、已訪問、滑過等動作，抑或是指定順序或排序等，都屬於偽類別選擇器的範疇。</p>
        <p>偽類別選擇器在語法方面表示的符號為單冒號，例如：<em>:hover</em>。</p>
        <p>在 CSS3 以前，偽類別選擇器的語法比較少，不過到 CSS3 則搖身一變提供了海量的選擇器語法，這裡我們用表格來看看究竟目前有哪些偽類別選擇器：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f3">Selector</div>
                    <div class="f-f3">類別</div>
                    <div class="f-f7">說明</div>
                    <div class="f-f1">CSS</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:link</em></div>
                    <div class="f-f3">連結偽類</div>
                    <div class="f-f7">未訪問過的連結。</div>
                    <div class="f-f1">1</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:visited</em></div>
                    <div class="f-f3">連結偽類</div>
                    <div class="f-f7">已訪問過的連結。</div>
                    <div class="f-f1">1</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:hover</em></div>
                    <div class="f-f3">使用者操作偽類</div>
                    <div class="f-f7">滑鼠游標懸停在上方。</div>
                    <div class="f-f1">2</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:focus</em></div>
                    <div class="f-f3">使用者操作偽類</div>
                    <div class="f-f7">當元素獲得焦點的時候。</div>
                    <div class="f-f1">2</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:active</em></div>
                    <div class="f-f3">使用者操作偽類</div>
                    <div class="f-f7">點擊元素的時候。</div>
                    <div class="f-f1">2</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:root</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">根元素。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:nth-child(n)</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素第 n 個順序的項目（順序包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:nth-last-child(n)</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素倒數第 n 個順序的項目（順序包含同一階層內的其他元素。）</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:nth-of-type(n)</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素第 n 個順序的項目（順序不包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:nth-last-of-type(n)</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素倒數第 n 個順序的項目（順序不包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:first-child</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素第 1 個順序的項目（順序包含同一階層內的其他元素）。</div>
                    <div class="f-f1">2</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:last-child</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素最後 1 個順序的項目（順序包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:first-of-type</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素第 1 個順序的項目（順序不包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:last-of-type</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取指定元素最後 1 個順序的項目（順序不包含同一階層內的其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:only-child</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取同階層裡不存在其他元素的指定元素（計算包含其他元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:only-of-type</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取同階層裡不存在其他元素的指定元素（計算僅包含指定元素）。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:empty</em></div>
                    <div class="f-f3">結構性偽類</div>
                    <div class="f-f7">選取沒有任何子元素的指定元素。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:lang(charset)</em></div>
                    <div class="f-f3">語言偽類</div>
                    <div class="f-f7">選取指定元素有 lang 語言的屬性，並且啟始值等於 charset 或 charset-。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:enabled</em></div>
                    <div class="f-f3">UI 元素狀態偽類</div>
                    <div class="f-f7">UI 為啟用的元素。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:disabled</em></div>
                    <div class="f-f3">UI 元素狀態偽類</div>
                    <div class="f-f7">UI 為禁用的元素。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:checked</em></div>
                    <div class="f-f3">UI 元素狀態偽類</div>
                    <div class="f-f7">使用者選擇的 UI 元素。</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f3"><em>:not(s)</em></div>
                    <div class="f-f3">否定偽類</div>
                    <div class="f-f7">不匹配 s 的元素。</div>
                    <div class="f-f1">3</div>
                </div>
            </div>
        </div>
        <p>有關 CSS3 新增的選擇器我們保留到後面的章節再來細讀，這裡就簡述一下連結偽類與使用者操作偽類的部分。早期學 CSS 的時候，會看到有些文章特別強調 <em>:link</em>、<em>:visited</em>、<em>:hover</em>、<em>:active</em> 的順序性，它們語法使用上的順序是這樣的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">a:link {
    color: blue;
}
/* 未連結 */

a:visited {
    color: purple;
}
/* 已連結過 */

a:hover {
    color: red;
}
/* 滑鼠移至連結 */

a:active {
    color: green;
}
/* 選擇的連結 */</code></pre>
        </div>
        <p>之所以必須按照順序乃是因為 CSS 相同權重，後者會覆蓋掉前者屬性的特性，我們可以略過不寫，但如果同一 <em>a</em> 元素有使用某幾個偽類別選擇器就必須按照上方的順序去書寫樣式。</p>
        <p><br></p>
        <h3>偽元素選擇器</h3>
        <p>偽元素（Pseudo-elements）選擇器是一種很特別的選擇器，它可以在 HTML 裡生成出有形的實體，但卻不像 HTML 元素那樣明確定義出局部範圍，也無法像元素那樣可以在標籤裡面增加內容（content）。儘管如此，我們仍可以在 CSS 裡針對指定的選擇器添加偽元素選擇器，輔助我們對其進一步設定樣式屬性。</p>
        <p>一般而言，現今多用「雙冒號」（<em>::</em>）作為偽元素選擇器的表示符號，最經典且常見的偽元素選擇器為 <em>::before</em> 與 <em>::after</em>，除此之外尚有 <em>::first-letter</em> 及 <em>::first-line</em>，我們一樣通過簡表來認識它們的定義：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f1">範例</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>::before</em></div>
                    <div class="f-f1"><em>p::before</em></div>
                    <div class="f-f3">在 <em>p</em> 元素的內容之前新增偽元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>::after</em></div>
                    <div class="f-f1"><em>p::before</em></div>
                    <div class="f-f3">在 <em>p</em> 元素的內容之後新增偽元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>::first-letter</em></div>
                    <div class="f-f1"><em>p::first-letter</em></div>
                    <div class="f-f3">在 <em>p</em> 元素的第一個字。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>::first-line</em></div>
                    <div class="f-f1"><em>p::before</em></div>
                    <div class="f-f3">在 <em>p</em> 元素的第一行。</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p {
    display: inline-block;
    font-size: 1.5rem;
    background-color: #eee;
    padding: 1rem;
}
p::before {
    content: "before";
    font-size: 0.75em;
    color: red;
    margin-right: 0.5rem;
}
p::after {
    content: "after";
    font-size: 0.75em;
    color: blue;
    margin-left: 0.5rem;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector1">
                <p>content</p>
            </div>
        </div>
        <blockquote class="is-info">
            <p>單冒號（<em>:</em>）或雙冒號（<em>::</em>）的差異？</p>
            <p><br></p>
            <p>以前偽類與偽元素都是用一個冒號表示，後來為區分兩者不同，W3C 便提倡用兩個冒號表示偽元素。許多瀏覽器仍相容偽元素僅使用一個冒號，儘管如此，雙冒號仍是目前表達偽元素最標準的用法。</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>如果要談起選擇器的優先順序，我們一般會稱之為「權重」（Specificity），通常遇到權重問題，大概都是我們在某個 HTML 元素使用到某種 CSS 選擇器，但是在其他區塊同樣又需要用到該元素，可是某些樣式上卻需要調整的時候，我們需要額外在別的選擇器添加屬性去覆蓋它。可是，並不是盲目新增選擇器就能覆蓋掉原本的設定，例如下方案例：</p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;ul&gt;
    &lt;li&gt;A&lt;/li&gt;
    &lt;li class="old new"&gt;B&lt;/li&gt;
    &lt;li class="new"&gt;C&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
        <p>CSS（已簡化，只保留必要呈現的樣式）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">li {
    background-color: lightblue;
}
li.old {
    background-color: lightgreen;
}
.new {
    background-color: lightyellow;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector2">
                <ul>
                    <li>A</li>
                    <li class="old new">B</li>
                    <li class="new">C</li>
                </ul>
            </div>
        </div>
        <p>透過範例應該不難發現，在 B 方塊同時添加 <em>.old</em> 與 <em>.new</em> 類別選擇器的情況下，實際呈現結果 B 方塊套用的背景顏色是 <em>.old</em> 設定的亮綠色，而非 <em>.new</em> 的亮黃色，這和原本已知「單一元素套用多個相同 CSS 屬性，較後設定的參數會覆蓋較前者」的觀念大相逕庭，這並不是理論出了問題，而是當時這句話並沒有將複合選擇器的權重優先度考慮進來。</p>
        <p>事實上，每一個選擇器都是有權重分，且不同類型的選擇器，其權重分數也不一樣。以上面案例來說，「標籤選擇器」（<em>li</em>）的權重分數為 1 分，至於「類別選擇器」（<em>.old</em>、<em>.new</em>）的權重分數則有 10 分，當 C 方塊同時包含 <em>li</em> 標籤選擇器與 <em>.new</em> 類別選擇器時，因為類別選擇器的權重分數較高，故顯示結果便以 <em>.new</em> 設定的屬性值為主。</p>
        <p>至於不同種類的選擇器串聯起來成「組合選擇器」，其總分數會依各自的原權重分相加新的分數，所以 <em>li.old</em> 的分數為 11 分，比單純只有 <em>.new</em> 的 10 分還高，這也是為什麼 B 方塊最終顯示的樣式會是 <em>li.old</em> 所設定的參數值了。</p>
        <p>我們將目前學到的選擇器做一張權重高低的分數表，這樣在使用上就更能理解它們同時被某個 HTML 元素標籤套用時，分數剛怎麼計算：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">範例</div>
                    <div class="f-f0">分數</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">標籤選擇器</div>
                    <div class="f-f3"><em>html</em>、<em>body</em>、<em>p</em> ...</div>
                    <div class="f-f0">1</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">ID 選擇器</div>
                    <div class="f-f3"><em>#wrap</em>、<em>#navList</em> ...</div>
                    <div class="f-f0">100</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">類別選擇器</div>
                    <div class="f-f3"><em>.index</em>、<em>.product-item</em>、<em>.title01</em> ...</div>
                    <div class="f-f0">10</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">萬用選擇器</div>
                    <div class="f-f3"><em>*</em></div>
                    <div class="f-f0">0</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">屬性選擇器</div>
                    <div class="f-f3"><em>[href]</em>、<em>[type="text"]</em>、<em>[data-color^="blue"]</em> ...</div>
                    <div class="f-f0">10</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">偽類別選擇器</div>
                    <div class="f-f3"><em>:hover</em>、<em>:focus</em>、<em>:active</em> ...</div>
                    <div class="f-f0">10</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">偽元素選擇器</div>
                    <div class="f-f3"><em>::before</em>、<em>::after</em>、<em>::placeholder</em> ...</div>
                    <div class="f-f0">10</div>
                </div>
            </div>
        </div>
        <p>這份分數表沒有「組合選擇器」是因為組合選擇器是其他選擇器相加而成的類別，其分數會依據選擇器類別的不同而結果也不同，為浮動的數值。</p>
        <p>不過這些分數的比較僅止於樣式表內，假設今天我們將 CSS 樣式直接寫在 HTML 的行內（inline-style），則分數將會是 1000 分，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;ul&gt;
    &lt;li&gt;A&lt;/li&gt;
    &lt;li class="old new" style="background-color: red"&gt;B&lt;/li&gt;
    &lt;li class="new"&gt;C&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector2">
                <ul>
                    <li>A</li>
                    <li class="old new" style="background-color: red">B</li>
                    <li class="new">C</li>
                </ul>
            </div>
        </div>
        <p>然而，inline-style 的權重分數還不是最高分，真正的最高分是 CSS3 的 <em>!important</em> 參數值，無論什麼選擇器，一旦添加 <em>!important</em>，分數立刻直接加上 10000 分！</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;ul&gt;
    &lt;li&gt;A&lt;/li&gt;
    &lt;li class="old new" style="background-color: red"&gt;B&lt;/li&gt;
    &lt;li class="new"&gt;C&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-css">li {
    background-color: lightblue;
}
li.old {
    background-color: lightgreen !important;
}
.new {
    background-color: lightyellow;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector2">
                <ul>
                    <li>A</li>
                    <li class="old-i new" style="background-color: red">B</li>
                    <li class="new">C</li>
                </ul>
            </div>
        </div>
        <p>會發現即使 B 方塊插入 inline-style，也仍然無法撼動多添加了 <em>!important</em> 值的 <em>li.old</em> 組合選擇器分數。但假設多個選擇器裡面的共同屬性都加上了 <em>!important</em>，則還是會回歸基本面的權重分比較（畢竟大家都加了 10000 分......），除非必要，原則上盡量還是少用 <em>!important</em> 這個參數。</p>
        <p><br></p>
        <p>總結一下內容，權重，指的是 CSS 的優先權，當 HTML 元素標籤存在多個選擇器，權重高的會覆蓋其他，若相同權重，後寫的 CSS 會覆蓋前面寫的 CSS。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>程式語言的 Coding Style 一直是摒除邏輯思路外，另一個時常被提及其重要性的議題。良好的書寫習慣可以幫助自己或團隊容易閱讀，日後維護時也不需額外費心去理解那些不經整理的程式碼。而 CSS Coding Style 方面，最常聽到的莫過於「屬性順序」與「選擇器命名」這兩件事，常見的「屬性順序」書寫方式有兩種：一種是按照屬性字母，通常這種寫法在以英文語言為主的使用者比較常見；另一種則是依照屬性相近性質作區分，把同類型的屬性放在一起，這種方式與前者相比相較不那麼嚴謹，但是在閱讀方面有時反而會比前者來得順暢，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 1.5;
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
    background-color: #000;
    border: 1px solid #CCC;
}</code></pre>
        </div>
        <p>這段程式碼我們應能明顯看出與定位、尺寸、文字有關的屬性都各自書寫在一起了，但假如要照屬性開頭字母的順序編寫，則會變成如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">div {
    background-color: #000;
    border: 1px solid #CCC;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    height: 50px;
    line-height: 1.5;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 100px;
}</code></pre>
        </div>
        <p>就個人而言，我比較喜歡將用途相似的屬性放在一起，不過因為屬性順序先後不太影響瀏覽器判讀（除非重複書寫相同屬性），所以其實也沒有所謂絕對順序規範，主要還是以自己及團隊能比較容易閱讀為主，並保持整體書寫的一致性即可。</p>
        <p>其實 CSS 的 Coding Style 守則很多，但本篇主要要談的還是與選擇器比較有關的內容（前面屬性順序算是多提的），尤其是「ID 選擇器」與「類別選擇器」，這兩種都能自定義選擇器名稱，然而並非任何名稱都可以使用，我們仍遵循一定的規範命名，否則瀏覽器將無法判讀。以下列舉出我們在自定義選擇器名稱時，應當避免或需要注意的幾點事項：</p>
        <p><br></p>
        <h3>1. 禁止數字開頭</h3>
        <p>命名時在字母後方加上數字是可以允許的，但選擇器名稱不能使用數字作開頭，否則瀏覽器無法判讀。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">#1item { ... }
.5945123 { ... }
.3a3b3c { ... }</code></pre>
        </div>
        <p>以上這些範例都是不正確的命名方式。</p>
        <p><br></p>
        <h3>2. 避免使用特殊符號</h3>
        <p>除了不能使用數字當開頭，大多數特殊符號也同樣不能作為選擇器名稱的字首，且也不能使用在名稱內，通常瀏覽器都無法判讀這些夾雜特殊符號命名的選擇器。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.@news { ... }
.about$$me { ... }
###title { ... }
.p*r*o* { ... }</code></pre>
        </div>
        <p>以上這些範例都是不正確的命名方式。</p>
        <p>仍有些極少數的符號是可以被瀏覽器讀取的，像是中線「<em>-</em>」或底線「<em>_</em>」，不過原則上盡量還是不要採取這樣的命名方式為佳。</p>
        <p><br></p>
        <h3>3. 避免過度簡略或縮寫</h3>
        <p>我們在給元素對應的 ID / 類別選擇器命名的時候，通常很直覺會以該元素的用途去作命名，有時翻譯的英文單字很長，部份人就會用縮寫或只簡單取單字前幾個字母來命名...並不是說這種方式不好，如果是那些約定成俗，別人一看就懂的縮名簡寫通常沒什麼問題，但如果是只有自己當下才理解的簡寫就屬於比較不適當的命名方式，興許時間拉長要回頭檢視時，就連自己都不曉得當初為什麼會這樣命名選擇器。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.wrap { ... }    // wrapper
.obj { ... }    // object
.bg { ... }    // background</code></pre>
        </div>
        <p>像上面這些就屬於日積月累流傳下來的簡略命名，我們直覺看到心裡就會明白該選擇器的用途是什麼，至於以下這些雖然也是簡略化的命名，但相對就比較難產生聯想：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.promt { ... }    // promotions
.sc { ... }    // shopping cart
.cont { ... }    // contact</code></pre>
        </div>
        <p><br></p>
        <h3>4. 前綴與駝峰式命名法</h3>
        <p>基本上，我們在寫一個功能的程式碼區塊時，HTML 通常是一層包著一層的巢狀結構，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div&gt;
    &lt;h2&gt;Title&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;item1&lt;/li&gt;
        &lt;li&gt;item2&lt;/li&gt;
        &lt;li&gt;item3&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>而每一層元素可能都會需要加上一或多個類別選擇器，以改變它們的樣式，這時要如何為它們命名便是一個大哉問了。有些人會直接依照元素用途去取名，像這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="wrap"&gt;
    &lt;h2 class="title"&gt;Title&lt;/h2&gt;
    &lt;ul class="list"&gt;
        &lt;li class="item"&gt;item1&lt;/li&gt;
        &lt;li class="item"&gt;item2&lt;/li&gt;
        &lt;li class="item"&gt;item3&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>乍看沒什麼問題，但假設同一頁面或不同頁面存在其他類似結構但不同功能時，它們又該如何命名呢？像上面這樣的命名方式極有可能會與其他功能名稱重疊，進而產生屬性相衝或互相套用的問題。</p>
        <p>因此，面對這種巢狀式架構的命名，我們可以透過加上共有前綴的方式，來為不同功能作區分，整體閱讀上也較為順眼。像上面程式碼片段我們就可以這樣命名：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="menu-wrap"&gt;
    &lt;h2 class="menu-title"&gt;Title&lt;/h2&gt;
    &lt;ul class="menu-list"&gt;
        &lt;li class="menu-item"&gt;item1&lt;/li&gt;
        &lt;li class="menu-item"&gt;item2&lt;/li&gt;
        &lt;li class="menu-item"&gt;item3&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>這樣一看就知道該區塊是和菜單（Menu）有關的內容。除了用中線或底線區隔組合單字之外，我們也可以善用程式語言常見的命名規則──「駝峰式命名法」（Camel-Case），正如它英文名稱標示，在多個單字組合的名稱間，各單字字首以大寫表示，以便區分組合單字的間隔。不過駝峰式命名法通常比較常使用在 ID 選擇器上，算是與類別選擇器常見的中底線串起組合詞彙有個識別區隔。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="menuFunction" class="menu-wrap"&gt; ... &lt;/div&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>CSS3 除了新增許多過去 CSS 無法作到的動態與濾鏡之類的屬性外，也釋出更多的選擇器用法，我們先以一張表格披露目前 CSS3 新增的選擇器種類：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">Example</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Type 選擇器</div>
                    <div class="f-f3"><em>:first-of-type</em>、<em>:last-of-type</em>、<em>:nth-of-type(n)</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">子元素選擇器</div>
                    <div class="f-f3"><em>:first-child</em>、<em>:last-child</em>、<em>:nth-child(n)</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">根元素選擇器</div>
                    <div class="f-f3"><em>:root</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">空元素選擇器</div>
                    <div class="f-f3"><em>:empty</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Not 選擇器</div>
                    <div class="f-f3"><em>:not(p)</em>、<em>:not(.class)</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">表單元素選擇器</div>
                    <div class="f-f3"><em>:enabled</em>、<em>:disabled</em>、<em>:checked</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Target 選擇器</div>
                    <div class="f-f3"><em>:target</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Selection 選擇器</div>
                    <div class="f-f3"><em>::selection</em></div>
                </div>
            </div>
        </div>
        <p>你會發現除了最後一個 Selection 選擇器，其餘基本上都屬於第一個章節提到的「偽類別選擇器」，只不過它們還有各自不同的稱呼，以下我們一個接著一個來檢視。</p>
        <p><br></p>
        <h3>Type 選擇器</h3>
        <p>Type 選擇器有以下這些語法：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:first-of-type</em></div>
                    <div class="f-f3">選取指定元素第 1 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:last-of-type</em></div>
                    <div class="f-f3">選取指定元素最後 1 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:only-of-type</em></div>
                    <div class="f-f3">選取同階層裡不存在其他元素的指定元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:nth-of-type(n)</em></div>
                    <div class="f-f3">選取指定元素第 n 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:nth-last-of-type(n)</em></div>
                    <div class="f-f3">選取指定元素倒數第 n 個順序的項目。</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">li {
    background-color: gray;
}
li:first-of-type {
    background-color: lightblue;
}
li:nth-of-type(3) {
    background-color: lightgreen;
}
li:last-of-type {
    background-color: lightyellow;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector3">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
            </div>
        </div>
        <p><br></p>
        <h3>子元素選擇器</h3>
        <p>子元素選擇器有以下這些語法：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:first-child</em></div>
                    <div class="f-f3">選取指定元素第 1 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:last-child</em></div>
                    <div class="f-f3">選取指定元素最後 1 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:only-child</em></div>
                    <div class="f-f3">選取同階層裡不存在其他元素的指定元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:nth-child(n)</em></div>
                    <div class="f-f3">選取指定元素第 n 個順序的項目。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:nth-last-child(n)</em></div>
                    <div class="f-f3">選取指定元素倒數第 n 個順序的項目。</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">li {
    background-color: gray;
}
li:first-child {
    background-color: lightblue;
}
li:nth-child(3) {
    background-color: lightgreen;
}
li:last-child {
    background-color: lightyellow;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-selector4">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
            </div>
        </div>
        <p>相信多數初學者甚至老鳥都分不太清楚 Type 選擇器與子元素選擇器的差別，雖然兩者檢索的方式一樣，但最主要差異在於同階層存在其他不同元素或選擇器的情況下，Type 選擇器只會針對指定的選擇器作計數，而子元素選擇器計數則會包含其他元素，倘若計數的數字對應的元素非子元素選擇器的指定對象，則不會套用樣式。</p>
        <p>比如說，現在有一個 HTML 結構長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;hgroup&gt;
    &lt;h1&gt;Head1&lt;/h1&gt;
    &lt;p&gt;p1&lt;/p&gt;
    &lt;p&gt;p2&lt;/p&gt;
    &lt;p&gt;p3&lt;/p&gt;
    &lt;h2&gt;Head2&lt;/h2&gt;
    &lt;h3&gt;Head3&lt;/h3&gt;
    &lt;p&gt;p4&lt;/p&gt;
    &lt;p&gt;p5&lt;/p&gt;
    &lt;h4&gt;Head4&lt;/h4&gt;
&lt;/hgroup&gt;</code></pre>
        </div>
        <p>然後我們試著用 <em>:nth-of-type(3)</em> 和 <em>:nth-child(3)</em> 去定義 <em>p</em> 元素的樣式，以下直接透過範例觀看指定後的結果：</p>
        <div class="text-example">
            <div class="ex-selector5">
                <hgroup>
                    <h1>:nth-of-type(3)</h1>
                    <p>p1</p>
                    <p>p2</p>
                    <p>p3</p>
                    <h2>Head2</h2>
                    <h3>Head3</h3>
                    <p>p4</p>
                    <p>p5</p>
                    <h4>Head4</h4>
                </hgroup>
                <hgroup>
                    <h1>:nth-child(3)</h1>
                    <p>p1</p>
                    <p>p2</p>
                    <p>p3</p>
                    <h2>Head2</h2>
                    <h3>Head3</h3>
                    <p>p4</p>
                    <p>p5</p>
                    <h4>Head4</h4>
                </hgroup>
            </div>
        </div>
        <p>可以看出在同一階層裡存在各種不同的元素時，Type 選擇器只會針對指定對象去作檢索，但子元素選擇器在計算編號順序時，順序是包含其他不同元素一起作計算的，如果指定的順序不是指定的選擇器對象，就不會套用設定的屬性樣式，即便指定順序的元素與選擇器對象相符，也未必是該選擇器所有同名對象的次序，如同上方的範例，我們指定 <em>p</em> 第三個子元素（<em>:nth-child(3)</em>）套用樣式，實際上卻是第二個 <em>p</em> 元素套用到，乃是因為第二個 <em>p</em> 元素在該階層裡排在順序第三的位置。</p>
        <p><br></p>
        <h3>根元素選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root {
    background-color: lightblue;
}</code></pre>
        </div>
        <p>根元素選擇器指的就是網頁的 <em>&lt;html&gt;</em> 元素──很多人會這樣畫上等號，其實不盡然，雖然對於 HTML 來說，<em>:root</em> 表示 <em>&lt;html&gt;</em>，但在 CSS 權重層面，<em>:root</em> 優先級卻高於 <em>html</em>。</p>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="275" data-default-tab="css,result" data-slug-hash="yLPWaOP" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/yLPWaOP">
            css3: root</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>可以看到縱使在 CSS 後寫的屬性樣式會覆蓋掉前者屬性的特性，位於較前的 <em>:root</em> 樣式仍覆蓋掉較後的 <em>html</em>，這就證明 <em>:root</em> 的權重高於 <em>html</em> 標籤選擇器。</p>
        <p><br></p>
        <h3>空元素選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">p:empty {
    background-color: lightblue;
}</code></pre>
        </div>
        <p>空元素選擇器選取的對象是裡面沒有任何內容（包含純文字或任何子元素）的指定元素或選擇器，比如我們用以下的 HTML 結構套用上方的範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;p&gt;&lt;/p&gt;
&lt;p&gt;content&lt;/p&gt;
&lt;p&gt;
    &lt;a href="##"&gt;link&lt;/a&gt;
&lt;/p&gt;</code></pre>
        </div>
        <p>只有第一個 <em>p</em> 元素會套用到 <em>p:empty</em> 的屬性。</p>
        <p><br></p>
        <h3>Not 選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:not(p) {
    background-color: lightblue;
}</code></pre>
        </div>
        <p>Not 選擇器套用的樣式屬性是所有不是指定目標的其他元素，而非指定的目標對象。</p>
        <blockquote class="is-warning">
            <p>如果不是很有把握，建議盡量避免使用這個屬性，以免屬性覆蓋到任何不是自己想要套用到的對象。</p>
        </blockquote>
        <p><br></p>
        <h3>表單元素選擇器</h3>
        <p>HTML 表單元素泛指 <em>&lt;input&gt;</em>、<em>&lt;select&gt;</em>、<em>&lt;textarea&gt;</em> 等，通常我們可以直接在其標籤裡添加屬性控制它們的狀態，像是設置 <em>disabled</em> 來禁用表單元素，令使用者無法輸入內容。而表單元素選擇器用途就是指定目標對象處於該狀態下時，所要套用的 CSS 屬性樣式。</p>
        <p>表單元素選擇器有以下這些語法：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Selector</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:enabled</em></div>
                    <div class="f-f3">選取啟用的表單元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:disabled</em></div>
                    <div class="f-f3">選取禁用的表單元素。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>:checked</em></div>
                    <div class="f-f3">選取被選中的表單元素（核選方塊與核選按鈕），目前僅 Opera 瀏覽器支援。</div>
                </div>
            </div>
        </div>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">input:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}</code></pre>
        </div>
        <p><br></p>
        <h3>Target 選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.element:target {
    background-color: lightblue;
}</code></pre>
        </div>
        <p>Target 選擇器可以讓我們指定特定目標的樣式，通常此選擇器會與錨點作搭配，例如：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="wvKReYB" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/wvKReYB">
            CSS-learn: selectors-target</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>另外比較常見的應用是創造出類似燈箱（lightbox）的效果，過往這類效果基本都需要透過 JavaScript 實現：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="html,result" data-slug-hash="MzoKzP" data-user="ind88" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/ind88/pen/MzoKzP">
            Responsive CSS Lightbox / Multiple images and prev / next arrows</a> by Indra (<a href="https://codepen.io/ind88">@ind88</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>Selection 選擇器</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">::selection {
    color: #FFF;
    background-color: lightblue;
}</code></pre>
        </div>
        <p>Selection 選擇器主要用來設定網頁內容被選取（反白）時的樣式屬性，除了可以改變全域樣式外，亦可以針對特定元素去設定其反白時的 CSS 樣式。</p>
        <p>以下範例請嘗試將元素內容選取起來看看：</p>
        <div class="text-example">
            <div class="ex-selector6">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur nulla, aliquid autem commodi voluptate expedita earum ex natus consectetur quas itaque optio eaque possimus quod ipsa error. Laudantium, natus assumenda! Lorem ipsum dolor sit, amet consectetur</p>
            </div>
        </div>


    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Glossary/CSS_Selector" target="_blank">MDN web docs</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>