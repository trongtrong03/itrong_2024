<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、判斷陣列及轉換資料（isArray、of、from）' },
        { id: 2, title: '二、新增陣列資料（unshift、push）' },
        { id: 3, title: '三、刪除陣列資料（shift、pop）' },
        { id: 4, title: '四、增刪改陣列資料（splice）' },
        { id: 5, title: '五、合併陣列資料（concat）' },
        { id: 6, title: '六、截取陣列資料（slice）' },
        { id: 7, title: '七、複製陣列資料（copyWithin）' },
        { id: 8, title: '八、填充陣列資料（fill）' },
        { id: 9, title: '九、反轉陣列資料（reverse）' },
        { id: 10, title: '十、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="51" fileType="learnList" />
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
        <p>本篇主題將延續上一篇文章，聚焦於 JavaScript 陣列的常用方法進行說明以及如何運用，不過陣列的操作方法非常繁多，所以拆成上、下兩篇文章來記述，而各章節順序與歸類僅基於本新手小白的觀感安排，所以不保證方法歸類一定合乎邏輯，僅供參考爾爾。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <h3>Array.isArray：</h3>
        <p><em>Array.isArray()</em> 方法可以用來判斷指定的目標物件是否為陣列，如果判斷結果是陣列，則回傳 <em>true</em>，反之則傳回 <em>false</em>。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var arr = [1, 2, 3];
console.log(Array.isArray(arr));    // true

var num = 1;
console.log(Array.isArray(num));    // false</code></pre>
        </div>
        <p>通常這個方法在處理使用者或其他來源輸入的資料時特別有用，它可以幫助程式驗證其處理的東西是否為陣列，從而避免出現意外的錯誤。</p>
        <p><br></p>
        <h3>Array.of：</h3>
        <p><em>Array.of</em> 是 ES6 版本引進的陣列靜態方法，如果你還記得前一篇文章陣列兩種宣告方式：<em>[ ]</em> 與 <em>new Array()</em>，曾提到如果傳入的資料參數為單一數值，兩者陣列建立方式的判定會有所不同：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var arr1 = [3];
var arr2 = new Array(3);

console.log(arr1);    // [3]  length: 1
console.log(arr2);    // [,,] length: 3</code></pre>
        </div>
        <p><em>[ ]</em> 會將唯一參數數字當作陣列的第一個值，而 <em>new Array()</em> 則將該數值視為陣列的長度。但如果使用 <em>Array.of</em> 建立陣列，無論裡頭的資料參數是一個還是多個，其一律都當作是陣列的各筆資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var arr1 = Array.of(3);
var arr2 = Array.of(1, 2, 3);
var arr3 = Array.of(1.1, 1.2, 1.3);

console.log(arr1);    // [3]
console.log(arr2);    // [1, 2, 3]
console.log(arr3);    // [1.1, 1.2, 1.3]</code></pre>
        </div>
        <p><br></p>
        <h3>Array.from：</h3>
        <p><em>Array.from</em> 方法可以將指定的目標轉換成另一個新的陣列，這個目標可以是陣列，也可以是一個字串，簡單來說必須是一個可迭代的值。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var str = "iTrong";
var arrFromStr = Array.from(str);
console.log(arrFromStr);    // ["i", "T", "r", "o", "n", "g"]</code></pre>
        </div>
        <p>但假如目標是數字或布林值這些不能迭代的資料型別：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var num = 12345;
var arrFromNum = Array.from(num);
console.log(arrFromNum);    // []</code></pre>
        </div>
        <p>新建立的陣列只會是空陣列。</p>
        <p>所謂的可迭代對象，包含陣列、字串在內，還有 Map、Set 這些 ES6 提供的方法都列屬在內。以 Set 來說，它的功用類似陣列（但它既不是陣列也不是物件，是 JavaScript 中的一種資料結構），但不允許其陣列內的資料有重複的值，假如存在重複的值，則該值只會留下一個，其餘會被自動去除。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var set = new Set([1, 2, 3, 4, 4]);
var arrFromSet = Array.from(set);
console.log(arrFromSet);    // [1, 2, 3, 4]</code></pre>
        </div>
        <p>總體來說，當我們需要將類陣列資料或其他可迭代對象轉換成陣列時，便是 <em>Array.from</em> 派上用場的時候，而它也可以就現有的陣列另外建立一個新的陣列，作到類似複製陣列的「淺拷貝」作用，這樣在操作新陣列資料的時候，也可以避免影響到來源對象的原始內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <h3>unshift：</h3>
        <p><em>unshift()</em> 方法可以將新的資料新增到指定陣列的「前面」，或者也可以說是「左側」。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.unshift("盧小小");

console.log(nameList);    // ["盧小小","王小明","李大華","張小芬"]</code></pre>
        </div>
        <p>如果要新增多筆資料，只需要在每筆資料之間用 <em>,</em> 隔開即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.unshift("盧小小", "黃大大");

console.log(nameList);    // ["盧小小","黃大大","王小明","李大華","張小芬"]</code></pre>
        </div>
        <p><br></p>
        <h3>push：</h3>
        <p><em>push()</em> 方法可以將新的資料新增到指定陣列的「後面」，也可以說是「右側」。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.push("盧小小");

console.log(nameList);    // ["王小明","李大華","張小芬","盧小小"]</code></pre>
        </div>
        <p>如果要新增多筆資料，只需要在每筆資料之間用 <em>,</em> 隔開即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.push("盧小小", "黃大大");

console.log(nameList);    // ["王小明","李大華","張小芬","盧小小","黃大大"]</code></pre>
        </div>
        <p><br></p>
        <p>需要注意的是，這兩個方法都是針對指定陣列本身進行新增資料的操作，因此會影響到指定陣列原本的內容及陣列長度。如果希望在以不更動原有陣列為前提情況下添加新的資料，則可使用 <em>concat()</em> 方法，藉由建立新的陣列來合併不同來源之陣列資料的方式，就可以避免動到原本的陣列資料。</p>
        <p>關於 <em>concat()</em> 方法會在後續章節更進一步介紹與實作。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <h3>shift：</h3>
        <p><em>shift()</em> 方法可以刪除指定陣列中最前面（或稱左側）的資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.shift();

console.log(nameList);    // ["李大華","張小芬"]</code></pre>
        </div>
        <p><em>shift()</em> 就只會刪除陣列中的首筆資料，任何添加在括號裡面的參數皆無作用。</p>
        <p><br></p>
        <h3>pop：</h3>
        <p><em>pop()</em> 方法可以刪除指定陣列中最後面（或稱右側）的資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.pop();

console.log(nameList);    // ["王小明","李大華"]</code></pre>
        </div>
        <p>和 <em>shift()</em> 一樣，都不接受任何傳入的參數，而且也都只會刪除一筆資料，假如需要同時刪除多筆，或者要刪除指定索引值範圍內的資料，則建議使用 <em>splice()</em> 方法。</p>
        <p><br></p>
        <p>以上兩種刪除陣列資料的方法都會影響指定陣列原本的內容和陣列長度，假如想刪除資料的同時又能保留指定陣列的原始資料，我們可以站在反向思維的角度，利用 <em>slice()</em> 方法截取要保留的資料，令其輸出到另外建立的新陣列裡。</p>
        <p><br></p>
        <p>鑒於目前陣列新增與刪除資料的諸項方法都會影響原本陣列的內容，也許會有些人像我一樣萌生一種想法──如果另外建立一個陣列變數去儲存上述陣列方法操作的結果，是不是就可以不影響原本的陣列資料？我們拿 <em>shift()</em> 實際測試：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
var newList = [nameList.shift()];

console.log(nameList);    // ["李大華","張小芬"]
console.log(newList);    // ["王小明"]</code></pre>
        </div>
        <p>可以從輸出結果中發現，這些會影響原始陣列資料的操作方法，執行後會回傳它處理的資料，譬如 <em>shift()</em> 刪除指定陣列的第一筆資料，所以範例中它回傳了「王大明」這筆資料結果，且原始陣列 nameList 也依然受到該方法的影響更新了它的內容，由此得證我那天真的想法並不成立。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p><em>splice()</em> 是陣列裡功能非常強大的方法之一。它可以對指定陣列進行新增、刪除、修改等動作，其語法結構一共包含了三個參數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">arrayObject.splice(index, howmany, item1,.....,itemN)</code></pre>
        </div>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數</div>
                    <div class="f-f1">必要性</div>
                    <div class="f-f5">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>index</em></div>
                    <div class="f-f1">必要</div>
                    <div class="f-f5">指定要新增或刪除的索引值</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>howmany</em></div>
                    <div class="f-f1">必要</div>
                    <div class="f-f5">要移除的資料長度，從哪裡開始即依據第一個值所指定的索引值繼續</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>item1,.....,itemN</em></div>
                    <div class="f-f1">非必要</div>
                    <div class="f-f5">要添加的資料內容</div>
                </div>
            </div>
        </div>
        <p>以下列舉幾種操作方式──</p>
        <p><br></p>
        <h4>1. 新增資料：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.splice(2, 0, "盧小小", "黃大大");

console.log(nameList);    // ["王小明","李大華","盧小小","黃大大","張小芬"]</code></pre>
        </div>
        <p>此範例中 <em>.splice()</em> 方法指定的索引值（<em>index</em>）為 <em>2</em>，即新的資料從陣列中的第三個位置開始新增，而原先第三位的「張小芬」由於 <em>howmany</em> 值為 <em>0</em>，代表此操作刪除 0 筆資料，換句話說就是不刪除原有資料的意思，所以原本索引值位置上的資料只會被依序往後推。</p>
        <p><br></p>
        <h4>2. 刪除資料：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.splice(1, 2);

console.log(nameList);    // ["王小明"]</code></pre>
        </div>
        <p>從陣列索引值 <em>1</em> 的資料開始算，刪除包含它在內的兩筆資料，因此「李大華」和「張小芬」都被刪除了。</p>
        <p><br></p>
        <h4>3. 修改資料：</h4>
        <p>這裡用「修改」一詞其實是不精確的說法，在解釋之前，不妨直接閱讀範例──</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.splice(1, 1, "盧小小");

console.log(nameList);    // ["王小明","盧小小","張小芬"]</code></pre>
        </div>
        <p>以結果論來看，感覺確實就像是我們把陣列裡索引值 1 的「李大華」，改成了「盧小小」沒錯。然而稍加觀察程式碼就會發現，<em>splice()</em> 所做並不是修改，而是先將「李大華」刪除（因為 <em>howmany</em> 為 1，代表刪除一個資料），再將新的資料「盧小小」添加到索引值 1 的位置。</p>
        <p>此外，索引值允許指定負值，若索引參數值為負，即代表從陣列後方開始算起，-1 為陣列最後一格，-2 則是倒數第二，依此類推。</p>
        <p>舉例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬"];
nameList.splice(-1, 1, "盧小小");

console.log(nameList);    // ["王小明","李大華","盧小小"]</code></pre>
        </div>
        <p>索引值 為 -1，代表範例陣列最後一個的資料「張小芬」被移除，然後新增「盧小小」到陣列中。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p><em>concat()</em> 方法用於合併二至多個不同的陣列，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var a = ["A1", "A2", "A3"];
var b = ["B1", "B2", "B3"];
var c = ["C1", "C2", "C3"];
var result = a.concat(b, c);

console.log(result);    // ["A1","A2","A3","B1","B2","B3","C1","C2","C3"]</code></pre>
        </div>
        <p>合併陣列的順序會影響新陣列的資料排序，如果我們把上面例子合併的對象順序改變一下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var result = c.concat(b, a);

console.log(result);    // ["C1","C2","C3","B1","B2","B3","A1","A2","A3"]</code></pre>
        </div>
        <p>可發現 result 新陣列的順序由 c 陣列開始。當然也可以合併相同陣列：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var result = c.concat(a, a);

console.log(result);    // ["A1","A2","A3","A1","A2","A3"]</code></pre>
        </div>
        <p><br></p>
        <p>由於 <em>concat()</em> 方法是建立新的陣列去合併原有陣列，所以原本的陣列資料內容不會受任何影響。即使拿現有陣列去合併其他陣列，你會發現該陣列並沒有任何變化，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(a.concat(b, c));    // ["A1","A2","A3","B1","B2","B3","C1","C2","C3"]
console.log(a);    // ["A1","A2","A3"]</code></pre>
        </div>
        <p>那是因為雖然執行合併了，但原本 a 陣列的資料並沒有更新。如果你希望用現有的陣列合併其他陣列資料，而不希望另外建立一個陣列去操作，那麼只要把合併的結果重新指定給執行合併的陣列變數即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">a = a.concat(b, c);
console.log(a);    // ["A1","A2","A3","B1","B2","B3","C1","C2","C3"]</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p><em>slice()</em> 方法可以截取陣列中的資料，使其成為新的陣列，雖說是「截取」，但也並非直接從原陣列裡把指定資料「剪」出來，而是比較近似複製的概念。<em>slice()</em> 一共可填兩個參數，分別代表索引值（<em>index</em>）的起始值與結束值。具體公式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">ary.slice(start, end)</code></pre>
        </div>
        <p><em>slice()</em> 內的參數都不是必填項目，依據填入參數的與否及不同索引值，新陣列產生的結果也不一樣，以下便一一列舉。首先，要截取的陣列資料如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];</code></pre>
        </div>
        <p><br></p>
        <h4>1. 不填起始與結束值：</h4>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">nameList.slice();</code></pre>
        </div>
        <p>起始值的預設索引值為 0，如果不填入起始值，則直接以預設值作判斷。如果不指定結束的索引值，則會直接截取到陣列最後一筆資料。因此，兩者都不填值的狀況下，等同截取原陣列從 0 開始到最後的所有資料，產生到新建立的陣列裡面。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.slice();

console.log(nameList);    // ["王小明","李大華","張小芬","盧小小","黃大大"]
console.log(result);    // ["王小明","李大華","張小芬","盧小小","黃大大"]</code></pre>
        </div>
        <p>因為 <em>slice()</em> 不會直接影響原本陣列的資料內容，所以才會一再強調它的操作概念類似複製而非剪下。</p>
        <p><br></p>
        <h4>2. 只設起始值：</h4>
        <p>當 <em>slice()</em> 括弧內只填入一個參數時，會將該參數視為起始值。假設數值為 2，代表從陣列第三個位置的資料開始截取（包含該索引值資料在內），直到陣列最後一個資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.slice(2);

console.log(result);    // ["張小芬","盧小小","黃大大"]</code></pre>
        </div>
        <p><br></p>
        <h4>3. 起始值與結束值皆有設置：</h4>
        <p>關於起始值前面已有介紹，這裡就不多說明了，主要得注意的是，截取陣列的資料不包含結束值本身。假設結束值指定為 4 表示資料的第五個位置，但 <em>slice()</em> 新的陣列不會包含它，而是截取到原陣列的前一個位置，也就是索引值為 <em>3</em> 的資料為止。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.slice(1, 4);

console.log(result);    // ["李大華","張小芬","盧小小"]</code></pre>
        </div>
        <p><br></p>
        <h4>4. 參數可以是負數：</h4>
        <p><em>slice()</em> 裡的參數可以是負數，表示資料位置從右邊開始算。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">nameList.slice(-1);  // 從陣列右邊第一位開始截取
nameList.slice(1, -1);  // 從左邊第二位截取至右邊第一位
nameList.slice(-3, -1);  // 從右邊第三位截取至右邊第一位</code></pre>
        </div>
        <p>但是負數的運用也有限制，那就是不能起始值為負數，而結束值則是正數，例如下方的截取方式所回傳結果將會是空陣列：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">nameList.slice(-1, 1);    // []</code></pre>
        </div>
        <p>這是因為 <em>slice()</em> 只能允許從指定索引值位置開始向後（右）提取資料，不能向前（左），上面的例子即表示要從右邊數來第二筆資料向左擷取到第一筆資料，不符合此方法的操作邏輯。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p><em>copyWithin()</em> 方法可以複製陣列的資料，並從指定索引值的位置開始將複製的資料覆蓋原本位置的資料。它一共可填入三個參數值，語法規則如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">ary.copyWithin(target, start, end);</code></pre>
        </div>
        <p>第一個值 <em>target</em> 指的是要置換位置的目標索引值（必填），<em>start</em> 表示要從什麼位置開始複製（預設值為 0），<em>end</em> 則表示要在哪一個位置結束，但不包含該數值索引值本身的位置（預設為陣列長度）。剛說明定義可能仍有些懵懂，以下我們就直接來看各種應用範例：</p>
        <p><br></p>
        <h4>1. 不瑱入任何參數：</h4>
        <p>單純使用 <em>copyWithin()</em> 且不填入任何參數的情況下，新建立的陣列便只是單純複製原本陣列的資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.copyWithin();

console.log(result);    // ["王小明","李大華","張小芬","盧小小","黃大大"]</code></pre>
        </div>
        <p><br></p>
        <h4>2. 只填入目標索引值：</h4>
        <p>當 <em>copyWithin()</em> 只有填入一個參數值，代表陣列將從該數字對應位置的資料開始把複製的陣列資料依序取代原本的內容，由於起始值與結束值都沒有指定，因此複製的範圍涵蓋整個陣列。例如我們填入數值為 3：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.copyWithin(3);

console.log(result);    // ["王小明","李大華","張小芬","王小明","李大華"]</code></pre>
        </div>
        <p>3 指向的索引值為第四個位置的「盧小小」，然後從第一個位置「王小明」的開始複製資料，取代原本陣列「盧小小」的值，逐格複製直到陣列結束。原本陣列的長度不會隨著複製操作而有所改變，若複製資料超過原陣列長度，溢出部份將會直接被忽略。</p>
        <p><br></p>
        <h4>3. 填入起始值：</h4>
        <p><em>copyWithin()</em> 第二個參數值代表資料要從哪一個位置開始複製，假如我們填入的參數值為 <em>copyWithin(2, 1)</em>，表示陣列從第三個位置開始覆蓋資料，而複製的資料從第二個位置的資料起計。請見以下範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.copyWithin(2, 1);

console.log(result);    // ["王小明","李大華","李大華","張小芬","盧小小"]</code></pre>
        </div>
        <p> <br></p>
        <h4>4. 填入結束值：</h4>
        <p><em>copyWithin()</em> 的第三個參數表示停止複製的資料位置，也就是說，資料複製只會到結束索引值的前一個位置，不包含結束索引值本身。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
var result = nameList.copyWithin(2, 1, 3);

console.log(result);    // ["王小明","李大華","李大華","張小芬","黃大大"]</code></pre>
        </div>
        <p><br></p>
        <p>總而言之，不管如何複製，新的複製陣列長度會與原本複製對象的陣列長度相同，只是依據我們填入的參數改變對應位置資料的值而已。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <p><em>fill()</em> 方法可用來將陣列中的資料填充為指定的值，其語法規則為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">ary.fill(value, start, end);</code></pre>
        </div>
        <p><em>value</em> 值是要填充的內容，<em>start</em>、<em>end</em> 和其他方法的用法相同，分別表示要從哪一個索引值位置開始執行，然後到結束值的前一個位置停止填充。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
nameList.fill("林小玉");    // ["林小玉","林小玉","林小玉","林小玉","林小玉"]</code></pre>
        </div>
        <p>像上方程式碼片段只填入 <em>value</em> 的話，即表示陣列所有資料通通都會被 <em>林小玉</em> 給填充。</p>
        <p><em>start</em> 起始值填充範圍會包含填入的索引值位置，而 <em>end</em> 則不包含，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小", "黃大大"];
nameList.fill("林小玉", 0, 3);    // ["林小玉","林小玉","林小玉","盧小小","黃大大"]</code></pre>
        </div>
        <p>從陣列索引值為 0，意即第一個位置的值開始，一直填充新的資料至索引值為 3 的資料位置，但該筆資料不會被填充，所以實際上只有索引值 0 到 2 的原本資料被「林小玉」給填充取代。理所當然地，使用 <em>fill()</em> 方法會影響原本目標陣列的資料內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[9].id">
        <h2 v-text="catalog[9].title"></h2>
        <p><em>reverse()</em> 方法可以用於反轉陣列裡的資料，也就是原本最後一筆資料變成第一個，倒數第二變成第二...依此類推。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var nameList = ["王小明", "李大華", "張小芬", "盧小小"];
nameList.reverse();

console.log(nameList);    // ["盧小小","張小芬","李大華","王小明"]</code></pre>
        </div>
        <p>透過範例可知此方法會影響原本陣列資料的排列順序。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[10].id">
        <h2 v-text="catalog[10].title"></h2>
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