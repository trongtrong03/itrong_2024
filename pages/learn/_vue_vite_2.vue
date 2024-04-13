<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="60" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Vite 網頁應用的初始規劃</a></li>
            <li><a href="#act2">二、使用 create-vue 建立 SPA</a></li>
            <li><a href="#act3">三、Vue Router 路由設定：RouterLink</a></li>
            <li><a href="#act4">四、Vue Router 路由設定：RouterView</a></li>
            <li><a href="#act5">五、建立錯誤警示頁面路由</a></li>
            <li><a href="#act6">六、建立嵌套路由</a></li>
            <li><a href="#act7">七、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>安裝好 Vite 所需環境並建立好基本的專案架構後，從這篇文章開始我們將探索如何使用 Vite 創建單頁網頁應用程序（SPA），而本篇除了介紹 Vite 生成的架構外，也會把重點聚焦於各功能組件之間如何相互聯繫，也就「路由」設定。</p>
        <p>所謂的路由（Routing），是指在網頁應用中，根據用戶請求的 URL 來決定如何響應這個請求的過程。簡單來說，路由就是根據 URL 將用戶導向到不同頁面或視圖的過程。在前端開發中，特別是單頁網頁應用（SPA），路由是非常重要的概念。SPA 通常只有一個 HTML 文件，當用戶與應用互動時，它會動態地更新現有頁面內容，而不會重新加載整個頁面。路由的作用就是根據用戶操作，動態改變應用中的內容，從而實現不同頁面之間的切換和導航。</p>
        <p>此外，儘管 Vite 可同時支援 Vue2 Option API 與 Vue 3 Composition API 的語法格式，但本系列文章都會秉持能使用 Vue 3 就不用 Vue 2 來寫程式的原則進行練習。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Vite 網頁應用的初始規劃</h2>
        <p>在 Vite 初始資料夾建置裡，網頁應用的結構長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">index.html
src
├── components
│    └── HelloWorld.vue
├── App.vue
└── main.js</code></pre>
        </div>
        <p>我們各自打開檔案檢視一下程式碼內容是如何撰寫的──</p>
        <h5>index.html：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;body&gt;
    &lt;div id="app"&gt;&lt;/div&gt;
    &lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;
&lt;/body&gt;</code></pre>
        </div>
        <p>會看到 <em>body</em> 裡面的程式碼只有簡短兩行，<em>#app</em> 元素是 Vue 組件 <b>App.vue</b> 掛載的對象。而 <em>script</em> 則是整個網頁應用的入口文件，其 <em>type="module"</em> 屬性是在告訴瀏覽器這支 JS 是一個 ECMAScript 模組化的檔案。</p>
        <p>通常我們如果決定要以 Vue 作為整個網頁應用的結構框架，那麼 <b>index.html</b> 就不太會去作更動，而是應該專注於 Vue 組件的開發與應用。Vite 生成的 <b>index.html</b> 主要用來提供 Vue 掛載的對象，並將入口文件注入到其內，因此，開發者頂多只會修改入口文件的名稱或檔案位置。</p>
        <p>至於上述所有飲用或掛載到 <b>index.html</b> 的各類型檔案，Vite 預設配置下會集中至 <b>src/</b> 資料夾裡面。</p>
        <h5>App.vue：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup&gt;
    import HelloWorld from './components/HelloWorld.vue'
&lt;/script&gt;

&lt;template&gt;
    &lt;HelloWorld msg="Vite + Vue" /&gt;
&lt;/template&gt;

&lt;style scoped&gt;
&lt;/style&gt;</code></pre>
        </div>
        <p>Vite 提供的範例程式碼中我只保留關鍵結構，其他不是很重要的內容都已先移除。你可以看到整個檔案內容主要分成三個部分，分別是 <em>script</em>、<em>template</em>、<em>style</em>，這種結構是 Vue 3 Composition API 的一種格式寫法，對比傳統 Vue 2 結構，Vue 3 使 Vue 結構更加簡潔且容易閱讀，而且每一支組件的 JavaScript 與 CSS 樣式只會在該組件作用域範圍內有作用，不會干擾到其他組件。</p>
        <p>此外，和過往 Vue2 <em>template</em> 的下一層至少還需要一個包裹多個平行階層的 <em>div</em> 作為網頁應用的「進入點」（entry point）不同，Vue 3 的 <em>template</em> 允許開發者直接將同階層的程式碼或組件放在 <em>template</em> 下一層。</p>
        <p>傳統的寫法範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;Header /&gt;
        &lt;main&gt;&lt;/main&gt;
        &lt;Footer /&gt;
    &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>轉換成 Vue 3：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;Header /&gt;
    &lt;main&gt;&lt;/main&gt;
    &lt;Footer /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p><br></p>
        <p>如果我們要在某個組件裡引用其他的組件，必須要在 <em>script setup</em> 作一個註冊的動作，譬如 <b>App.vue</b> 範例程式碼中引用了另一個組件 <b>HelloWorld.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup&gt;
    import HelloWorld from './components/HelloWorld.vue'
&lt;/script&gt;</code></pre>
        </div>
        <p>通常 <b>components/</b> 用來存放 Vue 組件中比較常被其他組件使用的共用模板，也就是子組件。</p>
        <p>引用進來後，我們就可以對子組件進行所需的操作，在 Vite 初始範例裡 <b>HelloWorld.vue</b> 賦予了 <em>props</em> 聲明，用來接收外部傳入的 <em>props</em> 值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup&gt;
    import { ref } from 'vue'

    defineProps({
        msg: String,
    })

    const count = ref(0)
&lt;/script&gt;

&lt;template&gt;
    &lt;h1&gt;{{ msg }}&lt;/h1&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>上方程式碼結構同樣已簡化只保留 <em>props</em> 賦值的相關內容，可以看到 Vue 3 的 <em>props</em> 定義方式和 Vue2 有所不同（但本質是一樣的），Vue 3 的 <em>props</em> 被當作普通的變數而不再是物件方法。</p>
        <p>當 Vite 原始範例於 <b>App.vue</b> 引用此組件時，傳入了 <em>msg="Vite + Vue"</em> 值給 <b>HelloWorld.vue</b> <em v-pre>&lt;h1&gt;{{ msg }}&lt;/h1&gt;</em> 標籤去接收。如果我們在其他組件也引用了 <b>HelloWorld.vue</b>，我們可以賦予其他值給 <em>msg</em>，讓不同組件的 <em v-pre>&lt;h1&gt;{{ msg }}&lt;/h1&gt;</em> 都能呈現各自設定的內容，非常方便。</p>
        <p><br></p>
        <p>以下將 Vite 預設建立的結構整理成一張圖表，幫助我們能更直觀地瞭解各文件之間的關係導向：</p>
        <figure>
            <img src="/images/learn/js/vite-2-1.jpg">
        </figure>
        <p><br></p>
        <p>以上就是 Vite 初始建立的網頁應用範例的結構介紹了，當然這只是 Vite 提供給開發者當作參考的簡單樣板而已，要直接沿用架構來開發專案肯定還有許多問題和需要調整的地方，下個章節就來談談當我們開始執行專案開發時，要如何規劃「相對正常」的網頁應用架構。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、使用 create-vue 建立 SPA</h2>
        <p>承襲上一章最後所述，光憑 Vite 範例的配置，很難應付專案實務上的訴求，比如說剛看完上一章的初始網頁應用的架構介紹，開始興致勃勃地要來建置手頭上的專案，各種問題逐漸在腦海裡湧現......</p>
        <ol>
            <li>我的網頁有好幾個功能頁面？</li>
            <li>各個功能頁面之間該如何作切換？</li>
            <li>功能頁面裡面如果還有其他子頁面該怎麼辦？</li>
            <li>要如何串接 API？</li>
            <li>靜態資源應該要放在哪裡？</li>
            <li>...</li>
        </ol>
        <p>諸多問題煩惱苦惱著，是否反而突然又不知該從何著手進行了？其實以上許多問題都和網頁的路由切換有關，先前曾提過，Vue 有提供一種名為 Vue Router 的工具來處理 Vue 組件之間的切換，尤其對以 SPA 作為網頁應用架構的專案來說，Vue Router 基本上是不可或缺的開發工具。不過如果我們是使用 <em>npm create vite@latest</em> 指令建立 Vite 專案，它本身並不包含 Vue Router 工具的安裝，我們必須再另外執行安裝並且作相關設定，說實話有點麻煩。</p>
        <p>所幸 Node.js 貼心地為 Vite 打造包含 Vue Router、Pinia、Eslint 等工具套件在內的一鍵安裝指令，透過這個指令把那些熱門使用的套件隨著專案建立同時安裝進來，省去自行安裝且還要再另外設定的麻煩。</p>
        <p>安裝指令為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm create vue@3</code></pre>
        </div>
        <p>接著會開始詢問一些選項，根據需求安裝即可：</p>
        <figure>
            <img src="/images/learn/js/vite-2-2.jpg">
        </figure>
        <p>因為本篇文章目標是學會用 Vue Router 來實作 SPA 網頁的頁面切換，所以其他套件都先不安裝，讓專案結構和程式碼看起來單純一點。安裝完成後進入到建立好的專案資料夾（<b>vite-project</b>）內，記得要先執行 <em>npm install</em> 後才能執行 <em>npm run dev</em>。</p>
        <p>開啟本地端網址（通常是 <a href="javascript:void(0)">http://localhost:5173/</a>），正常運作的話會看到以下畫面：</p>
        <figure>
            <img src="/images/learn/js/vite-2-3.jpg">
        </figure>
        <p>（其實原本我是想透過 Vite 官方文件提供的指令一步步把初始專案打造成理想的樣子，但後來發現 Node.js 提供的 Vue 3 專案創建指令實在是太香了，著實沒什麼必要自己一步步手動安裝，加入它跟著使用比較輕鬆愉悅。）</p>
        <p>兩者檔案內容對比：</p>
        <figure>
            <img src="/images/learn/js/vite-2-4.jpg">
        </figure>
        <p>不管你是用哪一種指令建立專案，網頁應用的結構基本上都還是依循著 Composition API。由於 <em>create vue@3</em> 生成的範例檔案組件使用量比較龐大，我先把那些範例內容刪除掉，只保留必要的架構：</p>
        <p>整理後的網頁應用結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">index.html
src
├── assets                      # 靜態資源
│    ├── base.css
│    ├── main.css
│    └── ...
├── components                  # 共用元件
├── router                      # 路由設定
│    └── index.js
├── views                       # RouterView 的組件
│    ├── HomeView.vue
│    └── AboutView.vue
├── App.vue
└── main.js</code></pre>
        </div>
        <p>當然我會建議存放靜態資源的 <b>assets/</b> 資料夾裡面在依據檔案類型另外建立分類資料夾，例如 <b>css/</b>、<b>images/</b> 等，不過這對整個網頁應用的影響不大，所以姑且先維持初始配置不動，本篇文章亦不會對此資料夾有太多著墨。</p>
        <p><b>index.html</b> 檔案內容沒有任何變動，維持單一 <em>#app</em> 元素提供給 Vue 掛載的對象，以及引用入口文件 <b>main.js</b>。</p>
        <p>緊接著來看 <b>App.vue</b>，經一番刪減後的程式碼結構呈現如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup&gt;
    import { RouterLink, RouterView } from 'vue-router'
&lt;/script&gt;

&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
            &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>和先前 <em>create vite</em> 所安裝建立的版本不同的是，這個 <b>App.vue</b> 新加入了兩個和路由有關的標籤：<em>RouterLink</em> 與 <em>RouterView</em>，從前面的 <em>import</em> 很明確可以知道這兩個標籤是引用自 Vue Router 的功能，接下來的兩個章節將分別對它們作介紹。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vue Router 路由設定：RouterLink</h2>
        <p>我們也可以寫成 <em>router-link</em>，兩種標籤寫法皆表示同樣的功能，都是用來定義路由跳轉的連結目標。</p>
        <blockquote>
            <p><em>RouterLink</em> 是  Vue 3 Composition API <em>import</em> 進來的寫法；<em>router-link</em> 則是 Vue Router 提供的原生標籤。</p>
        </blockquote>
        <p><em>to</em> 表示要前往指定的組件目標，範例中分別連向 <em>/</em> 與 <em>/about</em>，這時問題來啦，這個路由連結是怎麼決定的呢？答案在 <b>router/index.js</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router</code></pre>
        </div>
        <p><em>history</em> 這行暫時忽略不看（日後再提），主要重點在 <em>routes</em> 陣列這部份。一組 <em>{ }</em> 物件代表一個功能頁面，目前我們有兩個頁面，也就是 Home 以及 About，因此有兩組物件，物件裡面目前記錄了三個屬性，分別是：</p>
        <h5><em>path</em>：</h5>
        <p>用於設定該組件的 URL 路徑，當用戶訪問該路由對應的 URL 時，Vue Router 將會將網頁應用導向到指定的組件。例如 <b>App.vue</b> 中 <em>&lt;RouterLink to="/about"&gt;</em> 的 <em>to</em> 屬性指向便是取自於此。而 <em>RouterLink to="/"</em> 單一 <em>/</em> 字符通常表示導航到根路徑，也就是首頁。</p>
        <p>點擊 <b>App.vue</b> 的 <em>&lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;</em>，瀏覽器網址列的路徑就會是 XXX/about，如下圖：</p>
        <figure>
            <img src="/images/learn/js/vite-2-5.jpg">
        </figure>
        <h5><em>name</em>：</h5>
        <p>用於設定該路由物件的名稱，現階段可能還看不出它的用途，但這個屬性在程式化導航及動態路由生成方面非常實用，讓我們可以通過名稱來導航到路由，而不是直接使用路徑。</p>
        <h5><em>component</em>：</h5>
        <p>用於指定路由對應的組件。當使用者訪問指定的路由時，Vue Router 將會動態加載並渲染這個組件。通常情況下，每個路由都會對應到一個特定的組件，用於顯示該路由的內容。</p>
        <p>你可能會很好奇，為什麼兩個路由的 <em>component</em> 引用方式會不一樣，難道是根路由（首頁）的「特殊待遇」嗎？其實並非這樣，仔細觀察根路由 <em>component</em> 的值 <em>HomeView</em>，會發現其指向來源是該設定文件中的第二行：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import HomeView from '../views/HomeView.vue'</code></pre>
        </div>
        <p>和 About 的 <em>component</em> 有一點點像對吧？當然我們也可以把 Home 的 <em>component</em> 採用相同格式，可是差別在哪呢？</p>
        <p>差別在於定義在全域中的組件，會在網頁應用渲染時就一起載入進來，我們可以透過瀏覽器開發者工具中的 Network 查看：</p>
        <figure>
            <img src="/images/learn/js/vite-2-6.jpg">
        </figure>
        <p>接著我們點擊 About 連結，繼續觀察 Network 的變化：</p>
        <figure>
            <img src="/images/learn/js/vite-2-7.jpg">
        </figure>
        <p>這時可以看到隨著路由切換，About 頁面的引用組件 <b>AboutView.vue</b> 也被載入了進來，這種把組件引用放在 <em>routes</em> 物件裡的函式的方式，一般稱之為「動態載入」。</p>
        <p>現在我們把 About 的 <em>component</em> 設定仿照 Home 進行設定：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        }
    ]
})

export default router</code></pre>
        </div>
        <p>修改好後儲存並重整網頁，觀看 Network 會發現......</p>
        <figure>
            <img src="/images/learn/js/vite-2-8.jpg">
        </figure>
        <p>我們還沒導航到 About 頁面，但 <b>AboutView.vue</b> 組件已經先跟著 <b>HomeView.vue</b> 一起被讀取了，這就是組件引用放在全域或設定在 <em>routes</em> 裡面的差別。首頁通常是使用者連結到網站一定會先看到的畫面，所以通常會建議在整個網頁應用開始載入時便一同載入，至於其他功能頁面就等使用者點了再開始讀取即可，這麼做可以加速網頁首次載入的速度。</p>
        <p>只是反過來說這也是它的缺點，當組件內容過於龐大，使用者點擊該頁面路由時才開始載入，可能必須得等候一段時間，假如每個功能組件等候的時長不一樣，便會造成使用者不好的 UX 觀感；若是將網站所有路由組件通通放在全域引用，讓等候的時間集中在使用者初次訪問網站的時候，爾後頁面的切換就不需要再作等待，主打一個先苦後甘。</p>
        <p>要採用哪一派的思路，最終還是回歸團隊的抉擇，無法完全篤定孰好孰壞。</p>
        <p><br></p>
        <h3>為什麼一定要用 RouterLink？不能使用 a 標籤嗎？</h3>
        <p>在講述這個問題之前，我們先來看看 <em>RouterLink</em> 在瀏覽器渲染出來的程式碼結構長什麼模樣。</p>
        <p><b>App.vue</b> <em>RouterLink</em> 的程式碼片段：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;nav&gt;
    &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
    &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p>瀏覽器渲染後的 DOM 結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;nav>
    &lt;a href="/" class="router-link-active router-link-exact-active" aria-current="page">Home&lt;/a&gt;
    &lt;a href="/about" class=""&gt;About&lt;/a&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p>會發現 Vite 編譯時會將 <em>&lt;RouterLink&gt;</em> 轉換成 HTML 標準的 <em>&lt;a&gt;</em> 標籤，既然如此，為什麼開發的時候不直接使用 <em>&lt;a&gt;</em> 就好？事實上，如果一開始就直接用 <em>&lt;a&gt;</em> 去作路由切換，經過編譯後網頁應用還是能正常地導航到我們設定的路由頁面，只是這麼做有兩個缺點：</p>
        <h5>1. 跳頁問題：</h5>
        <p>如果直接使用 <em>&lt;a&gt;</em> 標籤，我們在瀏覽器點擊時就會和傳統 HTML 一樣，瀏覽器會有一個重新整理的動作，再連結向我們指定的頁面。這與 SPA 核心的訴求背道而馳──以不重整畫面的前題下切換各功能組件內容。</p>
        <h5>2. 當前頁面的選中樣式：</h5>
        <p>大多數的網站需求都會希望使用者在進入某一個功能頁面時，導覽列項目能有一個醒目的選中樣式，提醒使用者目前正位於網站的哪一個功能裡的畫面。</p>
        <p>Vue Router 有充分考量到這個需求，因此當我們用 RouterLink 連到別的頁面時，被選中的導覽項目會自行添加 <em>.router-link-active</em> 與 <em>.router-link-exact-active</em> 這兩個 class 樣式屬性名稱。</p>
        <figure>
            <img src="/images/learn/js/vite-2-9.jpg">
        </figure>
        <p>但如果直接在組件使用 <em>&lt;a&gt;</em> 標籤切換路由，渲染出來的 HTML 元素就不具備這樣的功能：</p>
        <figure>
            <img src="/images/learn/js/vite-2-10.jpg">
        </figure>
        <p>如果要像傳統手法那樣一頁頁手動去添加選中樣式也未嘗不行，只是既然 Vue Router 已經為我們設想周到提供這樣的功能，為何不直接使用 RouterLink 呢？</p>
        <p>但是強烈建議使用 RouterLink 的原則也僅適用於網頁應用功能之間的路由切換，若連結是要導向外部網站，那麼組件裡使用 <em>&lt;a&gt;</em> 標籤還是無傷大雅的。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、Vue Router 路由設定：RouterView</h2>
        <p><b>App.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup&gt;
    import { RouterLink, RouterView } from 'vue-router'
&lt;/script&gt;

&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
            &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>相較 <em>RouterLink</em>，<em>RouterView</em> 的用途更直白且容易理解，它被用於在 Vue.js 網頁應用中顯示動態路由的內容。當使用者進行路由導航時，<em>RouterView</em> 將動態地渲染對應路由的內容組件。在首頁根路由 <em>/</em> 會載入 <b>HomeView.vue</b> 組件的內容，設定是來自於 <b>router/index.js</b> 裡面 <em>routes:</em> 的設定（節錄相關片段）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import HomeView from '../views/HomeView.vue'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        }
    ]
})</code></pre>
        </div>
        <p>如果有必要，也可以把 <em>HomeView</em> import 給其他指定的組件，例如 <b>AboutView.vue</b>，那麼路由切換到根路由時，<em>&lt;RouterView /&gt;</em> 載入的就會是 <b>AboutView.vue</b> 的內容。</p>
        <p>具體而言，它有以下這三個用途：</p>
        <h5>1. 動態路由渲染：</h5>
        <p>RouterView 用於動態渲染當前匹配到的路由組件。當使用者訪問某個路由時，Vue Router 將根據路由配置動態地渲染對應的組件到 <em>&lt;RouterView /&gt;</em> 中，從而實現了單頁應用程式（SPA）的動態路由功能。</p>
        <h5>2. 嵌套路由：</h5>
        <p>我們可以在一個父組件中使用 <em>&lt;RouterView /&gt;</em> 來顯示子路由的內容。當使用者訪問具有嵌套路由的路由時，RouterView 將根據匹配的路由配置來嵌套渲染對應的子組件。</p>
        <h5>3. 預設路由渲染：</h5>
        <p>我們可以使用 RouterView 作為默認路由的渲染出口。當沒有匹配到任何路由時，RouterView 將會渲染默認路由配置中指定的組件，從而實現默認頁面的渲染功能。例如 Vite 初始範例中預設渲染的組件是 <b>HomeView.vue</b>。</p>
        <p><br></p>
        <h3>同一檔案可以重複使用 RouterView 嗎？</h3>
        <p>答案是可以的，但通常不太有人會這麼作。正常情況下我們只會在父組件（<b>App.vue</b>）使用一次 <em>&lt;RouterView /&gt;</em> 來渲染路由畫面，使用多個 <em>&lt;RouterView /&gt;</em> 只是重複渲染相同的內容，沒什麼正向意義。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、建立錯誤警示頁面路由</h2>
        <p>製作 SPA 類型的網站，有許多眉眉角角需要注意，其中有一項是當使用者在網址列輸入錯誤的路由名稱，網站應該如何作因應？在傳統 MPA 網站，點擊或輸入到不存在的頁面，會顯示「404 Not found」警告字樣的畫面，一些有在注意畫面呈現與使用者體驗的網站，會特地製作網頁來回應使用者錯誤的頁面導向，例如巴哈姆特會自動導向 <b>missing.html</b>：</p>
        <figure>
            <img src="/images/learn/js/vite-2-11.jpg">
        </figure>
        <p>Google 則是直接把提示 404 錯誤的組件渲染進來：</p>
        <figure>
            <img src="/images/learn/js/vite-2-12.jpg">
        </figure>
        <p>Google 的處理方式比較貼近我們 Vite 路由要朝向的目標，在那之前，我們先看看原始檔案配置，在我們分別點擊 <b>App.vue</b> Home 與 About 的 RouterLink，RouterView 都能正常動態渲染對應的組件內容：</p>
        <figure>
            <img src="/images/learn/js/vite-2-13.jpg">
        </figure>
        <figure>
            <img src="/images/learn/js/vite-2-14.jpg">
        </figure>
        <p>現在我們改導向不存在頁面的路由，看看畫面會發生什麼事情，例如在網址列輸入 http://localhost:5173/news：</p>
        <figure>
            <img src="/images/learn/js/vite-2-15.jpg">
        </figure>
        <p>網址列上的路由確實導向 /news，但是 RouterView 所在的位置卻除了個寂寞之外什麼也沒有，打開瀏覽器開發者工具的 Console 視窗，會看到以下警告訊息：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">[Vue Router warn]: No match found for location with path "/news"</code></pre>
        </div>
        <p>意思是說 Vue Router 無法匹配到符合 /news 的路徑內容，由於我們沒有建置任何與 news 有關的路由及組件，所以沒有東西可以渲染，但是，當使用者進入到錯誤或不存在的頁面，畫面卻沒有任何反應，這可能會讓使用者不瞭解目前情況，進而產生負面的使用者體驗觀感。</p>
        <p>在 Vue Router 官方文件 <a href="https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html" target="_blank">捕获所有路由或 404 Not found 路由</a> 章節有教我們該如何製作 404 Not found 組件來捕捉錯誤或不存在的路由，以下是其語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const routes = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]</code></pre>
        </div>
        <p>這段語法對應的位置在 <b>router/index.js</b> <em>routes</em> 陣列變數裡，將其複製過去，並且新增 <b>NotFound.vue</b> 組件及自訂內容，然後讓 <em>component</em> 去引用它。以下是修改後的 <b>router/index.js</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    { 
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    },
]</code></pre>
        </div>
        <p>新增的 <b>NotFound.vue</b> 組件內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;404 Not found!&lt;/h1>
&lt;/template&gt;</code></pre>
        </div>
        <p>完成設定後再將路由改成 http://localhost:5173/news，測試是否有按照我們預想的顯示 NotFound 的頁面：</p>
        <figure>
            <img src="/images/learn/js/vite-2-16.jpg">
        </figure>
        <p>需要注意的是，<em>routes</em> NotFound 的設定不能放在最前面，否則會影響動態路由的捕捉，一般來說都會放在整個 <em>routes</em> 陣列物件順序的最下方。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、建立嵌套路由</h2>
        <p>儘管前面已經學會如何透過 Vue Router 實現 SPA 多個功能頁面組件之間的路由切換，但實務上我們很快會發現，目前學的路由操作似乎無法完全適用於所有網站架構。舉一個明顯的狀況就是當網頁的架構有好幾層的時候，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">Home
About
├── AAA
├── BBB
└── CCC</code></pre>
        </div>
        <p>或許當下直覺會想建立 AAA、BBB、CCC 三個 <b>.vue</b> 組件，然後循之前所學的模式，透過 <em>routes</em> 各自建立 <em>path</em>，再讓 RouterLink 指向它們。這個思路嚴格來講也不算全然錯誤，畢竟某種程度上它也是能達到類似子分頁嵌套的效果，只不過它會有兩個問題：</p>
        <ol>
            <li>子分頁的路由無法吃到選中效果（<em>.router-link-active</em>）。</li>
            <li>不好釐清組件的從屬嵌套關係。</li>
        </ol>
        <p>面對嵌套路由的問題，Vue Router 的中文文件也有提供相關設定教學：<a href="https://router.vuejs.org/zh/guide/essentials/nested-routes.html" target="_blank">嵌套路由</a>，不過教學主要是針對動態路由的操作，對只需要呈現靜態內容的我們小萌新來說一時半刻也不好吸收，但沒關係，以下我們一步步來實作。</p>
        <p>比較常見的嵌套形式有兩種，第一種是嵌套的路由導覽列只會在該嵌套最上層的組件內容出現；另一種則是全站顯示嵌套路由，比如滑鼠經過某導覽項目浮現的子選單，恆存於 <b>App.vue</b> 父組件當中。</p>
        <p>在開始講述這兩種形式建立方法之前，我們需要先部屬好基本的嵌套結構，沿用本章節開頭的架構範例，我們在 <b>view/</b> 資料夾中新增 <b>about/</b> 資料夾，此舉目的是要讓開發者與團隊清楚瞭解到該資料夾裡面的 <b>.vue</b> 組件都是 About 從屬的嵌套內容。接著在資料夾裡面分別新增 <b>a.vue</b>、<b>b.vue</b>、<b>c.vue</b> 三個組件，並加入程式碼──</p>
        <p><b>a.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;AAA&lt;/h1&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>（<b>b.vue</b> 的內容為 BBB，<b>c.vue</b> 內容則是 CCC。）</p>
        <p>建置完後的網頁應用結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">index.html
src
├── components
├── router
│    └── index.js
├── views
│    ├── HomeView.vue
│    ├── AboutView.vue
│    └── about
│         ├── a.vue
│         ├── b.vue
│         └── c.vue
└── App.vue</code></pre>
        </div>
        <p><br></p>
        <h3>1. 功能組件裡的嵌套路由：</h3>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/js/vite-2-17.jpg">
        </figure>
        <p>首先，調整 <b>App.vue</b> 的結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
            &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>再來是 <b>AboutView.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;RouterLink to="/about/aaa">AAA&lt;/RouterLink&gt;
    &lt;RouterLink to="/about/bbb"&gt;BBB&lt;/RouterLink&gt;
    &lt;RouterLink to="/about/ccc"&gt;CCC&lt;/RouterLink&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>這個組件對應的路由是 <b>/about</b>，所以我們可以稱它是整個 About 功能的父組件，本範例要不要添加其他內容自己決定，但通常父組件除了嵌套路由之外也會同時函蓋一些資訊。而放在這個組件內的嵌套路由就是 About 的子組件，白話來說就是子頁面或細頁。</p>
        <p>你會發現除了 <b>App.vue</b>，我們也在 <b>AboutView.vue</b> 加入了 <em>&lt;RouterView /&gt;</em>，這是要用來顯示嵌套路由組件的內容。</p>
        <p>修改 <b>router/index.js</b> 的設定（只列出 <em>routes</em> 的部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        children: [
            {
                path: 'aaa',
                name: 'AAA',
                component: () => import('../views/about/a.vue'),
            },
            {
                path: 'bbb',
                name: 'BBB',
                component: () => import('../views/about/b.vue'),
            },
            {
                path: 'ccc',
                name: 'CCC',
                component: () => import('../views/about/c.vue'),
            }
        ]
    }
]</code></pre>
        </div>
        <p>建立嵌套路由的關鍵是 <em>children</em> 屬性，我們在 About 路由對應的物件裡加入該屬性，表示在該屬性裡面的子物件路由，都從屬於 About 路由底下。</p>

        
        <p><br></p>
        <h3>2. 父組件裡的嵌套路由：</h3>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/js/vite-2-18.jpg">
        </figure>
        <p>首先，調整 <b>App.vue</b> 的結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;RouterLink to="/"&gt;Home&lt;/RouterLink&gt;
            &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
            &lt;div&gt;
                &lt;RouterLink to="/about/aaa"&gt;AAA&lt;/RouterLink&gt;
                &lt;RouterLink to="/about/bbb"&gt;BBB&lt;/RouterLink&gt;
                &lt;RouterLink to="/about/ccc"&gt;CCC&lt;/RouterLink&gt;
            &lt;/div&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>把 About 嵌套路由的導覽項目添加到父組件裡面，也有些人會把父組件共用功能例如 Header 或 Footer 另外寫在 <b>components</b> 子組件作引用，使 <b>App.vue</b> 的程式結構看起來更加簡潔。</p>
        <p>再來是 <b>AboutView.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;RouterView /&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>只留下 <em>&lt;RouterView /&gt;</em>，用來渲染子組件的內容。</p>
        <p>修改 <b>router/index.js</b> 的設定（只列出 <em>routes</em> 的部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        redirect: '/about/aaa',
        component: () => import('../views/AboutView.vue'),
        children: [
            {
                path: 'aaa',
                name: 'AAA',
                component: () => import('../views/about/a.vue'),
            },
            {
                path: 'bbb',
                name: 'BBB',
                component: () => import('../views/about/b.vue'),
            },
            {
                path: 'ccc',
                name: 'CCC',
                component: () => import('../views/about/c.vue'),
            }
        ]
    }
]</code></pre>
        </div>
        <p>基本上和前一個作法的設定差不多，最大的差異在於 <em>about</em> 物件中新增了一條屬性：<em>redirect: '/about/aaa'</em>。這個屬性是用來設定該路由的重新導向，為什麼要設置它？因為我們如果直接點擊導覽列中的 <em>&lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;</em>，路由會切換至 <b>AboutView.vue</b> 組件，可是該組件內容只剩下提供給嵌套路由渲染組件用的 <em>&lt;RouterView /&gt;</em>，所以當路由進入到 <b>/about</b>，畫面將是一片空白（因為沒有載入到其他嵌套路由，自然也就沒有內容可以顯示）。</p>
        <p>因此，我們需要給 <b>/about</b> 一個重新導向的路由目標，讓使用者從任何管道進入該路由時能自動導向到指定的其他路由。在這個範例中，我們設置 <b>/about</b> 的 <em>redirect</em> 是 <b>/about/aaa</b>，當使用者觸發 <b>/about</b> 路由，網址會直接轉向到 <b>/about/aaa</b>。</p>
        <p><br></p>
        <p>本篇有關路由的基礎應用先寫到這裡，不過說是基礎，其實還有很多基礎方法都沒有說到，包含動態錄由，<em>push</em>、<em>replace</em>、<em>go</em> 方法的應用與差異，以及 <b>router/index.js</b> 設定檔中的 <em>history</em> 設定......等等，更別說其他像是 Navigation Guards 以及 Fetching API 等進階概念，可見 Vue Router 為 SPA 網頁應用設計所提供的幫助有多重要，由於現階段還在極新手階段，只練習幾個靜態路由需要的設定及模擬實務上會遇到的狀況，前面提到那些尚未觸及的運用，暫且留到日後再行介紹。</p>
    </div>
    <div class="text-block" id="act7">
        <h2>七、參考資料</h2>
        <dl>
            <dd><a href="https://v4.vitejs.dev/" target="_blank">Vite</a></dd>
            <dd><a href="https://router.vuejs.org/zh/introduction.html" target="_blank">Vue Router 官方中文文件</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=rNQIA0Fe9KQ&list=PLbOfcOk7bN42Kzp1wQsoLuU0vPUmFBe-X&index=1" target="_blank">Vue3 + Vite 快速上手 Get Startrd</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=lZk4peRTbdg" target="_blank">Vite 開發工具起步走～，開發 React、Vue 等 JS 框架新神器</a></dd>
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