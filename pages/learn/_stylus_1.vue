<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="15" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、如何安裝</a></li>
            <li><a href="#act2">二、如何編譯</a></li>
            <li><a href="#act3">三、指令列表</a></li>
            <li><a href="#act4">四、Autoprefixer</a></li>
            <li><a href="#act5">五、預處理器語言</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <figure>
            <img src="/images/learn/css/stylus-1.png">
        </figure>
        <p><a href="https://stylus-lang.com/" target="_blank">Stylus</a> 是 CSS 的預處理器工具之一。什麼是預處理器？預處理器（Preprocessor）是程式中處理輸入資料，產生能用來輸入到其他程式的資料的程式。看上去有點饒舌，但沒關係，我們只要知道 CSS 的預處理器能讓我們更快速、方便地編寫 CSS 樣式即可。而本篇文章將來對 Stylus 的用途、語法、與其他預處理器的異同、優缺點等作一系列的介紹。如果你在接觸 Stylus 之前已經學會 Sass，那麼 Stylus 的語法應該也難不倒你。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、如何安裝</h2>
        <p>首先，我們得知道 Stylus 是來自於 <a href="https://nodejs.org/en/">Node.js</a>，因此使用之前，必須先確認工作電腦是否有安裝 Node.js 環境，我們可以打開命令提示字元，透過下方指令確認電腦是否已有安裝：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">node -v</code></pre>
        </div>
        <p>這個指令是用來查詢 Node.js 的版本，假如電腦已經安裝 Node.js，命令提示字元會回應電腦目前安裝的版本號。如果沒有，請先執行下載與安裝的動作。</p>
        <p>安裝好 Node.js 後，接著要透過其核心指令 <em>npm</em> 來安裝 Stylus 了，完整指令語法為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install stylus -g</code></pre>
        </div>
        <p>指令中的 <em>-g</em> 指的是全域安裝，經由全域安裝我們就可以在任何專案直接執行 Stylus 的操作。換句話說，安裝 Stylus 的實質步驟其實就只有這一步而已。</p>
        <p>安裝完成的畫面：</p>
        <figure>
            <img src="/images/learn/css/stylus-13.jpg">
        </figure>
    </div>
    <div class="text-block" id="act2">
        <h2>二、如何編譯</h2>
        <p>Stylus 有多種編譯的方法，分別是針對單一或多個檔案，又或是編譯整個資料夾內的 .styl 檔案，以及將檔案編譯到其他資料夾位置，更甚者還有即時監聽編譯的服務，以下個別進行介紹。</p>
        <p><br></p>
        <h3>單一檔案編譯：</h3>
        <p>Stylus 樣式表的副檔名為 <b>.styl</b>，所以當我們要開始開發專案的時候，記得先在專案目錄裡建立 <b>.styl</b> 格式的檔案，例如：</p>
        <figure>
            <img src="/images/learn/css/stylus-2.jpg">
        </figure>
        <p>假設我們已經在 <b>.styl</b> 檔案寫完樣式，現在要將其編譯輸出可讓瀏覽器閱讀的 <b>.css</b> 文件，請輸入下方指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus index.styl</code></pre>
        </div>
        <p><b>index.syle</b> 是範例中的檔案名稱，可自行更換專案裡使用的命名。編譯成功則會返回 compiled 輸出檔案之名稱的訊息，如：</p>
        <figure>
            <img src="/images/learn/css/stylus-3.jpg">
        </figure>
        <p>此時再去檢視專案目錄，就可以看到資料夾內多出與 <b>.styl</b> 檔案名稱相同的 <b>.css</b> 文件。</p>
        <figure>
            <img src="/images/learn/css/stylus-4.jpg">
        </figure>
        <figure>
            <img src="/images/learn/css/stylus-5.jpg">
            <figcaption>左邊是 <b>.styl</b> 格式的原始碼，右邊則是輸出後的 <b>.css</b> 格式。</figcaption>
        </figure>
        <p><br></p>
        <p>除了直接編譯輸出之外，也可以在指令裡加入 <em>--compress</em> 指令，使 Stylus 輸出成經過壓縮的 CSS 文件，以節省檔案空間。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus --compress index.syle</code></pre>
        </div>
        <figure>
            <img src="/images/learn/css/stylus-6.jpg">
        </figure>
        <p><br></p>
        <h3>多個檔案編譯：</h3>
        <p>如果同時有好幾個 <b>.styl</b> 檔案需要處理，我們可以一次全部執行，不需要逐一編譯每一個檔案，舉例來說：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus p1.styl p2.styl p3.styl</code></pre>
        </div>
        <p><br></p>
        <h3>資料夾編譯：</h3>
        <p>當然，如果 <b>.styl</b> 文件很多，即便可以一次處理全部，但要一個個輸入檔案名稱不免仍覺得麻煩，且多數開發者也無法容許各種類型的檔案文件通通擁塞在同一層資料夾結構裡。通常我們會依據格式類型將檔案分門別類，例如 <b>.styl</b> 檔案通通放進名稱為 <b>styl</b> 的資料夾，這種情況下我們就可以直接編譯整個資料夾，省去逐一輸入檔名的麻煩。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus styl</code></pre>
        </div>
        <p>指令中的 <em>styl</em> 為 <b>.styl</b> 文件所屬的資料夾名稱。</p>
        <figure>
            <img src="/images/learn/css/stylus-7.jpg">
        </figure>
        <figure>
            <img src="/images/learn/css/stylus-8.jpg">
        </figure>
        <p><br></p>
        <h3>編譯至其他位置：</h3>
        <p>一路看範例到這裡的你應該已經嗅到不對勁的氛圍，沒錯，目前無論是單一檔案、多個檔案還是整個資料夾編譯，輸出的 <b>.css</b> 文件都生成於與 <b>.styl</b> 相同的資料夾層級。通常我們會將預處理器的檔案與生成的檔案分開管理，才不會混淆在一起。那麼我們要如何將 <b>.styl</b> 生成到指定的資料夾呢？</p>
        <p>方式其實不難，只要在編譯指令間加入 <em>--out</em>，後方加上要導出的資料夾名稱即可，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus styl --out css</code></pre>
        </div>
        <p>操作結果：</p>
        <figure>
            <img src="/images/learn/css/stylus-9.jpg">
        </figure>
        <p>如果是更深層的資料夾目錄，則指名路徑即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus styl --out public/css</code></pre>
        </div>
        <p><br></p>
        <h3>監聽編譯：</h3>
        <p>透過 <em>watch</em> 指令，可以令 Stylus 即時監測 <b>.styl</b> 檔案的變化，只要一儲存檔案，指令視窗便會自動執行編譯的動作，如此一來就不需要每編輯一次檔案就要下達一次編譯的指令了。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus --watch index.styl</code></pre>
        </div>
        <figure>
            <img src="/images/learn/css/stylus-10.jpg">
        </figure>
    </div>
    <div class="text-block" id="act3">
        <h2>三、指令列表</h2>
        <p>除了上一章節介紹的指令之外，Stylus 的指令其實還有很多，以下列舉幾項個人認為一般開發者可能比較常使用的指令：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f2">指令</div>
                    <div class="f-f1">縮寫</div>
                    <div class="f-f4">用途</div>
                    <div class="f-f3">範例</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--compress</em></div>
                    <div class="f-f1"><em>-c</em></div>
                    <div class="f-f4">輸出壓縮格式的 CSS 文件</div>
                    <div class="f-f3">sylus -c file.styl</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--out</em></div>
                    <div class="f-f1"><em>-o</em></div>
                    <div class="f-f4">將 <b>.styl</b> 編譯輸出到外層其他路徑資料夾</div>
                    <div class="f-f3">stylus file1 -o file2</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--watch</em></div>
                    <div class="f-f1"><em>-w</em></div>
                    <div class="f-f4">即時監測 <b>.styl</b> 變化</div>
                    <div class="f-f3">stylus -w file.styl</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--css</em></div>
                    <div class="f-f1"><em>-C</em></div>
                    <div class="f-f4">將 CSS 文件轉換為 Stylus 格式</div>
                    <div class="f-f3">stylus -C file.css</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--sourcemap</em></div>
                    <div class="f-f1"><em>-m</em></div>
                    <div class="f-f4">輸出 CSS Source Maps 文件</div>
                    <div class="f-f3">stylus -m file.styl</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>--version</em></div>
                    <div class="f-f1"><em>-V</em></div>
                    <div class="f-f4">查詢 Stylus 目前的版本</div>
                    <div class="f-f3">stylus -V</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>因為指令是可以在一行內輸入多個指令然後一次送出去執行的，這裡分享個自己常使用的懶人指令語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus -w styl -o css</code></pre>
        </div>
        <p>這個指令的意思為當 <em>styl</em> 資料夾裡的 <b>.styl</b> 文件一旦有所變更，儲存檔案時就會立即執行編譯，並輸出 CSS 文件至外層的 <em>css</em> 資料夾中。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、Autoprefixer</h2>
        <p><a href="https://www.npmjs.com/package/autoprefixer-stylus" target="_blank">Autoprefixer</a> 是用來處理部份 CSS3 語法在不同瀏覽器需要添加指定前綴的工具，如果有瀏覽器兼容性要求的開發者建議安裝這個套件。安裝指令為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">npm install autoprefixer-stylus -g</code></pre>
        </div>
        <p><br></p>
        <p>執行 Stylus 編譯時的指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus -u autoprefixer-stylus index.styl</code></pre>
        </div>
        <p>結合懶人包：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">stylus -w -u autoprefixer-stylus styl -o css</code></pre>
        </div>
        <p>套件實際運用上的效果展示：</p>
        <figure>
            <img src="/images/learn/css/stylus-11.jpg">
            <figcaption>這是沒有使用 Autoprefixer，一般編譯輸出的結果。</figcaption>
        </figure>
        <figure>
            <img src="/images/learn/css/stylus-12.jpg">
            <figcaption>使用 Autoprefixer 編譯輸出的結果。</figcaption>
        </figure>
    </div>
    <div class="text-block" id="act5">
        <h2>五、預處理器語言</h2>
        <p>CSS 的預處理器主流有三款，分別是 Sass、Less 與 Stylus。其中以 Sass 的發展最早，以換行與縮排的方式大幅簡化 CSS 的語法編寫方式，但後來也已兼容傳統添加分號、花括號的寫法，成為比 Sass 語法更容易閱讀的 SCSS。</p>
        <p>Less 則以 JavaScript 為依歸，毋須像 Sass 使用前必須得先安裝 Ruby、Compass 等額外環境，Less 只需將 <b>less.js</b> 下載下來就能直接在專案裡使用，不經編譯的動作即可在網頁呈現 <b>.less</b> 格式的樣式表。然而相對 Sass 而言，Less 的編寫並不若其那般簡單自由。</p>
        <p>Stylus 來自 Node.js，是三者中最晚誕生的預處理器，知名度與使用度並未前兩者廣泛，不過現今的網頁專案開發許多都會利用 Node.js，幾乎每名網頁工程師的電腦都有安裝，因此如果使用 Stylus 只需要幾個 <b>npm</b> 指令就可以搞定。</p>
        <p><br></p>
        <p>我們可以藉由下表比較一下三款預處理器語言：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0"></div>
                    <div class="f-f1">Sass</div>
                    <div class="f-f1">Less</div>
                    <div class="f-f1">Stylus</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">發展</div>
                    <div class="f-f1">2007</div>
                    <div class="f-f1">2009</div>
                    <div class="f-f1">2010</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">媒介</div>
                    <div class="f-f1">Ruby、Compass</div>
                    <div class="f-f1">JavaScript</div>
                    <div class="f-f1">Node.js</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">自由度</div>
                    <div class="f-f1">高</div>
                    <div class="f-f1">普通</div>
                    <div class="f-f1">高</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">符號省略</div>
                    <div class="f-f1">可</div>
                    <div class="f-f1">不可</div>
                    <div class="f-f1">可</div>
                </div>
            </div>
        </div>
        <p>它們雖各有優缺，卻沒有絕對的好或不好，只有適不適合自己的開發需求。選擇適當的 CSS 預處理器語言並導入專案裡，就能讓專案開發更加輕鬆、快速。以上就是 Stylus 的基本簡介及使用方法，下一篇文章將介紹 Stylus 的語法和函數。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://stylus-lang.com/" target="_blank">stylus</a></dd><!-- https://stylus.bootcss.com/ -->
            <dd><a href="https://www.jianshu.com/p/c22dd5d95bf2" target="_blank">css预处理器stylus基本用法 - 简书</a></dd>
            <dd><a href="https://developer.ibm.com/zh/technologies/web-development/articles/wa-stylus-css-preprocessor-enhancer/" target="_blank">Stylus — 一剂 CSS 预处理的增强剂</a></dd>
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
