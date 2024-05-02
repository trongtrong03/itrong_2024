<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="63" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、reactive 物件型別的響應式資料</a></li>
            <li><a href="#act2">二、ref 物件型別的響應式資料</a></li>
            <li><a href="#act3">三、ref V.S. reactive</a></li>
            <li><a href="#act4">四、響應式資料解構 toRefs 與 toRef</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>上一篇文章的後半段開始學習 Vue 3 響應式資料定義方法的一小部分，說明基本型別的值，可以利用 <em>ref</em> 使其成為可以被更新的響應式資料。這篇文章除了會繼續深入說明 <em>ref</em> 的用法，也會講講另一個定義方法──<em>reactive</em>，同時也會對兩者進行對比，從中理解各自不同之處。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、reactive 物件型別的響應式資料</h2>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let name = "阿比";
    let age = 18;

    function addAge(){
        age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>承襲上一篇文章的範例，現在我們稍微改變一下內容，把原本 <em>name</em> 以及 <em>age</em> 分開獨立宣告的兩個變數，改由物件來進行管裡：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let user = {
        name: "阿比",
        age: 18
    }

    function addAge(){
        user.age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>但即使改成了物件格式，渲染進 DOM 的資料也依然無法隨著 <em>addAge</em> 事件更新其數值，證據就是如果我們去 Console <em>user.age</em>，可以明確從 Console 上看到它的值確實是有隨著事件觸發作累加，只是新數值並沒有同步響應到 DOM 上對應的資料。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-1.jpg">
        </figure>
        <p>就如同基本型別 <em>ref</em> 的建立方法，物件也是用相同的表達式，只不過關鍵字換成了 <em>reactive</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    function addAge(){
        user.age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>如此一來，模板裡的 <em>age.value</em> 就會隨 <em>addAge</em> 事件觸發而跟著響應更新了。</p>
        <p>用 <em>reactive</em> 建立的物件和一般直接宣告物件之間除了是否為響應式這點不同外還有什麼區別呢？我們可以透過 Console 來瞭解，首先是普通的宣告方式，物件在 Console 打印的結果是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-2.jpg">
        </figure>
        <p>如果是用 <em>reactive</em> 建立的物件，打印的結果則是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-3.jpg">
        </figure>
        <p>你會發現物件的前方多了一個 Proxy(Object)，這個 Proxy 叫作代理物件，是瀏覽器原生就有的函式，假如我們直接 Console 這個 Proxy，會得到以下結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(Proxy);    // ƒ Proxy() { [native code] }</code></pre>
        </div>
        <p>在 Vue 3 中，<em>reactive</em> 函式會傳回一個代理物件，而不是直接傳回傳入的物件。這個代理物件與原始物件之間存在一層代理，Vue 使用 Proxy 來劫持物件的訪問，從而實現響應式資料的追蹤和依賴收集。代理對象與原始物件相比有以下不同：</p>
        <h5>1. 響應式追蹤：</h5>
        <p>代理物件會劫持原始物件的訪問，當代理物件的屬性被存取或修改時，Vue 會自動追蹤這些變化，並在相關的地方觸發視圖更新。 這是 Vue 中實現響應式資料的關鍵機制之一。</p>
        <h5>2. 惰性代理：</h5>
        <p>代理物件是惰性創建的，只有在存取代理物件的屬性時才會真正建立代理。 這意味著代理物件只會在需要時才進行劫持，而不是一次性地劫持整個物件。</p>
        <h5>3. 額外的功能：</h5>
        <p>代理對象提供了一些額外的功能，例如 <em>isProxy()</em> 函式可以用來檢查一個對像是否是代理對象，<em>toRaw()</em> 函式可以用來取得代理對象對應的原始對象，以及 <em>markRaw()</em> 可用於將一個物件標記為非響應式的。</p>
        <p>綜上所述，使用 <em>reactive</em> 創建的對象會變成一個代理對象，這個代理對象會對原始對象的存取進行劫持，從而實現響應式數據的追蹤和依賴收集，這是 Vue 中實現響應式數據的核心機制之一。</p>
        <p><br></p>
        <p>當然 <em>reactive</em> 囊括的物件資料也可以是陣列（Array）或多層嵌套的物件，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let userList = reactive([
    { id: 1, name: "阿比", age: 18 },
    { id: 2, name: "花花", age: 26 },
    { id: 3, name: "喵喵", age: 5 }
])</code></pre>
        </div>
        <p>或</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let obj = reactive({
    stage1: {
        stage2: {
            stage3: "test"
        }
    }
})</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、ref 物件型別的響應式資料</h2>
        <p>說完了 <em>reactive</em>，這個章節又來回頭講講 <em>ref</em>。只是根據前面的說法，再看看本章節的標題，不免產生一個問號：不是說 <em>ref</em> 是用來定義基本型別的響應式資料嗎？怎麼標題又說讓 <em>ref</em> 去定義物件型別響應式資料呢？事實上，是我先前說的不精確，<em>reactive</em> 確實只能用來定義物件型別的響應式資料，若強硬地要用它來定義基本型別倒也不是完全不行，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let name = reactive("阿比");
&lt;/script&gt;</code></pre>
        </div>
        <p>組件渲染到畫面，<em>h1</em> 一樣正常顯示「阿比」，可是打開 Console 視窗，會發現 Vue 發來了警告：</p>
        <blockquote class="is-danger">
            <p>User.vue:15 [Vue warn] value cannot be made reactive: 阿比</p>
        </blockquote>
        <p>很明確告知 <em>reactive</em> 不能直接用於基本型別的資料。</p>
        <p>但 <em>ref</em> 就不一樣了，我們把先前的 <em>reactive</em> 範例改成使用 <em>ref</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let user = ref({
        name: "阿比",
        age: 18
    })

    function addAge(){
        user.age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>回到瀏覽器檢測會發現 DOM 渲染出來的資料沒有問題，這就意味著 <em>ref</em> 不單單是用來定義基本型別的響應式資料，就連物件型別的資料也可以透過 <em>ref</em> 轉換為響應式。</p>
        <p>不過這只是單就資料的部份而言，如果只是單純把 <em>reactive</em> 替換成 <em>ref</em>，你會發現 <em>addAge</em> 方法並沒有如預期觸發事件，回想一下上一章的內容，其實很快就能找到原因：那就是忘記了 <em>.value</em>，上一章有提過，如果要修改 <em>ref</em> 定義的值，就必須透過 <em>value</em> 去賦值，因此再重新稍微調整一下程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let user = ref({
        name: "阿比",
        age: 18
    })

    function addAge(){
        user.value.age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>如此就完美完成了 <em>reactive</em> 物件型別響應式資料的 <em>ref</em> 替換。</p>
        <p>既然 <em>ref</em> 也能定義物件型別響應式資料，那還要留著 <em>reactive</em> 這麼尷尬的東西作什麼呢？我一律採用 <em>ref</em> 建立所有響應式資料不就好了嗎？話也不能完全這麼說，我們可以透過 Console 去觀察由 <em>ref</em> 建立的物件資料，其細節如下圖：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-4.jpg">
        </figure>
        <p>你會發現 _value 那一項後方的值，和 <em>reactive</em> 一樣都是 Proxy(Object)，細節也如出一轍、絲毫不差。由此可見，物件響應式資料並非 <em>ref</em> 本身就可以定義的，它只是接收到我們傳入的物件型別資料，去借用 <em>reactive</em> 來實現響應式，所以即便一概使用 <em>ref</em> 建立響應式資料，也不代表 <em>reactive</em> 毫無用處。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、ref V.S. reactive</h2>
        <p>雖然，完全使用 <em>ref</em> 定義網頁應用的響應式資料是可行的，但我們還是要不免俗地分析一下這兩者的對比，以及各自適合的使用時機。</p>
        <p>先說說所有網頁應用都使用 <em>ref</em> 的壞處，大概就是如果開發者要變更 <em>ref</em> 資料的數值，需要時時刻刻記得在變數後方添加 <em>.value</em>。（如果在 VS Code 安裝 Volar 擴充模組就可以解決這個困擾，該模組可以自動為開發者補上 <em>.value</em>）</p>
        <p>而 <em>reactive</em> 除了有著不能用來定義基本型別資料的缺點外，如果要用它來重新分配一個新的物件，那麼它將會失去響應式功能。什麼是重新分配新的物件？舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "changeUser();"&gt;切換使用者&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    function changeUser(){
        user = {
            name: "喵喵",
            age: 32
        }
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>我們在 <em>changeUser</em> 事件中重新定義了 <em>user</em> 物件的內容，我們試圖點擊按鈕觸發該事件，讓 <em>h1</em>、<em>h2</em> 裡的資料能替換新的物件資料，這就叫重新分配。實際執行這段程式碼，會發現按鈕點擊下去，畫面並沒有任何反應，可是 Console <em>user</em> 值還是可以看到物件內容是有被更新的：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-5.jpg">
        </figure>
        <p>這意味著如果要讓新的物件取代原有物件裡的內容，使用 <em>reactive</em> 反而會使它原本定義的響應式資料物件失去了響應式的效果。</p>
        <p>有些人會覺得，那我直接針對 <em>user</em> 物件裡的屬性一一去重新給值不就可以？例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    user.name = "喵喵";
    user.age = 32;
}</code></pre>
        </div>
        <p>確實這麼做可以，但問題是如果今天物件裡的屬性多達數十種呢？難道要一一條列寫上去嗎？顯然這並非好的處理方式。通常面對這種需求，我們會使用 <em>Object.assign</em> 函式方法，它的語法格式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">Object.assign(target, ...sources)</code></pre>
        </div>
        <p><em>target</em>：指目標物件，也就是需要被複製的物件。</p>
        <p><em>sources</em>：一或多個來源物件，它們的屬性將會被複製到目標物件裡。</p>
        <p>透過此函式方法，將原本程式碼改寫成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    Object.assign(user, {name: "喵喵", age: 32});
}</code></pre>
        </div>
        <p>如此就能順利地更新原本響應式資料 <em>user</em> 物件裡屬性的值了。</p>
        <p>在這裡延伸一下 <em>Object.assign</em> 的應用，假如今天它引用的 <em>sources</em> 包含原本目標物件沒有的屬性，結果會發生什麼事？比如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    Object.assign(user, {name: "喵喵", age: 32}, {gender: "女"});
}</code></pre>
        </div>
        <p>用 Console 去觀看觸發 <em>changeUser</em> 事件後的 <em>user</em> 物件：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-6.jpg">
        </figure>
        <p>來源多出來的屬性會作為新的屬性添加到目標物件裡面。</p>
        <p><br></p>
        <p>回到 <em>ref</em>，相同需求（重新分配物件）下，<em>ref</em> 處理起來就直觀、簡單許多，直接將新的物件資料指定給 <em>.value</em> 即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";

let user = ref({
    name: "阿比",
    age: 18
})

function changeUser(){
    user.value = { name: "喵喵", age: 32 }
}</code></pre>
        </div>
        <p>所以我們可以直接大膽地說，凡經過 <em>.value</em> 修改的值，不管是針對單一屬性還是直接給予一整個物件，它都必定會是響應式的資料。</p>
        <p><br></p>
        <p>看來看去，多半還是對於 <em>ref</em> 與 <em>reactive</em> 使用時機感到懵懵懂懂，說穿了，撇除掉它們的硬限制不談，資料定義要用哪一種其實沒那麼絕對，但真要給出一個比較明確的分野，以下彙整出目前網路上比較推薦的建議：</p>
        <ul>
            <li>若需要一個基本型別的響應式資料，使用 <em>ref</em>。</li>
            <li>若需要一個物件型別的響應式資料，但層級不深，使用 <em>ref</em>、<em>reactive</em> 都可以。</li>
            <li>若需要一個物件型別的響應式資料，但層級較深，或者與表單較相關聯者，建議使用 <em>reactive</em>。</li>
        </ul>
    </div>
    <div class="text-block" id="act4">
        <h2>四、響應式資料解構 toRefs 與 toRef</h2>
        <p>在闡述 <em>toRefs</em> 與 <em>toRef</em> 用途之前，先稍微聊聊 JavaScript 的解構賦值。JavaScript 的解構賦值是一種能方便地從陣列或物件中提取資料並賦值給變數的語法。它允許我們使用類似模式匹配的語法，從複雜的資料結構中提取部分資料，然後將這些資料賦值給變數。它的基本語法格式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let [variable1, variable2, ...rest] = array;</code></pre>
        </div>
        <p><em>[ ]</em> 裡面是我們宣告的變數，用來儲存陣列中對應位置的值。</p>
        <p><em>array</em> 是要用來解構的陣列。</p>
        <p><em>...rest</em> 則用來接收陣列與變數對應後剩餘下來的資料。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let [a, b, ...rest] = [1, 2, 3, 4, 5, 6];
console.log(a);    // 1
console.log(b);    // 2
console.log(...rest);     // 3 4 5 6</code></pre>
        </div>
        <p>以上是陣列解構賦值的格式，既然陣列可以，那物件同樣也可以用於解構賦值，它的語法格式是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let { property1: variable1, property2: variable2, ...rest } = object;</code></pre>
        </div>
        <p>因為結構和陣列解構賦值差不多，所以就不再重複敘述一遍各個參數的意義，直接來看範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let { name, age } = { name: "阿比", age: 18 };
console.log(name);    // 阿比
console.log(age);    // 18</code></pre>
        </div>
        <p>使用解構賦值的好處是可以用在陣列和物件，使得從資料結構中提取資料變得更加簡潔和方便，它在處理複雜資料結構時非常有用，並且能夠提高程式碼的可讀性。</p>
        <p>既然知道解構賦值的用途和用法後，接下來要思考的是，解構賦值是否可以取得 <em>reactive</em> 物件響應式資料的值？以先前的範例來說，我們如果試圖用解構賦值來取值，程式碼將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ user.name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ user.age }}&lt;/h2&gt;
    &lt;button @click = "changeUser();"&gt;Change&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    let { name, age } = user;

    function changeUser(){
        user.name = "咪咪";
        user.age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>我們刻意在解構賦值新增了 <em>name</em> 和 <em>age</em> 這兩個變數，對應物件 <em>user</em> 的同名屬性。</p>
        <h5>1. 解構賦值中的 <em>name</em> 和 <em>age</em> 是否可以取得 <em>reactive</em> 響應式資料物件對應的值？</h5>
        <p>答案是可以。我們可以用 Console 輸出它的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let { name, age } = user;
console.log(name, age);    // 阿比, 18</code></pre>
        </div>
        <h5>2. 如果我們把模板中的 <em>user.name</em> 和 <em>user.age</em> 替換成解構賦值提取的 <em>name</em> 和 <em>age</em>，是否可以顯示資料？</h5>
        <p>答案也是可以。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;    &lt;!-- 阿比 --&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;    &lt;!-- 18 --&gt;
&lt;/template&gt;</code></pre>
        </div>
        <h5>3. 承上，如果我們點擊按鈕觸發 <em>changeUser</em> 事件，資料是否會發生變化？</h5>
        <p>將原本 <em>user.</em> 全部改由解構賦值對應的變數所取代：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;
    &lt;button @click = "changeUser();"&gt;Change&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    let { name, age } = user;

    function changeUser(){
        name = "咪咪";
        age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>測試結果得到答案為「否」，因為模板裡的資料並沒有隨著 <em>changeUser</em> 事件觸發而有所變化。要如何確認 <em>changeUser</em> 究竟有沒有在執行，我們一樣可以用老方法 Console 進行確認：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    name = "咪咪";
    age += 1;
    console.log(name, age);
}</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-7.jpg">
        </figure>
        <p>更甚者，我們可以同時 Console 解構賦值的變數以及 <em>reactive</em> 建立的變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    name = "咪咪";
    age += 1;
    console.log("name: " + name + " / " + "age: " + age);
    console.log("user.name: " + user.name + " / " + "user.age: " + user.age);
}</code></pre>
        </div>
        <p>反覆多次觸發 <em>changeUser</em> 事件：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-8.jpg">
        </figure>
        <p>明確可以看到解構賦值變數的值確實一直都有在變化，只是渲染到 DOM 畫面上的資料並沒有跟著更新；反倒是原本 <em>reactive</em> 建立的物件響應式資料始終沒有任何改變，但這也是理所當然的結果，因為 <em>changeUser</em> 事件的邏輯是針對解構賦值的變數進行操作。</p>
        <p>經過以上測試，你應該已經發現，解構賦值的變數和重新分配新的物件有一點點像，從響應式資料身上提取出來的新資料，都會失去原本響應式的作用。如果我們希望解構賦值的變數資料仍保有響應式功能，這時就需要使用一個方法──<em>toRefs</em>。</p>
        <p><em>toRefs</em> 顧名思義就是將解構賦值裡面的變數，轉換成 <em>ref</em> 形式的響應式資料。以下先單純只改寫 <em>user</em> 物件的部份：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { reactive, toRefs } from "vue";

let user = reactive({
    name: "阿比",
    age: 18
})

let { name, age } = toRefs(user);</code></pre>
        </div>
        <p>然後我們一樣用 <em>console.log(name, age)</em> 去觀察解構賦值的變數內容：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-9.jpg">
        </figure>
        <p>儘管和 <em>ref</em> 定義的響應式資料有那麼一點不同，但還是可以看到它們的類（Class）「ObjectRefImpl」字樣中夾帶了 RefImpl，這其實就明確表示經由 <em>toRefs</em> 創建的解構賦值變數等同用 <em>ref</em> 建立的響應式資料。</p>
        <p>或是我們也可以直接打印 <em>toRefs(user)</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(toRefs(user));    // {name: ObjectRefImpl, age: ObjectRefImpl}</code></pre>
        </div>
        <p><em>user</em> 裡面的屬性都轉換成了 <em>ref</em> 響應式資料，所以解構賦值的 <em>let { name, age }</em> 就等同解構了 <em>{ name: ObjectRefImpl, age: ObjectRefImpl }</em>。</p>
        <p>回來接著繼續講 <em>changeUser</em> 函式的部份，因為解構賦值的變數轉換成 <em>ref</em> 響應式資料，那麼按照規則，如果要改變它們的值，必須在變數名稱後方加上 <em>.value</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeUser(){
    name.value = "咪咪";
    age.value += 1;
    console.log("name: " + name.value + " / " + "age: " + age.value);
    console.log("user.name: " + user.name + " / " + "user.age: " + user.age);
}</code></pre>
        </div>
        <p>底下多寫兩行 Console 來幫助我們觀察事件觸發後解構賦值和原本 <em>reactive</em> 建立的 <em>user</em> 物件資料的變化：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-2-10.jpg">
        </figure>
        <p>可以看到事件一旦觸發，不管是解構函式轉換的 <em>ref</em> 資料還是原本 <em>reactive</em> 建立的資料，通通都響應事件改變了原本的數值。</p>
        <p><br></p>
        <p>至於另一個 <em>toRef</em> 函式使用的場合比較少，因為它其實就是 <em>toRefs</em> 的解構賦值單一變數的版本，一次只會提取並轉換一個響應式的資料。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { reactive, toRef } from "vue";

let user = reactive({
    name: "阿比",
    age: 18
})

let name = toRef(user, "name");
console.log(name.value);    // 阿比</code></pre>
        </div>
    </div>    
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=d5mrJfl6UWM&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=1" target="_blank">【极简Vue3】001 Vue3开篇</a></dd>
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