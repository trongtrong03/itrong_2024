<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="57" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、變數提升</a></li>
            <li><a href="#act2">二、函式提升</a></li>
            <li><a href="#act3">三、變數與函式提升的練習</a></li>
            <li><a href="#act4">四、Hoisting 的原理</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>根據 <a href="https://developer.mozilla.org/zh-TW/docs/Glossary/Hoisting" target="_blank">mdn web docs</a> 的敘述，Hoisting 這個專有名詞在 JavaScript 裡是找不到的，至少在目前 ECMAScript® 2015（即 ES6）版本裡還沒有這個名詞的專欄介紹。中文通常翻譯為「提升」的 Hoisting，其實是釐清 JaveScript 在執行階段時，如何運行程式腳本的思路，屬於一種行為概念衍生的名詞。Hoisting 概念主要牽涉變數及函式宣告在程式腳本執行過程中被「提升」到其作用域頂部的現象，依據變數、函式在不同作用域或上下文作宣告，對程式執行可能會產生不同的影響，這個特性是 JavaScript 特有的，和其他程式語言不同，故對很多初入門的開發者來說很容易混淆，因此搞懂 Hoisting 的概念遂成為學習 JavaScript 很重要的課題之一。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、變數提升</h2>
        <p>如果我們試圖去向一個沒有被宣告的變數取值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(dog);    // Uncaught ReferenceError: dog is not defined </code></pre>
        </div>
        <p>你將發現我們會得到 <b>Uncaught ReferenceError: dog is not defined</b> 的錯誤結果，這個意思是在說「dog」這個變數尚未被定義，所以 JavaScript 無法取得這個變數。有趣的是如果我們現在將程式碼寫成這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(dog);    // undefined
var dog;</code></pre>
        </div>
        <p>依我們對程式語言的認知，程式執行的時候正常都是由上而下一行一行去執行的，第一個程式範例的寫法因為沒有先宣告而噴錯這很好理解，可是第二個範例中明明也是先取用變數，只是後續才補給該變數的宣告，如果按照由上而下的順序，不是應該也是要噴錯嗎，怎麼得到的結果會是「undefined」型別？</p>
        <p>這種現象就叫做 Hoisting，下方的變數因為某種原因被「提升」到了最上面，所以我們可以想像 JavaScript 在執行第二個範例時將程式改動成這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
console.log(dog);    // undefined</code></pre>
        </div>
        <p>之所以說是想像，是因為實際上原本的程式碼順序並沒有被作改動，Hoisting 是 JavaScript 在進行編譯的時候對變數、函式宣告的一種「預處理」行為，屬於其內部機制之一，用來確保作用域內的變數及函式能在它們被宣告前可使用，所以在程式腳本在真正執行前，JavaScript 就先內過內部機制進行了預處理，將變數、函式提升到最上面。</p>
        <p><em>undefined</em> 這個資料型用來表示那些還沒給值、尚未初始化，以及調用不存在該屬性的變數。在第二個範例我們僅宣告變數「dog」，還沒有賦值給它，所以 Console 它才會回傳 <em>undefined</em> 的結果──其實這麼解釋並不完全正確，假如我們現在再將範例改寫成宣告變數並同時賦值給它，經過 JavaScript 預處理 Hoisting 後觀察程式碼執行會發生什麼事：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(dog);    // undefined
var dog = "阿比";</code></pre>
        </div>
        <p>會發現得到的回傳結果仍然是 <em>undefined</em>，由此可得知，JavaScript 提升的只有變數的宣告，賦值不會跟著一人得道雞犬升天，我們可以嘗試理解成 JavaScript 在預處理的時候將程式碼這樣處理：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
console.log(dog);    // undefined
dog = "阿比";</code></pre>
        </div>
        <p>再稍微深入一點，若我們再將範例程式碼變寫為以下敘述：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
console.log(dog);
var dog = "阿比";
console.log(dog);</code></pre>
        </div>
        <p>試想看看前後 <em>console.log(dog)</em> 回傳結果是什麼？答案是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
console.log(dog);    // undefined
var dog = "阿比";
console.log(dog);    // 阿比</code></pre>
        </div>
        <p>我們可以拆解成以下會更容易理解：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
var dog;
console.log(dog);    // undefined
dog = "阿比";
console.log(dog);    // 阿比</code></pre>
        </div>
        <p><br></p>
        <p>因為 JavaScript Hoisting 的特性，我們對 <em>var</em> 這個宣告關鍵字產生「可以先使用後宣告」、「可以重複宣告」等認知，不過 JavaScript 在 ES6 版本推出後多了 <em>let</em> 和 <em>const</em> 這兩個宣告變數的用法，我們都知道這兩個關鍵字出現的主要目的是希望開發者能更嚴謹、更正確地宣告變數，而這是否會與 Hoisting 之間產生影響？是不是使用它們就不存在 Hoisting 了？</p>
        <p>我們直接透過範例來看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(dog);
let dog = "阿比";    // Uncaught ReferenceError: Cannot access 'dog' before initialization</code></pre>
        </div>
        <p>還記得章節一開始在沒有宣告變數的情況下就去呼叫該變數，瀏覽器會回傳 <b>Uncaught ReferenceError: dog is not defined</b> 這樣的錯誤訊息嗎？今天如果我們透過 <em>let</em> 宣告變數，得到的結果卻是 <em>Uncaught ReferenceError: Cannot access 'dog' before initialization</em>，這就意味著 <em>let</em> 確實還是有被 Hoisting 的，該錯誤訊息意思是我們「不能在變數（dog）被初始化之前嘗試訪問它」，具體來說就是當我們使用 <em>let</em>（<em>const</em> 亦然）宣告變數時，該變數會在 JavaScript 預處理階段被建立，但不會被初始化，至於賦值的部份和 <em>var</em> 相同，不管有沒有給值都不會被提升。</p>
        <p>然後如果我們在宣告之前就先訪問該變數，將會觸發 JavaScript Temporal Dead Zone（TDZ，暫時性死區）機制，當開發者使用 <em>let</em> 及 <em>const</em> 宣告變數及常數，但還沒有賦值給它們之前，會產生一段它們不能被調用的狀況，這段空窗時間就是暫時性死區。暫時性死區確保我們使用 <em>let</em>、<em>const</em> 必須先進行宣告，以避免像 <em>var</em> 那樣還沒被宣告就可以拿來使用，導致潛藏一些錯誤問題。只有在變數宣告的敘述句真正被執行的時候，變數才會被初始化，此時 JavaScript 才會安全地訪問它。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、函式提升</h2>
        <p>除了變數之外，函式也有 Hoisting 概念，函式有 Hoisting 的好處是我們可以在定義好函式之前就先呼叫它。一般正常情況下，我們會這樣定義與呼叫函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    var dog = "阿比";
    console.log(dog);
}

Animal();    // 阿比</code></pre>
        </div>
        <p>但是因為 Hoisting 的關係，變數、函式的宣告都會在 JavaScript 預處理的時候提升到最頂端，因此有時候自己在寫或看到別人將函式呼叫放在定義之前，像這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal();    // 阿比

function Animal(){
    var dog = "阿比";
    console.log(dog);
}</code></pre>
        </div>
        <p>會發現程式這樣寫也能正常執行，這便是受惠於 Hoisting 的影響，不止如此，Hoisting 的機制也能允許不同函式彼此互相呼叫，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal();    // 我養了一隻狗
function Animal() {
    console.log("我養了一隻狗");
    dog();    // 阿比
}

function dog() {
    console.log("阿比");
}</code></pre>
        </div>
        <p>經過編譯後會分別得到「我養了一隻狗」、「阿比」的回傳結果。原理很簡單，雖然乍看之下 <em>Animal()</em> 函式在宣告後就立即調用了尚未被宣告的 <em>dog()</em> 函式，不過由於 Hoisting 的機制，函式調用都會提升到最頂部，所以我們可以視同這串程式碼等同以下程式碼結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal();    // 我養了一隻狗
dog();    // 阿比

function Animal() {
    console.log("我養了一隻狗");
}

function dog() {
    console.log("阿比");
}</code></pre>
        </div>
        <p>還是要重申那句話，儘管可以視同上面的程式碼，但是我們原本寫的程式實際上並沒有做更動。</p>
        <p><br></p>
        <p>再來就是傳入參數的狀況，若今天設定的函式有參數傳入時，該參數是否也會被 Hoisting？以下透過程式範例實際測試看看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal("阿比");

function Animal(dog) {
    var dog;
    console.log(dog);    // 阿比
    var dog = "咪咪";
}</code></pre>
        </div>
        <p>由此可知參數也同樣得到提升，我們可以將其視為等同以下結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal("阿比");

function Animal(dog) {
    var dog = "阿比";    // &lt;--傳入的參數
    var dog;
    console.log(dog);    // 阿比
    var dog = "咪咪";
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、變數與函式提升的練習</h2>
        <p>中場小結一下函式、參數與變數之間的 Hoisting 順序，其依序為「函式宣告」、「傳入函式的參數」，最後才是「變數宣告」。知道優先順序後，我們需要透過練習來驗證是否真的有搞懂 JavaScript Hoisting 的機制運作，試著回答以下程式碼片段中各個 Console 所要打印回傳的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";
function Animal(){
    console.log("Q1.", dog);
    var dog = "汪汪";
    console.log("Q2.", dog);
    pet1();
    console.log("Q4.", dog);
    pet2(cat);
    function pet1() {
        console.log("Q3.", dog);
        dog = "阿財";
        cat = "咪咪";
    }
    function pet2(cat) {
        console.log("Q5.", cat);
        cat = "花花";
        console.log("Q6.", cat);
    }
}
Animal();
console.log("Q7.", dog);
console.log("Q8.", cat);
</code></pre>
        </div>
        <p>答案：</p>
        <ol>
            <li>undefined</li>
            <li>汪汪</li>
            <li>汪汪</li>
            <li>阿財</li>
            <li>咪咪</li>
            <li>花花</li>
            <li>阿比</li>
            <li>咪咪</li>
        </ol>
        <p><br></p>
        <h3>Q1：undefined</h3>
        <p>謹記函式宣告會優先於變數宣告的順序，在「dog」變數宣告為「阿比」之前，函式「Animal()」已提升到最頂部開始執行，此時函式內部的「dog」變數也會提升到其函式內部頂端（仍在函式作用域內），不過因為賦值不會跟著提升，因此本問題最後得到的回傳結果為 <em>undefined</em>。</p>
        <p>綜觀上述，我們可以將第一個問題的程式碼視為以下結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal();
var dog;
dog = "阿比";
function Animal(){
    var dog;
    console.log("Q1.", dog);    // undefined
    dog = "汪汪";
}</code></pre>
        </div>
        <p>看到這裡或許心中會產生疑問，為什麼前面在介紹函式互相調用時，函式內部調用的函式經過提升也會推到全局作用域的頂端，但是在這個練習裡，函式內部宣告的變數卻只有提升到其所屬函式的頂端，這是為什麼？變數和函式提升的範圍不一樣嗎？</p>
        <p>其實這與 JavaScript 的設計原則有關，變數宣告只會提升到該變數所處作用域的頂部，這是因為 JavaScript 遵循「變數封閉」的原則，即變數應該要在最接近它們的作用域中被宣告，這意味著在函式局部作用域範圍內，所宣告的變數將限制在其函式範圍內，避免與全局作用域的變數互相衝突。</p>
        <p>雖然函式提升的範圍同樣也是以其在全局還是局部作用域內，而提升至該範圍頂部，不過因為 JavaScript 向來鼓勵函式的重複可用性，因此函式通常會在全局作用域中做宣告，以方便開發者在任何地方都能調用該函式。</p>
        <p><br></p>
        <h3>Q2：汪汪</h3>
        <p>因為第二個問題敘述句執行之前，其所在「Animal()」函式作用域內已經宣告變數「dog」的值為「汪汪」，故回傳的結果為「汪汪」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal();
var dog;
function Animal(){
    var dog;
    console.log("Q1.", dog);    // undefined
    dog = "汪汪";
    console.log("Q2.", dog);    // 汪汪
}
dog = "阿比";</code></pre>
        </div>
        <p><br></p>
        <h3>Q3：汪汪</h3>
        <p>因為「pet1()」函式內的「dog」並沒有經過宣告，屬於無宣告變數，因此會向外層繼續尋找，然後在「Animal()」中找到了已經宣告的「dog」，而此時「dog」變數的值為「汪汪」。原本問題中的這段程式碼（已經過簡化只挑出與 Q3 有關的程式碼片段）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    var dog = "汪汪";
    pet1();
    function pet1() {
        console.log("Q3.", dog);
        dog = "阿財";
    }
}
Animal();
</code></pre>
        </div>
        <p>經過育處理後視同：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    pet1();
    var dog;
    dog = "汪汪";
    function pet1() {
        console.log("Q3.", dog);    // 汪汪
        dog = "阿財";
    }
}
Animal();</code></pre>
        </div>
        <p>因為「pet1()」執行的時候它的內部找不到「dog」這個變數宣告，往上繼續尋找則找到了外部有宣告的「dog」，而依照程式碼順序，在「pet1()」函式內部的定義執行前，變數「dog」已經賦予了「汪汪」的值，故函式執行後回傳的結果為「汪汪」。</p>
        <p><br></p>
        <h3>Q4：阿財</h3>
        <p>由於「pet1()」函式在這個問題的敘述句之前已經執行，其函式裡的「dog」賦值「阿財」取代了先前宣告的賦值「汪汪」，因此得到的回傳結果為「阿財」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";
function Animal(){
    var dog = "汪汪";
    pet1();
    console.log("Q4.", dog);    // 阿財
    function pet1() {
        dog = "阿財";
    }
}
Animal();</code></pre>
        </div>
        <p><br></p>
        <h3>Q5：咪咪</h3>
        <p>這個問題的解釋有點複雜，但如果要精簡來說，那就是「cat」變數在這個程式碼範例中，最終被視為全域變數，儘管整段程式碼裡都沒有宣告它這個變數。也正因為如此，所以 JavaScript 才會一直往上尋找是否有包含宣告「cat」變數的局部作用域或全局作用域，最終找到了全局作用域，雖然沒被宣告，但還是被 JavaScript 視為「cat」屬於全域變數。</p>
        <p>因此我們可以這樣想像「cat」變數宣告的程式碼片段會是這個樣子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var cat;
function Animal(){
    pet1();
    pet2(cat);
    function pet1() {
        cat = "咪咪";
    }
    function pet2(cat) {
        console.log("Q5.", cat);    // 咪咪
        cat = "花花";
    }
}
Animal();</code></pre>
        </div>
        <p>回到問題，因為「pet2(cat)」執行前先執行了「pet1()」函式，其內部將「cat」賦值為「咪咪」，而「cat」因為函式內的作用域都沒有宣告的關係而成為全域變數，「pet2(cat)」在執行第五個問題的敘述句時，向上遍歷找到了全域中的「cat」，故得到的回傳結果為「咪咪」。</p>
        <p><br></p>
        <h3>Q6：花花</h3>
        <p>和第四個問題的思路相似，在「pet2(cat)」執行的時候「cat」被重新賦值為「花花」，所以後面執行的第六個問題因而得到「花花」這個結果。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    pet1();
    pet2(cat);
    function pet1() {
        cat = "咪咪";
    }
    function pet2(cat) {
        cat = "花花";
        console.log("Q6.", cat);    // 花花
    }
}
Animal();</code></pre>
        </div>
        <p><br></p>
        <h3>Q7：阿比</h3>
        <p>這個問題呼叫的「dog」屬於全域變數，也就是開頭宣告的「dog」，因其賦值為「阿比」，故得到的結果為「阿比」。至於「Animal()」函式內的多項「dog」變數宣告與賦值，其作用域都局限在函式之中。在 JavaScript 中，局部變數會遮蔽全域變數，因此我們在函式內部調用局部變數時，它會先查找函式內的變數，而非直接取用全域宣告的同名變數。反過來說，如果我們在全局作用域呼叫已宣告的全域變數，自然而然優先得到的也就會是該變數所賦予的值了。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";
function Animal(){
    var dog = "汪汪";
    pet1();
    function pet1() {
        dog = "阿財";
    }
}
Animal();
console.log("Q7.", dog);    // 阿比</code></pre>
        </div>
        <p>雖然「pet1()」裡面的「dog」並沒有宣告為變數，但是它在往上尋找過程找到了「Animal()」函式內宣告的「dog」，所以「pet1」中的「阿財」取代的是「Animal()」函式裡的「汪汪」，可是這個值並不會向外輸出去取代「阿比」，此乃是受 JavaScript 變數遮蔽的機制影響，我們可以將全域宣告的「dog」及函式內部宣告的「dog」視為相互獨立的變數。</p>
        <p><br></p>
        <h3>Q8：咪咪</h3>
        <p>這個問題要和第七個問題擺在一起比較，第七個問題中的「dog」因為有在全局作用域下進行變數宣告，然而第八個問題中的「cat」並沒有在任何地方進行宣告，雖然因為 JavaScript 的機制最終被認定為全域變數。然而，在「pet1()」函式裡，「cat」被賦值為「咪咪」，由於該函式沒有宣告變數的關係，「咪咪」遂向上賦值成為全局作用域裡「cat」變數宣告的值。</p>
        <p>而在「pet2(cat)」函式中，我們傳入了「cat」參數，它將被當作局部變數，這個變數只在「pet2()」函式內使用，與全域的「cat」變數沒有關係，因此「pet2(cat)」函式傳入的參數不會影響全局變數的值。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    pet1();
    pet2(cat);
    function pet1() {
        cat = "咪咪";   // 這裡沒有使用 var 宣告
    }
    function pet2(cat) {
        cat = "花花";   // 這裡的 cat 是 pet2 函式的參數，所以屬於局部變數
    }
}
Animal();
console.log("Q8.", cat);    // 咪咪</code></pre>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、Hoisting 的原理</h2>
        <p>說到底，JavaScript Hoisting 機制存在意義主要還是想解決函式無法互相呼叫的問題，以下面程式碼為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function loop(n){
    if (n > 1) {
        logEvenOrOdd(--n)
    }
}

function logEvenOrOdd(n) {
    console.log(n, n % 2 ? 'Odd' : 'Even')
    loop(n)
}

loop(10);</code></pre>
        </div>
        <p>如果沒有 Hoisting 機制，幾可斷言這段程式無法順利執行，因為依照正常邏輯來說，程式不可能同時做到函式Ａ在函式Ｂ之上，而函式Ｂ也在函式Ａ頭上。當然這也不是 Hoisting 機制唯一要解決的問題，如果沒有 Hoisting，我們在寫 JavaScript 的時候必須要先宣告變數才可以使用該變數，而函式同樣也得先經過宣告才能呼叫它，雖說某方面來講養成先宣告再使用的習慣並無壞處，但有 Hoisting 機制存在則能讓我們更方便地撰寫程式碼。</p>
        <p>開頭曾說 Hoisting 這個詞並不是 JavaScript 官方文件釋出的專有名詞，不過我們其實可以從相關規範中找到有關 Hoisting 起源的蛛絲馬跡，在這裡先說結論：Hoisting 與 Execution Contexts 密切相關。</p>
        <p>Execution Contexts 是什麼？Execution Contexts 用中文解讀其涵義為「執行環境」，指的是 JavaScript 執行時，引擎將程式碼拆解成許多區塊，並將這些區塊一塊塊堆疊起來，運算完結果就移除當前的區塊，然後繼續運算下一部分的區塊。當我們進入一個函式時，JavaScript 就會產生一個 Execution Contexts，裡面存放著和該函式有關的一些資訊，例如變數物件（Variable Object）、範圍鏈（Scope Chain）...等，一旦生成 Execution Contexts，JavaScript 引擎會將其放到 stack 裡面，等函式執行結束後，就會把 Execution Contexts 給拿出來。</p>
        <p>舉例來說，我們現在有個程式碼如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    dog();
}

function dog(){
    console.log("阿比");
}

Animal();</code></pre>
        </div>
        <p>我們開始執行函式時，整個執行環境的堆疊看起來會是這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">[main, Animal, dog]
</code></pre>
        </div>
        <p>當「dog()」函式執行完之後，執行環境就會變成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">[main, Animal]
</code></pre>
        </div>
        <p>等「Animal()」也執行完，最終就會只剩下主程式本身：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">[main]
</code></pre>
        </div>
        <p>若用圖解來看差不多是這個樣貌：</p>
        <figure>
            <img src="/images/learn/js/hoisting-1.jpg">
        </figure>
        <p>示意圖上面 Execution Context 們都可稱作是 Function Execution Context（函式執行環境），除了它們之外，還有一個 Global Execution Contexts（全域執行環境），上面範例中的「main」所指便是它。有關執行環境的詳細內容會再另外開一個坑去填補它，目前只要先知道個大概就好，在這裡提到 Execution Context 的目的主要是要我們知道所有函式需要的資訊都會儲存在個別的 Execution Context 之中。</p>
        <p>在來要開始說說和 Hoisting 的關聯，ES3 官方文件裡 Execution Context 章節有一段話敘述如下：</p>
        <blockquote>
            <p>Every execution context has associated with it a variable object. Variables and functions declared in the source text are added as properties of the variable object. For function code, parameters are added as properties of the variable object.</p>
        </blockquote>
        <p>其意思是在說明每一個執行環境都會有相對應的變數物件（Variable Object），在執行環境裡宣告的變數、函式都會被加進 Variable Object 裡面，如果加進去的函式包含參數，則參數也會被加入到 Variable Object 之中。</p>
        <p><strong>那麼，我們什麼時候會用到 Variable Object？</strong></p>
        <p>答案是在我們要存取值的時候，假如現在宣告一個變數 <em>var dog = "阿比"</em>，我們可以將其拆分成兩個部份：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;
dog = "阿比";</code></pre>
        </div>
        <ol>
            <li><em>var dog</em>：在 Variable Object 裡面新增一個名稱為 <em>dog</em> 的屬性，並初始化為 <em>undefined</em> 資料型別。</li>
            <li><em>dog = "阿比"</em>：搜尋 Variable Object 裡是否有符合 <em>dog</em> 名稱的屬性，如果有，賦值「阿比」的值給它。</li>
        </ol>
        <p>假如該 Variable Object 裡面找不到符合的名稱，它就會透過範圍鏈（Scope Chain）不斷往上層作用域鏈上的其他 Execution Contexts 尋找，直到 Global Execution Contexts，假設每一層都找不到則最終 JavaScript 會回報錯誤訊息，也就是 <b>Uncaught ReferenceError: dog is not defined.</b>。</p>
        <p><br></p>
        <p>再來是這段引用：</p>
        <blockquote>
            <p>For function code: for each formal parameter, as defined in the FormalParameterList, create a property of the variable object whose name is the Identifier and whose attributes are determined by the type of code. The values of the parameters are supplied by the caller as arguments to [[Call]].</p>
            <p><br></p>
            <p>If the caller supplies fewer parameter values than there are formal parameters, the extra formal parameters have value undefined.</p>
        </blockquote>
        <p>大意是說函式傳入的「參數」會直接存進 Variable Object 裡，倘若遇到部份參數沒有給值的情況，它們的值將會初始化為 <em>undefined</em>。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(dog, cat, rat) { ... }
Animal("阿比");</code></pre>
        </div>
        <p>其 Variable Object 就會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">{
    dog: "阿比",
    cat: undefined,
    rat: undefined
}</code></pre>
        </div>
        <p>如果是宣告的東西是函式，ES3 給出的規範是這樣：</p>
        <blockquote>
            <p>For each FunctionDeclaration in the code, in source text order, create a property of the variable object whose name is the Identifier in the FunctionDeclaration, whose value is the result returned by creating a Function object as described in 13, and whose attributes are determined by the type of code.</p>
            <p><br></p>
            <p>If the variable object already has a property with this name, replace its value and attributes. Semantically, this step must follow the creation of FormalParameterList properties.</p>
        </blockquote>
        <p>基本上也是在 Variable Object 裡面新增一個屬性來存放函式，而該屬性的值則是函式建立完後所回傳的結果。至於引述內容第二段則提到 Variable Object 內屬性同名的情況下，若 Variable Object 已存在相同命名的屬性，後者將會把前者覆蓋掉。我們承襲前面的例子做改寫，在「Animal()」函式內新增另一個函式，名稱則與「Animal()」傳入的參數名稱相同：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(dog) {
    function dog(){ ... }
}
Animal("阿比");</code></pre>
        </div>
        <p>存入的 Variable Object 將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">{
    dog: function dog
}</code></pre>
        </div>
        <p>以上是針對函式與函式參數進行說明，如果是變數宣告，Variable Object 又是怎麼處理呢？官方敘述如下：</p>
        <blockquote>
            <p>For each VariableDeclaration or VariableDeclarationNoIn in the code, create a property of the variable object whose name is the Identifier in the VariableDeclaration or VariableDeclarationNoIn, whose value is undefined and whose attributes are determined by the type of code. If there is already a property of the variable object with the name of a declared variable, the value of the property and its attributes are not changed.</p>
            <p><br></p>
            <p>Semantically, this step must follow the creation of the FormalParameterList and FunctionDeclaration properties. In particular, if a declared variable has the same name as a declared function or formal parameter, the variable declaration does not disturb the existing property.</p>
        </blockquote>
        <p>變數和函式傳入的參數差不多，在沒有明確給值的前提下，該變數會在 Variable Object 裡新增一個屬性，其屬性值預設為 <em>undefined</em>，可是「如果 Variable Object 已經存在該屬性名稱，屬性值不會被改變」。</p>
        <p>總結時間！當 JavaScript 開始執行一個 Execution Context 的時候，會依序執行以下三件行為：</p>
        <ol>
            <li>把參數存入 Variable Object 裡面並設定好值，傳什麼值進來就是什麼值，如果沒有值則給予 <em>undefined</em>。</li>
            <li>把函式宣告存入 Variable Object 裡，假如已存在相有同名稱的就覆蓋掉。</li>
            <li>把變數宣告存入 Variable Object 裡，如果已經有同名的則忽略。</li>
        </ol>
        <p>補充一點：進入 Execution Context 並非執行整個程式碼，這個階段比較像是開始執行函式，但還沒開始跑函式內部程式碼的這個階段，也就是前面文章時不時提到的「預處理」。所以，每個函式開始執行的時候可以視同分成兩個階段，第一個階段是進入 Execution Context，第二個階段才是一行一行執行函式裡面的程式碼。</p>
        <p>了解原理後，我們再看一個複合例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(dog) {
    console.log(dog);
    var dog = "咪咪";
}
Animal("阿比");</code></pre>
        </div>
        <p>經過 Execution Context 執行環境所儲存的 Variable Object 將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">{
    dog: "阿比"
}</code></pre>
        </div>
        <p>在進入 Execution Context 時開始建立 Variable Object，因為有傳入參數「dog」，所以把「dog」放進 Variable Object 並且賦予值為「阿比」，再來接著是函式內所宣告的變數「var dog = "咪咪"」，由於 Variable Object 已經存在「dog」這個屬性，根據原則，變數遇到同名的屬性名稱將會被忽略，因此 Variable Object 存取的「dog」值仍舊是「阿比」。</p>
        <p>函式內的程式敘述句會在 Variable Object 建立完後開始逐行執行，當執行到第二行「console.log(dog)」的那個時間點，Variable Object 裡「dog」存取的值乃是「阿比」，這就是為什麼 Console 回傳的結果會是「阿比」而非「咪咪」了。</p>
        <p>如果我們在函式內宣告「dog」變數的下一行再次 Console 該變數，這時得到的結果就會不一樣了：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(dog) {
    console.log(dog);    // 阿比
    var dog = "咪咪";
    console.log(dog);    // 咪咪
}
Animal("阿比");</code></pre>
        </div>
        <p>因為函式內第二行的變數「dog」執行後，Variable Object 裡面的「dog」屬性值就被「咪咪」取代了，因此回到程式執行階段，下方的 Console 回傳的是「咪咪」此一結果。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Glossary/Hoisting" target="_blank">mdn web docs 提升（Hoisting）</a></dd>
            <dd><a href="https://blog.techbridge.cc/2018/11/10/javascript-hoisting/" target="_blank">我知道你懂 hoisting，可是你了解到多深？</a></dd>
            <dd><a href="https://www.shubo.io/javascript-hoisting/#javascript-hoisting-%E6%8F%90%E5%8D%87" target="_blank">[教學] JavaScript Hoisting 是什麼？ let, const, var 的差異是什麼？</a></dd>
            <dd><a href="https://jianline.com/javascript-hoisting/#Temporal_dead_zone%E6%9A%AB%E6%99%82%E6%AD%BB%E5%8D%80%E8%88%87const%E3%80%81let" target="_blank">[筆記]-JavaScript 提升(Hoisting)是什麼?關於提升的5個觀念</a></dd>
            <dd><a href="https://suochantsao.medium.com/js%E7%AD%86%E8%A8%98%E7%B3%BB%E5%88%97-%E6%9A%AB%E6%99%82%E6%80%A7%E6%AD%BB%E5%8D%80-temporal-dead-zone-c7cad9b5cc1" target="_blank">JS筆記系列：暫時性死區 Temporal Dead Zone</a></dd>
            <dd><a href="https://shawnlin0201.github.io/JavaScript/JavaScript-Execution-Context/" target="_blank">JavaScript 深入淺出 Execution Content 執行環境</a></dd>
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