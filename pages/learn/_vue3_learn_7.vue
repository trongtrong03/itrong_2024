<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="68" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、建立 TS 接口與自定義類型</a></li>
            <li><a href="#act2">二、父子組件的傳遞通訊</a></li>
            <li><a href="#act3">三、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p><em>props</em> 是 Vue.js 中用於父子組件通訊的機制。 透過 <em>props</em>，父組件可以向子組件傳遞數據，子組件則可以接收並使用這些資料。 在 Vue.js 中，子組件透過在自身的選項中定義 <em>props</em> 來聲明需要接收的屬性，並且這些屬性可以在子組件的模板中直接使用。</p>
        <p>到了 Vue 3，<em>props</em> 的使用方式和 Vue 2 基本上仍然相同，不過 Vue 3 採用 Composition API 的架構，所以語法格式和 Vue 2 會有些差異，此外也新增了一些特殊函式 API，讓 <em>props</em> 使用上更加強大。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、建立 TS 接口與自定義類型</h2>
        <p>Vue 3 除了主打 Compostion API 此一特色之外，也提倡開發者多使用 TypeScript 作為撰寫 Vue 3 的主要程式語言，所以在開始使用 <em>props</em> 之前，我們先稍微學習一些 TypeScript 的語法，把要用來傳遞的參數制定一套「規格化」的標準。不過重點還是放在 Vue 3 <em>props</em> 的運用，所以不會太深入 TypeScript 的語法規則。</p>
        <h3>為什麼需要制定標準？</h3>
        <p>假設現在有個子組件，它的程式碼內容如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div class="user"&gt;{{ user.name }} - {{ user.age }}&lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let user = {
        id: 1, 
        name: "阿比",
        age: 18
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>這個組件模板展示了 <em>user</em> 的名字和年齡，程式碼看起來沒有問題，實際上模板中的 <em>user.name</em> 和 <em>user.age</em> 也確實能對應到 <em>script</em> 定義的資料。那，假設不小心資料裡的屬性名稱 Key 錯了，比如把 <em>name</em> 誤植成 <em>nmae</em>，而我們一時間也沒發現異狀，組件在渲染的時候會發生什麼事呢？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div class="user"&gt;{{ user.name }} - {{ user.age }}&lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let user = {
        id: 1, 
        nmae: "阿比",    // 屬性名稱誤植拼錯
        age: 18
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>會發現 DOM 只會顯示年齡，名字則不會顯示，但因為顯示的內容很少，且出問題的資料和引用資料的模板元素都放在同一支檔案裡，所以我們很快就能查覺到錯誤，並且盡速修正。可是假如網頁內容很多呢？又或者引用的資料來自別的檔案，或引用某個組件裡的某組件裡的某組件裡的某些資料，我們就需要花大量時間和心力，抽絲剝繭地尋找問題源頭──而這還是我們已經知道資料有狀況的前提，因為模板抓資料時對應不上相符的來源名稱，將會直接跳過留白，而瀏覽器也不會回報錯誤，這有可能會讓開發者沒有意識到該筆資料的內容有誤。</p>
        <p>所以為了解決這個問題，最好的辦法就是從一開始建立好一套標準格式，讓整個網頁應用裡定義同類型的資料通通都得依循這套格式，而這時候就需要使用 TypeScript 了。</p>
        <h6>1. 建立 <b>.ts</b> 文件</h6>
        <p>於 <b>src/</b> 資料夾中建立 <b>types/</b> 資料夾，並且在該資料夾內新增一個格式為 <b>.ts</b> 的檔案文件，取名為 <b>index.ts</b>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
└── types
     └── index.ts</code></pre>
        </div>
        <p><br></p>
        <h6>2. 定義接口對象</h6>
        <p>在 <b>index.ts</b> 定義以下程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export interface UserInter {
    id: number,
    name: string,
    age: number
}</code></pre>
        </div>
        <p><em>interface</em> 是一個抽象結構，用來描述物件的「形狀」，形狀指的就是物件的屬性與方法。之所以說它抽象，是因為它只能用來定義物件的類型規範，但本身並不包含實作。</p>
        <p>我們定義的規範包含三個屬性，分別是 <em>id</em>、<em>name</em>、<em>age</em>，並且明確敘述它們各自的值是什麼樣的資料型別，資料型別字首的大小寫有別，但這裡統一使用小寫。</p>
        <p><br></p>
        <h6>3. 於組件裡引用規範</h6>
        <p>回到要建立相關資料的組件 <em>import</em> 這個規範來源：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup&gt;
    import { type UserInter } from "../types"
&lt;/script&gt;</code></pre>
        </div>
        <p>為了證明定義的 <em>UserInter</em> 不是實體結構，我們可以嘗試用 Console 輸出它的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">
console.log(UserInter);    // User.vue:9 Uncaught ReferenceError: UserInter is not defined</code></pre>
        </div>
        <p><br></p>
        <h6>4. 為資料加上規範限制</h6>
        <p>再來就是給我們要定義的資料加上於 TS 文件寫好的規範限制，語法如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let user:UserInter = {
    id: 1, 
    name: "阿比",
    age: 18
}</code></pre>
        </div>
        <p>如此就為這個 <em>user</em> 變數所定義的資料成功加上了限制，假如你所使用的編輯器（例如 VSCode）有安裝 Vue 3 或 TypeScript 相關擴充套件，如果在資料屬性定義過程中出現了不符合規範的行為，譬如 <em>name</em> 錯寫成 <em>nmae</em>，那麼編輯器通常會立刻出現紅線並告知相關錯誤訊息。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-7-1.jpg">
        </figure>
        <p><br></p>
        <p>前面定義的是單一資料規範，然而多數時候我們要建立的資料會是一個陣列裡面包含多筆資料，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let userList = [
    { id: 1, name: "阿比", age: 18},
    { id: 2, name: "喵喵", age: 40},
    { id: 3, name: "花花", age: 6}
]</code></pre>
        </div>
        <p>如果要套用我們定義好的 TS 規範，可以這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let userList:Array&lt;UserInter&gt; = [
    { id: 1, name: "阿比", age: 18},
    { id: 2, name: "喵喵", age: 40},
    { id: 3, name: "花花", age: 6}
]</code></pre>
        </div>
        <p>但是這麼做並不是最好的寫法，因為如果要套用的規範不只有一個，<em>Array</em> 裡面引用的規範名稱越加越長就越不好閱讀，因此像陣列這種情況，我們會在 TS 裡面追加定義，稱為自定義類型：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export interface UserInter {
    id: number,
    name: string,
    age: number
}

export type Users = UserInter[]    // 新增自定義類型，引用自 UserInter 的規範</code></pre>
        </div>
        <p>回到組件，同樣要加新定義好的 <em>Users</em> import 到組件裡：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup&gt;
    import { type UserInter, type Users } from "../types"

    let userList:Users = [
        { id: 1, name: "阿比", age: 18},
        { id: 2, name: "喵喵", age: 40},
        { id: 3, name: "花花", age: 6}
    ]
&lt;/script&gt;</code></pre>
        </div>
        <p>然後 <em>userList</em> 就能直接套用 <em>Users</em> 的規範了，一旦陣列的某筆資料的屬性名稱或值的型別有誤，就可以馬上看到編輯器傳出警告：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-7-2.jpg">
        </figure>
    </div>
    <div class="text-block" id="act2">
        <h2>二、父子組件的傳遞通訊</h2>
        <p>首先要有一個基本認知：父組件可以傳遞資料給子組件，但子組件不能傳遞資料給父組件。基於這個原則，接下來範例我們把 <b>App.vue</b> 當作父組件，簡單為其引用的子組件提供一個屬性值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;User demo="hello!"/&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import User from "./components/User.vue";
&lt;/script&gt;</code></pre>
        </div>
        <p>然後在子組件 <b>User.vue</b> 接收父組件傳進來的值，如何接收呢？第一步先引入傳遞函式 API <em>defineProps</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { defineProps } from "vue";</code></pre>
        </div>
        <p>但是這個引入與否其實無所謂，因為 <em>defineProps</em> 在 Vue 3 組件中預設就已經被引用進來。</p>
        <p>再來是調用 <em>defineProps</em> 函式的部分，語法很簡單，就在函式裡面寫一個陣列，然後把父組件傳遞的屬性名稱填進來即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps(["demo"]);</code></pre>
        </div>
        <p>假如要接收的父組件傳遞屬性不只一個，那麼只要在陣列裡面每筆資料都用逗號相隔即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps(["demo", "a", "b", "c"]);</code></pre>
        </div>
        <p>這樣就完成了簡單的屬性接收，我們可以直接在子組件模板裡使用接收進來的屬性值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2&gt;{{ demo }}&lt;/h2&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    defineProps(["demo"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>確認結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-7-3.jpg">
        </figure>
        <p>儘管子組件已經可以接收到父組件傳遞進來的參數了，但光只這樣寫其實存在一個問題。假設我們要在子組件裡對傳遞進來的 <em>demo</em> 進行操作，會發現根本取得不到它。以簡單的 Console 為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps(["demo"]);
console.log(demo);    // Uncaught (in promise) ReferenceError: demo is not defined</code></pre>
        </div>
        <p>會發現瀏覽器直接回傳 <b>Uncaught (in promise) ReferenceError: demo is not defined</b> 表示 <em>demo</em> 並未被定義的錯誤訊息，但其實這也不難理解，因為子組件中傳進來的 <em>demo</em> 是陣列裡的某一個值，本身並非變數。</p>
        <p>所以為了讓接收到的參數能被保存起來使用，我們需要這麼做：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let x = defineProps(["demo"]);</code></pre>
        </div>
        <p>透過變數宣告讓傳進來的值直接變成變數。這時若再去打印這個 <em>x</em>，得到的輸出結果就會是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-7-4.jpg">
        </figure>
        <p>只不過實務上還是以直接接收傳遞值的寫法比較常見。</p>
        <p><br></p>
        <p>前面講完父組件如何傳遞簡單的值給子組件，接著來看父組件如果要傳陣列資料給子組件使用，該怎麼做？</p>
        <p>以下方父組件裡的程式碼為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;User/&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import User from "./components/User.vue";
    import { reactive } from "vue";
    import { type Users } from "./types";

    let userList = reactive&lt;Users&gt;([
        { id: 1, name: "阿比", age: 18},
        { id: 2, name: "喵喵", age: 40},
        { id: 3, name: "花花", age: 6}
    ])
&lt;/script&gt;</code></pre>
        </div>
        <p>我們用 <em>reactive</em> 定義了一個響應式的陣列資料，並且套用第一個章節建立的 TS 自定義類型 <em>Users</em> 的規範標準。</p>
        <p>現在要把 <em>userList</em> 的資料傳遞給 <em>&lt;User/&gt;</em>，和單純透過自訂屬性賦值不同，我們需要借助 <em>v-bind</em> 定義一個屬性名稱，然後把 <em>userList</em> 賦值給它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;User :list="userList"/&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>回到子組件，把 <em>list</em> 傳遞給它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2>{{ list }}&lt;/h2&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import {} from 'vue';

    defineProps(["list"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>如此應該就能在頁面上看到傳遞進來的資料了：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-7-5.jpg">
        </figure>
        <p>當然直接這樣秀出來在畫面上不怎麼美觀，既然子組件已經能取得傳遞進來的資料，那後續就能依照設計風格自行調整排版。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;ul&gt;
        &lt;li v-for="item in list" :key="item.id"&gt;
            &lt;p&gt;{{ item.name }} - {{ item.age }}&lt;/p&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>雖然發展到這裡，子組件確實已經能接收來自父組件傳遞的陣列資料，但光只是這樣寫仍無法避免一些風險，比如今天父組件傳給 <em>list</em> 的東西不是陣列資料，而是單純的值呢？例如數字 3，那麼子組件接收到的資料就只是單純的數字，原本的 <em>v-for="item in list"</em> 的 <em>list</em> 值變成了 <em>3</em>，導致 <em>v-for</em> 以為程式的指令是要將 <em>li</em> 重複寫三次。而元素裡面抓取的 <em>name</em> 和 <em>age</em> 也因為找不到這些對應的屬性，最終只能顯示空白。</p>
        <p>對於謹慎的開發者來說要避免這樣的疏失並非多困難的事情，但無法保證團隊裡的其他人也是如此，且再仔細的人也總有百密一疏的時候，如果不小心一個手滑把選起來的資料改掉了，終究還是會造成程式問題。既然如此，一開始便設定好限制，就能最大幅度降低意外狀況的發生。</p>
        <p>所以，在父組件資料已經套上規範的情況下，子組件同樣也要加上規範限制：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps&lt;{list:Users}&gt;;</code></pre>
        </div>
        <p>當父組件要傳遞了不符合 TS 自定義規範的資料給子組件，瀏覽器就會發出警告：</p>
        <blockquote class="is-danger">
            <p>[Vue warn]: Invalid prop: type check failed for prop "list". Expected Array, got Number with value 3.</p>
        </blockquote>
        <p>我們還可以更進一步限制必要性：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps&lt;{list?:Users}&gt;;</code></pre>
        </div>
        <p><em>?</em> 表示非必要性，加入此符號，那麼當父組件從頭到尾都沒傳遞 <em>list</em> 資料給子組件，子組件沒接收到資料，就不會去處理 <em>v-for="item in list"</em> 的內容，DOM 也不會去渲染它。</p>
        <p>如果沒有設定非必要性的狀況下，子組件引用了父組件沒有傳遞的資料，則瀏覽器會發出警告：</p>
        <blockquote class="is-danger">
            <p>main.ts:6 [Vue warn]: Missing required prop: "list" </p>
        </blockquote>
        <p>但是限制必要性的目的不是單純忽略警告而已，通常既然設下了限制必要性，就會同時設定一個預設值，好讓子組件在接收到不存在的資料時，另外顯示預設的內容，而不是讓畫面該功能區塊徒留一抹空白......</p>
        <p>要設定預設值，需要先引入 <em>withDefaults</em> 函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { withDefaults } from 'vue';</code></pre>
        </div>
        <p>然後把前面寫的 <em>defineProps</em> 放進去 <em>withDefaults</em> 函式裡面，並於後方 <em>{ }</em> 添加 <em>list</em> 的預設資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">withDefaults(defineProps<{list?:Users}>(), {
    list:()=> [{
        id: 0,
        name: "阿比",
        age: 18
    }]
});</code></pre>
        </div>
        <p>如此便大功告成，假如子組件接收到了父組件不存在的資料參數，那麼子組件原本要呈現資料的位置內容就會是它預設的內容了。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=PnJXrVdbXOw&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=25" target="_blank">【极简Vue3】025 props的使用</a></dd>
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