<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="47" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、什麼是運算式？</a></li>
            <li><a href="#act2">二、什麼是運算子？</a></li>
            <li><a href="#act3">三、一元運算子（Unary operator）</a></li>
            <li><a href="#act4">四、二元運算子（Binary operator）</a></li>
            <li><a href="#act5">五、三元運算子（Ternary operator）</a></li>
            <li><a href="#act6">六、運算子的優先級</a></li>
            <li><a href="#act7">七、總結</a></li>
            <li><a href="#act8">八、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>我們在寫 JavaScript 的時候往往會用到大量的函式與方法，但佔據整個程式碼比例的通常不是這些語法，而是各種我們對於想要實現指定需求效果的陳述，比如交代程式在什麼情況下要做什麼事情，或是向它索取特定的結果等等，在 JavaScript 語言裡，陳述需求、表達指令的語法大抵來說可分成兩大類：一是「敘述句」（Statement），二是「運算式」（Expression），而運算式的構成裡通常會包含一些運算符號，我們稱之為「運算子」（Operator），其中，運算式與運算子正是本篇文章要聚焦的主題。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、什麼是運算式？</h2>
        <p>運算式原文名稱為 Expression，也可稱為表達式。在前言已有稍微提到 JavaScript 的程式陳述方式概略可分成敘述句（Statement）與運算式兩種語法，敘述句主要用來執行指定動作或操作，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (height > 0) {
    console.log("阿比蹦蹦跳");
}</code></pre>
        </div>
        <p>敘述句通常有這些特徵：</p>
        <ul>
            <li>敘述句主要用來執行特定動作或操作的完整指令。</li>
            <li>敘述句的句尾通常以「分號」<em>;</em>作結。</li>
            <li>敘述句不一定都會回傳值。</li>
        </ul>
        <p>有關敘述句就到這裡說個大概，詳細內容會作為主題在後續文章專門介紹，我們接著回頭聚焦運算式的部份。根據定義，運算式指的是任何一段可以取得值的程式碼片段，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";</code></pre>
        </div>
        <p>在這個範例中，<em>dog</em> 是變數，<em>阿比</em> 則是值，<em>=</em> 在 JavaScript 裡不相當於數學表達的「等於」，它在這裡是「指定」的概念，表示這個運算式將 <em>阿比</em> 這個值「指定」給 <em>dog</em>，而這個 <em>=</em> 符號就是運算子的一種，名為「指定運算子」。</p>
        <p>運算式統常有這些特徵：</p>
        <ul>
            <li>運算式通常指的是一個計算且返回值的程式碼片段。</li>
            <li>運算式可以是值、變數、運算子的組合，也可以是一個函式調用。</li>
            <li>運算式一般都會返回值。</li>
        </ul>
        <p>雖說兩者是不一樣的概念，不過總的而言，運算式其實也是敘述句的一部份，當敘述句裡面的程式碼包含一個回傳值的片段，那麼該片段便是運算式。舉例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog;    // 沒有指定值，所以只是單純的敘述句
dog = "阿比";    // 有指定值，可視為運算式
var x = "阿比" + "蹦蹦跳";    // 等號左邊敘述變數宣告，右邊賦值，可視為運算式</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、什麼是運算子？</h2>
        <p>運算式構成要素基本上都ㄧ定會包含運算子（operators），這是因為運算式的操作必須依賴它們才能進行。JavaScript 提供了大量的運算子提供運算式進行計算，不同種類的運算子，理所當然產生不同類型的運算式，例如算術運算式、比較運算式...等等。它們幫助程式開發者得以從一或多個值中，產生一個結果值。</p>
        <p>就目前 JavaScript 版本來說，運算子可分為以下這些類型：</p>
        <ul>
            <li>指定運算子（Assign operators）</li>
            <li>比較運算子（Comparison operators）</li>
            <li>算術運算子（Arithmetic operators）</li>
            <li>位元運算子（Bitwise operator）</li>
            <li>邏輯運算子（Logical operators）</li>
            <li>字串運算子（String operators）</li>
            <li>條件（三元）運算子（Conditional (ternary) operator）</li>
            <li>逗點運算子（Comma operator）</li>
            <li>一元運算子（Unary operators）</li>
            <li>關係運算子（Relational operators）</li>
            <li>分組運算子（Grouping operator）</li>
            <li>new 運算子（new operator）</li>
            <li>展開運算子（Spread syntax）</li>
            <li>其餘運算子（Rest Operator）</li>
        </ul>
        <p>只是以上也僅是粗略的分類法，這些分類法所歸類的各種運算符，在某些文章或用途也會賦予不同的運算子名稱，實在很難逐一去做細分。但是根據它們與運算元之間交互的特性，我認為整體上可以劃分成三種大類，分別是：一元運算子、二元運算子、三元運算子，即使用它們時所必須含帶的基本運算元數量來做歸類，接下來會將它們各自用一個章節來做介紹。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、一元運算子（Unary operator）</h2>
        <p>表示該運算子只需要一個運算元就能運算出結果，格式為 <em>運算子 運算元</em> 或 <em>運算元 運算子</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">3++;
++3;</code></pre>
        </div>
        <p>在初學 JavaScript 階段，我們會先接觸到的一元運算子可能通常是 <em>typeof</em>，該運算子的用途在於檢測後方添加之運算元的資料型別為何。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let dog = "阿比";
console.log(typeof dog);  // "string"</code></pre>
        </div>
        <p>除了 <em>typeof</em> 之外，還有以下這些一元運算子：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">運算子</div>
                    <div class="f-f3">說明</div>
                    <div class="f-f2">範例</div>
                    <div class="f-f1">結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>typeof</em></div>
                    <div class="f-f3">回傳運算元的資料型別。</div>
                    <div class="f-f2">let dog = "阿比";<br>console.log(typeof dog);</div>
                    <div class="f-f1">String</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>delete</em></div>
                    <div class="f-f3">刪除指定的運算元物件，包含變數名稱、指定陣列的索引值、物件的特性等。</div>
                    <div class="f-f2">delete dog<br>delete Array[3]<br>delete Car.name</div>
                    <div class="f-f1"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>void</em></div>
                    <div class="f-f3">此運算子會解析運算式而不回傳任何值，一般來說後方的運算式會用小括號囊括起來，但並非一定要添加，只是原則上會建議使用。</div>
                    <div class="f-f2">&lt;a href="javascript:void(0)"&gt;點擊連結但不會觸發任何作用&lt;/a&gt;<br>&lt;a href="javascript:void(document.form.submit())"&gt;點擊以送出&lt;/a&gt;</div>
                    <div class="f-f1"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>+</em></div>
                    <div class="f-f3">將運算元值轉換為數值，如果已經是純數值則不變。</div>
                    <div class="f-f2">let num = "10";<br>console.log(+num);</div>
                    <div class="f-f1">10</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>-</em></div>
                    <div class="f-f3">將運算元值轉換為相反的數值（並非轉換為負數，因為若數值為負，經過轉換則變成正數）。</div>
                    <div class="f-f2">let num = "-10";<br>console.log(+num);</div>
                    <div class="f-f1">-10</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>++</em></div>
                    <div class="f-f3">遞增運算元數值，將其數值增加 1。</div>
                    <div class="f-f2">let num = 5;<br>console.log(++num);</div>
                    <div class="f-f1">6</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>--</em></div>
                    <div class="f-f3">遞減運算元數值，將其數值減少 1。</div>
                    <div class="f-f2">let num = 5;<br>console.log(--num);</div>
                    <div class="f-f1">4</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>!</em></div>
                    <div class="f-f3">表示邏輯 NOT，將布林值進行邏輯反轉。</div>
                    <div class="f-f2">let isTrue = true;<br>console.log(!isTrue);</div>
                    <div class="f-f1">false</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>~</em></div>
                    <div class="f-f3">表示位元 NOT，將數值轉換的二進位進行反轉。</div>
                    <div class="f-f2">let num = 5;<br>console.log(~num);</div>
                    <div class="f-f1">-6</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>分組運算子（Grouping operator）</h3>
        <p>此運算子通常用括號 <em>()</em> 表示，是一種在表達式中用來指定計算順序的運算子。當一個表達式中包含多個運算子時，分組運算子可以確保某些部分的計算先於其他部分。分組運算子的優先級最高，即在一個表達式中，被括號括起來的部分會最先計算。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let result = (2 + 3) * 4;
console.log(result);    // 20</code></pre>
        </div>
        <p>其實這就是國中甚至國小就會教到的基礎數學運算概念，碰到數學運算，我們一般會想到「先乘除後加減」，但若遇到括號括起來的算式，則其內部運算式會優先執行計算，因此上面範例中，(2 + 3) 會先執行運算，得到結果為 5，然後才繼續乘以 4，故得到的結果為 20。</p>
        <p><br></p>
        <h3>new 運算子（new operator）</h3>
        <p><em>new</em> 運算子是 JavaScript 其中一個關鍵字，當我們使用它時，將會建立一個新的空物件，而它主要用於調用構造函式（Constructor Function）的時候，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(){
    this.name = "阿比";
}
let newDog = new dog();
console.log(newDog);    // [object Object] { "name": "阿比" }</code></pre>
        </div>
        <p>像這種透過建構函式創建出來的新物件，一般大家稱其為「實例」（instance），如果你有接觸過 Vue，可能會對實例這個名詞感到似曾相識。沒錯，Vue.js 框架在它的應用開發中廣泛使用 <em>new</em> 運算子來建立其實例。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const app = new Vue({
    el: "#app", // 指定要掛載的元素
    data: {
        message: 'Hello, Vue!'
    },
    methods: {
        greet() {
            console.log(this.message);
        }
    }
});</code></pre>
        </div>
        <p><br></p>
        <h3>展開運算子（Spread syntax）</h3>
        <p>展開運算子可用來將陣列中的值展開為個別值，其運算子表示方式為 <em>...</em>。首先我們來看一個基本的例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number = [1, 2, 3, 4, 5];
console.log(number);    // [1,2,3,4,5]</code></pre>
        </div>
        <p>倘若加入展開運算子，輸出結果就會變成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number = [1, 2, 3, 4, 5];
console.log(...number);    // 1 2 3 4 5</code></pre>
        </div>
        <p>當然除了數字之外，字串也可以透過展開運算子將之打散：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var name = "iTrong";
console.log(name);    // 輸出的結果為 "iTrong"

console.log(...name);    // "i" "T" "r" "o" "n" "g"</code></pre>
        </div>
        <p>因為展開運算子這種類似將變數值「打散」的概念，所以我們可以運用在陣列的合併上，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var array1 = [1, 2, 3];
var array2 = [...array1, "apple", "banana"];
console.log(array2);    // [1, 2, 3, "apple", "banana"]</code></pre>
        </div>
        <p>是否隱隱約約覺得和陣列中的操作方法 <em>.concat()</em> 很相似呢？沒錯，自 ES6 推出展開運算子之後，以往陣列合併 <em>.concat()</em> 的寫法就能用 <em>...</em> 取代，同樣的例子我們來看看如果用原本陣列合併的方法是如何表示：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var array1 = [1, 2, 3];
var array2 = ["apple", "banana"];
console.log(array1.concat(array2)); // [1, 2, 3, "apple", "banana"]</code></pre>
        </div>
        <p><br></p>
        <p>展開運算子也可以用於陣列的「淺拷貝」，即便經拷貝產生的新陣列加入新的值，也不會影響原本被拷貝的陣列：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var array1 = ["apple", "banana"];
var array2 = [...array1];
array2.push("orange", "grape");

console.log(array1); // ["apple", "banana"]
console.log(array2); // ["apple", "banana", "orange", "grape"]</code></pre>
        </div>
        <p>再來就是可取代 <em>.apply()</em> 方法，將陣列值傳入函式做為參數。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function sumFuc(x, y){
  return x + y;
}
var arr = [5, 10];
var result = sumFuc.apply(null, arr);
console.log(result);    // 15</code></pre>
        </div>
        <p>改由展開運算子簡化的寫法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function sumFuc(x, y){
  return x + y;
}
var arr = [5, 10];
var result = sumFuc(...arr);
console.log(result);    // 15</code></pre>
        </div>
        <p><br></p>
        <h3>其餘運算子（Rest Operator）</h3>
        <p>其餘運算子（Rest Operator）的符號表達方式與展開運算子相同，都是以 <em>...</em> 表示，然而用途卻不一樣。後者主要用於將陣列中的值打散成個別的值，而前者則是將不確定數量的參數值集合成一個陣列。比方來說，我們定義一個簡單輸出代入參數的函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo(e) {
    console.log("result:", e);
}

demo("a", "b", 3, "n");    // a</code></pre>
        </div>
        <p>由於只設置一個變數 <em>e</em>，因此即便傳入再多參數，也只有第一個參數 <em>a</em> 會被執行。但如果我們導入其餘運算子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo(...e) {
    console.log("result:", e);
}

demo("a", "b", 3, "n");    // ["a", "b", "3", "n"]</code></pre>
        </div>
        <p>加入其餘運算子後，會發現它將傳入的參數通通集結起來成為一個新的陣列，同樣的概念，這次在函式裡再多增加幾個定義參數，我們就能更明顯看出其餘運算子的功用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo(x, y, ...e) {
    console.log(x, y, e);
}

demo("a", "b", 3, "n", 5);    // "a" "b" [3, "n", 5]</code></pre>
        </div>
        <p>如果剩餘傳入的參數只剩一個值，其餘運算子依舊會將其組成陣列；再假設已經沒有剩餘的值分給其餘運算子，其餘運算子仍會產生一個空的陣列，而非 <em>undefined</em>。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo(x, y, ...e) {
    console.log(x, y, e);
}

demo("a", "b", "c");    // "a" "b" ["c"]
demo("a", "b");         // "a" "b" []</code></pre>
        </div>
        <p>在前面練習展開運算子的時候，都是由展開運算子去處理其他陣列的參數，那如果現在反向由參數去填入 <em>...</em> 會發生什麼事呢？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var [x, ...y] = ["a", "b", 3, "n"];

console.log(x); // a
console.log(y); // ["b", 3, "n"]</code></pre>
        </div>
        <p>這種用法一般稱其為「解構賦值」（Destructuring），可以想像成鏡像的方式來進行賦值，而除了陣列之外，也可以用來解構物件（<em>{ ... }</em>）。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、二元運算子（Binary operator）</h2>
        <p>JavaScript 大部份的運算子都屬於此類，指的就是需要具備兩個運算元才能成立的運算子，格式為 <em>運算元 運算子 運算元</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">3 + 5;
3 &gt; 5;</code></pre>
        </div>
        <p><br></p>
        <h3>指定運算子（Assign operators）</h3>
        <p>最常見的指定運算子就是 <em>=</em> 符號，用來表示將某個值指定給變數。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";</code></pre>
        </div>
        <p>除此之外，只要有掛上一個 <em>=</em> 的都可以算是指定運算子的成員之一，詳見如下表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">運算子</div>
                    <div class="f-f1">範例</div>
                    <div class="f-f6">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>=</em></div>
                    <div class="f-f1">x = y</div>
                    <div class="f-f6">將 y 值指定給變數 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>+=</em></div>
                    <div class="f-f1">x += y</div>
                    <div class="f-f6">相當於 x = x + y</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>-=</em></div>
                    <div class="f-f1">x -= y</div>
                    <div class="f-f6">相當於 x = x - y</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>*=</em></div>
                    <div class="f-f1">x *= y</div>
                    <div class="f-f6">相當於 x = x * y</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>/=</em></div>
                    <div class="f-f1">x /= y</div>
                    <div class="f-f6">相當於 x = x / y，<em>/</em> 是相除的意思</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>%=</em></div>
                    <div class="f-f1">x %= y</div>
                    <div class="f-f6">相當於 x = x % y，意即將 x 除以 y 後的餘數指定給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>**=</em></div>
                    <div class="f-f1">x **= y</div>
                    <div class="f-f6">相當於 x = x ** y，意即將 x 的 y 次方值指定給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&lt;&lt;=</em></div>
                    <div class="f-f1">x &lt;&lt;= y</div>
                    <div class="f-f6">相當於 x = x &lt;&lt;= y，意即將 x 所有位元左移 y 位，右邊的位元補入 0 後的值指定回給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>>>=</em></div>
                    <div class="f-f1">x >>= y</div>
                    <div class="f-f6">相當於 x = x >>= y，意即將 x 所有位元右移 y 位，最左邊的位元 (sign bit) 補入跟原本最左位元一樣值後指定回給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>>>>=</em></div>
                    <div class="f-f1">x >>>= y</div>
                    <div class="f-f6">相當於 x = x >>>= y，和 <em>>>=</em> 一樣，但最左邊的位元補 0</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&=</em></div>
                    <div class="f-f1">x &= y</div>
                    <div class="f-f6">相當於 x = x & y，意即將 x y 做位元 AND 運算後的值指定回給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>^=</em></div>
                    <div class="f-f1">x ^= y</div>
                    <div class="f-f6">相當於 x = x ^ y，意即將 x y 做位元 XOR 運算後的值指定回給 x</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>|=</em></div>
                    <div class="f-f1">x |= y</div>
                    <div class="f-f6">相當於 x = x | y，意即將 x y 做位元 OR 運算後的值指定回給 x</div>
                </div>
            </div>
        </div>
        <p>透過表格可以看出指定運算子常與其他類型的運算子搭配使用，以達到產生指定結果值予變數之目的。</p>
        <p><br></p>
        <h3>比較運算子（Comparison operators）</h3>
        <p>如同它字面意義所述，我們可以將程式碼中的值與預期值進行比較，評估後的結果將會以「布林值」表示，也就是 <em>true</em> 或 <em>false</em>。運算元可以是數值、字串、表達式 (expression) 或物件等。假如比較的運算元型別不同，JavaScript 會嘗試將之轉型成相同型別後再行比較，通常情況下，會先轉成數字資料型別（Number）。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var pass = 60;
var score = 87;
var hasPassed = score >= pass;    // true</code></pre>
        </div>
        <p><em>score</em> 值（<em>87</em>）大於 <em>pass</em> 值（<em>60</em>），故回傳的結果為 <em>true</em>。</p>
        <p>前面有提到，運算元不一定要是單一值或是變數名稱，它也可以是一個運算式，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">((num1 + num2) > (num3 + num4));</code></pre>
        </div>
        <p>實際演練：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var score1 = 90;
var score2 = 95;
var average1 = 60.5;
var average2 = 80;

var final = (score1 + score2) > (average1 + average2);    // true</code></pre>
        </div>
        <p>接著來看看比較運算子的字符有哪些：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">運算子</div>
                    <div class="f-f6">說明</div>
                    <div class="f-f2">範例</div>
                    <div class="f-f1">結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>==</em></div>
                    <div class="f-f6">等於，比較兩個值（數字、字串、布林值）並確認是否相同</div>
                    <div class="f-f2">'123' == '123'<br>'123' == '1234'<br>'123' == 123</div>
                    <div class="f-f1">true<br>false<br>true</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>===</em></div>
                    <div class="f-f6">嚴格等於，比較兩個值（數字、字串、布林值）並確認資料型別與值皆相同</div>
                    <div class="f-f2">'123' === 123<br>'123' === '123'</div>
                    <div class="f-f1">false<br>true</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>!=</em></div>
                    <div class="f-f6">不等於，比較兩個值（數字、字串、布林值）並確認是否不相同</div>
                    <div class="f-f2">'123' != '123'<br>123 != '123'<br>'123' != '1234'<br></div>
                    <div class="f-f1">false<br>false<br>true</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>!==</em></div>
                    <div class="f-f6">嚴格不等於，比較兩個值（數字、字串、布林值）並確認資料型別與值皆不相同</div>
                    <div class="f-f2">'123' !== 123<br>'123' !== '123'</div>
                    <div class="f-f1">true<br>false</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>></em></div>
                    <div class="f-f6">大於，檢視左邊的數字是否大於右邊的數字</div>
                    <div class="f-f2">5 > 3<br>'5' > 3<br>3 > 5</div>
                    <div class="f-f1">true<br>true<br>false</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&lt;</em></div>
                    <div class="f-f6">小於，檢視左邊的數字是否小於右邊的數字</div>
                    <div class="f-f2">5 &lt;3<br>'5' &lt; 3<br>3 &lt; 5</div>
                    <div class="f-f1">false<br>false<br>true</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>>=</em></div>
                    <div class="f-f6">大於等於，檢視左邊的數字是否大於「或」等於右邊的數字</div>
                    <div class="f-f2">5 >= 3<br>3 >= 5<br>3 >= 3</div>
                    <div class="f-f1">true<br>false<br>true</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&lt;=</em></div>
                    <div class="f-f6">小於等於，檢視左邊的數字是否小於「或」等於右邊的數字</div>
                    <div class="f-f2">5 &lt;= 3<br>3 &lt;= 5<br>3 &lt;= 3</div>
                    <div class="f-f1">false<br>true<br>true</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>算術運算子（Arithmetic operators）</h3>
        <p>算術運算子（Arithmetic operators）包含基本的加減乘除，以及遞增、遞減等運算方式。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var total = 10 * 3;    // 30</code></pre>
        </div>
        <p>我們都知道數學運算有著「先乘除後加減」的鐵律，若要先加減後乘除，則必須用括號將優先計算加減的值包含起來，這一點在程式運算亦同。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var total = 6 + 10 * 3;    // 36</code></pre>
        </div>
        <p>得到的結果會是 <em>36</em>，而不是 <em>48</em>。若要先加後乘的話，則必須這樣定義：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var total = (6 + 10) * 3;    // 48</code></pre>
        </div>
        <p>如此一來，回傳的結果就會是 <em>48</em>。</p>
        <p><br></p>
        <h3>位元運算子（Bitwise operator）</h3>
        <p>在認識 JavaScript 位元運算子原理之前，我們必須要知道數學進位制的概念，譬如我們日常生活中使用的進位制為「十進位」，所謂的十進位指的是使用十個數字作為表示數量的方式，這十個數字分別是：「0 1 2 3 4 5 6 7 8 9」，因此當記數記到第十個數字，「十」本身並沒有數字符號，我們看到的「10」是藉由進位而得，拆開成算式來看即為「1 * 10^1 + 0 * 10^0 = 10 + 0 = 10」。再舉一個例子，數字 123 拆解成算式則會是「1 * 10^2 + 2 * 10^1 + 3 * 10^0 = 100 + 20 + 3 = 123」。</p>
        <p>（※ 這裡的 ^ 符號指的是「平方」的意思，並非表示 JavaScript 的符號意義。）</p>
        <blockquote class="is-info">
            <p>或許有些人會疑惑為什麼 3 * 10^0 = 3 * 1 中 10 的零次方會等於 1，這乃是數學定義，該規定主要是為了保持數學中一些重要的特性和公式。</p>
        </blockquote>
        <p>而在電腦計算機程式語言裡，進位制有二進位、八進位、十六進位......等等，原理和十進位大同小異。至於 JavaScript 位元運算子將數字（運算元）當作二進位來看待，意思是我們不會看到 2 這個數字，一旦記數碰到 2 就會進位，例如「10」這個數字用二進位表示將會是「1010」，詳細進位算式攤開來看即為「1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 0 * 2^0 = 8 + 0 + 2 + 0 = 10」。</p>
        <p>位元運算子有以下這些：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">運算子</div>
                    <div class="f-f6">說明</div>
                    <div class="f-f2">範例</div>
                    <div class="f-f1">結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&</em></div>
                    <div class="f-f6">回傳兩個運算元對於每個位元做 AND 的結果。</div>
                    <div class="f-f2">3 & 2</div>
                    <div class="f-f1">2</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>|</em></div>
                    <div class="f-f6">回傳兩個運算元對於每個位元做 OR 的結果。</div>
                    <div class="f-f2">3 | 2</div>
                    <div class="f-f1">3</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>^</em></div>
                    <div class="f-f6">回傳兩個運算元對於每個位元做 XOR 的結果。</div>
                    <div class="f-f2">3 ^ 2</div>
                    <div class="f-f1">1</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>~</em></div>
                    <div class="f-f6">將運算元中的每個位元反轉（1 -> 0，0 -> 1）。</div>
                    <div class="f-f2">~ 2</div>
                    <div class="f-f1">-3</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&lt;&lt;</em></div>
                    <div class="f-f6">將左側值的每個位元向左移動與右側值相應的位元數，空餘的位數以 0 填滿。</div>
                    <div class="f-f2">3 &lt;&lt; 2</div>
                    <div class="f-f1">12</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&gt;&gt;</em></div>
                    <div class="f-f6">將左側值的每個位元向右移動與右側值相應的位元數，空餘的位數以最高位填滿。</div>
                    <div class="f-f2">3 &gt;&gt; 2</div>
                    <div class="f-f1">0</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&gt;&gt;&gt;</em></div>
                    <div class="f-f6">將左側值的每個位元向右移動與右側值相應的位元數，空餘的位數以 0 填滿。</div>
                    <div class="f-f2">9 &gt;&gt;&gt; 2</div>
                    <div class="f-f1">2</div>
                </div>
            </div>
        </div>
        <p>位元運算子使用的時機不算廣泛，這裡稍微提一下上面表格裡各範例所產生結果的原理，首先我們要將 3 和 2 這兩個範例數字轉換成二進位，分別是「011」與「010」，<em>&</em> 表示 AND，將左右數值的二進位位元進行比對，若兩者皆為 1，則回傳「true」，也就是 1；若兩者皆為 0，或其中一者為 0 另一者為 1，則回傳「false」，即 0。因此，我們回頭檢視 <em>3 & 2</em>，轉化成二進位 011 與 010 進行比對，得到的結果會是 010，故還原後回傳的數字為「2」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">範例：3 & 2
第一位：1 & 0 -> 0
第二位：1 & 1 -> 1
第三位：0 & 0 -> 0
---
結果：010    // 2</code></pre>
        </div>
        <p>接下來 <em>|</em> 和 <em>^</em> 的原理也是一樣，差別只在於邏輯不同，以下我們直接拆解成程式碼來看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">範例：3 | 2
第一位：1 | 0 -> 1
第二位：1 | 1 -> 1
第三位：0 | 0 -> 0
---
結果：011    // 3</code></pre>
        </div>
        <p><em>^</em> XOR 和 OR 不一樣，OR 是只要其中一個位元數為 1，即表示 true 並返回 1，XOR 則是若比對數字同位元進位值皆相同的情況下，返回結果為 false，反之若不同，則返回 true：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">範例：3 ^ 2
第一位：1 ^ 0 -> 1
第二位：1 ^ 1 -> 0
第三位：0 ^ 0 -> 0
---
結果：001    // 1</code></pre>
        </div>
        <p>至於 <em>~</em> 使用的是「補數」（implement）的概念，會將二進位各位元數的 0 與 1 進行反轉，若原數為 0 反轉為 1，若是 1 則反轉為 0，同時二進位會為每組數字前面分配一個「Sign Bit」，用來表示數字的正負數，因此數字 2 解析成二進位將會是「010」（最前面的 0 表示正數，如果是負數則為 1），經反轉後得到的結果為「101」，根據「二補數表示法」（two's complement），正數的表示與無符號整數相同，而負數則是將對應的正數的二進位表示取反（每一位取反），然後加 1，得到的結果為 -3。</p>
        <p><em>&lt;&lt;</em> 與 <em>&gt;&gt;</em> 運算子用來移動數字往符號指向的方向，後面的數字表示移動的次數，因此範例的 <em>3 &lt;&lt; 2</em> 表示 3 的二進位數字向左移動兩格，011 變成 01100，換算回來結果為 12。反之向右移動二進位表示結果就變成 0（011 向右移動兩格，後面的 11 就被移出去了），剩下的 0 僅表示正負數，實際上二進位已經不存在任何數字，所以回傳結果為 0。如果你覺得 3 這個數字舉例不太好理解，我們改用 <em>9 &gt;&gt; 2</em> 來示範，9 的二進位表示法為 01001，向右移動兩格後變成 010，故結果為 2。</p>
        <p><br></p>
        <h3>邏輯運算子（Logical operators）</h3>
        <p>比較運算子通常回傳 <em>true</em> 或 <em>false</em> 的單一結果值，邏輯運算子則可以針對多個比較運算子產生的結果值，再進行邏輯判斷。以下是邏輯運算子的常見運用方法之一的範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">((5 &lt; 2) && (3 &gt;= 2));</code></pre>
        </div>
        <p>這個結構包含三個運算式，每一個均會產生 <em>true</em> 或 <em>false</em> 的結果值，「運算式1」指的是 <em>(5 &lt; 2)</em> 這段，其結果為 <em>false</em>。而「運算式2」則是 <em>(3 &gt;= 2)</em>，其結果為 <em>true</em>。「運算式3」則是將前兩個運算式囊括起來，並使用了一個邏輯運算子「<em>&&</em>」，這個符號表示意義是「AND」邏輯運算子，用來檢查運算式1和運算式2的結果是否均為 <em>true</em> 值，但因為運算式1的結果為 <em>false</em>，故最後運算式3輸出的結果為 <em>false</em>。</p>
        <p>除了 <em>&&</em> 之外，邏輯運算子尚有 <em>||</em>、<em>!</em> 這兩個字符，以下透過表格來介紹之：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">運算子</div>
                    <div class="f-f6">說明</div>
                    <div class="f-f2">範例</div>
                    <div class="f-f1">結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>&&</em></div>
                    <div class="f-f6">表示 AND，兩邊運算式評估必須均為 true，輸出結果才會為 true，其餘皆 false。<br>true && true => true<br>true && false => false<br>false && true => false<br>false && false => false</div>
                    <div class="f-f2">((6 > 5) && (3 >= 3))<br>((5 &lt; 2) && (3 >= 2))</div>
                    <div class="f-f1">true<br>false</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>||</em></div>
                    <div class="f-f6">表示 OR，只要任一運算式評估為 true，輸出結果就是 true，只有兩邊運算式都是 false 的情況，輸出結果才會是 false。<br>true && true => true<br>true && false => true<br>false && true => true<br>false && false => false</div>
                    <div class="f-f2">((6 > 5) && (3 >= 3))<br>((5 &lt; 2) && (3 >= 2))<br>((5 &lt; 2) && (3 &lt; 2))</div>
                    <div class="f-f1">true<br>true<br>false</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>!</em></div>
                    <div class="f-f6">表示 NOT，將運算式的布林值轉換為相反值<br>!true => false<br>!false => true</div>
                    <div class="f-f2">!(2 &lt; 1)</div>
                    <div class="f-f1">true</div>
                </div>
            </div>
        </div>
        <p>此外值得一提的是，邏輯運算子是由左至右執行評估，如果第一個運算式條件已可提供足夠資訊取得整體運算式的答案，那麼 JavaScript 就不會繼續評估第二個條件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(5 &lt; 2) && (3 >= 2);</code></pre>
        </div>
        <p>第一個條件 <em>(5 &lt; 2)</em> 經評估結果為 <em>false</em>，已可確定 AND 邏輯運算子的結果為 <em>false</em>，那麼就不會再去評估第二個條件了。</p>
        <p><br></p>
        <h3>字串運算子（String operators）</h3>
        <p>字串運算子只有一種──「加號（<em>+</em>）」，可用於連接運算子兩端的字串資料值。寫程式的我們經常需要連接兩個以上的字串，以建立一個新的字串，這個連接的程序稱為「字串連結（concatenation）」。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var firstName = "狗";
var lastName = "阿比";
var fullName = firstName + lastName;    // 狗阿比</code></pre>
        </div>
        <p>在這個範例中，我們將姓氏跟名字分開儲存於變數使用，但可能有時候會需要將它們結合，以顯示完整的姓名，透過字串運算子便可以實現我們的需求，透過新宣告一個名叫 <em>fullName</em> 的變數，把 <em>firstName</em> 與 <em>lastName</em> 兩個變數透過字串運算子串聯在一起，並得到結果為「狗阿比」。</p>
        <blockquote>
            <p>數值資料型別與字串資料型別是可以混合使用的，但是不同的表示方法會有不同的結果。</p>
        </blockquote>
        <p><br></p>
        <h4>1. 數值加上引號：</h4>
        <p>若在數值兩邊加上引號，它將成為字串資料型別，而不再是數值資料型別。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number1 = '10';
var number2 = '99';
var final = number1 + number2;    // 1099</code></pre>
        </div>
        <p><br></p>
        <h4>2. 數值與字串相加：</h4>
        <p>若將純數字的變數與字串變數相加，數值則會變成字串的一部分。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number = 10;
var name = "阿比";
var final = number + name;    // 10阿比</code></pre>
        </div>
        <p><br></p>
        <h4>3. 對字串資料作數學運算：</h4>
        <p>因為字串不是數字，若給它們執行算術運算，只會得到 <em>NaN</em>的結果。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number = "3";
var name = "阿比";
var final = number * name;    // NaN</code></pre>
        </div>
        <p><br></p>
        <h3>逗點運算子（Comma operator）</h3>
        <p>逗點運算子也是二元運算子的其中一種，顧名思義，其符號就是用逗號 <em>,</em> 來表示。其用途主要在於將兩個或以上的運算式合併在一起，其語法形式如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">expr1, expr2, expr3, ..., exprN</code></pre>
        </div>
        <p>需要注意的是，無論逗點運算子合併多少個運算式，它都只會返回最後一個運算式的值，前面其他運算式的結果都將會被忽略。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var total = (1+2, 3+4, 5+6);
console.log(total);    // 11</code></pre>
        </div>
        <p>藉由上方的例子可以得知我們透過逗點運算子合併多個運算式，但最終回傳的結果只有最後一個運算式的計算結果，不過這不代表前面的運算式就直接被忽略了，它們一樣會被執行，只是就回傳結果來說，逗點運算子只會返回最後運算式的結果。</p>
        <p>逗號運算子有時在壓縮代碼、一行內執行多個操作等情境下使用（很常在 For 迴圈見到）。請注意，雖然逗號運算子有其用途，但在可讀性方面可能不如單獨的語句清晰。在正常的開發中，請謹慎使用逗號運算子，確保代碼易於理解。</p>
        <p>For 迴圈範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for (let i = 0, j = 10; i &lt; 5; i++, j--) {
  console.log("i:", i, "j:", j);
}</code></pre>
        </div>
        <p><br></p>
        <h3>關係運算子（Relational operators）</h3>
        <p>關係運算子是用來比較兩個值之間的關係的運算子，它們會返回布林值（<em>true</em> 或 <em>false</em>），以此表示比較的結果。常見的關係運算子有以下這些：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">運算子</div>
                    <div class="f-f3">說明</div>
                    <div class="f-f2">範例</div>
                    <div class="f-f1">結果</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>==</em></div>
                    <div class="f-f3">相等於，檢查兩個值是否相等，不嚴格區分數據類型。</div>
                    <div class="f-f2">let a = 5;<br>let b = "5";<br>console.log(a == b);</div>
                    <div class="f-f1">true</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>===</em></div>
                    <div class="f-f3">嚴格相等於，不僅檢查兩個值是否相等，同時也要求資料型別必須相同。</div>
                    <div class="f-f2">let a = 5;<br>let b = "5";<br>console.log(a === b);</div>
                    <div class="f-f1">false</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>!=</em></div>
                    <div class="f-f3">不等於，檢查兩個值是否不相等，不嚴格區分數據類型。</div>
                    <div class="f-f2">let a = 5;<br>let b = "5";<br>console.log(a != b);</div>
                    <div class="f-f1">false</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>!==</em></div>
                    <div class="f-f3">嚴格不等於，不僅檢查兩個值是否相等，同時也要求資料型別必須不相同。</div>
                    <div class="f-f2">let a = 5;<br>let b = "5";<br>console.log(a !== b);</div>
                    <div class="f-f1">true</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>&gt;</em></div>
                    <div class="f-f3">大於。</div>
                    <div class="f-f2">let a = 5;<br>let b = 3;<br>console.log(a &gt; b);</div>
                    <div class="f-f1">true</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>&gt;=</em></div>
                    <div class="f-f3">大於等於。</div>
                    <div class="f-f2">let a = 5;<br>let b = 3;<br>console.log(a &gt;= b);</div>
                    <div class="f-f1">true</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>&lt;</em></div>
                    <div class="f-f3">小於。</div>
                    <div class="f-f2">let a = 5;<br>let b = 3;<br>console.log(a &lt; b);</div>
                    <div class="f-f1">false</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>&lt;=</em></div>
                    <div class="f-f3">小於等於。</div>
                    <div class="f-f2">let a = 5;<br>let b = 3;<br>console.log(a &lt;= b);</div>
                    <div class="f-f1">false</div>
                </div>
            </div>
        </div>
        <p><br></p>

    </div>
    <div class="text-block" id="act5">
        <h2>五、三元運算子（Ternary operator）</h2>
        <p>「三元運算子」（Ternary Operator）亦可稱為條件運算子（Conditional Operator），從名字不難看出與條件式有關，事實上此運算子的確也常被用來當作條件式（<em>if</em>）的簡潔寫法。據 <a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator" target="_blank">MDN Web Docs</a> 文件所示，條件運算子的基礎語法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">condition ? exprIfTrue : exprIfFalse</code></pre>
        </div>
        <p><em>condition</em> 為條件的表達式。若表達式的值為 <em>true</em>，則執行 <em>exprIfTrue</em>；反之若為 <em>false</em>，則執行 <em>exprIfFalse</em>。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var status = (score >= 60) ? "及格" : "不及格";</code></pre>
        </div>
        <p>上述條件式意思為「變數 <em>score</em> 的值若大於等於 <em>60</em>，則回傳 <em>true</em>（及格）的結果；若小於 <em>60</em>，則回傳 <em>false</em>（不及格）」。</p>
        <p>實際練習：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var score = 61;
var status = (score >= 60) ? "及格" : "不及格";
console.log(status);    // 及格</code></pre>
        </div>
        <p>在條件運算子敘述裡，條件表達式的括號可以被省略。而若將此條件運算子「還原」成條件式，可見語法如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var score = 61;
var status;
if(score >= 60){
    status = "及格"
}
else {
    status = "不及格"
}
console.log(status);    // 及格</code></pre>
        </div>
        <p>還原成熟悉的條件式之後，就不禁產生聯想──我們在開發網頁寫條件式的時候，往往不會只有一個「非 A 即 B」的條件，通常要加入複數的 <em>else if</em> 以滿足多重條件的函式，以下先舉一段條件鏈：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var age = 35;
var status;
if (age >= 30 && age &lt; 40) {
    status = '我三十而立';
} else if (age >= 41 && age &lt; 50) {
    status = '我四十而不惑';
} else if (age >= 51 && age &lt; 60) {
    status = '我五十而知天命';
} else if (age >= 61) {
    status = '我六十以上';
} else {
    status = '我未滿三十';
}
console.log(status);    // 我三十而立</code></pre>
        </div>
        <p>接著我們來看如何將它們簡化成條件運算子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var age = 35;
var status =
    (age >= 30 && age &lt; 40) ? "我三十而立" :
    (age >= 41 && age &lt; 50) ? "我四十而不惑" :
    (age >= 51 && age &lt; 60) ? "我五十而知天命" :
    (age >= 61) ? "我六十以上" :
    "我未滿三十";
console.log(status);    // 我三十而立</code></pre>
        </div>
    </div>
    <div class="text-block" id="act6">
        <h2>六、運算子的優先級</h2>
        <p>基礎數學運算中流傳一句琅琅上口的箴言：「先乘除後加減」，此句句中的先與後實際上就是優先順序的概念，而 JavaScript 運算子也不例外，我們稱為「運算子優先序」（Operator precedence），它決定運算子彼此之間被語法解析的方式，優先序較高的運算子會成為優先序較低運算子的運算元（operands）。怎麼說呢？且看以下範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(3 + 4 * 5);    // 23</code></pre>
        </div>
        <p>本範例裡，<em>4 * 5</em> 會優先被執行，得出結果為 <em>20</em>，然後這個數字變成為運算元，提供給 <em>+</em> 運算子繼續運算，最終得出 <em>23</em> 的結果。</p>
        <p>再來看另一個比較和一般數學不太一樣的例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(3 * 4 ** 2);    // 48</code></pre>
        </div>
        <p>兩個 <em>*</em> 符號表示「次方」的概念，其優先序又更甚於單一相乘運算符，因此 <em>4 ** 2</em> 會先被計算，得 <em>16</em>，接著再執行 <em>3 * 16</em>，輸出結果為 <em>48</em>。</p>
        <p>除了運算子優先序概念外，程式還需要考慮另外一種狀況──當優先序相同的時候，誰先該被執行？這種情況在 JavaScript 中稱為「相依性」（Associativity），表示當運算子優先序相同時，則以相依性來決定運算方向，方向分為「左相依性」（Left-associativity），即處理順序為從左至右，反之從右至左執行運算的則稱為「右相依性」（right-associativity）。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">a = b = 3;</code></pre>
        </div>
        <p>直覺反應下，我們會說 a 等於 b，b 等於 3，所以 a 也等於 3。可是根據 JavaScript 的定義，指定運算子（Assign operators）歸類為「右相依性」，因此是從右至左給值，站在程式語言角度正確解讀應該是 b 被設定為 3，接著 a 也被設定為 3。</p>
        <p>我們可以透過下方分數表瞭解 JavaScript 運算子的優先序與相依性，分數從最高 19 分至最低 1 分：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">優先性<br>Precedence</div>
                    <div class="f-f3">運算子名稱<br>Operator type</div>
                    <div class="f-f1">相依性<br>Associativity</div>
                    <div class="f-f2">運算子<br>Individual operators</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">19</div>
                    <div class="f-f3">分組運算子（Grouping operator）</div>
                    <div class="f-f1">無</div>
                    <div class="f-f2"><em>( … )</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">18</div>
                    <div class="f-f3">Member Access</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… . …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">18</div>
                    <div class="f-f3">Computed Member Access</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… [ … ]</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">18</div>
                    <div class="f-f3">new 運算子（new operator）</div>
                    <div class="f-f1">無</div>
                    <div class="f-f2"><em>new … ( … )</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">18</div>
                    <div class="f-f3">呼叫函式</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… ( … )</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">18</div>
                    <div class="f-f3">可選串連運算子（Optional chaining）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>?.</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">17</div>
                    <div class="f-f3">new 運算子（new operator）</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>new …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">16</div>
                    <div class="f-f3">字尾遞增與遞減</div>
                    <div class="f-f1">無</div>
                    <div class="f-f2"><em>… ++</em><br><em>… --</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">15</div>
                    <div class="f-f3">字首遞增與遞減</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>++ …</em><br><em>-- …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">15</div>
                    <div class="f-f3">一元運算子（Unary operators）</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>! …</em><br><em>~ …</em><br><em>+ …</em><br><em>- …</em><br><em>typeof …</em><br><em>void …</em><br><em>delete …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">15</div>
                    <div class="f-f3">await 運算子</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>await …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">14</div>
                    <div class="f-f3">指數運算子（Exponentiation）</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>… ** …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">13</div>
                    <div class="f-f3">算術運算子（Arithmetic operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… * …</em><br><em>… / …</em><br><em>… % …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">12</div>
                    <div class="f-f3">算術運算子（Arithmetic operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… + …</em><br><em>… - …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">11</div>
                    <div class="f-f3">位元運算子（Bitwise operator）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… &lt;&lt; …</em><br><em>… &gt;&gt; …</em><br><em>… &lt;&lt;&lt; …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">10</div>
                    <div class="f-f3">比較運算子（Comparison operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… &gt; …</em><br><em>… &gt;= …</em><br><em>… &lt; …</em><br><em>… &lt;= …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">10</div>
                    <div class="f-f3">in</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… in …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">10</div>
                    <div class="f-f3">instanceof</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… instanceof …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">9</div>
                    <div class="f-f3">比較運算子（Comparison operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… == …</em><br><em>… != …</em><br><em>… === …</em><br><em>… !== …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">8</div>
                    <div class="f-f3">指定運算子（Assign operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… & …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">7</div>
                    <div class="f-f3">指定運算子（Assign operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… ^ …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">6</div>
                    <div class="f-f3">指定運算子（Assign operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… | …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">5</div>
                    <div class="f-f3">邏輯運算子（Logical operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… && …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">4</div>
                    <div class="f-f3">邏輯運算子（Logical operators）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… || …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">4</div>
                    <div class="f-f3">空值合併運算子（Nullish coalescing operator）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… ?? …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">3</div>
                    <div class="f-f3">條件運算子（Conditional operator）</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>… ? … : …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">2</div>
                    <div class="f-f3">指定運算子（Assign operators）</div>
                    <div class="f-f1">從右至左</div>
                    <div class="f-f2"><em>… = …</em><br><em>… += …</em><br><em>… -= …</em><br><em>… **= …</em><br><em>… *= …</em><br><em>… /= …</em><br><em>… %= …</em><br><em>… &lt;&lt;= …</em><br><em>… &gt;&gt;= …</em><br><em>… &gt;&gt;&gt;= …</em><br><em>… &= …</em><br><em>… ^= …</em><br><em>… |= …</em><br><em>… &&= …</em><br><em>… ||= …</em><br><em>… ??= …</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1">1</div>
                    <div class="f-f3">逗點運算子（Comma operator）</div>
                    <div class="f-f1">從左至右</div>
                    <div class="f-f2"><em>… , …</em></div>
                </div>
            </div>
        </div>
        <p>回到先乘除後加減這句話，假設我們希望算式中的加減或部分算式能先被執行，則會使用「括號」，括號內的算式就會先計算出結果，然後再繼續做其他運算。程式語言也是相同的道理，所以在上表中我們會看到滿分 19 分的最高優先序正是分組運算子。</p>
    </div>
    <div class="text-block" id="act7">
        <h2>七、總結</h2>
        <p>回顧本篇文章，精簡總結一下我們從運算子與運算式身上學到哪些東西：</p>
        <h5>1. 運算式</h5>
        <ul>
            <li>亦稱「表達式」（Expression）。</li>
            <li>通常指的是一個計算且返回值的程式碼片段。</li>
            <li>也可以是值、變數、運算子的組合，也可以是一個函式調用。</li>
            <li>運算式一般都會返回值。</li>
        </ul>
        <h5>2. 運算子</h5>
        <ul>
            <li>一元運算子，只要有一個運算元即可。例如：<em>++3</em>。</li>
            <li>二元運算子，需要具備兩個運算元才能成立。例如：<em>3 + 5</em>。</li>
            <li>三元運算子，即條件運算子。例如：<em>var status = (score >= 60) ? "及格" : "不及格";</em>。</li>
        </ul>
        <h5>3. 運算子優先級</h5>
        <ul>
            <li>運算子優先級決定運算子被使用於運算元的先後順序。</li>
            <li>相同優先序的運算子則以相依性決定運算方向，相依性又可分為由左至右及由右至左。</li>
            <li>最高分為分組運算子，也就是用「括號」符號表示的運算子，其內的運算式將會強制優先執行。</li>
            <li>最低分為逗點運算子。</li>
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
                    <div class="f-f1">Concatenation</div>
                    <div class="f-f1">字串連結 / 字串串接 / 字串拼接</div>
                    <div class="f-f3">當我們將兩個或多個字串合併在一起時，就稱之為字串連結或者拼接。例如使用加號運算子來執行字串連結操作。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Destructuring</div>
                    <div class="f-f1">解構賦值</div>
                    <div class="f-f3">當我們從數組或對象中提取數據並將其賦值給變量時，就是在使用解構賦值。它允許我們從複合數據類型中按需提取數據，使得代碼更加簡潔和易讀。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act8">
        <h2>八、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://hackmd.io/@F8_ZGXr0SHWEX7aKUyrU9w/BJVrhtIbO" target="_blank">Javascript 第三章 運算元和運算子</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_operators" target="_blank">mdn web docs 運算式與運算子</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table" target="_blank">mdn web docs 運算子優先序</a></dd>
            <dd><a href="https://www.itread01.com/content/1548882731.html" target="_blank">淺談js“三元表示式” （三元運算子）</a></dd>
            <dd><a href="https://medium.com/@kyokyox2/js-%E4%B8%89%E5%85%83%E9%81%8B%E7%AE%97%E7%AC%A6-%E4%B8%89%E5%85%83%E9%81%8B%E7%AE%97%E5%80%BC-3987be9623a5" target="_blank">[Js] 三元運算符 / 三元運算值</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10265881" target="_blank">D2 - 先生 幫您帶位元運算子</a></dd>
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