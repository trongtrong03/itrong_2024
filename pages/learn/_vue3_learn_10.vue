<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="71" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、建立嵌套路由</a></li>
            <li><a href="#act2">二、路由之間的參數傳遞（query）</a></li>
            <li><a href="#act3">三、XXX</a></li>
            <li><a href="#act4">四、XXX</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>前一篇文章大概講述了關於 Vue 路由的基本使用方法，如同最後章節進一步說明 <em>to</em> 屬性時說的，網站規劃假如只有單一路由階級，那麼路由設定不需要這麼麻煩，直接用字串導向各個路由組件即可。但實際上開發專案應該頗有感，很多網站基本都有好幾層路由導航，比如最新消息底下點擊標題會連結到內文頁面，又好比會員系統裡有會員資料、訂單查詢、支付綁定......等功能，像這樣至少有二至三層或更多層的網頁架構，用物件來撰寫路由可能會比單純用字串表示來得更加推薦。</p>
        <p>本篇文章除了探究箇中緣由外，同時也會學著如何一步步建立多個路由層級的嵌套路由架構。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、建立嵌套路由</h2>
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
    <div class="text-block" id="act2">
        <h2>二、路由之間的參數傳遞（query）</h2>
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


        
    </div>

    
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=36" target="_blank">【极简Vue3】036 路由 嵌套路由</a></dd>
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