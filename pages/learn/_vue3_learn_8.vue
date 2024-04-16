<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="69" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、什麼是 hooks？</a></li>
            <li><a href="#act2">二、如何自定義 hooks？</a></li>
            <li><a href="#act3">三、hooks 進階應用</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>首先，我們回顧一張圖片：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-1-2.jpg">
        </figure>
        <p>這張圖是在描繪 Vue 3 Composition API 是如何管理組件裡使用到的所有函式，和過去 Vue 2 Options API 要將一個功能的函式拆分到各個選項配置不同，前者更傾向於不把函式裡的程式碼分離，如此一來無論是閱讀還是維護都會比後者來得直覺、易懂。但如果一個函式功能會運用於很多組件上呢？是否能像傳統 JavaScript 那樣，把共用或會重複使用的函式拉出來獨立成一支檔案進行使用或管理，這樣當函式功能需要調整時，只需要針對那支檔案進行修改即可？答案是肯定的，這種作法在 Vue 3 裡稱為 hooks，本篇文章內容便是要來講述如何建立自定義的 hooks。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、什麼是 hooks？</h2>
        <p>在 Vue 3 中，hooks 通常指的是 Composition API 中的一組函式，用於在函式元件中組織和重複使用程式碼。Composition API 是 Vue 3 中新增的特性，它提供了一種更靈活、更可組合的方式來編寫建邏輯，相較於 Vue 2 的選項式 API，它更強調邏輯的組織和重用。</p>
        <p>所以，我們前面學的 <em>setup</em>、<em>ref</em>、<em>reactive</em>、<em>computed</em>、<em>watch</em>......等等，其實也都是 hooks 的一種，因為它們都是 Composition API 函式。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、如何自定義 hooks？</h2>
        <p>假設目前有個組件，其功能如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;{{ sum }}&lt;/p&gt;
    &lt;button @click="changeSum"&gt;Count&lt;/button&gt;
    &lt;hr&gt;
    &lt;p&gt;{{ user.name }} -- {{ user.age }}&lt;/p&gt;
    &lt;button @click="changeUser"&gt;Edit&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, reactive } from "vue";

    // 加總
    let sum = ref(0);
    function changeSum (){
        sum.value += 1;
    }

    // 更改資料
    let user = reactive({
        name: "阿比",
        age: 18
    })
    function changeUser (){
        user.name = "喵喵"
        user.age = 32
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>我們希望把「加總」及「更改資料」都拉出來獨立一個 hooks，方便其它組件引用。</p>
        <h6>1. 建立 hooks 資料夾</h6>
        <p>於 <b>src/</b> 資料夾底下新增一個資料夾，命名為「hooks」。</p>
        <p><br></p>
        <h6>2. 建立 .ts 文件</h6>
        <p>在 <b>hooks/</b> 資料夾裡建立一個附檔名為 <b>.ts</b> 的文件，我們先處理 <em>sum</em> 的函式功能，所以將該文件命名為「useSum」。當然也可以把 <em>user</em> 一定進行處理，為避免直接命名 userUser 產生混淆，這裡改命名為「useChangeUser」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
    └── hooks
        ├── useSum.ts
        └── useChangeUser.ts</code></pre>
        </div>
        <p><br></p>
        <h6>3. 把組件中的函式轉移到 .ts 文件裡</h6>
        <p><b>useSum.ts</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";
                
let sum = ref(0);
function changeSum (){
    sum.value += 1;
}</code></pre>
        </div>
        <p>但不是單純把函式剪下貼進來就完事了，因為我們現在要做的事將功能封裝起來成為一個方法，所以我們要讓該功能封裝成一個函式，然後導出（export）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";

export default function (){
    let sum = ref(0);
    function changeSum (){
        sum.value += 1;
    }

    return { sum, changeSum }
}</code></pre>
        </div>
        <p>把程式碼封裝到導出用的函式裡面，最後必須記得要加上 <em>return</em>，這樣其它組件調用這個函式時才能接收到內容。在這個範例裡我們回傳了 <em>sum</em> 與 <em>changeSum</em>，表示當其它組件調用這個函式會得到 <em>sum</em> 的響應式資料，以及 <em>changeSum</em> 這個方法。</p>
        <p>同理，<b>useChangeUser.ts</b> 也是相同寫法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { reactive } from "vue";

export default function (){
    let user = reactive({
        name: "阿比",
        age: 18
    })
    function changeUser (){
        user.name = "喵喵"
        user.age = 32
    }

    return { user, changeUser }
}</code></pre>
        </div>
        <p><br></p>
        <h6>4. 於組件中引用自定義的 hooks</h6>
        <p>回到組件，第一件要做的事情自然是 <em>import</em> 建立好的 hooks 文件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import useSum from "../hooks/useSum";</code></pre>
        </div>
        <p>接著調用函式，這裡我們採用解構賦值的方式去解構 <em>useSum</em> 回傳的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const { sum, changeSum } = useSum();</code></pre>
        </div>
        <p>如此，便完成了。</p>
        <p>組件程式碼全貌：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;{{ sum }}&lt;/p&gt;
    &lt;button @click="changeSum"&gt;Count&lt;/button&gt;
    &lt;hr&gt;
    &lt;p&gt;{{ user.name }} -- {{ user.age }}&lt;/p&gt;
    &lt;button @click="changeUser"&gt;Edit&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import useSum from "../hooks/useSum";
    import useChangeUser from "../hooks/useChangeUser";

    const { sum, changeSum } = useSum();
    const { user, changeUser } = useChangeUser();
&lt;/script&gt;</code></pre>
        </div>
        <p>可以看見組件的程式碼不僅變清爽了，若有其它組件也重複使用到相同功能的函式，未來該功能需要修改時，只需要找出 hooks 引用來源的文件進行維護就好，不需要每個組件一一去調整。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、hooks 進階應用</h2>
        <p>hooks 的功能不單只是用來封裝函式裡的功能，它也可以為功能添加生命鉤子，比如前面範例的加總功能，我們可以加入 <em>onMounted</em> 生命鉤子，讓組件掛載完成後立即執行鉤子裡面的內容：</p>
        <p><b>useSum.ts</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, onMounted } from "vue";

export default function (){
    let sum = ref(0);
    function changeSum (){
        sum.value += 1;
    }
    onMounted(()=>{
        sum.value = 10;
    })

    return { sum, changeSum }
}</code></pre>
        </div>
        <p>如此當組件載入完成，<em>sum</em> 就會從 10 開始計算。</p>
        <p>除了可以添加生命鉤子，hooks 裡面當然也可以再使用其它 hooks，舉例來說，我們新增一個變數並調用一個計算屬性，計算 <em>sum</em> 的值乘以 10 倍：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, computed } from "vue";

export default function (){
    let sum = ref(0);
    let newSum = computed(()=>{
        return sum.value * 10;
    })
    function changeSum (){
        sum.value += 1;
    }

    return { sum, newSum, changeSum }
}</code></pre>
        </div>
        <p>然後別忘記組件那邊也要同步調用新增的 <em>newSum</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;{{ sum }} -- {{ newSum }}&lt;/p&gt;
    &lt;button @click="changeSum"&gt;Count&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import useSum from "../hooks/useSum";

    const { sum, newSum, changeSum } = useSum();
&lt;/script&gt;</code></pre>
        </div>
        <p>每點擊一次按鈕，輸出的值就會以 1 -- 10、2 -- 20、3 -- 30 ...依此類推累計。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=29" target="_blank">【极简Vue3】029 自定义hooks</a></dd>
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