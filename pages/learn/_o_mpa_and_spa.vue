<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、什麼是 MPA 與 SSR？' },
        { id: 2, title: '二、什麼是 SPA 與 CSR？' },
        { id: 3, title: '三、MPA 與 SPA 比一比' },
        { id: 4, title: '四、什麼是 SSG？' },
        { id: 5, title: '五、ISR......？' },
        { id: 6, title: '六、總結' },
        { id: 7, title: '七、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="53" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <h2 v-text="catalog[0].title"></h2>
        <figure>
            <img src="/images/learn/others/spa-01.jpg">
        </figure>
        <p>之所以會想寫這個主題，是因為前陣子面試某一間公司，其筆試問題中有一題題目是「請說明什麼是 SPA，並列舉它的優缺點」，讀完題目的當下我愣了一晌......SPA 我聽過，也知道它翻譯成中文可以叫做「單頁式網頁應用」，大概的特性我也懂，但一時間就是分析不順它的重點和優劣之處，最後也只能寫個大略的皮毛交卷。儘管事後上網查資料覺得和我當下寫的內容相差無幾（指皮毛的部分），但想想自己對於網頁領域的專有名詞認識也實在不夠完全，於是決定筆記這篇文章，記錄下 SPA 與 MPA 這兩種網頁開發上的主要思維模式。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>在講 SPA 之前，先來談談 MPA。MPA 全名「Multi-Page Application」，意指多頁面網頁應用，也就是採用 MPA 模式架設的網站，其網頁根據網頁內容有多少功能，就會有多少個頁面，當使用者點擊連結，瀏覽器視窗會重新刷新整個畫面，並導覽到指定的頁面，或者說是向伺服器發送請求，接著伺服器再將指定的頁面檔案資料回傳給瀏覽器顯示。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;nav&gt;
    &lt;a href="index.html"&gt;首頁&lt;/a&gt;
    &lt;a href="about.html"&gt;關於我們&lt;/a&gt;
    &lt;a href="news.html"&gt;最新消息&lt;/a&gt;
    &lt;a href="products.html"&gt;產品介紹&lt;/a&gt;
    &lt;a href="contact.html"&gt;聯絡我們&lt;/a&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p>五個功能連結，代表該網站至少有五個頁面。</p>
        <p>又或者是像 form 表單這種，使用者填完表單資料按下送出按鈕，瀏覽器隨即將資料傳送給伺服器，伺服器接收處理後再將網站開發者設定的頁面內容回傳瀏覽器，反饋給使用者查看。</p>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/others/spa-02.jpg">
        </figure>
        <p><br></p>
        <p>闡述這麼多，一言以蔽之，MPA 其實就是過往傳統的網頁呈現方式啦，網站內所有導覽功能都是獨立的頁面。</p>
        <p><br></p>
        <h3>常見的 MPA 技術有？</h3>
        <h4>1. Server-side Frameworks：</h4>
        <p>使用伺服器端框架可以快速構建多頁應用程序，這些框架通常提供路由、模板引擎和資料庫等功能。常見的伺服器端框架包括：</p>
        <ul>
            <li>Django（Python）</li>
            <li>Ruby on Rails（Ruby）</li>
            <li>Laravel（PHP）</li>
            <li>ASP.NET（C#）</li>
        </ul>
        <h4>2. Template Engines：</h4>
        <p>模板引擎用於在伺服器端生成 HTML，從而動態生成每個頁面的內容。一些常用的模板引擎包括：</p>
        <ul>
            <li>Jinja2（Python）</li>
            <li>ERB（Ruby）</li>
            <li>Blade（Laravel）</li>
            <li>Razor（ASP.NET）</li>
        </ul>
        <h4>3. Client-side Libraries and Frameworks：</h4>
        <p>雖然 MPA 通常在伺服器端生成 HTML，但仍可以在客戶端使用 JavaScript 來添加互動性和動態功能。一些常見的客戶端 JavaScript 框架和函式庫包括：</p>
        <ul>
            <li>jQuery：用於簡化DOM操作和事件處理。</li>
            <li>Bootstrap：用於構建響應式設計的網頁界面。</li>
            <li>Vue.js、React、Angular：用於構建動態且互動豐富的用戶界面。</li>
        </ul>
        <h4>4. Build Tools：</h4>
        <p>在開發過程中，使用一些構建工具可以幫助優化代碼、處理資源、縮小文件大小等。一些常見的構建工具包括：</p>
        <ul>
            <li>Webpack</li>
            <li>Gulp</li>
            <li>Grunt</li>
        </ul>
        <h4>5. Database Systems：</h4>
        <p>對於需要儲存和檢索數據的多頁面網頁應用，通常需要一個可靠的數據庫系統。常用的數據庫包括：</p>
        <ul>
            <li>MySQL</li>
            <li>PostgreSQL</li>
            <li>SQLite</li>
            <li>Microsoft SQL Server</li>
        </ul>
        <p><br></p>
        <h3>什麼是 SSR？</h3>
        <p>當使用者透過瀏覽器功能（例如在網址列輸入網址、從書籤裡直接開啟網頁......等）開啟一個網頁時，瀏覽器會向該網站所在的伺服器端發送一個請求（Request），告訴伺服器說使用者想進入哪一個畫面，當伺服器接收到這個請求，就會回應（response）該頁面的畫面給瀏覽器，由瀏覽器接收伺服器渲染好的畫面後，再呈現給使用者檢視。</p>
        <p>──以上這個運作流程就是 SSR。</p>
        <p>SSR 是「Server-Side Rendering」的縮寫，一般稱為「伺服器端渲染」，指的是在伺服器端（Server）將動態生成的頁面直接轉換為 HTML，然後再將 HTML 發送給瀏覽器。SSR 的運作方式通常與 MPA 息息相關，因為 MPA 通常使用伺服器端渲染來生成每個頁面的 HTML，然後將 HTML 發送到用戶端（Client）。這與 SPA 的方式相反，因為 SPA 通常會直接在用戶端使用 JavaScript 動態生成頁面內容，有關 SPA 詳細內容我們會在下一個章節做介紹。</p>
        <p><br></p>
        <p>由於每一次的頁面導航都會重新刷新瀏覽器，變成每一次重新整理都要發送請求給伺服器，如果某些頁面需要用到比較多資源，相對需要花費比較多的時間去讀取，使用者體驗上有時就沒那麼舒服，而且頻繁地和伺服器互動也會增加伺服器的負擔。</p>
        <p>為了改善這些問題，SPA 技術應用便於焉而生。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>SPA 完整英文名稱為「Single-Page Application」，即單一頁面網頁應用的意思，顧名思義，整個網站只會有一個頁面，透過特定的技術，回應使用者的任何操作，SPA 的特色是動態重新渲染頁面的內容，而不用重新刷新整個網頁，因此使用者瀏覽體驗上會比 MPA 來得流暢，不太會因為各種可能影響讀取速度的問題，導致使用者等候過久的狀況發生。</p>
        <p>就拿近年來在華語程式圈最火紅的 JavaScript 框架 Vue.js 來說，它便是實現 SPA 最常見的技術之一，利用組件（Templates）與路由器（Router）渲染、切換各個網站的內容，普通使用者操作時看似與 MPA 沒什麼兩樣，然而當我們打開程式碼一看，往往只會看到用來建構組件內容的網頁檔案，只有一個 <em>&lt;div id="app"&gt;&lt;/div&gt;</em> 這樣簡短的標籤，儘管這不是判斷該網頁是否為 SPA 的唯一標準，卻也已是 SPA 技術的代表性標幟之一。</p>
        <p>不過前面 MPA 有舉了頁面導覽的程式碼結構例子，所以這裡也稍微提供相對應的範例，一般來說 MPA 的頁面導覽的網頁連結尾端通常是所使用網頁格式的副檔名，像是 <em>.html</em>、<em>.php</em> 等。而 SPA 網站導覽的網址大多都是用路由來表示，主要有以下兩種：</p>
        <h4>1. 哈希（Hash）路由：</h4>
        <p>在 URL 中使用井號（#）來表示路由：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">http://example.com/#/home
http://example.com/#/about
http://example.com/#/news/20240101</code></pre>
        </div>
        <h4>2. 歷史（History API）路由：</h4>
        <p>使用 HTML5 提供的 History API 來處理路由，這樣 URL 就可以不使用井號，而是直接使用正常的路徑，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">http://example.com/home
http://example.com/about
http://example.com/news/20240101</code></pre>
        </div>
        <p>不管是使用哈希路由還是歷史路由，當 URL 的路徑部分發生變化時，SPA 框架（如 React Router、Vue Router ......等）會根據設置的路由規則，動態地渲染對應的組件或畫面，而不會重新加載整個頁面。這樣就實現了在單一頁面中實現多個不同路徑的內容切換，從而實現了 SPA 的核心特性。</p>
        <p><br></p>
        <h3>常見的 SPA 技術有？</h3>
        <p>除了前面提到的 Vue.js，用來建構 SPA 網站的技術主要有以下這些：</p>
        <h4>1. JavaScript Frameworks and Libraries：</h4>
        <p>SPA 的核心是在用戶端（瀏覽器）中使用 JavaScript 動態生成和更新頁面內容。為了更高效地開發 SPA，通常會使用 JavaScript 框架或函式庫來管理應用程序的狀態、路由、資料等。常見的框架和函式庫包括：</p>
        <ul>
            <li>Vue.js</li>
            <li>React.js</li>
            <li>Angular</li>
        </ul>
        <p>當然這些框架還有衍生自己的應用框架或工具，譬如 Nuxt.js（框架）、Vite（工具）就是建立於 Vue.js 生態系統上，促使程式開發更加便捷的前端開發工具。</p>
        <h4>2. Client-side Routing：</h4>
        <p>SPA 通常需要用戶端路由來管理不同路由之間的切換，以實現單一網頁應用的多頁面效果。這可以使用上述 JavaScript 框架提供的內置路由器或者使用第三方路由庫，例如：</p>
        <ul>
            <li>Vue Router</li>
            <li>React Router</li>
        </ul>
        <h4>3. RESTful APIs：</h4>
        <p>SPA 通常與伺服器通過 RESTful API 進行資料數據交換，RESTful APIs 是指符合 REST（Representational State Transfer）設計風格的應用程序編程接口（API），主要用於瀏覽器和伺服器之間的通信，使前端和後端能夠獨立地開發和維護。</p>
        <h4>4. State Management Libraries：</h4>
        <p>大型 SPA 通常需要有效地管理應用程序的狀態，包括組件之間的狀態共享、狀態的修改和更新等。為了更好地管理應用程序的狀態，會使用一些狀態管理函式庫，例如：</p>
        <ul>
            <li>Vuex（Vue.js）</li>
            <li>Redux（React）</li>
            <li>NgRx（Angular）</li>
        </ul>
        <h4>5. Build Tools and Module Bundlers:：</h4>
        <p>在開發過程中，通常會使用一些構建工具和模組打包工具來處理程式碼、資源、文件大小優化等。常見的建構工具有：</p>
        <ul>
            <li>Nuxt.js（Vue）</li>
            <li>Webpack</li>
            <li>Parcel</li>
        </ul>
        <h4>6. CSS Preprocessors and Styling Libraries：</h4>
        <p>使用 CSS 預處理器或框架、函式庫可以提高 CSS 樣式開發的效率，對講究開發效率的 SPA 技術來說無疑是一大利器。</p>
        <ul>
            <li>預處理器（Preprocessors）：Sass、Less、Stylus</li>
            <li>函式庫（Styling Libraries）：Bootstrap、Tailwind CSS</li>
        </ul>
        <p><br></p>
        <h3>什麼是 CSR？</h3>
        <p>之前說 SSR 是透過伺服器端（Server）渲染好結果後再回傳給用戶端（Client），那麼 CSR 則是相反過來。CSR 是 「Client-Side Rendering」的縮寫，指的是伺服器端只負責將檔案回應給瀏覽器，至於畫面渲染、建構什麼的，全都交給瀏覽器自己處理......雖然這麼講有點不正確，因為精確來說，應該要說是用戶端（Client）透過瀏覽器去渲染我們寫的前端程式碼。這樣做的用意通常是為了完全達到前後端分離之目的，除了可以減輕伺服器端負荷壓力，維護層面通常也比 SSR 來得友善，畢竟 CSR 的伺服端只要單純處理資料就好。</p>
        <p>CSR 通常與 SPA 有關，因為 SPA 經常透過 CSR 的概念實現頁面動態的更新。在 SPA 中，初始頁面的 HTML 通常只包含一個空容器，我們稱為應用程序的根元素（例如 <em>&lt;div id="app"&gt;&lt;/div&gt;</em>），然後在瀏覽器中使用 JavaScript 框架（如 Vue.js、React、Angular）動態生成和更新該容器中的內容，不需要重新加載整個頁面。</p>
        <p>也因為不用重新讀取整個網頁，所以在使用者體驗方面，SPA 評價往往優於 MPA，不過這也並不代表 SPA 全面輾壓 MPA，因為單一頁面也存在一些壞處，譬如不利於 SEO（儘管有其他解，但對比 MPA 而言仍比較麻煩），以及初次載入頁面的時間可能會比 MPA 來得還要久。</p>
        <p>至於為什麼說 SPA 不利於 SEO 搜尋，那是因為過往 SPA 建站的資料都是從用戶端由 AJAX 之類的技術向伺服器端發送請求，由於資料都在伺服器端那，搜尋引擎的爬蟲自然而然就很難取得資料，或者說 SPA 大部分內容都是通過 JavaScript 動態產生，但搜尋爬蟲通常在抓取內容時通常不會執行 JavaScript 程式碼，這些都大大提升 SEO 的難度。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>凡事都一體兩面，即使再美好的事物也是一樣。雖然 SPA 的問世是為了妥善解決 MPA 傳統網頁架構一些為人詬病的問題，不過 SPA 也存在著一些缺點，以下我們就透過表格來分析這兩種網頁應用各自的優劣之處。</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1"></div>
                    <div class="f-f6">MPA</div>
                    <div class="f-f6">SPA</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">優點</div>
                    <div class="f-f6">
                        <ol>
                            <li>初次載入時間可能比較快。</li>
                            <li>有利於 SEO 搜尋。</li>
                            <li>瀏覽器相容性較佳（因為 MPA 通常不依賴太複雜的 JavaScript 功能）。</li>
                            <li>開發門檻較低。</li>
                        </ol>
                    </div>
                    <div class="f-f6">
                        <ol>
                            <li>伺服器端回應快速，因為它通常只需要回傳資料。</li>
                            <li>頁面渲染快速，使用者體驗較佳。</li>
                            <li>功能組件之間的轉場動畫容易實現。</li>
                            <li>前後端分離，各自維護比較方便。</li>
                        </ol>
                    </div>
                </div>
                <div class="f-row">
                    <div class="f-f1">缺點</div>
                    <div class="f-f6">
                        <ol>
                            <li>不同頁面的載入時間可能不一致，使用者體驗較差。</li>
                            <li>伺服器端壓力比較大，畢竟用戶端時常需要傳送請求。</li>
                            <li>頁面之間的轉場動畫較難實現。</li>
                            <li>前後端相依性高。</li>
                        </ol>
                    </div>
                    <div class="f-f6">
                        <ol>
                            <li>初次載入時間可能比較漫，因為通常會一次讀取網站全部使用到的 CSS、JavaScript。</li>
                            <li>不利於 SEO 搜尋，因為網頁大部分內容通常透過 JavaScript 所產生。</li>
                            <li>瀏覽器相容性較差，舊版本瀏覽器可能不相容 SPA 使用的技術。</li>
                            <li>開發門檻較高。</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <p>其實基本上就是我方的優點就是對方缺點的概念，至於什麼網站適合使用哪一種網頁應用技術，說白了也是要看公司或團隊的需求，但通常來說，比較需要透過 SEO 強化搜尋曝光度的網站類型，例如電子商務平台、購物網站......等，可能較適合傳統 MPA 的開發模式；而網站需求希望以快速渲染為主，且在平板、手機等行動裝置上也能快速切換畫面內容，那麼 SPA 就是首選。</p>
        <p>不過無論是 MPA 或 SPA，實際上也都有其他方法弭補它們本身存在的缺點，只是相對直接使用另一個技術來說，開發過程會顯得更佳繁瑣、耗費時間。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>SSG 全名為「Static Site Generation」，中文稱作「靜態頁面生成」，SSG 技術的主要概念之一就是為了解決傳統 SPA 不利於 SEO 的麻煩。</p>
        <p>SSG 技術通常與一些前端框架（Vue、React......等）一同使用，在框架建構（Build）時生成靜態頁面，當使用者訪問網站時，將會直接接收到已經生成好的靜態頁面，而不需要先在伺服器上動態產生頁面，然後才回傳給用戶端，既可以提高網能效能，也能減少伺服器端的負擔，同時又方便 SEO 優化。</p>
        <p>以下具體述說 SSG 有哪些優點：</p>
        <h4>1. 完整的靜態 HTML 文件：</h4>
        <p>SSG 在構建時會將所有頁面預先生成為靜態 HTML 文件，而不需要在用戶訪問時動態生成。這意味著搜索引擎爬蟲可以直接抓取和索引這些靜態 HTML 文件，而不需要執行 JavaScript 代碼來獲取內容。</p>
        <h4>2. 更快的初始載入時間：</h4>
        <p>由於靜態 HTML 文件已經在建構階段執行時生成，因此用戶端在訪問網站時可立即收到完整的頁面內容，而不需要等待 JavaScript 的下載和執行，從而提高使用者體驗並降低跳出率。</p>
        <h4>3. 更好的首次載入性能：</h4>
        <p>靜態頁面生成通常與 SSR 或 SSG 結合使用，這使得網站的初次載入性能會比 CSR 來得更好。搜索引擎對首次載入性能非常敏感，因此這對 SEO 有利。</p>
        <h4>4. 支持靜態頁面路由：</h4>
        <p>SSG 可以使用靜態頁面路由，讓每個頁面都有自己的 URL，搜索引擎可以將每個靜態頁面視為獨立的內容單元。</p>
        <p><br></p>
        <p>但上一個章節也說過，再美好的技術也還是不可能完美無瑕，SSG 雖然逐漸成為顯學，卻仍然存在缺點：</p>
        <h4>1. 較難實現動態內容：</h4>
        <p>SSG 生成的是靜態 HTML 文件，因此對於需要動態更新內容的場景，如客戶端生成的內容或者即時更新的資訊，可能需要額外的處理和技術手段。</p>
        <h4>2. 不適合大型和頻繁更新的網站：</h4>
        <p>對於具有大量內容或需要頻繁更新的網站，SSG 可能會變得不切實際。每次內容更新都需要重新構建整個網站，這可能會導致構建時間過長，並且需要額外的系統資源。</p>
        <h4>3. 較複雜的資料管理：</h4>
        <p>對於需要處理大量資料的網站，如電子商務網站或各種內容豐富的網站等，於管理和維護層面可能相對複雜。SSG 需要在構建時將資料轉換為靜態內容，這可能需要設計和實現複雜的資料處理邏輯。</p>
        <h4>4. 不支持由客戶端使用者驅動的互動：</h4>
        <p>由於靜態 HTML 文件是在構建時生成的，因此不支持客戶端使用者驅動的互動，如使用者登錄、使用者提交表單等。對於這些場景，需要額外的前端或後端技術來處理。</p>
        <p>所以啦，老話一句，究竟要使用哪一種技術來建構網站，終究還是得和團隊溝通討論後再一起作決定才是最適合的方法。</p>
        <p><br></p>
        <p>既然前面提過 SSG 通常會和前端框架一同使用，具體來說是使用在哪一個階段呢？就拿個人目前在使用的 Nuxt 來說，當我完成網站的開發，準備要進行發布時，會下達以下指令讓編譯器為我生成頁面：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm run generate</code></pre>
        </div>
        <p>這個指令就是 SSG 在做的事情，它將 Nuxt 框架建立的資料與路由，預先生成所有頁面的靜態 HTML 檔案，生成後的這些檔案可以讓我們上傳到指定網路空間或 CDN（Content Delivery Network）上，從而實現高性能、低成本的靜態網站部署。所以 <em>npm run generate</em> 這個指令不單單只是打包和優化我們寫的程式及使用到的相關資源（Images、CSS、JavaScript......等），它同時也包含建構出所有頁面靜態 HTML 的動作。</p>
        <p>不過 Nuxt 除了 <em>generate</em> 之外，還有個 <em>build</em> 指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm run build</code></pre>
        </div>
        <p>它的功能同樣也是把框架編寫好的內容打包輸出成靜態網站，只不過和 <em>generate</em> 相比，<em>build</em> 主要在做的事情只有將我們寫的內容打包成網頁佈署時所需的靜態資源，並不包含產生靜態網頁，所以我們可以說 <em>generate</em> 指令包含了 <em>build</em> 在做的事情。</p>
        <p>既然如此為什麼 Nuxt 要保留 <em>build</em>？主要是因為 Nuxt 的宗旨之一是想確保與其他前端開發工具的相容性，或許有部分開發者會同時使用 Nuxt 或其他框架工具，譬如 Jenkins、Travis CI、CircleCI 之類的 CI/CD 工具，又或者 React、Vue.js、Angular 等其他框架，因此才保留 <em>build</em> 這個通用指令增加相容性與靈活度。至於 <em>generate</em> 則是 Nuxt 本身獨有的指令，其他開發工具是不支援這個指令的。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>前面看了這麼多縮寫成三個字母的網頁渲染技術的專有名詞，想必已經感到視覺疲乏和思想錯亂了吧？放心，相較前面 CSR、SSR、SSG，ISR 比較沒那麼常見，因為 ISR 是 React 衍生框架 Next.js 獨有的功能。</p>
        <p>ISR，全名「Incremental Static Regeneration」，中文譯為「增量靜態生成」，它是一種結合了 SSG 和動態內容更新的概念。上個章節曾點出 SSG 的缺點：傳統 SSG 在建構時生成靜態 HTML 檔案，如果需要修改或更新網站部分內容，通常必須要重新建構整個網站，進而拖累維護效率──ISR 便是誕生來解決這個問題。</p>
        <p>ISR 允許使用者訪問網站時，動態地更新部分頁面的內容，而不是等待整個網站的重新構建。當使用者瀏覽某個頁面，如果該頁面的靜態 HTML 文件已經存在，則會立即返回給客戶端。同時，Next.js 會在後台檢查該頁面的資料是否已經過時，如果需要更新，則會在後續的請求中重新生成該頁面的靜態 HTML 文件，並在下一次用戶訪問時回傳更新後的內容。這樣的做法既可以保持原本 SSG 的優勢（載入快速、有利於 SEO），同時也解決部分內容需要動態更新的需求，讓使用者可以立即獲得最新的內容，而不需要等待整個網站重新建構。</p>
        <p>優點說完了，免不了俗地也要來聊聊它的缺點：</p>
        <h4>1. 資源消耗：</h4>
        <p>在 ISR 運行時，伺服器需要處理客戶端的請求並動態生成靜態內容。這可能會導致更多的伺服器資源消耗，尤其是在大量並發請求的情況下。</p>
        <h4>2. 延遲：</h4>
        <p>ISR 需要在用戶請求時即時重新生成靜態內容，這可能會導致一些延遲。特別是在請求量很大或需要進行複雜計算的情況下，延遲可能會讓使用者感受到較差的回應時間。</p>
        <h4>3. 一致性問題：</h4>
        <p>當多個使用者同時訪問相同頁面時，ISR 可能會導致一些一致性問題。例如，在某些情況下，某個使用者可能會看到更新後的內容，而另一個使用者仍然看到舊的內容，如使一來將會導致混淆或不一致的使用者體驗。</p>
        <h4>4. 依賴伺服器性能：</h4>
        <p>ISR 需要伺服器能夠及時處理客戶端請求並動態生成靜態內容。這代表伺服器的性能和運算資源是決定 ISR 效能的關鍵因素之一，如果伺服器性能不足或負載過大，ISR 便有可能無法正常運作。</p>
        <p><br></p>
        <p>至於 Next.js 具體怎麼使用 ISR 在本篇文章就不多提了，有興趣的看官可以自行前往 <a href="https://nextjs.tw/docs/basic-features/data-fetching/incremental-static-regeneration" target="_blank">Next.js</a> 官方文件自行研究。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>最後，來為 MPA、SPA、CSR、SSR、SSG 做總結整理：</p>
        <h4>1. MPA（Multi-Page Application）多頁面網頁應用：</h4>
        <ul>
            <li>包含多個獨立的 HTML 文件，每個文件對應一個頁面。</li>
            <li>使用者通常通過點擊超鏈接或提交表單等方式來導航。</li>
            <li>適合較大型的網站，每個頁面可能有自己的特定功能和內容。</li>
        </ul>
        <h4>2. SPA（Single-Page Application）單一頁面網頁應用：</h4>
        <ul>
            <li>整個應用程序僅加載一個 HTML 文件，並通過 JavaScript 在客戶端動態更新內容。</li>
            <li>通常使用 AJAX 或 API 來獲取和顯示資料數據。</li>
            <li>適合交互性較高、需要頻繁更新的應用程序。</li>
        </ul>
        <h4>3. CSR（Client-side Rendering）客戶端渲染：</h4>
        <ul>
            <li>整個頁面的渲染在瀏覽器上進行，通常使用 JavaScript 框架（如 React、Vue.js）來處理。</li>
            <li>頁面的內容通常是通過 Ajax 或 API 請求從服務器或外部資料源動態加載。</li>
            <li>首次載入時間可能較長，但後續頁面間的導航速度較快。</li>
        </ul>
        <h4>4. SSR（Server-side Rendering）伺服器端渲染：</h4>
        <ul>
            <li>在伺服器上動態生成 HTML，然後將其返回給瀏覽器。</li>
            <li>首次載入時間較快，因為客戶端收到完整的 HTML，而不是一個空的頁面。</li>
            <li>有利於 SEO，因為搜索引擎可以直接抓取 HTML 內容。</li>
        </ul>
        <h4>5. SSG（Static Site Generation）靜態頁面生成：</h4>
        <ul>
            <li>在構建時預先生成所有頁面的靜態 HTML 文件，而不是在客戶端使用者訪問時動態生成。</li>
            <li>靜態文件可以被直接部署到 CDN 上，並且具有快速的載入速度和良好的 SEO。</li>
            <li>適合用於內容不經常更新且需要高性能的網站應用。</li>
        </ul>
        <p><br></p>
        <p>彼此之間的關聯：</p>
        <h4>1. MPA 與 SPA：</h4>
        <ul>
            <li>SPA 和 MPA 都是網頁應用的不同架構形式。</li>
            <li>SPA 通常僅載入一個 HTML 檔案並在客戶端動態更新內容，而 MPA 包含多個獨立的 HTML 檔案，每個檔案文件對應一個頁面。</li>
            <li>兩者都可以使用 CSR 或 SSR 作為渲染方法。</li>
        </ul>
        <h4>2. CSR 與 SSR：</h4>
        <ul>
            <li>兩者都是用於構建前端網頁應用的不同渲染方法。</li>
            <li>CSR 將頁面的渲染過程放在客戶端，而 SSR 則將渲染過程放在伺服器端。</li>
            <li>CSR 提供了更快的後續頁面導航速度，而 SSR 提供了更好的首次載入性能和 SEO。</li>
        </ul>
        <h4>3. SSR 與 SSG：</h4>
        <ul>
            <li>兩者都是用於動態生成頁面內容的技術。</li>
            <li>SSR 是在每次客戶端發送請求時動態生成 HTML，而 SSG 則是在構建時預先生成所有頁面的靜態 HTML 文件。</li>
            <li>SSR 適用於需要動態更新內容的情況，而 SSG 適用於內容不經常更新且需要高性能的情況。</li>
        </ul>
        <h4>4. CSR 與 SSG：</h4>
        <p>於某種程度上是互斥的概念，因為它們代表了兩種不同的前端渲染方式。僅管如此，仍然有開發者會將 CSR 與 SSG 結合在一起使用，例如把一些重點公用頁面（首頁、產品列表......等）使用 SSG 預先生成，從而實現更快的載入速度和更好的 SEO；而其他動態頁面（會員資料、訂單查詢......等）使用 CSR 載入動態數據。這種混合使用的方式可以根據項目的需求和特性來進行調整，讓網站開發運用上更具彈性，不過相對也增加開發成本。</p>
        <p><br></p>
        <p>回到前言提到的撰文初衷，現在有些公司面試徵人的過程中，會透過詢問應徵者是否瞭解 MPA、SPA，或什麼專案該使用 CSR 還是 SSR，藉以瞭解該求職者對於網頁渲染及自身使用工具的理解程度。其實當時我的那份試卷，還有一題就是在考 CSR 與 SSR 的意思是什麼，但當時我對這兩個術語並不怎麼瞭解，於是給了個大空白，針對本篇文章主題在蒐集資料的過程才發現它們和 MPA、SPA 也有很深的關聯。</p>
        <p>光於 CSR 與 SSR 的優缺點前面已經提非常多了，所以最後只講講實務應用上的建議回覆：網站的首頁可以嘗試採取 SSR，使其獲得較好的 SEO 優化，而其他頁面則採用 CSR，增進使用者體驗同時也減輕伺服器端的負擔。不過最終還是要遵循整個團隊的建議，畢竟網站同時使用 CSR 與 SSR 將會增加程式碼複雜度，以及開發與維護的技術成本。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <dl>
            <dd><a href="https://hackmd.io/@ivaSrwTTSkC1jb66rpGfnQ/BkzAoh6Oq" target="_blank">搞懂網頁技術名詞 SSR、CSR、MPA、SPA</a></dd>
            <dd><a href="https://israynotarray.com/other/20210529/2519649612/" target="_blank">淺談 SPA、CSR、SSR、MPA、SSG 專有名詞</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10202427" target="_blank">[Angular 深入淺出三十天] Day 01 - MPA 與 SPA</a></dd>
            <dd><a href="https://www.796t.com/content/1546096324.html" target="_blank">SPA與MPA的區別</a></dd>
            <dd><a href="https://learn.microsoft.com/zh-tw/dotnet/architecture/modern-web-apps-azure/choose-between-traditional-web-and-single-page-apps" target="_blank">在傳統 Web 應用程式和單頁應用程式 (SPA) 之間作選擇</a></dd>
            <dd><a href="https://devmvpchen.com/posts/rendering-pattern" target="_blank">CSR、SSR、SSG:你需要知道的三種網頁渲染方式</a></dd>
            <dd><a href="https://hackmd.io/@pericode/HyRJHvAsj" target="_blank">快速了解Next.js中的網頁渲染技術重點: SSR、SSG、ISR與CSR</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10266781" target="_blank">Day03 - 深入淺出 CSR、SSR 與 SSG</a></dd>
            <dd><a href="https://nextjs.tw/docs/basic-features/data-fetching/incremental-static-regeneration" target="_blank">Next.js</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>