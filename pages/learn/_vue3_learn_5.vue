<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="66" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、為響應式資料設下監視條件判斷</a></li>
            <li><a href="#act2">二、使用 watchEffect</a></li>
            <li><a href="#act3">三、watch V.S. watchEffect</a></li>
            <li><a href="#act4">四、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>如果一路從 Vue 1 學上來，準備踏入 Vue 3 版本，對上一篇文章的主角 <em>watch</em> 想必早已很熟悉了，但對於本篇要學習的 <em>watchEffect</em> 這個 Vue 3 新增的函式 API 多半應該感到陌生，頂多直覺它可能是 <em>watch</em> 的延伸或相關應用。然而這只能說對了一半，它確實也與監視響應式資料的狀態有關，主要用於建立一個自動執行的響應式副作用，不過與 <em>watch</em> 函式不同，<em>watchEffect</em> 不需要明確地指定要監視的響應式狀態，而是自動追蹤在其內部使用的所有響應式依賴，並在這些依賴發生變化時重新運行副作用函式。</p>
        <p>光說理論也感覺不出個所以然，具體使用細節在本篇文章內容進行敘述，以下開始。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、為響應式資料設下監視條件判斷</h2>
        <p>首先，我們建立一個簡單的範例，這個範例展示了一輛卡車目前的時速和載重：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;時速: {{ speed }} km/h&lt;/p&gt;
    &lt;p&gt;載重: {{ weight }} kg&lt;/p&gt;
    &lt;button @click="changeSpeed"&gt;加速&lt;/button&gt;
    &lt;button @click="changeWeight"&gt;加重&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";
    let speed = ref(60);
    let weight = ref(400);

    function changeSpeed (){
        speed.value += 10;
    }

    function changeWeight (){
        weight.value += 100;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>接著假設情境條件：當卡車時速大於 120 km/h 以上，或者載重大於 1000 KG 時，就 Console 回傳「已違規！」的字樣。這時就需要使用 <em>watch</em> 函式來監視卡車數據的變化。我們一步一步來，第一步先加入監視函式並輸出新、舊值觀察資料響應的變化：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch([speed, weight],(newValue, oldValue)=>{
    console.log(newValue, oldValue);
})</code></pre>
        </div>
        <p>（※ 記得 <em>import</em> 要導入 <em>watch</em>。）</p>
        <p>測試監視結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-5-1.jpg">
        </figure>
        <p>因為我們用陣列來顯示 <em>speed</em> 與 <em>weight</em> 的值，所以新舊值的打印輸出也是呈現陣列格式。但上一篇文章曾說過，實務開發上大多只會關注新的值，舊的值則不大理會，因此 <em>watch</em> 第二組參數的建構函式中，我們可以只傳入一個值，當只存在一個值時，會被視為新值。所以我們將函式再簡化一些：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch([speed, weight],(val)=>{
    console.log(val);
})</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vue3-learn-5-2.jpg">
        </figure>
        <p>再來是加上條件判斷：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch([speed, weight],(val)=>{
    if( speed.value >= 120 || weight.value > 1000){
        console.log("已違規！");
    }
})</code></pre>
        </div>
        <p>當然可以只這樣寫，但是用解構賦值會更合適，比較能明顯辨別出解構賦值的變數是指向新的值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch([speed, weight],(val)=>{
    let [newSpeed, newWeight] = val;
    if( newSpeed >= 120 || newWeight > 1000){
        console.log("已違規！");
    }
})</code></pre>
        </div>
        <p>測試當時速大於等於 120 km/h 的時候：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-5-3.jpg">
        </figure>
        <p>同理測試載重也會得到滿足條件就回傳「已違規」的訊息。</p>
        <p>以上就是利用 <em>watch</em> 函式監視響應式資料，當資料數據達到函式裡設定的條件，便執行條件內指定程式內容的範例。那麼問題來了，設定一兩筆資料的條件沒什麼困難，三四筆也尚能接受，若有六七八九十甚至更多資料需要設定監視條件呢？</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、使用 watchEffect</h2>
        <p>承襲前一章節末段的問題，當要監視的條件非常多筆，要在 <em>watch</em> 函式裡面逐一設下條件固然可行，但無論是建立還是後續的維護都會相當麻煩，面對這種情況，顯然有更好的辦法，這個辦法便是使用 <em>watchEffect</em>。</p>
        <p>經過前面幾次關於 <em>watch</em> 的練習，應該可以認知到，<em>watch</em> 只會監視我們主動指定給它要請它監視的資料，假如沒有指定的，它就不會去監視，比如有 A、B、C、D、E 五筆資料，我們設定 <em>watch</em> 監視 A、B、C 這三筆資料，那它就只會監視這三筆響應式資料的狀態變化，D 和 E 有沒有變化則完全不理睬。</p>
        <p>但對 <em>watchEffect</em> 來說就不是這樣了，一旦調用 <em>watchEffect</em>，它會立即監視整個網頁應用的狀態變化，以同一個例子我們改用 <em>watchEffect</em> 來操作：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { ref, watchEffect } from "vue";

watchEffect(()=>{
    if( speed.value >= 120 || weight.value > 1000){
        console.log("已違規！");
    }
})</code></pre>
        </div>
        <p>可以看到我們沒有傳入任何的參數，要 <em>watchEffect</em> 去監視它，單純只設定好條件，<em>watchEffect</em> 便會主動進行監視所有資料的狀態變化：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-5-4.jpg">
        </figure>
        <p>我們可以不設定任何條件，單純讓 <em>watchEffect</em> 輸出一個訊息：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watchEffect(()=>{
    console.log("Hello! world!");    // Hello! world!
})</code></pre>
        </div>
        <p>當組件被載入，就能看到 Console 視窗輸出了「Hello! world!」，表示 <em>watchEffect</em> 會隨著該組件被載入到 DOM 裡頭後立刻開始作用。</p>
        <p>但如果使用 <em>watch</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch(val, ()=>{
    console.log("Hello! world!");    // Uncaught ReferenceError: val is not defined
})</code></pre>
        </div>
        <p>則會出現 <b>Uncaught ReferenceError: val is not defined</b> 錯誤，它告訴你傳進去的參數 <em>val</em> 並沒有被定義，第一是因為我們前面沒有宣告一個名為 <em>val</em> 的變數；再者即使被定義，但因為 <em>val</em> 的資料沒有任何變化，<em>watch</em> 就不會有任何反應，和 <em>watchEffect</em> 一載入無論數據變化了沒都會先作用，兩相對比誰比較被動答案呼之欲出。</p>
        <p><br></p>
        <p>總結一下 <em>watch</em> 與 <em>watchEffect</em>：</p>
        <p>1. 兩者都用來監視響應式資料的數據變化，只是監聽的方式不同。</p>
        <p>2. <em>watch</em> 必須明確指出要監視的資料。</p>
        <p>3. <em>watchEffect</em> 不用明確指出要監視的資料，它也會監視所有資料的響應變化，我們只需要單純設定好哪些要被監視的資料變化監視條件即可。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、watch V.S. watchEffect</h2>
        <p>以下情況適合使用 <em>watch</em>：</p>
        <h5>1. 需要精確控制監視的狀態：</h5>
        <p>當你需要明確指定要監視的響應式狀態時，例如監視物件的某個屬性、陣列的某個索引等。</p>
        <h5>2. 需要存取新值和舊值：</h5>
        <p><em>watch</em> 提供了新值和舊值兩個參數，方便你在回呼函式中進行比較或其他操作。</p>
        <h5>3. 需要停止監視：</h5>
        <p><em>watch</em> 函式傳回一個用於停止監視的函式，可以手動停止監視。</p>
        <p><br></p>
        <p>以下情況適合使用 <em>watchEffect</em>：</p>
        <h5>1. 自動追蹤所有響應式依賴：</h5>
        <p><em>watchEffect</em> 會自動追蹤其內部所使用的所有響應式依賴，並在這些依賴發生變化時重新執行副作用函式。</p>
        <h5>2. 不需要存取新值和舊值：</h5>
        <p><em>watchEffect</em> 並沒有提供新值和舊值參數，因此適用於不需要關心特定值變化的場景。</p>
        <h5>3. 簡化副作用函式的書寫：</h5>
        <p>由於 <em>watchEffect</em> 不需要明確指定監視的響應式狀態，因此可以簡化副作用函式的書寫。</p>
        <p><br></p>
        <h3>watchEffect 的缺點：</h3>
        <h5>1. 缺少新舊值參數：</h5>
        <p>與 <em>watch</em> 不同，<em>watchEffect</em> 不提供新值和舊值參數，因此在某些情況下可能需要手動處理變更。</p>
        <h5>2. 無法精確控制監視的狀態：</h5>
        <p><em>watchEffect</em> 會自動追蹤其內部使用的所有響應式依賴，因此無法精確控制監視的狀態，可能會導致不必要的重複執行。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=EZlN-rjN_Bo&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=22" target="_blank">【极简Vue3】022 watchEffect</a></dd>
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