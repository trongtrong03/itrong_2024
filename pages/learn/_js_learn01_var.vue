<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="45" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、如何宣告變數？</a></li>
            <li><a href="#act2">二、作用域是什麼？</a></li>
            <li><a href="#act3">三、變數的資料型別</a></li>
            <li><a href="#act4">四、變數的命名規則</a></li>
            <li><a href="#act5">五、總結</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <blockquote>
            <p>JavaScript variables are containers for storing data values.</p>
        </blockquote>
        <p>這段引述取自 <a href="https://www.w3schools.com/js/js_variables.asp" target="_blank">w3schools</a> 對 JavaScript「變數」一詞的描述，如果要直翻這句話，意思為「JavaScript 變數是用來儲存資料參數值的容器。」什麼意思呢？透過舉例或許會比較容易理解：</p>
        <p>某天，阿比牽著一台油箱可容納 7 公升的摩托車去加油站加油，95 無鉛汽油的價格為每公升 20 元，在油箱一滴油都不剩的前提下，試問阿比此行要花多少加油錢？這是很簡單的數學運算，公式為「容升 x 每公升價格 = 總價格」，最終得出 140 元（7 x 20）的結果。然而，雖然摩托車的油箱容升是固定的，油價卻不可能永遠停在每公升 20 元，也許下週大降 0.1 元，下下週小漲 2 元...等，它是一種時不時發生改變的浮動數字，因此，我們就可以稱它是──或者說是使它成為一個變數。</p>
        <p>JavaScript 會透過定義變數的方式，快速取得每一次數值變動後的計算結果，最後更新到畫面元素裡（即 HTML 的元素標籤），對於掌管網頁動態資訊來往的 JavaScript 而言，基本上任何程式操作都很難脫離變數獨自去執行，因此，變數可說是 JavaScript 這門程式語言的重要核心之一，無時無刻都會看見也會使用到它。</p>
        <p>本篇文章學習 JavaScript 變數包含以下這些要點：</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、如何宣告變數？</h2>
        <p>使用變數之前，必須先發佈通知，這個動作包含建立變數，以及賦予變數名稱。此一過程我們稱之為「宣告（declare）」，在 JavaScript ES6 版本發布之前，一貫使用 <em>var</em> 這個詞（variables 的簡寫）來宣告變數。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var price;</code></pre>
        </div>
        <p>上面範例我們宣告了一個名為 <em>price</em> 的變數，但此時還沒有指定參數值給它，因此它的內容仍處於「undefined」的型別狀態（未定義）。假如我們指定一組數字給它，例如 <em>20</em>，那麼 <em>price</em> 的回傳值結果將為 <em>20</em>，給的方式很簡單，直接使用等號即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var price = 20;</code></pre>
        </div>
        <p>我們通常會稱這個行為叫做「給值」或「賦值」，值得注意的是，單一 <em>=</em> 符號在 JavaScript 並非「等於」的意思，而是表達「指定」的概念，故前面才會說將 <em>20</em> 「指定」給 <em>price</em>。</p>
        <p>以上就是 JavaScript 變數宣告的方式了，但是還記得第一段說道「在 JavaScript ES6 版本發布『之前』」嗎？是的，在 2015 年 ES6（ECMAScript 2015） 版本發佈的一系列內容裡，新增了另外兩種變數的宣告關鍵字──<em>let</em> 以及 <em>const</em>，它們宣告的方式與 <em>var</em> 一樣，差別在於宣告所使用的關鍵字，把 <em>var</em> 換成 <em>let</em> 或 <em>const</em> 而已。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let price = 20;</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const price = 20;</code></pre>
        </div>
        <p>既然會新增這些東西就表示事出必有原因，但由於這會牽涉到作用域的問題，現階段暫且不深入詳談，我們只要知道截至目前 JavaScript 最新版本為止，宣告變數所能使用的關鍵字一共有三個，分別是<em>var</em>、<em>let</em>、<em>const</em>。</p>
        <p><br></p>
        <p>有時候我們會看到一些人會這樣宣告變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;</code></pre>
        </div>
        <p>是的，就像本章節第一個程式碼範例，單純只宣告變數而沒有賦值；或是有些人沒有先宣告變數就直接賦值給它，例如 <em>dog = "阿比"</em>，這種直接給值不先做變數宣告的行為通常被稱為「隱式宣告」，在撇除作用域可能產生問題的前提下，這些變數宣告的方式或許還是能讓 JavaScript 存取這些變數，但它終究屬於開發者撰寫程式過程的一大陋習，除了可能造成團隊其它開發人員不易閱讀外，也存在「變數汙染」的風險，例如我們在函式內隱式宣告變數 <em>dog</em>，這個 <em>dog</em> 將會被視為全域變數，但假設全局作用域中早已有宣告 <em>dog</em> 相同的變數名稱，那麼函式內 <em>dog</em> 的值將會影響全域已宣告 <em>dog</em> 變數的值，這個現象便是「變數汙染」。</p>
        <p>不過即便不談變數汙染的問題，無論是在什麼作用域，首先我們也應當避免重複宣告相同名稱的變數。</p>
        <p>複習一下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;    // 不好的宣告</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">dog = "阿比";    // 不好的宣告</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";    // 好的宣告</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、作用域是什麼？</h2>
        <p>「作用域」一詞在程式語言原名叫做 Scope，指的是變數（或函式）的可見性與其訪問的範圍，作用域的概念存在於許多程式語言，而不同程式語言也各自具有不同的作用域規則與特點，例如 Python 的變數作用域取決於函式的定義範圍；Java 雖然和 Python 相似，但它的變數只能在代碼區塊內部宣告，通常不能在該區塊之外的地方訪問其內部宣告的變數。</p>
        <p>回到 JavaScript，我們來看看 MDN 對作用域的解釋是怎樣說的：</p>
        <blockquote>
            <p>The current context of execution. The context in which values and expressions are “visible” or can be referenced. If a variable or other expression is not “in the current scope,” then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.</p>
        </blockquote>
        <p>在 JavaScript 世界裡，當變數在「執行環境」（Execution Contexts，有關執行環境相關介紹留到本章節末段再說明）被宣告的那一刻起，它便開始存在了，只是它和它所綁定的值可以影響整個程式片段的範圍到哪裡？這個問題就是作用域所要討論的內容。而上面這段引述大概可以簡化成以下兩個重點：</p>
        <ol>
            <li>作用域指的是變數的有效範圍，離開有效範圍的變數無法被存取。</li>
            <li>外部作用域無法取得內部作用域的變數，但內層的變數可以取得外層的變數。</li>
        </ol>
        <p><br></p>
        <h3>有哪些作用域？</h3>
        <p>目前 JavaScript 作用域分為以下三個層級，分別是「全域作用域」（Global Scope）、「函式作用域」（Function Scope）、「區塊作用域」（Block Scope）。</p>
        <p><br></p>
        <h4>全域作用域（Global Scope）：</h4>
        <p>當 JavaScript 開始執行編譯前的最初階段，會產生一個 Global Execution Context，中文通譯為「全域執行環境」，而在全域執行環境中都會包含一個「全域變數物件」（Global Variable Object），用來存放所有在全域環境中宣告的變數（也包含函式），這些放在全域環境的變數，我們可以在程式任何地方去存取它，意即該變數的作用域就是「全域作用域」。</p>
        <p>如果要從程式碼片段裡分辨該變數是不是全域變數，最直接了當的方式就是看它是不是在函式或區塊內做宣告，像這樣直接宣告在 JavaScript 最外部沒有被任何程式符號包裹住的，基本上就是存活在全域作用域的變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";    // 全域變數

console.log(dog);    // 阿比

function Animal(){
    console.log(dog);    // 阿比
};
Animal();</code></pre>
        </div>
        <p>可以看到無論是在全域直接 Console 打印，還是在函式 <em>Animal()</em> 內呼叫 <em>dog</em> 這個變數，所得到的回傳結果都是「阿比」這個在宣告階段同時綁定的賦值。</p>
        <p><br></p>
        <h4>函式作用域（Function Scope）：</h4>
        <p>承襲全域作用域變數的說明，若今天變數是在函式內做宣告，其影響範圍就只會侷限在函式內，函式是什麼？函式指的就是由關鍵字 <em>function</em> 宣告並構成的一個程式碼架構，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 函式變數宣告
function Animal(){
    var dog = "阿比";
    console.log(dog);
};
Animal();    // 呼叫函式</code></pre>
        </div>
        <p>與變數同為 Javascript 構成的基本要素，有關函式的討論將會另外開篇幅撰文筆記，這裡就先不著墨太多內容，現階段我們只要先知道函式粗略形貌即可。而在函式內宣告的變數，其作用域只會存在於函式 <em>{ }</em> 範圍內，如果在外部全局作用域或其他函式內去調用那個變數，我們將會得到「ReferenceError」的錯誤警告。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 區域變數宣告
function Animal(){
    var dog = "阿比";
};

// 全域呼叫變數打印結果
console.log(dog);    // Uncaught ReferenceError: dog is not defined.</code></pre>
        </div>
        <p>所以，如果說全域作用域宣告的變數被稱為「全域變數」（Global Variable），那麼這種存在於函式內的變數，則稱為「區域變數」（Local Variable）。</p>
        <p><br></p>
        <p>在前一章節變數最末段曾提到幾種不好的宣告方式，現在我們已經了解全域作用域與函式作用域的差別，如果我們在函式內直接設定變數名稱並賦值，而不使用 <em>var</em> 關鍵字作宣告，這種寫法會對 JavaScript 執行產生什麼樣的後果？以下我們透過範例來作驗證，首先是全域、函式內都正常宣告變數的情況：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 全域變數宣告
var dog = "阿比";

// 區域變數宣告
function Animal(){
    var dog = "咪咪";
    console.log(dog);    // 咪咪
};
Animal();

// 全域呼叫變數打印結果
console.log(dog);    // 阿比</code></pre>
        </div>
        <p>先不講「盡量避免宣告重複名稱的變數」這件事，假設全域與函式內都宣告了相同名稱的變數，且也各自賦予不同的值，透過範例可以得知，函式內宣告的 <em>dog</em> 變數的值，不會影響到全域同名的 <em>dog</em> 變數，在全域作用域打印它依然是回傳「阿比」之結果，這就表示函式內宣告的變數，它的值只會存在它所屬的函式範圍內。</p>
        <p>假設現在我們把函式內的 <em>var</em> 關鍵字拿掉，看看會發生什麼事：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 全域變數宣告
var dog = "阿比";

// 區域變數宣告
function Animal(){
    dog = "咪咪";
    console.log(dog);    // 咪咪
};
Animal();

// 全域呼叫變數打印結果
console.log(dog);    // 咪咪</code></pre>
        </div>
        <p>會發現最後全域打印 <em>dog</em>時，函式內的 <em>dog</em> 變數值「咪咪」竟然取代了全域 <em>dog</em> 變數原先的值「阿比」，這就是先前說的「變數汙染」現象。至於為什麼會這樣？其實這和 JavaScript 的 Hoisting（提升）機制有關，關於 Hoisting 機制三言兩語很難解釋得清，不過簡單來說因為函式內沒有宣告 <em>dog</em> 這個變數，JavaScript 遂繼續向上層尋找，然後發現了全域作用域層級有個符合相同名稱的變數，故 JavaScript 不會將函式內的 <em>dog</em> 當作新的變數，而是直接「引用」全域變數 <em>dog</em>，致使函式內的賦值（咪咪）順理成章覆蓋了原先的賦值（阿比）。</p>
        <p><br></p>
        <h4>區塊作用域（Block Scope）：</h4>
        <p>區塊作用域的誕生是伴隨 ES6 新生的 <em>let</em> 與 <em>const</em> 這兩個變數宣告方式，它是一種範圍更小的作用域，只會存在於 <em>{ }</em> 範圍中，最常出現在函式作用域裡的 <em>{ }</em>，像是 <em>if</em> 或 <em>for</em> 之類的方法。</p>
        <p>舉例來說，用以往 <em>var</em> 在函式內的 <em>if</em> 語句進行變數宣告：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 區域變數宣告
function Animal() {
    if (true) {
        var dog = "阿比";
    }
    console.log(dog);   // 阿比
}

Animal();</code></pre>
        </div>
        <p>以往的 <em>var</em> 即便放在函式內宣告，經過 JavaScript Hoisting 提升機制也會成為全域變數，因此函式作用域內也可以正常調用，但如果將 <em>var</em> 抽換為 <em>let</em>（或 <em>const</em>）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 區域變數宣告
function Animal() {
    if (true) {
        let dog = "阿比";
    }
    console.log(dog);   // Uncaught ReferenceError: dog is not defined
}

Animal();</code></pre>
        </div>
        <p>透過範例可發現到在區塊作用域裡經由 <em>let</em> 或 <em>const</em> 宣告的變數，不管是變數還是其賦值都只能在該作用域範圍內進行存取，即使同屬在同一函式作用域範圍內的程式，也無法取得區塊作用域裡的變數，這就是它們與傳統 <em>var</em> 的不同點之一，即各自存活的作用域範圍不同。<em>let</em> 或 <em>const</em> 的出現令 JavaScript 的宣告變得更加嚴謹，減少變數提升造成的汙染可能。</p>
        <p>有些人或許會認為函式作用域和區塊作用域相似，認為它們都侷限在 <em>{ }</em> 範圍裡，確實，就某方面來說這兩個作用域有一些相似之處，但也存在一些差異。</p>
        <h5>相似處：</h5>
        <p>1. 變數的可見性：<br>無論是函式作用域還是區塊作用域，它們都用於限制變數的可見性，確保變數只在特定範圍內可見。</p>
        <p>2. 變數名稱衝突：<br>無論是函式作用域還是區塊作用域，它們都有助於減少變數名稱衝突的機會。在不同作用域範圍可以使用相同名稱的變數，而它們之間不會互相干擾。當然非刻意為之的情況下，盡量還是避免重複名稱的命名宣告比較穩妥。</p>
        <h5>差異處：</h5>
        <p>1. 作用範圍：<br>函式作用域限制變數的作用範圍僅在函式內部，而區塊作用域限制變數的作用範圍可以是在 <em>if</em> 語句、<em>for</em> 迴圈、<em>while</em> 迴圈等區塊中。</p>
        <p>2. ES6 的引入：<br>函式作用域是 ES6 版本之前的主要作用域概念，而區塊作用域則是 ES6 引入的新概念，主要是透過 <em>let</em> 與 <em>const</em> 關鍵字實現。</p>
        <p>3. 提升機制：<br>若在函式作用域內使用 <em>var</em> 關鍵字宣告變數，該變數會受到提升機制影響，提升成全域變數（但變數提升僅提升變數宣告的名稱本身，不包含賦值）；而區塊作用域中經由 <em>let</em>、<em>const</em> 宣告的變數雖然也會提升，但會受限於 JavaScript Temporal Dead Zone（TDZ，暫時性死區）機制，必須先經過宣告才能調用。</p>
        <p><br></p>
        <h3>var、let、const 作用域的差異？</h3>
        <p><em>let</em>、<em>const</em> 這兩者和 <em>var</em> 的差別透過前面內容的介紹大概都有個底了，那麼它們兩個之間具體又有什麼差異呢？其實這兩者無論在作用域範圍、變數提升，還是面對重複宣告情況下的表現都如出一轍，而最主要的差異在於 <em>const</em> 必須在宣告的同時就要賦值給它，這個值通稱為「常數」（Constant），否則編譯時就會直接報錯。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let dog;
console.log(dog);    // undefined</code></pre>
        </div>
        <p>如果 <em>let</em> 僅宣告變數名稱而沒有賦值，其實這個變數也依然是有被建立成功的，只是這種情況下去取用它的值將會是 <em>undefined</em>。但如果用相同程式邏輯改用 <em>const</em> 去做宣告，得到的回傳結果將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const dog;
console.log(dog);    // Missing initializer in const declaration</code></pre>
        </div>
        <blockquote class="is-warning">
            <p><em>const</em> 宣告中缺少初始化程序。</p>
        </blockquote>
        <p>由此可見，<em>const</em> 在宣告的同時，就必須賦予常數值給它，所謂的常數，可以是任何合法的運算子，諸如算術、字串，或者函式陳述式...等類。光是這樣還不夠（嚴謹），一旦 <em>const</em> 的值被宣告，<em>const</em> 會對於它的值建立一個唯獨的參考，假如我們嘗試再給值去修改該變數，將會得到系統回傳的報錯警告。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const dog = "阿比";
dog = "咪咪";
console.log(dog);    // Uncaught TypeError: Assignment to constant variable.</code></pre>
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
            <pre><code class="language-javascript">const dog = {
    name: "阿比"
};
console.log(dog);    // {"name": "阿比"}

dog.years = 3;
console.log(dog);    // {"name": "阿比", "years": 3}</code></pre>
        </div>
        <p>或許你現在還不認識陣列或物件的觀念，但不打緊，舉這些例子其實可以一言以蔽之這兩個變數關鍵字之間的關係──「<em>const</em> 可視為規矩更嚴謹的 <em>let</em>」。</p>
        <p><br></p>
        <p>以下我們用表格將三個變數宣告關鍵字從宣告方式、變數提升、作用域範圍等面相進行彙整：</p>
        <h4>作用域範圍：</h4>
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
        <h4>變數提升：</h4>
        <p>在變數宣告前就被程式敘述句調用的狀況下，編譯將會回傳什麼結果？</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1"><b>Uncaught ReferenceError: dog is not defined.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>var</em></div>
                    <div class="f-f1"><em>undefined</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>let</em></div>
                    <div class="f-f1"><b>Uncaught ReferenceError: Cannot access 'dog' before initialization.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught ReferenceError: Cannot access 'dog' before initialization.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h4>重複宣告：</h4>
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
                    <div class="f-f1"><b>Uncaught SyntaxError: Identifier 'dog' has already been declared.</b></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>const</em></div>
                    <div class="f-f1"><b>Uncaught SyntaxError: Identifier 'dog' has already been declared.</b></div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h4>宣告不給值：</h4>
        <p>當我們只先單純宣告一個變數 <em>dog</em>，卻不給它值然後讓程式去調用，編譯將會發生什麼結果。</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">關鍵字</div>
                    <div class="f-f1">回傳結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">無關鍵字宣告</div>
                    <div class="f-f1"><b>Uncaught ReferenceError: dog is not defined.</b></div>
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
        <h4>修改宣告的值：</h4>
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
        <h3>不同作用域的同名變數優先權</h3>
        <p>雖然盡可能不要在這篇文章題太多關於 JavaScript Hoisting（提升）機制的東西，因為要深入探討這個機制且充分了解它，將會佔據很長的文章篇幅，但由於變數作用域的優先權層級和提升機制息息相關，要完全閉口不提幾乎是不可能的事。若要盡可能先簡易地說，Hoisting 是 JavaScript 在執行階段時，如何運行程式腳本的思路，屬於一種行為概念衍生的名詞，其概念主要牽涉變數及函式宣告在程式腳本執行過程中被「提升」到其作用域頂部的現象，依據變數、函式在不同作用域或上下文作宣告，對程式執行可能會產生不同的影響。</p>
        <p>以變數宣告來說，如果我們試圖去向一個沒有被宣告的變數取值，例如：</p>
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
        <p>前面演示完變數提升的過程，函式也是差不多道理，而函式有 Hoisting 的好處是我們可以在定義好函式之前就先呼叫它。一般正常情況下，我們會這樣定義與呼叫函式：</p>
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
        <p>我們會發現程式這樣寫也能正常執行，至於實務上要先定義函式再進行呼叫，還是先呼叫後再寫函式，說真的也沒一定的對錯，有些人就習慣先把要呼叫的函式名稱通通寫在腳本開頭，底下再慢條斯理地撰寫函式內的程式碼結構；而有些人則傾向按照程式執行順序，先將函式定義好，爾後再進行呼叫。無論誰先誰後，最重要的還是保持整體的一致性，不要這一塊先呼叫再定義，另一塊先定義然後才做呼叫，搞得自己或團隊在維護上一頭霧水。</p>
        <p>但是函式提升也不單單只有函式內部所宣告的變數，還有一種情況是函式傳入的參數，例如：</p>
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
        <p><br></p>
        <p>通常情況我們如果沒有重複使用到相同名稱的變數，也許不太需要去在意變數提升，但如果全域、函式作用域內都存在重複名稱的變數，那麼理解提升機制的規則便顯得至關重要。當不同作用域存在相同名稱的變數，要分辨其優先權的先後順序，綜觀前面有關提升機制的說明，主要可分成三種：全域變數、區域變數以及參數變數（函式傳入的參數）。</p>
        <p>一般來說，作用域裡的變數優先順序由高到低如下：</p>
        <h5>1. 區域變數</h5>
        <p>當函式內存在與全域作用域相同的區域變數名稱，而函式被呼叫時，會以函式內的區域變數優先度較高。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";

function Animal() {
    var dog = "咪咪";
    console.log(dog);
}
Animal();    // 咪咪</code></pre>
        </div>
        <p><br></p>
        <h5>2. 參數變數</h5>
        <p>當一個函式被呼叫且傳入參數時，函式內部的參數將會覆蓋全域作用域中的同名變數。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";

function Animal(dog) {
    console.log(dog);
};
Animal("咪咪");    // 咪咪</code></pre>
        </div>
        <p>但假設函式內已經存在相同變數名稱的區域變數宣告，則會以函式內的區域變數為優先：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";

function Animal(dog) {
    var dog = "咪咪";
    console.log(dog);
}
Animal("娃娃");    // 咪咪</code></pre>
        </div>
        <p><br></p>
        <h5>3. 全域變數</h5>
        <p>假設函式域作用域中的全域變數。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";

function Animal() {
    console.log(dog);
}
Animal();    // 阿比</code></pre>
        </div>
        <p><br></p>
        <p>總結：</p>
        <p>區域變數 &gt; 參數變數 &gt; 全域變數</p>
        <p><br></p>
        <h3>什麼是作用域鏈（Scope Chain）？</h3>
        <p>先前已經提過，當 JavaScript 調用每一個變數的時候，首先會在當下作用域裡面尋找符合的指定變數，如果找不到，就會試著往上層（父層作用域）做尋找，找到了就取值，找不到就繼續往上找直到全域作用域，假使到了全域作用域也還是找不到符合的變數，那麼程式就會回傳錯誤警示訊息。而這一層一層的關係，便是「作用域鏈」（Scope Chain）。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var globalVar = "阿比";

function outerFunction() {
    var outerVar = "咪咪";

    function innerFunction() {
        var innerVar = "娃娃";
        console.log(globalVar);    // 阿比
        console.log(outerVar);    // 咪咪
        console.log(innerVar);    // 娃娃
    }
    innerFunction();

    console.log(globalVar);    // 阿比
    console.log(outerVar);    // 咪咪
    console.log(innerVar);    // Uncaught ReferenceError: innerVar is not defined 

}
outerFunction();

console.log(globalVar);    // 阿比
console.log(outerVar);    // Uncaught ReferenceError: outerVar is not defined
console.log(innerVar);    // Uncaught ReferenceError: innerVar is not defined</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、變數的資料型別</h2>
        <p>我們常常會看見或聽別人說 JavaScript 是「弱型別」的程式語言，什麼是弱型別程式語言？這個問題留到本章節末段再來解釋，我們首先要知道的是，在電腦程式語言世界裡，存在著「型別」這樣的一個系統，用來定義程式語言中的數值或運算式之類型。拿第一個章節的 <em>var price;</em> 為例，當沒有將任何數值指定給宣告變數的狀況下，其回傳值結果為 <em>undefined</em>，這個 <em>undefined</em> 就是 JavaScript 其中一種型別。而 <em>var price = 20;</em> 時，回傳的結果為 <em>20</em>，它也是型別的一種，屬於「數值（Number）資料型別」。或許看到這裡會狐疑定義變數數值的型別究竟有什麼用？當然有用，就像我們會用「元」來定論某個商品的售價，而不是以公分或顏色作為交易單位。對程式語言而言，型別象徵變數值的特徵，不同資料類型的型別，必須適才適所地運用在適當的程式邏輯。</p>
        <p>目前 ECMAScript 最新的標準定義了七種資料型別，分別是：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">型別</div>
                    <div class="f-f1">說明</div>
                    <div class="f-f3">範例</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Number</div>
                    <div class="f-f1">數值</div>
                    <div class="f-f3"><em>1</em>、<em>-2000</em>、<em>3.14</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">String</div>
                    <div class="f-f1">字串</div>
                    <div class="f-f3"><em>"abc"</em>、<em>'hello world'</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Boolean</div>
                    <div class="f-f1">布林</div>
                    <div class="f-f3"><em>true</em>、<em>false</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Object</div>
                    <div class="f-f1">物件</div>
                    <div class="f-f3"><em>[1, 2, 3]</em>、<em>{ name: 'iTrong' }</em>、<em>function foo(){}</em> ...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Null</div>
                    <div class="f-f1">空值</div>
                    <div class="f-f3"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Undefined</div>
                    <div class="f-f1">未定義</div>
                    <div class="f-f3"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Symbol</div>
                    <div class="f-f1">標誌</div>
                    <div class="f-f3">於 ES6 新定義</div>
                </div>
            </div>
        </div>
        <p>可以在具有 Console 功能的視窗輸入 <em>typeof</em> 指令來查看指定數值的型別是什麼，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof 1000;</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/learn-var-2.jpg">
            <figcaption>Codepen 的 Console 功能視窗。</figcaption>
        </figure>
        <p>在繼續詳細介紹各資料型別之前，我們仍必須釐清一個重要觀念：「變數本身沒有型別」。有型別之分的是指定給變數的「值」，變數可以在不同的時機點擁有不同型別的值，因此，我們如果使用 <em>typeof</em> 檢測某個變數的型別，檢測的對象是變數儲存的值，而非變數本身。</p>
        <p><br></p>
        <h3>Number：</h3>
        <p>數字資料型別，此型別處理的值應該不難理解，指的就是阿拉伯數字，且它可以是負數或小數。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof 1;    // number
typeof -100;    // number
typeof 3.14159;    // number</code></pre>
        </div>
        <p>有趣的是，在計算機科學中有兩種特別的數據類型：<b>Infinity</b> 與 <b>NaN</b>（Not a Number），分別代表「無窮」與「非數」的概念，假如我們使用 <em>typeof</em> 查看它們，會發現...</p>
        <figure>
            <img src="/images/learn/js/learn-var-3.jpg">
            <figcaption>檢測的結果為「Number」。</figcaption>
        </figure>
        <p>雖然它們看似不是數字，但卻屬於數字型別的成員之一。<b>Infinity</b> 表示數字是超出顯示範圍的無限大或無限小之意思。<b>NaN</b> 則表示它不等於任一數字，且也包含自己在內，意即 <em>NaN = NaN</em> 這樣的判斷式是錯誤（<em>false</em>）的結果。</p>
        <blockquote>
            <p>補充：在《你所不知道的JS導讀，型別與文法》一書裡則宣稱應視 <b>NaN</b> 為一個「無效數字」、「不合格數字」或「壞掉的數字」，會比它本身的名稱「不是一個數字」（Not a Number）來得更加適切。</p>
        </blockquote>
        <p><br></p>
        <h3>String：</h3>
        <p>字串資料型別包含字母和其他字元，其格式由單引號或雙引號構成，引號內的任何字母、數字都將視為字串。要注意的是，引號必須前後一致成對使用，不能前單後雙或前雙後單。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof "iTrong";    // string
typeof '12345678';    // string
typeof "頭好壯壯";    // string</code></pre>
        </div>
        <p>以下是錯誤的定義方式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof "123456;    // Error!
typeof "iTrong';    // Error!
typeof 'Let's go';    // Error!</code></pre>
        </div>
        <p><br></p>
        <h3>Boolean：</h3>
        <p>布林資料型別的值只有兩個──「<em>true</em>」與「<em>false</em>」，它主要被用來進行條件判斷，達到控制程式推進的功用。我們可以將布林值想像為開關，其狀態不是開啟就是關閉。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof true;    // boolean
typeof false;    // boolean</code></pre>
        </div>
        <p><br></p>
        <h3>Object：</h3>
        <p>物件資料型別...關於「物件」在 JavaScript 的存在感可說是強烈到能被學者單獨出書記述，對於還在新手村打磨裝備的我們來說，尚不適宜過度深入探討，在這個階段，我們只需知道 <em>function</em>（函式）、<em>array</em>（陣列）皆屬於物件的一種就好，另外如果看到用大括號 <em>{ }</em> 格式產生的東西，基本上也是物件。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof [];    // object
typeof {};    // object
typeof function(){}     // object</code></pre>
        </div>
        <p><br></p>
        <h3>Null：</h3>
        <p><em>null</em> 代表空值，此型別也只有 <em>null</em> 這一個值。通常是指一個不存在或無效的物件，因此，當我們用 <em>typeof</em> 檢測 <em>null</em> 的型別時，我們會驚人地發現回傳的結果竟然不是 <b>Null</b>，而是 <b>Object</b>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof null;    // object</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/learn-var-4.jpg">
        </figure>
        <p><br></p>
        <h3>Undefined：</h3>
        <p>和 <b>Null</b> 型別類似，此型別的值只有 <em>undefined</em>，表示該值為未定義。對比其它多數程式語言而言，JavaScript <em>undefined</em> 更貼近它們的 <em>null</em> 值用法。</p>
        <p>回到 JavaScript，<em>undefined</em> 常常與 <em>null</em> 牽扯在一起，看似貌合的兩人本質上仍有差別，<em>undefined</em> 代表的是「該變數還沒有值，所以不知道是什麼」，但 <em>null</em> 的意思則是「該變數可能曾經有或沒有值，但現在值是空的」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var a;
console.log(a);    // undefined

var b = null;
console.log(b);    // null</code></pre>
        </div>
        <p><br></p>
        <h3>Symbol：</h3>
        <p>最後是 <b>Symbol</b> 資料型態，它是 JavaScript 到了 ES6 版本才新增的資料型別，用來表示「獨一無二」的值。它的誕生與 <b>Object</b> 有關，現階段解釋起來過於複雜，留待日後與物件一塊兒作筆記。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">typeof Symbol();    // symbol</code></pre>
        </div>
        <p><br></p>
        <p>看完 JavaScript 七大型別的介紹，回到最一開始提到的「弱型別」話題，既然有弱，就代表電腦程式語言中也存在著「強型別」的程式語言。用最簡單直觀的方式來講，強型別語言對於型別檢查上非常嚴格，說一不二，例如 JAVA 就是強型別語言的代表。而弱型別在判定上較為寬鬆，甚至可以允許錯誤，像本系列的主角 JavaScript，以及 PHP 都是弱型別程式語言之一。</p>
        <p>弱型別容錯率高，具體來說是怎樣個容錯法？首先以 PHP 為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-php">$a = 100 + "300";
echo $a;    // 400</code></pre>
        </div>
        <p>如果我們預期 <em>a</em> 的值是數字相加的結果，但是在計算過程中，我們卻給了它 <em>"300"</em> 的字串，而非數字，這在強型別語言例如 JAVA，印出 <em>a</em> 的結果將會是錯誤代碼。然而在 PHP 身上，卻會得出 <em>400</em> 的相加答案，這就是弱型別程式語言會容忍一定的錯誤，自動自發地協助轉值型態，「正確」地計算出結果。</p>
        <p>假設同樣的狀況發生在 JavaScript 身上...</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var a = 100 + "300";
console.log(a);     // "100300"</code></pre>
        </div>
        <p><em>a</em> 回傳的結果為 <em>"100300"</em>，為字串相加。儘管它不像 PHP 這麼聰明，會自動將字串轉為數字並作加總計算，可是也不會像 JAVA 如同 NBA 裁判奉行零容忍原則般說一不二，依舊會回傳出個結果給我們。雖然比起強型別，弱型別語言的彈性較大，但不嚴謹招致錯誤轉型判斷的可能也比前者來的高（像 JavaScript 就是很好的例子），畢竟程式語言不是開發者本人，無法準確地判斷開發者給予的數值究竟是不是本人所期望的，因此培養編寫程式時反覆檢查的習慣非常重要。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、變數的命名規則</h2>
        <p>英文字母的大小寫在諸多程式語言是不同的字詞，對 JavaScript 而言也不例外，除此之外，當我們在宣告變數名稱的時候，也有一些命名規則需要遵循或注意。本章節談論變數命名主要分為兩種談論方向，一是變數命名的規則，二是應該用什麼樣的命名方式比較適當。</p>
        <p><br></p>
        <h3>命名規則：</h3>
        <p>首先是規則，縱使 JavaScript 並不是很嚴謹的程式語言，但也不是我們想隨便怎麼寫就怎麼寫，單就變數命名的部份，我們需要恪守以下幾點原則：</p>
        <h4>1. 不能使用關鍵字與保留字</h4>
        <p>關鍵字（Keywords）指的是「告知解譯器執行指定動作」的特別字詞，例如：<em>var</em>。保留字（reserved words）則是未來版本可能會被採用並成為關鍵字的詞彙。</p>
        <p>關鍵字與保留字名單：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">名稱</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">abstract</div>
                    <div class="f-f1">boolean</div>
                    <div class="f-f1">break</div>
                    <div class="f-f1">byte</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">case</div>
                    <div class="f-f1">catch</div>
                    <div class="f-f1">char</div>
                    <div class="f-f1">class</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">const</div>
                    <div class="f-f1">continue</div>
                    <div class="f-f1">debugger</div>
                    <div class="f-f1">default</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">delete</div>
                    <div class="f-f1">do</div>
                    <div class="f-f1">double</div>
                    <div class="f-f1">else</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">enum</div>
                    <div class="f-f1">export</div>
                    <div class="f-f1">extends</div>
                    <div class="f-f1">false</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">final</div>
                    <div class="f-f1">finally</div>
                    <div class="f-f1">float</div>
                    <div class="f-f1">for</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">function</div>
                    <div class="f-f1">goto</div>
                    <div class="f-f1">if</div>
                    <div class="f-f1">implements</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">import</div>
                    <div class="f-f1">in</div>
                    <div class="f-f1">instanceof</div>
                    <div class="f-f1">int</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">interface</div>
                    <div class="f-f1">long</div>
                    <div class="f-f1">native</div>
                    <div class="f-f1">new</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">null</div>
                    <div class="f-f1">package</div>
                    <div class="f-f1">private</div>
                    <div class="f-f1">protected</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">public</div>
                    <div class="f-f1">return</div>
                    <div class="f-f1">short</div>
                    <div class="f-f1">static</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">super</div>
                    <div class="f-f1">switch</div>
                    <div class="f-f1">synchronized</div>
                    <div class="f-f1">this</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">throw</div>
                    <div class="f-f1">throws</div>
                    <div class="f-f1">transient</div>
                    <div class="f-f1">true</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">try</div>
                    <div class="f-f1">typeof</div>
                    <div class="f-f1">var</div>
                    <div class="f-f1">void</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">volatile</div>
                    <div class="f-f1">while</div>
                    <div class="f-f1">with</div>
                    <div class="f-f1"></div>
                </div>
            </div>
        </div>
        <p>如果我們強硬地使用這些關鍵字與保留字當作變數名稱，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var var = "阿比";</code></pre>
        </div>
        <p>JavaScript 將會回報 <b>Uncaught SyntaxError: Unexpected token 'var'</b> 錯誤警告，這個意思主要是在訴說我們在不允許的位置使用了 <em>var</em> 這個關鍵字。</p>
        <p>另外需要注意的是，上面的關鍵字與保留字名單，並非 JavaScript 內部已存在的所有單字，有些關鍵字並沒有在名單內而仍可以被當作變數名稱來宣告，像是 <em>let</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var let = "阿比";
console.log(let);    // 阿比</code></pre>
        </div>
        <p>雖然程式不會報錯，這個「let」變數乍看也能被存取、調用，但我們都知道它是用來宣告變數的關鍵字之一，因此仍應該避免用它來做命名，更何況它在這邊的寫法沒有問題，不代表在其他程式引用也沒問題，譬如我們改用 <em>let</em> 去宣告它的話...</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let let = "阿比";    // Uncaught SyntaxError: let is disallowed as a lexically bound name</code></pre>
        </div>
        <p>不用等到存取報錯，在宣告的當下 JavaScript 就會警示<b>Uncaught SyntaxError: let is disallowed as a lexically bound name</b>，提醒我們不應該在 <em>let</em> 宣告的上下文內又使用 <em>let</em> 關鍵字。</p>
        <p>由此可知，使用這些關鍵字或保留字當作變數的名稱本身不是錯誤的問題核心，而是 JavaScript 在編譯時認為它們是關鍵字，而我們在不合乎規則的地方使用了它們，因而產生錯誤。</p>
        <p><br></p>
        <h4>2. 不能以數字起始</h4>
        <p>變數名稱的開頭可以使用字母、金額符號（<em>$</em>）、底線（<em>_</em>），但絕對不能使用數字起始。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var 9547 = "阿比";    // Uncaught SyntaxError: Unexpected number</code></pre>
        </div>
        <p>其實不只是 JavaScript，大多數程式語言的變數命名都不允許用數字當開頭，主要原因在於如果允許用數字開頭來命名變數，那麼程式語言在編譯的時候會無法確定那個以數字開頭的單字究竟是數字還是變數。</p>
        <p><br></p>
        <h4>3. 不能使用特殊符號、破折號和句點</h4>
        <p>誠如第二項開頭敘述，變數名稱的開頭可以使用字母、金額符號（<em>$</em>）、底線（<em>_</em>），其他特殊符號諸如「#」、「@」等都不能用來當作變數命名的開頭，而且任何位置都不行，不管是字符中間還是詞尾，一律都會報錯。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var &dog = "阿比";    // Uncaught SyntaxError: Unexpected token '&'
var do@g = "阿比";    // Uncaught SyntaxError: Unexpected token 'do'
var dog# = "阿比";    // Uncaught SyntaxError: Invalid or unexpected token</code></pre>
        </div>
        <p>另外像點號「<em>.</em>」、運算符「<em>+</em>」、「<em>-</em>」...等也都不能用於變數名稱之中，點號在 JavaScript 的用途是用來訪問物件裡的屬性，而運算符之所以不能摻在變數名稱裡的原因則和不能使用數字有異曲同工之妙，如果變數名稱包含運算符，將會造成程式判讀上的誤會，因此規則上不允許。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var &dog = "do.g";    // Uncaught SyntaxError: Unexpected token 'do'
var d+o+g = "阿比";    // Uncaught SyntaxError: Unexpected token '+'</code></pre>
        </div>
        <p><br></p>
        <h4>4. 不能用空格</h4>
        <p>變數名稱之間也不能用空格隔開字符，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog name = "阿比";    // Uncaught SyntaxError: Unexpected identifier 'name' </code></pre>
        </div>
        <p><br></p>
        <h3>命名方式：</h3>
        <p>和命名規則不同的是，命名方式的好壞不會影響程式對變數的判讀與存取，主要影響的是開發者本身或整個開發團隊人員在閱讀程式碼時的易讀性，一般會建議在命名的時候先考慮兩件事：</p>
        <h4>1. 使用已知詞彙來命名</h4>
        <p>善加使用已知的英文詞彙來描述變數所儲存的資訊，有助於我們直觀理解該變數的用途是什麼，不需要再花時間去思索它的用途，太過匪夷所思的命名甚至會讓其他維護的人員得透過後續程式引用的內容才能理解該變數宣告的意義，如此一來就本末倒置了。</p>
        <p>例如這篇文章的變數範例大量使用「dog」來命名，我們可以推敲出這個變數存取的值跟狗有關，假如要再精確一點表示這個變數宣告的目的是要用來存放狗的名稱，那麼我們可以將變數名稱取名為「dog_name」或「dogName」，使變數更容易被識別。</p>
        <p><br></p>
        <h4>2. 注意大小寫的區分</h4>
        <p>同一字母的大小寫在 JavaScript 會被視為不同的字符，同理也套用在我們使用既定英文單字命名變數的場合，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";
var Dog = "咪咪";
console.log(dog);    // 阿比</code></pre>
        </div>
        <p>還記得變數命名規則曾提過不能使用已知關鍵字名稱嗎？有趣的是，如果我們將那些關鍵字改為大寫，就能規避掉 JavaScript 判讀的錯誤，例如我們將「var」改成「VAR」...</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var VAR = "阿比";
console.log(VAR);    // 阿比</code></pre>
        </div>
        <p>但不管是不是關鍵字或保留字，我們最好都還是為每一個變數取下不同的名稱，而不是用大小寫去區分，才不會引發閱讀及使用上的誤會。</p>
        <p><br></p>
        <p>然而──</p>
        <p>雖說在想變數名稱的時候，建議可以先從既存的單字片語作命名，但實際上有些變數的宣告目的並非一個單字就能明確告知用途，譬如要宣告一個變數叫做「狗的名字」，正常用英文翻譯會是「dog name」，可是變數命名不允許使用空格，那要怎樣命名會比較洽當呢？</p>
        <p>最直接的方式就是不管空白格，直接讓所有單字黏在一起，像是「dogname」，假如各單字的字符不長，直接去掉空白格串在一起或許勉強還能讀懂，如果是多個單字或長字符組成的名稱呢？例如「animalplanetchannel」看得出這個變數名稱是指什麼嗎？答案是「animal planet channel」，顯然，對複數或長字元單字來說，單純移除空白格不是很好的命名方式。另外有些人的作法是使用下底線「_」，例如「animal_planet_channel」，這種命名方式通常稱為「下底線命名法」（Snake Case），更極端的甚至會用下底線數量來精分連接每一個單字，好釐清前綴的群組關係，譬如「animal__planet_channel」。確實，這樣命名變數會比移除空白格來的好閱讀，不過使用這種命名方式宣告變數的開發者數量還不是最大宗，現下最廣為人青睞且流行的命名方式當屬「駝峰式命名法」（Camel Case Naming）。</p>
        <h5>駝峰式命名法（Camel Case Naming）：</h5>
        <p>駝峰式命名法這個稱呼的由來是形容透過這種命名方式宣告的變數名稱看起來宛如駱駝的背部，其命名精髓就是除了第一個單字通常是小寫字母外，其他所有單字的字首全部都是大寫字母，各單字之間也沒有空白格或其他分隔符。例如「dogName」、「animalPlanetChannel」...等。</p>
        <p>有些人也許會問，那我連第一個單字的字首也大寫可不可以？當然沒問題，駝峰式命名法又分為「小駝峰」（Lower Camel Case）和「大駝峰」（Upper Camel Case），小駝峰指的就是首字字首字母為小寫的命名方式，大駝峰則是所有單字字首字母皆為大寫，例如：「DogName」、「AnimalPlanetChannel」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 小駝峰
var dogName = "阿比";
var animalPlanetChannel = "動物星球頻道";

// 大駝峰
var DogName = "阿比";
var AnimalPlanetChannel = "動物星球頻道";</code></pre>
        </div>
        <p><br></p>
        <h5>匈牙利命名法（Hungarian Notation）：</h5>
        <p>比起「駝峰式命名法」、「下底線命名法」，採用匈牙利命名法的人其實並不多，但 JavaScript 確實仍存在這麼一派使用者，其基本思想是在變數名稱裡除了描述用途的單字外，還會在其前綴加上該變數值的資料型別，精簡扼要來說，它的命名公式是「資料型別＋名稱描述」。例如我們宣告一個存放狗名的變數，其賦值資料型別是字串，使用匈牙利命名法的方式將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var strDogName = "阿比";</code></pre>
        </div>
        <p>因為名字通常都是字串，所以前綴使用 String 縮寫 str，書寫格式看起來其實和駝峰式命名法差不多，不過透過匈牙利命名法宣告的變數，前綴基本上不外乎都是那些變數值的資料型別或特殊資料類型，至於常見有哪些前綴命名，請見下表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">前綴</div>
                    <div class="f-f1">型別或類型</div>
                    <div class="f-f3">範例</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">str</div>
                    <div class="f-f1">String（字串）</div>
                    <div class="f-f3">strName</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">num</div>
                    <div class="f-f1">Number（數字）</div>
                    <div class="f-f3">numAge</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">bool</div>
                    <div class="f-f1">Boolean（布林值）</div>
                    <div class="f-f3">boolIsReady</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">arr</div>
                    <div class="f-f1">陣列（Array）</div>
                    <div class="f-f3">arrColors</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">obj</div>
                    <div class="f-f1">Object（物件）</div>
                    <div class="f-f3">objPerson</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">func</div>
                    <div class="f-f1">Function（函式）</div>
                    <div class="f-f3">funcCalculate</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">re</div>
                    <div class="f-f1">Regular Expression（正規表達式）</div>
                    <div class="f-f3">rePhoneNumber</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>以上命名觀念不單侷限於變數命名，函式命名方式同樣也適用。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、總結</h2>
        <p>回顧本篇文章，精簡總結一下我們從變數身上學到哪些東西：</p>
        <h5>1. 變數宣告方式</h5>
        <ul>
            <li>宣告關鍵字有三種：<em>var</em>、<em>let</em>、<em>const</em>。</li>
            <li>變數宣告最好也同時賦值給它，避免變數汙染問題。</li>
        </ul>
        <h5>2. 變數作用域</h5>
        <ul>
            <li>作用域主要分為「全域作用域」、「函式作用域」、「區塊作用域」。</li>
            <li>離開其有效範圍作用域的變數無法被存取。</li>
            <li>外部作用域無法取得內部作用域的變數，但內層的變數可以取得外層的變數。</li>
        </ul>
        <h5>3. 變數提升</h5>
        <ul>
            <li>變數提升（Hoisting）是 JavaScript 編譯時的預先處理機制。</li>
            <li>該機制的變數可分為三種類型：「全域變數」、「區域變數」、「參數變數」。</li>
            <li>如果三種類型的變數同時存在於各自作用域，其優先權順序將會是：區域變數 &gt; 參數變數 &gt; 全域變數</li>
        </ul>
        <h5>4. 資料型別</h5>
        <ul>
            <li>資料型別指的不是變數，而是變數的「值」。</li>
            <li>Number（數值）</li>
            <li>String（字串）</li>
            <li>Boolean（布林值）</li>
            <li>Object（物件）</li>
            <li>Null（空值）</li>
            <li>Undefined（未定義）</li>
            <li>Symbol（標誌）</li>
        </ul>
        <h5>5. 命名規則與方法</h5>
        <ul>
            <li>不能使用關鍵字與保留字。</li>
            <li>不能以數字起始。</li>
            <li>不能使用特殊符號、破折號、句點與空白符。</li>
            <li>建議使用已知詞彙來命名。</li>
            <li>注意大小寫的區分。</li>
            <li>主流命名方式有「駝峰式命名法」、「下底線命名法」、「匈牙利命名法」。</li>
        </ul>
        <p><br></p>
        <p>至於本篇文章提到的 JavaScript 常見名詞術語有以下這些，但有些術語所代表的技術或知識已經超過本篇主題的範疇，礙於篇幅因此沒有辦法太深入探討，如有需要可以循著原詞單字順藤摸瓜去搜尋更專業、完整的教學文章：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">名詞</div>
                    <div class="f-f1">中譯</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Variables</div>
                    <div class="f-f1">變數</div>
                    <div class="f-f3">用來儲存各種資料類型的容器，像是數字、文字或物件等，當我們將這些資料儲存在變數裡，就可以在許多地方重複地使用它或對其進行任何操作。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Function</div>
                    <div class="f-f1">函式</div>
                    <div class="f-f3">也有人稱為「函數」，是構成 Javascript 的基本要素之一，它將一系列的敘述句組合起來，以執行一項特定的工作。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Scope</div>
                    <div class="f-f1">作用域</div>
                    <div class="f-f3">指的是變數的可見性與其訪問的範圍，主要分為「全域」、「函式」、「區塊」三種作用域類型。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Scope Chain</div>
                    <div class="f-f1">作用域鏈</div>
                    <div class="f-f3">作用域鏈是 JavaScript 非常重要的概念之一，它決定了程式碼在尋找變數時的順序與範圍，即變數可見性與訪問權限。認識作用域鏈同時也是理解作用域與閉包的關鍵。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Closure</div>
                    <div class="f-f1">閉包</div>
                    <div class="f-f3">閉包是一個函式建立時的就有的自然特性。在 JavaScript 中每當函式被建立時，一個閉包就會被產生，其主要用途可以把程式中需要重複執行的部分透過閉包封裝起來，進一步簡化程式。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Execution Contexts</div>
                    <div class="f-f1">執行環境</div>
                    <div class="f-f3">執行環境指的是 JavaScript 執行時，引擎將程式碼拆解成許多區塊，並將這些區塊一塊塊堆疊起來，運算完結果就移除當前的區塊，然後繼續運算下一部分的區塊。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Hoisting</div>
                    <div class="f-f1">提升</div>
                    <div class="f-f3">「提升」是 JavaScript 中的一個概念行為，指的是在程式碼執行之前，JavaScript 引擎會將變數和函式的聲明提升到它們所在作用域的頂部。這意味著我們可以在宣告之前使用這些變數和函式。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://cythilya.github.io/2018/10/11/types/" target="_blank">你懂 JavaScript 嗎？#4 型別（Types）</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10202260" target="_blank">你不可不知的 JavaScript 二三事#Day3：資料型態的夢魘——動態型別加弱型別(2)</a></dd>
            <dd><a href="https://pydoing.blogspot.com/2012/12/JavaScript-Variable-Naming.html" target="_blank">JavaScript 入門指南 - 變數命名規則</a></dd>
            <dd><a href="https://blog.csdn.net/lbxx1984/article/details/39205717" target="_blank">几张简约而不简单的JavaScript学习树状图</a></dd>
            <dd><a href="https://medium.com/take-a-day-off/js-scope-%E4%BD%9C%E7%94%A8%E5%9F%9F-ee536640963b" target="_blank">[JS] Scope 作用域</a></dd>
            <dd><a href="https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/function_scope.html" target="_blank">函式與作用域</a></dd>
            <dd><a href="https://jianline.com/javascript-scope-and-scope-chain/" target="_blank">[筆記]-JavaScript 作用域與作用域鏈是什麼?關於作用域的4個觀念</a></dd>
            <dd><a href="https://www.explainthis.io/zh-hant/swe/what-is-scope-and-scope-chain" target="_blank">Javascript 的作用域 (Scope) 與作用域鏈 (Scope Chain) 是什麼?</a></dd>
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