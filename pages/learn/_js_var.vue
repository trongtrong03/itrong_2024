<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、var' },
        { id: 2, title: '二、let' },
        { id: 3, title: '三、const' },
        { id: 4, title: '四、總結' },
        { id: 5, title: '五、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="54" fileType="learnList" />
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
        <p>以前學 JavaScript 的第一堂課，一定會學到變數是由關鍵字 <em>var</em> 來作宣告，然後再將變數運用到之後的函式之中。但自 ES2015 版本（也可以泛稱 <b>ES6</b>）問世開始，變數宣告方式除了原本的 <em>var</em>，還新增了 <em>const</em> 與 <em>let</em> 這兩種方式。當然，JavaScript 不可能平白無故白白增加兩個性質功能一樣的東西把工程師搞矇，本篇主要來談談為什麼 <b>ES6</b> 要特地新增兩個變數宣告方式，它們與過往長年我們所使用的 <em>var</em> 有什麼差異。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>在 <b>ES6</b> 釋出之前，JavaScript 宣告變數有兩種方式，一種是無關鍵字宣告賦值，另一種則是透過關鍵字 <em>var</em> 來作宣告。無關鍵字宣告變數的方式舉例如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">x = 1;
console.log(x);    // 1</code></pre>
        </div>
        <p>通常我們很少直接或看到這樣定義變數，一般都是用 <em>var</em> 來作宣告，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y = 3;
console.log(y);    // 3</code></pre>
        </div>
        <p><br></p>
        <h3>var 作用域範圍：</h3>
        <p>所有宣告的變數是有其作用範圍的，以上面兩個變數例子來說，<em>x</em> 與 <em>y</em> 都屬於全域（Global）變數，可以在任何地方、層級、區塊存取它們：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y = 3;
function demo() {
    console.log(y);    // 3
}
console.log(y);    // 3</code></pre>
        </div>
        <blockquote>
            <p>範例中我省去了函式宣告後還要呼叫才會執行的敘述句，目的是將程式碼精簡濃縮以方便閱讀，後續範例也將如法炮製。</p>
        </blockquote>
        <p>但如果我們是在函式裡面宣告變數，該變數就只能存在於函式作用域（function scope）範圍之內，如果在函式作用域外去調用它將沒有作用，會得到 <b>not defined</b> 的反饋結果。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo() {
    var y = 3;
    console.log(y);    // 3
}
console.log(y);    // y is not defined</code></pre>
        </div>
        <p><br></p>
        <p><em>var</em> 比較為人詬病的是在某些區塊語句，像是條件式（<em>if...else</em>）、迴圈（<em>for</em>）...等，若是使用 <em>var</em> 來宣告變數，有可能會「汙染」到全域變數。我們來看以下這個例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var x = 100;
for(var x = 0; x &lt;= 3; x++){
    console.log(x);    // 0、1、2、3
}
console.log(x);    // 4</code></pre>
        </div>
        <p><em>for</em> 迴圈中的變數 <em>x</em> 跑完之後的新值，取代掉原本全域變數 <em>x</em> 的值（100）。</p>
        <p>再看一例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var x = "apple";
var y = 4;
if (y > 3) {
    var x = "pen";
    console.log(x);    // "pen"
}
console.log(x);    // "pen"</code></pre>
        </div>
        <p>由於條件式中 <em>y > 3</em> 條件成立（<em>true</em>），因此 <em>x</em> 將重新賦值為 pen。</p>
        <p>單就這兩個範例迴圈與條件式裡的運作而言，當下對寫的人也許感受不出潛在問題，可因為新的 <em>x</em> 值已取代掉原本全域變數宣告的值，假如在其他地方已有使用到這個全域變數 <em>x</em>，那麼將有可能導致整個程式發生預期之外的問題，這種情況稱為「全域作用域污染」（Global Scope Pollution）。當然，追根究柢，也不能完全怪罪工程師不良寫作習慣而埋下的禍根，早期 JavaScript 確實對 <em>var</em> 宣告處理不夠嚴謹，因此 <b>ES6</b> 開始才會新增其他變數宣告關鍵字，其中一個目的就是要解決變數污染的情況。</p>
        <p><br></p>
        <h3>變數提升：</h3>
        <p>如果調用變數的敘述句或函式在該變數宣告之前就被執行，以 <em>var</em> 關鍵字宣告的變數將會被提升至函式的上方，並以 <em>undefined</em> 值作為該變數的型別，這個過程稱為「變數提升」（Hosting）。以下我們從範例中循序漸進地來理解原由。</p>
        <p>首先，假如我們直接在程式中使用從沒宣告過的變數，JavaScript 編譯反吐的結果會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(y);    // y is not defined</code></pre>
        </div>
        <p>但如果有宣告不過是在執行的程式後方，則會得到 <em>undefined</em> 的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(y);    // undefined
var y = 3;</code></pre>
        </div>
        <p>為什麼呢？承襲上面這段程式碼，經 JavaScript 解析後會解釋成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y;
console.log(y);    // undefined
y = 3;</code></pre>
        </div>
        <p>這樣就能明白為什麼 <b>console</b> 回傳的結果會是 <em>undefined</em> 了吧！因為變數提升後，程式碼編譯階段就會優先將 <em>var</em> 宣告的變數存放進記憶體，可是這也僅僅表示記憶體存在該變數的空間，並未包含初始化。我們可以參考 <a href="https://developer.mozilla.org/zh-TW/docs/Glossary/Hoisting" target="_blank">MDN</a> 是怎樣解釋的：</p>
        <blockquote>
            <p>在執行任何程式碼前，JavaScript 會把函式宣告放進記憶體裡面，這樣做的優點是：可以在程式碼宣告該函式之前使用它。</p>
        </blockquote>
        <blockquote>
            <p>JavaScript 僅提升宣告的部分，而不是初始化。如果在使用該變數後才宣告和初始化，那麼該值將是 undefined。</p>
        </blockquote>
        <p><br></p>
        <h3>重複宣告：</h3>
        <p><em>var</em> 允許重複宣告相同名稱的變數，較後宣告的值將會取代前面的變數值。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y = 3;
var y = 100;
var y = "hello!";

console.log(y);    // "hello!"</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>作用域（Scope）指的是一個變數的生存範圍，在 <b>ES6</b> 版本之前，變數的作用域指的是 <em>function</em>，在 <em>function</em> 外宣告的則叫作「全域變數」（Global Variable）；在 <em>function</em> 內宣告的變數稱為「區域變數」（Local Variable）。</p>
        <p><em>function</em> 內的作用域稱為「函式作用域」（Function Scope），但 <b>ES6</b> 則新增一種名為「區塊」（Block）的概念，是為「區塊作用域」（Block Scope），它主要用來解決函式作用域可能導致的汙染問題（詳情可見前一章 <em>var</em> 的全域作用域污染說明），配合 <em>let</em> 與 <em>const</em> 變數宣告方式，限制並避免區塊內的變數汙染到全域範圍。</p>
        <p>區塊作用域指的是由大括號 <em>{ }</em> 界定的程式碼區塊，在大括號囊括範圍裡的程式碼都屬於區塊作用域一部份，像是 <em>if</em>、<em>for</em>、<em>while</em> ...等，當然，也包含 <em>function</em>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if(){
    // Block Scope
}

for(){
    // Block Scope
}

function(){
    // Block Scope
}</code></pre>
        </div>
        <p><br></p>
        <h3>let 作用域範圍：</h3>
        <p>如果我們在全域環境下用 <em>let</em> 宣告變數，它看起來與用 <em>var</em> 宣告無異，感覺就像一般常見的全域變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let y = 3;
console.log(y);    // 3</code></pre>
        </div>
        <p>然而，實際上不管 <em>let</em> 在哪裡宣告，它的變數都不會被存入到記憶體中，反過來 <em>var</em> 則會。我們可用 <em>window</em> 去查找它以得到證明：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var x = 1;
let y = 3;
console.log(window.x);    // 1
console.log(window.y);    // undefined</code></pre>
        </div>
        <blockquote>
            <p>雖說不會被存放在記憶體，但是我們仍可以用它宣告的值進行操作。</p>
        </blockquote>
        <p>如果是在區塊作用域裡宣告的變數，離開作用域範圍的敘述句將無法取得該變數的存在，這點也和 <em>var</em> 相似。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo() {
    let y = 3;
    console.log(y);    // 3
}
console.log(y);    // y is not defined</code></pre>
        </div>
        <p><br></p>
        <p>然而，像在 <em>if</em> 這類條件式敘述句程式裡，假設條件式成立，裡頭的變數若由 <em>var</em> 宣告，會因變數提升的影響而可以被外部其他敘述句給取得，比方來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y = 4;
if (y > 3) {
    var x = "apple";
    console.log(x);    // "apple"
}
console.log(x);    // "apple"</code></pre>
        </div>
        <p>這樣可能會衍生什麼麻煩應該不難想像，不過如果同樣例子，我們改由 <em>let</em> 作宣告的話，因變數只會存在區塊作用域中的規則，外部的敘述句將無法取得該變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let y = 4;
if (y > 3) {
    let x = "apple";
    console.log(x);    // "apple"
}
console.log(x);    // x is not defined</code></pre>
        </div>
        <p>如此一來，<em>let</em> 就能解決以往只有 <em>var</em> 關鍵字宣告變數時，可能發生的全域作用域汙染的問題。回想一下我們在 <em>var</em> 章節舉的條件式汙染範例，現在改由 <em>let</em> 作宣告的話，其結果將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let x = "apple";
let y = 4;
if (y > 3) {
    let x = "pen";
    console.log(x);    // "pen"
}
console.log(x);    // "apple"</code></pre>
        </div>
        <p>即便符合條件，條件式區塊作用域裡的 <em>x</em> 變數值也不會覆蓋掉全域宣告的 <em>x</em> 值。</p>
        <p><br></p>
        <h3>變數提升：</h3>
        <p>對 <em>var</em> 而言，即便變數在宣告之前就先被程式敘述句搶先一步拿去用，卻因為 JavaScript 變數提升的機制，<em>var</em> 關鍵字會先往上推到頂部，儘管會先得到 <em>undefined</em> 的值，但程式基本上還是能取得該變數。然而，<b>ES6</b> 為了讓 JavaScript 能更加嚴謹，<em>let</em> 以及 <em>const</em> 就不再允許變數在宣告之前先被調用。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(y);    // Cannot access 'y' before initialization
let y = 3;</code></pre>
        </div>
        <p>回傳的錯誤訊息意思是說 JavaScript 不允許變數 <em>y</em> 在初始化之前被使用。</p>
        <blockquote>
            <p>let bindings are created at the top of the (block) scope containing the declaration, commonly referred to as "hoisting". Unlike variables declared with var, which will start with the value undefined, let variables are not initialized until their definition is evaluated. Accessing the variable before the initialization results in a ReferenceError. The variable is in a "temporal dead zone" from the start of the block until the initialization is processed.</p>
        </blockquote>
        <p>根據 MDN 英文版原文的解釋，由 <em>let</em> 宣告的變數直到編譯器執行到它之前才會初始化，所以如果在那之前索取該變數的話就會導致「ReferenceError」（參考錯誤）。原文雖然只有提到 <em>let</em>，事實上 <em>const</em> 亦同。</p>
        <p><br></p>
        <h3>重複宣告：</h3>
        <p><em>let</em> 不允許在同一層區塊作用域裡重複宣告相同的變數，即便在全域作宣告也不行。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let y = 3;
let y = 100;

console.log(y);    // Identifier 'y' has already been declared</code></pre>
        </div>
        <p>編譯時將會回傳變數 <em>y</em> 已經被宣告的錯誤訊息。要注意的是，就算和 <em>var</em> 混用，宣告相同的變數同樣不被允許，系統依舊會報錯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var y = 3;
let y = 100;

console.log(y);    // Identifier 'y' has already been declared</code></pre>
        </div>
        <p>但如果是在不同的作用域宣告相同的變數，則不會出現錯誤：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let x = "apple";
let y = 4;
if (y > 3) {
    let x = "pen";
    console.log(x);    // "pen"
}
console.log(x);    // "apple"</code></pre>
        </div>
        <p>這是因為 <em>let</em> 在區塊中宣告的變數就只會存在於該區塊作用域裡面而已，所以不會與全域或其他區塊作用域的相同變數發生衝突，看起來名字一樣，在解析上卻是兩者不相干的變數。因此，<b>ES6</b> 發佈後，許多人提倡要養成用 <em>let</em> 取代 <em>var</em> 的習慣，我們不必擔心變數汙染作用域的問題，也不必花費太多心思在變數命名上，甚至偷懶一點在每個區塊作用域裡使用相同名稱的變數，也不會產生「程式」上的問題（其他方面的問題就另當別論）。</p>
        <p>最後再額外補充一點，雖說 <em>let</em> 不能於同一作用域重複宣告，但是可以在其範圍內修改它的值。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let y = 3;
y = 5;
console.log(y);    // 5</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p><em>const</em> 可視為規矩更嚴謹的 <em>let</em>，首先，<em>const</em> 宣告時就必須給予「常數」（Constant），否則編譯時就會直接報錯。我們先看透過 <em>let</em> 宣告變數卻不給值的情況下，程式敘述句去存取變數的話會得到啥結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let x;
console.log(x);    // undefined</code></pre>
        </div>
        <p>但如果我們用改成 <em>const</em> 宣告，一樣沒先賦予值的話，回傳結果將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const x;
console.log(x);    // Missing initializer in const declaration</code></pre>
        </div>
        <blockquote class="is-warning">
            <p><em>const</em> 宣告中缺少初始化程序。</p>
        </blockquote>
        <p>由此可見，<em>const</em> 在宣告的同時，就必須賦予常數值給它，所謂的常數，可以是任何合法的運算子，諸如算術、字串，或者函式陳述式...等類。光是這樣還不夠（嚴謹），一旦 <em>const</em> 的值被宣告，<em>const</em> 會對於它的值建立一個唯獨的參考，假如我們嘗試再給值去修改該變數，將會得到系統回傳的報錯警告。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const x = 3;
x = 5;
console.log(x);    // Uncaught TypeError: Assignment to constant variable.</code></pre>
        </div>
        <p>並不是說透過 <em>const</em> 關鍵字宣告的值不可變更，而是該變數不能再一次指定值（註一）。假如變數的常數值是個物件（Object），那麼該物件的內容還是可以被修改的。我們可以透過以下兩個例子來加深理解，第一個例子是當 <em>const</em> 宣告的常數是陣列的時候：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const arr = [1, 2, 3];
console.log(arr);    // [1,2,3]

arr.push(4, 5);
console.log(arr);    // [1,2,3,4,5]</code></pre>
        </div>
        <p>第二個例子則是物件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const obj = {
    name: "John"
};
console.log(obj);    // {"name": "John"}

obj.years = 33;
console.log(obj);    // {"name": "John", "years": 33}</code></pre>
        </div>
        <blockquote>
            <p>註一：和變數宣告時在記憶體中佔據一個位置有關，這部份將會牽扯到 by reference 與 by value 之間的議題，暫且留到未來再另行填坑補完。</p>
        </blockquote>
        <p><br></p>
        <h3>作用域範圍：</h3>
        <h3>變數提升：</h3>
        <h3>重複宣告：</h3>
        <p>不是我要虎頭蛇尾，基本上 <em>let</em> 的特性與限制於 <em>const</em> 身上通通都有，但 <em>const</em> 比 <em>let</em> 又多了必須先給值，以及常數保護這些更加嚴謹的特性。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>最後，我們將無宣告變數與 <em>var</em>、<em>let</em>、<em>cont</em> 以各自章節細分的主題──「作用域範圍」、「變數提升」、「重複宣告」，彙整成表格來作整體比較。</p>
        <p><br></p>
        <h3>作用域範圍：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">範圍</div>
                    <div class="f-f3">補充</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1">全域（Global）</div>
                    <div class="f-f3">從裡到外搜尋變數，如果沒有找到則視為建立全域變數</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1">函式（Function）</div>
                    <div class="f-f3"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1">區塊（Block）</div>
                    <div class="f-f3"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1">區塊（Block）</div>
                    <div class="f-f3"></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>變數提升：</h3>
        <p>在變數宣告前就被程式敘述句調用的狀況下，編譯將會回傳什麼結果？</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1"><b>Uncaught ReferenceError: x is not defined.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1"><em>undefined</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1"><b>Uncaught ReferenceError: Cannot access 'x' before initialization.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught ReferenceError: Cannot access 'x' before initialization.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>重複宣告：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1">最後宣告的值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1">最後宣告的值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1"><b>Uncaught SyntaxError: Identifier 'x' has already been declared.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught SyntaxError: Identifier 'x' has already been declared.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>宣告不給值：</h3>
        <p>當我們只先單純宣告一個變數 x，卻不給它值然後讓程式去調用，編譯將會發生什麼結果。</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1"><b>Uncaught ReferenceError: x is not defined.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1"><em>undefined</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1"><em>undefined</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught SyntaxError: Missing initializer in const declaration.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>修改宣告的值：</h3>
        <p>和重複宣告不同的是本項並非是從已宣告的變數之後再次宣告相同的變數，而是在其後另外給值以修改原本宣告的值，這些宣告關鍵字分別回傳的結果是：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1">最新修改的值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1">最新修改的值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1">最新修改的值</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught TypeError: Assignment to constant variable.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>至於什麼環境下適合用哪一種變數宣告關鍵字，以下是一些一般性的建議：</p>
        <h3>var：</h3>
        <ul>
            <li>在 ES6 之前，<em>var</em> 是唯一的變數聲明方式，但它有一些缺點，如變數提升和函數作用域。</li>
            <li>除非需要支援舊的 JavaScript 環境，否則最好避免使用 <em>var</em>。</li>
        </ul>
        <p><br></p>
        <h3>let：</h3>
        <ul>
            <li>相較於 <em>var</em>，<em>let</em> 是一個更現代化和安全的選擇。</li>
            <li><em>let</em> 僅在其聲明的範圍內有效，這有助於減少意外的變數污染和作用域問題。</li>
            <li>使用 <em>let</em> 會將變數的作用域限制在其聲明的區塊中，因此更容易理解和維護程式碼。</li>
        </ul>
        <p><br></p>
        <h3>const：</h3>
        <ul>
            <li>如果變數的值不會被重新賦值，則應該使用 <em>const</em>。</li>
            <li><em>const</em> 有助於提高程式碼的可讀性，因為它表明該變數是不可變的。</li>
            <li>使用 <em>const</em> 可以減少錯誤，因為它防止了對不應該更改的變數進行意外的重新賦值。</li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://nicolakacha.coderbridge.io/2020/09/29/javascript-scope-hoisting/" target="_blank">JavaScript: Scope & Hoisting</a></dd>
            <dd><a href="https://tw.alphacamp.co/blog/javascript-var-let-const" target="_blank">JS var 變數的秘密：一文看懂 var、let、const 無宣告變數細節</a></dd>
            <dd><a href="https://codinggirl.timelog.to/a174653905" target="_blank">[JS學徒特訓班] JavaScript ES6 : var, let, const 差異</a></dd>
            <dd><a href="https://book.vue.tw/appendix/es6.html" target="_blank">給進入 Vue.js 前的 ES6 必備知識</a></dd>
            <dd><a href="https://luffy.website/2019/08/09/weird-JavaScript-08/" target="_blank">Weird-JavaScript 08：作用域、let 與區塊作用域</a></dd>
            <dd><a href="https://github.com/aszx87410/blog/issues/34" target="_blank">我知道你懂 hoisting，可是你了解到多深？</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>