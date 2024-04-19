<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="74" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、聲明式路由導航的劣勢</a></li>
            <li><a href="#act2">二、編程式路由導航</a></li>
            <li><a href="#act3">三、router.replace</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>截至目前為止，我們所有的路由範例練習，都是在組件模板裡添加 <em>&lt;RouterLink&gt;</em> 標籤來切換不同的組件，如果我們在組件模板裡使用 <em>&lt;RouterLink&gt;</em>，那麼 DOM 渲染出來的 HTML 將會是傳統常見的 <em>&lt;a&gt;</em> 標籤。這種直接在模板添加路由標籤的方式稱為「聲明式」路由導航。</p>
        <p>聲明式是 Vue.js 理想的路由導航方式，將路由導航的邏輯與視圖分離，使得模板更加清晰，使用也簡單易懂。既然如此，為什麼還會產生另一種路由導航，也就是本文要介紹的「編程式」路由導航？事情是這樣的，聲明式路由導航方便歸方便、簡單歸簡單，卻無法處理比較詳細的程式邏輯需求，比如延遲幾秒再載入指定路由組件、進入某組件前先判斷是否符合指定條件（例如會員功能需要先判斷是否已登入會員），這些程式邏輯必須在程式裡撰寫，無法直接透過 <em>&lt;RouterLink&gt;</em> 實現，這些比較複雜的操作都必須仰賴編程式路由導航的協助。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、聲明式路由導航的劣勢</h2>
        <p>聲明式路由導航是透過在模板中使用 Vue Router 提供的組件和指令來實現的，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;RouterLink to="/home"&gt;Home&lt;/RouterLink&gt;
            &lt;RouterLink to="/about"&gt;About&lt;/RouterLink&gt;
            &lt;RouterLink to="/news"&gt;News&lt;/RouterLink&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>經過 DOM 渲染，<em>&lt;RouterLink&gt;</em> 會轉化為 <em>&lt;a&gt;</em> 標籤：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;header&gt;
        &lt;nav&gt;
            &lt;a href="/home"&gt;Home&lt;/a&gt;
            &lt;a href="/about"&gt;About&lt;/a&gt;
            &lt;a href="/news"&gt;News&lt;/a&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>無論我們在哪裡、用什麼方式，反正只要切換路由標籤使用的是 <em>&lt;RouterLink&gt;</em>，它最終都會被編譯成 <em>&lt;a&gt;</em>。此時問題來了，即便在傳統 HTML 網頁開發，所有導向不同頁面的功能也並非完全通過 <em>&lt;a&gt;</em> 進行頁面跳轉，有時會使用 <em>&lt;button&gt;</em>，甚至是普通的 <em>&lt;div&gt;</em>，主要是用來搭載 JavaScript 所定義的導航事件，標籤本身是什麼元素類型並沒有那麼絕對......當然也是要看該元素本身的類型啦，但不會嚴格規定非要用 <em>&lt;a&gt;</em> 不可。</p>
        <p>舉個例子，如果我們希望使用者在點擊導航項目時，等待三秒鐘後才執行切換，程式邏輯會這樣定義：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { onMounted } from 'vue';
onMounted (()=>{
    setTimeout(()=>{
        // ...
    }, 3000)
});</code></pre>
        </div>
        <p>使用 <em>onMounted</em> 生命鉤子，表示組件渲染後執行其鉤子裡的程式邏輯。</p>
        <p>這時可能就會卡關了，<em>setTimeout</em> 函式裡面該怎麼寫？難道直接把 <em>&lt;RouterLink&gt;</em> 塞進去嗎？這顯然不是正確的方法，因為 <em>&lt;RouterLink&gt;</em> 標籤屬於HTML 結構，並不是 JavaScript 腳本。所以正確的方式是在函式裡面寫一段 JavaScript 邏輯，再讓「編程式」路由導航實現切換的功能。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、編程式路由導航</h2>
        <p>編程式路由導航是透過在 Vue 組件中透過 JavaScript 程式碼來實現路由的導航邏輯，通常是使用 Vue Router 所提供之 router 實例上的方法，所以回到前面的範例，我們要在 <em>setTimeout</em> 加入編程式路由導航的邏輯之前，要先引用這個東西：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { useRouter } from 'vue-router';</code></pre>
        </div>
        <p>注意，這裡引用的物件是 <em>useRouter</em>，指的是路由器，和過去路由練習常引用的 <em>useRoute</em> 不同，差了一個字元就差了十萬八千里。</p>
        <p>所以連帶宣告調用的變數也取名為 <em>router</em>，整段程式碼的結構如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

onMounted (()=>{
    setTimeout(()=>{
        router.push('/news');
    }, 3000)
});</code></pre>
        </div>
        <p>在組件渲染到畫面的三秒鐘後，路由器會將 <b>News.vue</b> 組件推到瀏覽器記憶體內存裡，換言之就是讓畫面顯示該組件的內容。</p>
        <p>所以雖然聲明式路由導航是 Vue.js 理想的路由導航模式，但實務應用上，編程式路由導航的運用頻率往往反而高於前者，前者通常只會用於簡單基本的路由導航，例如網頁 Header 項目的切換。而其他任何需要進行條件判斷的導航皆仰賴編程式路由導航實現。</p>
        <p><br></p>
        <p>接下來實作另一個比較複雜的目標，在之前練習 params 和 query 方法的文章中，曾建立了一個 NewsView 的最新消息內頁，原本各標題項目是藉由 <em>&lt;RouterLink&gt;</em> 進行 <em>params</em> 或 <em>query</em> 參數來傳遞動態資料，現在我們不使用 <em>&lt;RouterLink&gt;</em>，改由邊程式路由來實現動態資料的切換。</p>
        <p><b>News.vue</b> 原本的程式碼結構為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;aside&gt;
            &lt;ul&gt;
                &lt;li v-for="item in newsList" :key="item.id"&gt;
                    &lt;RouterLink :to="{
                            name: 'view',
                            params: {
                                id: item.id,
                                title: item.title,
                                content: item.content
                            }
                        }"
                    &gt;
                        {{ item.title }}
                    &lt;/RouterLink&gt;
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
        }
    ])
&lt;/script&gt;</code></pre>
        </div>
        <p>接下來兩個文件和 News 有關，但本次修改不會動到它們的內容，為了方便結構裡的程式碼和操作邏輯對照，所以一併附帶：</p>
        <p><b>NewsView</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號 {{ id }}&lt;/div&gt;
    &lt;div&gt;新聞標題 {{ title }}&lt;/div&gt;
    &lt;div&gt;新聞內容 {{ content }}&lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    defineProps(['id', 'title', 'content']);
&lt;/script&gt;</code></pre>
        </div>
        <p>路由設定文件 <b>router/index.ts</b>（只顯示與 News 有關的片段）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createRouter, createWebHistory } from "vue-router";
import News from "../pages/News.vue";
import NewsView from "../pages/NewsView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "最新消息",
            path: "/news",
            component: News,
            children:[
                {
                    name: "view",
                    path: "newsView/:id/:title/:content?",
                    component: NewsView,
                    props: true
                }
            ]
        }
    ]
});

export default router;</code></pre>
        </div>
        <p>回到 <b>News.vue</b> 路由組件，第一件事情是添加 <em>button</em> 按鈕，並且假設該事件名稱為 <em>showNewsView</em>，當使用者 click 按鈕時觸發該事件內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;li v-for="item in newsList" :key="item.id"&gt;
    &lt;RouterLink :to="{
            name: 'view',
            params: {
                id: item.id,
                title: item.title,
                content: item.content
            }
        }"
    &gt;
        {{ item.title }}
    &lt;/RouterLink&gt;
    &lt;button @click="showNewsView()"&gt;查看&lt;/button&gt;
&lt;/li&gt;</code></pre>
        </div>
        <p>於下方 <em>&lt;script&gt;</em> 標籤中引用路由器並定義它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { RouterLink, RouterView, useRouter } from 'vue-router';
let router = useRouter();</code></pre>
        </div>
        <p>然後撰寫 <em>showNewsView</em> 事件的邏輯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function showNewsView(item){
    router.push({
        name: 'view',
        params: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    })
}</code></pre>
        </div>
        <p>部分人會疑問 <em>router.push</em> 應該要寫什麼，其實這裡的 <em>router.push</em> 功能就跟模板裡 <em>&lt;RouterLink :to&gt;</em> 思維是一樣的，對 RouterLink 來說，<em>to</em> 的用途是跳轉路由，而 router 路由器的 <em>push</em> 實質功能也是跳轉路由，所以 <em>to</em> 裡面怎麼寫，<em>push</em> 就同樣怎麼寫，可以是純字串，也可以是物件寫法。</p>
        <p>但是直接搬進來是會噴錯的，因為函式不知道 <em>params</em> 中的 <em>item</em> 是從哪裡來的，所以必須要給函式添加傳入參數，同時模板的 <em>button</em> 方法也要傳入 <em>item</em> 參數，這樣 <em>v-for</em> 定義的 <em>item</em> 才能順利傳進去。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-1.jpg">
        </figure>
        <p>上圖是 <em>showNewsView</em> 沒有引入 <em>item</em> 參數導致的錯誤，表示函式內部的 <em>item</em> 並未定義，但這個 <em>item</em> 的值原本是用來接收 <em>v-for</em> newsList 的資料。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;button @click="showNewsView(item)"&gt;查看&lt;/button&gt;</code></pre>
        </div>
        <p>這樣就完成了使用編程式路由來切換動態響應式資料的效果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-2.jpg">
        </figure>
        <p><br></p>
        <p>額外補充，雖然到這裡已經達到我們預期的結果，但是部分編輯器對程式碼風格可能會有些意見，例如：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-3.jpg">
        </figure>
        <p>這個警告的大意是在說編輯器（VSCode）無法識別 <em>item</em> 是什麼東西，乍看之下這個警告存在不影響程式運行，其實它充其量也只是在提醒我們的程式存在潛在風險，比如 <em>params</em> 裡面的屬性名稱打錯，編輯器也不會做任何提醒，直到我們自己實際跑一遍才發覺程式有錯，然後回頭找錯誤的地方在哪。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-4.jpg">
        </figure>
        <p>像這樣，<em>id</em> 錯植成 <em>id222</em>，編輯器也沒有標示錯誤。</p>
        <p>所以我們可以自己定義 TS 接口和自定義類型，過濾這樣的錯誤。寫法如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">interface NewsInter {
    id: number,
    title: string,
    content: string
}</code></pre>
        </div>
        <p>然後給 <em>showNewsView</em> 函式的 <em>item</em> 參數套上接口就行：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function showNewsView(item:NewsInter){
    // 略
}</code></pre>
        </div>
        <p>如果 <em>item</em> 引用的屬性有錯，編輯器會立即警示：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-5.jpg">
        </figure>
        <p>雖然有點麻煩，但只要花些時間心力定義好接口的格式限制住引用的屬性類型，就可以大幅減少我們一時的疏忽而發生程式錯誤的機會，為程式多設下一道屏障。</p>
        <p>但如果對自己細心程度十分有信心，懶得花時間多定義或維護接口，可是看到編輯器針對函式參數 <em>item</em> 掛著紅色波浪線很不順眼，也可以直接在 <em>item</em> 後方加上 <em>:any</em>，那麼警告紅線就會消失：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function showNewsView(item:any){
    // 略
}</code></pre>
        </div>
        <p>只是如果引用屬性 key 錯的話，編輯器也不會檢查：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-13-6.jpg">
        </figure>
    </div>
    <div class="text-block" id="act3">
        <h2>三、router.replace</h2>
        <p>上一個章節練習編程式路由導航，路由器使用的是 <em>push</em> 方法來導航不同的動態資料內容，我們都知道路由導航有 <em>push</em> 和 <em>replace</em> 兩種，是否表示這裡也能使用 <em>replace</em>？答案是肯定的，原本 <em>showNewsView</em> 函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function showNewsView(item){
    router.push({
        name: 'view',
        params: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    })
}</code></pre>
        </div>
        <p>我們也可以改用 <em>replace</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function showNewsView(item){
    router.replace({
        name: 'view',
        params: {
            id: item.id,
            title: item.title,
            content: item.content
        }
    })
}</code></pre>
        </div>
        <p>兩者差別就和上一篇文章說明一樣，<em>push</em> 每一次資料都會產生歷史記錄，使用者可以透過上、下一頁往返這些歷史記錄的內容；但 <em>replace</em> 不會有歷史記錄，所有的參數傳遞資料都會覆蓋當前的組件畫面，使用者無法藉由按鈕快速閱讀之前的點擊記錄。</p>
        <p><br></p>
        <p>最後列舉一些需要使用編程式路由的場合：</p>
        <ol>
            <li>時間到自動跳轉頁面</li>
            <li>符合條件跳轉到指定頁面</li>
            <li>滑鼠移過指定區域便跳轉頁面</li>
        </ol>
        <p>這些跳轉功能都需要藉由 JavaScript 輔助判斷，所以只能在 JavaScript 裡面同時編寫路由導航來實現。對比單純只能用於簡單路由切換的 RouterLink 來說更加靈活、可控，但也因為要撰寫程式邏輯所以相對繁瑣，維護起來也會比 RouterLink 來得費心費力。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=41" target="_blank">【极简Vue3】041 路由 编程式路由导航</a></dd>
            <dd><a href="https://juejin.cn/post/6844903971186802696" target="_blank">Vue-Router——编程式导航 && 声明式导航</a></dd>
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