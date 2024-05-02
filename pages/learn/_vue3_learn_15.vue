<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="76" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、解構賦值用 storeToRefs</a></li>
            <li><a href="#act2">二、計算屬性 getters</a></li>
            <li><a href="#act3">三、訂閱方法 $subscribe</a></li>
            <li><a href="#act4">四、重置 $reset</a></li>
            <li><a href="#act5">五、銷毀 $dispose</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>本篇是學習如何用 Pinia 實現集中式管理的下篇，將介紹及練習更多關於 Pinia 的語法功能以及一些需要注意的細節。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、解構賦值用 storeToRefs</h2>
        <p>先前我們曾學過用解構賦值來簡化模板的響應式資料引入，且如果要透過事件同步更改模板上的資料，則必須搭配使用 <em>toRefs</em> 函式 API 將解構賦值裡的變數轉換成響應式。</p>
        <p>假設現在有個組件向狀態中心 stroe 取用了大量資料，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="info"&gt;
        &lt;p&gt;名字：{{ infoStore.name }}&lt;/p&gt;
        &lt;p&gt;性別：{{ infoStore.gender }}&lt;/p&gt;
        &lt;p&gt;年齡：{{ infoStore.age }}&lt;/p&gt;
        &lt;p&gt;出生地：{{ infoStore.borned }}&lt;/p&gt;
        &lt;p&gt;電話：{{ infoStore.tel }}&lt;/p&gt;
        &lt;button @click="change()"&gt;change&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Info"&gt;
    import { useInfoStore } from "../store/info";

    const infoStore = useInfoStore();

    function change(){
        infoStore.name = "喵喵";
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>有些人可能會覺得每次在模板寫入資料都要重複添加 <em>infoStore</em> 太麻煩，程式碼結構複雜的情況下維護起來也不容易，所以會採用解構賦值的形式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="info"&gt;
        &lt;p&gt;名字：{{ name }}&lt;/p&gt;
        &lt;p&gt;性別：{{ gender }}&lt;/p&gt;
        &lt;p&gt;年齡：{{ age }}&lt;/p&gt;
        &lt;p&gt;出生地：{{ borned }}&lt;/p&gt;
        &lt;p&gt;電話：{{ tel }}&lt;/p&gt;
        &lt;button @click="change()"&gt;change&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Info"&gt;
    import { useInfoStore } from "../store/info";

    const infoStore = useInfoStore();

    // 解構賦值
    const { name, gender, age, borned, tel } = infoStore;

    function change(){
        infoStore.name = "喵喵";
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>雖然模板程式碼看起來變簡潔好讀，但我們都知道解構賦值會令 <em>ref</em> 或 <em>reactive</em> 定義的資料失去其響應式功能，例如我們在 <em>change</em> 事件中改變了 <em>name</em> 值，經過解構賦值後：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-1.jpg">
        </figure>
        <p>可以發現 <em>name</em> 值確實改變了，但是模板上的資料並沒有同步變更，這就表示解構賦值會讓原本響應式的資料失去其響應能力。所以如果要用解構賦值將響應式資料提取出來又保持其響應功能，則必須使用 <em>toRefs</em>（或 <em>toRef</em>）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const { name, gender, age, borned, tel } = toRefs(infoStore);</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-2.jpg">
        </figure>
        <p>雖然效果達到了，但是用 <em>toRefs</em> 解構賦值 Pinia 狀態資料並不是很好的做法，原因在於它會將  Pinia 不管是資料還是方法全部都變成了 Ref：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-3.jpg">
            <figcaption>console.log(toRefs(infoStore))</figcaption>
        </figure>
        <p>但實際上我們只需要針對狀態資料保持響應式而已，連同 Pinia 本身或自己定義的方法也都包裹成 Ref 實在是有些大動干戈。比起使用 <em>toRefs</em>，使用 Pinia 的 <em>storeToRefs</em> 會是更好的方法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { storeToRefs } from "pinia";
import { useInfoStore } from "../store/info";

const infoStore = useInfoStore();
const { name, gender, age, borned, tel } = storeToRefs(infoStore);</code></pre>
        </div>
        <p>Console <em>storeToRefs(infoStore)</em> 內容，可以看到它只會將 store 狀態中心裡的純資料數據轉換成 Ref 物件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log(storeToRefs(infoStore));</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-4.jpg">
        </figure>
    </div>
    <div class="text-block" id="act2">
        <h2>二、計算屬性 getters</h2>
        <p>在 Pinia 中，<em>getters</em> 的作用類似於計算屬性，用於從儲存在 store 中的狀態中派生出一些新的狀態。透過 <em>getters</em>，我們可以根據現有的狀態資料動態計算出新的資料數據，而不需要直接修改狀態。</p>
        <p>以之前練習的 <b>Count.vue</b> 為例，我們現在利用 <em>getters</em> 功能，在 store 裡面建立一個簡單的計算功能，目的是要讓 <em>sum</em> 放大十倍。</p>
        <p>原本 <b>count.ts</b> 的程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { defineStore } from "pinia";

export const useCountStore = defineStore({
    id: "count", 
    state: ()=>({
        sum: 3
    }),
    actions: {
        increment(value){
            if( this.sum &lt; 10 ){
                this.sum += value;
            }
        },
        reduce(value){
            this.sum -= value;
        }
    },
});</code></pre>
        </div>
        <p>前面提過 <em>getters</em> 就像 Vue 的 <em>computed</em> 計算屬性，所以語法邏輯也差不多，都需要利用 <em>return</em> 返回計算的結果，程式碼如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useCountStore = defineStore({
    id: "count", 
    state: ()=>({
        sum: 3
    }),
    actions: {
        increment(value){
            if( this.sum &lt; 10 ){
                this.sum += value;
            }
        },
        reduce(value){
            this.sum -= value;
        }
    },
    getters: {
        newSum(state){
            return state.sum * 10;
        }
    }
});</code></pre>
        </div>
        <p>在 Pinia 中，<em>getters</em> 是根據 store 的狀態（state）來計算並返回衍生的值。通常情況下，<em>getters</em> 的函式接收一個名為 state 的參數，這個 state 參數代表了 store 的狀態。</p>
        <p>如果要在組件顯示出 <em>newSum</em> 的結果，則直接在組件模板裡調用它即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;
        &lt;p&gt;計算後的總和：{{ countStore.newSum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';
    import { useCountStore } from '../store/count';

    const countStore = useCountStore();
    const selectVal = ref(1);

    function add(){
        countStore.increment(selectVal.value);
    }

    function minus(){
        countStore.reduce(selectVal.value);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>實際畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-5.jpg">
        </figure>
        <p>回到 <em>getters</em>，然而，即使 <em>getters</em> 函式中沒有傳進參數，它也依然可以正常進行計算，只不過 <em>sum</em> 前面要加上 <em>this</em>，表示後面銜接的資料來源是取自於這個 store：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">getters: {
    newSum(){
        return this.sum * 10;
    }
}</code></pre>
        </div>
        <p>或是可以再更簡便一點，直接用箭頭函式來定義計算邏輯：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">getters: {
    newSum: state => state.sum * 10
}</code></pre>
        </div>
        <p><br></p>
        <p>又譬如上一個章節練習的解構賦值，此時 store 定義一個 <em>getters</em> 用來將 <em>name</em> 轉換成大寫，具體定義如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">export const useInfoStore = defineStore({
    id: "info", 
    state: ()=>({
        name: "itrong",
        gender: "男",
        age: 18,
        borned: "台灣",
        tel: "012345678"
    }),
    getters: {
        upperName(state){
            return state.name.toUpperCase();
        }
    }
});</code></pre>
        </div>
        <p>組件裡的解構賦值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="info"&gt;
        &lt;p&gt;原名：{{ name }}&lt;/p&gt;
        &lt;p&gt;轉換大寫：{{ upperName }}&lt;/p&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Info">
    import { storeToRefs } from "pinia";
    import { useInfoStore } from "../store/info";
    
    const infoStore = useInfoStore();
    const { name, upperName } = storeToRefs(infoStore);
&lt;/script&gt;</code></pre>
        </div>
        <p>實際結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-6.jpg">
        </figure>
    </div>
    <div class="text-block" id="act3">
        <h2>三、訂閱方法 $subscribe</h2>
        <p>在 Pinia 中，<em>$subscribe</em> 是 store 中的一個方法，用於訂閱 store 的變化。當 store 中的狀態發生改變時，訂閱的函式將會被調用，從而執行相應的操作。</p>
        <p>如果你覺得這個介紹好像似曾相識，那肯定不是錯覺。是的，如果說 <em>getters</em> 是 Pinia 的 Computed 計算屬性，那麼 <em>$subscribe</em> 就相當於它的 Watch 監視功能。<em>$subscribe</em> 方法接收一個函式作為參數，這個函式將會在 store 的狀態發生改變時被調用。這個函式的參數包含了 store 的新狀態和舊狀態，我們可以在這個函式中進行相應的處理，例如更新界面、執行其他操作等。</p>
        <p>譬如用來監視 <b>Count.vue</b> 組件裡的狀態資料是否因為 <em>add()</em> 或 <em>minus()</em> 事件被觸發而產生改變：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';
    import { useCountStore } from '../store/count';

    const countStore = useCountStore();
    const selectVal = ref(1);

    function add(){
        countStore.increment(selectVal.value);
    }

    function minus(){
        countStore.reduce(selectVal.value);
    }

    // subscribe
    countStore.$subscribe((newState, oldState) =>{
        console.log(newState, oldState);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>觀察 Console 結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-7.jpg">
        </figure>
        <p>知道狀態資料發生變化時就會立即觸發 <em>$subscribe</em> 方法，我們就可以在該方法裡面添加自定義的操作。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、重置 $reset</h2>
        <p>Pinia 的 <em>$reset</em> 就如同它「重置」的字面意思一樣，可以將 store 狀態資料恢復成原本設定的初始值，它通常用在組件中某些操作情境下需要重置其改變的 store 狀態資料的時候，例如我們練習的 <b>Count.vue</b> 範例中，透過「加」與「減」的按鈕反覆改變了 store 中的 <em>sum</em> 值，我們可以額外新增一個「重置」的按鈕，並引入 <em>$reset</em>，這樣當使用者點擊該按鈕時，無論 <em>sum</em> 值已經增減到什麼數字，都會立刻重置回 store 設定中的初始值 3。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;section class="count"&gt;
        &lt;p&gt;當前總和：{{ countStore.sum }}&lt;/p&gt;
        &lt;select v-model.number="selectVal"&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
            &lt;option value="2"&gt;2&lt;/option&gt;
            &lt;option value="3"&gt;3&lt;/option&gt;
        &lt;/select&gt;
        &lt;button @click="add()"&gt;加&lt;/button&gt;
        &lt;button @click="minus()"&gt;減&lt;/button&gt;
        &lt;button @click="reset()"&gt;重置&lt;/button&gt;
    &lt;/section&gt;
&lt;/template&gt;

&lt;script setup lang="ts" name="Count"&gt;
    import { ref } from 'vue';
    import { useCountStore } from '../store/count';

    const countStore = useCountStore();
    const selectVal = ref(1);

    function add(){
        countStore.increment(selectVal.value);
    }

    function minus(){
        countStore.reduce(selectVal.value);
    }

    function reset(){
        countStore.$reset();
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>可以配合 Console 來確認 <em>$reset</em> 是否有作用：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-15-8.jpg">
        </figure>
    </div>
    <div class="text-block" id="act5">
        <h2>五、銷毀 $dispose</h2>
        <p>在 Pinia 中，<em>$dispose</em> 方法用於手動銷毀 store 實例。這個方法可以在 store 不再需要時手動調用，以釋放相關的資源，從而防止記憶體洩漏和性能問題。當你不再需要某個 store 實例時，可以通過調用 <em>$dispose</em> 方法來明確地銷毀它。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, onUnmounted } from 'vue';
import { useCountStore } from '../store/count';

const countStore = useCountStore();
const selectVal = ref(1);

function add(){
    countStore.increment(selectVal.value);
}

function minus(){
    countStore.reduce(selectVal.value);
}

countStore.$subscribe((newState, oldState) =>{
    console.log(newState, oldState);
});

onUnmounted(() => {
    countStore.$dispose();
});</code></pre>
        </div>
        <p>我們在 onUnmounted 生命週期鉤子中調用了 <em>countStore</em> 的 <em>$dispose</em> 銷毀函式，那麼當 <b>Count.vue</b> 組件被銷毀時，會連帶 <em>countStore</em> 相關的 store 實例也將被清理，從而釋放資源。但銷毀的僅只有實例而已，store 裡的狀態資料數據並不會因此而被銷毀，依然會保持著最後我們操作的結果。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://pinia.vuejs.org/introduction.html" target="_blank">Pinia</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=50" target="_blank">【极简Vue3】050 $subscribe的使用</a></dd>
            <dd><a href="https://zhuanlan.zhihu.com/p/439233719" target="_blank">vue3时代下的状态管理方式探索</a></dd>
            <dd><a href="https://5xcampus.com/posts/from-vuex-to-pinia" target="_blank">從 Vuex 到 Pinia：Vue 狀態管理的進化</a></dd>
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