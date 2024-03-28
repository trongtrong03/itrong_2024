<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="49" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、什麼是物件？</a></li>
            <li><a href="#act2">二、如何建立物件？</a></li>
            <li><a href="#act3">三、存取物件裡的屬性</a></li>
            <li><a href="#act4">四、刪除物件裡的屬性</a></li>
            <li><a href="#act5">五、更新物件裡的屬性</a></li>
            <li><a href="#act6">六、總結</a></li>
            <li><a href="#act7">七、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>如果你正在學習或曾經學習過 JavaScript，也許或多或少聽說過一個說法：「JavaScript 裡的東西都是『物件』。」雖說這不是百分百正確的論述，因為部分基本資料型別以及特殊值就不屬於物件的一種，例如字串、數字、布林值...（資料型別）等，或是 <em>NaN</em>、<em>Infinity</em>...這類特殊符號。僅管如此，我們仍可以透過這句話窺探 JavaScript 這門程式語言的內在，從諸如字串與陣列的核心功能、到以 JavaScript 建構的瀏覽器 API，大部分語法都可算是物件。言簡意賅地說 JavaScript 便是一門「物件導向」（Object-Oriented；OO）本質的程式語言。</p>
        <p>那麼，究竟物件是什麼？物件主要在做些什麼？而我們該如何使用物件？本篇的主題就來聊聊關於 JavaScript 物件的點點滴滴。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、什麼是物件？</h2>
        <p>想像一下，當你置身在一處場景，眼前有一輛汽車，還有一棟旅館，而旅館的背後則種植了好幾棵樹。如果今天建構這個場景的造物主是我們，那麼汽車、房屋，還有樹木，便通通都是我們建立的不同種類的物件（Object），站在程式語言的角度，這些物件則各自代表不同類型（Type）的實體（Instance）。每個物件皆有自己的三大組成成份，分別是：</p>
        <ul>
            <li>特性（Properties）</li>
            <li>事件（Events）</li>
            <li>方法（Methods）</li>
        </ul>
        <h3>特性（Properties）：</h3>
        <p>用來表示物件的特徵，例如汽車會有自己的品牌、型號、顏色......等，甚至我們也可以自行為車子改裝增加獨特風格，以上這些特徵都是該物件的特性。</p>
        <p>每個特性都有其名稱（Name）以及匹配的值（Value），譬如品牌（名稱）是豐田（值）、顏色（名稱）為白色（值），這些配對都能為汽車（物件實體）提供詳細的資訊，藉由這些訊息，我們可以清楚地瞭解該車輛大大小小內容。</p>
        <p>像這樣名稱與值匹配的組合在程式語言中非常常見，就拿網頁設計另外兩種核心語言 HTML 及 CSS 來說，HTML 各個元素標籤裡的屬性，如 <em>&lt;a&gt;</em> 中的 <em>herf</em> 屬性，需要給予網址名稱使其具有意義，又譬如 CSS，我們定義類別選擇器（Class）時會添加各式各樣的樣式屬性，例如 <em>color</em> 表示顏色名稱，然後匹配 <em>blue</em> 或 <em>#FFFFFF</em> 之類的值給它。</p>
        <p><br></p>
        <h3>事件（Events）：</h3>
        <p>使用者與物件之間發生互動，並改變物件的特性值，這個過程就是「事件」。例如踩下汽車的油門踏板，車輛就會加速前進；反之踩踏煞車踏板，汽車就會減速。同樣地，程式設計也是要讓電腦在面對使用者給予不同狀況時立即作出相對應的反應，譬如點擊網頁上的連結，就能開啟指定的連結頁面。</p>
        <p><br></p>
        <h3>方法（Methods）：</h3>
        <p>實現使用者與物件之間互動的方式就叫做方法，它們可以擷取或更新物件的特性值，例如踩油門或剎車時，汽車的速度會增加或減少，這名為「速度」特性的值增減的程式敘述便可以定義為一個方法。又比如有客人向旅館詢問是否還有空房，為了回答這個問題，我們需要建立一個方法，即將房間總數扣掉已訂房的數量，便能得到剩餘的空房數量。</p>
        <p><br></p>
        <p>綜上所述，我們以行駛中的汽車代入程式語言的表述方式：</p>
        <p>物件類型為汽車，它其中一個特性名稱為 <em>currentSpeed</em>，匹配的值是 <em>60mph</em>，表示該車輛目前時速。車內的駕駛人可以透過 <em>brake</em> 與 <em>accelerate</em> 事件定義的行為，令車輛減速或加速。當事件觸發時，呼叫 <em>changeSpeed()</em> 方法，來增加或減少──也就是更新 <em>currentSpeed</em> 特性值。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、如何建立物件？</h2>
        <p>複習一下先前第一篇主題「變數」文章裡所整理的資料型別表格：</p>
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
        <p>藉由表格可以得知物件也是變數資料型別的其中一種，在 JavaScript 裡，一個基礎型別可以是一個數字、布林值或字串，但物件可能是由一個空值或一群屬性（property）組合而成的複雜型態資料。建立物件的方式分為兩種宣告方法：</p>
        <p><br></p>
        <h3>1. 物件實字（Object Literal）：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var obj = {};</code></pre>
        </div>
        <p>這種物件宣告方式很簡單也很好懂，就是單純用一對大括號（或稱花括號）指定給變數名稱，宣告該變數資料型別為物件。說是這樣說，但要如何客觀地確定它是物件？我們可以用瀏覽器的開發工具 Console 它，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {};
console.log(car);    // [object Object]</code></pre>
        </div>
        <p>或是用 <em>typeof</em> 運算子確認資料型別也可以：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {};
console.log(typeof car);    // object</code></pre>
        </div>
        <p>至於空物件的值為什麼會用 <em>[object Object]</em> 的形式表示，這種格式的產生其實是因為 JavaScript 將物件的資料型別與預設字符串結合起來的結果，前面的 <em>object</em> 是默認字符串的值，後面的 <em>Object</em> 則表示該變數的資料型別為物件。</p>
        <p>回到範例，雖然我們定義了名為 <em>car</em> 的物件，但此刻它仍只是一個空物件而已，通常物件裡會存放一些該物件的屬性，就像一輛車子會存在許多資料，例如廠牌、型號、顏色...等，這些資料即為該車輛（物件）的屬性。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016
};</code></pre>
        </div>
        <p>每一條屬性皆是由名稱及值的組成，如果物件裡存在多條屬性，則每條屬性之間以逗號區隔。值可以放入任何型別的資料，當然也包含物件，這時整體看起來宛如 Sass 的巢狀結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016,
    price: {
        LE: 895000,
        XLE: 959000,
        Limited: 1069000
    }
};</code></pre>
        </div>
        <p><br></p>
        <h3>2. 物件建構式（Object Constructor）：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var obj = new Object();</code></pre>
        </div>
        <p>用 <em>new</em> 關鍵字加上 <em>Object()</em> 也能建立一個型別為物件的變數，不過實務上來說這種宣告物件變數的方式較第一個方法來得少見，除了語法相對來說比較冗長外，某些情況下利用物件建構式宣告的物件還可能隱藏一些問題，因為 <em>new Object()</em> 預期會建立一個新的物件，假使傳入 <em>()</em> 的值是別種資料型別，它也依然可以運作。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var num = new Object(3);
console.log(num);   // 3
console.log(typeof num);    // object</code></pre>
        </div>
        <p>乍看似乎沒有什麼異樣，如果接著往下看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(num + 1);    // 4
console.log(num == 3);   // true 
console.log(num === 3);  // false</code></pre>
        </div>
        <p>注意到了嗎？明明 <em>num</em> 的資料型別判定為物件，它卻可以和數字 <em>1</em> 相加得到 <em>4</em> 的運算結果，如果我們一開始期望建立的東西是物件，那麼它應該要被轉換為字串，得到 <em>31</em> 這個字串與數字拼接的結果。</p>
        <p>至於物件實字的宣告方式就不會發生上述情況，因為使用 <em>{ }</em> 是無法直接傳入參數來建立物件的，必須添加屬性才能儲存我們要傳入的值。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、存取物件裡的屬性</h2>
        <p>如果要存取物件裡的屬性，主要有兩種方法：</p>
        <p><br></p>
        <h3>1. 點記法（Dot notation）：</h3>
        <p>以上個章節的範例為例，如果我們要索取該車輛物件 <em>car</em> 的「品牌」屬性（<em>brand</em>），那麼我們只需 <em>car.brand</em> 這樣寫即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016,
    price: {
        LE: 895000,
        XLE: 959000,
        Limited: 1069000
    }
};

console.log(car.brand);    // TOYOTA
console.log(car.price.XLE);    // 959000</code></pre>
        </div>
        <p>假如我們要取得的屬性並沒有在物件裡面，則會得到 <em>undefined</em>，表示這個屬性不存在於 <em>car</em> 物件裡面，再者我們若嘗試去取得不存在的屬性裡面的子屬性，則程式將會報錯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(car.country);    // undefined
console.log(car.country.flag);    // Uncaught TypeError: Cannot read properties of undefined</code></pre>
        </div>
        <p>之所以引發 Uncaught TypeError 錯誤，是因為 <em>country</em> 已經返回了 <em>undefined</em>，所以當我們繼續訪問 <em>flag</em> 這個子屬性，實際上是在嘗試訪問 <em>undefined</em>，而 <em>undefined</em> 屬於基本資料型別之一，本身並不具有任何屬性，所以才會回吐類型錯誤的報錯訊息。</p>
        <p><br></p>
        <h3>2. 括弧記法（Bracket notation）：</h3>
        <p>這種方式或許沒有點記法來得那麼常見，但括弧記法可以突破一些點記法難以取值上的限制。括弧記法方式則是使用中括號，注意中括號裡的屬性名稱需要用單或雙引號囊括起來，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016,
    price: {
        LE: 895000,
        XLE: 959000,
        Limited: 1069000
    }
};

console.log(car["brand"]);    // TOYOTA
console.log(car["price"]["XLE"]);    // 959000</code></pre>
        </div>
        <p>另外補充一個前面點記法沒說到的內容，那就是如何呼叫物件裡的函式，假如我們要取得物件裡頭的函式如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var obj = {
    demo: function(){
        console.log("Hello!");
    }
};</code></pre>
        </div>
        <p>點記法與括弧記法的取用方式分別為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">obj.demo();    // Hello!
obj["demo"]();    // Hello!</code></pre>
        </div>
        <p><br></p>
        <p>雖然括弧記法結構上較點記法來得沒那麼直覺，但前面有提過，括弧記法可以突破點記法一些難以取值的限制，例如：</p>
        <h4>1. 其他基本資料型別的賦值、取值：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {};

car[3] = "This number is 3";
car.3 = "This number is 3";

console.log(car[3]);    // This number is 3
console.log(car.3);    // Uncaught SyntaxError: Unexpected number</code></pre>
        </div>
        <p>這比較容易理解，使用點記法訪問物件的屬性名稱必須是有效的標識符命名格式，而範例中的純數字，或以數字開頭、名稱包含連字號 <em>-</em>、空格，又或者使用 JavaScript 內建的關鍵字及保留字，都屬於無效的命名。不過對括弧記法而言就沒有這方面的限制，因為括號中的內容會被視為運算式（Expression），即便內容只是很單純的數字，也依然有效。</p>
        <p><br></p>
        <h4>2. 用變數賦值、取值：</h4>
        <p>如果使用的是點記法，物件屬性匹配的值必須是直接指定的，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    carName: "C-HR"
};

console.log(car.carName);    // C-HR</code></pre>
        </div>
        <p>這個範例裡，<em>carName</em> 屬性名稱明確指定為「C-HR」，所以 Console <em>car.carName</em> 可以正確地輸出 C-HR 這個結果。然而，當我們將 <em>carName</em> 設定成變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var carName = "name";
var car = {
    name: "C-HR"
};

console.log(car.carName);    // undefined</code></pre>
        </div>
        <p>這時點記法會因為 <em>car</em> 物件中裡面查找不到 <em>carName</em> 這個屬性名稱，所以只能輸出 <em>undefined</em>，但如果用括弧記法就不一樣了：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var carName = "name";
var car = {
    name: "C-HR"
};

console.log(car[carName]);    // C-HR</code></pre>
        </div>
        <p>括弧記法允許我們使用變數中儲存的屬性名，<em>car[carName]</em> 實際上指的就是 <em>car["name"]</em>，這個 <em>name</em> 又被指定給我們宣告的變數 <em>carName</em>，所以通過括弧技法我們能順利地取得「C-HR」這個屬性值。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、刪除物件裡的屬性</h2>
        <p>倘如要刪除物件裡的屬性，我們可以使用 <em>delete</em> 關鍵字，具體操作方式為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">delete object.property;</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016,
};

delete car.name;
delete car.color;
delete car.year;

console.log(car);    // { "brand": "TOYOTA" }</code></pre>
        </div>
        <p>最後 <em>car</em> 物件裡的屬性便只剩下 <em>brand</em> 一條而已。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、更新物件裡的屬性</h2>
        <p>前面的章節主要闡述如何索取物件裡已經宣告的屬性，而我們也可以另外賦值以更新原本的屬性值。方法很簡單，請看下例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {
    brand: "TOYOTA",
    name: "C-HR",
    color: "red",
    year: 2016,
};

car.name = "VIOS";

console.log(car);    // VIOS</code></pre>
        </div>
        <p>當然，更新物件屬性值也不僅只局限於更新現有屬性或函式的數值，我們也可以在物件外部建立全新的屬性或函式給該物件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var car = {};
car.currentSpeed = function(){
    console.log("Now speed is 60 mph!")
}

car.currentSpeed();   // Now speed is 60 mph!</code></pre>
        </div>
        <p><br></p>
        <p>以上是 JavaScript 物件的基本知識與使用語法介紹，但這些僅僅還只是皮毛，繼續深入窺探會發現它底下是非常巨大的深坑，畢竟 JavaScript 本身就是一個「物件導向」本質的程式語言。進一步窺探會發現還有「物件原型」（Prototype）、「原型繼承」（Prototypal inheritance）、「執行環境」（This）...等和物件息息相關的概念需要認識、學習，這些東西幾乎都需要單獨開篇幅來詳細記述，所以就留待後續再繼續做文章筆記囉。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、總結</h2>
        <p>回顧本篇文章，精簡總結一下我們從物件基礎身上學到哪些東西：</p>
        <h5>1. 物件的組成</h5>
        <ul>
            <li>特性（Properties）：用來表示物件的特徵，語法由屬性名稱與值組成。</li>
            <li>事件（Events）：與使用者發生互動，並改變物件的特性值。</li>
            <li>方法（Methods）：用來實現使用者與物件之間互動的方式。</li>
        </ul>
        <h5>2. 建立物件的兩種方式</h5>
        <ul>
            <li>物件實字（Object Literal）：用一對大括號 <em>{ }</em> 表示。</li>
            <li>物件建構式（Object Constructor）：透過 <em>new Object()</em> 宣告變數為物件，但這個方式比較少見。</li>
        </ul>
        <h5>3. 存取物件屬性的兩種方式</h5>
        <ul>
            <li>點記法（Dot notation）：透過 <em>.</em> 運算子取得指定的物件屬性。</li>
            <li>括弧記法（Bracket notation）：透過方括號 <em>[ ]</em> 取得指定的物件屬性。</li>
            <li>點記法比較常見，但括弧記法可以突破一些前者無法取值的限制，例如獲取其他資料型別的值，或者變數。</li>
        </ul>
        <h5>4. 刪除或更新物件屬性</h5>
        <ul>
            <li>刪除物件裡的屬性用 <em>delete</em> 關鍵字。</li>
            <li>我們可以在宣告物件變數之外的地方直接更新物件裡的屬性值。</li>
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
                    <div class="f-f1">Object-Oriented</div>
                    <div class="f-f1">物件導向</div>
                    <div class="f-f3">或稱 Object-Oriented Programming，簡稱 OOP，指的是以物件為中心，將資料和各種操作方法封裝在物件裡面，透過與物件之間的互動來實現程式功能。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act7">
        <h2>七、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://www.fooish.com/javascript/object.html" target="_blank">JavaScript Object (物件)</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10193605" target="_blank">JavaScript - 物件 與 屬性</a></dd>
            <dd><a href="https://wcc723.github.io/javascript/2017/12/09/javascript-object/" target="_blank">JavaScript 就是一堆物件的概念</a></dd>
            <dd><a href="https://www.casper.tw/development/2020/09/21/js-object/" target="_blank">JS 物件名詞解釋及常見觀念問題</a></dd>
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