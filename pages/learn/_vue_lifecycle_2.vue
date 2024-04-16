<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="44" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Vue3.0 的生命週期</a></li>
            <li><a href="#act2">二、setup 入口函式</a></li>
            <li><a href="#act3">三、生命週期鉤子</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>承襲上一篇 <a href="_vue_lifecycle_1">〈循序漸進學 Vue3：認識 Vue1.0 到 Vue3.0 的生命週期（Lifecycle Diagram）-上〉</a> 文章，本篇要接著認識 Vue 3.0 的生命週期，並觀察及整理其與 Vue 2.0 有什麼不同。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Vue3.0 的生命週期</h2>
        <p>在 Vue3.0 版本中，官方提供的生命週期流程圖是這個樣子的：</p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-10.jpg">
        </figure>
        <p>乍看與 2.0 生命週期頗為相似，但仔細比對會發現還是有許多不同之處，最顯著的差別，在於 Vue3.0 導入了全新的 Composition API，使得組件的代碼結構更加組織化和可重用。相對於 Vue 2的 Option API，Composition API 讓開發者可以更自由地編寫組件邏輯，這對於生命週期方法的使用有一定影響，至於 Composition API 與 Option API 具體的差異留到後面的章節再來說明，此刻先聚焦生命週期的部份。</p>
        <p>表示生命週期鉤子的藍色與紅色框線項目一共有九項，不過濃縮一下其實也就四個動作，分別是 <em>create</em>、<em>mount</em>、<em>update</em>、<em>unmount</em>，再加上它們被觸發前的幾個動作。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、setup 入口函式</h2>
        <p>嚴格來說，<em>setup</em> 並不是生命週期鉤子，而是一個函式，它會在 Vue 實例尚未被建立之前執行，是組件中使用 Composition API 的入口，所以我們也可以稱之為「入口函式」，或者也可以說 Vue3 Composition API 附帶了一個 <em>setup</em> 這樣的方法，用於設置組件的初始狀態、數據、方法以及其他配置，取代了 Vue2.0 原先 <em>data</em>、<em>mehtods</em>、<em>computed</em> 等 Option API，使組件的結構更方便重複利用與更好的組織、模組化，而非根據屬性的類型（<em>data</em>、<em>mehtods</em>、<em>computed</em>...）進行分離管理。</p>
        <p>因為 <em>setup</em> 函式會在 <em>beforeCreate</em> 之前調用，此時 Vue 實例的數據和方法還沒有被初始化，若在這個生命週期鉤子使用 <em>this</em>，它無法指向實例裡的內容。此外，一方面也與 Vue3.0 版本鼓勵開發者不要使用 <em>this</em> 的方式有關，Vue3.0 傾向將所有相關的狀態和方法都明確地公開在 <em>setup</em> 函式的返回對象中，既可以簡化程式碼，減少程式碼中的誤用和混淆，也能增加可讀與一致性。</p>
        <p>舉例來說，這是 Vue2.0 使用 <em>this</em> 來訪問組件的數據與方法的範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;p&gt;{{ message }}&lt;/p&gt;
        &lt;button @click="increaseCount"&gt;增加計數&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref } from 'vue';

export default {
    data() {
        return {
            message: 'Hello, Vue 3!',
            count: 0,
        };
    },
    methods: {
        increaseCount() {
            this.count++;
        },
    },
};
&lt;/script&gt;</code></pre>
        </div>
        <p>如果用 Vue3.0 推廣的方式，則會變成這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;p&gt;{{ message }}&lt;/p&gt;
        &lt;button @click="increaseCount"&gt;增加計數&lt;/button&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref } from 'vue';

export default {
    setup() {
        // 使用 ref 創建可響應的數據
        const message = ref('Hello, Vue 3!');
        const count = ref(0);

        // 定義一個方法
        function increaseCount() {
            // 這裡不能使用 this.count，因為 this 不指向組件實例
            count.value++;
        }

        // 返回要在模板中使用的數據和方法
        return {
            message,
            count,
            increaseCount,
        };
    },
};
&lt;/script&gt;</code></pre>
        </div>
        <p>簡單來說，<em>setup</em> 有以下這些要點：</p>
        <ol>
            <li>是 Vue3.0 實例中使用 Composition API 的入口</li>
            <li>沒有 <em>this</em></li>
            <li>只會在實例初始化的時候執行一次</li>
            <li>在 <em>beforeCreate</em> 生命週期鉤子執行之前執行</li>
        </ol>
        <p>雖然在生命週期圖表中，<em>setup</em> 與其他生命週期鉤子是平行獨立的存在，但實際上某種程度來說它包含了 Vue2.0 之前 Option API 中的生命週期鉤子，例如 <em>mounted</em>、<em>updated</em> ...等，Vue3.0 的 Composition API 旨在更靈活地組織代碼並提供更多控制選項，因此它將這些生命週期鉤子轉移到了 <em>setup</em> 函式中。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, onMounted, onUpdated } from 'vue';

export default {
    setup() {
        // 創建一個可響應的數據
        const count = ref(0);

        // 在組件被安裝後（相當於 Vue 2 中的 mounted 鉤子）
        onMounted(() => {
            console.log('組件被安裝');
        });

        // 在組件被更新後（相當於 Vue 2 中的 updated 鉤子）
        onUpdated(() => {
            console.log('組件被更新');
        });

        // 返回要在模板中使用的數據
        return {
            count,
        };
    },
};</code></pre>
        </div>
        <p>在這個範例中，我們使用 <em>onMounted</em> 和 <em>onUpdated</em> 函式來模擬 <em>mounted</em> 和 <em>updated</em> 鉤子的行為。這使得我們能夠在 <em>setup</em> 函式中執行相應的代碼，就像在 Vue2.0 中的生命週期鉤子中一樣。撇除函式寫法的部份，原先 Option API 所使用的生命週期鉤子函式，到 Vue3.0 所使用 Composition API 裡的名稱基本上皆是在前方加上了 on 之字首，以下為比較表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">Option API</div>
                    <div class="f-f1">Composition API</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>beforeCreate</em></div>
                    <div class="f-f1">直接寫入 <em>steup</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>created</em></div>
                    <div class="f-f1">直接寫入 <em>steup</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>beforeMount</em></div>
                    <div class="f-f1"><em>onBeforeMount</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>mounted</em></div>
                    <div class="f-f1"><em>onMounted</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>beforeUpdated</em></div>
                    <div class="f-f1"><em>onBeforeUpdated</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>updated</em></div>
                    <div class="f-f1"><em>onUpdated</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>beforeDestroyed</em></div>
                    <div class="f-f1"><em>onBeforeUnmount</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>destroyed</em></div>
                    <div class="f-f1"><em>onUnmounted</em></div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、生命週期鉤子</h2>
        <h3>beforeCreate、created</h3>
        <p>這兩個生命週期鉤子主要進行一些數據或方法初始化的作業，這時 Vue 實例尚未渲染到 <em>el</em> 和 <em>$el</em>，因此 DOM 還看不到我們創建的 Vue 實例。至於 Vue 實例在 <em>beforeCreate</em> 階段仍無法透過其創建時定義的 VM（ViewModel）獲取裡面建立的數據（Data）、方法（Methods），直到 <em>created</em> 這個階段才能取得內容。</p>
        <p>儘管 Vue3.0 的生命週期表中仍將這兩個生命鉤子列入實例流程圖裡，但由於 Vue3.0 Composition API 新增 <em>setup</em> 入口函式，其實已經不再需要使用 <em>beforeCreate</em> 與 <em>created</em>，但為了保留對 Vue2.0 的相容性，故現階段我們仍可以在 Vue3.0 的生命週期表裡看見這兩個鉤子的存在，不過誠如前面所述，Vue3.0 開始已經不需要它們，在官方文件 <a href="https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted" target="_blank">Composition API</a> 說明中也已看不到相關敘述。</p>
        <p><br></p>
        <h3>beforeMount、mounted</h3>
        <p>生命週期來到 Mount 階段，表示 Vue 實例裡的資料和方法即將要掛載進 DOM 裡面，<em>beforeMount</em> 表示在實例掛載進 DOM 之前被觸發，<em>mounted</em> 則表示資料已經渲染進 DOM 裡面，取代原本 DOM 對應元素裡面的內容。</p>
        <p><br></p>
        <h3>beforeUpdated、updated</h3>
        <p>當實例中的資料發生改變時觸發，讓 DOM 重新掛載更新後的數據。在 <em>beforeUpdated</em> 生命鉤子階段，新的資料雖然已經被更新，但尚未與 DOM 對應元素同步，而 <em>updated</em> 則表示新的數據以經同步到 DOM 對應元素裡面。</p>
        <p><br></p>
        <h3>beforeUnmount、unmounted</h3>
        <p>雖然換了個名字，但生命週期定義和用途與 Vue2.0 的 <em>beforeDestroyed</em>、<em>destroyed</em> 相同，表示 Vue 實例進入銷毀階段，<em>beforeUnmount</em> 表示在銷毀之前，<em>unmounted</em> 階段則完全銷毀綁定的資料數據、事件監聽、Watch 等方法（雖說是銷毀，但不意味著這些已經掛載到 DOM 裡面的內容就會被移除，它銷毀的涵義其實是指操作它的實例已不會再繼續追蹤、管理）。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/guide/essentials/lifecycle.html" target="_blank">Vue.js 3.0</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10242633" target="_blank">vue3 Composition API 學習手冊-13 生命週期</a></dd>
            <dd><a href="https://pinkymini.pixnet.net/blog/post/35630359-%E3%80%90%E5%89%8D%E7%AB%AF%E6%96%B0%E6%89%8B%E6%97%A5%E8%A8%98%E3%80%91vue.js%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98%286%29-vue2%E7%9A%84option-" target="_blank">【前端新手日記】Vue.js學習筆記(6)-Vue2的Option API和Vue3的Composition API</a></dd>
            <dd><a href="https://chupai.github.io/posts/2104/compositionapi/" target="_blank">竹白記事本 - Vue 3 - Composition API</a></dd>
            <dd><a href="https://blog.csdn.net/yifei1234567/article/details/123975970" target="_blank">【Vue3】——Vue3生命周期有哪些不同</a></dd>
            <dd><a href="https://blog.csdn.net/weixin_43867717/article/details/127009632" target="_blank">vue3生命周期及setup介绍</a></dd>
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