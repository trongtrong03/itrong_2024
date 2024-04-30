<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="75" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、狀態管理的本質</a></li>
            <li><a href="#act2">二、集中式狀態管理</a></li>
            <li><a href="#act3">三、Vuex 與 Pinia</a></li>
            <li><a href="#act4">四、Pinia 安裝與設定</a></li>
            <li><a href="#act5">五、儲存與讀取資料數據</a></li>
            <li><a href="#act6">六、修改狀態資料的方式</a></li>
            <li><a href="#act7">七、defineStore 另一種寫法</a></li>
            <li><a href="#act8">八、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>細看目前的網頁前端開發生態，將龐大的程式碼切割成更細小，分離出可管理的部分，好讓開發者可以重複使用，這樣的作法儼然已是不可避免的主流趨勢，實現這樣理想的常見有兩種設計方法，一是「模組化」（Modularization），另一種則是「組件化」（Componentization）。前者通常可以由原生 JavaScript ES6 Modules 機制實現，或是 Node.js 的 CommonJS、Asynchronous Module Definition（AMD）等；後者則有我們熟知的 Vue.js、React.js 這類著名的前端框架工具，它們將程式分解為各自獨立、可重複使用的模組，每個模組都可稱為組件，這些組件通常都具有明確定義的功能和介面。儘管模組化與組件化設計原則看起來十分相似，不過兩者的著重點與應用場景略有不同，模組化較著重於程式碼結構的分解與組織，組件化則比較關注使用者介面的建構和管理。</p>
        <p>因為本系列文章的主角是 Vue.js，所以重點會聚焦在組件化的討論，而 Vue.js、React.js 這些前端框架之所以能成為現今網頁前端開發的主流，除了其提供最基本的組件化功能外，它們還重視另一個非常重要的特性──狀態管理。什麼是狀態管理？為什麼要重視？它能為組件化設計帶來哪些正面影響？接下來的內容將要深入探討組件與狀態管理之間的關係。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、狀態管理的本質</h2>
        <p>在開始講狀態管理之前，我們需要先認識組件的概念。儘管之前一系列的文章已經提到各式各樣不同名詞的組件，例如父與子組件、一般與路由組件等，但這些組件名稱多半是依據功能面與結構面來做稱呼。如果要銜接之後要敘述的狀態管理，那麼我們應該要把組件精確分成兩種類型，分別是「原語组件」（Primitive Component）以及「複合組件」（Composite Component）</p>
        <p><br></p>
        <h3>原語組件（Primitive Component）：</h3>
        <p>原語組件是指應用程式中最基本的組件，通常是具有特定功能或樣式的組件，例如按鈕、輸入方塊、標籤等。這些組件通常是簡單的、不包含其他組件的基本建構塊。在 Vue.js 中，我們可以透過定義全域或局部的組件來建立原語組件，然後在應用程式中多次使用它們。</p>
        <p>原語組件不可分割，也沒有子結構，就像物理世界的原子一樣，是最基本的單位。</p>
        <p><br></p>
        <h3>複合組件（Composite Component）：</h3>
        <p>複合組件是由一個或多個原語組件或其他複合組件組合而成的更複雜的組件。複合組件通常用於建立應用程式中的更大的功能塊或介面部分。它們可以包含邏輯、樣式和其他組件，並且可以根據需要重複使用。在 Vite 創建的專案裡，基本會有一個用來呈現各個組件的根組件 <b>App.vue</b>，它就是複合組件的一種，因為它可能包含多個原語組件以及其他複合組件，形成應用程式的整體結構。</p>
        <p>複合組件可以將多個相同或不同的組件組合起來形成一個小型的文檔樹（Lite Dom Tree），以用來實現網頁多樣且複雜的功能，如果有必要，我們也可以再把這個小型文檔樹再包裝成一個組件，成為其它小型文檔樹的材料，宛如物理世界的分子一般，具備無限的組合性。</p>
        <p>雖然小型文檔樹是複合組件重要的組成部分，但卻不是複合組件的全部，廣泛來說複合組件其實就是 JavaScript 物件，它有構造函式，也有一些被調用時可以進一步操作的設定。譬如接收傳遞過來的一些 Props 參數，或是自定義一些方法，像是向伺服器端發送請求索取資料等。</p>
        <p>複合組件物件內部所包含的資料通常稱為「內聯數據」（Inline Data），內聯數據是只屬於該組件自身的資料，假如要傳給其他組件，則必須透過傳遞參數的方式，把內聯數據轉移給它的子組件，而子組件也可以透過同樣的方式，再將自己的內聯數據傳遞給它的子組件（孫組件），逐級類推直到原語組件。</p>
        <p>當瀏覽器載入頁面時，從最頂層的複合組件開始建構，然後內聯數據逐層被傳遞，直到整個頁面渲染完成，一旦瀏覽器關閉頁面，內聯數據與複合組件則雙雙被移除，這就是網頁一次生命週期的完整流程，由此可見內聯數據只會在頁面運行期間有效。至於這些內聯數據其實就是網頁應用中所需要管理的「狀態」，開發者們將內聯數據視為狀態並進行管理，它可以被瀏覽器渲染顯示，但卻不是一個永久持續存在的資料，只在網頁開啟到關閉之間有效。</p>
        <p>前面理論落落長一串，終於提到了本篇文章的主題──「狀態」，簡單來說狀態管理其實就是指管理網頁應用裡資料數據的過程，這些資料狀態可以包括應用程式的各種信息，例如用戶身份認證狀態、購物車內容、主題設定等等。狀態管理程式庫（如 Vuex 和 Pinia）可協助開發人員在應用程式中有效地管理這些狀態，並確保狀態的一致性、可預測性和可維護性。</p>
        <p>具體來說，狀態管理庫提供以下功能和概念：</p>
        <h4>1. 集中式狀態儲存：</h4>
        <p>狀態管理庫通常將應用程式的狀態儲存在一個集中的地方，稱為狀態儲存或狀態容器。這使得所有元件都可以存取和修改應用程式的狀態，而無需透過逐層傳遞props或事件來管理狀態。</p>
        <h4>2. 狀態的響應式更新：</h4>
        <p>狀態管理庫會自動將狀態變化反映到元件中，確保元件始終與狀態保持同步。這通常透過Vue的響應式系統或類似的機制來實現。</p>
        <h4>3. 嚴格的狀態變更規則：</h4>
        <p>為了確保狀態的一致性和可預測性，狀態管理庫通常會實施一些規則和約束，例如只能透過特定的方式修改狀態，透過提交 mutation 或 執行 action 之類的。</p>
        <h4>4. 分模組組織：</h4>
        <p>隨著應用程式的成長，狀態管理庫允許開發人員將狀態拆分為多個模組，每個模組管理特定領域的狀態。這樣做可以提高程式碼的可維護性和可擴充性。</p>
        <h4>5. 非同步（異步）處理：</h4>
        <p>某些狀態管理庫還提供了非同步處理功能，允許開發人員處理非同步操作（例如API請求）並在操作完成後更新狀態。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、集中式狀態管理</h2>
        <p>雖然前面提過狀態管理庫採用的是集中式狀態管理，不過狀態管理實際上可分為兩種形式，分別是「分散式」狀態管理以及「集中式」狀態管理，在集中式狀態管理出現之前，狀態管理的形式基本處於分散式的管理方式，這是因為每個組件都有自己的狀態，且只為自己的狀態負責，單就局部來看，組件各自管理自己的狀態似乎沒有什麼不妥，因為我們如果需要查找或修改某個狀態，只需要在該組件文件裡頭作業就好。</p>
        <p>分散式狀態管理示意圖：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-1.jpg">
        </figure>
        <p>可是放大到整個網頁應用全局的角度，會發現這樣的作法其實很消耗系統資源，尤其是對一些公共的資料數據來說，同樣的內容在不同組件多次被請求，勢必增加伺服器端的壓力，也可能使瀏覽器產生延遲。</p>
        <p>於是乎，集中式狀態管理的概念便誕生了，它將分散式的狀態集中一處，俗稱狀態的中心，它削弱了複合組件宣告自身私有狀態的權力，且複合組件也無法直接發送請求索討資料，一切權力轉交給狀態中心進行管理，這就好比集權國家，重大政令統一由中央制定頒布，各縣市僅能接收實行，而並不具備私自明訂法令的權力。</p>
        <p>集中式狀態管理示意圖：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-2.jpg">
        </figure>
        <p>複合組件功能被削弱後，它就變成了單純驅動畫面的函式組件，所有需要渲染的資料數據都從名為「State」的狀態中心獲取，任何變更亦由這個狀態中心去提交，資料數據的結構從原本的樹狀圖轉變成放射狀，使得管理變得更加扁平化。也因為功能變單純了，函式組件比起複合組件來得更容易重複使用及組裝。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vuex 與 Pinia</h2>
        <p>在 Vue.js 框架比較常見，或者說主流的狀態管理工具有兩款，分別是 <a href="https://vuex.vuejs.org/zh/" target="_blank">Vuex</a> 以及 <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>，它們分別各自對應 Vue 2 與 Vue 3 推薦的首款選擇，如果第一次接觸狀態管理工具且使用的版本為 Vue 3 ，多數前輩或教學都會建議直接學 Pinia 就好，那是因為 Pinia 不僅是基於 Vuex 之上改善後者一些缺點及更加優化功能，同時也專門配合 Vue 3 Composition API 語法格式，且相容 TypeScript。</p>
        <p><br></p>
        <h3>Vuex 的起源與挑戰</h3>
        <p>Vuex 是 Vue.js 的官方狀態管理庫，它提供了一個集中式存儲來管理所有元件的狀態。Vuex 的核心概念包括狀態（state）、突變（mutations）、行為（actions）和 getters。這些概念使得狀態管理變得結構化且可預測。</p>
        <p>然而，隨著應用的規模和複雜性的增加，Vuex 的一些限制開始浮現。例如，Vuex 的模塊結構可能導致應用的狀態分散在多個模塊中，使得狀態的追蹤和管理變得困難。此外，Vuex 的 API 在某些情況下可能顯得冗長和複雜，尤其是在使用 TypeScript 進行開發時。</p>
        <blockquote>
            <p>Pinia 起源于一次探索 Vuex 下一个迭代的实验，因此结合了 Vuex 5 核心团队讨论中的许多想法。最后，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分功能，所以决定将其作为新的推荐方案来代替 Vuex。</p>
            <p>与 Vuex 相比，Pinia 不仅提供了一个更简单的 API，也提供了符合组合式 API 风格的 API，最重要的是，搭配 TypeScript 一起使用时有非常可靠的类型推断支持。</p>
        </blockquote>
        <p>以上摘錄自 Pinia 中文文件「<a href="https://pinia.vuejs.org/zh/introduction.html" target="_blank">對比 Vuex</a>」說明。</p>
        <p>為了解決這些問題，Vue.js 團隊開發了 Pinia。Pinia 是一個新的狀態管理庫，它提供了一個簡單且靈活的 API，並且對 TypeScript 有良好的支持。</p>
        <p>Pinia 這個名字音近西班牙語的 Piña，意思是鳳梨。而鳳梨是一種由多個小果實組成的複合果實，這與 Pinia 的組織方式相似。</p>
        <p><br></p>
        <p>Vuex V.S. Pinia：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0"></div>
                    <div class="f-f1">Vuex</div>
                    <div class="f-f1">Pinia</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">優點</div>
                    <div class="f-f1">
                        <p>1. 穩定性高，具有豐富的生態系統和文件支持。</p>
                        <p>2. 提供強大功能，包括狀態持久化、模塊化、插件支持等，能應對大多數的狀態管理需求。</p>
                    </div>
                    <div class="f-f1">
                        <p>1. 設計上更為簡潔，提供了更純粹的狀態管理解決方案，適合用於小型應用。</p>
                        <p>2. 支援 TypeScript。</p>
                        <p>3. 整合 Composition API。</p>
                    </div>
                </div>
                <div class="f-row">
                    <div class="f-f0">缺點</div>
                    <div class="f-f1">
                        <p>1. 複雜度高。</p>
                        <p>2. 學習曲線陡峭。</p>
                    </div>
                    <div class="f-f1">
                        <p>1. 資源較少。</p>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>前面提到集中式狀態管理的精髓是將複合組件的功用扁平化，將資料數據通通撈出來到狀態中心整合管理，複合組件將成為只有處理視覺的函式組件。然而，在 Pinia 的概念裡，比較強調只要將「共享」的資料數據撈出來集中管理就好，個別組件獨有的資料還是留在該組件，沒有必要定義在狀態中心反而使得文件不易閱讀。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、Pinia 安裝與設定</h2>
        <h6>1. NPM 安裝 Pinia 套件：</h6>
        <p>在專案裡下達 Pinia 安裝指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install pinia</code></pre>
        </div>
        <p><br></p>
        <h6>2. 設定文件引入 Pinia：</h6>
        <p>開啟 <b>main.ts</b>，將 Pinia 引入進來並創建它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createPinia } from 'pinia';    // 引入 pinia
const pinia = createPinia();    // 建立 pinia
app.use(pinia);    // 安裝 pinia</code></pre>
        </div>
        <p><br></p>
        <h6>3. 建立資料夾與文件：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
└── store
     ├── a.ts
     ├── b.ts
     └── n.ts</code></pre>
        </div>
        <p>在專案 <b>src/</b> 資料夾內建立 <b>store/</b> 資料夾，這個資料夾就象徵 Pinia 的實體，而裡頭文件的名稱一般情況會與要撈出共享資料的組件同名，比如有一個 <b>Count.vue</b> 組件有資料要提取出來給狀態中心，那麼 <b>store/</b> 裡頭就會建立一個 <b>count.ts</b> 或者 <b>Count.ts</b>，這樣我們才能明確知道它以及其他組件引用的源頭是誰。或者也有些人會將同樣類型的資料分類進行管理，像是和使用者有關的資料統一集中存放在 <b>user.ts</b>。</p>
        <p><br></p>
        <p>下一章開始將進入實際操作的環節，既然要操作，首先就必須先有範例才能提供給 Pinia 發揮的空間，範例規劃的結構如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
├── components
│    ├── Count.vue
└── App.vue</code></pre>
        </div>
        <p>各組件功能說明：</p>
        <p><b>Count.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ sum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';

    const sum = ref(1);
    const selectVal = ref(1);

    function add(){
        sum.value += selectVal.value;
    }

    function minus(){
        sum.value -= selectVal.value;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>這支組件的功能是一個基本的總合計算，使用者通過下拉選單選擇要加減的數字，然後透過按鈕對目前的總合進行所選之數字進行累加或減少。譬如下拉選單選擇了「3」，則點擊「加」的按鈕，<em>sum</em> 初始值將從 1 累計為 4，再按一次「加」按鈕則從 4 變更為 7......依此類推。若在目前總合 7 的時候將選項變更為 2 並按下「減」的按鈕，則當前總合 7 就會變為 5。</p>
        <p><br></p>
        <p><b>App.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;Count/&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import Count from "./components/Count.vue";
&lt;/script&gt;</code></pre>
        </div>
        <p>根組件沒有什麼特別的地方，主要就是調用前面寫好的組件，使其渲染並運作。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、儲存與讀取資料數據</h2>
        <p>以 <b>Count.vue</b> 為例，首先在 <b>store/</b> 中建立一個名稱為 <b>count</b> 的 TS 文件，並且在文件開頭引入 Pinia 功能：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { defineStore } from "pinia";</code></pre>
        </div>
        <p>官方建議採用 hooks 命名法來給要存取的資料變數做命名，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore("count", {
    state(){
        return {
            sum: 3
        }
    }
});</code></pre>
        </div>
        <p><em>defineStore</em> 裡面依據功能需求會傳入多個參數，現階段我們會用到兩個，第一個參數表示「ID」值以作為 store 的唯一識別字符，命名建議與文件名稱保持一致。</p>
        <p>第二個參數則要定義配置對象，也就是一個物件型別的格式內容，這個物件裡面引用了一個名為 <em>state</em> 的函式，state 表示「狀態」的意思，裡頭必須返回一個結果，根據前面我們建立的範例，這裡我們要將求總合的變數 <em>sum</em> 存放進來，並給它一個初始值。回顧整個 <em>state</em> 的內容，它其實就是儲存資料數據的地方。</p>
        <p>至此 <b>Count.vue</b> 組件用來統計總和結果的資料就成功在集中式狀態管理裡定義完成了（pinia → state → count），再來就是要改寫組件的內容，把原本組件裡的 <em>sum</em> 移除掉，畢竟我們已經把 <em>sum</em> 提取出來到「倉庫」裡了，組件只能從倉庫裡調用它，而不再私自擁有。</p>
        <p>改寫的第一步自然也是要將我們定義好的 store 引入並呼叫它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { useCountStore } from "../store/count";

const countStore = useCountStore();</code></pre>
        </div>
        <p>不急著進下一步，我們可以先用 Console 來觀察看看 <em>useCountStore()</em> 真身是什麼玩意：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("countStore:", countStore);</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-3.jpg">
        </figure>
        <p>可以看到這個 <em>useCountStore</em> 也是一個具有響應式能力的代理物件（Proxy Object），基本上前幾篇文章各種不同功能的洗禮，我們應該都已經很熟悉 Proxy 在 Vue 廣泛被使用，是因為其可以方便地實現響應式系統，對 Vue 的資料管理可以更加靈活強大。</p>
        <p>而我們可以在這個 Proxy 分別看到兩個重點，一個是我們在 store 定義的 <em>sum</em>，裡頭儲存著我們設定的 <em>value</em> 值（3）；另一個則是 <em>$state</em>，它其實就是我們在 <em>defineStore</em> 裡面定義的 <em>state</em> 函式，而它同樣也是代理物件。</p>
        <p>展開 <em>$state</em>，可以發現它裡頭同樣也儲存著我們設定的 <em>sum</em> 及其初始值：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-4.jpg">
        </figure>
        <p>所以如果我們想取得 store 定義好的 <em>sum</em> 資料數據，可以透過這兩個管道：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(countStore.sum);
console.log(countStore.$state.sum);</code></pre>
        </div>
        <p>※ 由於 <em>sum</em> 是在 <em>reactive</em> 形成的 Proxy Object 底下去定義的，取值時就不需要再加上 <em>.value</em>，若是平常用 <em>ref</em> 定義的變數就要時常牢記操作值時必須加上 <em>.value</em>。</p>
        <p>確認組件可以接收到 store 管理的 <em>sum</em> 值後，我們就可以把原本組件裡的 <em>sum</em> 移除掉，改使用 store 儲存的 <em>sum</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;</code></pre>
        </div>
        <p>原本底下方法中的 <em>sum.value</em> 也改成 <em>countStore.sum</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(){
    countStore.sum += selectVal.value;
}

function minus(){
    countStore.sum -= selectVal.value;
}</code></pre>
        </div>
        <p>完整程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';
    import { useCountStore } from '../store/count';

    const countStore = useCountStore();
    const selectVal = ref(1);

    function add(){
        countStore.sum += selectVal.value;
    }

    function minus(){
        countStore.sum -= selectVal.value;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>渲染畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-5.jpg">
            <figcaption>初始畫面裡總和 3 為我們在 store 指定的初始值。</figcaption>
        </figure>
        <p>現在 <b>Count.vue</b> 組件原先持有的總和狀態資料已經改由使用狀態中心的總和狀態資料，所以如果有其他組件也需要這個統計總和的資料，只要如法炮製即可。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、修改狀態資料的方式</h2>
        <p>如果要修改 store 定義的狀態資料一般有三種方式，以 <b>Count.vue</b> 為例，前面我們已經展示了第一種，就是直接從組件引用的 <em>countStore</em> 獲取指定的資料 <em>sum</em> 進行修改的動作。</p>
        <p><br></p>
        <h3>1. 直接修改狀態的值：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(){
    countStore.sum += selectVal.value;
}

function minus(){
    countStore.sum -= selectVal.value;
}</code></pre>
        </div>
        <p>直接修改 store 的狀態是最簡單也是最直接的方式。然而，像這樣的作法在以往 Vuex 是不被推薦的，因為這樣做破壞了 Vuex 的核心原則：狀態的單一來源和可追蹤性。Vuex 通常建議使用 <em>mutations</em> 來修改狀態，而不是直接修改。不過對 Pinia 來說，會更傾向能讓開發者直覺地修改狀態。</p>
        <p><br></p>
        <h3>2. 批量修改多個值：</h3>
        <p>第二種方式則用於要批量修改大量狀態資料的時候，舉個例子，比方現在 store 定義了這麼多筆狀態：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore("count", {
    state(){
        return {
            sum: 3,
            name: "阿比",
            age: 18,
            borned: "台灣"
        }
    }
})</code></pre>
        </div>
        <p>然後我們要在組件裡觸發事件去改變它們的值，如果用第一種方法，程式碼結構將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function change(){
    countStore.sum += selectVal.value;
    countStore.name = "喵喵";
    countStore.age = 32;
    countStore.borned = "日本";
}</code></pre>
        </div>
        <p>雖然這麼做一樣可以達到我們想要的目標，但顯然有更好的寫法，面對這種批量修改狀態資料的需求，我們可以使用 <em>$patch</em> 方法來搞定：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function change(){
    countStore.$patch({
        sum: countStore.sum += selectVal.value,
        name: "喵喵",
        age: 32,
        borned: "日本"
    });
}</code></pre>
        </div>
        <p>除了寫法的差異外，使用 <em>$patch</em> 在效能執行上也比一行行修改狀態來得佳，因為每一次狀態修改 Timeline 都會產生一個 mutation（相當於 Vuex 的 mutations 修改之意），所以像這個範例修改四筆狀態內容，等同執行四次 mutation。如果使用 <em>$patch</em>，Timeline 記錄上就只會執行一次 $patch 的批量變更而已。</p>
        <p><br></p>
        <h3>3. 透過 actions 修改：</h3>
        <p>第三種方式比較複雜，需要在狀態中心使用 <em>actions</em> 特殊屬性，actions 有動作的意思，顧名思義，它的主要用途是為狀態中心裡存放的狀態資料定義一些函式方法，以響應組件裡的「動作」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore("count", {
    state(){
        return {
            sum: 3
        }
    },
    actions: {
        // 定義函式方法
    }
})</code></pre>
        </div>
        <p>按照 <b>Count.vue</b> 組件 <em>add()</em> 函式原先設定，<em>sum</em> 累計的值是依據使用者於下拉式清單所選擇的值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(){
    sum.value += selectVal.value;
}</code></pre>
        </div>
        <p>我們要把 <em>selectVal.value</em> 這個值與 store 狀態中心同步對應，所以我們需要在 <em>actions</em> 定義一個函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">actions: {
    increment(value){
        console.log("increment value:", value);
    }
}</code></pre>
        </div>
        <p>函式中的 <em>value</em> 參數用來接收組件傳過來的值，組件 <b>Count.vue</b> 的函式內容便做出與之對應的調整：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(){
    countStore.increment(selectVal.value);
}</code></pre>
        </div>
        <p>假設當我們從下拉清單中選擇 2 並觸發 <em>add()</em> 事件，2 這個值就會同步傳送到 store 狀態中心裡的 <em>increment</em> 的 <em>value</em> 參數，得到 Console 回傳值為 2：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-14-6.jpg">
        </figure>
        <p>同步取得使用者目前所選擇的值之後，接下來要做的是將取得的值對 <em>sum</em> 進行修改，寫法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">actions: {
    increment(value){
        this.sum += value;
    }
}</code></pre>
        </div>
        <p>可能會有人疑惑為什麼這裡是使用 <em>this</em> 而不是直接調用 <em>state.sum</em>，其實這是作用域的問題，我們可以在 <em>actions</em> 打印 <em>state.sum</em> 看看會有什麼結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">actions: {
    increment(value){
        console.log(state.sum);    // Uncaught ReferenceError: state is not defined
    }
}</code></pre>
        </div>
        <p>表示 <em>state</em> 並未被定義。但如果我們打印的是 <em>this</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">actions: {
    increment(value){
        console.log(this);    // Proxy(Object) {$id: 'count', $onAction: ƒ, $patch: ƒ, $reset: ƒ, $subscribe: ƒ, …}
    }
}</code></pre>
        </div>
        <p>就會得到目前的 store──也就是 <em>useCountStore</em> 完整的代理物件內容，裡面自然包含著我們設定的 <em>sum</em> 狀態資料。所以如果要令 <em>increment</em> 動作修改 <em>sum</em> 目前的值，只要直接指定 <em>this.sum</em> 便可。</p>
        <p>至於另一個事件 <em>minus()</em> 也是相同的定義邏輯，這裡就不再一步步拆解記述，直接上完成後的程式碼樣貌：</p>
        <p><b>store/count.ts</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
    state(){
        return {
            sum: 3
        }
    },
    actions: {
        increment(value){
            this.sum += value;
        },
        reduce(value){
            this.sum -= value;
        }
    }
})</code></pre>
        </div>
        <p><b>Count.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';
    import { useCountStore } from '../store/count';

    const countStore = useCountStore();
    const selectVal = ref(1);

    function add(){
        countStore.increment(selectVal.value);
    }

    function minus(){
        countStore.reduce(selectVal.value);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>三種方法看下來，第一種最為簡單暴力又直接，而第二種方式在面對需要一次性修改大量資料時有其優勢與必要性，但第三種方式具體有什麼好處呢？拿範例來說，主要好處是我們不僅僅可以把單純的資料提交給狀態中心管理，就連多個組件會重複用到的動作也可以由狀態中心共享。舉例來說，假設今天當 <em>sum</em> 的值大於 10 就不再繼續增加，我們可以在 <em>actions</em> 追加條件判斷：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">actions: {
    increment(value){
        if( this.sum &lt; 10 ){
            this.sum += value;
        }
    }
}</code></pre>
        </div>
        <p>雖然同樣的邏輯，我們也可以直接在組件裡下判斷：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function add(){
    if(countStore.sum &lt; 10){
        countStore.sum += selectVal.value;
    }
}</code></pre>
        </div>
        <p>縱使效果是一樣的，但如果有多個組件都使用到相同判斷邏輯的時候，每個組件都要各自寫一次判斷邏輯，在需要維護修改時就會相對比較不方便。</p>
    </div>
    <div class="text-block" id="act7">
        <h2>七、defineStore 另一種寫法</h2>
        <p>上個章節我們學到在 store 創建狀態管理文件的定義格式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore("count", {
    state(){
        return {
            sum: 3
        }
    },
    actions: {
        increment(value){
            if( this.sum &lt; 10 ){
                this.sum += value;
            }
        },
        reduce(value){
            this.sum -= value;
        }
    }
});</code></pre>
        </div>
        <p>除了這種參數傳入的方式外，還有一種用物件表示的形式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore({
    id: "count", 
    state: ()=>({
        sum: 3
    }),
    actions: {
        increment(value){
            if( this.sum &lt; 10 ){
                this.sum += value;
            }
        },
        reduce(value){
            this.sum -= value;
        }
    }
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act8">
        <h2>八、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://pinia.vuejs.org/introduction.html" target="_blank">Pinia</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=41" target="_blank">【极简Vue3】041 路由 编程式路由导航</a></dd>
            <dd><a href="https://zhuanlan.zhihu.com/p/439233719" target="_blank">vue3时代下的状态管理方式探索</a></dd>
            <dd><a href="https://5xcampus.com/posts/from-vuex-to-pinia" target="_blank">從 Vuex 到 Pinia：Vue 狀態管理的進化</a></dd>
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