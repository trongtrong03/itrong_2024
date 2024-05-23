<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、如何建立陣列？' },
        { id: 2, title: '二、陣列的屬性' },
        { id: 3, title: '三、陣列實例與原型的關係' },
        { id: 4, title: '四、總結' },
        { id: 5, title: '五、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="50" fileType="learnList" />
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
        <p>試想如果我們今天要用 JavaScript 建立一份班級名冊，每個座號對應與號碼匹配對應的學生姓名，如果程式語言還在初出茅廬的階段，直覺或許會這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var number1 = "王小明";
var number2 = "李大華";
var number3 = "張小芬";
...</code></pre>
        </div>
        <p>上面程式碼片段所展示的解答是將座號當作變數名稱，依次宣告號碼對應的同學姓名，或許當班級總人數少的情況下，可能還不覺得有什麼不方便之處。但萬一人數很多呢？又或者未來某天來了名轉學生，勢必得需要額外宣告新的變數名稱（numberN），以在名冊裡加入新同學的資料。可是當每一筆資料都單獨通過變數命名存取，在程式操作上會相當不方便（例如變數只宣告到 <em>number50</em>，我就只能存取到 <em>number50</em> 以內的變數），且不確定資料數量情況下，這種所有資料都以變數命名各自管理的模式也顯得不具彈性，更別提資源消耗之類更深入的問題了。</p>
        <p>因此，遇到這類需要建立大量資料的需求，程式設計師一般都會利用「陣列」（Array）來建立名單並執行各種操作，不僅快速方便，也比較容易維護，本篇學習筆記的主角便要來談談 JavaScript 陣列基礎的概念及操作方法。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>所謂的陣列，簡略來說是一種類似列表的物件。回首檢視在先前變數一文整理的 JavaScript 資料型別表格裡，有關物件型別的欄位內容：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">型別</div>
                    <div class="f-f1">說明</div>
                    <div class="f-f3">範例</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Object</div>
                    <div class="f-f1">物件</div>
                    <div class="f-f3"><em>[1, 2, 3]</em>、<em>{ name: 'iTrong' }</em>、<em>function foo(){}</em> ...</div>
                </div>
            </div>
        </div>
        <p>用方括號 <em>[ ]</em> 來存放同一系列的資料，範例裡的 <em>[1, 2, 3]</em> 便是陣列的表示形式，而這種方式是 JavaScript 建立陣列三種方式中最簡潔也是最常見的方式，這裡拿前言提到的班級名冊為例，完整的變數建立陣列語法為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];</code></pre>
        </div>
        <p>需要注意的是要存放在同個陣列裡的資料，每一筆皆必須以逗號 <em>,</em> 作區隔。</p>
        <p>儘管另外兩種方式比較罕見，不過為了更完整瞭解陣列原理，我們仍有必要認識一下它們的宣告方式。首先是「宣告同一個變數，用位置分割不同資料」，意思是我們可以統一用一個變數，將每一筆資料逐一分割開成獨立的位置。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [];
nameList[0] = "王小明";
nameList[1] = "李大華";
nameList[2] = "張小芬";</code></pre>
        </div>
        <p>我們可以看到 <em>[ ]</em> 裡面填入了數字，這個數字一般稱為「索引值」（index），索引值從 0 開始計算，因此第一筆資料在陣列中的索引值為 0 而不是 1。此外，陣列的資料內容是可以動態新增的，假設現有名單 50 員情境下要新增第 51 人，只需要在程式碼裡新增 <em>nameList[50]</em> 即可（索引值從 0 開始算起，所以第 51 人的在陣列中的索引值為 50）。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">nameList[50] = "林阿玉";</code></pre>
        </div>
        <p><br></p>
        <p>另一種建立方式則是使用內建的建構式 <em>new Array()</em> 來取代 <em>[ ]</em> 的用法，譬如 <em>var nameList = new Array();</em> 即表示建立一個新的空陣列變數，而陣列的資料也是以 <em>,</em> 隔開每筆資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = new Array("王小明", "李大華", "張小芬");</code></pre>
        </div>
        <p>建構式和 <em>[ ]</em> 雖然都可以用來建立陣列，但還是存在些微差別。如果陣列資料只有一筆數字，<em>[ ]</em> 會將其視為第一筆資料，而 <em>new Array()</em> 則當作表示陣列的長度（Length），舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var arr1 = [3];
var arr2 = new Array(3);

console.log(arr1);    // [3]  length: 1
console.log(arr2);    // [,,] length: 3</code></pre>
        </div>
        <p>也因為 <em>new Array()</em> 會將唯一數字參數當作陣列長度，如果數字是小數點，瀏覽器解譯時就會發生錯誤：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var arr1 = [0.3];
var arr2 = new Array(0.3);

console.log(arr1);    // [0.3]  length: 1
console.log(arr2);    // Uncaught RangeError: Invalid array length</code></pre>
        </div>
        <p><br></p>
        <p>承襲上面的範例，我們可得知存放在陣列的資料並不局限於字串，也可以是純數字，JavaScript 的陣列可以視為裝載任何資料型別的容器，故不光是字串、數字或物件，甚至還可以再放入另一個陣列，也就是「多維陣列」：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", ["張小芬", "阿芬", "芬仔"]];</code></pre>
        </div>
        <p><br></p>
        <p>再來，我們可以建立其他變數來取得陣列裡某個指定的值，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var person = nameList[2];

console.log(person);    // 張小芬</code></pre>
        </div>
        <p>當然也可以更改已宣告陣列中某個資料的值，方法很簡單，只要指定新的值給陣列索引值就可以。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", ...];
nameList[0] = "盧小小";

console.log(nameList[0]);    // 盧小小</code></pre>
        </div>
        <p>假如有看過上一篇關於物件基礎的介紹，你會發現修改陣列的值和更新物件既存屬性值的方式其實是一模一樣的，畢竟陣列就是物件之一。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>就如同物件都有自己的屬性與方法，身為物件之一的陣列自然也有既存的屬性、方法，陣列內建的屬性有以下這些：</p>
        <p><br></p>
        <h3>1. constructor</h3>
        <p>此屬性用來回傳陣列物件的函式建構式，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
console.log(nameList.constructor);    // function Array() { [native code] }</code></pre>
        </div>
        <p>function Array() { [native code] } 這個輸出結果是 JavaScript 內建的陣列物件定義，[native code] 表示該函式是用 C/C++ 等基礎程式語言所編寫，意指 JavaScript 某些方法或函式實現方式是藉由瀏覽器引擎本身的程式碼提供的，而不是 JavaScript 本身實現的。</p>
        <p>實務層面上通常不會直接使用 <em>Array.constructor</em>，因為它返回的是 Function 建構函式，而非 Array 建構函式，如果要建立陣列通常會直接使用後者，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = new Array();</code></pre>
        </div>
        <p>因此，<em>Array.constructor</em> 使用時機比較偏向檢查指定物件的類型是什麼。</p>
        <p><br></p>
        <h3>2. prototype</h3>
        <p>這個屬性用來表示 Array 建構式的原型，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(Array.prototype);    // [object Array]</code></pre>
        </div>
        <p>不過這個屬性僅作用於 Array 建構式本身，我們自行建立的陣列實例（Instances）是不直接具有 <em>prototype</em> 屬性的，去調用它只會得到 <em>undefined</em>，且看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
console.log(nameList.prototype);    // undefined</code></pre>
        </div>
        <p>僅管如此，我們建立的實例仍然會繼承 Array.prototype 的所有方法，有關這部分的內容留到下一章再來進一步說明。那麼，既然這個屬性和自建實例沒有直接關聯，那實務上什麼時候會用到它呢？答案是我們可以用它來添加自定義的方法，或是修改現有的方法內容，不過不建議後者行為，因為這有可能導致程式發生無法預料的問題。</p>
        <p>添加自定義方法釋例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Array.prototype.contains = function(element) {
    return this.indexOf(element) !== -1;
};

var nameList = ["王小明", "李大華", "張小芬"];

// 使用新添加的方法檢查是否包含指定資料
console.log(nameList.contains("王小明")); // true
console.log(nameList.contains("張三")); // false</code></pre>
        </div>
        <p>範例中的 <em>contains</em> 就是自定義的方法名稱，我們可以修改成任何合乎命名規範的名字，例如 includesElement、hasElement 之類的。</p>

        <p><br></p>
        <h3>3. length</h3>
        <p>這個屬性主要用來取得指定陣列裡資料的數量，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
console.log(nameList.length);    // 3</code></pre>
        </div>
        <p>和其他屬性只作用於 Array 建構式不同，<em>length</em> 屬性是每個陣列實例也都具有的，所以你才會看到上面例子我們能直接從 <em>nameList</em> 呼叫 <em>.length</em> 去讀取該陣列長度。</p>
        <p><br></p>
        <h3>4. Symbol.species</h3>
        <p>Symbol.species 是一個內建屬性，它是 ES6 引入的新功能之一，用來指定擴展（extends）物件對象的建構式類型。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(Array[Symbol.species]);    // function Array() { [native code] }</code></pre>
        </div>
        <p>可以得知 Array 的建構式類型是陣列。通常開發者會利用設置 Symbol.species 以控制擴展目標的行為及特性，由於它的誕生是為了讓 ES6 類（Class）與繼承（Extends）更加完整，所以實務上通常都是在 ES6 程式碼中較為常見，初學階段還沒有接觸到這部分，所以先不贅述太多，待後續學到 ES6 再來詳細補完。</p>
        <p>實務運用範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

const myArray = new MyArray(1, 2, 3);
const mappedArray = myArray.map(x => x * 2);
console.log(mappedArray instanceof MyArray); // false
console.log(mappedArray instanceof Array);   // true</code></pre>
        </div>
        <p><br></p>
        <h3>5. Symbol.iterator</h3>
        <p>Symbol.iterator 也是一個內建屬性，主要用來定義物件的預設迭代器（iteration），它允許陣列可以被 <em>for...of</em>、<em>Array.from()</em> 等方法來遍歷（iterate）陣列裡的每筆資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

for (var item of nameList) {
    console.log(item);    // "王小明", "李大華", "張小芬"
}</code></pre>
        </div>
        <p>Symbol.iterator 不需要直接在程式碼裡出現，一旦我們在程式碼中使用到可迭代的陣列物件，JavaScript 就會自動查找該物件是否實現了 Symbol.iterator 屬性，如果有，則將其視為預設的迭代器作使用。對陣列而言，Symbol.iterator 源自於陣列原型上的 <em>Array.prototype[Symbol.iterator]</em> 屬性所提供，因此，當我們使用 <em>for...of</em>、<em>Array.from()</em> 之類的方法遍歷陣列，JavaScript 就會自己調用 <em>Array.prototype[Symbol.iterator]</em> 以取得一個迭代器，然後使用這個迭代器來遍歷資料。</p>
        <p>如果對迭代器運作不甚瞭解，以下程式碼片段展示了前面 <em>for...of</em> 是如何遍歷震歷資料的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

// 建立迭代器函式
var iteratorFunc = nameList[Symbol.iterator];

// 使用迭代器獲取迭代器物件
var iterator = iteratorFunc.call(nameList);

// 使用迭代器物件遍歷物件資料
let result = iterator.next();
while (!result.done) {
    console.log(result.value);
    result = iterator.next();
}</code></pre>
        </div>
        <p>簡單來說 <em>for...of</em> 這個 JavaScript 語法糖簡化了迭代器遍歷資料的過程，讓開發者可以用更簡潔的方式去撰寫程式碼。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>在開始練習陣列各種操作方法前，我們必須先認識一個觀念：在 JavaScript 世界中，<em>Array.prototype</em> 是所有陣列物件的原型，我們通過變數宣告所建立的陣列，例如 <em>var arr = [];</em>，<em>arr</em> 又叫做陣列實例（Instances），其指向該陣列建構函式本身（Array，只是範例用 <em>[ ]</em> 簡化）而非 <em>Array.prototype</em>，但是它會繼承原型中的方法和屬性。</p>
        <p>JavaScript 提供陣列許許多多操作方法，有部分是直接定義在陣列建構函式（Array）上的，另外大部分則是定義在原型（Array Prototype）身上，一般來說，定義在建構函式的方法通常就於建構函式本身進行操作，又稱為「靜態方法」；而原型提供的方法主要用於針對實例上的操作，是為「原型方法」，靜態方法通常用於建立或轉換實例，而原型方法用於對實例執行操作或修改它們的狀態。</p>
        <p>不過在實務上有些原型的方法也可以當作靜態方法來使用，所以也不用太糾結面對需求究竟該使用靜態還是原型方法，一切都依照當下的用途及需求而定。</p>
        <p>另外，要如何判斷我們使用的功能是屬性還是方法？比較直接好懂的判斷是看該功能是否包含括號 <em>( )</em>，例如 <em>Array.length</em> 不需要添加括號，由此就可得知它是屬性；而像是 <em>Array.from()</em>、<em>Array.prototype.slice()</em> 後方都有括號，就表示它們都是陣列提供的方法之一。僅管如此，也不能保證所有屬性和方法都是遵循此規則，畢竟 JavaScript 身為一個弱型別語言，很多規範並沒有想像中那麼嚴謹，若存有疑慮，還是得去查閱相關語言規範來確定功能的類型。</p>
        <p><br></p>
        <p>以下是 JavaScript 陣列所擁有的操作方法（按照方法字母順序排列）：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f3">方法名稱</div>
                    <div class="f-f2">語法</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.at()</div>
                    <div class="f-f2"><em>.at()</em></div>
                    <div class="f-f3">取得陣列中指定索引值的資料。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.concat()</div>
                    <div class="f-f2"><em>.concat()</em></div>
                    <div class="f-f3">用於合併二至多個不同的陣列，成為一個新的陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.copyWithin()</div>
                    <div class="f-f2"><em>.copyWithin()</em></div>
                    <div class="f-f3">複製陣列資料，並從指定索引值的位置開始將複製的資料覆蓋原本位置的資料。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.entries()</div>
                    <div class="f-f2"><em>.entries()</em></div>
                    <div class="f-f3">返回一個迭代器對象，該對象包含陣列中每個索引值與相匹配資料的值，通常與 <em>for...of</em> 結合使用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.every()</div>
                    <div class="f-f2"><em>.every()</em></div>
                    <div class="f-f3">用來判斷陣列內的資料是否符合函式判斷的條件，必須全部符合回傳結果才會為 <em>true</em>。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.fill()</div>
                    <div class="f-f2"><em>.fill()</em></div>
                    <div class="f-f3">用來將陣列中的資料填充為指定的值。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.filter()</div>
                    <div class="f-f2"><em>.filter()</em></div>
                    <div class="f-f3">讓陣列依據指定的判斷函式，依序對陣列裡每一筆資料進行判斷，並篩選出符合條件的資料。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.find()</div>
                    <div class="f-f2"><em>.find()</em></div>
                    <div class="f-f3">用來尋找陣列中第一個滿足指定條件的資料。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.findIndex()</div>
                    <div class="f-f2"><em>.findIndex()</em></div>
                    <div class="f-f3">用來尋找陣列中第一個滿足指定條件的資料之索引值。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.findLast()</div>
                    <div class="f-f2"><em>.findLast()</em></div>
                    <div class="f-f3">用來尋找陣列中最後一個滿足指定條件的資料。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.findLastIndex()</div>
                    <div class="f-f2"><em>.findLastIndex()</em></div>
                    <div class="f-f3">用來尋找陣列中最後一個滿足指定條件的資料之索引值。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.flat()</div>
                    <div class="f-f2"><em>.flat()</em></div>
                    <div class="f-f3">用來將陣列中的多維陣列資料扁平化。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.flatMap()</div>
                    <div class="f-f2"><em>.flatMap()</em></div>
                    <div class="f-f3">用於映射陣列中的資料，將結果扁平化成新的陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.forEach()</div>
                    <div class="f-f2"><em>.forEach()</em></div>
                    <div class="f-f3">用來將陣列的每一筆資料傳遞到函式以進行其他指定操作，例如數學運算。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.from()</div>
                    <div class="f-f2"><em>.from()</em></div>
                    <div class="f-f3">用來將可迭代的物件目標建立一個新的陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.fromAsync()</div>
                    <div class="f-f2"><em>.fromAsync()</em></div>
                    <div class="f-f3">異步迭代一個可迭代的物件目標，此方法是 2024 年新增的應用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.includes()</div>
                    <div class="f-f2"><em>.includes()</em></div>
                    <div class="f-f3">用於判斷陣列中的資料是否包含指定的參數值。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.indexOf()</div>
                    <div class="f-f2"><em>.indexOf()</em></div>
                    <div class="f-f3">搜尋陣列中指定資料所在的索引值。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.isArray()</div>
                    <div class="f-f2"><em>.isArray()</em></div>
                    <div class="f-f3">用來判斷指定的目標類型是否為陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.join()</div>
                    <div class="f-f2"><em>.join()</em></div>
                    <div class="f-f3">用來將物件裡的資料轉換成字串輸出，並且可以加入自定義的符號或其他內容。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.keys()</div>
                    <div class="f-f2"><em>.keys()</em></div>
                    <div class="f-f3">用來回傳一個新的 Array 迭代器，該迭代器包含陣列中每個資料的「索引值」，通常用於遍歷同時需要操作陣列資料與其索引值的場合。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.lastIndexOf()</div>
                    <div class="f-f2"><em>.lastIndexOf()</em></div>
                    <div class="f-f3">搜尋陣列中指定資料所在的索引值，和 <em>.indexOf()</em> 差別在於前者搜尋方向是右至左（從後面往前找）。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.map()</div>
                    <div class="f-f2"><em>.map()</em></div>
                    <div class="f-f3">用來將原本陣列的資料執行完特定函式，將新的結果回傳到新的陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.of()</div>
                    <div class="f-f2"><em>.of()</em></div>
                    <div class="f-f3">將指定給變數的參數轉換成陣列的靜態方法。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.pop()</div>
                    <div class="f-f2"><em>.pop()</em></div>
                    <div class="f-f3">移除指定陣列的最後一筆資料，此方法會影響原本陣列的長度。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.push()</div>
                    <div class="f-f2"><em>.push()</em></div>
                    <div class="f-f3">在指定陣列的末端新增陣列資料，此方法會影響原本陣列的長度。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.reduce()</div>
                    <div class="f-f2"><em>.reduce()</em></div>
                    <div class="f-f3">累積陣列中的資料並回傳單一結果，此方法不侷限陣列中任何基本型別的資料，可以是純數字也可以是字串。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.reduceRight()</div>
                    <div class="f-f2"><em>.reduceRight()</em></div>
                    <div class="f-f3">累積陣列中的資料並回傳單一結果，是 <em>.reduce()</em> 的反向，由右至左（後至前）。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.reverse()</div>
                    <div class="f-f2"><em>.reverse()</em></div>
                    <div class="f-f3">用於反轉陣列裡的資料，也就是原本最後一筆資料變成第一個，倒數第二變成第二...依此類推。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.shift()</div>
                    <div class="f-f2"><em>.shift()</em></div>
                    <div class="f-f3">移除指定陣列的第一筆資料，此方法會影響原本陣列的長度。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.slice()</div>
                    <div class="f-f2"><em>.slice()</em></div>
                    <div class="f-f3">用來截取陣列中的資料，使其成為新的陣列，不影響原本陣列的長度，比較類似「複製貼上」的概念而非「剪下貼上」。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.some()</div>
                    <div class="f-f2"><em>.some()</em></div>
                    <div class="f-f3">用來判斷陣列內的資料是否符合函式判斷的條件，只要其中一項符合回傳結果就會為 <em>true</em>。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.sort()</div>
                    <div class="f-f2"><em>.sort()</em></div>
                    <div class="f-f3">可以對陣列重新進行排序，並回傳重新排序後的結果，此方法結果不會產生新的陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.splice()</div>
                    <div class="f-f2"><em>.splice()</em></div>
                    <div class="f-f3">可針對陣列裡的資料進行新增、刪除、修改的動作，是陣列操作裡很強大的功能之一。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.toLocaleString()</div>
                    <div class="f-f2"><em>.toLocaleString()</em></div>
                    <div class="f-f3">將陣列裡的資料轉換成在地化的字串版本，例如 1000 轉換成 1,000。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.toReversed()</div>
                    <div class="f-f2"><em>.toReversed()</em></div>
                    <div class="f-f3">2023 年新增的方法，和 <em>reversed()</em> 一樣將陣列資料作顛倒排序處理，但後者會影響陣列本身，而此方法則會淺層拷貝到另一個新陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.toSorted()</div>
                    <div class="f-f2"><em>.toSorted()</em></div>
                    <div class="f-f3">2023 年新增的方法，和 <em>sorted()</em> 一樣將陣列資料作排序處理，但後者會影響陣列本身，而此方法則會淺層拷貝到另一個新陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.toSpliced()</div>
                    <div class="f-f2"><em>.toSpliced()</em></div>
                    <div class="f-f3">2023 年新增的方法，和 <em>splice()</em> 一樣將陣列資料作修改處理，但後者會影響陣列本身，而此方法則會淺層拷貝到另一個新陣列。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.toString()</div>
                    <div class="f-f2"><em>.toString()</em></div>
                    <div class="f-f3">用來將陣列裡的資料轉換成字串型別。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.unshift()</div>
                    <div class="f-f2"><em>.unshift()</em></div>
                    <div class="f-f3">用來在陣列的開頭添加一或多個資料，此方法會影響原本陣列的長度。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.values()</div>
                    <div class="f-f2"><em>.values()</em></div>
                    <div class="f-f3">用來回傳一個新的 Array 迭代器，該迭代器包含陣列中每個資料的「值」，通常用於遍歷同時需要操作陣列資料與其索引值的場合。</div>
                </div>
                <div class="f-row">
                    <div class="f-f3">Array.prototype.with()</div>
                    <div class="f-f2"><em>.with()</em></div>
                    <div class="f-f3">2023 年新增的方法，用來複製指定陣列並另外建立一個新的陣列，同時亦可以透過該方法添加新的陣列資料進去。</div>
                </div>
            </div>
        </div>
        <p>以上就是目前為止 JavaScript 所提供的陣列全部可操作的方法了，下一篇文章將針對其中比較常使用的方法深入說明並進行練習。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>回顧本篇文章，精簡總結一下我們從陣列基礎身上學到哪些東西：</p>
        <h5>1. 陣列宣告方式</h5>
        <ul>
            <li>方括號 <em>[ ]</em>：如果陣列資料只有一個數字，會被當作第一筆資料。</li>
            <li>建構式 <em>new Array()</em>：如果陣列資料只有一個數字，會被視為表示該陣列的長度。</li>
            <li>陣列裡的各筆資料以逗號 <em>,</em> 區隔。</li>
        </ul>
        <h5>2. 陣列的索引值</h5>
        <ul>
            <li>陣列中每一筆資料按順序都有對應的索引值。</li>
            <li>索引值從 0 開始計算。</li>
        </ul>
        <h5>3. 陣列的方法</h5>
        <ul>
            <li>JavaScript 陣列有所謂的建構式「原型」（Prototype）。</li>
            <li>由變數宣告的陣列叫做「實例」（Instances），雖然不是原型，但繼承了原型的所有方法。</li>
            <li>可透過方法對陣列進行各種操作，例如新增、刪除、修改、排序等多項行為。</li>
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
                    <div class="f-f1">Prototype</div>
                    <div class="f-f1">原型</div>
                    <div class="f-f3">它是 JavaScript 中每個函式都有的一個特殊屬性，它包含了該函式指向的原型物件所擁有的全部屬性和方法，可視為一種函式繼承原型屬性與方法的機制。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Instances</div>
                    <div class="f-f1">實例</div>
                    <div class="f-f3">指的是根據建構函式建立的物件，例如 <em>new Car()</em> 建立的物件名稱 <em>Car</em> 就能稱作一個名為 Car 的實例，每個實例都能擁有獨立的屬性和方法而不會因為修改某個實例的屬性就直接影響到另一個實例相同的屬性。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Extend</div>
                    <div class="f-f1">擴展 / 繼承 / 派生</div>
                    <div class="f-f3">為 ES6 導入的概念之一，透過這個機制建立一個新的「類」（Class）或「物件」（Object），並添加新的屬性和方法，以擴展現有類與物件的功能。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Iteration</div>
                    <div class="f-f1">迭代</div>
                    <div class="f-f3">指的是對陣列、物件或其他等集合裡每個資料進行訪問或處理的過程。迭代是一個名詞，可以通過遍歷、循環或其他迭代器來實現，譬如 JavaScript 的 <em>for</em>、<em>for...of</em>、<em>forEach</em>、<em>map</em> 等方法。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Iterate / Traversal</div>
                    <div class="f-f1">遍歷</div>
                    <div class="f-f3">指的是對陣列、物件或其他等集合裡每個資料進行訪問或處理的過程，遍歷是一種動態行為，用來實現迭代的一種方式。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://www.fooish.com/javascript/array/" target="_blank">JavaScript Array (陣列)</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/201908/js-array.html" target="_blank">JavaScript Array 陣列操作方法大全 ( 含 ES6 )</a></dd>
            <dd><a href="https://blog.kdchang.cc/2016/06/23/javascript-data-structure-algorithm-array/" target="_blank">用 JavaScript 學習資料結構和演算法：陣列（Array）篇</a></dd>
            <dd><a href="https://codertw.com/ios/28518/" target="_blank">javascript 陣列的常用方法</a></dd>
            <dd><a href="https://zhuanlan.zhihu.com/p/120383551" target="_blank">从深入到通俗：Symbol.species</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>