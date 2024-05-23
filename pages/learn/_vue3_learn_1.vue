<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Vue 3 與 Vue 2' },
        { id: 2, title: '二、建立 Vue 3 專案' },
        { id: 3, title: '三、從 setup 開始' },
        { id: 4, title: '四、ref 基本型別的響應式資料' },
        { id: 5, title: '五、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="62" fileType="learnList" />
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
        <p>在技術如高鐵飛速發展的網頁前端開發領域，Vue.js 一直以其簡單、靈活和高效的特性，長年位於前端框架熱門排行的尖端。隨著 Vue 3 推出，我們有了更多且必要的理由去深入探索這個強大的框架。Vue 3 不僅僅是 Vue 2 的升級版，它帶來了許多引人注目的新功能和改進，為開發者提供了更好的工具來建立現代化的前端應用。從效能提升到全新的 Composition API，從更友善的 TypeScript 支援到更靈活的響應式系統，可以看到現在絕大多數的公司皆視 Vue 為必備網頁前端技能。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>相同技術一旦出現新的大型版本，除了帶來新的功能外，一部分肯定也是為了改善原有技術一些不便，Vue 3 不僅僅是容量、效能等優化方面都比 Vue 2 有著更卓越的提升之外，最令開發者明顯肉眼感受到的差異，首屬 Composition API 與採用 TypeScript 作為主要撰寫語言。</p>
        <p><br></p>
        <h3>Composition API：</h3>
        <p>Composition API 中文叫作「組合式 API」，顧名思義，這種開發模式的宗旨是將開發者寫的程式依照邏輯相關性組織在一起。如果曾有 Vue 2 開發的經驗，應該對要把自己寫的功能拆開分散到各種選項（例如 <em>data</em>、<em>methods</em>、<em>computed</em>、<em>watch</em>......等）感到不陌生吧？這是一種名為 Options API「選項式 API」的寫法。儘管這種寫法在檢視程式碼的時候可以將 Vue 2 各個作用明確區隔開來，但卻也造成同一功能的程式被迫拆成許多部份，當一個組件包含多個功能時，就很容易產生混亂，造成維護上的不便。</p>
        <p>我們用一張圖來表示 Options API 的概念：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-1.jpg">
        </figure>
        <p>假設某一天我們需要修改 Finction B 的內容，我們可能就得 <em>data</em>、<em>methods</em>、<em>computed</em> 一一跳著檢查內容，找出要調整的部份。</p>
        <p>到了 Composition API 則是不再執著於作用的分類，各個功能函式皆獨立集中在各自的區塊：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-2.jpg">
        </figure>
        <p>那麼當我們要修改 Finction B，直接在其程式碼區域查找與修改即可。</p>
        <p>雖然根據官方文件的說明，即便到了 Vue 3，也依然可以向下兼容 Vue 2 的語法，只不過 Vue 2 已經正式在 2023 年底停止維護，這不僅僅明示希望所有使用 Vue 開發專案的工程師未來一律採用 Vue 3 進行開發，也在暗示過往使用 Vue 2 建立的那些持續性專案，假以時日最好也將程式碼更新到 Vue 3 的形式。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>創建 Vue 專案環境的方式有很多種，過往比較著名的有 Vue CLI──基於 Webpack 建立的框架工具，要繼續用它來進入 Vue 3 也未嘗不是不行，只是官方提供更好的選擇；Vite 構建工具。Vite 具有以下這些優勢：</p>
        <ol>
            <li>輕量。</li>
            <li>啟動快速。</li>
            <li>支援 TypeScript、JSX、CSS 預處理器。</li>
            <li>按組件需要作編譯，而非等待整個網頁應用編譯。</li>
        </ol>
        <p>所以在接下來學習的過程，個人也以 Vite 作為編譯工具的首選，來一步步深入 Vue 3 的世界。至於關於 Vite 詳細的介紹與編譯方式，將來會再另外獨立成一個主題，現階段只先提必要的安裝流程和使用方法。在開始安裝步驟之前，請先確認工作環境是否有安裝 Node.js。</p>
        <p><br></p>
        <h6>1. 在終端機輸入安裝指令：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm create vite@latest</code></pre>
        </div>
        <p>接著終端機會詢問一些事項，按個人需求選擇即可：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-3.jpg">
        </figure>
        <p><br></p>
        <h6>2. 安裝 node_modules：</h6>
        <p>在上面的截圖可以看到終端機跑完 <em>create</em> 指令後，會回饋給我們接下來需要依序執行什麼動作。先 <em>cd</em> 到自己創建的專案資料夾內，然後安裝 Node.js 環境所需的 <b>node_modules/</b> 資料夾：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install</code></pre>
        </div>
        <p>或</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm i</code></pre>
        </div>
        <p><br></p>
        <h6>3. 運行開發模式：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm run dev</code></pre>
        </div>
        <p>沒什麼意外的話，開發模式這樣就能順利啟動了，若啟動成功，終端機會回傳一個本地端網址，預設通常是 <b>http://localhost:5173/</b>。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-4.jpg">
        </figure>
        <p>在瀏覽器輸入網址進入頁面，就會看到以下畫面：</p>
        <figure>
            <img src="/images/learn/js/vite-1-6.jpg">
        </figure>
        <p><br></p>
        <h3>Vite 專案結構：</h3>
        <p>稍微說明一下 Vite 專案建立時初始的檔案配置結構有哪些，以下是 <em>create</em> 時選擇用 TypeScript 作為主要開發語言的檔案生成結構樹狀圖（只列出比較關鍵、重要的檔案）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">public
src
  ├── assets                # 靜態資源
  ├── components
  │   └── HelloWorld.vue    # 子組件
  ├── App.vue               # 根元件
  ├── main.ts               # 引用 src 相關資源的關鍵文件
  ├── style.css             # CSS 文件
  └── vite-env.d.ts         # 讓 TS 辨識不同檔案格式
index.html                  # 入口文件
tsconfig.json               # TS 相關配置文件
vite.config.ts              # Vite 設定文件</code></pre>
        </div>
        <h5><b>index.html</b>：</h5>
        <p>雖然有很多示範內容，但真正需要注意的是 <em>body</em> 元素中的這兩個標籤：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">
&lt;div id="app"&gt;&lt;/div&gt;
&lt;script type="module" src="/src/main.ts"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><em>#app</em> 提供給 Vue 一個實例掛載的對象，稍後會再提及。而 <em>script</em> 引用的檔案 <b>main.ts</b> 則是整個專案主體 <b>src/</b> 裡所有資源導入的核心文件。</p>
        <h5><b>main.ts</b>：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>
        </div>
        <p><em>import</em> 表示引用某個指定資源，例如第一行將 CSS 文件 <b>style.css</b> 給引用到這個文件，讓入口文件 <b>index.html</b> 可以讀到它。</p>
        <p>第二行 <em>{ createApp }</em> 表示要創建一個新的 Vue 的應用；第三行則是在說引用了一個 <b>App.vue</b> 的組件，並將其取名為 <em>App</em>。</p>
        <p>最後一行的意思在調用 <em>createApp</em> 的時候把 <em>App</em> 給傳入進來作為根組件，然後「掛載」（<em>mount</em>）到一個 ID 名稱為 app 的容器裡，而這個 <em>#app</em> 正是對應 <b>index.html</b> 入口文件裡的 <em>#app</em>。</p>
        <h5><b>App.vue</b>：</h5>
        <p>因為初始程式碼含有範例程式碼的關係所以看上去會有一些些複雜，不過沒關係，這裡主要是要先明白 Vue 3 組件的結構由三大區塊所構成，分別是：</p>
        <p><em>&lt;script&gt;</em>：用來寫 JavaScript 或 TypeScript 程式碼。</p>
        <p><em>&lt;template&gt;</em>：用來寫 HTML 要呈現的內容。</p>
        <p><em>&lt;style&gt;</em>：用來寫有關網頁元素的樣式。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p><em>setup</em> 是 Vue 3 新增的一個配置屬性，舉凡組件使用到的資料、方法、計算屬性、監視......等作用項目，均配置在 <em>setup</em> 裡面，可以說是整個 Vue 3 Composition API 的核心。在開始講述 <em>setup</em> 如何處理上述那些作用項之前，我們先模擬一個用 Vue 2 建構的組件。</p>
        <p>其細節如下：</p>
        <p><b>App.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;User/&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import User from "./components/User.vue"
&lt;/script&gt;</code></pre>
        </div>
        <p>根元件我們只用來置入一個名稱為 User 的子組件，沒有其他內容。</p>
        <p><b>User.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts"&gt;
    export default {
        data(){
            return {
                name: "阿比",
                age: 18
            }
        },
        methods: {
            addAge(){
                this.age += 1;
            }
        }
    }
&lt;/script&gt;</code></pre>
        </div>
        <p><b>User.vue</b> 子組件中我們使用 Vue 2 Options API 的寫法建構了一組人員資料，除了直接在模板顯示該人員的姓名和年齡外，也定義了一個事件方法 <em>addAge()</em>，當使用者點擊按紐 <em>button</em> 時，該員年齡就會增加一歲。</p>
        <p><br></p>
        <p>而到了 Vue 3 Composition API 的寫法，範例中的 <em>data</em>、<em>methods</em> 配置項都會直接定義在 <em>setup</em> 裡面，具體是怎麼定義的呢？首先 <em>setup</em> 配置的寫法是這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">setup(){ ... }</code></pre>
        </div>
        <p>純資料數據的部份，我們可以直接用變數來定義，例如 <em>const</em> 或 <em>let</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        let name = "阿比";
        let age = 18;
    }
}</code></pre>
        </div>
        <p>但光是這樣是沒辦法讓模板中抓取資料的 HTML 元素成功獲取資料的，必須還要加上 <em>return</em> 將值回傳出去才可以：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        let name = "阿比";
        let age = 18;

        return {
            name, age
        }
    }
}</code></pre>
        </div>
        <p>純資料處理的部分就這樣完成配置了，再來是方法的部分，前幾章簡短介紹 Compsition API 的內容時有提到 Vue 3 將組件的功能各自透過函式進行管理，因此我們就回歸原始 JavaScript 的寫法，定義一個函式來實現 <em>addAge()</em> 功能：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        let name = "阿比";
        let age = 18;

        function addAge (){
            age += 1;
        }

        return {
            name, age, addAge
        }
    }
}</code></pre>
        </div>
        <p>必須要強調的是，在 <em>setup</em> 裡面，<em>this</em> 指向的值只會是 <em>undefined</em>，因此過往 Vue 2 習慣使用的 <em>this</em> 無法直接套寫在 Vue 3 上，至於具體要怎麼改寫其實也沒這麼複雜，老話一句，回歸以往 JavaScript 的寫法就好。最後寫完別忘記要把函式 <em>return</em> 回去。</p>
        <p>然而，看似完美，實際測試的時候會發現當我們點擊 <em>button</em> 按紐，年齡並沒有發生任何變化，打開 Console 工具也沒有回報任何錯誤，這是為什麼？</p>
        <p>其實這是因為這時的 <em>name</em> 和 <em>age</em> 都還不是響應式的資料，所以即便我們觸發事件方法去變更年齡，Console 可以看到年齡確實隨著按紐點擊的次數逐次累加，但 DOM 渲染的 HTML 並無任何變化。</p>
        <p>證據就是如果我們用 Vue 2 的生命週期鉤子去觀察 DOM 渲染的順序：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    beforeCreate(){
        console.log("beforeCreate");
    },
    setup(){
        console.log("setup");
    },
    beforeMount(){
        console.log("beforeMount");
    },
    mounted(){
        console.log("mounted");
    },
}</code></pre>
        </div>
        <p>會發現 Console 出來的結果依序為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">setup
beforeCreate
beforeMount
mounted</code></pre>
        </div>
        <p>表示在實例創建之前，<em>setup</em> 就已經先執行了。</p>
        <p>要怎麼讓 <em>setup</em> 中的資料數據變成響應式數據，因為這會牽涉到不同定義方式和監聽方法，故稍作個保留，我們先繼續專心學習 <em>setup</em> 的知識。</p>
        <p><br></p>
        <h3>setup 的回傳值：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        return {
            name, age, addAge
        }
    }
}</code></pre>
        </div>
        <p>前面的範例裡 <em>setup</em> 返回的東西是一個物件，其中包含了 <em>name</em>、<em>age</em>、<em>addAge</em> 這三個屬性和方法。這個傳回的物件其實就是組件的配置選項，它會將這些屬性和方法傳送給組件的模板，從而可以在模板中直接使用它們。</p>
        <p><em>return</em> 也可以返回一個函式，且函式裡面再包含一個 <em>return</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        return function (){
            return "Hello World!"
        }
    }
}</code></pre>
        </div>
        <p>也可以用箭頭函式簡化成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    setup(){
        return () => "Hello World!"
    }
}</code></pre>
        </div>
        <p>通常這種作法，<em>return</em> 函式裡面 <em>return</em> 的值會直接取代掉組件的模板，無視原先組件裡的其他配置。假如今天有部份需求是一旦滿足某個條件，一率返回一個簡單的值替換掉原本組件裡的模板內容，那就可以透過這種手法達成效果。（不過實務上會需要這麼作的機率不高）</p>
        <p><br></p>
        <h3>setup 能與 Options API 混用嗎？</h3>
        <p>先說結論，答案是可以。只是如果一個專案內同時混用了 Vue 2 的 Options API 與 Vue 3 的 Composition API，很大機率會被主管或同事幹得滿頭包，但這並不代表就不會發生。假設今天不幸不得不在專案內同時使用 Vue 2 和 Vue 3 的寫法，或是接手到兩者混用的維護專案，那麼彼此之間混用會有什麼影響呢？</p>
        <p>舉例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    data(){
        return {
            x: this.name    // 阿比
        }
    },
    setup(){
        let name = "阿比";

        return { name }
    }
}</code></pre>
        </div>
        <p>上方範例中可以看到我們在 Options API 的 <em>data</em> 配置選項中回傳了 <em>x</em> 變數，然後指定給它的值是 Composition API <em>setup</em> 裡面定義的 <em>name</em> 變數，如果我們將 <em>x</em> 渲染到模板裡，會發現得到的資料是「阿比」，這就表示 Options API 的選項是可以獲取 Composition API 裡面的資料。但如果反過來：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default {
    data(){
        return {
            x: "阿比"
        }
    },
    setup(){
        let name = x;    // x is not defined

        return { name }
    }
}</code></pre>
        </div>
        <p>會發現模板裡的 HTML 元素不但沒有顯示出資料，而且還會得到 <em>Uncaught (in promise) ReferenceError: x is not defined</em> 的錯誤訊息，其實原因很簡單，前面在測試 <em>setup</em> 和其他 Vue 2 生命週期鉤子渲染的順序已經明白展示過，<em>setup</em> 渲染的優先序會比生命週期鉤子還要前面，所以 Options API <em>data</em> 中的 <em>x: this.name</em> 在此時已經可以取得 <em>name</em> 這個屬性。</p>
        <p>反過來，當我們在 <em>setup</em> 裡宣告的變數 <em>name</em> 想去取得 Options API <em>data</em> 的 <em>x</em> 值，由於渲染階段 <em>setup</em> 先被執行的，此時壓根兒沒有 <em>x</em> 這個資料存在，<em>name</em> 抓不到指定的資料，瀏覽器自然也只能回報 <em>x</em> 並沒有被定義。</p>
        <p><br></p>
        <h3>setup 的語法糖：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts"&gt;
    export default {
        setup(){
            let name = "阿比";

            return { name }
        }
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>原本我們在寫 <em>setup</em> 配置選項的時候，無論是純資料還是方法，最後都必須透過 <em>return</em> 回傳出去，模板才能順利渲染出這些內容，但隨著程式碼增加，有時寫著寫著，可能一時間就會忘記添加，等畫面渲染的時候才發現忘了寫，或甚至不知道為什麼畫面表現不如預期。會有這種情況，其實就表示一般 <em>setup</em> 的寫法不夠人性化，所以才會有部分開發者偶爾遭遇到此困擾。</p>
        <p>事實上，<em>setup</em> 有一種比較簡便的寫法，也就是語法糖。寫法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup&gt;
    let name = "阿比";
&lt;/script&gt;</code></pre>
        </div>
        <p>如此一來我們就只要專注在組件要寫的內容就好，不需要每一次定義新的資料或方法，都還要惦記著去 <em>return</em> 它。然而，<em>setup</em> 語法糖好用歸好用，卻也不是萬靈丹。打個比方，開發者通常習慣為每一個組件命名，命名方式主要是經由 ES module exports 來進行，所以寫法會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts"&gt;
    export default {
        name: "User",
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>但如果我們把這段直接也搬去 <em>setup</em> 語法糖結構裡，編譯器會立即發出錯誤：<b>&lt;script setup&gt; cannot contain ES module exports. If you are using a previous version of &lt;script setup&gt;, please consult the updated RFC at https://github.com/vuejs/rfcs/pull/227.</b></p>
        <p>大意是在說 <em>&lt;script setup&gt;</em> 不允許包含 ES 模組的導出，所以在不安裝其他輔助套件的前題下，有時會看到組件裡同時存在 <em>&lt;script lang="ts"&gt;</em> 和 <em>&lt;script lang="ts" setup&gt;</em> 是正常的。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;!-- 設定組件名稱 --&gt;
&lt;script lang="ts"&gt;
    export default {
        name: "User",
    }
&lt;/script&gt;

&lt;!-- 設定組件 Composition API 配置 --&gt;
&lt;script lang="ts" setup&gt;
    let name = "阿比";
    let age = 18;
&lt;/script&gt;</code></pre>
        </div>
        <p>既然提到有第三方套件可以將組件名稱與 <em>setup</em> 語法糖寫在一起，以下就來簡單介紹一下該套件使用方式。</p>
        <h6>1. 輸入套件安裝指令：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm i vite-plugin-vue-setup-extend -D</code></pre>
        </div>
        <p><br></p>
        <h6>2. 於 vite.config.ts 添加配置：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
    plugins: [
        VueSetupExtend()
    ],
})</code></pre>
        </div>
        <p>※ 注意，是添加不是覆蓋，不要覆蓋掉原有文件裡的其他設定。</p>
        <p><br></p>
        <h6>3. 於 <em>setup</em> 語法糖直接命名：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup name="User"&gt;
    ...
&lt;/script&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>上一章曾提到，我們在 <em>setup</em> 建立的變數資料不是響應式資料，因此資料渲染進 DOM 以後，我們即使後續改變了資料的值，也無法同步給 DOM 對應的資料帶來更新。而 Vue 2 <em>data</em> 則因為裡定義的資料自動就是響應式，故沒有這方面的困擾。</p>
        <p>在 Vue 3 Composition API 則由兩個方法來定義響應式資料，分別是 <em>ref</em> 以及 <em>reactive</em>。</p>
        <p>先談談 <em>ref</em>，在用它來定義資料前，必須先 <em>import</em> 它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup&gt;
    import { ref } from "vue";
&lt;/script&gt;</code></pre>
        </div>
        <p>因為先前的範例中，我們只有要改變人員的年齡，名字沒有要作更動，所以要將 <em>age</em> 變數成為響應式，那麼就修改為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let name = "阿比";
    let age = ref(18);
&lt;/script&gt;</code></pre>
        </div>
        <p>如果想辨別 <em>age</em> 是否真的變成了響應式資料，最直接的方法就是透過 Console 來打印它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(name);    // 阿比
console.log(age);    // RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 18, _value: 18}
            </code></pre>
        </div>
        <p>會發現 <em>name</em> 單純只是輸出指定給它的值，也就是「阿比」，但添加 <em>ref</em> 的 <em>age</em> 則打印出一個帶有許多屬性的 RefImpl 物件。</p>
        <p>展開其物件詳細內容，會看見許多有意思的東西：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-5.jpg">
        </figure>
        <p>帶有下底線的屬性名稱和我們開發者沒有什麼關係，主要是底下有一個 <em>value</em> 屬性，既然經過 <em>ref</em> 定義的響應式資料成為了物件，那麼我們在模板調用它時，正確是否應該要是 <em v-pre>{{ age.value }}</em> 才對？經過實際測試會發現資料並沒有如預期渲染出來，這是因為 <em>ref</em> 會自動將我們原本 <em v-pre>{{ age }}</em> 帶入 <em>.value</em>，因此我們不需要再多此一舉在模板添加它</p>
        <p>──然而只僅限於模板，我們如果在 <em>setup</em> 裡面修改 <em>ref</em> 資料的值，就還是必須加上 <em>.value</em>。這個觀念非常重要，如果說 <em>this</em> 是 Vue 2 的常客，那麼 <em>.value</em> 就是 Vue 3 修改資料屬性的核心。</p>
        <p>所以當我們試圖利用 <em>addAge</em> 方法來改變模板上的 <em>age</em> 值，原本的程式碼要改成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function addAge (){
    age.value += 1;
}</code></pre>
        </div>
        <p>如此一來，我們於 HTML 點擊 <em>button</em> 按鈕觸發 <em>addAge</em> 方法時，<em>age</em> 就會從 18 變成 19 了，再點一次按鈕更新成 20，依此類推。</p>
        <p>比較一下前後差異，在還沒有導入 <em>ref</em> 之前的程式碼，這時點擊按鈕並無法更新畫面裡年齡的數字：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    let name = "阿比";
    let age = 18;

    function addAge (){
        age += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>使用 <em>ref</em> 讓指定資料成為響應式資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;姓名：{{ name }}&lt;/h1&gt;
    &lt;h2&gt;年齡：{{ age }}&lt;/h2&gt;
    &lt;button @click = "addAge();"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let name = "阿比";
    let age = ref(18);

    function addAge (){
        age.value += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>篇幅過長的緣故，另一種響應式資料定義方法 <em>reactive</em> 於下一篇文章再來筆記，但其實有關 <em>ref</em> 也只是先講完最基本的基本型別響應而已，還有一些更進階的概念，一併留到下篇繼續作探討。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://v4.vitejs.dev/" target="_blank">Vite</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=d5mrJfl6UWM&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=1" target="_blank">【极简Vue3】001 Vue3开篇</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>