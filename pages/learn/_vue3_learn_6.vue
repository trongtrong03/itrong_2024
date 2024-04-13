<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="67" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、為什麼需要 ref 屬性？</a></li>
            <li><a href="#act2">二、在組件引入上加入 ref</a></li>
            <li><a href="#act3">三、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>本篇文章要講述的是 Vue 3 模板元素標籤的新屬性──<em>ref</em>，有些人可能會跟我一樣產生疑惑，<em>ref</em> 不就是那個用來宣告響應式資料的其中一種方式嗎？怎麼也能用在元素標籤裡了？事實上，雖然它們一樣都叫做 ref，但本質並不是相同的東西。</p>
        <p>定義響應式資料的 <em>ref</em> 是一個函式，它用來接收一個任何型別的參數，然後返回一個響應式的可引用物件，這個物件包含了一個 <em>.value</em> 屬性，用以獲取或修改其原本設定的值。所以這就是為什麼我們在任何函式要調用或修改 <em>ref</em> 的值時，大多時候都需要加上 <em>.value</em>。</p>
        <p>但是在模板 HTML 元素標籤中的 <em>ref</em> 則是一個特殊屬性，用於在元件或 DOM 元素上建立一個參考。這個引用可以在 JavaScript 中透過 <em>this.$refs</em> 或 <em>ref</em> 屬性來訪問，用於直接操作對應的元件實例或 DOM 元素。</p>
        <p>如此我們就對模板元素中的 <em>ref</em> 有了初步認識，本篇文章的內容要來聊聊為何 Vue 3 會誕生這樣一個特殊屬性，它能幫助我們在實務上解決哪些問題。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、為什麼需要 ref 屬性？</h2>
        <p>首先，以下有段 HTML 程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;ul&gt;
        &lt;li&gt;科目一&lt;/li&gt;
        &lt;li&gt;科目二&lt;/li&gt;
        &lt;li&gt;科目三&lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>此時有個需求傳來，表示希望使用者點擊某個按鈕後，便回傳「科目三」所在的元素。要實現這個需求很簡單，只需要賦予科目三所在的 <em>li</em> 一個唯一識別的 ID 值，並且新增一個按鈕用來觸發 JavaScript 事件，該事件的指令是取得指定 ID 的元素。</p>
        <p>於是，我們將程式碼改寫成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;ul&gt;
        &lt;li&gt;科目一&lt;/li&gt;
        &lt;li&gt;科目二&lt;/li&gt;
        &lt;li id="third"&gt;科目三&lt;/li&gt;
    &lt;/ul&gt;
    &lt;button @click="getElement"&gt;Get&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    function getElement (){
        console.log(document.getElementById("third").textContent);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>實際測試：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-1.jpg">
        </figure>
        <p>看起來沒有問題，對吧？結果也確實有達到最初的需求，點擊按鈕回傳指定結果。然而，這麼做卻隱藏了一個非常嚴重的潛藏問題：</p>
        <p><em>id</em> 作為 HTML 頁面唯一的識別符，我們用它指定給目標對象好讓程式可以取得它的內容，儘管在同一文件裡重複使用了相同的 ID，瀏覽器也不會報錯，因為它只會抓取第一個使用該 ID 元素的值，但是當開發者發現輸出結果不如預期的時候，通常也不難找出該文件是否命名或使用了重複的 ID。</p>
        <p>但是在 Vue.js 裡面，組件彼此之間互相呼叫使用是家常便飯的事情，假設現在引用範例組件的根組件 <b>App.vue</b> 同樣也有一個 ID 名稱為 <em>three</em> 的元素，請問會發生什麼情況？</p>
        <p><b>App.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2 id="third"&gt;阿比&lt;/h2&gt;
    &lt;User/&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>※ <em>&lt;User/&gt;</em> 是前面展示列表的模板組件。</p>
        <p>點擊按鈕，會發現 Console 輸出結果是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-2.jpg">
        </figure>
        <p>輸出的結果是「阿比」，而不是原本預期的「科目三」了，為什麼？</p>
        <p>這其實並不是什麼 Bug，如果仔細觀察 DOM 渲染的 HTML 結構，會發現：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-3.jpg">
        </figure>
        <p>結構裡出現了兩個 ID 為 <em>third</em> 的元素，當按鈕觸發 <em>getElement</em>，它只會取得第一個符合條件的值，所以程式本身並沒有問題，但站在人累的角度而言可能就不是如此了，這就是前面說的「潛藏問題」。在同一個頁面裡誤用重複的 ID 名稱，我們還能迅速地找到它們在哪裡並修正，但如果其他組件也使用了相同的 ID 名稱，尤其在多人團隊共同開發以及大型的專案，勢必就要花上不少時間和心力去找出問題在哪一支檔案，所謂牽一髮動全身，如果那個 ID 還被其它程式功能所引用......</p>
        <p>所以，在 Vue3，一般建議不要使用 ID 作為特定元素的唯一識別方法，而是使用 <em>ref</em> 來賦予該元素唯一的識別值，它的定義方法很簡單，其實就和 <em>ref</em> 宣告可響應式資料一樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref } from "vue";
let third = ref();

function getElement (){
    console.log(third.value.textContent);
}</code></pre>
        </div>
        <p>然後把原本模板裡的 <em>id</em> 改成 <em>ref</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;ul&gt;
        &lt;li&gt;科目一&lt;/li&gt;
        &lt;li&gt;科目二&lt;/li&gt;
        &lt;li ref="third"&gt;科目三&lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>為了更明顯地感受到 <em>ref</em> 和 <em>id</em> 的差異，我們連 <b>App.vue</b> 的相同 ID 也改成 <em>ref</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2 ref="third"&gt;阿比&lt;/h2&gt;
    &lt;User/&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import User from "./components/User.vue";
    import { ref } from "vue";
    
    let third = ref();
&lt;/script&gt;</code></pre>
        </div>
        <p>測試結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-4.jpg">
        </figure>
        <p>點擊按鈕，可以正確地回傳指定的結果「科目三」了，我們再接著觀看 DOM 結構：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-5.jpg">
        </figure>
        <p>會發現渲染進來的元素沒有被添加任何名稱，而之所以用 <em>ref</em> 創建一個變數名稱，是為了用來儲存由它所標記的內容，例如這個例子儲存了 <em>third</em>。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、在組件引入上加入 ref</h2>
        <p>我們都知道 Vue.js 有個特性就是可以在某個組件模板裡引入另一個組件，那引入的組件是否也可以添加 <em>ref</em> 識別呢？既然有這個疑慮我們就直接來做實驗，承襲上個章節的範例，我們在 <b>App.vue</b> 引用的 <em>&lt;User/&gt;</em> 子組件上加入 <em>ref</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;User ref="temp"/&gt;
    &lt;button @click="consoleTemp"&gt;測試&lt;/button&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import User from "./components/User.vue";
    import { ref } from "vue";

    let temp = ref();

    function consoleTemp() {
        console.log(temp.value);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>同時我們也調整一下 <b>User.vue</b> 的內容，在該組件裡建立三個 <em>ref</em> 變數，我們有沒有使用它不重要，單純知道這個組件裡面有三個 <em>ref</em> 變數資料即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;ul&gt;
        &lt;li&gt;科目一&lt;/li&gt;
        &lt;li&gt;科目二&lt;/li&gt;
        &lt;li&gt;科目三&lt;/li&gt;
    &lt;/ul>
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    import { ref } from "vue";

    let a = ref(0);
    let b = ref(3);
    let c = ref(5);
&lt;/script&gt;</code></pre>
        </div>
        <p>在 <b>App.vue</b> 根組件哩，我們建立了一個按鈕，這個按鈕觸發的 <em>consoleTemp</em> 事件，會輸出 <em>ref</em> 為 <em>temp</em> 的元素內容，而現在持有這個識別符的正是 <em>&lt;User/&gt;</em> 組件，直接打印這個組件回傳的內容是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-6.jpg">
        </figure>
        <p>毫無意外，就是該組件的實例物件。</p>
        <p>但是我們如果展開該實例物件的詳細資料，會發現這些各式各樣的資料屬性當中，找不到我們定義的 <em>a</em>、<em>b</em>、<em>c</em> 三個響應式資料變數。其實這是 Vue.js 的一種保護機制，不讓父組件能隨意取得子組件的 <em>ref</em> 資料，這就好比孩子房間（子組件）內有些私人物品（a、b、c），父親（父組件）也不能恣意觀看的概念，除非孩子明確表示某些東西是可以讓父親查看的。</p>
        <p>那子組件要如何明確表示哪些資料是可以開放給父組件操作的呢？首先，我們需要在子組件引用 <em>defineExpose</em> 這個函式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, defineExpose } from "vue";</code></pre>
        </div>
        <p>這個函式可以導出指定的變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">defineExpose({ a, b, c });</code></pre>
        </div>
        <p>完整程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, defineExpose } from "vue";
let a = ref(0);
let b = ref(3);
let c = ref(5);

defineExpose({ a, b, c });</code></pre>
        </div>
        <p>回到瀏覽器測試結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-6-7.jpg">
        </figure>
        <p>可以看到 Console 回傳的訊息中，包含了 <em>a</em>、<em>b</em>、<em>c</em> 三個 <em>ref</em> 資料的物件。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=40mG6pYE3rw&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=23" target="_blank">【极简Vue3】023 标签的ref属性</a></dd>
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