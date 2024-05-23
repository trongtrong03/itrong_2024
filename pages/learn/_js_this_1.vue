<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、JavaScript 的繼承機制' },
        { id: 2, title: '二、constructor 與 prototype' },
        { id: 3, title: '三、this 關鍵字' },
        { id: 4, title: '四、總結' },
        { id: 5, title: '五、框架語言的差異' },
        { id: 6, title: '六、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="56" fileType="learnList" />
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
        <p>在電腦程式語言的世界中，<em>this</em> 通常用來參照當前執行上下文中的物件或實例（instance）。其主要作用是允許開發者在函式或方法裡訪問和操作該物件的屬性與方法。這個關鍵字的具體作用和行為方式可能略有不同，主要取決於所使用的程式語言。</p>
        <p>譬如 C# 或 C++，<em>this</em> 用於在類別的方法內引用類別自身的成員，以區分類別成員和相同名稱的參數或局部變數。又或者像 Java、Python 等物件導向程式語言，<em>this</em> 用於在類別中引用「當前」實例（物件）的屬性和方法，這有助於區分實例變數和類別變數，並確保正確訪問實例特有的資訊。</p>
        <p>然而，<em>this</em> 到了 JavaScript 反而變成複雜的存在，因為我們能在任何地方存取到它，基本取決於函式式如何被調用的，它用於訪問當前函式執行的上下文，可能是全局物件（當在全局作用域中調用函式時）、調用該函式的物件（當作為方法調用時），又或者透過 <em>.call()</em>、<em>.apply()</em> 等方式，這些不同的調用方式導致 <em>this</em> 的行為在不同情況下可能會有所不同，最終指向不同的對象或值。</p>
        <p>總而言之，本篇文章的主題將要來探討 JavaScript 的 <em>this</em> 用法，雖說如此，但要真正了解它之前，我們可能還需要先認識 JavaScript 物件導向及原型鏈等概念，才能更容易地幫助我們理解 JavaScript 複雜的 <em>this</em> 機制。廢話不多說，以下進入正題。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>JavaScript 開發者 Brendan Eich 在一開始設計這個程式語言的時候，只是想要一個簡單的程式操作可以處理瀏覽器與網頁之間互動的需求，對一個簡易的程式語言來說，並不太需要「繼承」機制。所謂的「繼承」，指的是程式語言中，允許一個類別（或物件）繼承另一個類別（或物件）的特性，包括屬性和方法。這種繼承機制使得開發者可以重用現有的程式碼，並建立層次結構，以更有效地組織和管理程式碼。</p>
        <p>不過由於當時的時空背景 1994 年正處於物件導向編程（object-oriented programming，OOP）最興盛的時期，而繼承則是物件導向編程中很重要的一項概念，作為所有數據類型都是「物件」（object）的 Javascript 而言，這一點與 JAVA 十分相似，但 JAVA 是典型的物件導向編程語言，其所有程式都是在建立在「類別」（class）與「物件」（object）概念之上，Javascript 也必須有一套機制將所有物件聯繫起來，所以，Brendan Eich 最終還是選擇在 Javascript 設計繼承的概念。</p>
        <p>Brendan Eich 在設計階段時候，考慮到 C++ 與 JAVA 都是使用 <em>new</em> 的命令來生成實例，舉例來說，這是 C++ 實例的創建方法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-cpp">ClassName *object = new ClassName(param);</code></pre>
        </div>
        <p>JAVA 則是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-java">Foo foo = new Foo();</code></pre>
        </div>
        <blockquote>
            <p>在 Java 中，實例（instance）通常指的是類別（class）的一個具體對象（object）。當你創建一個類別的物件時，你實際上創建了這個類別的一個實例。</p>
            <p>例如，如果有一個名為「Animal」的類別，你可以創建該類別的多個實例，每個實例代表不同的動物個體。每個「Animal」實例都有自己的屬性（例如品種、顏色）和方法（例如奔跑、停止、站立）。</p>
        </blockquote>
        <p>因此，Brendan Eich 便將 <em>new</em> 命令也引入到了 Javascript，用來讓原形對象物件建立新的實例對象。然而，Javascript 並沒有類別（class）的概念，這是 Brendan Eich 當初並沒有考慮在 Javascript 引用類別概念而遺留的鍋，興許是他當時只將 Javascript 定位在一個簡單的程式語言，不想徒增初學者入門難度之緣故。總而言之，沒有「類別」的概念，要如何表示原型對象呢？</p>
        <p>Brendan Eich 從 C++ 與 JAVA 使用 <em>new</em> 命令時會調用類別建構函式（constructor）獲得靈感，他將其做簡化設計，讓 Javascript 在建立新的物件時，<em>new</em> 後面跟的不是類別，而是建構函式。例如我們現在建立一個名稱為「Animal」的建構函式，用來表示該物件原型：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}</code></pre>
        </div>
        <p>所謂的建構函式，其實就是一個普通的函式，只不過其內部使用了 <em>this</em> 關鍵字，當我們對建構函式使用 <em>new</em> 就能建立新的實例，並且經由 <em>this</em> 將變數綁定在實例物件身上。</p>
        <p>在這個原型物件建構函式中，我們的「Animal」建構函式接受了一個名為 <em>name</em>的參數，並將其賦值給 <em>this.name</em>屬性。</p>
        <p>我們可以透過 <em>new</em> 建立新的實例，而他的原型對象就是「Animal」：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = new Animal("阿比");

console.log(dog.name);   // 阿比</code></pre>
        </div>
        <p>當我們使用 <em>new</em> 關鍵字創建新的實例時，它實際上執行了以下操作：</p>
        <ol>
            <li>建立一個新的空物件。</li>
            <li>將新物件的內部屬性 [[Prototype]] 設置為建構函式的原型物件，此為實現繼承的機制。</li>
            <li>執行建構函式裡的程式碼，此時其內部的關鍵字 <em>this</em> 指向新建立的空物件。</li>
            <li>返回新創建的物件。</li>
        </ol>
        <p>綜觀上述流程，可以歸納出 <em>this.name</em> 的設置將會影響新建立對象的 <em>name</em> 屬性，因此 <em>dog.name</em> 的值等於「阿比」。</p>
        <p><br></p>
        <p>只不過用建構函式建立實例物件有一個缺點，那就是無法共享屬性和方法。例如我們在原型物件中建立一個共有屬性 <em>color</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
    this.color = "白色";
}</code></pre>
        </div>
        <p>然後我們新建立兩個實例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = new Animal("阿比");
var cat = new Animal("咪咪");</code></pre>
        </div>
        <p>雖然繼承同一個原型物件，不過這兩個新實例的 <em>color</em> 屬性是獨立的，修改其中一個實例的值，並不會影響另一個：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = new Animal("阿比");
var cat = new Animal("咪咪");

dog.color = "黑色";

console.log(dog.color);    // 黑色
console.log(cat.color);    // 白色</code></pre>
        </div>
        <p>這意味著每一個創建的實例物件，都有自己屬性和方法的副本，不僅無法做到資料共享，也會造成資源上的浪費，因為每建立一個新的實例，就必須為那些重複的屬性或方法，多佔用一些記憶體空間。有鑑於此狀況，Brendan Eich 決定為建構函式設置一個名為 <em>prototype</em> 屬性，這個屬性是每個函式都具有的特殊屬性，允許我們添加屬性或方法到建構函式的原型物件上，從而使這些屬性、方法能夠被該建構函式所創建的物件繼承。新的實例物件一旦被創建，都將會自動引用 <em>prototype</em> 裡定義的屬性與方法，換句話說，就是讓那些重複的屬性或方法，在記憶體中只建立一次，然後讓所有實例物件都指向它。</p>
        <p>說這麼多還是直接看例子比較好理解，我們將前一個範例以 <em>prototype</em> 進行改寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };

var dog = new Animal("阿比");
var cat = new Animal("咪咪");

console.log(dog.color);    // 白色
console.log(cat.color);    // 白色</code></pre>
        </div>
        <p>現在 <em>color</em> 屬性已經放在 <em>prototype</em> 物件之中，是後續其他新創建的實例所共享的，如果這時我們更改了 <em>prototype</em> 物件裡面 <em>color</em> 的值，其他實例的值也會同時進行變更：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Animal.prototype.color = "黃色";

console.log(dog.color);    // 黃色
console.log(cat.color);    // 黃色</code></pre>
        </div>
        <p>當我們將屬性與方法定義在建構函式的 <em>prototype</em> 物件中，這意味著它們只會被保存一次，而不若最原先將共用屬性建立在原型物件的作法，會讓新建立的實例都複製一次共用的屬性，這種作法的好處可以減少記憶體的佔用，特別是在我們需要建立很大量的共用物件的時候。</p>
        <p>總結來說，由於所有實例物件共享同一個 <em>prototype</em> 物件，那麼在外界眼裡，<em>prototype</em> 物件彷彿就像這些實例物件的原型，乍看之下實例物件就好像「繼承」了 <em>prototype</em> 物件裡的屬性與方法，這就是 JavaScript 繼承機制的設計思想。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}</code></pre>
        </div>
        <p>這是前一個章節，我們用來定義動物原型物件的建構函式範例，我們可以藉此建立新的實例物件，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = new Animal("阿比");
var cat = new Animal("咪咪");

console.log(dog.name);   // 阿比
console.log(cat.name);   // 咪咪</code></pre>
        </div>
        <p>此時 <em>dog</em> 與 <em>cat</em> 都會自動含有一個 <em>constructor</em> 屬性，用來指向它們的建構函式，我們可以透過 Console 打印它們得到 <em>true</em> 的回傳結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(dog.constructor == Animal);   // true
console.log(cat.constructor == Animal);   // true</code></pre>
        </div>
        <p>如果我們建構原型物件的同時，也定義了 <em>Animal</em> 的 <em>prototype</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };</code></pre>
        </div>
        <p>然後再創建新的實例物件 <em>dog</em>、<em>cat</em>，並打印查看它們的 <em>constructor</em>，會發現得到的結果是 <em>false</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = new Animal("阿比");
var cat = new Animal("咪咪");

console.log(dog.constructor == Animal);   // false
console.log(cat.constructor == Animal);   // false</code></pre>
        </div>
        <p>這是為什麼呢？在 JavaScript 世界中，每個物件都有一個 <em>constructor</em> 屬性，它引用了建立該物件的建構函式，當我們建立新的實例物件，該物件會繼承其建構函式的 <em>prototype</em>，亦包含 <em>constructor</em> 屬性，所以當我們重新賦值給 <em>Animal.prototype</em> 為新的物件，其物件的原型鏈被更改，導致 <em>dog</em>、<em>cat</em> 的 <em>constructor</em> 不再指向 <em>Animal</em> 的建構函式，而是轉指向新物件的 <em>constructor</em> 屬性，促使 Console 回傳的結果為 <em>false</em>。</p>
        <p>若想要解決這個問題，我們可以手動恢復 <em>Animal.prototype</em> 的 <em>constructor</em>，讓它再次指向 <em>Animal</em>，這麼一來後續新建立的實例物件的 <em>constructor</em> 就會指向 <em>Animal</em> 的 <em>constructor</em> 屬性：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };
Animal.prototype.constructor = Animal;

var dog = new Animal("阿比");
var cat = new Animal("咪咪");

console.log(dog.constructor == Animal);   // true
console.log(cat.constructor == Animal);   // true</code></pre>
        </div>
        <p>此外，JavaScript 還提供一個名為 <em>instanceof</em> 的運算符，用來驗證實例物件與原型物件之間的關係，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };

var dog = new Animal("阿比");

console.log(dog.constructor == Animal);    // false
console.log(dog instanceof Animal);    // true</code></pre>
        </div>
        <p>可能這時有人就會有疑問啦，<em>constructor</em> 屬性 和 <em>instanceof</em> 運算符有什麼不一樣，為什麼平平都已經經由 <em>prototype</em> 重新賦值，前者回傳的結果為 <em>false</em>，後者則似乎沒有受到影響？關於前者的原因，前面已經解釋過所以就不再說明，而後者 <em>instanceof</em> 這個運算符主要用來檢查實例物件 <em>dog</em> 是否為 <em>Animal</em> 建構函式建立的實例，在上方程式碼裡我們可以看到 <em>dog</em> 是使用 <em>new Animal("阿比")</em> 創建的實例，因此它就是 <em>Animal</em> 建構函式的實例，故回傳的結果為 <em>true</em>。</p>
        <p><br></p>
        <h3>Prototype 模式的驗證方法：</h3>
        <p>首先是 <em>isPrototypeOf()</em> 方法，它可以用來檢查指定物件是否為另一個物件的原型：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

function Plant(name){
    this.name = name;
}

var dog = new Animal("阿比");

console.log(Animal.prototype.isPrototypeOf(dog));    // true
console.log(Plant.prototype.isPrototypeOf(dog));    // false</code></pre>
        </div>
        <p><br></p>
        <p>然後是 <em>hasOwnProperty()</em> 方法，每個實例物件都會有一個 <em>hasOwnProperty()</em> 方法，用以判斷該實例物件中的指定屬性，是否為該實例本身自有的，又或者是繼承自 <em>prototype</em> 原型物件的屬性。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };

var dog = new Animal("阿比");

console.log(dog.hasOwnProperty("name"));    // true
console.log(dog.hasOwnProperty("color"));    // false</code></pre>
        </div>
        <p>第一個 <em>hasOwnProperty("name")</em> 不難理解，因為 <em>dog</em> 實例是透過建構函式 <em>Animal</em> 創建的，<em>name</em> 確實是本身具有的屬性，但 <em>color</em> 屬性是在 <em>Animal.prototype</em> 裡定義的，<em>dog</em> 只是繼承該屬性，並非原本自有的，因此檢查的回傳結果為 <em>false</em>。</p>
        <p>管它是繼承還是本身自有的屬性，如果不想要這麼麻煩，我們可以直接使用 <em>in</em> 運算符來做判斷，那麼不管是 <em>name</em> 還是 <em>color</em>，所得到的打印結果皆為 <em>true</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name){
    this.name = name;
}

Animal.prototype = { color: "白色" };

var dog = new Animal("阿比");

console.log("name" in dog);    // true
console.log("color" in dog);    // true</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>在先前的範例過程中，我們用了很多次 <em>this</em>，它是 JavaScript 的其中一個關鍵字，與其它程式語言相比，JavaScript 的 <em>this</em> 相對複雜許多，根據其在不同的上下文，可能具有不同的值，總體來說可分為以下四種情況：</p>
        <p><br></p>
        <h3>1. 單純函式調用：</h3>
        <p>這是函式最常見的用法，屬於全域式調用，因此 <em>this</em> 在這個情境下代表全域物件，這在瀏覽器環境中大多指的是 <em>window</em>，舉一個例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var dog = "阿比";
function Animal(){
    console.log(this.dog);
}

Animal();    // 阿比</code></pre>
        </div>
        <p>因為我們直接在全局作用域直接調用了 <em>Animal</em> 函式，這時函式定義裡的 <em>this.dog</em> 實際上等同 <em>window.dog</em>，假如全域上下文中存在名叫 <em>dog</em> 的變數，那麼 Console 將會得到該變數的值，也就是「阿比」。</p>
        <p><br></p>
        <h3>2. 作為物件方法的調用：</h3>
        <p>函式也可以包裝成特定物件的方法，這時 <em>this</em> 就是指該特定物件的上級物件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    console.log(this.name);
}

var dog = {};
dog.name = "阿比";
dog.x = Animal;

dog.x();     // 阿比</code></pre>
        </div>
        <p>在範例中，函式 <em>Animal</em> 被賦值給 <em>obj</em> 物件的屬性 <em>x</em>，通過 <em>obj.x()</em> 的方式來調用 <em>Animal</em> 函式。在這種情況下，<em>this</em> 在 <em>Animal</em> 函式內部指向 <em>obj</em>，因為它是 <em>x</em> 方法所屬的物件。</p>
        <p>所以當我們調用 <em>obj.x()</em> 時，<em>this.dog</em> 指的就是 <em>obj.dog</em>，輸出結果為「阿比」，這就是上級物件的意思。</p>
        <p><br></p>
        <h3>3. 作為建構函式調用：</h3>
        <p>這個用法就是前面介紹 <em>prototype</em> 時所舉的建構函式範例，透過建構函式可以建立新的實例物件，這時 <em>this</em> 指的就是這個新的物件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(){
    this.name = "阿比";
}

var dog = new Animal();
console.log(dog.name);    // 阿比</code></pre>
        </div>
        <p>乍看之下這裡使用的 <em>this</em> 似乎和第一種全局作用域的用法有些神似，為了證明這時的 <em>this</em> 指向不是全域物件，我們針對以上範例做一些改寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var name = "咪咪";
function Animal(){
    this.name = "阿比";
}

var dog = new Animal();
console.log(dog.name);    // 阿比</code></pre>
        </div>
        <p>會發現即便在全局作用域先定義好 <em>name</em> 的變數，<em>this</em> 最終打印出來的結果仍然指向建構函式裡的物件。</p>
        <p><br></p>
        <h3>4. apply 调用：</h3>
        <p><em>apply()</em> 是函式中的一個方法，其功用是改變函式的調用對象，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var name = "咪咪";
function Animal(){
    console.log(this.name);
}

var dog = {};
dog.name = "阿比";
dog.x = Animal;
dog.x.apply();    // 咪咪</code></pre>
        </div>
        <p>如果沒有在 <em>apply()</em> 括號內填入參數，那麼它預設調用的對象會是全域物件，這時建構函式 <em>Animal</em> 裡頭的 <em>this</em> 將調用全局作用域中宣告的 <em>name</em> 變數，得到「咪咪」的結果。但如果我們在括號內填入 <em>dog</em>，<em>this</em> 得到的結果將會是「阿比」：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var name = "咪咪";
function Animal(){
    console.log(this.name);
}

var dog = {};
dog.name = "阿比";
dog.x = Animal;
dog.x.apply(dog);    // 阿比</code></pre>
        </div>
        <p>與 <em>apply()</em> 相似的還有 <em>call()</em>，兩者皆是 JavaScript 中用於調用函式的方法，主要差別在於傳參數的方式不同。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>雖然在文章前面有提過，JavaScript 作為一個定位在處理簡單需求的程式語言，並沒有導入 JAVA、C++ 這類 OOP 物件導向編程擁有類別的概念，不過到了 ES6 版本，JavaScript 新增了許多特性和語法糖，類別（Class）便是其中之一，除此之外 ES6 版本裡還引進了「箭頭函式」，它和 Class 都為 JavaScript 複雜的 <em>this</em> 用法帶來了些許變化。</p>
        <p><br></p>
        <h3>箭頭函式（Arrow Functions）：</h3>
        <p>ES6 出現的箭頭函式提供比過往函式書寫方式更簡潔的語法，傳統的函式寫法通常會長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(a, b) {
    return a + b;
}</code></pre>
        </div>
        <p>換成箭頭函式的格式則會變成這個樣子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const add = (a, b) => a + b;</code></pre>
        </div>
        <p>主要是省略了 <em>function</em> 關鍵字以及第一個大括號，使得程式碼整體看起來變得緊湊、簡潔。至於 <em>this</em> 的部分，由於箭頭函式本身沒有 <em>this</em>，如果在其內部使用 <em>this</em>，它將會繼承外部作用域的 <em>this</em> 值，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const Animal = {
    name: "阿比",
    obj: function() {
        const dog = () => {
            console.log(this.name);
        }
        dog();
    }
};

Animal.obj(); // 阿比</code></pre>
        </div>
        <p>由此可得知箭頭函式內部的 <em>this</em> 始終繼承包含它的外部作用域，而非創建自己的 <em>this</em>，而傳統函式的 <em>this</em> 值則是取決於程式執行時的調用方式，但整體來說箭頭函式的 <em>this</em> 規則跟以往並沒有太大不同，當我們直接調用 <em>obj()</em>，得到的結果會是 <em>undefined</em>，也就是指向全域物件。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const obj = Animal.obj;
obj();    // undefined</code></pre>
        </div>
        <p><br></p>
        <h3>類別（Class）：</h3>
        <p>ES6 引入類別（Class）的概念，使得類別中的方法可以直接被宣告，而不再需要透過 <em>function</em> 建構函式來定義。舉例來說，這是前面已經看到膩的傳統建構函式的語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function Animal(name) {
    this.name = name;
}

Animal.prototype.sayHello = function() {
    console.log(this.name);
}

var dog = new Animal("阿比");
dog.sayHello.apply(dog);</code></pre>
        </div>
        <p>使用 ES6 <em>class</em> 關鍵字的語法將會是這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">class Animal {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(this.name);
    }
}
const dog = new Animal("阿比");
dog.sayHello();    // 阿比</code></pre>
        </div>
        <p>在類別（Class）中定義的方法會直接綁定到實例上，所以我們可以不用透過 <em>apply()</em>、<em>call()</em>、<em>bind()</em> 等方法明確綁定 <em>this</em>，大大簡化原本繁瑣的程式書寫過程。當然，無論是箭頭函式還是 <em>class</em>，這篇文章提到的內容僅僅不過是冰山一角，主要還是圍繞 <em>this</em> 關鍵字做基本探討，有關語法糖的詳細內容留至其他文章再行筆記。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>隨著技術發展，基於 JavaScript 開發的框架語言也越來越繁多，從早期為人所熟知的 jQuery，到現今十分熱門的 React、Vue 等，它們不僅使 JavaScript 變得更容易上手使用，也補足、解決一些 JavaScript 比較為人詬病的一些問題沉痾，其中自然也包括了 <em>this</em> 的用法。以下就來說明一些目前比較熱門的框架語言，其針對原生 JavaScript 複雜的 <em>this</em> 關鍵字，做出什麼樣的應對，讓開發者可以更直觀地去使用它。</p>
        <p><br></p>
        <h3>jQuery：</h3>
        <p>jQuery 主要簡化了 DOM 的操作，在 jQuery 中，<em>this</em> 通常表示目前正在處理的 DOM 元素，當我們透過 jQuery 選擇器選擇一或多個元素，並對這些元素執行操作時，其內部使用的 <em>this</em> 會引用這些元素。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$("button").click(function() {
    $(this).hide();   // 隱藏被點擊的按鈕
});</code></pre>
        </div>
        <p>範例中的 <em>this</em> 會指向被點擊的 <em>button</em> 按鈕元素。</p>
        <p><br></p>
        <h3>Vue：</h3>
        <p>Vue 主要用途在於建構使用者介面，在 Vue 組件中使用的 <em>this</em>，通常指向當前的實例，我們可以在組件的方法（methods）或生命週期鉤子函式中使用 <em>this</em> 來訪問組件的屬性與方法。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">new Vue({
    data: {
        message: "Hello, Vue!"
    },
    methods: {
        showMessage: function() {
            alert(this.message); // 訪問組件的數據
        }
    }
});</code></pre>
        </div>
        <p>在這個範例中，<em>this</em> 指向 Vue 實例，允許其訪問 <em>message</em> 數據與 <em>showMessage</em> 方法。</p>
        <p><br></p>
        <h3>React：</h3>
        <p>React 的 <em>this</em> 主要用在類組件裡，類組件裡的 <em>this</em> 指向目前組件的實例，可用來訪問組件的狀態與屬性。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            &lt;div&gt;
                &lt;p&gt;Count: {this.state.count}&lt;/p&gt;
                &lt;button onClick={this.handleClick.bind(this)}&gt;Increment&lt;/button&gt;
            &lt;/div&gt;
        );
    }
}
</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <dl>
            <dd><a href="https://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html" target="_blank">Javascript继承机制的设计思想</a></dd>
            <dd><a href="https://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html" target="_blank">Javascript 的 this 用法</a></dd>
            <dd><a href="https://github.com/aszx87410/blog/issues/18" target="_blank">該來理解 JavaScript 的原型鍊了</a></dd>
            <dd><a href="https://blog.techbridge.cc/2019/02/23/javascript-this/" target="_blank">淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂</a></dd>
            <dd><a href="https://javascript.alphacamp.co/basic-idea-of-oo.html" target="_blank">物件導向基本觀念</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>