<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="77" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、父子組件之間的通信（defineProps）</a></li>
            <li><a href="#act2">二、自定義事件傳遞資料給父組件（defineEmits）</a></li>
            <li><a href="#act3">三、任意組件之間的通信（mitt）</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>在早前〈循序漸進學 Vue3（七）：組件之間的傳遞 props〉一文中已經有稍微學習組件之間如何進行資料傳遞，我們稱之為 Props，而組件之間也不是只有常見的父子傳遞而已，有可能是父與孫、平輩與平輩等多種情境的組件狀態，不同關聯下的 Props 使用方式也有所區別，本篇文章主要便是要來學習在各種組件關係要如何正確地運用 Props 傳遞資料給對方。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、父子組件之間的通信（defineProps）</h2>
        <p>父子組件之間的通信既常見也相對單純，因為也不太需要牽涉路由或其他操作，首先我們準備妥以下要用來練習 props 功能的父子組件程式碼結構範例：</p>
        <p><b>Parents.vue</b>（父組件）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;section&gt;
            &lt;Child/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    const gift = ref("聖誕禮物");
&lt;/script&gt;</code></pre>
        </div>
        <p><b>Child.vue</b>（子組件）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;p&gt;來自父組件的 &lt;strong&gt;???&lt;/strong&gt;&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import { ref } from "vue";

    const card = ref("卡片");
&lt;/script&gt;</code></pre>
        </div>
        <p>渲染畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-1.jpg">
        </figure>
        <p>在範例中可以看到父組件模板中載入了子組件，且兩個組件都各自定義了一筆資料。現在假設我們要將父組件的資料（聖誕禮物）傳遞給子組件，最簡單快速的方式就是先在父組件引用的子組件中定義一個 v-bind 參數，然後將要傳遞的資料 <em>gift</em> 指定給它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;Child :getItem="gift"/&gt;</code></pre>
        </div>
        <p>再來是修改子組件的內容，調用 <em>defineProps</em> 方法來接收父組件定義的參數與值，最後將值取代原本模板中「???」的文字內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;p&gt;來自父組件的 &lt;strong&gt;{{ getItem }}&lt;/strong&gt;&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    // 略...

    defineProps(["getItem"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>渲染畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-2.jpg">
        </figure>
        <p>以上是父組件傳遞給子組件資料的方法，既單純又好懂，但是反過來如果要將子組件的資料傳遞給父組件，則無法直接透過上述的操作來實現。必須先由父組件傳遞一個函式給子組件，由子組件調用該函式時，再把它的資料透過函式以傳遞參數形式回給父組件。</p>
        <p>圖解：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-3.jpg">
        </figure>
        <p>洞悉原理後，我們就知道要如何進行動作了，首先在父組件準備兩樣東西，一個是空的響應式資料變數，以及一個函式方法，分別用來存放與接收子組件傳遞過來的值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;p&gt;來自子組件的 &lt;strong&gt;{{ getCard }}&lt;/strong&gt;&lt;/p&gt;
        &lt;section&gt;
            &lt;Child :sendItem="getCardFunc"/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    // 資料
    const getCard = ref('');

    // 方法
    function getCardFunc(value){
        getCard.value = value;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>然後於子組件建立一個按鈕並綁定一個事件，當使用者點擊該按鈕時，會將子組件要給父組件的資料的值傳遞過去：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;button @click="sendItem(card)"&gt;send&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import { ref } from "vue";
    
    // 資料
    const card = ref("卡片");

    // 接收父組件傳遞過來的東西（函式）
    defineProps(["sendItem"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-4.jpg">
        </figure>
    </div>
    <div class="text-block" id="act2">
        <h2>二、自定義事件傳遞資料給父組件（defineEmits）</h2>
        <p>上個章節提到如果要傳遞子組件的資料給父組件，需要透過父組件先傳遞一個函式給子組件，讓子組件透過函式把值回傳給父組件。除了這個作法，其實還有另一種比起前者或許稍微麻煩，卻也算相當常見的作法，這個作法叫做「自定義事件」。</p>
        <p>首先，我們在父組件模板載入子組件標籤的位置，加入一個自定義事件的名稱，譬如 send-item：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;section&gt;
            &lt;!-- 給子組件綁定事件 --&gt;
            &lt;Child @send-item="getCardFunc"/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>這裡不使用 <em>v-bind</em>（<em>:</em>），而是用 <em>v-on</em>（<em>@</em>）綁定事件，而這個事件的觸發由子組件那邊去調用執行，其調用的方法是 <em>defineEmits()</em>。</p>
        <p>子組件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";

// 資料
const card = ref("卡片");

// 宣告事件
const emit = defineEmits(["send-item"]);</code></pre>
        </div>
        <p>但僅僅只是宣告還不足夠周全組件之間的資料傳遞，我們還得想辦法去觸發這個事件，譬如點擊某個按鈕、或是建立一個計時器，經過設定秒數後執行特定程式。</p>
        <p>於是，我們在子組件模板添加一顆按鈕，加入 <em>@click</em> 事件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;button @click="$emit('send-item', card)"&gt;send&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import { ref, onMounted } from "vue";
    
    // 資料
    const card = ref("卡片");

    // 宣告事件
    const emit = defineEmits(["send-item"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>如此，子組件指定的資料 <em>card</em> 會透過 <em>$emit</em> 傳遞給父組件，值得注意的是，我們都知道響應式資料如果要操作它的值，通常都必須加上 <em>.value</em> 才能改變其參數值，不過如果是在模板裡調用它，則不需要加上 <em>.value</em>，算是一個小細節。</p>
        <p>但還沒完事，因為父組件那邊還沒有建立用來存放子組件資料的 Ref 變數，同時我們也得為 <em>send-item</em> 事件所執行的 <em>getCardFunc</em> 函式撰寫資料對接的程式邏輯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;p&gt;來自子組件的 &lt;strong&gt;{{ getCard }}&lt;/strong&gt;&lt;/p&gt;
        &lt;section&gt;
            &lt;Child @send-item="getCardFunc"/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    // 存放資料
    const getCard = ref();

    // 接收資料的函式
    function getCardFunc(value){
        getCard.value = value;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-5.jpg">
        </figure>
        <p><br></p>
        <p>回到另一個事件假設，不是透過使用者主動點擊按鈕觸發，而是藉由計時器之類的事件，讓子組件自己把值傳遞給父組件，我們可以添加 <em>onMounted</em> 生命鉤子，在組件加載完成時執行動作：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, onMounted } from "vue";

// 資料    
const card = ref("卡片");

// 宣告事件
const emit = defineEmits(["send-item"]);

onMounted(()=>{
    setTimeout(() => {
        emit("send-item", card.value);
    }, 3000)
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、任意組件之間的通信（mitt）</h2>
        <p>前面兩個章節都在展示父子組件之間的資料溝通，接下來這個章節則是要講述平輩組件之間如何互相傳遞資料。按照慣例要先建立基本的範例結構：準備兩個組件，其結構分別是：</p>
        <p>組件 <b>Child1.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;甲方&lt;/h1&gt;
        &lt;p&gt;狗：{{ dog }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child1"&gt;
    import { ref } from "vue";
    const dog = ref("阿比");
&lt;/script&gt;</code></pre>
        </div>
        <p>組件 <b>Child2.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;乙方&lt;/h1&gt;
    &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>於根組件 <b>App.vue</b> 載入：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;section&gt;
            &lt;Child1 /&gt;
            &lt;Child2 /&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import Child1 from "./components/Child1.vue";
    import Child2 from "./components/Child2.vue";
&lt;/script&gt;</code></pre>
        </div>
        <p>本次練習全程只會在甲方與乙方兩個組件進行操作，根組件僅用於展示，不會做任何設定或變更。</p>
        <p>初始畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-6.jpg">
        </figure>
        <p>畫面中我們可以看到甲方有一條名為「阿比」的狗（dog），現在他要把他的狗分享給乙方。像這樣任一組件平行或跨層次之間的資料傳遞，是無法直接透過 <em>defineProps</em> 和 <em>defineEmits</em> 來傳遞參數值的，我們得藉由第三方套件的幫助，令「接收資料數據方提前綁定好事件，然後提供資料數據方在適合的時機將事件觸發」。常見的第三方套件有 pubsub、$bus，以及 mitt，本章節要使用的是 <a href="https://github.com/developit/mitt" target="_blank">mitt</a>。</p>
        <p>安裝 mitt：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm i mitt</code></pre>
        </div>
        <p>於 <b>src/</b> 底下建立「utils」資料夾（常見也有人會命名為「tools」），並在該資料夾內再建立 TS 檔案，其名稱自訂，本次練習用官方文件範例所使用的「emitter」來做命名。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
└── utils
     └── emitter.ts</code></pre>
        </div>
        <p><b>emitter.ts</b> 裡面只需要做三件事：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 引入 mitt
import mitt from "mitt";

// 調用 mitt
const emitter = mitt();

// 輸出 emitter
export default emitter;</code></pre>
        </div>
        <p><em>emitter</em> 可以用來綁定與觸發事件。具體要在裡面寫什麼稍後再談，建置好基礎的 <b>emitter.ts</b> 文件內容後，我們得去 <b>main.ts</b> 引用它，否則任憑我們在這支檔案寫再多程式邏輯，它也無法參與到組件，徒寫個寂寞而已。</p>
        <p><b>main.ts</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import emitter from "./utils/emitter";
app.use(emitter);</code></pre>
        </div>
        <p>這樣 mitt 的安裝和引用就完成了，回到練習範例，首要之務是在預定接收資料的乙方組件，將 <b>emitter.ts</b> import 進來，並且定義好相關程式邏輯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;乙方&lt;/h1&gt;
        &lt;p"&gt;{{ getDog }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child2"&gt;
    import { ref } from "vue";

    // 引用 emitter.ts
    import emitter from "../utils/emitter";

    // 定義接收的資料變數
    const getDog = ref("");

    // 綁定 send-dog 事件
    emitter.on("send-dog", (value:string)=>{
        // 將 send-dog 傳遞進來的 value 值指定給 getDog
        getDog.value = value;
    })
&lt;/script&gt;</code></pre>
        </div>
        <p><em>emitter</em> 中的 <em>.on()</em> 函式用來綁定事件，除了 <em>.on</em> 之外還有另外三個函式 API，會在本章節最後進行說明。</p>
        <p>再來是甲方組件的部分，同樣也得引入 <b>emitter.ts</b>，我們可以想像是甲乙雙方交流資訊需要第三個人來做見證，所以兩邊都必須要知道第三方的相關資料。</p>
        <p>甲方組件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;甲方&lt;/h1&gt;
        &lt;p&gt;狗：{{ dog }}&lt;/p&gt;
        &lt;button @click="emitter.emit('send-dog', dog)"&gt;Send&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child1"&gt;
    import { ref } from "vue";
    
    // 引用 emitter.ts
    import emitter from "../utils/emitter";

    // 資料
    const dog = ref("阿比");
&lt;/script&gt;</code></pre>
        </div>
        <p>傳遞資料的一方比較簡單，只需要將 <b>emitter.js</b> 引入，然後定義資料傳遞的方式即可（例如使用 <em>@click</em> 觸發 <em>send-dog</em> 事件，並把值一起帶過去）。</p>
        <p>實際測試：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-7.jpg">
        </figure>
        <p>如果不要透過 <em>@click</em> 事件觸發資料傳遞，而是希望組件一載入就自動把值傳遞過去，則可以在甲方組件設定 <em>onMounted</em> 生命週期鉤子來實現理想的需求。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;甲方&lt;/h1&gt;
        &lt;p&gt;狗：{{ dog }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child1"&gt;
    import { ref, onMounted } from "vue";

    // 引用 emitter.ts
    import emitter from "../utils/emitter";

    // 資料
    const dog = ref("阿比");

    // 模板載入完就執行 emitter
    onMounted(() => {
        emitter.emit('send-dog', dog.value);
    });
&lt;/script&gt;</code></pre>
        </div>
        <p>實際測試：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-8.jpg">
        </figure>
        <p>儘管到這個階段我們已經成功實現利用 mitt 讓乙方組件接收甲方組件的資料，但嚴格來講還有值得優化的地方，那就是添加組件卸載時同時也關閉 mitt 事件綁定的動作：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import emitter from "../utils/emitter";
import { ref, onUnmounted } from "vue";

// 定義接收的資料變數
const getDog = ref("");

// 綁定 send-dog 事件
emitter.on("send-dog", (value:string)=>{
    // 將 send-dog 傳遞進來的 value 值指定給 getDog
    getDog.value = value;
});

// 卸載取消 send-dog 事件
onUnmounted(() => {
    emitter.off("send-dog");
});</code></pre>
        </div>
        <p>雖然不解除綁定可能也不怎麼直接影響網頁應用的操作，但至於為什麼要卸載的緣由，這就好比今天甲方約了乙方某一日要在某間餐廳吃飯，但甲方突然發生變卦無法赴約，假如甲方沒有通知乙方取消約定（解除綁定），那麼乙方就會一直持續惦記著這件事，導致資訊出現落差。</p>
        <p><br></p>
        <p><em>emitter</em> 除了範例練習中使用到的 <em>.on()</em> 方法之外，它一共有以下這些函式 API：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-9.jpg">
        </figure>
        <h5><em>.all</em>：</h5>
        <p>註冊一個全域的事件監聽器，用於擷取所有類型的事件。</p>
        <h5><em>.emit</em>：</h5>
        <p>觸發指定類型的事件，並將任意數量的參數傳遞給事件監聽器。</p>
        <h5><em>.on</em>：</h5>
        <p>註冊事件監聽器，當指定的事件類型被觸發時執行指定的處理函數。</p>
        <h5><em>.off</em>：</h5>
        <p>取消事件監聽器的註冊，停止指定類型的事件觸發時執行指定的處理函數。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://github.com/developit/mitt" target="_blank">Github - mitt</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=54" target="_blank">【极简Vue3】054 组件通信 方式3 mitt</a></dd>
            <dd><a href="https://juejin.cn/post/7288222919120797753" target="_blank">Mitt —— 小而美的事件总线库</a></dd>
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