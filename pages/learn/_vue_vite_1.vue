<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="59" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、基本介紹</a></li>
            <li><a href="#act2">二、環境安裝</a></li>
            <li><a href="#act3">三、結構說明</a></li>
            <li><a href="#act4">四、使用套件</a></li>
            <li><a href="#act5">五、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>有關 Vue.js 的發展云云相信絕大多數網頁前、後端開發者都已耳熟能詳，從發布早期一片讚嘆聲中卻仍略夾帶一些技術還不成熟的聲浪，如今討論更多的則是要如何從雨後春筍不斷冒升的 Vue.js 框架與技術，挑出一款最適合自己或團隊開發需求的工具，而本篇文章主題要介紹的 Vite 就是其中一款非常熱門的 Vue.js 前端建構工具，它正是由 Vue.js 創始人 Evan You 所打造的，畢竟是為自己親兒子量身打造的工具，自然是再熟悉不過了。不過這裡倒也不會直接斷言 Vite 是 Vue 所有衍生編譯工具中最強大、最廣泛的，只是看見大多數使用 Vue.js 的公司都將 Vite 列為必要或加分條件，即便無關偏好或習慣，個人皆認為 Vite 都有學習、瞭解其使用方式的必要。</p>
        <p>廢話不多說，以下開始吧。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、基本介紹</h2>
        <figure>
            <img src="/images/learn/js/vite-1-1.jpg">
        </figure>
        <p><a href="https://v4.vitejs.dev/" target="_blank">Vite</a>，發音音同「Veet」，這個詞的起源源自法語，有「快速的」之意思，由此可知，在眾多 Vue.js 框架與工具裡 Vite 主打一個快速，幫助開發者能更高效率地編寫程式。而 Vite 也不是只支援 Vue.js 一套 JavaScript 框架而已，舉凡 Vanilla、React、Preact、Lit、Svelte 等前端框架也都有支援。</p>
        <p>Vue.js 創始人 Evan You 之所以開發 Vite 這套前端建構工具，主要基於以下兩個理由：</p>
        <h5>1. 開發服務器啟動緩慢：</h5>
        <p>這個階段稱為「冷啟動」（Cold-Starting），在瀏覽器開始支援 ESM（ES modules）之前，JavaScript 本身並沒有提供原生機制讓開發者以模組化的方式進行程式開發，所以才有了 webpack、Rollup、Parcel 等這些工具，幫忙「打包」我們的程式碼，使其模塊串聯起來成可以在瀏覽器運行的文件。然而，當越來越多規模龐大的網站也開始導入這些打包工具，效能處理緩慢的缺點也逐漸浮上檯面，往往需要等待很長一段時間才能啟動開發服務器，無疑降低開發者的「使用者體驗」。</p>
        <blockquote class="is-info">
            <p>模塊是什麼？</p>
            <p><br></p>
            <p>模塊（Module）是 JavaScript ES6 引入的新系統，允許開發者將 JavaScript 程式碼拆分成多個區塊，每個模塊都可以擁有自己的作用域、導出與導入。模塊的好處不僅僅是簡化程式碼，同時也吻合現代開發主流風格，讓開發者能更靈活地組織與維護它們。</p>
        </blockquote>
        <p>為了改善此一問題，Vite 採用的方法是將 HMR 掛在瀏覽器原生 ESM 上執行，由瀏覽器接管打包程序的部分工作，Vite 只要在瀏覽器請求來源程式碼時進行轉換與提供的動作，意即只處理當前顯示在螢幕上的畫面。</p>
        <p><br></p>
        <h5>2. 畫面更新緩慢：</h5>
        <p>如果曾使用過比較早期問世的打包工具，應該都曾有類似的經驗，隨著專案進度開發，每一次啟動或重建整個專案資料夾的速度效率會越來越緩慢，這和網站程式與資源的體積增加通常有直接關聯。即便部分工具會將我們即時編輯的檔案內容儲存到記憶體，只需要重新更新網頁就能獲取修改後的內容，而不需要重新啟動整個開發服務器。然而，重新更新瀏覽器畫面，基本上也是要重新構建整個網頁的畫面，同時也會清除掉原本的狀態（我們可能就需要再重新操作一遍流程到想確認修改結果前的狀態）。</p>
        <p>為了改善這個問題，一種名為「模塊熱替換」（Hot Module Replacement，HMR）的技術誕生了，它可以讓瀏覽器在打包工具程式碼修改儲存後，立即重新渲染畫面被修改的部分，而不用整個頁面重新整理過。儘管多數工具都標配 HMR，隨著開發規模增長，文件修改後的內容仍然也需要幾秒甚至更長時間才能在瀏覽器上反映出來。</p>
        <blockquote class="is-info">
            <p>HMR 是一種前端開發工具，在它運作期間，允許開發者在編輯程式並儲存後，可以立即將新的模塊程式碼傳輸到瀏覽器進行更新，而不需要使用者手動重新更新瀏覽器。許多前端開發框架及工具都有使用 HMR，像是 Vite、Nuxt、React、Angular、Svelte、Webpack......等族繁不及備載，儼然已是現代各大前端框架廣泛使用的工具。</p>
        </blockquote>
        <p>同樣都有 HMR，Vite 的作法則是將 HME 掛在瀏覽器原生的 ESM 上執行，藉此提升畫面即時渲染的速度，無論是在本機端專案的冷啟動，或是專案改動時的熱模組更新，速度都相當卓越，大大提升開發者的「使用者體驗」。</p>
        <p>Vite 中文文件原文 <a href="https://cn.vitejs.dev/guide/why.html" target="_blank">为什么选 Vite</a> 一文有更詳細完整的解釋，有興趣深入瞭解者可自行點擊觀看。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、環境安裝</h2>
        <p>目前應該已經很少開發者會遇到此問題，但還是不免俗提醒一下：由於 Vite 將部分任務轉移給瀏覽器內建的 ESM，因此開發者編譯使用的瀏覽器必須支援原生 ESM。正常來說，現代主流瀏覽器皆已支援所有最新的 JavaScript 與 CSS 特性，倘若你建構的 Vite 專案在瀏覽器上真的有問題卻又遲遲找不出具體原因，或許試著檢查看看自己使用的瀏覽器版本是否過舊。</p>
        <h3>Node.js：</h3>
        <p>與多數開發工具一樣，要使用 Vite 必須先確認工作環境是否有安裝 <a href="https://nodejs.org/en/">Node.js</a>，而且版本必須在 18 以上。</p>
        <p>假設不確定有沒有安裝或安裝完後想確認是否成功安裝 Node.js，可以開啟終端機輸入下方指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">node -v</code></pre>
        </div>
        <p>如果有安裝，則終端機會回傳目前工作環境使用的版本，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">v18.12.1</code></pre>
        </div>
        <p><br></p>
        <h3>建立專案：</h3>
        <p>Vite 提供 NPM、Yarn、PNPM、Bun 四種指令語言，本系列文章統一採用 NPM。</p>
        <p>首先，到你存放專案的指定位置，或是透過帶有終端機功能的編輯器（如 VS Code）也行，輸入以下指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm create vite@latest</code></pre>
        </div>
        <p>於是 Vite 會開始詢問一些安裝 packages 需要的選項設定，一共有這些問題項目：</p>
        <h5>1. Project name？</h5>
        <p>專案資料夾名稱，假設我們命名為 <b>vite_project</b>。</p>
        <h5>2. Select a framework？</h5>
        <p>會列出 Vite 目前所有支援的前端框架，這裡我選擇使用 Vue。</p>
        <h5>3. Select a variant？</h5>
        <p>詢問要使用哪一種 JavaScript 變體或超集，譬如 TypeScript、Nuxt 之類的，個人選擇使用原生的 JavaScript。</p>
        <figure>
            <img src="/images/learn/js/vite-1-2.jpg">
        </figure>
        <p>這樣基本的 Vite package 設定檔就完成了，如果還想簡化以上步驟，Vite 也有提供單行設定指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm create vite@latest project-name -- --template vue</code></pre>
        </div>
        <p><b>project-name</b> 請自行替換要命名的專案資料夾名稱，後面的 <b>--template vue</b> 則可以直接指定要安裝哪一種框架語言的模板。</p>
        <p>不管你選擇哪一種安裝指令，產出的內容都是一樣的，進入專案資料夾內，會看到以下檔案結構：</p>
        <figure>
            <img src="/images/learn/js/vite-1-3.jpg">
        </figure>
        <p>如果使用過別款打包工具或開發工具，對這樣的結構組成應該不陌生。不過目前這樣也僅僅只是建立好 Vite 本身的基礎設定而已，Node.js 用來管理各種工具與存放開發指額外自行安裝套件的 <b>node_modules/</b> 資料夾並沒有在結構裡面，沒有它就無法執行專案開發過程所需的 <b>npm</b> 各項指令，所以我們需要再自行安裝它。</p>
        <figure>
            <img src="/images/learn/js/vite-1-4.jpg">
            <figcaption>在沒有 <b>node_modules/</b> 資料夾的情況下直接執行 <b>npm</b> 指令會出現無法執行的警告訊息。</figcaption>
        </figure>
        <p>安裝指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install</code></pre>
        </div>
        <p>安裝完成後就可以執行運行指令了：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm run dev</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vite-1-5.jpg">
        </figure>
        <p>假如正常運作，終端機會建立一個本機端的網址，我們可以從該網址看到 <b>vite_project</b> 的畫面，這個畫面對應的就是 <b>index.html</b> 的內容，也就是 Vite 預設的畫面。</p>
        <figure>
            <img src="/images/learn/js/vite-1-6.jpg">
        </figure>
        <p>那前面有提過，Vite 也有導入 HMR 技術，所以我們可以試著修改一下程式碼，測試看看在不手動更新瀏覽器的情況下，單純修改檔案內容並儲存，畫面是否就能自動立即更新編輯後的畫面。在 <b>src</b> 資料夾內找到 <b>App.vue</b> 檔案，打開它，其中有一行程式碼長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;HelloWorld msg="Vite + Vue" /&gt;</code></pre>
        </div>
        <p>現階段先不討論它的程式意義，我們只要知道該組件標籤裡面的 <em>msg</em> 屬性的值，就是對應首頁畫面斗大的「Vite + Vue」標題字樣，現在將其改成「Hello World!」後儲存檔案，然後回頭查看瀏覽器畫面：</p>
        <figure>
            <img src="/images/learn/js/vite-1-7.jpg">
        </figure>
        <p>會發現畫面自動更新成我們修改的內容了，這樣我們就不用每次要確認修改畫面都要按一次重新整理的按鈕，儘管可能對一些人來說多按一次重新整理按鈕也不過是一瞬間的事情，但所謂積沙成塔嘛，而且對多螢幕開發者來說，不用手動整理網頁，意味著可以直接專注在編輯器一邊撰寫程式碼一邊確認畫面，不用視窗切換來切換去，工作效率自然也有所提升。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、結構說明</h2>
        <p>雖然執行完 Vite 與 <b>node_modules/</b> 的安裝後就能順利進入開發編譯，但這還不是 Vite 這套工具的完全體，尚有許多環境與變數要調整設定、或安裝擴充套件來使整個 Vite 專案更飽滿。不過在那之前，我們先來了解一下 <em>npm create vite</em> 裝進來的檔案各自有什麼用途，以及它的 Vue 結構是怎麼樣建置的。</p>
        <p>如果要轉成 MPA 當然也可以，不過我們需要自行手動調整結構，只是這部分不在本文章討論範圍內，所以暫時不作相關探討。</p>
        <figure>
            <img src="/images/learn/js/vite-1-8.jpg">
        </figure>
        <p><br></p>
        <h3>設定相關：</h3>
        <h5>package.json</h5>
        <p>但凡基於 Node.js 為依賴的開發工具都有此配置文件，用來描述專案的元資料與依賴關係，比如記錄專案的名稱、版本、使用什麼框架語言等資訊。</p>
        <h5>package-lock.json</h5>
        <p>由 NPM 自動生成的文件，在不同環境執行 <em>npm install</em> 時，NPM 也會根據 <b>package.json</b> 記錄的設定更新 <b>package-lock.json</b> 內容，用來確保專案在不同作業環境下安裝版本與擴充套件的一致性，避免版本差異引起運行上的問題。</p>
        <p>基本上身為開發者的我們不太需要也不應該去手動更改這個文件的內容。</p>
        <h5>vite.config.js</h5>
        <p>屬於 Vite 建構工具的配置文件，開發者可以在此文件自定義 Vite 的行為，例如設定開發服務器、自訂打包規則、設置路由、代理、套件等。</p>
        <p><br></p>
        <h3>Vue 相關：</h3>
        <h5>index.html</h5>
        <p>Vite 建立的單一 HTML 文件，其結構如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;!doctype html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8" /&gt;
        &lt;link rel="icon" type="image/svg+xml" href="/vite.svg" /&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
        &lt;title&gt;Vite + Vue&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id="app"&gt;&lt;/div&gt;
        &lt;script type="module" src="/src/main.js"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
        </div>
        <p>當然，這只是 Vite 提供的示範頁面而已，開發者可以根據個人或團隊需求調整整個結構。不過從 Vite 建立的文件來看，預設應該是採用 SPA 形式的網頁應用架構，判斷根據是它整個專案資料夾只有一個 HTML 檔案，且內容也只有一個 <em>&lt;div id="app"&gt;&lt;/div&gt;</em> 元素標籤，表示整個網頁的內容都透過 Vue 組件管理與控制。</p>
        <p><br></p>
        <h5>public/</h5>
        <p>用來存放不需要被建構處理的「靜態資源」，例如網站的圖標 <b>.ico</b>，或是引用外部套件的程式腳本，像 <b>jquery.min.js</b>，又或者不會修改的圖片等。這些檔案在 Vite 建構打包時直接輸出而不會被修改或壓縮。</p>
        <p>要在 HTML 添加、載入這些靜態資源，引用路徑相對單純。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;img src="/vite.svg"&gt;</code></pre>
        </div>
        <p>Vite 初始建立的 <b>public/</b> 資料夾裡面沒有特別規劃，只有一張用來示範用的 <b>vite.svg</b> 向量圖形。所以一般我們會再依據靜態資源的檔案類型分類管理，例如自行新增 <b>images/</b> 與 <b>js/</b> 資料夾，分別存放影像資源與 JavaScript 外部腳本。</p>
        <p><br></p>
        <h5>src/</h5>
        <p>Vite 初始建立的 <b>src/</b> 資料夾是用來存放專案原始程式碼的主要目錄。在這個資料夾中，你將會編寫和組織專案的各種原始程式碼，包括 JavaScript、Vue 單一檔案元件（<b>.vue</b>）、CSS、以及其他靜態資源。</p>
        <p>● <b>assets/</b></p>
        <p>用於存放項目中的靜態資源，如圖片、字體檔案等，這些資源會被建構工具處理，並且可以透過相對路徑在程式碼中引用，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;img src="./assets/vue.svg"&gt;</code></pre>
        </div>
        <p>和 <b>public/</b> 資料夾一樣，初始化沒有對資源進行預想配置，所以通常我們需要額外規劃這些資源的檔案分類。</p>
        <p>與 <b>public/</b> 一樣都是用來放置靜態資源，但是放在 <b>assets/</b> 的檔案在打包建構時可以決定是否要進行一些「加工處理」，例如壓縮或合併等動作。</p>
        <p>● <b>components/</b></p>
        <p>用於存放項目的可重複使用元件，通常是 Vue 單一文件元件。這些元件可以在專案的各個地方進行複用，提高程式碼的可維護性和可重複使用性。</p>
        <p>雖然是初始化即配置的資料夾，但並非整個專案一定要存在的資料夾，意即如果用不到它可以刪除且並不影響專案運行。</p>
        <p>● <b>App.vue</b></p>
        <p>如果我們的 Vite 選擇框架語言是 Vue.js 就會建立此檔案，這支檔案是整個網頁應用的根組件，除了包含網頁應用的整體布局與結構，還有頂層的路由和狀態管理等配置。</p>
        <p>● <b>main.js</b></p>
        <p>整個應用的入口文件，用於初始化 Vue 應用並掛載根元件（<b>App.vue</b>）。我們可以在這支檔案進行一些全域配置，如路由、狀態管理等。</p>
        <p>初始程式碼內容為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>
        </div>
        <p>● <b>style.css</b></p>
        <p>預設的 CSS 樣式表檔案，即 <b>main.js</b> <em>import</em> 的 CSS 來源。如果依照原始設定，這個樣式表將會是全域套用的，如不想更動原來的結構配置，那麼這支樣式表通常會用來設定一些整個網頁應用共用的樣式屬性。</p>
        <p><br></p>
        <p>除了以上這些隨著 Vite create 一起建立的初始檔案與資料夾配置外，我們也可以根據需要自行添加其他常見的資料夾配置：</p>
        <p>● <b>pages/</b></p>
        <p>如果我們使用的框架是 Vue.js 或類似的其他框架，這個資料夾通常用來存放網頁應用功能項目的頁面組件，每個頁面可能會有一個對應的資料夾，裡頭包含了該頁面的 Vue 單一檔案元件、相關的 CSS 檔案等。</p>
        <p>舉例來說網站有首頁、關於我們、最新消息等功能頁面，那麼結構規劃時可以調整成：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">src
└── pages
    ├── Home
    │   ├── Home.vue             # 首頁組件
    │   ├── components           # 首頁特定組件
    │   │   ├── Banner.vue       # 首頁輪播圖組件
    │   │   ├── Marquee.vue      # 首頁跑馬燈組件
    │   │   └── ...
    │   ├── assets               # 首頁特定靜態資源
    │   │   ├── banner.jpg       # 首頁輪播圖片
    │   │   ├── styles.css       # 首頁樣式表
    │   │   └── ...
    │   └── utils                # 首頁特定工具函式
    │       ├── api.js           # 首頁 API 請求函式
    │       └── ...
    ├── About
    │   ├── About.vue            # 關於我們組件
    │   ├── components           # 關於我們特定組件
    │   │   ├── TeamList.vue     # 團隊成員列表组件
    │   │   ├── Intro.vue        # 資訊介紹组件
    │   │   └── ...
    │   ├── assets               # 關於我們特定靜態資源
    │   │   ├── team.jpg         # 團隊圖片
    │   │   ├── styles.css       # 關於我們樣式表
    │   │   └── ...
    │   └── utils                # 關於我們特定工具函式
    │       ├── fetchTeam.js     # 獲取團隊資料的函式
    │       └── ...
    └── ...</code></pre>
        </div>
        <p>以上只是舉例而已，不見得是公認的結構寫法，一切端看公司或合作團隊的習慣規劃。</p>
        <p>● <b>utils/</b></p>
        <p>用於存放網頁應用的工具函式、幫助函式等。這些工具函式可以被專案中的其他程式碼引用和調用，提供一些共享的功能。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、使用套件</h2>
        <p>為了加速網頁開發效率與效能優化，現今的技術與優化工具可謂百花齊放，縱然 Vite 本身已經提供網頁開發的基本所需，但還是有不少第三方套件可以提供更高效率的服務，事實上，Vite 之所以啟動能這麼迅速，一部分原因也是捨棄掉了許多實用的第三方套件，例如 Vue router、Pinia 等，這些套件在其他框架大多都已經包含在安裝指令裡，Vite 則是要再額外手動自己裝進來，算是使用 Vite 的一個小小缺點吧。但基本上大多數的開發工具都可以透過 Node.js 安裝這些第三方套件到自己專案內作使用，Vite 自然也不例外。</p>
        <p>Vite 用來管理這些第三方套件引用的相關設定主要集中在 <b>vite.config.js</b> 這支檔案裏面，以下是其初始的程式碼內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})</code></pre>
        </div>
        <p>可以看到它的程式碼結構採用 ESM 的語法，透過 <em>import</em> 和 <em>export</em> 來定義與配置外部套件。每個第三方套件的安裝與引用方式不見得都一樣，不過通常它們的文件都會提供相關引用設定流程，倒也不用太擔心不知道該怎麼使用。</p>
        <p>以下是比較多人使用或推薦的第三方套件：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">推薦指數</div>
                    <div class="f-f3">套件名稱</div>
                    <div class="f-f5">用途</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★★</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/vue-router" target="_blank" >vue-router</a></div>
                    <div class="f-f5">Vue Router 是 Vue.js 官方提供的路由管理器，主要用於 SPA 網頁應用中以實現客戶端路由。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★★</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/pinia" target="_blank" >pinia</a></div>
                    <div class="f-f5">取代 vuex 成為 Vue 3 最推薦的狀態管理工具。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/eslint" target="_blank" >eslint</a></div>
                    <div class="f-f5">用來檢查 JavaScript 程式碼中的潛在問題或風格錯誤，提高程式碼的一致性、安全性與易讀性。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/" target="_blank" >Prettier</a></div>
                    <div class="f-f5">用來優化程式碼，使其風格保持一致，常與 ESLint 一同搭配使用。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★☆☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/vite-plugin-restart" target="_blank" >vite-plugin-restart</a></div>
                    <div class="f-f5">如果在編譯過程中修改了 vite.config.js 文件的設定，就必須重新啟動 Vite 開發服務器，而此套件可以提供自動監聽並重啟的服務。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/unplugin-vue-components" target="_blank" >unplugin-vue-components</a></div>
                    <div class="f-f5">Vue 的組件自動 import，可以省略在目標文件引用組件需要自行添加 <em>import</em> 指令的步驟。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/unplugin-auto-import" target="_blank" >unplugin-auto-import</a></div>
                    <div class="f-f5">Vue 3 hooks 自動 import。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/vite-plugin-compression2" target="_blank" >vite-plugin-compression</a></div>
                    <div class="f-f5">使用 gzip 及 brotli 來壓縮靜態資源，以減少輸出檔案的大小。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★☆☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/@vheemstra/vite-plugin-imagemin" target="_blank" >vite-plugin-imagemin</a></div>
                    <div class="f-f5">用來壓縮圖片，減少檔案大小以提升網頁讀取性能。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★☆☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/@vitejs/plugin-legacy" target="_blank" >vitejs-plugin-legacy</a></div>
                    <div class="f-f5">Vite 的 ESM 任務主要是基於瀏覽器原生的 ESM，這個套件是用來支援那些本身沒有 ESM 功能的舊版本瀏覽器，讓 Vite 也能正常運作。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★☆☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/vue-global-api" target="_blank" >vue-global-api</a></div>
                    <div class="f-f5">在同時安裝 eslint 與 unplugin-auto-import 套件的環境下，後者可能會因為前者產生報錯提示，這個套件主要就是用來解決這個問題。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/axios" target="_blank" >axios</a></div>
                    <div class="f-f5">如果專案有需要串接 API，這個套件是比較流行的選擇。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★★☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/sass" target="_blank" >sass</a></div>
                    <div class="f-f5">CSS 預處理器的一種，使開發 CSS 更有效率。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">★☆☆</div>
                    <div class="f-f3"><a href="https://www.npmjs.com/package/tailwindcss" target="_blank" >tailwindcss</a></div>
                    <div class="f-f5">Tailwind CSS 是現在不少開發工具喜好的 CSS 框架，具有快速建立網頁外觀 UI 的優點。</div>
                </div>
            </div>
        </div>
        <p>這裡先不一口氣把需要的套件全部裝進來，而是會隨著學習進程推進再陸續安裝所需的套件，如此也比較容易感受到第三方套件與 Vite 原生寫法之間的便利差異。在官方文件中，是以支援舊版瀏覽器也能支援 ESM 的套件 <b>plugin-legacy</b> 作為示範，我們依樣畫葫蘆照著指示進行安裝：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm add -D @vitejs/plugin-legacy</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vite-1-9.jpg">
        </figure>
        <p>這樣就能完成 <b>plugin-legacy</b> 的安裝了，安裝進來的檔案會存放於 <b>node_modules/</b> 資料夾中。除了安裝之外，還需要在設定檔把該套件引用進來，才能讓 Vite 知道要去使用這個套件，以及依照文件裡定義的參數去運作。以下是 <b>vite.config.js</b> 設置內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
})</code></pre>
        </div>
        <p>然而不是所有的第三方套件都是在 <b>vite.config.js</b> 作設定，有的會告訴我們說要在 <b>main.js</b> 之類的入口文件作引用的動作，在閱讀套件相關說明文件時需多加留意。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、參考資料</h2>
        <dl>
            <dd><a href="https://v4.vitejs.dev/" target="_blank">Vite</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=rNQIA0Fe9KQ&list=PLbOfcOk7bN42Kzp1wQsoLuU0vPUmFBe-X&index=1" target="_blank">Vue3 + Vite 快速上手 Get Startrd</a></dd>
            <dd><a href="https://www.explainthis.io/zh-hant/swe/what-is-vite" target="_blank">Vite 是什麼? 為什麼要用 Vite? 它解決了哪些問題? 又是如何解決?</a></dd>
            <dd><a href="https://tw511.com/a/01/48012.html" target="_blank">基於 vite 建立 vue3 全家桶專案（vite + vue3 + tsx + pinia）</a></dd>
            <dd><a href="https://juejin.cn/post/7256723839941476412" target="_blank">vite的插件推荐+vite环境基础配置+vite打包项目的常用优化</a></dd>
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