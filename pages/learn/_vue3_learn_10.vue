<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、建立嵌套路由' },
        { id: 2, title: '二、路由之間的傳遞參數：query' },
        { id: 3, title: '三、路由之間的傳遞參數：params' },
        { id: 4, title: '四、query V.S. params' },
        { id: 5, title: '五、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="71" fileType="learnList" />
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
        <p>前一篇文章大概講述了關於 Vue 路由的基本使用方法，如同最後章節進一步說明 <em>to</em> 屬性時說的，網站規劃假如只有單一路由階級，那麼路由設定不需要這麼麻煩，直接用字串導向各個路由組件即可。但實際上開發專案應該頗有感，很多網站基本都有好幾層路由導航，比如最新消息底下點擊標題會連結到內文頁面，又好比會員系統裡有會員資料、訂單查詢、支付綁定......等功能，像這樣至少有二至三層或更多層的網頁架構，用物件來撰寫路由可能會比單純用字串表示來得更加推薦。</p>
        <p>本篇文章除了探究箇中緣由外，同時也會學著如何一步步建立多個路由層級的嵌套路由架構。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>承襲上一篇文章建立好的架構：</p>
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
        <p>決定在 <b>News.vue</b> 路由組件建立嵌套，以下拆解成步驟說明。</p>
        <p><br></p>
        <h6>1. 編輯組件模板程式碼</h6>
        <p>首先鋪陳模板的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;News&lt;/h1&gt;
    &lt;article&gt;
        &lt;aside&gt;
            &lt;ul&gt;
                &lt;li&gt;新聞標題1&lt;/li&gt;
                &lt;li&gt;新聞標題2&lt;/li&gt;
                &lt;li&gt;新聞標題3&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/aside&gt;
        &lt;section&gt;
            &lt;div&gt;新聞編號&lt;/div&gt;
            &lt;div&gt;新聞標題&lt;/div&gt;
            &lt;div&gt;新聞內容&lt;/div&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>但是直接這樣使用是不對的，因為這裡的各項標題項目都是寫死的，意即純靜態的，我們必須將其改成響應式的動態資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script setup lang="ts"&gt;
    import { reactive } from 'vue';

    const newsList = reactive([
        {
            id: 1,
            title: "新聞標題01",
            content: "新聞內容01"
        },
        {
            id: 2,
            title: "新聞標題02",
            content: "新聞內容02"
        },
        {
            id: 3,
            title: "新聞標題03",
            content: "新聞內容03"
        }
    ]);
&lt;/script&gt;</code></pre>
        </div>
        <p>定義好響應式資料，接著要傳給模板，也就是原本呈現靜態資料的 <em>li</em> 元素。我們使用 <em>v-for</em> 將陣列裡的資料一一渲染出來：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;aside&gt;
    &lt;ul&gt;
        &lt;li v-for="item in newsList" :key="item.id"&gt;
            &lt;a href=""&gt;{{ item.title }}&lt;/a&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/aside&gt;</code></pre>
        </div>
        <p>這時整個網頁應用切換到 News 的時候畫面如下：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-1.jpg">
        </figure>
        <p>紅色邊框圈起的範圍是導航區塊，綠色邊框的範圍則是展示區塊，所以在 News 這個功能畫面裡，可以看到外層綠色邊框（RouterView）裡面又包了一層 <b>News.vue</b> 組件建立要用來顯示標題內容的 <em>&lt;section&gt;</em>，這就是所謂的嵌套。但是目前我們尚未對 <em>&lt;section&gt;</em> 裡面的靜態資料進行改寫，所以整個嵌套的作業還不算完成。</p>
        <p><br></p>
        <h6>2. 新增子路由組件</h6>
        <p>在修改 <em>&lt;section&gt;</em> 裡面的程式碼之前，我們需要先額外建立一個路由組件，並命名為 <b>NewsView.vue</b>，內容則是將原本 <b>News.vue</b> 展示區塊裡的標籤移動過來：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號&lt;/div&gt;
    &lt;div&gt;新聞標題&lt;/div&gt;
    &lt;div&gt;新聞內容&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p><br></p>
        <h6>3. 修改路由設定文件</h6>
        <p><b>News.vue</b> 寫好了，用來顯示最新消息各項標題的內容頁 <b>NewsView.vue</b> 也有了，再來就是要設定嵌套路由的部分，打開 <b>router/index.ts</b> 路由器設定文件，把新建立的 <b>NewsView.vue</b> 引入進去：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import NewsView from "../pages/NewsView.vue";</code></pre>
        </div>
        <p>然後在 <em>routes</em> 陣列裡找到之前寫好的 News 物件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        name: "最新消息",
        path: "/news",
        component: News
    }
]</code></pre>
        </div>
        <p>在 <em>component</em> 屬性下方追加新的屬性，名稱叫做 <em>children</em>，這個 <em>children</em> 的值是一個陣列，表示在這個 <em>News</em> 底下可有複數子路由。每個子路由也都是獨立的物件，有著和父級路由（<em>News</em>）一樣的屬性 <em>path</em> 與 <em>component</em>。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        name: "最新消息",
        path: "/news",
        children:[
            {
                path: "newsView",
                component: NewsView
            }
        ]
    }
]</code></pre>
        </div>
        <p>值得注意的是，子路由的 <em>path</em> 不需要添加 <em>/</em>，直接填入預期的路徑名稱即可。</p>
        <p><br></p>
        <h6>4. 為父級路由組件加上路由標籤</h6>
        <p>到上個步驟結束，其實我們已經可以透過網址列輸入 /news/newsView 導到該組件路由，只是目前我們的 <b>New.vue</b> 還沒有添加 RouterLink 以及 RouterView，所以展示區塊什麼內容也沒有，或者說是沒法接收到路由請求。</p>
        <p>回到 <b>New.vue</b>，將程式結構改寫如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1&gt;News&lt;/h1&gt;
    &lt;article&gt;
        &lt;aside&gt;
            &lt;ul&gt;
                &lt;li v-for="item in newsList" :key="item.id"&gt;
                    &lt;RouterLink to="/news/newsView"&gt;{{ item.title }}&lt;/RouterLink&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/aside&gt;
        &lt;section&gt;
            &lt;RouterView/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import { reactive } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';

    const newsList = reactive([
        // 略
    ])
&lt;/script&gt;</code></pre>
        </div>
        <p><em>RouterLink</em> 填入的路徑必須是完整的父級路由與子級路由的嵌套，否則若只有單一填寫子級路由，瀏覽器會回傳警告說找不到對應的路由：</p>
        <blockquote class="is-danger">
            <p>[Vue Router warn]: No match found for location with path "/newsView"</p>
        </blockquote>
        <p>所以不管怎麼樣，嵌套路由在 <em>RouterLink</em> 引用時都要記得連同父級路由完整地一層一層寫進來。</p>
        <p>最後成果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-2.jpg">
        </figure>
        <p>至於目前 <b>NewsView.vue</b> 組件裡面的內容都是純靜態的，故還無法隨著路由切換而動態渲染相對應的內容，下個章節傳遞參數就是要來講講要如何把各個資料的參數傳遞給各自對應的路由。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>在上個章節完成的範例，無論我們點擊哪一個子路由（新聞標題01、02、03），右側展示區塊的內容就是紋絲不動，始終只呈現 <b>NewsView.vue</b> 裡面預設的內容，假如希望它能隨著子路由切換，自動接收該路由所擁有的資料，那麼我們需要透過傳遞的方式，將資料傳遞給目標路由。</p>
        <p>在 Vue Router 裡存在兩種與參數有關的功能，分別是 <em>query</em> 以及 <em>params</em>，本章節要敘述的是第一種。</p>
        <p><em>query</em> 表示的方式很簡單，只要在 <em>RouterLink</em> 的 <em>to</em> 所指向的具體路由規則路徑中加入一個 <em>?</em>，就表示接下來將傳遞什麼參數進去，比如我們在 <em>?</em> 後方加上「dog=阿比」：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;li v-for="item in newsList" :key="item.id"&gt;
    &lt;RouterLink to="/news/newsView?test"&gt;{{ item.title }}&lt;/RouterLink&gt;
&lt;/li&gt;</code></pre>
        </div>
        <p>然後我們從瀏覽器依序點擊 News 與新聞標題，會看到網址列變成了 <b>/news/newsView?dog=阿比</b>，這其實就證明我們指定的參數已經傳遞給了路由。</p>
        <p>既然父級路由已經傳遞了參數給子級路由，那子級路由勢必得接收下來用。然而，子級路由也並非憑空說要收就能收，首先必須要在該組件（<b>NewsView.vue</b>）引入 <em>useRoute</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { useRoute } from 'vue-router';</code></pre>
        </div>
        <p>有沒有覺得 <em>useRoute</em> 這個函式名稱似曾相似？前幾篇文章曾介紹 Vue 的 hooks 寫法，其自定義的 hooks 名稱皆以「use」作為開頭命名規範，由此可見 <em>useRoute</em> 也是一種 hooks。</p>
        <p>既然引入了 <em>useRoute</em>，自然也就要使用它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let route = useRoute();</code></pre>
        </div>
        <p>可以利用 Console 看看這個 <em>useRoute()</em> 是什麼玩意：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("useRoute", route);</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-3.jpg">
        </figure>
        <p>可以看到它是一個代理物件，展開細節還能看到 <em>query</em> 物件裡面夾帶著一個名稱為 <em>dog</em> 的屬性，而其值則為「阿比」。既然如此，要取得這個值也不難懂了，只要在組件模板裡添加 <em v-pre>{{ route.query.dog }}</em>，那麼渲染出來的資料就會是「阿比」，只不過這個值是我們從父級路由傳遞進來的固定參數，不會隨著動態切換而改變。</p>
        <p>回到範例，我們將模板依樣畫葫蘆修改成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號 {{ route.query.id }}&lt;/div&gt;
    &lt;div&gt;新聞標題 {{ route.query.title }}&lt;/div&gt;
    &lt;div&gt;新聞內容 {{ route.query.content }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>接著到父級路由組件 <b>News.vue</b>，將傳遞參數的 RouterLink 內容修改一下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;li v-for="item in newsList" :key="item.id"&gt;
    &lt;RouterLink :to="`/news/newsView?id=${item.id}`"&gt;{{ item.title }}&lt;/RouterLink&gt;
&lt;/li&gt;</code></pre>
        </div>
        <p>此處分別使用了 v-bind 將 <em>to</em> 屬性的值定義為表達式，並且用 <em>``</em> 符號建立一個模板字串（Template literals）。</p>
        <p>至此就搞定了 <em>id</em> 的部分，實際去測試畫面，RouterView 內容的「新聞編號」已經可以跟著 RouterLink 項目對應的 <em>id</em> 編號做同步更新：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-4.jpg">
        </figure>
        <p>目前只完成 <em>id</em> 而已，另外還有 <em>title</em> 和 <em>content</em>，操作方法和 <em>id</em> 一樣，不同的屬性之間用 <em>&</em> 區隔即可。</p>
        <p>程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">
&lt;RouterLink :to="`/news/newsView?id=${item.id}&title=${item.title}&content=${item.content}`"&gt;{{ item.title }}&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-5.jpg">
        </figure>
        <p>雖然這樣寫確實能讓父級路由組件傳遞參數給子級路由動態響應資料了，但這顯然不是最佳的寫法，因為當要傳入的參數變多，不光路由寫起來非常艱澀難懂，程式碼看起來也非常不美觀。所以一般而言都會用下面這個方法，也就是前一篇文章提到 <em>to</em> 的「物件型別」式的寫法。</p>
        <p>語法如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink
    :to="{
        path: '/news/newsView',
        query: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    }"
&gt;
    {{ item.title }}
&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>假如當初在路由設定文件建立子路由的時候有給它加上 <em>name</em> 屬性作命名，那麼上面的 <em>path</em> 也可以改用 <em>name</em> 來寫會看上去又更簡潔一些：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink
    :to="{
        name: 'view',
        query: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    }"
&gt;
    {{ item.title }}
&lt;/RouterLink&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p><em>params</em> 同樣也具備路由傳遞的功能，但是和 <em>query</em> 有些區別，具體差異留到文章末端再行比較，章節開頭先來說說該怎麼運用 <em>params</em>。</p>
        <p>首先，我們在 <b>New.vue</b> 的 RouterLink，把響應式資料中的三個屬性名稱添加進去：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink to="/news/newsView/id/title/content"&gt;{{ item.title }}&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>雖然我們心知肚明加進去的三個值是參數，但是對 Vue Router 而言，現階段我們這麼寫只會被認定多嵌套三個層級的路由，所以當網頁應用切換到 News 的時候，瀏覽器的 Console 會回傳警告訊息：</p>
        <blockquote class="is-danger">
            <p>[Vue Router warn]: No match found for location with path "/news/newsView/id/title/content"</p>
        </blockquote>
        <p>要讓這三個值成為參數，我們還必須從 <b>router/index.ts</b> 設定文件著手：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        name: "最新消息",
        path: "/news",
        component: News,
        children:[
            {
                name: "view",
                path: "newsView",
                component: NewsView
            }
        ]
    }
]</code></pre>
        </div>
        <p>把 <em>children</em> 子路由裡的路徑修改成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        name: "最新消息",
        path: "/news",
        component: News,
        children:[
            {
                name: "view",
                path: "newsView/:id/:title/:content",
                component: NewsView
            }
        ]
    }
]</code></pre>
        </div>
        <p>接著打開 <b>NewsView.vue</b>，把 <em>useRoute</em> 引用進來並調用它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { useRoute } from 'vue-router';
let route =  useRoute();</code></pre>
        </div>
        <p>一樣我們可以先用 Console 查看 <em>useRoute</em> 是什麼東西：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("useRoute", route);</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-6.jpg">
        </figure>
        <p>可以看到代理物件裡面的 <em>params</em> 已經將我們傳遞的三個屬性參數給儲存起來。</p>
        <p>然後我們就能在 <b>NewsView.vue</b> 的模板裡接收這三個參數的資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號 {{ route.params.id }}&lt;/div&gt;
    &lt;div&gt;新聞標題 {{ route.params.title }}&lt;/div&gt;
    &lt;div&gt;新聞內容 {{ route.params.content }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>也別忘記回頭調整 <b>News.vue</b> 父級路由組件的 RouterLink，寫法邏輯和 <em>query</em> 是一樣的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">
&lt;RouterLink :to="`/news/newsView/${item.id}/${item.title}/${item.content}`"&gt;{{ item.title }}&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>確認畫面結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-10-7.jpg">
        </figure>
        <p>既然前面 <em>query</em> 有用 <em>to</em> 的物件型別式寫法讓路由看起來比較易讀，那麼 <em>params</em> 自然也得不落人後，憑藉著對 <em>query</em> 寫法的直覺，我仿照刻出 <em>params</em> 的版本：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink
    :to="{
        path: '/news/newsView',
        params: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    }"
&gt;
    {{ item.title }}
&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>如果你跟我一樣這麼寫，然後興致沖沖地存檔去畫面確認，很快地會發現事與願違：RouterView 非但無法渲染出預期的內容，Console 還噴出以下警告：</p>
        <blockquote class="is-danger">
            <p>[Vue Router warn]: Path "/news/newsView" was passed with params but they will be ignored. Use a named route alongside params instead.</p>
        </blockquote>
        <blockquote class="is-danger">
            <p>[Vue Router warn]: No match found for location with path "/news/newsView"</p>
        </blockquote>
        <p>警告的大意是在說如果我們使用 <em>params</em> 傳遞參數，就不應該使用 <em>path</em> 傳遞參數，否則將會被無視，除非我們使用 <em>name</em>。</p>
        <p>於是我們把 <em>path</em> 替換成 <em>name</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;RouterLink
    :to="{
        name: 'view',
        params: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    }"
&gt;
    {{ item.title }}
&lt;/RouterLink&gt;</code></pre>
        </div>
        <p>如此，網頁應用就能正常運行了，子級路由已可接收父級路由傳遞的參數正確地渲染出對應的資料。</p>
        <p>補充一點，假如響應式資料中，部分資料物件可能沒有某些項目屬性，例如最新消息有些項目可能只有標題，沒有內容，按照目前的程式邏輯，顯示內容的那欄在切換到沒有 <em>content</em> 屬性的資料時，「新聞內容」欄位則會繼續殘留上一筆資料的內容；但如果直接把 <em>params</em> 中的 <em>content</em> 移除掉，瀏覽器又會回報錯誤：</p>
        <blockquote class="is-error">
            <p>Uncaught (in promise) Error: Missing required param "content"</p>
        </blockquote>
        <p>意思是我們遺書了必要的 <em>content</em> 參數。</p>
        <p>所以面對這種不確定該參數是否有值的情況，我們可以在路由設定文件裡，於該屬性後方加上 <em>?</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">routes: [
    {
        name: "最新消息",
        path: "/news",
        component: News,
        children:[
            {
                name: "view",
                path: "newsView/:id/:title/:content?",
                component: NewsView
            }
        ]
    }
]</code></pre>
        </div>
        <p><em>?</em> 的意思為可傳也可不傳，有了這個符號，當某筆動態資料沒有 <em>content</em> 屬性，RouterView 的「新聞內容」欄位就會是空的，而不受其他資料渲染記錄的影響。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p><br></p>
        <h4>1. 傳遞方式：</h4>
        <h5>query：</h5>
        <p>參數以 URL 的查詢字串出現，附加在 URL 的尾部，例如 /search?q=keyword，參數透過鍵值對形式傳遞，例如 { q: 'keyword' }。</p>
        <h5>params：</h5>
        <p>參數直接包含在 URL 路徑中，如/user/:userId，參數透過路由路徑的佔位符傳遞，例如 /user/123。</p>
        <p><br></p>
        <h4>2. 可選性：</h4>
        <h5>query：</h5>
        <p>可以選擇性地加入到 URL 中，不會影響路由的匹配。</p>
        <h5>params：</h5>
        <p>通常對應於路由路徑中的必選部分，即使沒有傳遞也會導致路由匹配失敗。</p>
        <p><br></p>
        <h4>3. 影響路由匹配：</h4>
        <h5>query：</h5>
        <p><em>query</em> 參數不會直接影響路由的匹配，它們通常用於表示過濾條件、搜尋關鍵字等，而不是用於識別唯一資源。</p>
        <h5>params：</h5>
        <p>因為 <em>params</em> 直接影響路由的路徑，所以它們通常用於識別資源的唯一識別碼或路徑參數，例如使用者 ID、產品 ID 等。</p>
        <p><br></p>
        <h4>4. 程式設計介面：</h4>
        <h5>query：</h5>
        <p>可以透過 <em>$route.query</em> 來存取查詢參數。</p>
        <h5>params：</h5>
        <p>可以透過 <em>$route.params</em> 來存取路由參數。</p>
        <p><br></p>
        <h4>5. 資料序列化：</h4>
        <h5>query：</h5>
        <p>參數作為 URL 的查詢字串，需要進行 URL 編碼以處理特殊字元和空格等情況。</p>
        <h5>params：</h5>
        <p>參數直接包含在 URL 路徑中，所以它們在傳遞過程中不需要額外的序列化。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=36" target="_blank">【极简Vue3】036 路由 嵌套路由</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>