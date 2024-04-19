<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="73" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、push</a></li>
            <li><a href="#act2">二、replace</a></li>
            <li><a href="#act3">三、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>傳統的 MPA 網頁，我們在點擊瀏覽器上、下一頁按鈕時，很直覺就知道它應該會回或去到哪一個頁面，同時因為畫面跳轉，使用者能輕易感受到網頁確實在切換。但是你有想過單頁式網頁應用 SPA 是如何看待瀏覽器上、下一頁功能的嗎？整個網頁只有一個 HTML 文件，瀏覽者都是透過路由導航切換不同的組件，獲取自己想要的資訊。那麼上下頁按鈕對 SPA 網頁還有效果嗎？如果有，它們又是怎麼呈現？開發者能對其進行什麼樣的設定？</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、push</h2>
        <p>首先，使用者透過瀏覽器上、下一頁切換頁面的過程，我們一般稱為切換瀏覽器的歷史記錄。對 SPA 來說，同樣也具備著歷史記錄切換的功能，只不過記錄的不是網頁，而是組件。所以當使用者從 A 組件切換到 B 組件，然後點擊瀏覽器返回的按鈕，則畫面會回到 A 組件的內容，也就是說，不管使用者切換了多少路由組件，比如 A 到 B 到 C 再到 D，它的上下一頁都是導向當前組件的前一或後一個歷史記錄的組件，如果要用圖片來示意的話大概是這個樣子：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-12-1.jpg">
        </figure>
        <p>而這種路由堆疊的方式，就是 <em>push</em> 的運作模式，在沒有特別設定路由導航行為的狀況下，Vue.js 預設的導航方式就是使用 <em>push</em> 方法。<em>push</em> 方法用於在瀏覽器歷史記錄中新增一個新的路由記錄，然後導航到該路由，所以使用者可以透過瀏覽器的後退按鈕回到先前的路由。</p>
        <p>除了可以方便地利用瀏覽器上、下一頁功能按鈕返回或前往歷史記錄的路由，也因為其完整的路由歷史記錄，對使用者使用體驗來說也比較友善。</p>
        <p>然而，過長的歷史記錄有時也並非好事，如果頁面經常進行路由切換，可能會導致瀏覽器的歷史記錄變得很長，增加使用者在瀏覽器中後退時的導航難度。且過長的歷史記錄可能導致用戶在後退時不斷跳到先前的頁面，從而造成用戶體驗上的混亂。</p>
        <p>所以你會發現其優缺點自相矛盾，歷史記錄的堆疊既是蜜糖也是毒藥，固然網站功能的多寡與路由規劃是一項因素，但終究一切都還是取決於每名使用者自身操作的感受。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、replace</h2>
        <p>replace 在中文有「代替」、「取代」的意思，顧名思義，如果路由導航使用此方法，那麼每一個路由組件的切換，都是直接取代原本的瀏覽器記憶體的佔位，圖解：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-12-2.jpg">
        </figure>
        <p>也因為如此，自然不會有所謂的歷史記錄（之前的歷史記錄直接被「取代」掉了），瀏覽器上、下一頁的功能也就無法產生功能，使用者無法直接透過按鈕回到先前瀏覽的內容，只能從導航路由再次前往。</p>
        <p>設定 <em>replace</em> 的方式很簡單，只要在導航路由 <em>&lt;RouterLink&gt;</em> 標籤裡面直接加上 <em>replace</em> 屬性即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;nav&gt;
    &lt;RouterLink replace to="/home"&gt;Home&lt;/RouterLink&gt;
    &lt;RouterLink replace to="/about"&gt;About&lt;/RouterLink&gt;
    &lt;RouterLink replace to="/news"&gt;News&lt;/RouterLink&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p>這樣你就會發現不管怎麼切換組件，瀏覽器上一頁的功能完全不會記錄導航路由切換的過程。</p>
        <p>當然我們也可以只針對某幾個導航路由設置 <em>replace</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;nav&gt;
    &lt;RouterLink replace to="/home"&gt;Home&lt;/RouterLink&gt;
    &lt;RouterLink replace to="/about"&gt;About&lt;/RouterLink&gt;
    &lt;RouterLink to="/news"&gt;News&lt;/RouterLink&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p>像這樣，假如從 About 切換到 News，那麼就會產生一個 About 的歷史記錄，點擊上一頁就可以回到 About 的組件內容。</p>
        <p><em>replace</em> 方法會取代目前的路由記錄，不會將新的路由新增至歷史記錄中，適用於需要防止使用者透過後退按鈕返回特定頁面或保持瀏覽器歷史記錄簡潔的場景。</p>
        <p>也因為該方法取代目前的路由記錄會將新的路由記錄覆寫目前的記錄，這表示先前的路由記錄會被刪除，使用者無法透過後退按鈕返回到先前的路由，可能會導致使用者流失和體驗降低。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=40" target="_blank">【极简Vue3】040 路由 replace属性</a></dd>
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