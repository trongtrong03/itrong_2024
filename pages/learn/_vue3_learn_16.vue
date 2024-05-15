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
            <li><a href="#act3">三、父組件修改子組件的資料（$refs）</a></li>
            <li><a href="#act4">四、子組件修改父組件的資料（$parent）</a></li>
            <li><a href="#act5">五、參考資料</a></li>
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
        <h2>三、父組件修改子組件的資料（$refs）</h2>
        <p>前面都在說如何傳遞與接收資料，這一章節要談的是父組件如何對子組件的資料進行修改......或者說「更新」子組件的資料也許更適當。首先規劃的基本父子組件的結構如下：</p>
        <p>父組件 <b>Parents.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;button&gt;改變稱呼&lt;/button&gt;
        &lt;section&gt;
            &lt;Child/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
&lt;/script&gt;</code></pre>
        </div>
        <p>子組件 <b>Child.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;h1&gt;子組件&lt;/h1&gt;
        &lt;p&gt;{{ dog }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Child"&gt;
    import { ref } from "vue";

    const dog = ref("阿比");
&lt;/script&gt;</code></pre>
        </div>
        <p>子組件有一筆 Ref 資料，為 <em>dog</em> 且值為「阿比」，我們在這個範例要做的是透過父組件「改變稱呼」的 <em>button</em> 按鈕，變更 <em>dog</em> 的值。我們直覺很快就會想到透過 <em>@click</em> 事件去改變 <em>dog</em> 的值，然而事件該如何去取得子組件的資料呢？</p>
        <p>所以在定義事件函式之前，我們需要先給子組件添加一個唯一識別符：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;Child ref="c1"/&gt;</code></pre>
        </div>
        <p>與此同時，我們也要在父組件新增一個空的 <em>c1</em> Ref，用以接收對應識別符子組件的資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";

const c1 = ref();</code></pre>
        </div>
        <p>當然取得資料這件事不是父組件單方面說了算，必須得到子組件的同意才可以，因此在子組件 <b>Child.vue</b> 那裡要引用一個名叫 <em>defineExpose()</em> 的函式 API：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 把資料數據提交給外部
defineExpose({ dog });</code></pre>
        </div>
        <p>然後就可以回到父組件新增函式方法，經由唯一識別符操作 <b>Child.vue</b> 的資料：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;button @click="changeDogName()"&gt;改變稱呼&lt;/button&gt;
        &lt;section&gt;
            &lt;Child ref="c1"/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child from "./Child.vue";
    import { ref } from "vue";

    const c1 = ref();

    function changeDogName(){
        console.log(c1.value); 
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>姑且先用 Console 來查看一下 <em>c1</em> 回傳的內容有什麼：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-6.jpg">
        </figure>
        <p>可以看到在父組件觸發 <em>changeDogName()</em> 事件後所得到打印輸出的 <em>c1.value</em> 中，已夾帶了識別符為 <em>c1</em> 的子組件 <b>Child.vue</b> 所允許提供給外部操作的資料 <em>dog</em> 了。</p>
        <p>既然如此，要修改資料就很簡單了：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeDogName(){
    c1.value.dog = "歐告";
}</code></pre>
        </div>
        <p>實際操作結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-7.jpg">
        </figure>
        <p><br></p>
        <h3>如何一次獲取所有子組件提供給外部的資料？</h3>
        <p>如果父組件裡面涵蓋許多子組件，而父組件又需要針對各個子組件進行資料操作，要像前面的步驟一個個去取其實有點麻煩，而 Vue 3 有一個名叫 <em>$refs</em> 的特殊屬性，能讓父組件一口氣取得所有子組件釋出的資料。</p>
        <p>程式範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;article&gt;
        &lt;h1&gt;父組件&lt;/h1&gt;
        &lt;button @click="getAllRefs($refs)"&gt;Get&lt;/button&gt;
        &lt;section&gt;
            &lt;Child1 ref="c1"/&gt;
            &lt;Child2 ref="c2"/&gt;
        &lt;/section&gt;
    &lt;/article&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Parents"&gt;
    import Child1 from "./Child1.vue";
    import Child2 from "./Child2.vue";
    import { ref } from "vue";

    const c1 = ref();
    const c2 = ref();

    function getAllRefs(refs){
        console.log(refs);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>查看事件觸發後的 Console 打印結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-16-8.jpg">
        </figure>


        
    </div>
    <div class="text-block" id="act4">
        <h2>四、子組件修改父組件的資料（$parent）</h2>
        
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=52" target="_blank">【极简Vue3】052 组件通信 方式1 props</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=58" target="_blank">【极简Vue3】058 组件通信 方式6 $refs与$parent</a></dd>
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