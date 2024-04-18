<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="72" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、將接收到的 params 作為 props 傳遞給路由</a></li>
            <li><a href="#act2">二、用函式決定哪種參數作為 props 傳遞給路由</a></li>
            <li><a href="#act3">三、用物件決定哪種參數作為 props 傳遞給路由</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>上一篇文章分別練習了路由之間傳遞參數的兩種屬性：<em>query</em> 與 <em>params</em>，無論用的是哪一種屬性，要在接收參數的組件裡的模板調用參數對應的資料，格式都不外乎長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號 {{ route.query.id }}&lt;/div&gt;
    &lt;div&gt;新聞標題 {{ route.query.title }}&lt;/div&gt;
    &lt;div&gt;新聞內容 {{ route.query.content }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p><em>params</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;新聞編號 {{ route.params.id }}&lt;/div&gt;
    &lt;div&gt;新聞標題 {{ route.params.title }}&lt;/div&gt;
    &lt;div&gt;新聞內容 {{ route.params.content }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>很多人程式寫久了就會有一種職業病，看到太多相似的語法，就會想要盡可能將其簡化。就拿 Params 的模板程式碼片段來說，每個渲染的資料屬性都要加上 <em>route.params</em>，如果整個模板接收的資料很多，儘管實質上不會影響程式的運作，但閱讀起來可能多少還是會覺得有些刺眼，總覺得應該有更好的寫法能讓整體結構更簡潔一些。</p>
        <p>本篇文章要聊的 <em>props</em> 便是可用來解決這方面需求的手段之一，這裡的 <em>props</em> 指的是路由的 <em>props</em>，與組件的 <em>props</em> 是不一樣的功能。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、將接收到的 params 作為 props 傳遞給路由</h2>
        <p>首要之事是打開專案裡的 <b>router/index.js</b> 設定文件，於 NewsView 設定的地方，加入 <em>props</em> 屬性，並賦予其布林值為 <em>true</em>：</p>
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
                component: NewsView,
                props: true
            }
        ]
    }
]</code></pre>
        </div>
        <p>如果說 <em>component: NewsView</em> 相當於模板裡的 <em>&lt;NewsView /&gt;</em>，那麼加上這個 <em>props</em>，就等同把 <em>path</em> 路徑中的參數全部轉化成一個個的 props 傳給了組件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;NewsView id="value" title="value" content="value" /&gt;</code></pre>
        </div>
        <p>既然變成了我們熟知的父子組件傳遞 props 的格式，那麼接收資料的路由組件（<b>NewsView.vue</b>），理所當然地就比照 props 的寫法辦理：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineProps(['id', 'title', 'content']);</code></pre>
        </div>
        <p>同時，原本模板中的 <em>route.params.</em> 就不需要了，可以直接移除，綜合上面的定義，此時組件完整的程式碼將會是：</p>
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
        <p>如此模板裡的程式碼看起來就十分簡潔好讀許多。</p>
        <p>然而，誠如章節標題所述，上面的作法只限於路由使用 <em>params</em> 參數進行傳遞時才有效用，若路由傳遞參數是透過 <em>query</em> 參數去實作的，套用上述方法雖然 URL 能正常接收到參數，但卻無法同步響應在模板相應的顯示位置。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>用函式決定哪種參數作為 props 傳遞給路由</h2>
        <p>相比第一種方法，這種方法彈性更大些，這個方法不僅可以接收 <em>params</em> 轉換為 props，<em>query</em> 同樣也可以。在路由設定文件 NewsView 組件所在位置，加入以下 props 語法：</p>
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
                component: NewsView,
                props(route){
                    return route.query;
                }
            }
        ]
    }
]</code></pre>
        </div>
        <p>可以看到這種方式的 <em>props</em> 將 <em>route</em> 直接作為參數接收進來設定裡，我們可以先透過 Console 來查看它回傳的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">props(route){
    console.log(route);
    return route.query;
}</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-11-1.jpg">
        </figure>
        <p>從 Console 回傳的資訊中可以看到這個 <em>route</em> 回傳的路由包含許多資料，包括我們點擊項目時 <em>query</em> 回傳的參數資料；此外也可以從列表中看到 <em>params</em>，表示這個方法同樣也適用於使用 <em>params</em>（只不過如果是用 params 傳遞參數的話，直接用第一種方法就好）。總之就看我們使用哪種傳遞參數的方式，就 <em>return</em> 路由的哪一個參數。</p>
        <p>至於負責接收 props 的 <b>NewsView.vue</b> 也是和第一種方式相同的做法，透過 <em>defineProps</em> 取得 <em>routes</em> 中 <em>query</em> 所傳遞的參數：</p>
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
    </div>
    <div class="text-block" id="act3">
        <h2>三、用物件決定哪種參數作為 props 傳遞給路由</h2>
        <p>和第二種方法類似，只不過函式的寫法改成用物件形式來表示，但由於它無法接收動態參數，只能在文件中引用固定的屬性值。例如：</p>
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
                component: NewsView,
                props:{
                    id: 1,
                    title: "新聞標題",
                    content: "新聞內容"
                }
            }
        ]
    }
]</code></pre>
        </div>
        <p><b>NewsView.vue</b>：</p>
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
        <p>因為 props 進來的值是固定的，所以不管我們點擊哪一筆動態資料，DOM 裡面對應的欄位資料都不會發生任何變化，所以這種方式使用到的機率很低。</p>
        <p>既然如此，為什麼又會需要這種 props 固定數值的寫法呢？這就回到先前提到如何辨別我們寫的組件是一般組件還是路由組件的議題上，一般組件會在模板裡透過標籤來引用，所以 props 傳遞接收其他組件的資料可以直接在標籤裡面寫接收屬性，但路由組件沒辦法這麼做，因為路由組件是直接寫在設定文件裡的，所以如果要讓路由組件接收 props，就只能在路由設定文件裡費工。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=39" target="_blank">【极简Vue3】039 路由 props配置</a></dd>
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