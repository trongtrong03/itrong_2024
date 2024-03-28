<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="43" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Vue1.0 的生命週期</a></li>
            <li><a href="#act2">二、Vue2.0 的生命週期</a></li>
            <li><a href="#act3">三、1.0 與 2.0 的不同</a></li>
            <li><a href="#act4">四、透過範例實際觀察</a></li>
            <li><a href="#act5">五、其他補充</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <blockquote>每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。</blockquote>
        <p>這段文字引述自 <a href="https://cn.vuejs.org/guide/essentials/lifecycle.html" target="_blank">Vue.js</a> 官方對其程式語言的「生命週期」所給出的解釋，若要用比較簡短的一句話概括，生命週期指的是「Vue 實例從創建到銷毀的過程」，其中，Vue 實例指的是其應用核心的建構體，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var app = new Vue({
  ...
});</code></pre>
        </div>
        <p>儘管根據版本不同，上面宣告的建構方式也會不太一樣，但基本上只要建立這樣的一個程式碼結構，就代表創建了一個 Vue 的實例。一個 Vue 實例通常包含了 Vue 組件的數據、方法、計算屬性、生命週期鉤子......等等，其中，生命週期鉤子（Lifecycle Hooks）為 Vue 實例帶來各種不同階段或情境所應該執行的函式，像是創建、初始化、編譯、更新、銷毀等等，這些鉤子便形成它所屬 Vue 實例的生命週期。</p>
        <p>Vue 從西元 2015 年發展至今也已推出第三代版本，生命週期隨著版本更新亦推陳出新，本篇文章筆記之重點將著墨於學習 Vue 的生命週期內容，以及比較各版本之間的差異。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Vue1.0 的生命週期</h2>
        <p>有別於傳統網頁開發一般都透過 JavaScript 選取指定元素的 ID 或 class，修改我們想要變動的區塊內容，Vue 採用的是「資料驅動畫面」模式，只要宣告變數的值發生改變，DOM 就會立即自動做更新，而不需要我們再手動去更新畫面。資料驅動畫面的好處令開發者只需專注在資料數據的管理和程式邏輯，不用再分神處理手動更新 DOM 的方法，不僅簡化前端開發的過程，也提高了程式碼的可讀與易維護性。</p>
        <p>在 Vue1.0 版本裡，官方提供的生命週期流程圖是這個樣子的：</p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-1.jpg">
        </figure>
        <p>序章曾經提到，Vue 生命週期包含各自不同階段執行程式的「生命週期鉤子（Lifecycle Hooks）」，Vue1.0 主要有六個鉤子函式，分別是 <em>created</em>、<em>beforeCompile</em>、<em>compile</em>、<em>ready</em>、<em>beforeDestory</em>、<em>destoryed</em>，也就是上圖中紅框底紅字的項目。</p>
        <p><br></p>
        <h3><em>created</em></h3>
        <p>在 Vue 實例創建完成後立即同步調用。此時實例通常已經完成「數據觀測」（Observe Data）、「事件初始化」（Init Events）、數據綁定、計算屬性、方法、watcher / 事件回調等解析工作，但是還沒有開始執行 DOM 的編譯，因此看不到 <em>el</em> 和 <em>$el</em> 屬性的存在。</p>
        <p><strong><em>el</em> 和 <em>$el</em> 是什麼？</strong></p>
        <p>首先，<em>el</em> 是 Vue 實例裡其中一個選項屬性，主要用於指定該實例要「渲染」（或稱「掛載」）到 DOM 的哪一個元素。舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">new Vue({
    el: "#app",
    data: {
        message: "Hello, Vue!"
    }
})</code></pre>
        </div>
        <p>範例中我們將 Vue 實例透過 <em>el</em> 屬性指定給 DOM 裡面帶有 <em>app</em> ID 名稱的元素，因此 Vue 實例將會渲染（掛載）到該元素裡面，<em>el</em> 指定的對象不侷限於 ID，它可以是任一選擇器的字符串，或實際存在的 DOM 元素。</p>
        <p>至於 <em>$el</em> 也是 Vue 實例裡的屬性之一，它代表的是 Vue 實例所渲染 DOM 元素的引用，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello, Vue!"
    }
})

// 訪問渲染的 DOM 元素
var element = vm.$el;
</code></pre>
        </div>
        <p><em>vm.$el</em> 將會引用 <em>#app</em> 所在的 DOM 元素，簡單來說就是方便我們在進行 DOM 互動事件時可以更方便、簡潔地去引用 Vue 實例。</p>
        <p><br></p>
        <h3><em>beforeCompile</em></h3>
        <p>Compile 一詞翻譯成中文是「編譯」的意思，所以 <em>beforeCompile</em> 指的是在編譯之前的鉤子函式。在這個鉤子裡面的程式會在模板（Template）編譯開始前被調用，不過在這個階段除了模板編譯還沒開始外，DOM 其實也仍處於尚未被渲染生成的狀態。</p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-2.jpg">
        </figure>
        <p>在 <em>beforeCompile</em> 進入 <em>compile</em> 階段這之間，Vue 實例會開始解析模板，並生成在虛擬的 DOM 記憶體裡，因為是虛擬的，所以瀏覽器實際畫面仍未能顯示解析的內容。</p>
        <p><br></p>
        <h3><em>compile</em></h3>
        <p>編譯完成後立即調用裡面的程式。通常在這個階段時所有指令都已生效，因此像是數據的變化都將會觸發 DOM 的更新，然而即便如此，此階段還不能保證 <em>$el</em> 也已經渲染到 DOM 裡面。</p>
        <p><br></p>
        <h3><em>ready</em></h3>
        <p>根據官方文件的解釋，<em>ready</em> 會在編譯結束和 <em>$el</em> 首次渲染至 DOM 後調用，例如銜接在第一次 <em>attached</em> 鉤子之後。雖然生命週期圖表裡沒有 <em>attached</em>，但 <em>attached</em> 也是生命週期中的其中一個鉤子，它的呼叫時間點主要在 <em>vm.$el</em> 渲染進 DOM 之後，但有個前提，必須是由 Vue 指令或實例方法（例如 <em>$appendTo()</em>）插入才會觸發，直接針對 <em>vm.$el</em> 操作並無法觸發這個鉤子。</p>
        <p><br></p>
        <h3><em>beforeDestory</em></h3>
        <p>Destory 是銷毀的意思，如此一來 <em>beforeDestory</em> 意思就不難懂了，指的就是實例開始銷毀前調用的函式，而此時實例仍保有目前的功能。</p>
        <p>因此，<em>beforeDestory</em> 階段通常會執行一些資源清理的工作，譬如取消計時器、解除事件監聽器、銷毀子組件......等等。</p>
        <p><br></p>
        <h3><em>destoryed</em></h3>
        <p><em>destoryed</em> 是 Vue 實例生命週期的最後一站，它會在實例被銷毀後才調用，此時實例中的所有指令都已經解除綁定，裡面的子組件也已通通被銷毀。</p>
        <p>通常情況下，<em>destoryed</em> 鉤子在這個階段大多用來執行記憶體釋放之類的最終清理動作，和 <em>beforeDestory</em> 的主要差別在於實例進入銷毀階段的執行時機。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>Vue2.0 的生命週期</h2>
        <p>Vue 1.0 於 2015 年 10 月問世，翌年 9 月緊接著發佈 2.0 版本，這個版本無論在語法結構或性能優化層面都有顯著的改進與加強，可以說是奠定 Vue 成為 JavaScript 熱門前端框架的一大關鍵。在 2.0 版本裡，Vue 實例的生命週期相較 1.0 版本也有些不小的改動，以下是 Vue 2.0 的生命週期圖表：</p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-3.jpg">
        </figure>
        <p>仔細看會發現原本 1.0 生命週期中的 <em>compile</em>、<em>ready</em> 等鉤子不見了，取而代之的則是 <em>mounted</em>，此外還新增了 <em>updated</em> 這個新的鉤子函式。在這裡我將 2.0 版的生命週期拆成各個執行階段，一邊重新複習 Vue 實例生命週期，一邊認識 2.0 版本修改及新增的鉤子函式其具體用途：</p>
        <p><br></p>
        <h3><em>beforeCreate</em>、<em>created</em></h3>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-4.jpg">
        </figure>
        <p>首先，在進入解析模板階段之前的 <em>beforeCreate</em>、<em>created</em> 鉤子函式和 1.0 生命週期流程差不多，主要先進行一些事件、資料初始化的作業，這時 Vue 實例尚未渲染到 <em>el</em> 和 <em>$el</em>，因此 DOM 還看不到我們創建的 Vue 實例。至於 Vue 實例在 <em>beforeCreate</em> 階段仍無法透過其創建時定義的 VM（ViewModel）獲取裡面建立的數據（Data）、方法（Methods），直到 <em>created</em> 這個階段才能取得內容。</p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-5.jpg">
        </figure>
        <p>在 <em>created</em> 觸發後並到進入 <em>beforeMount</em> 之前的這個階段，Vue 實例會開始解析模板，並將其生成在 DOM 虛擬記憶體內，這時我們仍無法在 DOM 畫面看到編譯完成的 Vue 實例內容。</p>
        <p><br></p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-6.jpg">
        </figure>
        <h3><em>beforeMount</em></h3>
        <p><em>beforeMount</em> 鉤子裡的程式會在 Vue 實例開始渲染到 DOM 之前被觸發，在這個階段通常會執行一些資料數據請求、DOM 操作準備之類的預請求動作。緊接其之後 Vue 實例就會將生成在虛擬記憶體裡的模板正式掛載到實體的 DOM 畫面上：</p>
        <blockquote>Create vm.$el and replace "el" with it</blockquote>
        <p>以下將這段話透過程式碼範例逐步解釋 <em>vm.$el</em> 創建與取代的過程：</p>
        <h6>1. 建立 Vue 實例：</h6>
        <p>一開始我們建立 Vue 實例時，基本結構大概長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello, Vue!"
    }
});</code></pre>
        </div>
        <p>其中 <em>vm</em> 表示我們所建立 Vue 實例的代稱，<em>el</em> 則指定了未來 DOM 渲染時，要將實例掛載到哪一個元素或指定選擇器裡。</p>
        <p><br></p>
        <h6>2. 訪問 vm.$el：</h6>
        <p><em>vm.$el</em> 是 Vue 內建的屬性，表示 Vue 實例裡的 <em>el</em> DOM 元素，以上面的程式碼範例來講，假如我們去 Console 它會得到 <em>#app</em> 裡面所有的 DOM 結構。</p>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="320" data-default-tab="js,result" data-slug-hash="OJrgdQM" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/OJrgdQM">
            Untitled</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-7.jpg">
        </figure>
        <p><br></p>
        <h6>3. 取代 <em>el</em> 屬性：</h6>
        <p>一旦 Vue 實例建立完成且也渲染到 DOM 時，<em>vm.$el</em> 就會取代 <em>el</em> 屬性，變成我們在瀏覽器畫面上看到的樣子。這個過程是由 Vue.js 自行處理的，我們不需要手動去呼叫或更改它。</p>
        <p><br></p>
        <h3><em>mounted</em></h3>
        <p>此時 DOM 已經編譯出 Vue 實例的內容（<em>vm.$el</em> 已替換掉 <em>el</em>），<em>mounted</em> 裡頭對 DOM 的操作基本上已可生效，在這個階段大多執行除了前面提到的 DOM 操作事件（例如新增、修改、刪除元素屬性、樣式或內容）外，以及請求數據、呼叫事件監聽器（例如偵測滑鼠滾動事件、鍵盤偵測等）、啟動計時器、初始化第三方插件、執行動畫或過渡效果......等任務，又或者向其他組件發送事件或調用方法。</p>
        <p>然而，<em>mounted</em> 並不能保證 Vue 實例中的子組件也都被渲染完成，因此有些操作方法可能無法正確地被執行，假如我們希望等整個 DOM 都渲染完成在執行某些任務，可以在 <em>mounted</em> 鉤子內使用 vm.$nextTick 函式。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">mounted: function () {
    this.$nextTick(function () {
        // 在 DOM 完全渲染後才會執行的程式碼
    })
}</code></pre>
        </div>
        <p><br></p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-8.jpg">
        </figure>
        <h3><em>beforeUpdate</em></h3>
        <p>還記得先前曾說 Vue 是由資料驅動畫面嗎？當組件的數據資料發生變化時，Vue 會重新渲染組件以反映這些變化，而 Vue2.0 引入 <em>beforeUpdate</em> 和 <em>updated</em> 這兩個生命週期鉤子的用意是為了更好地控制組件的更新過程，而不必全然依賴 Vue 默認的渲染行為。</p>
        <p>誠如 <em>beforeCreate</em> 之於 <em>created</em>、<em>beforeMount</em> 之於 <em>mounted</em> 的關係，<em>beforeUpdate</em> 鉤子會在組件開始要重新渲染之前被觸發，通常在這個階段我們可以做一些備份數據資料、更新前的清理執行，或異步操作等。異步操作像是透過網路向伺服器端請求數據（利用 AJAX、Fetch API 或 Axios 等）、設置計時器、執行動畫......等。</p>
        <p>不過需要注意的是，由於 Vue 在 <em>beforeUpdate</em> 鉤子執行後仍會繼續計算新的虛擬 DOM，若我們在這期間執行上述異步操作行為且會影響到組件的數據狀態，是有可能出現一些意外狀況，所以必須謹慎處理。</p>
        <p><br></p>
        <h3><em>updated</em></h3>
        <p><em>updated</em> 生命週期鉤子會在組件重新渲染完成後被觸發，這時表示組件已經更新且也與 DOM 同步更新完成（意即數據和頁面都是新的並保持同步），在這個階段我們可以執行一些與更新後的 DOM 相關操作，譬如透過 JavaScript 取得指定的元素、執行動畫效果......等。</p>
        <p>然而，Vue 官方並不建議在 <em>updated</em> 裡進行一些會使數據發生變化的操作，這主要出自以下兩個理由：</p>
        <p>1. 不必要的性能消耗：<br>因為 <em>updated</em> 是在組件完成更新後觸發的，這意味著組件的 DOM 也已經同步更新完成，若我們又在 <em>updated</em> 再次更改數據的狀態，那麼又會觸發另一輪組件的更新，導致重新渲染進而產生不必要的性能消耗，包含 CPU、記憶體、網路......都有可能。</p>
        <p>2. 避免重複循環更新：<br>呈上，若因為數據的變化使得組件重新進行渲染，有可能會再次觸發 <em>updated</em> 鉤子，從而進入一種無限循環的情況。</p>
        <p>為避免這些問題，Vue 官方建議開發者使用「計算」（computed）或「監視器」（watchers）來回應數據的變化，而關於這兩者的詳細介紹與具體使用方式，暫且留到日後獨立撰文來筆記。總而言之，在 <em>updated</em> 生命週期鉤子裡，最好只執行與 DOM 對象有關的操作，而關於數據變化的程式則放在計算屬性或監視器裡面。</p>
        <p><br></p>
        <p>此外，和 <em>mounted</em> 一樣，<em>updated</em> 不會保證組件中嵌套的子組件也都被重新渲染完成，我們同樣可以透過 vm.$nextTick 函式來確保特定程式碼在整個 DOM 重新渲染完成後再執行：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">updated: function () {
    this.$nextTick(function () {
        // 在 DOM 完全渲染後才會執行的程式碼
    })
}</code></pre>
        </div>
        <p><br></p>
        <figure>
            <img src="/images/learn/js/vue-lifecycle-9.jpg">
        </figure>
        <h3><em>beforeDestroy</em>、<em>destroyed</em></h3>
        <p>Vue2.0 實例銷毀階段與 1.0 版本雷同，<em>beforeDestroy</em> 會在 Vue 實例銷毀前被調用，因為是在銷毀前，此時 Vue 實例裡面的組件仍然在運作中，我們可以做一些關閉監視器、計時器取消、解除事件綁定之類的清理工作，以防止記憶體洩漏或不必要的資源占用。</p>
        <p><em>destroyed</em> 則在 Vue 實例完全銷毀後才被呼叫，在這個生命週期鉤子裡，Vue 實例已完全被銷毀，我們已無法訪問 DOM 裡頭的元素，以及組件裡的數據和方法，因此通常在這個鉤子裡執行的也會是一些額外的清理動作。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、1.0 與 2.0 的不同</h2>
        <p>在對比環節我們透過表格來比較 Vue1.0 與 2.0 版本的生命週期差異：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">Vue1.0</div>
                    <div class="f-f0">Vue2.0</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">init</div>
                    <div class="f-f0">beforeCreate</div>
                    <div class="f-f1">實例建立之前，屬性仍尚未作用，例如 <em>data</em> 屬性。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">created</div>
                    <div class="f-f0">created</div>
                    <div class="f-f1">實例建立完成，且屬性也已綁定，但尚未生成給實體的 DOM ，<em>$el</em> 屬性並不存在。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">beforeCompile</div>
                    <div class="f-f0">beforeMount</div>
                    <div class="f-f1">實例已生成在實體的 DOM，但數據還沒完全轉換過去。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">compiled</div>
                    <div class="f-f0">mounted</div>
                    <div class="f-f1">實例裡的內容基本上已綁定給 DOM，不過有關子組件的部份並不能完全保證也都已經渲染至 DOM。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">ready</div>
                    <div class="f-f0">mounted</div>
                    <div class="f-f1"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0"></div>
                    <div class="f-f0">beforeUpdate</div>
                    <div class="f-f1">實例裡的數據發生變化之前調用，新的數據雖然更新了，但還沒與 DOM 同步更新。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"></div>
                    <div class="f-f0">updated</div>
                    <div class="f-f1">實例裡的數據發生變化時調用，新的數據已同步更新到 DOM 上面。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"></div>
                    <div class="f-f0">activated</div>
                    <div class="f-f1">當實例的路由啟動時（進入頁面或切換頁面）時調用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"></div>
                    <div class="f-f0">deactivated</div>
                    <div class="f-f1">當實例的路由離開時（離開頁面或切換頁面）時調用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">attached</div>
                    <div class="f-f0"></div>
                    <div class="f-f1">當實例的 DOM 元素被插入到頁面時調用。（2.0 由 mounted 取代）</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">detached</div>
                    <div class="f-f0"></div>
                    <div class="f-f1">當實例的 DOM 元素從頁面移除時調用。（2.0 由 beforeDestroy 取代）</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">beforeDestory</div>
                    <div class="f-f0">beforeDestory</div>
                    <div class="f-f1">在實例銷毀前調用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">destoryed</div>
                    <div class="f-f0">destoryed</div>
                    <div class="f-f1">在實例銷毀後調用。</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p><strong>1. 移除 <em>ready</em>：</strong></p>
        <p>在 1.0 版本，<em>ready</em> 調用的時機為「第一次」渲染入 DOM 之後，可是到了 2.0 版本，Vue 實例渲染對象不一定只針對瀏覽器，也有可能在伺服器端（SSR）做掛載，因此改由 <em>mounted</em> 取代，由於 <em>mounted</em> 只會在用戶端執行，可避免 Vue 實例在用戶端和伺服器端都執行相同的操作，從而提升效率。</p>
        <p><br></p>
        <p><strong>2. 移除 <em>attached</em> 與 <em>detached</em>：</strong></p>
        <p>1.0 這兩個生命週期鉤子是在實例渲染至 DOM 以及從 DOM 移除時調用，但 2.0 版本分別用 <em>mounted</em> 及 <em>beforeDestroy</em> 取代，藉以減少混淆，並提高可讀性。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、透過範例實際觀察</h2>
        <p>單純只看圖文可能不好理解 Vue 生命週期實際上的運作與 DOM 之間的因果變化，接下來我們透過程式碼範例來跑一次 <em>data</em> 和 <em>$el</em> 於 Vue2.0 各階段生命週期鉤子裡呈現的結果為何。</p>
        <p>首先，我們在 HTML 文件寫好要指定給 Vue 實例渲染（掛載）的 DOM 元素：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="app"&gt;
    {{ message }}
&lt;/div&gt;</code></pre>
        </div>
        <p>然後是實例的部份，基礎為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    }
});</code></pre>
        </div>
        <p>由於 Vue 會在內部自動處理整個生命週期過程，所以即便我們這時還沒有添加任何生命週期鉤子，Vue 也已自行編譯完成並將 <em>vm.$el</em> 渲染到 DOM 指定的 <em>el</em>（<em>#app</em>），因此光是這樣簡單一個範例，我們就已經能在畫面上看到 Hello! Vue 的字樣。</p>
        <p><br></p>
        <h3><em>beforeCreate</em>：</h3>
        <p>此時 Vue 實例還在初始化階段，尚未實際被建立，因此實例裡任何數據和方法都還沒有開始綁定。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    beforeCreate() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
    }
});</code></pre>
        </div>
        <p>所以這時若在 <em>beforeCreate()</em> 鉤子裡去 <em>console</em> data 數據和 <em>$el</em>，會雙雙得到 <em>undefined</em> 的結果，也就是還未定義的意思。</p>
        <p>Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: undefined
// this.$el: undefined</code></pre>
        </div>
        <p><br></p>
        <h3><em>created</em>：</h3>
        <p>在這個階段實例已經建立好了，實例裡頭的數據和方法已可被取得，但 <em>$el</em> 仍未渲染到 DOM 裡面，因此 Console 它依然是 <em>undefined</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    created() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
    }
});</code></pre>
        </div>
        <h3><em>created</em>：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: Hello! Vue
// this.$el: undefined</code></pre>
        </div>
        <p><br></p>
        <h3><em>beforeMount</em>：</h3>
        <p>Vue 實例在這時已從虛擬 DOM 中渲染至實體 DOM 上，<em>$el</em> 已經可以取得 <em>el</em> 指定的 DOM 元素，只是 data 裡面的數據還沒完全轉換到 DOM 裡面。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    beforeMount() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
        console.log(this.$el.outerHTML);
    }
});</code></pre>
        </div>
        <p>這裡多增加一行指令來印出 <em>$el</em> 的 DOM HTML 呈現的結構，Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: Hello! Vue
// this.$el: [object HTMLDivElement]
// &lt;div id="app"&gt;{{ message }}&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <h3><em>mounted</em>：</h3>
        <p>在調用 <em>mounted</em> 生命週期鉤子時，原本實例裡的內容已經綁定到 DOM 元素，所以基本上到這個階段能看到 Vue 實例完整的樣貌。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    mounted() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
        console.log(this.$el.outerHTML);
    }
});</code></pre>
        </div>
        <p>Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: Hello! Vue
// this.$el: [object HTMLDivElement]
// &lt;div id="app"&gt;Hello! Vue&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <h3><em>beforeUpdate</em>：</h3>
        <p>在來 <em>beforeUpdate</em> 和 <em>updated</em> 這兩個鉤子的用途主要是應對實例裡的數據發生變化時而調用，為了產生變化效果，我們需要於範例 HTML 程式結構中增設一個按鈕以方便我們去改變 <em>message</em> 的值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="app"&gt;
    {{ message }}
    &lt;button @click="message='New world!'"&gt;更新&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>Vue 實例的內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    beforeUpdate() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
        console.log(this.$el.outerHTML);
    }
});</code></pre>
        </div>
        <p>Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: New world!
// this.$el: [object HTMLDivElement]
// &lt;div id="app"&gt;Hello! Vue&lt;button&gt;更新&lt;/button&gt;&lt;/div&gt;</code></pre>
        </div>
        <p>因為鉤子名稱中帶有「before」，所以是在 <em>updated</em> 更新 DOM 階段之前被觸發，因此會看到 <em>message</em> 的值是被更新了，但還沒同步到 DOM 的畫面上。</p>
        <p><br></p>
        <h3><em>updated</em>：</h3>
        <p>看完上一個 <em>beforeUpdate</em> 的解釋和執行結果，相信不必說太多，腦子裡大概也浮現結果了吧？我們直接看範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    updated() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
        console.log(this.$el.outerHTML);
    }
});</code></pre>
        </div>
        <p>Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: New world!
// this.$el: [object HTMLDivElement]
// &lt;div id="app"&gt;New world!&lt;button&gt;更新&lt;/button&gt;&lt;/div&gt;</code></pre>
        </div>
        <p>DOM 畫面上的 <em>message</em> 已經從原本的 Hello! Vue 更新成 New world! 值了。</p>
        <p><br></p>
        <h3><em>beforeDestroy</em>、<em>destroyed</em>：</h3>
        <p>最後是有關銷毀 Vue 實例的兩個鉤子放在一起講，它們代表一個 Vue 實例生命週期的結束。有些人可能會以為銷毀也意味著該實例也會從 DOM 移除，其實不然，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="app"&gt;
    {{ message }}
    &lt;button @click="$destroy()'"&gt;銷毀&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>我們在實例渲染的 DOM 元素裡面增加一顆用來執行實例銷毀事件的點擊按鈕，然後在最後 <em>destroyed</em> 鉤子去 Console 觀察銷毀後的實例和 DOM 會回傳什麼結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    destroyed() {
        console.log(`this.message: ${this.message}`);
        console.log(`this.$el: ${this.$el}`);
        console.log(this.$el.outerHTML);
    }
});</code></pre>
        </div>
        <p>Console 結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// this.message: New world!
// this.$el: [object HTMLDivElement]
// &lt;div id="app"&gt;New world!&lt;button&gt;銷毀&lt;/button&gt;&lt;/div&gt;</code></pre>
        </div>
        <p>你會發現，Console 仍然回傳了實例渲染到 DOM 裡面的資料，其實所謂的銷毀，可說是停止該實例繼續運行，但不會直接將其從 DOM 中移除，已經渲染在 DOM 上的畫面依然存在，但操作它的實例已不會再繼續追蹤、管理它。因此，當我們於 <em>destroyed</em> 鉤子中 Console <em>this.$el</em> 時，得到的是最後的 DOM 元素內容，方便我們可以在後續藉由單純的 JavaScript 操作 DOM 去處理一些清理、善後工作。</p>
        <p>例如我們希望點擊「銷毀」按鈕時，一併將實例的內容從 DOM 畫面移除：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    destroyed() {
        this.$el.parentNode.removeChild(this.$el);
    }
});</code></pre>
        </div>
        <p>如此一來 Vue 銷毀時也會將 DOM 結構裡面的 <em>&lt;div id="app"&gt;</em> 元素也一併移除掉。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、其他補充</h2>
        <p><strong>組件是指模板（Template）嗎？</strong></p>
        <p>答案為否。在 Vue 世界裡，組件指的是可以重複使用的 Vue 實例，它們可以多次建構並嵌套在其他組件之中。因為組件視同 Vue 實例，因此包含了資料數據、方法、生命週期...等內容，理所當然也包含模板。至於模板在 Vue 實例中扮演的角色主要是用來定義組件的結構和佈局，以描述組件的外觀。</p>
        <p><br></p>
        <p><strong>el、$el、vm.$el 在 Vue 中分別代表什麼？有什麼差別？</strong></p>
        <p>這三個都是 Vue 實例中的屬性，但使用用途不同，作用域也不太一樣。首先，<em>el</em> 用來指定該實例要渲染到 DOM 裡面的哪一個元素或指定選擇器，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    ...
});</code></pre>
        </div>
        <p><em>$el</em> 也是 Vue 實例的屬性之一，它通常用於實例內部訪問 DOM 元素時使用，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var vm = new Vue({
    el: "#app",
    data: {
        message: "Hello! Vue"
    },
    mounted() {
        console.log(this.$el);    // 訪問渲染的 DOM 元素
    }
});</code></pre>
        </div>
        <p>至於 <em>vm.$el</em> 和 <em>$el</em> 雷同，實際上它們在訪問 DOM 元素沒有什麼不同，細小的差別在於前者 <em>vm</em> 指的是該實例的變數名稱，我們可以在非 Vue 實例格式的純 JavaScript 去引用它。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var button = document.getElementById("app");
button.addEventListener("click", function () {
    console.log(vm.$el);
});</code></pre>
        </div>
        <p>後者則在 Vue 實例中使用。</p>

    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://v1-cn.vuejs.org/api/#compiled" target="_blank">Vue 1.0</a></dd>
            <dd><a href="https://v2.cn.vuejs.org/v2/api/#mounted" target="_blank">Vue.js 2.0</a></dd>
            <dd><a href="https://cn.vuejs.org/guide/essentials/lifecycle.html" target="_blank">Vue.js 3.0</a></dd>
            <dd><a href="https://www.itread01.com/article/1500940616.html" target="_blank">淺談Vue.js 1.x 和 2.x 例項的生命週期</a></dd>
            <dd><a href="https://blog.csdn.net/weixin_57519357/article/details/126858221" target="_blank">Vue 01 - Vue 的生命周期</a></dd>
            <dd><a href="https://www.jianshu.com/p/8642262f4403" target="_blank">vue1.0和2.0的生命周期详解</a></dd>
            <dd><a href="https://hackmd.io/@AndyAnn/HkITl35hO" target="_blank">VUE 從頭學 - vue 的生命週期</a></dd>
            <dd><a href="https://medium.com/%E5%B0%8F%E5%BD%A5%E5%BD%A5%E7%9A%84%E5%89%8D%E7%AB%AF%E4%BA%94%E5%9B%9B%E4%B8%89/vue-js-vue%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F-fc971fac8298" target="_blank">[Vue.js] Vue的生命周期</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10242633" target="_blank">vue3 Composition API 學習手冊-13 生命週期</a></dd>
            <dd><a href="https://blog.csdn.net/yifei1234567/article/details/123975970" target="_blank">【Vue3】——Vue3生命周期有哪些不同</a></dd>
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