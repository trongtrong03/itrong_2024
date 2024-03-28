<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="46" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、如何定義函式？</a></li>
            <li><a href="#act2">二、如何傳入參數？</a></li>
            <li><a href="#act3">三、調用方法有哪些？</a></li>
            <li><a href="#act4">四、return 是什麼？</a></li>
            <li><a href="#act5">五、parameters 與 arguments</a></li>
            <li><a href="#act6">六、總結</a></li>
            <li><a href="#act7">七、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <blockquote>
            <p>A JavaScript function is a block of code designed to perform a particular task.</p>
            <p><br></p>
            <p>A JavaScript function is executed when "something" invokes it (calls it).</p>
        </blockquote>
        <p>以上原文引述 <a href="https://www.w3schools.com/js/js_functions.asp" target="_blank">w3schools</a> 對 JavaScript「函式」一詞的描述，意指「函式是一段被設計用來執行特定任務的程式碼區塊，當『某事』調用（invokes）它時，該函式就會被執行」。</p>
        <p>若要用日常生活的例子來形容，假設今天我們養了一條名字叫阿比的狗，每天都需要執行餵食、帶出去散步、幫忙鏟屎、擼毛...等事情，我們興許會用「照顧阿比」來統納這一連串的動作。站在 JavaScript 角度來看，「照顧阿比」這整個過程就可以稱為一個函式，其函式名稱就叫做「照顧阿比」，而餵食、散步、鏟屎等例行事項就是函式裡面要執行的程式，當我們安排每天行程表（某事）的時候，或是當別人問我們每天都在做些什麼事情（某事）的時候，便可以直接用「照顧阿比」來簡述（調用），而不用鉅細靡遺地把所有細項都寫出來，這就是函式的目的，也是它的好處──簡化程式碼，而且也能重複被調用。</p>
        <p>當然函式也沒有這麼單純，從定義到方法，還有傳入的參數、調用...等等，有很多東西值得深入探討，本篇文章主題將著重於函式各項知識及運用的詳細記錄。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、如何定義函式？</h2>
        <p>部份聰明的人或許已經從前言列舉的「照顧阿比」範例中推敲出 JavaScript 為什麼會需要函式來處理程式腳本，不過在這個章節還是詳細說明一下。在哲宇老師的 JavaScript 教程曾經說過，程式開發者寫程式時應該避免以下三件事情：「重複相同程式碼」、「無規劃 / 命名陳述目的」、「無法重複使用」。這些不好的撰寫方式都會導致程式執行效率不佳或帶來維護不易的麻煩，舉例來說：</p>
        <figure>
            <img src="/images/learn/js/learn-function-1.jpg">
        </figure>
        <p>上方的範例示意圖裡存在三塊相同的重複程式碼（黑色方塊），當有一天需要針對某部份（紅色方塊）進行修改時，就得重複三次相同的作業流程。如果只有寥寥數行可能不覺得有什麼，假如修改範圍多達數十行，又或者其重複使用的地方很多，勢必需要投注大量的時間成本在同樣的事情上。然而，如果我們能將這些重複的程式碼「獨立」出來，使其可以被統一集中管理，並將它模組化，那麼就可以避免重複編寫一樣的程式，同時又可以在不同的程式碼功能重複呼叫它，大幅度增加程式的效能與易讀性。實現此一理想的方法，JavaScript 稱之為「函式」。</p>
        <figure>
            <img src="/images/learn/js/learn-function-2.jpg">
            <figcaption>利用函式來處理重複使用的程式碼。</figcaption>
        </figure>
        <p>了解函式在 JavaScript 扮演的角色與好處，我們該如何定義函式？其實 JavaScript 提供好幾種函式定義的方式，最基本而言可分成三種：</p>
        <ul>
            <li>Function Declaration</li>
            <li>Function Constructor</li>
            <li>Function Expression</li>
        </ul>
        <p>除了這三類之外，另外還有立即函式與箭頭函式這些比較特別的用法，後續會一併進行介紹。</p>
        <p><br></p>
        <h3>函式宣告式（Function Declaration）：</h3>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function myAnimal() {
    console.log("阿比是一隻狗");
}</code></pre>
        </div>
        <p>函式宣告式算是最常見的函式定義方式，其結構由關鍵字 <em>function</em> 與自定義的函式名稱（myAnimal）組成，名稱後方須加上小括號 <em>()</em>，小括號的作用是用來存放我們指定給函式的「參數」（至於參數是什麼留到後面再提），即使我們定義的函式沒有要傳入參數，小括號也依然是 JavaScript 定義函式規則的一部分，不能被省略。而像這類有定義名稱的函式，通常也被稱為「具名函式」（Named Function）。</p>
        <p>負責執行工作的程式敘述句則放置於程式區段內，也就是由大括號 <em>{ }</em> 包含的範圍。如此一來，一個可以被重複使用的函式便誕生了。宣告完函式後，我們只要直接調用函式名稱就能執行函式大括號內的所有敘述句。如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 宣告函式
function myAnimal() {
    console.log("阿比是一隻狗");
}

// 呼叫函式
myAnimal();</code></pre>
        </div>
        <p>在上一篇講述變數的文章裡曾提到「提升」（Hoisting）概念，除了變數，函式也同樣會被提升，因此呼叫函式的 <em>myAnimal();</em> 若要寫在定義之前也是可以的。</p>
        <p><br></p>
        <blockquote class="is-question">
            <p>既然有具名函式，那是否也存在不具名函式？</p>
        </blockquote>
        <p>這個問題的答案為：是。所謂的不具名，就是定義函式的時候，僅宣告 <em>function</em> 關鍵字，而沒有給該函式名稱，只是鮮少人會用「不具名函式」來稱呼，大多數人會將這類沒有命名的函式叫做「匿名函式」（Anonymous Function）。以下舉一個匿名函式的寫法範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function() {
    console.log("阿比是一隻狗");
}</code></pre>
        </div>
        <p>如果此刻你正在練習，你應該會發現如果照著範例刻程式然後丟到瀏覽器測試，開發者模式會回吐 <b>Uncaught SyntaxError: Function statements require a function name.</b> 的錯誤警告，它的意思是該函式的程式敘述句需要一個函式名稱，這是因為匿名函式通常不能單獨運行，主要都是在變數或其他函式之中進行定義。</p>
        <p>匿名函式的用途相當廣泛，譬如要創建「閉包」（Closure）就會需要它，這是基於匿名函式作用域近似區域變數作用域範圍的特性，匿名函式一旦執行完畢，儲存在記憶體裡的變數就會立即被釋放（銷毀），而不會像全域變數那樣繼續佔據記憶體空間，匿名函式一方面可節省記憶體空間，又可避免函式全域命名衝突的問題。</p>
        <p>關於匿名函式與閉包的觀念就先暫時打住，後面章節會再單獨探討它。</p>
        <p><br></p>
        <h3>函式表達式（Function Expression）：</h3>
        <p>也有人稱為「函式陳述式」，它的結構和函式宣告式相仿，主要差別在於這個方式是用變數來宣告一個函式。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = function() {
    console.log("阿比是一隻狗");
}

dog();    // 呼叫函式</code></pre>
        </div>
        <p>透過變數宣告的函式，也是可以再另外給該函式進行命名，使其成為具名函式，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = function myAnimal() {
    console.log("阿比是一隻狗");
}</code></pre>
        </div>
        <p>這種結構我們稱為「具名函式表達式」（Named Function Expression），這種函式的好處是我們可以在該函式的內部調用該函式，或許你會對這句話產生存疑，在函式內又呼叫該函式？那豈不是無限迴圈了嗎？沒錯，具名函式表達式的確在迴圈程式需求中有著相當大的作用，因為迴圈函式需要在函式內部多次調用自己以解決問題。例如使用具名函式表達式來實現計算一個正整數的階乘的迴圈函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var factorial = function calculateFactorial(n) {
    // 基本條件：當 n 為 0 或 1 時，階乘為 1
    if (n === 0 || n === 1) {
        return 1;
    } else {
        // 迴圈條件：n 的階乘等於 n 乘以 (n - 1) 的階乘
        return n * calculateFactorial(n - 1);
    }
};

// 使用迴圈計算 5 的階乘
var result = factorial(5);    // 120</code></pre>
        </div>
        <p>以下逐步拆解它的迴圈進程：</p>
        <ol>
            <li>
                呼叫 factorial(5)：
                <ul>
                    <li>n 等於 5，不符合基本條件，所以進入迴圈條件</li>
                    <li>calculateFactorial(5) 返回 5 * calculateFactorial(4)</li>
                </ul>
            </li>
            <li>
                遞迴調用 calculateFactorial(4)：
                <ul>
                    <li>n 等於 4，不符合基本條件，所以進入迴圈條件</li>
                    <li>calculateFactorial(4) 返回 4 * calculateFactorial(3)</li>
                </ul>
            </li>
            <li>
                遞迴調用 calculateFactorial(3)：
                <ul>
                    <li>n 等於 3，不符合基本條件，所以進入迴圈條件</li>
                    <li>calculateFactorial(3) 返回 3 * calculateFactorial(2)</li>
                </ul>
            </li>
            <li>
                遞迴調用 calculateFactorial(2)：
                <ul>
                    <li>n 等於 2，不符合基本條件，所以進入迴圈條件</li>
                    <li>calculateFactorial(2) 返回 2 * calculateFactorial(1)</li>
                </ul>
            </li>
            <li>
                遞迴調用 calculateFactorial(1)：
                <ul>
                    <li>n 等於 1，符合基本條件，返回 1</li>
                </ul>
            </li>
            <li>
                返回 calculateFactorial(2)：
                <ul>
                    <li>calculateFactorial(2) 返回 2 * 1，即 2。</li>
                </ul>
            </li>
            <li>
                返回 calculateFactorial(3)：
                <ul>
                    <li>calculateFactorial(3) 返回 3 * 2，即 6。</li>
                </ul>
            </li>
            <li>
                返回 calculateFactorial(4)：
                <ul>
                    <li>calculateFactorial(4) 返回 4 * 6，即 24。</li>
                </ul>
            </li>
            <li>
                返回 calculateFactorial(5)：
                <ul>
                    <li>calculateFactorial(5) 返回 5 * 24，即 120。</li>
                </ul>
            </li>
        </ol>
        <p><br></p>
        <p>回到上個範例，我們用變數「dog」宣告了一個名稱為「myAnimal」的函式，試問：</p>
        <ol>
            <li>這個函式要叫做 dog 還是 myAnimal？</li>
            <li>如果要透過變數名稱呼叫函式，為什麼還要為函式命名？</li>
        </ol>
        <p>關於第一個問題，此函式的名稱依然叫做「myAnimal」，只是在函式之外我們必須通過「dog」才能呼叫 / 存取到它。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = function myAnimal() {
    console.log("阿比是一隻狗");
}

dog();    // 阿比是一隻狗</code></pre>
        </div>
        <p>至於第二個問題，匿名函式或許能解決你的疑問。</p>
        <p><br></p>
        <h3>函式建構式（Function Constructor）：</h3>
        <p>從結論上來說，函式建構式這種寫法不常被使用到，大部份人定義函式的時候仍以函式宣告式或表達式為大宗，如果要說什麼情況比較會需要使用它，那主要大概是基於「動態性」或「彈性」的考量。動態性指的是有「動態生成函式」及「動態生成正規表達式（Regular Expression，regex）」的需求，例如允許使用者自訂程式腳本或模板引擎；「彈性」則是指「以字串形式接收函式程式碼」，譬如我們需要從外部來源（例如：使用者輸入的內容、API 響應...）接收程式碼時，函式建構式允許我們將程式碼以字串形式接收並執行它。</p>
        <p>函式建構式的結構如下例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var addNumber = new Function('a', 'b', 'return a + b');

var result = addNumber(5, 10);    // 15</code></pre>
        </div>
        <p>這個例子中，「addNumber」是一個使用函式構造式動態創建的函式，它接受「a」、「b」這兩個參數，然後返回它們的總和。</p>
        <p>然而，同樣的程式功能，函式宣告式和函式表達式同樣也能做到：</p>
        <p>函式宣告式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function addNumber(a, b) {
    return a + b;
}

var result = addNumber(5, 10);    // 15</code></pre>
        </div>
        <p>函式表達式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var addNumber = function(a, b) {
    return a + b;
};

var result = addNumber(5, 10);    // 15</code></pre>
        </div>
        <p>在程式閱讀上明顯比函式建構式來的容易理解，所以多數人在面對類似程式需求的時候，比起建構式更傾向用另外兩種定義方式來撰寫程式。此外，雖說「彈性」是函式建構式的蜜糖，卻也是毒藥。在允許使用者輸入資料的情況下，函式建構式允許「以字串形式接收函式程式碼」，意味著有心人士可以藉此輸入帶有惡意的程式碼字串，進而引發安全性問題。</p>
        <p><br></p>
        <h3>立即函式（Immediately Invoked Function Expression，IIFE）：</h3>
        <p>前面介紹的幾種函式寫法，基本上都需要定義或宣告前後，再透過呼叫才能執行函式，而立即函式的特性，允許我們在定義函式後就立刻被執行。</p>
        <p>它的語法架構有兩種，分別是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function(){
    // code
}());</code></pre>
        </div>
        <p>以及</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function(){
    // code
})();</code></pre>
        </div>
        <p>仔細看會發現兩者的不同主要是最後面表示執行程式的小括號位置，通常第一種寫法佔大多數。</p>
        <p>立即函式同樣分成具名與不具名兩種格式，前面的語法結構屬於不具名寫法，具名的話則是在 <em>function</em> 關鍵字後方加上函式的名稱：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function dog(){
    console.log("阿比");    // 阿比
})();</code></pre>
        </div>
        <p>立即函式除了有著「立即執行」的特行外，它還有另一種特性是「無法在函式外再次被執行」，透過上例我們在函式之外呼叫「dog」，得到的結果將會是「Uncaught ReferenceError: dog is not defined.」</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function dog(){
    console.log("阿比");    // 阿比
})();

dog();    // Uncaught ReferenceError: dog is not defined.</code></pre>
        </div>
        <p>無法在函式外再次被執行的好處就是可以創建一個局部作用域，避免全局作用域的變數值造成全域變數的汙染。那麼立即函式通常用在什麼場合？一是前面提到的隔離作用域避免變數汙染；二是模組化程式碼，立即函式可以用來創建簡單的模組，將相關的變數和函式封裝在一個單一的作用域中，並且不會與其他部分的程式碼發生衝突。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var myModule = (function() {
    var privateVar = 'I am private';

    function privateFunction() {
        console.log('This is a private function');
    }

    return {
        publicVar: 'I am public',
        publicFunction: function() {
            console.log('This is a public function');
        }
    };
})();

console.log(myModule.publicVar);
myModule.publicFunction();

// privateVar 和 privateFunction 在這裡不可見
</code></pre>
        </div>
        <p>除此之外，也正是立即函式具有隔離作用域與函式外部無法再次被執行的特性，因此亦可以有效防止變數提升機制可能導致的意外問題。</p>
        <p>總結一下立即函式的優點：</p>
        <ul>
            <li>隔離作用域避免全域變數汙染。</li>
            <li>避免變數命名衝突與變數提升可能導致的問題。</li>
            <li>模組化程式碼。</li>
            <li>提高程式碼執行效率。</li>
        </ul>
        <p>乍看很美好，但現實是立即函式也並非如此完美無瑕，它存在這些缺點：</p>
        <ul>
            <li>不利於重複使用。</li>
            <li>程式碼不易維護。</li>
            <li>增加程式碼複雜度。</li>
        </ul>
        <blockquote class="is-info">
            <p>自 ES6 推出 <em>let</em> 與 <em>const</em> 變數宣告關鍵字及模組化系統的普及，立即函式能做到的事情開始有其他方式可以替代，因此立即函式使用時機也逐漸減少。</p>
        </blockquote>
        <p><br></p>
        <h3>箭頭函式（Arrow Function）：</h3>
        <p>箭頭函式是 ES6 版本新增的一種函式表現方式，其最大特色在於省略掉了 <em>function</em> 關鍵字，改由「箭頭」替代。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = () => {
    console.log("阿比");
}
dog();    // 阿比</code></pre>
        </div>
        <p>當然，這只是最基本且顯而易見的部分，假如有使用到 <em>return</em> 且程式只有一行，那麼 <em>return</em> 和大括號 <em>{}</em> 都可以省略。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var sum = (n) => {
    return n + 1;
}
console.log(sum(5));    // 6</code></pre>
        </div>
        <p>可以簡化成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var sum = (n) => n + 1;
console.log(sum(5));    // 6</code></pre>
        </div>
        <p>除了看起來更簡潔之外，箭頭函式還有許多和傳統函式不一樣之處，但不在本篇文章主題的討論範疇內，故不著墨太多，以下是箭頭函式整體歸納的特點：</p>
        <ul>
            <li>語法不同、更簡潔。</li>
            <li>沒有自己的 <em>this</em>，也無法直接修改 <em>this</em> 的指向。</li>
            <li>沒有自己的 <em>arguments</em></li>
            <li>不能作為構造函式使用。</li>
        </ul>
    </div>
    <div class="text-block" id="act2">
        <h2>二、如何傳入參數？</h2>
        <p>以下先列舉一則模擬情境──有間主打彩繪手機殼的商店，提供顧客客製化彩繪的服務，依據上門顧客提供的樣本，來產出符合顧客需求的彩繪手機殼，此乃店家接單製作的標準作業流程。假如今天要用 JavaScript 表示，我們可以將「從接收訂單到將成品提交給顧客」這一連串的過程寫成函式，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function 訂單() {
    接收顧客需求;
    進行手機殼彩繪作業;
    將手機殼交給顧客;
}

訂單();
訂單();
...
訂單();</code></pre>
        </div>
        <p>看完後相信你多少有察覺到不對勁──是的，儘管函式可以允許我們在不同的程式碼區域重複呼叫並執行其內部的程式碼，但並非所有顧客的需求都一樣，也許有的顧客主題是花卉、寵物、動漫...等，這種情況下，我們需要為函式代入一個參數（parameter），此參數用來傳遞顧客客製化訂單的需求。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function 訂單(參數) {
    接收顧客 參數 需求;
    進行手機殼彩繪作業;
    將手機殼交給顧客;
}

訂單(羽蝶蘭);
訂單(我愛一條柴);
...
訂單(初音未來);</code></pre>
        </div>
        <p>如此一來，就能在不同區域呼叫函式時，傳入各別的參數值給函式執行程式。</p>
        <p>看完文字舉例，我們將中文敘述轉換成程式碼，看看函式是如何表示的，此處我們以計算區域平面面積的公式為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function getArea(width, height) {
    return width * height;
}</code></pre>
        </div>
        <p>此函式範例要展示的重點有二，一是要表達 <em>width</em>、<em>height</em> 為參數，其在函式中使用方式視同變數的概念。二則是函式設定的傳遞參數可不止一個。當我們要呼叫這個函式時，會在呼叫它的小括號內傳入要使用的值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">getArea(30, 60);    // 1800</code></pre>
        </div>
        <p>於函式呼叫的小括弧內傳入的值，我們稱之為「引數」，它們可以用「數值」或「變數」的方式進行傳遞。數值的部分如同上方的範例，而變數傳遞的方式如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">itemW = 30;
itemH = 60;
getArea(itemW, itemH);    // 1800</code></pre>
        </div>
        <p>由此可見，函式呼叫裡的值不一定要是確定的數值，透過變數傳遞至對應的參數也能完成相同的工作。</p>
        <p><br></p>
        <p>認識函式參數是什麼之後，我們再來看看各種函式宣告方式的參數傳入如何寫：</p>
        <h3>函式宣告式：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name) {
    console.log(name);
}
dog("阿比");    // 阿比</code></pre>
        </div>
        <p><br></p>
        <h3>函式表達式：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = function(name) {
    console.log(name);
}
dog("阿比");     // 阿比</code></pre>
        </div>
        <p><br></p>
        <h3>函式建構式：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var addNumber = new Function('a', 'b', 'return a + b');
var result = addNumber(5, 10);
console.log(result);     // 15</code></pre>
        </div>
        <p><br></p>
        <h3>立即函式：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function dog(name){
    console.log(name);
})("阿比");    // 阿比</code></pre>
        </div>
        <p><br></p>
        <h3>箭頭函式：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = (name) => {
    console.log(name);
}
dog("阿比");    // 阿比</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、調用方法有哪些？</h2>
        <p>在第一個章節的練習中，我們已經知道函式定義完成後，必須在其前或後方添加該函式的名稱，方能執行函式裡的內容，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog() {
    console.log("阿比");
}
dog();    // 阿比</code></pre>
        </div>
        <p>這個操作就叫「調用」（Invoke），也有人稱之「呼叫」（Callback，或翻譯成「回調」），雖然原文用詞不同，但其實描述的是相同之行為，若要鉅細靡遺地述說兩者差異，Invoke 比較像是主張人正在引導程式執行該函式，當我們調用一個函式時，實際上在主動請求該函式執行；Callback 則是站在程式語言的角度來看，且通常用在將一個函式作為參數傳遞給另一個函式的時候，前者會在後者執行的過程中被調用，所以大多是在程式執行異步操作、事件處理的場合，這時被傳遞的函式就可被稱為「回調函式」，因為它會在特定事件或條件發生時被呼叫執行。</p>
        <p>JavaScript 存在多種調用方式：</p>
        <h3>1. 直接調用：</h3>
        <p>最常見也是最直觀簡單的語法，即前面範例多次使用到的方式，呼叫函式名稱且在後方加上小括號，要傳入的參數則放在小括號裡面。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog() {
    console.log("阿比");
}
dog();    // 阿比</code></pre>
        </div>
        <p><br></p>
        <h3>2. 方法調用：</h3>
        <p>函式作為物件的方法被調用。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = {
    name: "阿比",
    printName: function() {
        console.log(this.name);
    }
};

dog.printName();    // 阿比
</code></pre>
        </div>
        <p><br></p>
        <h3>3. 遞迴調用：</h3>
        <p>在函式內部調用函式自己，也就是前面介紹「具名函式表達式」時提到的「迴圈函式」。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var factorial = function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * calculateFactorial(n - 1);
    }
};

var result = factorial(5);    // 120</code></pre>
        </div>
        <p><br></p>
        <h3>4. apply 與 call：</h3>
        <p><em>apply</em>、<em>call</em>，另外還有個 <em>bind</em>（可能還得再算上 <em>curry</em>），這幾者是有些相似但各自還是存在區別的 JavaScript 方法，它們主要與 <em>this</em> 指向有關，需要另外單獨一篇文章來詳細記錄，故此處就不多做敘述，姑且知道一下它們也是函式調用的方式之一即可。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name) {
    console.log(name);
}

dog.call(null, "阿比");    // 阿比
dog.apply(null, ["阿比"]);    // 阿比</code></pre>
        </div>
        <p><br></p>
        <h3>5. 在 HTML 標籤調用：</h3>
        <p>透過 HTML 元素標籤去調用函式。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;a href="javascript:函式名稱()"&gt;&lt;/a&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、return 是什麼？</h2>
        <p><em>return</em> 是 JavaScript 內建的關鍵字之一，我們很常在函式裡面看到它的蹤影。那麼，<em>return</em> 是什麼？它究竟有什麼用處？其實，<em>return</em> 的用途就如同它的字面意思，主要用來回傳函式調用後返回的值。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function calculateArea(width, height) {
    var area = width * height;
    return area;
}</code></pre>
        </div>
        <p>在 <em>calculateArea</em> 此函式中，宣告了一個名為 <em>area</em> 的變數，以儲存運算（<em>width * height</em>）的結果。<em>return</em> 是用來回傳一個值給最初呼叫此函式的程式碼，一旦 <em>return</em> 被執行，解譯器便會跳出函式，回到當初呼叫此函式的敘述句位置。</p>
        <p>範例二：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function calculateArea(width, height) {
    var area = width * height;
    return area;
}

var a = calculateArea(5, 10);
var b = calculateArea(9, 15);

console.log(a);    // 50
console.log(b);    // 135</code></pre>
        </div>
        <p>我們在這個範例分別呼叫了 <em>calculateArea</em> 函式兩次，並傳遞不同的引數給函式執行運算，接著透過 <em>return</em> 將運算結果的值回傳給我們另外宣告的變數（<em>a</em>、<em>b</em>）。</p>
        <p>在下達 <em>return</em> 的時候需要注意兩件事：</p>
        <h4>1. 只能寫在函式內，否則會報錯</h4>
        <p>錯誤範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">return "阿比";    // Uncaught SyntaxError: Illegal return statement.</code></pre>
        </div>
        <p>該錯誤訊息告訴我們在錯誤的地方使用了 <em>return</em>。</p>
        <h4>2. 與返回值之間不能換行</h4>
        <p>由於瀏覽器在解析 JavaScript 通常會自動插入敘述句結尾分號，因此 <em>return</em> 若與其回傳的值分行書寫，該值就無法被順利回傳而直接返回 <em>undefined</em>。</p>
        <p>錯誤範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(){
    return
    "阿比";
};
console.log(dog());    // undefined</code></pre>
        </div>
        <p><br></p>
        <h3>「Return 的用途不是只有如此。」</h3>
        <p>當函式讀取到 <em>return</em> 的時候，函式就會隨之中止，並回傳結果，寫在 <em>return</em> 之後的程式都不會被執行。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function calculateArea(width, height) {
    var area = width * height;
    console.log(area);
    return area;
    console.log(area);    // 不會被執行
}</code></pre>
        </div>
        <p>因此正常情況下，<em>return</em> 都會放在函式的最後。不過前面幾個範例使用 <em>return</em> 都是在有值可回傳的情境下，那如果沒有值需要回傳，單純寫一個 <em>return</em> 也可以嗎？答案是可以的，在這種情況下的 <em>return</em> 單純表示函式結束執行。看到這裡可能會產生一個疑問，不回傳值的 <em>return</em> 單純表示函式結束，那我有沒有寫它似乎都沒什麼差別？其實，在不回傳值的條件下，不管函式最後有沒有寫 <em>return</em>，函式都會回傳一個 <em>undefined</em> 的結果。這個 <em>undefined</em> 通常是無法直接看到的，但我們可以透過 Console 來打印顯現它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name) {
    console.log(name);
    return;
}

console.log(dog("阿比"));    // 阿比, undefined</code></pre>
        </div>
        <p>沒有 <em>return</em> 的打印結果也是一樣的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name) {
    console.log(name);
}

console.log(dog("阿比"));    // 阿比, undefined</code></pre>
        </div>
        <p>在一般不需要回傳值的函式有沒有 <em>return</em> 確實影響不大，即使回傳 <em>undefined</em> 也會因為函式本身不需要返回值所以不怎麼會影響到程式。而 <em>return</em> 回傳的值除了常見的數字或字串外，回傳布林值也是十分常見的用法，也就是 <em>return true</em> 與 <em>return false</em>，這兩者通常用於表示函式執行的結果是真或假的情況，譬如驗證使用者是否有在輸入欄位填寫內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function checkInput(input) {
    if (input.length > 0) {
        return true;    // 有效，返回 true
    } else {
        return false;    // 無效，返回 false
    }
}</code></pre>
        </div>
        <p>只不過 <em>if</em> 條件式本身就會回傳 <em>true</em> 及 <em>false</em>，因此上面範例又可以簡化為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function checkInput(input) {
    return input.length > 0;
}</code></pre>
        </div>
        <p>因此，實務上 <em>return true</em>、<em>return false</em> 使用的機會並不多。</p>
        <p>總結一下重點：</p>
        <ul>
            <li>只能寫在函式裡面。</li>
            <li>後面銜接的值或表達式不得換行。</li>
            <li>當程式讀取到 <em>return</em> 後就會跳出，不會繼續執行在其函式所在位置之後的程式句。</li>
            <li>一個函式可以使用多個 <em>return</em>，但只有一個會在函式執行時被執行。</li>
            <li>如果單獨使用 <em>return</em> 沒有附加值，則返回 <em>undefined</em>。</li>
        </ul>
    </div>
    <div class="text-block" id="act5">
        <h2>五、parameters 與 arguments</h2>
        <p>parameters 中文譯作「參數」，也就是我們第二章所介紹的主角，arguments 翻譯成中文同樣也叫做「參數」，但是就實際表現來看，或許用「引數」來稱呼它會更加貼切，說是這樣說，究竟兩者之間究竟存在什麼差別呢？</p>
        <p>儘管第二章已經介紹過參數（parameters）的定義和用途，但在深入認識 arguments 之前，還是得回頭補充一些 parameters 不甚詳盡的部分。首先，我們已經知道 parameters 就是我們定義函式用來傳遞值的變數，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(name, year, gender);
}
dog("阿比", 5, "公");    // 阿比, 5, 公</code></pre>
        </div>
        <p>包含上面範例，之前的例子我們都循規蹈矩，引用了參數，在調用的時候都會傳值進去，那如果現在不傳值，直接調用的話會發生什麼事？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(name, year, gender);
}
dog();    // undefined, undefined, undefined</code></pre>
        </div>
        <p>答案是得到三個 <em>undefined</em>，而非變數未定義之類的錯誤警告。之所以會這樣是因為當 JavaScript 執行函式的時候，會先將我們定義好的參數建立起記憶體位置，且賦予 <em>undefined</em> 的值給它們，這個機制就是 JavaScript Hoisting（提升）。</p>
        <p>此外，函式參數的傳入順序是由左至右，像上面範例我們定義了三個參數要傳入函式，但如果實際調用時沒有導入三個參數，函式也還是可以正常運作的，只是後面未填滿的值仍會是預設的 <em>undefined</em>。例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(name, year, gender);
}
dog("阿比", "公");    // 阿比 公 undefined</code></pre>
        </div>
        <p><br></p>
        <p>假如希望函式在沒有賦值的情況下，回傳的結果也不是 <em>undefined</em>，可行嗎？白話一點說，就是想給參數設定自定義的參數值，以方便我們每次執行該函式，對於比較頻繁出現的值就不需要一次次都得把值寫一遍。答案是可以的，不過由於這是 ES6 之後有支援其版本的瀏覽器才能這麼做，所以我們很多時候會看見別人不那麼推崇這樣的定義方式。</p>
        <p>設定參數預設值的範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender="公") {
    console.log(name, year, gender);
}

dog();    // undefined undefined 公
dog("阿比");    // 阿比 undefined 公
dog("咪咪", "母");    // 咪咪 母 公
dog("咪咪", 5, "母");    // 咪咪 5 母</code></pre>
        </div>
        <p><br></p>
        <p>補充完 parameters，接著回頭講 arguments。如果要硬啃書本文件的釋義，arguments 是一個對應傳入函式之參數的類陣列（Array-like）物件。挑明來說，arguments 其實就是該函式所有 parameters 的集合。</p>
        <p>我們直接透過例子會比較容易理解：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(arguments);    // Arguments(3) ['阿比', 5, '公', callee: ƒ, Symbol(Symbol.iterator): ƒ]
}

dog("阿比", 5, "公");</code></pre>
        </div>
        <p>可以看到我們在函式內利用 <em>arguments</em> 打印函式結果，得到的值是存放了所傳入參數的「類陣列」物件，因此才會說 <em>arguments</em> 是 <em>parameters</em> 的集合體。只是，為什麼會說 arguments 是「類陣列」呢？因為儘管 <em>arguments</em> 回傳的格式類似陣列，但它卻不能使用陣列的操作方法（例如 <em>push</em>、<em>pop</em>...等）。</p>
        <p>雖然 <em>arguments</em> 不是真正的陣列，但多數情況下，我們仍能把它當作陣列來呼叫，例如我們可以用 <em>length</em> 方法檢測儲存參數的數目：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(arguments.length);    // 3
}

dog("阿比", 5, "公");</code></pre>
        </div>
        <p>然後加入條件式判斷，如果當參數數目為 0，則回傳「請傳入參數」的打印訊息，並跳出函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(arguments.length);
    if(arguments.length === 0) {
        console.log("請傳入參數");
        return;
    }
}

dog();    // 請傳入參數</code></pre>
        </div>
        <p>既然提到 <em>length</em>，就順便說說我們也可以透過索引來訪問指定的 <em>arguments</em> 位置上的參數，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(arguments[0]);    // 阿比
}

dog("阿比", 5, "公");</code></pre>
        </div>
        <blockquote class="is-info">
            <p>索引是從 0 開始起計，因此陣列、類陣列中的第一筆資料，索引值為 0。</p>
        </blockquote>
        <p>一直在強調 <em>arguments</em> 是類陣列而不是陣列，那它的資料型別到底是什麼呢？我們可以透過 <em>typeof</em> 去查看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function dog(name, year, gender) {
    console.log(typeof arguments);    // object
}

dog("阿比", 5, "公");</code></pre>
        </div>
        <p>答案是「物件」（object）。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>JavaScript 於 ES6 版本新增了新的運算子，名叫「展開運算子」（Spread），其格式為 <em>...</em>，其用途可以將函式裡在調用時額外新增的參數，新增成為一個新的陣列。由於 <em>arguments</em> 本身可以允許函式在沒有定義參數的情況下通過它去訪問到傳遞給函式的所有參數值，展開運算子也能做到這點，所以現代大多數的寫法已以展開運算子為主流。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act6">
        <h2>六、總結</h2>
        <p>回顧本篇文章，精簡總結一下我們從函式身上學到哪些東西：</p>
        <h5>1. 函式定義方式</h5>
        <ul>
            <li>函式宣告式（Function Declaration）</li>
            <li>函式表達式（Function Expression）</li>
            <li>函式建構式（Function Constructor），此方式一般不建議使用。</li>
            <li>立即函式（Immediately Invoked Function Expression，IIFE）</li>
            <li>箭頭函式（Arrow Function）</li>
        </ul>
        <h5>2. 函式命名</h5>
        <ul>
            <li>有命名：具名函式</li>
            <li>無命名：匿名函式 / 不具名函式</li>
        </ul>
        <h5>3. 參數（parameters）</h5>
        <ul>
            <li>用來傳遞特定值給函式的變數。</li>
            <li>傳入函式的參數可以不止一個。</li>
            <li>參數也存在變數提升，預設值是 <em>undefined</em>。</li>
        </ul>
        <h5>4. 引數（arguments）</h5>
        <ul>
            <li>是一個對應傳入函式之參數的類陣列（Array-like）物件。</li>
            <li>回傳的格式類似陣列，但它卻不能使用陣列的操作方法。</li>
            <li>在 ES6 版本後，多以「展開運算子」替代用途。</li>
        </ul>
        <h5>5. 調用方法</h5>
        <ul>
            <li>直接調用</li>
            <li>方法調用</li>
            <li>遞迴調用</li>
            <li>apply 與 call</li>
            <li>在 HTML 標籤調用</li>
        </ul>
        <h5>6. return</h5>
        <ul>
            <li>主要用來回傳函式調用後返回的值。</li>
            <li>只能寫在函式內，否則會報錯。</li>
            <li>後面銜接的值或表達式不得換行。</li>
            <li>當程式讀取到 <em>return</em> 後就會跳出，不會繼續執行在其函式所在位置之後的程式句。</li>
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
                    <div class="f-f1">Function</div>
                    <div class="f-f1">函式</div>
                    <div class="f-f3">也有人稱為「函數」，是構成 Javascript 的基本要素之一，它將一系列的敘述句組合起來，以執行一項特定的工作。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Invoke</div>
                    <div class="f-f1">調用</div>
                    <div class="f-f3">比較像是主張人正在引導程式執行該函式，當我們調用一個函式時，實際上在主動請求該函式執行。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Callback</div>
                    <div class="f-f1">呼叫 / 回調</div>
                    <div class="f-f3">通常用在將一個函式作為參數傳遞給另一個函式的時候，比較像是站在程式語言的角度來稱呼。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Hoisting</div>
                    <div class="f-f1">提升</div>
                    <div class="f-f3">「提升」是 JavaScript 中的一個概念行為，指的是在程式碼執行之前，JavaScript 引擎會將變數和函式的聲明提升到它們所在作用域的頂部。這意味著我們可以在宣告之前使用這些變數和函式。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act7">
        <h2>七、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://javascript.alphacamp.co/function.html" target="_blank">JavaScript 入門指南 - Function 函式</a></dd>
            <dd><a href="https://www.explainthis.io/zh-hant/swe/what-is-iife" target="_blank">JavaScript 立即調用函式 IIFE (Immediately Invoked Function Expression) 是什麼？優缺點是什麼？</a></dd>
            <dd><a href="https://israynotarray.com/javascript/20201118/707576253/" target="_blank">JavaScript 核心觀念(36)-函式以及 This 的運作-立即函式</a></dd>
            <dd><a href="https://www.explainthis.io/zh-hant/swe/what-is-arrow-function" target="_blank">什麼是箭頭函式 (Arrow Function)？跟一般的函式有什麼差別？</a></dd>
            <dd><a href="https://medium.com/schaoss-blog/%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%A9%A6%E6%9C%80%E6%84%9B%E5%95%8F%E7%9A%84-apply-bind-call-708f57518776" target="_blank">一次搞懂前端面試最愛問的 apply、bind、call</a></dd>
            <dd><a href="https://pjchender.blogspot.com/2016/04/javascriptparameterargumentsspread.html" target="_blank">[筆記] 談談JavaScript中函式的參數(parameter),arguments和展開運算子(spread)</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10204008" target="_blank">學JS的心路歷程 Day7-函式（二） arguments</a></dd>
            <dd><a href="https://miahsuwork.medium.com/%E7%AC%AC%E5%9B%9B%E9%80%B1-javascript-%E5%87%BD%E5%BC%8F-function-5c6114de5fff" target="_blank">[第四週] JavaScript — 函式 function</a></dd>
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