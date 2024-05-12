<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="77" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、父子組件之間的通信</a></li>
            <li><a href="#act2">二、XXX</a></li>
            <li><a href="#act3">三、XXX</a></li>
            <li><a href="#act4">四、XXX</a></li>
            <li><a href="#act5">五、XXX</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>在早前〈循序漸進學 Vue3（七）：組件之間的傳遞 props〉一文中已經有稍微學習組件之間如何進行資料傳遞，我們稱之為 Props，而組件之間也不是只有常見的父子傳遞而已，有可能是父與孫、平輩與平輩等多種情境的組件狀態，不同關聯下的 Props 使用方式也有所區別，本篇文章主要便是要來學習在各種組件關係要如何正確地運用 Props 傳遞資料給對方。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、父子組件之間的通信</h2>
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

        
    </div>
    
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=52" target="_blank">【极简Vue3】052 组件通信 方式1 props</a></dd>
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