<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="70" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、路由基本切換</a></li>
            <li><a href="#act2">二、辨別路由組件與一般組件</a></li>
            <li><a href="#act3">三、路由器的工作模式</a></li>
            <li><a href="#act4">四、to 屬性寫法與路由命名</a></li>
            <li><a href="#act5">五、路由的重新定向</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>路由是一種網路設備或軟體的功能，用於將資料包從一個網路傳輸到另一個網路。它決定資料包應該通過哪條路徑進行傳輸，以確保它們能夠到達目的地。</p>
        <p>用來管理路由的設備就叫路由器，它們在網路中幫助不同裝置連接不同的網路並管理資料流量的傳輸。路由器透過查看封包中的目標位址，並根據預先配置的路由表來決定最佳路徑。這樣，它們可以將封包從發送方傳送到接收方，即使這兩者位於不同的網路中也可以實現。</p>
        <p>用說的不好咀嚼，直接看示意圖會比較快一些：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-1.jpg">
        </figure>
        <p>而在網頁前後端的技術中也有所謂的路由，概念和網際網路的路由有些相像，只不過路由器的接口變成了「Key」，而銜接的每一台設備則是「Value」。因此，上面這張圖如果要用來詮釋網頁應用的路由示意，就會是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-2.jpg">
        </figure>
        <p>所以，站在網頁程式語言的角度來看，路由（route）指的是一組 key 與 value 的對應關係，若存在多組路由，則需要經過路由器（router）的管理。那麼，網頁為什麼會需要路由？其實主要是為了實現 SPA 單頁式網頁應用，用來切換不同資訊的頁面內容。至於具體如何設定、有哪些功能，以及其它一些相關知識，本篇文章將逐一進行探討。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、路由基本切換</h2>
        <p>我們首先要知道 Vue.js 實現 SPA 路由導航需要有哪些東西：</p>
        <ol>
            <li>導航區塊、展示區塊</li>
            <li>路由器</li>
            <li>路由的規則（什麼路徑、對應什麼組件）</li>
            <li>形成之組件（.vue）</li>
        </ol>
        <p>網頁路由建構的第一步必須要先規劃好放置路由項目的導航區塊，以及展示各個功能的內容區塊。所以我們在根組件 <b>App.vue</b> 建立以下內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;!-- 導航區塊 --&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;a href=""&gt;Home&lt;/a&gt;
            &lt;a href=""&gt;About&lt;/a&gt;
            &lt;a href=""&gt;News&lt;/a&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
    &lt;!-- 展示區塊 --&gt;
    &lt;main&gt;
    &lt;/main&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>導航區塊的部分，我先設置了三個導航項目，分別是「Home」、「About」、「News」，它們分別對應網頁的首頁、關於我們、最新消息這三個資訊頁面。而 <em>&lt;main&gt;</em> 則是預計要用來放置上述資訊內容的展示區塊，目前則還沒有任何內容。</p>
        <p>再來要安裝路由器，Vue.js 本身有提供一款名叫 Vue Router 用來處理路由相關設定的第三方套件，如果是使用 Vite 來開發 Vue 3，那麼在最一開始創建專案的時候系統就會詢問是否要安裝 Vue Router，假如當時沒有選擇安裝的話，也可以透過 NPM 指令安裝到專案裡：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm i vue-router</code></pre>
        </div>
        <p>安裝完成後，手動在 <b>src/</b> 資料夾建立 <b>router/</b> 資料夾，並且新增一個 <b>index.ts</b> 文件。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
└── router
    └── index.ts</code></pre>
        </div>
        <p>這個文件就是用來管理整個網頁應用的路由設定，進入該文件執行以下兩件事情：創建一個路由器，並且將其導出。</p>
        <p>但在創建之前，必不可少的就是要先把 Vue Router 引用進來：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter } from "vue-router";</code></pre>
        </div>
        <p>創建路由器，語法格式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const router = createRouter({
    routes: []
});</code></pre>
        </div>
        <p>可以將這個函式理解為創建路由器（<em>router</em>），以用來管理眾多路由（<em>routes</em>），因此需要透過陣列來存放各個路由的資料。前面有提過，路由是一個 key 值與 value 值的對應關係，因此每一組路由都是獨立的物件，且至少會有兩個屬性，分別是 <em>path</em> 與 <em>component</em>，<em>path</em> 表示路徑，<em>component</em> 則表示來源組件。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import Home from "../components/Home.vue";

const router = createRouter({
    routes: [
        {
            path: "/home",
            component: Home
        }
    ]
});</code></pre>
        </div>
        <p>倘如工作環境是使用 VS Code 開發 Vue，且也有安裝相關擴充套件輔助，不用等到網頁渲染，這時編輯器應該已經為上述程式碼劃上了象徵警告的紅色波浪線，原因是我們並沒有設定路由的工作模式（關於工作模式的詳細介紹後面章節會再說明），所以必須再加上這段：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            component: Home
        }
    ]
});</code></pre>
        </div>
        <p>路由設定完後，別忘記最後要將程式碼導出，否則其他檔案無法取得這支文件裡面的函式內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export default router;</code></pre>
        </div>
        <p>連同另外兩個功能的路由，以下展示完整的路由設定檔的程式碼結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import News from "../components/News.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            component: Home
        },
        {
            path: "/about",
            component: About
        },
        {
            path: "/news",
            component: News
        }
    ]
});

export default router;</code></pre>
        </div>
        <p>再來是要讓這個路由文件運作，打開 <b>main.ts</b>，把路由器引入進去：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import router from './router'</code></pre>
        </div>
        <p>原本下方 <em>createApp(App).mount('#app')</em> 這行意思是創建一個應用並將整個應用掛載到 <em>#app</em> 容器中，因為需要多調用 <em>router</em> 功能，所以得重新改寫架構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const app = createApp(App);
app.use(router);
app.mount('#app');</code></pre>
        </div>
        <p>最後一步是把各組件內容呈現在展示區，以及修改導航路由標籤。回到 <b>App.vue</b>，分別引用「RouterLink」、「RouterView」功能：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { RouterLink, RouterView } from 'vue-router'</code></pre>
        </div>
        <h5>修改導航區塊的標籤內容：</h5>
        <p>最一開始我們於導航區塊的連結是採用傳統 HTML 所使用的 <em>&lt;a&gt;</em> 標籤，在 Vue Router 我們則要改使用它提供的 <em>&lt;RouterLink&gt;</em>，並且把 <em>href</em> 改成 <em>to</em> 屬性：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;header&gt;
    &lt;nav&gt;
        &lt;RouterLink to="/home"&gt;Home&lt;/RouterLink&gt;
        &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
        &lt;RouterLink to="/news"&gt;News&lt;/RouterLink&gt;
    &lt;/nav&gt;
&lt;/header&gt;</code></pre>
        </div>
        <p>當然要堅持使用原生 HTML 的 <em>&lt;a&gt;</em> 也不是不行，只是這樣會失去使用 Vue Router 的好處。</p>
        <p><br></p>
        <h5>修改展示區塊的標籤內容：</h5>
        <p>在原本規劃用來展示各組件內容的 <em>main</em> 元素標籤裡，加上 <em>&lt;RouterView/&gt;</em> 標籤：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;main&gt;
    &lt;RouterView /&gt;
&lt;/main&gt;</code></pre>
        </div>
        <p>加入此標籤，當 <em>RouterLink</em> 導向指定的路由時，就會將路徑對應的組件內容渲染到這個標籤所在位置。</p>
        <p>至此路由的基本切換功能就搞定了，我們可以從瀏覽器測試切換的效果如何：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-3.jpg">
        </figure>
        <p>點擊 About：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-4.jpg">
        </figure>
        <p><br></p>
        <h3>為導航區塊項目加上選中狀態：</h3>
        <p>上面的範例，假如截圖沒有箭頭指示，其實不容易看出目前展示區塊展示的內容目前屬於哪一個導航路由，細數坊間各大類型的網站平台，絕大多數當網頁切換到不同頁面的時候，被選中的導航項目會有特別樣式，好讓使用者更清晰地知道目前自己正處於網站的哪一個功能裡面。如果希望 <em>RouterLink</em> 也可以實現這樣的功能，我們只需要在 <em>&lt;RouterLink&gt;</em> 標籤加上 <em>active-class</em> 屬性即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;header&gt;
    &lt;nav&gt;
        &lt;RouterLink to="/home" active-class="is-active"&gt;Home&lt;/RouterLink&gt;
        &lt;RouterLink to="/about" active-class="is-active"&gt;About&lt;/RouterLink&gt;
        &lt;RouterLink to="/news" active-class="is-active"&gt;News&lt;/RouterLink&gt;
    &lt;/nav&gt;
&lt;/header&gt;</code></pre>
        </div>
        <p>隨意為自定義的 <em>is-active</em> 類別選擇器加上一些樣式效果，例如背景變成紅色，而文字顏色改為白色，來看看實際效果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-5.jpg">
        </figure>
        <p>這樣即使沒有畫箭頭示意，也能明確看出目前展示的內容是來自於哪一個頁面路由導航。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、辨別路由組件與一般組件</h2>
        <p>簡單扼要來說，要分辨使用的組件究竟是哪一種，最通俗直接的方法就是那些需要手動寫在標籤裡引用的都可以稱為一般組件，比如有一個 <b>SearchResult.vue</b> 組件，如果要引用它的方式是 <em>&lt;SearchResult/&gt;</em>，那便是一般組件。而路由組件不是經過標籤去實現，而是依靠路由規則所渲染出來的，比如在路由設定文件裡設定：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import Products from "../components/Products.vue";
const router = createRouter({
    routes: [
        {
            path: "/products",
            component: Products
        },
    ]
});</code></pre>
        </div>
        <p>那麼這個 <b>Products.vue</b> 則稱為路由組件。</p>
        <p>但是實務開發專案的時候會盡量把路由組件和一般組件分開管理以避免混淆，路由組件通常會存放在 <b>pages/</b> 或 <b>view/</b> 資料夾，而一般組件則通常指的是放置在 <b>components</b> 裡的組件。雖說這樣的資料夾命名和分類不是絕對，不過我們所使用的框架及工具，以及像 GitHub 這類可以看到其他開發者或團隊公開的開源程式碼，大多數也都是按照這樣的標準來管理組件。</p>
        <p>於是原先我們範例中的組件結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
├── components
│    ├── About.vue
│    ├── Header.vue
│    ├── Home.vue
│    └── News.vue
└── App.vue</code></pre>
        </div>
        <p>（<b>Header.vue</b> 是後來把 <em>&lt;header&gt;</em> 結構獨立拉出來建立的一個子組件）</p>
        <p>按照上述的常見的架構規劃，將路由與一般組件歸納為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
├── components
│    └── Header.vue
├── pages
│    ├── About.vue
│    ├── Home.vue
│    └── News.vue
└── App.vue</code></pre>
        </div>
        <p>歸類好後記得回頭更改路由設定文件裡的路徑位置。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、路由器的工作模式</h2>
        <p>之前有提到，如果要讓路由器能順利運作，必須在 <em>createRouter</em> 設定它的工作模式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">history: createWebHistory(),</code></pre>
        </div>
        <p>假如沒有設定工作模式，瀏覽器就無法順利渲染畫面，同時會回報錯誤警告：</p>
        <blockquote class="is-error">
            <p>Uncaught Error: Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.</p>
        </blockquote>
        <p>它的意思是在創建路由器（router）時，必須提供一個名為 <em>history</em> 的選項，這是因為 Vue Router 需要知道應該如何管理應用程序的路由歷史記錄。</p>
        <p>Vue Router 有兩種工作模式，分別是 History 與 Hash 模式。</p>
        <p><br></p>
        <h3>History：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">history: createWebHistory(),</code></pre>
        </div>
        <h5>優點：</h5>
        <p>URL 較美觀，不會有 <em>#</em> 字符，較貼近傳統網站的 URL，例如：itrong.com/about，對 SEO 相對友善。</p>
        <h5>缺點：</h5>
        <p>網站正式上線時可能需要伺服器端配合處理路徑問題，否則重新整理網頁可能會產生 404 錯誤。</p>
        <p><br></p>
        <h3>Hash：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">history: createWebHashHistory(),</code></pre>
        </div>
        <h5>優點：</h5>
        <p>相容性較佳，即使是舊瀏覽器也能正常運作，同時亦不太需要伺服器端處理路徑問題。</p>
        <h5>缺點：</h5>
        <p>URL 會夾帶 <em>#</em> 字符，看上去相對比較不美觀，例如：itrong.com/#/about，且 SEO 優化也會比較差。</p>
        

        
    </div>
    <div class="text-block" id="act4">
        <h2>四、to 屬性寫法與路由命名</h2>
        <p>使用 <em>&lt;RouterLink&gt;</em> 實作路由導航，會透過 <em>to</em> 屬性設定該導航項目指向的組件路徑，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>而除了直接給予路徑這種字串型別寫法外，還有另外一種物件型別式的寫法，搭配 v-bind 使用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink :to="{ path:'/about' }"&gt;About&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>這種寫法又可以衍生出為路由定義名稱後直接引用名稱的方式：</p>
        <p><b>router/index.ts</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const router = createRouter({
    routes: [
        {
            name: "關於我們",
            path: "/about",
            component: About
        },
    ]
});</code></pre>
        </div>
        <p>組件 RouterLink 引用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink :to="{ name: '關於我們' }"&gt;About&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>在網頁只需要一層路由的情況下，使用純字串定義路由導航通常沒什麼問題，不過如果網站的路由有多個嵌套，就會比較需要物件型別式的寫法了。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、路由的重新定向</h2>
        <p>你可能已經發現，前面的範例練習一直存在著一個問題，那就是當網頁沒有進入任何組件的時候（或者也可以說是首頁），RouterView 是一片空白：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-6.jpg">
        </figure>
        <p>與此同時，瀏覽器的 Console 視窗也存在一則警告：</p>
        <blockquote class="is-danger">
            <p>[Vue Router warn]: No match found for location with path "/"</p>
        </blockquote>
        <p>意思是在說找不到與根路徑匹配的路由配置。</p>
        <p>要解決這個問題有兩種方式，第一種是在 <em>routes</em> 另外定義一個根路徑的路由配置，然後指定我們想要呈現在首頁的組件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const router = createRouter({
    routes: [
        {
            path: "/",
            component: Home
        },
    ]
});</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-7.jpg">
        </figure>
        <p>這種方法會讓首頁的 URL 看起來很單純，但缺點就是導覽列如果也有 home 的路由項目，你會發現在根路徑情況下，home 的路由不被判定在被選中狀態。</p>
        <p><br></p>
        <p>另一種則是使用 <em>redirect</em> 屬性，並指定要前往的組件路徑，那麼不管網頁是直接進入根路徑還是使用者強制手動進入根路徑，網頁都會自動導向至我們設定的指定路徑：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const router = createRouter({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
    ]
});</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-9-8.jpg">
        </figure>
        <p>因為根路徑會強制轉到 home 組件，所以路由判定會附加選中狀態的樣式，只是使用者造訪網頁根路徑（首頁）時，網址後方必定會有網站指定的導向路由名稱，對部分人來說可能看起來就沒那麼美觀。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=30" target="_blank">【极简Vue3】030 对路由的理解</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=31" target="_blank">【极简Vue3】031 路由 基本切换效果</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=32" target="_blank">【极简Vue3】032 路由 两个注意点</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=33" target="_blank">【极简Vue3】033 路由 路由器工作模式</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=34" target="_blank">【极简Vue3】034 路由 to的两种写法</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=35" target="_blank">【极简Vue3】035 路由 命名路由</a></dd>
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