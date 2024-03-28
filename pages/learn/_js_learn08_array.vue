<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="52" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、排序陣列資料（sort）</a></li>
            <li><a href="#act2">二、檢索陣列資料（indexOf、find、at）</a></li>
            <li><a href="#act3">三、判斷陣列資料（every、some、includes）</a></li>
            <li><a href="#act4">四、篩選陣列資料（filter）</a></li>
            <li><a href="#act5">五、遍歷陣列資料（forEach、map）</a></li>
            <li><a href="#act6">六、扁平化陣列資料（flat、flatMap）</a></li>
            <li><a href="#act7">七、累積陣列資料（reduce）</a></li>
            <li><a href="#act8">八、轉換陣列資料為字串（toString、join）</a></li>
            <li><a href="#act9">九、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>本篇主角依然是陣列，承襲前一篇介紹陣列的方法運用，繼續介紹及實作練習其他常用的操作方法。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、排序陣列資料（sort）</h2>
        <p><em>sort()</em> 方法可以對陣列重新進行排序，如果不使用函式判斷的預設情況下，<em>sort()</em> 會將陣列內的資料轉換成字串，並採用 <a href="https://zh.wikipedia.org/wiki/Unicode" target="_blank">Unicode</a> 的標準判斷排序先後順序。</p>
        <p><br></p>
        <h4>1. 純數字排序：</h4>
        <p>陣列中對於純數字排序判斷就比較大小而已，很單純。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [4, 2, 5, 3, 1];
nameList.sort();

console.log(nameList);    // [1,2,3,4,5]</code></pre>
        </div>
        <p><br></p>
        <h4>2. 字串排序：</h4>
        <p>全世界的語言很多，文字也非常多樣，所以在排序操作上就比數字來得複雜，儘管拉丁語系還是很好理解：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["Kobe", "Curry", "LBJ", "Davis", "Jokic", "Allen"];
nameList.sort();

console.log(nameList);   // ["Allen","Curry","Davis","Jokic","Kobe","LBJ"]</code></pre>
        </div>
        <p>但我們中文語系的工程師可能也會關心中文字串的排序，根據 JavaScript <em>sort()</em> 方法規則，中文字同樣也是依據 Unicode 編碼對照的編號順序進行排列，這可能跟我們預想中按照筆畫多寡或注音先後的方式不一樣。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小"];
nameList.sort();

console.log(nameList);    // ["張小芬","李大華","王小明","盧小小"]</code></pre>
        </div>
        <p>乍看不能理解它的規則，雖說是題外話，但我們可以用 <em>charCodeAt()</em> 取得中文字的 Unicode 編碼，以下列出上面名單中四位同學姓名的姓氏編碼，參數 0 表示只檢索第一個字符：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("王小明".charCodeAt(0));    // 29579
console.log("李大華".charCodeAt(0));    // 26446
console.log("張小芬".charCodeAt(0));    // 24373
console.log("盧小小".charCodeAt(0));    // 30439</code></pre>
        </div>
        <p>如此應該能知道為什麼 <em>sort()</em> 出來的結果和想像中有區別了吧？因為它的排序規則都是以 Unicode 編碼數字大小為基準。只是對一般中文使用者來說，和他們解釋陣列處理中文資料的排序方式是依照 Unicode 編碼通常也難以接受，畢竟中文直覺就是要按照筆畫數量或注音順序來排呀！所以想要用 <em>sort()</em> 處理中文陣列的排序可能就不太適合。</p>
        <p>如果想做到中文資料按照筆畫順序進行排序，我們需要自行建立比較函式，不過相關運用已經超過目前學習範圍了，以下只展示實現規則的程式碼方便有急迫需求的人使用，暫不針對程式碼作詳細介紹：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 筆畫順序表
const strokeOrderMap = {
    '一': 1, '丨': 2, '丶': 3, '丿': 4, '乙': 5,
    '亅': 6, '二': 7, '亠': 8, '人': 9, '儿': 10,
};

// 比較函式，按照筆畫順序比較兩個中文字串
function compareByStrokeOrder(a, b) {
    const minLength = Math.min(a.length, b.length);
    for (let i = 0; i &lt; minLength; i++) {
        const charA = a.charAt(i);
        const charB = b.charAt(i);
        // 如果兩個字串不同，則根據筆畫順序表比較它們的筆畫順序
        if (charA !== charB) {
            return strokeOrderMap[charA] - strokeOrderMap[charB];
        }
    }
    // 如果前面字串相同，則按照字串長度決定先後
    return a.length - b.length;
}

const nameList = ["王小明", "李大華", "張小芬", "盧小小"];
nameList.sort(compareByStrokeOrder);
console.log(nameList);    // ["王小明","李大華","張小芬","盧小小"]
</code></pre>
        </div>
        <p><br></p>
        <h4>3. 物件資料排序：</h4>
        <p>如果陣列資料是物件形式的內容，我們可以透過函式定義指定的屬性去排序出我們想要的結果。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [
    { name: '王小明', age: 45 },
    { name: '李大華', age: 12 },
    { name: '張小芬', age: 23 },
    { name: '盧小小', age: 17 }
];

nameList.sort((a, b) => a.age - b.age);
console.log(nameList);</code></pre>
        </div>
        <p><em>sort()</em> 方法裡定義的函式規則為比較各物件資料裡面的 <em>age</em> 屬性並重新排序，其邏輯為照陣列索引值順序比對兩筆資料的 age 值，如果 a - b 的結果小於 0，表示 a 應該排在 b 的前面；反過來若大於 0，則 b 應該要排在 a 的前面；假如兩者相減等於 0，那麼兩者的相對位置不變。</p>
        <p>所以，最後輸出的結果將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">[
    { name: '李大華', age: 12 },
    { name: '盧小小', age: 17 },
    { name: '張小芬', age: 23 },
    { name: '王小明', age: 45 }
]</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、檢索陣列資料（indexOf、find、at）</h2>
        <p>JavaScript 用來檢索陣列裡指定或符合條件的方法有好幾種：</p>
        <p><br></p>
        <h4>1. indexOf、lastIndexOf：</h4>
        <p><em>indexOf()</em> 與 <em>lastIndexOf()</em> 的差異在於搜尋方向不同，前者由左至右，後者則是由右至左。我們只需填入欲搜尋的值，<em>indexOf()</em> / <em>lastIndexOf()</em> 就會搜索陣列是否有相符的資料，若有，則回傳該資料的索引值；若無，則回傳 -1。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

console.log(nameList.indexOf("張小芬"));    // 2
console.log(nameList.lastIndexOf("張小芬"));    // 2</code></pre>
        </div>
        <p>無論是用 <em>indexOf()</em> 還是 <em>lastIndexOf()</em>，它們搜尋出來的資料索引值不會因為檢索方向不同而跟著有所不同。然而，由於資料搜尋的值必須完全相同，假如只輸入一個「張」字，又或者搜尋陣列裡不存在的資料，回傳結果都將會是 -1。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

console.log(nameList.indexOf("盧小小"));    // -1
console.log(nameList.indexOf("張"));    // -1
console.log(nameList.indexOf("張小芬芬"));    // -1</code></pre>
        </div>
        <p><br></p>
        <p>此外，<em>indexOf()</em>、<em>lastIndexOf()</em> 中的參數一共可以包含兩個值，第一個參數表示要判斷的值，是為必填；第二個值則是填入索引值，代表陣列要從哪一個索引位置開始判斷。舉例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

console.log(nameList.indexOf("王小明", 1));    // -1</code></pre>
        </div>
        <p>因為我們填入了搜尋索引值起頭為 1，剛好跳過了位於索引值位置 0 的符合資料「王小明」，而後面資料也沒有其他「王小明」的值，故最終輸出結果為 -1。</p>
        <p>說到這裡那又衍生一個問題啦，假如陣列裡有重複相同的資料呢？<em>indexOf</em>、<em>lastIndexOf</em> 能回傳全部符合的資料索引值嗎？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "王小明"];

console.log(nameList.indexOf("王小明"));    // 0</code></pre>
        </div>
        <p>答案是不能。<em>indexOf</em>、<em>lastIndexOf</em> 只會回傳第一個符合搜尋結果的索引值，後續重複的資料都不會被考慮。假如我們想找出所有符合指定條件的資料，使用循環結合條件判斷式會是比較理想的做法。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "王小明"];
var searchItem = "王小明";
var matchingIndexes = [];

for (var i = 0; i &lt; nameList.length; i++) {
    if (nameList[i] === searchItem) {
        matchingIndexes.push(i);
    }
}

console.log(matchingIndexes);    // [0, 3]</code></pre>
        </div>
        <p><br></p>
        <h4>2. find、findLast、findIndex、findLastIndex：</h4>
        <p><em>find()</em>、<em>findLast()</em> 用來尋找符合指定條件的資料，指定條件可以是簡單的判斷式，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [10, 20, 30, 40, 50];
var result = numbers.find(element => element > 25);

console.log(result);    // 30</code></pre>
        </div>
        <p>和前面介紹的 <em>indexOf()</em> 方法一樣，當陣列搜尋到第一筆符合條件的結果就會停止繼續檢索陣列，並直接回傳結果，所以為什麼上面的範例條件設定搜尋大於 25 的數字，最終只有回傳第一個符合條件的 30，原因就在於此。</p>
        <p>至於 <em>findLast()</em> 則是反向搜尋，從陣列的尾端（右側）開始向前查找符合條件的資料，所以上面的例子返回的結果就會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [10, 20, 30, 40, 50];
var result = numbers.findLast(element => element > 25);

console.log(result);    // 50</code></pre>
        </div>
        <p><br></p>
        <p>至於 <em>findIndex()</em> 與 <em>findLastIndex()</em> 就是尋找符合條件之第一筆資料的索引值，乍看之下和 <em>indexOf()</em>、<em>lastIndexOf()</em> 功用類似，不過前者可以接受我們輸入條件判斷式去尋找符合的第一筆資料，而後者只能輸入要從哪個索引值位置開始檢索的參數，相對前者來說操作上會比較侷限。</p>
        <p>簡單來說，如果只是單純想要尋找某一個值的索引值，用 <em>indexOf()</em>；假如想基於特定條件去查找出符合條件的值之索引值，則使用 <em>findIndex()</em>。</p>
        <p>之所以說 <em>findIndex()</em> 必須基於條件判斷去作搜尋，是因為它填入括弧的程式碼不能只是單純的參數。請見以下錯誤範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [10, 20, 30, 40, 50];

console.log(numbers.find(30));     // Uncaught TypeError: string "王小明" is not a function</code></pre>
        </div>
        <p>由此可知 <em>findIndex()</em> 括弧裡面必須是函式而不能只是單純的值，這個限制同樣也套用在 <em>find()</em> 身上。</p>
        <p><br></p>
        <h4>3. at：</h4>
        <p><em>.at()</em> 方法是 2022 年正式納入標準的陣列方法，說它是檢索，其實不如說是「指定」出特定索引值的資料會比較貼切。過往如果我們想取得陣列最尾端的資料，可能需要這麼做：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var result = nameList[nameList.length - 1];

console.log(result);    // 張小芬</code></pre>
        </div>
        <p>但如果使用 <em>at()</em> 方法，我們只要直接填入參數 -1，就能直接得到陣列最後一筆資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var result = nameList.at(-1);

console.log(result);    // 張小芬</code></pre>
        </div>
        <p><br></p>
        <p><em>.at()</em> 方法括號裡面填入的參數只能是 Integer（整數），倘若我們填入小數，則只會取參數開頭的數字做為指定查找的索引值目標。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var result = nameList.at(1.3);

console.log(result);    // 李大華</code></pre>
        </div>
        <p>另外如果填入的索引值數字大於陣列的長度，則會回傳 <em>undefined</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var result = nameList.at(10);

console.log(result);    // undefined</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、判斷陣列資料（every、some、includes）</h2>
        <p>上一個章節介紹了幾種檢索陣列符合指定條件的方法，而接下來要介紹幾種用來判斷陣列中的資料「是否」有符合我們自行定義的條件。</p>
        <p><br></p>
        <h3>every：</h3>
        <p>只要陣列內有任一資料不符合函式判斷的條件，則回傳 <em>false</em>。如果全部符合，則傳回 <em>true</em>。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];
var result = nameList.every(function (n) {
    return n > 3;
});

console.log(result);    // false</code></pre>
        </div>
        <p>在我們設定的條件判斷函式中，陣列裡的數字必須要大於 3，由於範例陣列前三筆資料數值皆未大於 3，故回傳結果為 <em>false</em>。</p>
        <p><br></p>
        <h3>some：</h3>
        <p>與 <em>every()</em> 相反，<em>some()</em> 只要陣列裡其中一筆資料符合條件，那麼回傳的結果就會是 <em>true</em>。當然，如果通通不符合條件，回傳結果仍依然是 <em>false</em>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];
var result = nameList.some(function (n) {
    return n > 3;
});

console.log(result);    // true</code></pre>
        </div>
        <p>範例陣列後兩筆資料的數值皆大於 3，已滿足 <em>some()</em> 設定的條件只要任一筆符合就回傳 <em>true</em>，進而得到此結果。</p>
        <p><br></p>
        <h3>includes：</h3>
        <p><em>includes()</em> 用於判斷陣列中的資料是否包含指定的參數值，若有，返回 <em>true</em>；反之則回傳 <em>false</em>。<em>includes()</em> 一共可以填兩個值，分別是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">ary.includes(value, start);</code></pre>
        </div>
        <p><em>value</em> 是作為判斷的值，陣列資料必須「完全符合」該值才可算是包含；<em>start</em> 則是可以指定要從陣列哪一個位置開始判斷。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.includes("李大華");

console.log(result);    // true</code></pre>
        </div>
        <p>如果只是某個值的部分單字有符合，判定結果仍然為 <em>false</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.includes("大");

console.log(result);    // false</code></pre>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、篩選陣列資料（filter）</h2>
        <p><em>filter()</em> 方法用來使陣列依據指定的判斷函式，依序對裡頭每一筆資料進行判斷，並篩選出符合條件的資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function aryFilter(n) {
    return n >= 10;
}

var nameList = [5, 1, 13, 4, 8, 55, 9, 2, 10, 24];
var result = nameList.filter(aryFilter);

console.log(result);    // [13,55,10,24]</code></pre>
        </div>
        <p>首先，我們定義了一個判斷函式 <em>aryFilter</em>，其內容是回傳（<em>return</em>）大於等於 10 的數值。接著透過 <em>filter()</em> 方法呼叫函式，函式便會對指定陣列裡的每一個資料執行判斷，凡是數值大於等於 10 符合條件的資料，就會被篩選出來成為新的陣列。</p>
        <p>當然，函式要以匿名函式的形式直接定義在方法裡也是可以的，像上方的範例我們就可以改寫成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [5, 1, 13, 4, 8, 55, 9, 2, 10, 24];
var result = nameList.filter(function(n) {
    return n >= 10;
});

console.log(result);    // [13,55,10,24]</code></pre>
        </div>
        <p>可篩選的目標不單侷限於數字，字串同樣可以通過條件判斷進行處理，例如以下範例目標是篩選出字串長度大於 5 的資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["Bryant", "James", "Nash", "Davis", "Curry", "Wade"];

var result = nameList.filter(function(n) {
    return n.length >= 5;
});

console.log(result);    // ["Bryant","James","Davis","Curry"]</code></pre>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、遍歷陣列資料（forEach、map）</h2>
        <h3>forEach：</h3>
        <p><em>forEach()</em> 方法可用來將陣列的「每一個值」傳遞到函式進行運算，其具體語法規則為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">ary.forEach(function(item, index, array){ ... });</code></pre>
        </div>
        <p>可傳遞到函式中的參數有三個，分別表示陣列資料（<em>item</em>）、陣列資料的索引值（<em>index</em>）、原本的陣列（<em>array</em>），其中後兩者參數非必填項目，但可以輔助函式執行不同效果的運算。</p>
        <p>以下展示簡單的遍歷數學運算，把一個數字陣列裡面所有的值進行加總並回傳加總的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];
var result = 0;

nameList.forEach(function(item) {
    result += item;
});

console.log(result);    // 15</code></pre>
        </div>
        <p>又或者加入索引值和原陣列參數，做到改變原陣列內容的效果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];

nameList.forEach(function (item, index) {
    nameList[index] = item * 10;
});

console.log(nameList);    // [10,20,30,40,50]</code></pre>
        </div>
        <p>根據以上的練習可以看出 <em>forEach()</em> 方法的操作結果會影響原始陣列的資料，假如我們希望這些操作的結果能另外儲存到新的陣列，那麼就要使用接下來要介紹的 <em>map()</em> 方法。</p>
        <p><br></p>
        <h3>map：</h3>
        <p>前面已有說到，<em>map()</em> 與 <em>forEach()</em> 方法的最大差異在於 <em>map()</em> 可以將遍歷結果另外放在新的陣列而不影響原本的陣列資料，以下我們將兩者同時進行比較：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];

var result = nameList.forEach(function (item, index, array) {
    array[index] = item * 10;
});

console.log(nameList);    // [10, 20, 30, 40, 50]
console.log(result);    // undefined</code></pre>
        </div>
        <p>可以看到原始陣列 <em>nameList</em> 的資料已被運算後的結果給取代了，這裡我們先不說為什麼 <em>result</em> 輸出的結果是 <em>undefined</em>，相同的程式邏輯，我們換成 <em>map()</em>，結果將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [1, 2, 3, 4, 5];

var result = nameList.map(function (item) {
    return item * 10;
});

console.log(nameList);    // [1, 2, 3, 4, 5]
console.log(result);    // [10, 20, 30, 40, 50]</code></pre>
        </div>
        <p>回頭說說 <em>undefined</em> 的部分，由於 <em>forEach()</em> 只針對目標陣列執行指定的操作，不會返回任何的值，或者說，它返回的值就只會是 <em>undefined</em>，所以即使我們宣告新的變數去調用 <em>forEach()</em> 執行的結果，也只會得到 <em>undefined</em>。反過來說使用 <em>map()</em> 則會返回其操作的結果，於是我們就可以建立新的變數去存儲其返回的資料，藉以產生新的陣列。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、扁平化陣列資料（flat、flatMap）</h2>
        <p>什麼是扁平化？為什麼要把陣列資料扁平化、或者也可以說是攤平，看似有些抽象的術語實際上也沒那麼複雜，其實就是有時候要處理的陣列是一個多維陣列──也就是陣列裡面的資料也是陣列，更甚者陣列裡面的陣列，還有個陣列......反正就是有好幾層陣列資料，這種陣列我們通常稱為多維陣列。假設有個處理需求是希望能把多維陣列裡面的資料通通「展開攤平」成相同階層的陣列資料，我們可以透過 <em>flat()</em> 實現此一需求。</p>
        <p><br></p>
        <h3>flat：</h3>
        <p>直接看範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["A", ["B1", "B2"], "C", "D"];
var result = nameList.flat();

console.log(result);    // ["A","B1","B2","C","D"]</code></pre>
        </div>
        <p>可以看到陣列中的第二層陣列 <em>["B1", "B2"]</em> 被扁平展開到和 A C D 相同階層的陣列資料裡，目前看起來很美好，但其實還是存在點問題的，假設多維陣列超過兩層以上：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["A", ["B1", "B2"], "C", "D", ["E1", ["E2-1", "E2-2", "E2-3"], "E3"]];
var result = nameList.flat();

console.log(result);    // ["A","B1","B2","C","D","E1",["E2-1","E2-2","E2-3"],"E3"]</code></pre>
        </div>
        <p>會發現 E2 系列所在的第二層陣列並沒有被攤開扁平化，其實這和我們有沒有給 <em>flat()</em> 方法填入參數有關──沒錯，<em>flat()</em> 的括弧裡面是可以引入參數值的，根據我們賦予的數字，會決定其攤平的層數，這個參數 JavaScript 稱之為「深度」（depth），所以如果我們給值 2 進去，就表示 <em>flat()</em> 會將陣列裡的資料扁平化至第二層，3 則扁平化三層......依此類推。在沒有傳遞任何參數的情況下，預設值為 1，也就是只處理第一層陣列。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["A", ["B1", "B2"], "C", "D", ["E1", ["E2-1", "E2-2", "E2-3"], "E3"]];
var result = nameList.flat(2);

console.log(result);    // ["A","B1","B2","C","D","E1","E2-1","E2-2","E2-3","E3"]</code></pre>
        </div>
        <p>假如你不確定要處理的陣列究竟有多少層數，然後又想直接把整個多維陣列的資料全都扁平化，則可以直接引入 <em>Infinity</em>，這個值的意思表示正無限大，所以當我們傳遞此參數給 <em>flat()</em>，就表示要完全扁平化陣列。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["A", ["B1", "B2"], "C", "D", ["E1", ["E2-1", "E2-2", "E2-3"], "E3"]];
var result = nameList.flat(Infinity);

console.log(result);    // ["A","B1","B2","C","D","E1","E2-1","E2-2","E2-3","E3"]</code></pre>
        </div>
        <p><br></p>
        <h3>flatMap：</h3>
        <p>用途和 <em>flat()</em> 相同都是被用來處理多維陣列扁平化的操作方法，不過 <em>flat()</em> 只能單純處理資料扁平化的作業，不能執行其他操作，例如扁平化的同時也對該陣列裡的數字進行一些運算操作，並將運算後的結果回傳給新的陣列，像這樣的需求就必須仰賴 <em>flatMap</em> 實現。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [1, [2, 3], [4, [5, 6]]];

function flattenArray(arr) {
    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flattenArray(val) : val);
    }, []);
}

var flattenedNumbers = flattenArray(numbers).map(num => num * 2);

console.log(flattenedNumbers);    // [2,4,6,8,10,12]</code></pre>
        </div>
        <p><em>flatMap()</em> 運作原理基本上差不多，只是它是 <em>flat()</em> 和 <em>map()</em> 方法的組合。</p>
    </div>
    <div class="text-block" id="act7">
        <h2>七、累積陣列資料（reduce）</h2>
        <p>先說結論，雖然 <em>reduce()</em> 方法用法和部分陣列方法例如 <em>map()</em>、<em>filter()</em> 等類似，但差別是 <em>reduce()</em> 返回的結果會是一個值，而並非陣列，因此，這也使它的語法結構和程式邏輯與其他方法不太相同。</p>
        <p><em>reduce()</em> 的語法結構為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])</code></pre>
        </div>
        <p>以下分別介紹主要的這五項參數：</p>
        <ul>
            <li>accumulator：由各別 currentValue 加總起來的值。</li>
            <li>currentValue：目標陣列的個別資料。</li>
            <li>index：目標陣列個別資料的索引值，非必要項目。</li>
            <li>array：呼叫該方法的陣列，非必要項目。</li>
            <li>initialValue：作為第一次呼叫 callback 函式的初始累計值，非必要項目。</li>
        </ul>
        <p><br></p>
        <p>再來展示一些 <em>reduce()</em> 方法常見的運用場合：</p>
        <p><br></p>
        <h4>1. 數學運算：</h4>
        <p>例如累積純數字陣列資料的總和：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum);    // 15</code></pre>
        </div>
        <p>或是總積：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce((accumulator, currentValue) => accumulator * currentValue, 1);

console.log(sum);    // 120</code></pre>
        </div>
        <p>如果是要計算乘法或除法的結果，記得 initialValue 至少要設置 1 或以上的數值，設 0 的話結果就只會是 0。（因為 1 * 0 等於 0，回傳給 accumulator 繼續計算，接下來怎麼算都會是 0）。</p>
        <p><br></p>
        <h4>2. 扁平化陣列：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [[1, 2], [3, 4], [5, 6]];
var flattenedArray = numbers.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

console.log(flattenedArray);    // [1, 2, 3, 4, 5, 6]
</code></pre>
        </div>
        <p>你可能會覺得，直接使用 <em>flat()</em> 不是更快更簡潔嗎？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var numbers = [[1, 2], [3, 4], [5, 6]];
var flattenedArray = numbers.flat();

console.log(flattenedArray);    // [1, 2, 3, 4, 5, 6]
</code></pre>
        </div>
        <p>確實如此，不過之所以展示這個運用只是要展現 <em>reduce()</em> 的靈活度，畢竟定位為陣列中高階函式的方法，面對比較複雜的陣列時，<em>reduce()</em> 往往會是更能有效處理需求的陣列方法。</p>
        <p><br></p>
        <h4>3. 將陣列轉換成物件：</h4>
        <p>這是一份陣列格式的班級同學名單：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = [
    { id: 1, name: '李大華' },
    { id: 2, name: '盧小小' },
    { id: 3, name: '張小芬' }
];
</code></pre>
        </div>
        <p>如果直接輸出它，得到的結果是陣列（廢話！）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(nameList);

// [
//      { "id": 1, "name": "李大華"},
//      { "id": 2, "name": "盧小小"},
//      { "id": 3, "name": "張小芬"}
// ]
</code></pre>
        </div>
        <p>假如要將這份陣列轉為物件形式輸出，以便提高資料的檢索效率和可讀性，我們可以透過 <em>reduce()</em> 將陣列轉化為物件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var peopleMap = nameList.reduce((obj, person) => {
    obj[person.id] = person.name;
    return obj;
}, {});

console.log(peopleMap);

// {
//     "1": "李大華",
//     "2": "盧小小",
//     "3": "張小芬"
// }
</code></pre>
        </div>
        <p>這樣我們在查找特定對象的時候，只需要指定對象的 ID 作為鍵值（Key）即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(peopleMap[2]);    // 盧小小</code></pre>
        </div>
        <p>但如果不轉換陣列，只用陣列的方法去檢索出盧小小，可能就必須透過 <em>find()</em> 之類的檢索方法，去比對陣列中完全符合盧小小的資料，假如陣列的資料量非常龐大，檢索的效率可能就會比較低。</p>
        <p>用 <em>find()</em> 方法揪出盧小小的資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const result = nameList.find(user => user.name === '盧小小');

console.log(result);    // { "id": 2, "name": "盧小小" }</code></pre>
        </div>
    </div>
    <div class="text-block" id="act8">
        <h2>八、轉換陣列資料為字串（toString、join）</h2>
        <p><em>toString()</em> 方法可以將陣列物件型別轉換為字串並輸出，舉例來說，手邊有一筆陣列資料，內容如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

console.log(nameList);    // ["王小明","李大華","張小芬"]</code></pre>
        </div>
        <p>直接輸出該陣列得到的會是陣列格式的結果，如果我們加入 <em>toString()</em> 方法，就能將陣列轉變為字串：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];

console.log(nameList.toString());    // "王小明,李大華,張小芬"</code></pre>
        </div>
        <p>轉換成字串的實用處之一可以是當我們需要將陣列的資料和其他字串拼接的時候，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var message = "三年甲班的同學有：" + nameList.toString();

console.log(message);    // "三年甲班的同學有：王小明,李大華,張小芬"</code></pre>
        </div>
        <p><br></p>
        <h3>join：</h3>
        <p>承襲上一個陣列資料轉字串輸出的範例，如果我們希望輸出的資料之間不要用「,」區隔，這時便是 <em>join()</em> 派上用場的時候了，<em>join()</em> 方法一樣會將陣列資料轉換為字串，但同時又可以加入我們自定義的區隔符號或特定字符。</p>
        <p>例如我們改用「、」來取代陣列預設的「,」：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var message = "三年甲班的同學有：" + nameList.join("、");

console.log(message);    // "三年甲班的同學有：王小明、李大華、張小芬"</code></pre>
        </div>
    </div>
    <div class="text-block" id="act9">
        <h2>九、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://www.fooish.com/javascript/array/" target="_blank">JavaScript Array (陣列)</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/201908/js-array.html" target="_blank">JavaScript Array 陣列操作方法大全 ( 含 ES6 )</a></dd>
            <dd><a href="https://blog.kdchang.cc/2016/06/23/javascript-data-structure-algorithm-array/" target="_blank">用 JavaScript 學習資料結構和演算法：陣列（Array）篇</a></dd>
            <dd><a href="https://codertw.com/ios/28518/" target="_blank">javascript 陣列的常用方法</a></dd>
            <dd><a href="https://uu9924079.medium.com/javascript-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-array-at-7823fa313fe0" target="_blank">JavaScript 學習筆記－Array.at</a></dd>
            <dd><a href="https://medium.com/@bigfrog0102/js-%E9%99%A3%E5%88%97immutable%E8%99%95%E7%90%86%E8%AA%9E%E6%B3%95-with-tosorted-toreversed-tospliced-409925e0b809" target="_blank">JS- 陣列Immutable處理語法 with, toSorted, toReversed & toSpliced</a></dd>
            <dd><a href="https://w3c.hexschool.com/blog/a2cb755f" target="_blank">JavaScript reduce 在做什麼？</a></dd>
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