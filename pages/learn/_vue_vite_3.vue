<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Vite CSS 結構配置' },
        { id: 2, title: '二、導入 CSS 預處理器' },
        { id: 3, title: '三、使用 PostCSS' },
        { id: 4, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="61" fileType="learnList" />
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
        <p>如果先前已有使用過別種框架或工具實現 SPA 網頁應用，應該都知道將 CSS 寫在各自的單元組件是一種常見且也是蔚為主流的做法，所以 Vite 也不例外。這種方式一般稱之為「組件範圍的 CSS」或「作用域 CSS」，它有以下這些優點：</p>
        <p>1. 封裝性：</p>
        <p>將 CSS 寫在組件中可以使組件更加獨立且可重複使用，每個組件的樣式只適用於該組件，不會影響其他組件，從而增加了程式碼封裝性與可維護性。</p>
        <p>2. 可讀性：</p>
        <p>將相關的樣式和組件放在同一文件中，可以更輕鬆地理解和維護程式碼。開發人員可以在同一文件中查看組件的結構和樣式，而不需要在多個文件之間切換。</p>
        <p>3. 分割程式碼：</p>
        <p>在使用模組化開發的情況下，組件範圍的 CSS 可以與組件程式碼一起進行代碼分割和載入，從而實現更好的性能和可伸縮性。</p>
        <p><br></p>
        <p>雖說在使用 Vite 之前我已經先碰過 Nuxt，也知道 Nuxt 預設同樣採用作用域 CSS 來定樣各組件的樣式，但當時我還是習慣傳統 MPA 將 CSS 集中在一支檔案，讓所有頁面共用它。說實在這對追求網頁讀取效率的 SPA 而言這並不是很好的做法，藉由這次學習 Vite 的機會，順道讓自己習慣將 CSS 限定在組件範圍內做開發。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>專案結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">index.html
src
├── assets
│    ├── base.css
│    ├── main.css
│    └── ...
├── components
├── router
│    └── index.js
├── views
│    ├── HomeView.vue
│    └── AboutView.vue
├── App.vue
└── main.js</code></pre>
        </div>
        <p>這個結構是先前 <em>create vue@3</em> 創建的 Vite 專案，通常 Vite 專案裡置入 CSS 的方式不外乎兩種，第一種是直接寫在組件的 <em>&lt;style&gt;</em> 標籤裡面，這種我們稱為組件範圍內的 CSS 或 作用域 CSS。另一種則是單獨寫在 <b>.css</b> 樣式表文件，讓 <b>main.js</b> 入口文件去引用它。</p>
        <p>前面有提過，現代 SPA 網頁應用的主要宗旨是快速加載內容，同時兼顧可讀性與維護性，因此大多數的框架工具會將各功能套用的樣式，寫在撰寫該功能程式的組件裡，這樣一來，只有在該組件被渲染的時候才會去載入相關的 CSS 樣式。</p>
        <p>話是這麼說，但並不是所有的樣式都只會套用在某個頁面功能，總會有些各頁面共用的功能區塊，例如 Header、Footer、導覽列......等等，如果把這些功能套用的樣式屬性通通複製貼上到各個組件裡，那對維護的人而言無疑將會是一場災難。</p>
        <p>所以在 Vite 初始建立的範本裡，我們可以看到它將共用的內容獨立拉出來一個檔案 <b>base.css</b>，這個樣式表裡面的內容主要是針對 HTML 元素進行初始化，避免受各家瀏覽器不同的預設值造成樣式不一致的情況。</p>
        <p>然後由 <b>main.css</b> 來引用它：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@import './base.css';</code></pre>
        </div>
        <p>會發現其實它和組件彼此引用的思維很相像，都是父層使用 <em>import</em> 關鍵字去引用指定的目標進來。循著這個思路，我們可以自行建立 <b>header.css</b>、<b>footer.css</b> 等樣式文件，把共用功能的樣式屬性分門別類編寫進各自的樣式表裡，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">@import './base.css';
@import './header.css';
@import './footer.css';</code></pre>
        </div>
        <p>也可以集中寫在同一支檔案，命名 <b>layout.css</b> 之類的，總之取決於個人習慣。</p>
        <p>至於 <b>main.css</b> 又是從哪裡引用的？答案自然是入口文件 <b>main.js</b> 了：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import './assets/main.css'</code></pre>
        </div>
        <p>當然這些樣式表的名稱和位置都可以依據規劃自行做變更。</p>
        <p>也許會有人說：那我把這些共用的 CSS 寫在 <b>App.vue</b>，或是另外把那些共用功能拉出來做成 <b>components/</b> 裡面的子組件，比如 <b>Header.vue</b>，把與它相關的樣式集中在裡面，然後讓其他組件引用它。所以像前面 Vite 初始範例，要把 <b>assets/</b> 資料夾裡面的 <b>.css</b> 內容轉移到其他適當的組件，讓整個結構完全不存在 CSS 文件確實是可行的，說到底這其實也不過是取決各路開發者自身或團隊的習慣與共識而已，並沒有絕對的標準規範。</p>
        <p><br></p>
        <p>說完獨立樣式表檔案的部份，再來要看的是個別組件裡頭的 <em>&lt;style&gt;</em> 標籤，以 <b>App.vue</b> 為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;style scoped&gt;
    header {
        ...
    }
&lt;/style&gt;</code></pre>
        </div>
        <p>和以往我們熟知的 HTML 標籤格式沒有什麼區別，只是多了一條屬性 <em>scoped</em>，這個屬性是 Vue.js 提供的一種特性，用意是宣告該 <em>&lt;style&gt;</em> 標籤裡的 CSS 樣式僅對當前組件內的元素生效，而不會影響到其他組件或全域範圍，假設我們在 A 組件使用 <em>scoped</em> 並定義了 <em>p</em> 元素的樣式，那這個樣式只會在 A 組件的 <em>p</em> 元素作用，B 組件乃至其他組件中的 <em>p</em> 元素就不會被套用。這樣可以防止組件中的樣式與其他組件或全域樣式產生衝突，從而提高了組件的封裝性和可重用性。</p>
        <p>不過如果是 A 組件裡面嵌套了 B 組件，那麼 A 組件定義的樣式即便有設置 <em>scoped</em>，B 組件仍然會繼承 A 組件的樣式內容，所以像 <b>App.vue</b> 作為整個 Vite 網頁應用架構的根組件，有些人會習慣直接將全域套用的樣式寫在這裡面，不另外建立 CSS 文件，從而落實作用域 CSS「不需要在多個文件之間切換」的可讀性特點。</p>
        <p><br></p>
        <h3>Vue 3 提供給 style 元素的其他屬性：</h3>
        <p>除了前面提到的 <em>scoped</em> 之外，Vue 3 還支援了 <em>&lt;style&gt;</em> 另外兩個特殊的屬性：</p>
        <h5>1. <em>module</em>：</h5>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;style module&gt;
    ...
&lt;/style&gt;</code></pre>
        </div>
        <p>在專案打包到生產環境下，此屬性作用域範圍內的樣式屬性的 <em>.class</em> 或 <em>#id</em> 選擇器名稱會被添加 Hash 值，用來確保該樣式只會在該組件裡生效，不會影響到其他組件或全域範圍。例如：</p>
        <p><b>A.vue</b>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h1 class="title"&gt;Hello, world!&lt;/h1&gt;
&lt;/template&gt;

&lt;style module&gt;
    .title {
        font-size: 5rem;
        color: red;
    }
&lt;/style&gt;</code></pre>
        </div>
        <p>當 <b>A.vue</b> 組件渲染時，它將生成以下 HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;h1 class="_title_3o93j"&gt;Hello, world!&lt;/h1&gt;</code></pre>
        </div>
        <p>後面那串看起來像隨機字串的名稱就是該 <em>h1</em> 元素唯一的 Hash 值。假如一個組件內有好幾個元素都有用到 <em>.title</em>，那麼每個元素的哈希值也都會不一樣，這樣可以確保每個元素的樣式都是獨立的，不會受到其他元素影響。</p>
        <p><br></p>
        <h5>2. <em>lang</em>：</h5>
        <p>這個屬性用來指定 <em>&lt;style&gt;</em> 使用的 CSS 語言類型，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;style lang="scss"&gt;
    ...
&lt;/style&gt;</code></pre>
        </div>
        <p>那麼 Vite 在渲染的時候就會將此 <em>&lt;style&gt;</em> 識別為 Sass 的 SCSS 格式。除了 Sass 之外，其他熱門的預處理器如 Less、Stylus 等也都可以被識別，然而，並非直接添加 <em>lang</em> 就可以被判別，我們需要提前透過 NPM 安裝相應的預處理器語言，Vite 才能正常進行解析。</p>
        <p>有關具體使用方法會在下一個章節進行說明。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>我們先來看在沒有安裝預處理器套件之前，直接在 <em>&lt;style&gt;</em> 標籤定義 <em>lang</em> 屬性會發生什麼事：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;style lang="scss"&gt;
    ...
&lt;/style&gt;</code></pre>
        </div>
        <figure>
            <img src="/images/learn/js/vite-3-1.jpg">
        </figure>
        <p>Vite 會噴出錯誤訊息，大意是說找不到指定的預處理器依賴（dependency），因此不是我們說想使用哪一個 CSS 預處理器語言就能直接使用，還是必須得執行一些安裝步驟。不過，Vite 雖然不是非常推薦開發者使用預處理器語言進行開發，但它們還是有把熱門的幾款預處理器內設在 Vite 專案包裡面，所以我們不用自己上 NPM 社區去找相關套件安裝與設定方式，只需要安裝相應的預處理器依賴即可。</p>
        <p>SCSS 是 Sass 的其中一個格式，因此我們以 Sass 為例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm add -D sass</code></pre>
        </div>
        <p>等安裝跑完後，重新執行 <em>npm run dev</em>，就可以正常地在專案裡編寫 Sass 或 SCSS 格式的 CSS 預處理器語言了。</p>
        <p>其他熱門預處理器的安裝指令：</p>
        <p>less：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm add -D less</code></pre>
        </div>
        <p>stylus：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm add -D stylus</code></pre>
        </div>
        <p>可能有些調皮的人會問說：那我能不能不同組件使用不同 CSS 預處理器？答案是可以的，只要專案內有把需要使用的預處理器依賴都確認安裝進去，那麼要在 A 組件使用 SCSS，B 組件使用 Sass、C 組件使用 less......都不會影響編譯運作，只是這種做法無疑也是為他人和自己找麻煩而已。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>為什麼 Vite 官方不提倡使用預處理器撰寫網頁應用的樣式，以下是它們給出的解釋：</p>
        <blockquote>
            <p>由於 Vite 的目標僅為現代瀏覽器，因此建議使用原生 CSS 變數和實作 CSSWG 草稿的 PostCSS 外掛程式（例如 postcss-nesting）來編寫簡單的、符合未來標準的 CSS。</p>
        </blockquote>
        <p>而就我自己長年使用 SCSS 開發專案的經驗來說，預處理器肯定比起原生 CSS 方便許多，效率也快上幾十節，但這並不代表使用預處理器就沒有任何缺點，譬如當團隊想改用其他預處理器取代原本使用的工具，其實很難將整個程式碼無痛直接轉換另一種預處理器文件，尤其專案內已經使用該預處理器特有的功能或函式，處理起來就又會更加棘手了。</p>
        <p>所以非必要狀況下，我個人還是盡可能維持原生 CSS 寫作方式，唯獨預處理器諸多方便功能最為倚賴的「嵌套寫法」例外。在得知 Vite 以 PostCSS 作為預設開發預處理器之後，稍微研究了一下 PostCSS，發現它的擴充套件也有嵌套寫法的功能，設定方式也很簡單。</p>
        <p>首先，不管你是用 <em>create vue@3</em> 還是 <em>create vite@latest</em> 去創建 Vite 專案，<em>npm install</em> 之後專案 <b>node_modules/</b> 資料夾裡都會有一個 <b>postcss/</b> 資料夾，表示我們不需要另外自己手動安裝 PostCSS 基本功能──這裡只說基本功能，是因為 PostCSS 有許多擴充功能，例如 autoprefixer、postcss-nested、postcss-preset-env 等，但這些套件並不包含在一開始創建的 Vite 專案裡面，如果我們需要這些功能，仍必須透過 <em>npm</em> 手動安裝並於設定檔引用它。</p>
        <p>以我個人最需要的巢狀嵌套寫法為例，於終端器輸入以下指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install postcss-nested --save-dev</code></pre>
        </div>
        <p>接著開啟 <b>vite.config.js</b> 文件，添加以下設定：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import postcssNested from 'postcss-nested';

export default defineConfig({
    plugins: [
        postcssNested(),
    ],
});
            </code></pre>
        </div>
        <p>（這裡我忽略 Vite 原本就有的 plugin-vue 沒一起貼進來，避免混淆。）</p>
        <p>重新啟動 <em>npm run dev</em>，便可以開始在組件裡面編寫 PostCSS。至於其他擴充套件使用步驟也都大致相同，故就不一一贅述，以下列出常見的幾款擴充套件：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">套件名稱</div>
                    <div class="f-f2">用途</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">autoprefixer</div>
                    <div class="f-f2">自動為 CSS 屬性添加供應商前綴。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">postcss-nested</div>
                    <div class="f-f2">支援巢狀嵌套寫法。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">postcss-preset-env</div>
                    <div class="f-f2">允許使用未來的 CSS 特性，並將其轉換為目前瀏覽器支持的版本。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">postcss-import</div>
                    <div class="f-f2">允許在 CSS 中使用 <em>@import</em> 語句，並將文件內容合併到一個文件中。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">postcss-custom-properties</div>
                    <div class="f-f2">允許在 CSS 中使用自定義屬性（CSS 變量）。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">postcss-url</div>
                    <div class="f-f2">用於處理 CSS 文件中的 URL，例如將相對路徑轉換為絕對路徑。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">cssnano</div>
                    <div class="f-f2">用於壓縮和最小化 CSS 代碼，以減少文件大小並提高加載速度。</div>
                </div>
            </div>
        </div>
        <p>看完一輪其實會發現大多功能在現代原生 CSS 都開始提供支援了，就連嵌套也有「CSS Nesting」這個 2023 年問世的新技術，凡較新版本的主流瀏覽器幾乎都可以識別我們在原生 CSS 裡寫的嵌套格式：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="poBaGJG" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/poBaGJG">
            CSS Nesting</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>只是舊版的瀏覽器普遍都不支援此功能：<a href="https://caniuse.com/?search=nesting" target="_blank">Can I use</a>，如果使用者瀏覽器尚未更新到 2023 年之後的版本，應該都無法判斷 CSS Nesting 寫的樣式，考量到相容性問題，短時間內可能還是得先繼續仰賴預處理器的協助。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://v4.vitejs.dev/" target="_blank">Vite</a></dd>
            <dd><a href="https://cn.vitejs.dev/guide/features.html#import-inlining-and-rebasing" target="_blank">Vite CSS 预处理器</a></dd>
            <dd><a href="https://blog.user.today/css-nesting-test/" target="_blank">測試瀏覽器原生 CSS Nesting 能不能完全做到 SCSS Nesting 的功能</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>