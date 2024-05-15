<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="78" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、任意組件之間的通信（mitt）</a></li>
            <li><a href="#act2">二、祖孫組件之間的通信（$attrs）</a></li>
            <li><a href="#act3">三、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>本篇文章承襲上一篇文章的主題「組件之間的 props 通信」，此為下篇，上一篇文章主要在記述父子組件之間的資料數據交換的各種方式，而這篇則要探討其他關係的通信方式，根據不同的組件關係，所使用的操作方法也有所不同。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、任意組件之間的通信（mitt）</h2>
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
            <img src="/images/learn/js/vue3-learn-17-1.jpg">
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
            <img src="/images/learn/js/vue3-learn-17-2.jpg">
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
            <img src="/images/learn/js/vue3-learn-17-3.jpg">
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
            <img src="/images/learn/js/vue3-learn-17-4.jpg">
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
    <div class="text-block" id="act2">
        <h2>二、祖孫組件之間的通信（$attrs）</h2>
        <p>首先我們觀賞以下父子組件的程式碼結構範例：</p>
        <p><b>Parents.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;section&gt;
            &lt;Child :dog="dog" :cat="cat" :bear="bear" /&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    const dog = ref("阿比");
    const cat = ref("喵喵");
    const bear = ref("歐罵罵");
&lt;/script&gt;</code></pre>
        </div>
        <p>父組件結構中定義了三筆 Ref 資料，並且將它們全部傳遞給子組件。</p>
        <p><b>Child.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;p&gt;狗：{{ dog }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    defineProps(["dog"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>雖然父組件將三隻動物的資料通通過給了子組件，但目前的子組件卻只接收「dog」一筆資料，即便不全盤接收父組件所有傳遞的資料，也不會影響子組件的運作。</p>
        <p>實際畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-5.jpg">
        </figure>
        <p>所以從中我們可以知道一件事，那就是無論父組件餵了多少資料給子組件，子組件也未必要照單全收，他可以選擇只需要使用的特定資料。既然如此，那麼你是否曾想過其他傳遞過來卻沒有被引用的資料都去哪了？</p>
        <p>其實，像範例中父組件除了傳遞「dog」之外，還傳遞了「cat」和「bear」給子組件，雖然子組件僅 <em>defineProps</em> 了「dog」，但不代表其餘資料就直接被消失了，如何證明呢？我們可以使用 <em>$attrs</em> 這個實例屬性。假如學過 Vue 2，對這個屬性應該不陌生，在 2.4.0 版本新增的 API 介紹是這樣描述 <em>$attrs</em> 的：</p>
        <blockquote>
            <p>包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (<em>class</em> 和 <em>style</em> 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (<em>class</em> 和 <em>style</em> 除外)，并且可以通过 <em>v-bind="$attrs"</em> 传入内部组件——在创建高级别的组件时非常有用。</p>
        </blockquote>
        <p>由於 <em>$attrs</em> 是實例屬性，我們無法直接在 JavaScript Console 它，但要呼叫它也很容易，直接在模板裡置入即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;p&gt;狗：{{ dog }}&lt;/p&gt;
        &lt;p&gt;{{ $attrs }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    defineProps(["dog"]);
&lt;/script&gt;</code></pre>
        </div>
        <p>透過瀏覽器畫面檢視結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-6.jpg">
        </figure>
        <p>透過 <em>$attrs</em> 可以找到那些沒有被子組件接收的資料。</p>
        <p>現在我們改寫一下子組件的內容，將原本使用的 props 移除，只單純載入另一個組件，<b>Child.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;GrandChild /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import GrandChild from './GrandChild.vue';
&lt;/script&gt;</code></pre>
        </div>
        <p>我們直覺可能會拿前面子組件模板直接載入實例屬性 <em>$attrs</em> 的方式依樣畫葫蘆給孫組件 <b>GrandChild.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;孫組件&lt;/h1&gt;
        &lt;p&gt;{{ $attrs }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>但很快就會發現這麼做並無法成功顯示「祖」組件傳遞的資料：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-7.jpg">
        </figure>
        <p>原因倒也不難猜想，因為子組件並沒有接收父組件的資料，所以那些資料就留在了父子組件之間的 <em>$attrs</em>，假如這些資料子組件用不到，而是要留給它的子組件使用的，那麼只要透過 <em>v-bind</em> 將 <em>$attrs</em> 向下傳遞就好：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;GrandChild v-bind="$attrs" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import GrandChild from './GrandChild.vue';
&lt;/script&gt;</code></pre>
        </div>
        <p>題外話，雖然之前都沒有提及，但一直以來我們利用 <em>:</em> 加上指定名稱將資料 props 給子組件的方式，例如 <em>:dog="dog"</em>，這個 <em>:</em> 其實就是 v-bind 的簡寫方式。</p>
        <p>添加 <em>v-bind="$attrs"</em> 後再次確認畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-8.jpg">
        </figure>
        <p>可以看到孫組件模板裡的 <em v-pre>{{ $attrs }}</em> 已經可以拿到其祖組件的資料了。至於後續將資料取出來使用的方式就和父子組件的方式相同，用 <em>defineProps</em> 即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;孫組件&lt;/h1&gt;
        &lt;p&gt;狗： {{ dog }}&lt;/p&gt;
        &lt;p&gt;貓： {{ cat }}&lt;/p&gt;
        &lt;p&gt;熊： {{ bear }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="GrandChild"&gt;
    defineProps(["dog", "cat", "bear"])
&lt;/script&gt;</code></pre>
        </div>
        <p>實際結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-9.jpg">
        </figure>
        <p>成功實現了祖孫組件的資料傳遞通信。</p>
        <p>可能會有人好奇，如果反過來將孫組件的資料向上傳遞給祖組件是否可行？目前我們已知在子組件有添加 <em>v-bind="$attrs"</em> 的情況下，祖孫組件之間的操作其實就父子組件無異，所以先前我們在父子組件裡學習如何將子組件資料傳給父組件的方法，套用到這裡同樣可行──也就是由祖組件建立一個函式 props 給孫組件，孫組件利用該函式將值傳遞給祖組件即可。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;p&gt;目前數字：{{ num }}&lt;/p&gt;
        &lt;section&gt;
            &lt;Child :num="num" :number="updated" /&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    const num = ref(3);
    
    function updated(n){
        num.value += n;
    }
&lt;/script&gt;</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;GrandChild v-bind="$attrs" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import GrandChild from './GrandChild.vue';
&lt;/script&gt;</code></pre>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;孫組件&lt;/h1&gt;
        &lt;p&gt;目前數字：{{ num }}&lt;/p&gt;
        &lt;button @click="number(10)"&gt;更新數字&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="GrandChild"&gt;
    defineProps(["num", "number"])
&lt;/script&gt;</code></pre>
        </div>
        <p>實際結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-17-10.jpg">
        </figure>
    </div>
    <div class="text-block" id="act3">
        <h2>三、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://github.com/developit/mitt" target="_blank">Github - mitt</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=54" target="_blank">【极简Vue3】054 组件通信 方式3 mitt</a></dd>
            <dd><a href="https://juejin.cn/post/7288222919120797753" target="_blank">Mitt —— 小而美的事件总线库</a></dd>
            <dd><a href="https://juejin.cn/post/6844903784989081607" target="_blank">vue中$attrs你会用吗？</a></dd>
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