<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、如何檢測？' },
        { id: 2, title: '二、四大效能診斷' },
        { id: 3, title: '三、SEO 的白帽與黑帽' },
        { id: 4, title: '四、優化實作' },
        { id: 5, title: '五、網站效能工具的迷思' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="13" fileType="learnList" />
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
        <p>這篇文章接續前篇，是探討網頁優化項目的下篇，本文主要是要介紹目前時下最流行的網站效能評測工具──<a href="https://pagespeed.web.dev/" target="_blank">Google PageSpeed Insights</a>，它是由 Google 提供網站速度測試與效能優化程度的一款檢測工具。PageSpeed 意譯直翻為「網頁速度」，若網頁速度越快，則代表使用者開啟網頁時只需要花費很短的時間就能閱覽網頁裡的第一個畫面，通常網頁速度也是各大搜尋引擎進行 SEO 排名的主要指標之一。由於 Google 是近年來最廣為人知且使用的搜尋引擎，理所當然由其開發的網頁測試工具，也是開發者評測自家網站速度與效能的首選。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>Google PageSpeed Insights 的使用方式很簡單，只要將你要檢測的網站網址，貼到其輸入框，按下「分析」按鈕即可進行檢測：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-12.jpg">
        </figure>
        <p>就拿前陣子執行公司專案的網站作為範例，以下是其檢測報告：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-13.jpg">
        </figure>
        <p>Google PageSpeed Insights 的分析報告主要分成四大類別，分別是「效能」、「無障礙功能」、「最佳做法」、「搜尋引擎最佳化」。各項類別分數的區間介於 0 ~ 100 之間，分數落在 0 ~ 49 分，表示網站亟需要進行改善；若分數位於 50 ~ 89 區間，表示網站在該類別的表現尚可，但部份項目仍有加強的空間；假如分數為 90 ~ 100 分，意味著網站在該項目的優化評測中已接近完美。</p>
        <p><br></p>
        <h3>效能</h3>
        <p>不考慮網路運作狀態、傳輸速度...等外部因素，單純針對網站本身的載入速度及效能來進行分析與測試。</p>
        <p><br></p>
        <h3>無障礙功能</h3>
        <p>無障礙網頁主要是讓身心障礙者也能順暢瀏覽網頁，以獲得想要之資訊的一項技術。如果網站的無障礙功能做得越完善，對那些視力或聽力不便者也越友善。</p>
        <p><br></p>
        <h3>最佳做法</h3>
        <p>此類別通常針對一些屬於不直接影響效能，偏向網頁標準化的規則項目去做評測，並提出相關修改建議。</p>
        <p><br></p>
        <h3>搜尋引擎最佳化</h3>
        <p>指的就是 SEO 的部份，這些檢查項目可確保網頁採用基本的搜尋引擎最佳化建議。</p>
        <p><br></p>
        <p>可以看到該網站在「效能」類別得到 77 分尚可的分數，而「無障礙功能」則僅有不及格的 41 分，至於「最佳做法」與「搜尋引擎最佳化」都得到了滿分。以上是使用者所使用裝置為電腦的情況下所進行的評測結果，接著來看行動裝置的測試結果：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-14.jpg">
        </figure>
        <p>「效能」評分非常之低，遠不及電腦版測定的 77 分，一部分原因是出自此網站沒有做 RWD，也沒有針對行動裝置採取完善的支援所導致。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>接著我們再來看另一個專案網站的檢測報告，這次會細部去認識各個類別的細部項目評分標準為何。電腦版結果：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-15.jpg">
        </figure>
        <p>行動裝置結果：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-16.jpg">
        </figure>
        <p><br></p>
        <h3>效能</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-17.jpg">
        </figure>
        <p>指標欄位裡的項目通常就是影響效能分數裡的主要稽核內容，通常會有五或六個細項，其中又以 FCP、LCP、TBT、CLS 這四項為大宗，也許不同測試工具鑑定效能的評測基準會有些不一樣，但基本上都會有上述這四個項目。</p>
        <p><br></p>
        <h4>FCP：</h4>
        <p>First Contentful Paint，首次顯示內容所需時間，指的是瀏覽器首次顯示文字或圖片的時間，也就是瀏覽器在您的頁面上呈現第一個 DOM 元素的時間。這包括圖像、畫布元素（非白色）或文本。</p>
        <p>與其他繪製和載入指標相比，FCP 不是關於響應時間的純技術指標。FCP 以用戶體驗和他們在網站上首先感知的內容為中心，通過優化網站的 FCP，不僅可以加快整體載入時間，並提高頁面速度評級。但是要注意的是，如果網站有使用 <em>iframe</em>，其元素內包含的任何內容都不會被 FCP 考慮在內。</p>
        <p>較低的 FCP 時間通常是頁面速度的良好指標，優化它的方法也會影響其他頁面速度指標。Google 將 FCP 定調為三個等級：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">秒數</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0 ~ 1.8</div>
                    <div class="f-f1">快速（綠色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">1.8 ~ 3</div>
                    <div class="f-f1">緩和（黃色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">3 以上</div>
                    <div class="f-f1">太慢（紅色）</div>
                </div>
            </div>
        </div>
        <p>而以下這些優化行為可以提高 FCP 的分數：</p>
        <h5>1. 移除渲染阻塞資源</h5>
        <p>通常造成網頁速度阻塞的原因有兩個：檔案文件過大，或是檔案空有結構和格式，卻不具備站點內容。尤其以後者來說，這可能是降低 FCP 時間的第一個頁面因素。呈現阻塞資源是網頁必須呈現的網站上的文件，其中包括 HTML、JavaScript、CSS 和字體文件。由於它們優先於頁面上的任何其他內容，在完成之前將會停止其他任何內容的載入過程，導致任何圖像、純文本或其他面向使用者的內容都將被擱置，直到重要文件完成，因此導致網頁阻塞。</p>
        <p><br></p>
        <h5>2. 縮小 HTML、JavaScript 和 CSS</h5>
        <p>縮減或移除 HTML、JavaScript 與 CSS 文件中無關的字元（例如空格）。雖然間距使開發者與相關維護人員更容易閱讀和解析檔案，但對瀏覽器和伺服器而言並不需要它們，這些空格仍然是佔用位元組的字元。通過縮小這些文件的內容，可以提高頁面速度同時也是縮短 FCP 的時間。</p>
        <p><br></p>
        <h5>3. 減少首位元組時間</h5>
        <p>首位元組時間，指的就是 TTFB（Time To First Byte），顧名思義為從用戶端送出對伺服器的請求後，瀏覽器收到伺服器響應資料的時間。簡單來說，就是當用戶點擊網頁的那一刻，到接收一個數據資料間所需等待的時間。當網站 TTFB 時間越短，代表伺服器響應速度較快。</p>
        <p>我們可以在開發者模式中的「網路」（Network）頁籤看到該網站的 TTFB 數值：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-18.jpg">
        </figure>
        <p><br></p>
        <p>將滑鼠移動至第一列中右側「瀑布」，大約懸停個一兩秒就會浮現出詳細資訊視窗，下方「等待伺服器回應」便是 Waiting TTFB 載入時間。而具體改善 TTFB 的方法有以下這些：</p>
        <ul>
            <li>更換虛擬主機</li>
            <li>刪除不必要的 Cookie</li>
            <li>使用緩存快取外掛</li>
            <li>優化 DNS 服務</li>
        </ul>
        <p><br></p>
        <h5>4. 使 DOM 簡潔化</h5>
        <p>為了讓使用者留下深刻印象，很多網站（尤其是企業形象相關）會將主頁設計得非常華麗或提供複雜多樣的內容，也不是說這樣不好，但過度膨脹 DOM 結構的同時也是在堆疊 FCP 的時間。對 Google 來說，DOM 小於 32 個元素以及 少於 60 個父子元素階層為佳。有一說是建議開發者可以減少 CSS 選擇器的使用來降低 DOM 的元素數量，而這也包含偽類選擇器（<em>::before</em>、<em>::after</em>），它們會使 DOM 變得複雜並增加其大小。</p>
        <p><br></p>
        <h5>5. 使用 SVG 或 WebP 圖像</h5>
        <p>比起 PNG、JPG、GIF 等常見的影像格式，WEBP、SVG 更能有效節省流量空間。不過影像通常不會是網頁載入時優先需要繪製出來的內容，所以和前面幾個項目相比顯得較不舉足輕重，只是若能顯著降低影像的文件大小，也可能對 FCP 評分有所幫助。</p>
        <p><br></p>
        <h4>LCP：</h4>
        <p>Largest Contentful Paint，最大內容繪製，指的是繪製最大的文字或圖片所需要的時間。</p>
        <p>每個網站的頁面基本上都是由數十或數百個元素所組成，包含影像、文字、按鈕...等等。每個元素大小各不相同，LCP 主要用來揭露網站裡所存在最大元素的優化情況。以拾青為例，無庸置疑 LCP 稽核的對象就是最上方的橫幅主視覺區域：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-19.jpg">
        </figure>
        <p>和 FCP 一樣，Google 也將 LCP 定調為三個等級：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">秒數</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0 ~ 2.5</div>
                    <div class="f-f1">快速（綠色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">2.5 ~ 4</div>
                    <div class="f-f1">緩和（黃色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">4 以上</div>
                    <div class="f-f1">太慢（紅色）</div>
                </div>
            </div>
        </div>
        <p>如果比對過 FCP 和 LCP 的分數級距，你會發現 LCP 的秒數標準較之於 FCP 相對寬鬆，而這也是兩者最大的不同之處──FCP 監測的是網站在螢幕裡的可視區域第一個畫面內容；LCP 則是針對該網頁裡最大的主要元素，但通常該主要元素未必是網站第一個被載入的，因此，LCP 的時間往往會略高於 FCP 的時間。</p>
        <p>至於哪些元素在 LCP 考量範圍內？以目前 <a href="https://w3c.github.io/largest-contentful-paint/" target="_blank">W3C Largest Contentful Paint</a> API 中的規定來看，其考量的元素類型為：</p>
        <ul>
            <li><em>&lt;img&gt;</em></li>
            <li><em>&lt;svg&gt;</em> 內嵌的 <em>&lt;img&gt;</em></li>
            <li><em>&lt;video&gt;</em>（使用封面影像）</li>
            <li>CSS 中帶有 <em>background-image: url()</em> 的元素（漸層色樣式除外）</li>
            <li>包含文本節點及行內級文本元素之子元素的塊級元素</li>
        </ul>
        <P>明白了哪些元素在 LCP 考量範圍內，那麼 LCP 又是如何確定該元素的大小？基本上，LCP 只會針對該元素在使用者螢幕可視區域內做大小統計，假如該元素的尺寸大於可視區域，則溢出的部份不會被計算在內。</P>
        <p>我們可以透過以下方法來提升 LCP 的分數：</p>
        <h5>1. 調整影像的尺寸或壓縮影像</h5>
        <p>根據過去記錄的統計，多數情況下影響 LCP 分數的內容以圖像為大宗，因此若能適時壓縮並調整影像的容量與尺寸，便能有效提高 LCP 的評分。</p>
        <p><br></p>
        <h5>2. 使用 CDN</h5>
        <p>在上一篇文章已介紹過 CDN 的用途，有些 CDN 也會提供影像方面的特定服務，透過鄰近的 CDN 提供影像給在其附近瀏覽網頁的使用者，就能降低網站讀取的速度。</p>
        <p><br></p>
        <h5>3. 移除渲染阻塞的資源</h5>
        <p>如果網頁於載入過程中比最大的元素之前先讀取到別的檔案，而該檔案又偏偏是造成渲染阻塞的元凶，那麼就會延遲到 LCP 的時間，因此盡可能去解決或排除這些造成阻塞的情況。</p>
        <p><br></p>
        <h5>4. 選擇更優質的主機服務</h5>
        <p>假如網站能做的優化基本都做了，但還是無法降低 LCP 的時間，那麼問題可能出自於網站主機上。</p>
        <p><br></p>
        <h4>TBT：</h4>
        <p>Total Blocking Time，當工作長度超過 50 毫秒時，從 FCP 到互動準備時間（TTI，Time To Interactive）的時間範圍總計（以毫秒為單位）。</p>
        <p>如果網頁載入的任務線程裡，凡執行時間超過 50 毫秒的，都會被 TBT 視為「阻塞狀態」。阻塞不會使瀏覽器中斷當下的任務，所以當使用者卡在某一個阻塞狀態，任何交互事件都得必須等瀏覽器完成任務後才能繼續響應，而且網頁也會變得卡頓、緩慢，直接影響到使用者體驗。</p>
        <p>TBT 統計的方式是所有任務各別延遲秒數的總和，以下圖網站的主要任務線程為例：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-20.jpg">
        </figure>
        <p>每個黃色條狀物皆代表一個任務時程，上面的數字代表執行時間（毫秒），但凡超過 50 毫秒就表示該任務超過 TBT 的稽核標準，因此可以計算出下圖結果：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-21.jpg">
        </figure>
        <p>雖然整個主線程任務執行時長僅 560 毫秒，但其中 345 毫秒（200 + 40 + 105 = 345）卻被視為阻塞時間。這個時長在 TBT 分數標準裡屬於「尚可」的橘色等級。TBT 得分表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">毫秒</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0 ~ 200</div>
                    <div class="f-f1">快速（綠色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">200 ~ 600</div>
                    <div class="f-f1">緩和（黃色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">600 以上</div>
                    <div class="f-f1">太慢（紅色）</div>
                </div>
            </div>
        </div>
        <p>如果要改善網站的 TBT 時間，可從以下這些要點著手：</p>
        <ul>
            <li>減少第三方程式碼的影響</li>
            <li>減少 JavaScript 執行的時間</li>
            <li>將主線程的任務工作最小化</li>
            <li>保持較低的網頁請求數和傳輸大小</li>
        </ul>
        <p><br></p>
        <h4>CLS：</h4>
        <p>Cumulative Layout Shift，累計版面配置轉移，此指標用於測量可見元素在可視區域內的移動情形。白話來說，就是當網頁還在載入讀取階段，網頁裡的元素卻意外地發生移動，通常容易產生位移的元素包含圖片、影片、表單、按鈕或文字等，CLS 主要就是在記錄這些位移的元素資訊。</p>
        <p>CLS 測定的分數數字越小越好，數字越大表示頁面元素移動的現象越頻繁，這對使用者瀏覽網頁的體驗來說並非好現象。至於為什麼會發生 CLS？根據 Google 的說法大概可分成這五項因素：</p>
        <ul>
            <li>沒有圖框包圍的圖像</li>
            <li>沒有尺寸的廣告或嵌入式 Iframe</li>
            <li>動態載入的內容</li>
            <li>加載的網頁字體導致 FOIT 或 FOUT</li>
            <li>在更新DOM之前等待網路回應</li>
        </ul>
        <p>其中第四項因素的 FOIT 是指網頁加載時當字型加載太慢，字跑不出，當加載完成後跳出的字型會閃一下。FOUT是指非預期樣式的文字閃爍出現，同樣發生在字型加載太慢時瀏覽器先套用了其他字型當作替代，而在加載完成後跳回原先所設定的文字發生一閃的狀況。</p>
        <p>為了提供使用者良好的網站使用體驗，Google 認為 CLS 分數應該盡量控制在 0.1 以下為佳，分數級距如下表所示：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">分數</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0.1 以下</div>
                    <div class="f-f1">良好（綠色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0.1 ~ 0.25</div>
                    <div class="f-f1">尚可（黃色）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">0.25 以上</div>
                    <div class="f-f1">不佳（紅色）</div>
                </div>
            </div>
        </div>
        <p>如果網站 CLS 分數過高，可以試著遵循以下幾個原則來改善網站的內容：</p>
        <p>1. 讓網站裡的圖片和影片始終包含尺寸屬性，無論是 HTML 元素標籤裡內置的 <em>width</em>、<em>height</em> 屬性，還是 CSS 屬性都可以。此方法可以確保瀏覽器載入網頁過程，圖片和影片都能維持正確的尺寸大小。</p>
        <p>2. 除非是使用者與網頁進行交互作用時才產生的響應，否則盡量不要在現下內容的上方突然插入其他內容，如此才能確保版面排版不會突然發生偏移的狀況。</p>
        <p>3. CSS 若要製作偏移動畫效果，優先考慮使用 <em>transform</em> 屬性，避免直接使用 <em>margin</em> 或 <em>padding</em> 這類會讓元素在排版中偏移，而影響到上下其他元素內容。</p>
        <p><br></p>
        <h3>無障礙功能</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-22.jpg">
        </figure>
        <p>多數見到有關網站無障礙功能的介紹文章，其宗旨主要是幫助無法像正常人一樣直觀順利操作網頁的身心障礙者，也能享有上網獲得資訊的權利。其實不光是如此，如果無障礙功能做得好，不僅友善於身障人士，也同樣有益於一般人瀏覽，怎麼說呢？像是提高不同的設備、環境、瀏覽器版本…等使用者的網站瀏覽速度，或是讓爬蟲可以更清楚理解網站內容的意圖，使SEO自然搜尋排名提升，並讓網站更容易被找到，也都是無障礙網站的好處；簡單來說，無障礙網站提供了更優秀的瀏覽體驗與檢索，降低網路應用的困難與挫折，並讓網站曝光與觸及能得加廣泛。</p>
        <p>關於無障礙功能為網站帶來的好處，我們可以分成「社會層面」與「經濟層面」兩個面向來看：</p>
        <h4>社會層面：</h4>
        <p>根據世界銀行的數據指出，全球約 10 億人，患有某種形式的殘疾，佔全世界人口的 15%。這個數字並不少，並且報告還指出平均而言，在一個群體中，殘疾人比非殘疾人更有可能遭受不利的社會經濟後果。如果單就台灣的數據來看，根據行政院主計處提供的數據顯示，截至 110 年 9 月，台灣身心障礙的人數有 120.1 萬人，約佔全台灣人口的 5.1%。</p>
        <p>這些數字也不容小覷，架設無障礙網站應該成為每個企業 / 品牌在製作官網時應該注意的事項之一，讓網際網路上的網站內容與其服務功能，都能使整個社會的人參與其中，藉此防止社會中有族群是被邊緣化的。</p>
        <p><br></p>
        <h4>經濟層面：</h4>
        <p>無障礙網站的架設，也就是讓網站被訪問、進入的門檻縮小，能使企業 / 品牌網站接觸到更多的受眾，而這不就是大多企業 / 品牌架設網站的緣由嗎？藉此增加過去我們忽視的這些身心障礙者的市場，全部納入潛在顧客群將會帶來龐大的效益。</p>
        <p>根據殘疾與多元化諮詢公司 Freeney Williams 於 2020 年公布的報告指出，英國零售商可能會因為無法滿足在線殘障購物者的需求，而錯失每年約 171 億英鎊的線上銷售額。而且另一份報告則指出，有 69% 的殘障人士在進行線上消費時，會直接點擊離開那些由於殘疾產生使用障礙而難以使用的網站。而且數據顯示有 86% 的人寧願選擇從使用上方便的網站上，以更高的價格購買產品，也不要到較難使用的網站上以更低的價格購買。</p>
        <p>然而，無障礙網頁要做到百分之百去服務所有人可說是難以實現的目標，就連效能測試平台也只能盡可能給出較廣泛的建議，幫助各大網站朝建議事項去改善或優化自身網站裡的內容。具體可優化的項目很多，較常見的則有以下五個要點：</p>
        <p><br></p>
        <h5>1. 使用能支援可訪問性的內容管理系統（CMS）</h5>
        <p>在架設、建構網站時，為了要確保整體網站的頁面佈局、主題、工具各方面，能與最開始我們所說的無障礙網站相關架設規範兼容，比如在編輯工具欄應該包含標題等，因此選擇使用可以支持網頁可訪問性的內容管理系統（CMS），常見的像是 Wordpress 或是 Drupal 等。</p>
        <p><br></p>
        <h5>2. 使用標題來構建網頁內容</h5>
        <p>使用標題來構件網站內容，除了能讓網頁的內容更易被所有瀏覽者消化吸收以外，也能使視障者上網時使用輔具能更加的流暢，視障者要取得螢幕上的訊息，必須依靠螢幕閱讀器與相關的系統，經過轉換後透過點字和語音來瞭解螢幕上的資訊。當我們將標頭透過、等方式進行整齊排列，將更容易被螢幕閱讀器所讀取。</p>
        <p><br></p>
        <h5>3. 圖像增加替代文字</h5>
        <p>因為當視障者使用螢幕閱讀器讀取網站內容時，都是透過文字來獲取訊息，而如果沒有將網頁上的圖像加上一些描述內容的話，所有的圖像在視障者眼裡都只是語音的一句「圖像」。我們看到的風景圖、各種有趣的插圖，傳到他們耳朵裡都是一樣的，因此必須確保將每張圖片都編寫描述性的摘要，使每張圖片對所有瀏覽者都有意義。</p>
        <p><br></p>
        <h5>4. 確保網站對鍵盤友好</h5>
        <p>目前有許多輔助身心障礙者的技術都是只依賴純鍵盤操作下進行的，像是我們前面所提到的視障者所使用的螢幕閱讀器，就是以不使用鼠標的情況下瀏覽各個網站，因此在架設網站時我們也必須確保這個網站是能在不使用滑鼠的情況下運行，包含我們能透過鍵盤進入網站的所有頁面、連結與內容等。</p>
        <p><br></p>
        <h5>5. 謹慎地使用顏色</h5>
        <p>當視網膜中的感光細胞無法對不同波長的光做出適當反應時，就會發生色盲。全球，根據 color-blindness.com 的數據，大約 0.5% 的女性和 8% 的男性患有某種形式的色盲，當我們在設計網站時，如果開發人員沒有將網頁調整為適當的顏色對比度時，色盲和其他殘疾者將較難找到網頁資訊，所以也必須考量到他們所看到介面的樣子進行網頁優化。</p>
        <p><br></p>
        <h3>最佳做法</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-23.jpg">
        </figure>
        <p>網路上對於 Google PageSpeed Insights 評分四大類別的「最佳做法」描述甚少，也幾乎沒有什麼專文在介紹此一類別。即便如此，我們還是可以從細部評分項目去了解這個類別的稽核原則是什麼：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-24.jpg">
        </figure>
        <p>攤開細項，你會發現大多是偏向網頁資安政策以及 Coding Style 方面的評測──倒也不是這個類別不重要到沒有人願意花費時間去介紹它，而是很多東西都是我們在開發網頁時需要注意或遵循的項目。所以假如在開發或維護網站的過程中，已經有充分管理相關協議規範與 Coding Style，基本上「最佳做法」的分數都能得到不錯的分數。</p>
        <p>「最佳做法」大抵上可分成這幾種面向：</p>
        <p><br></p>
        <h4>資安政策</h4>
        <h5>1. 使用 HTTPS</h5>
        <p>所有網站都應該使用 HTTPS 確保安全，即使網站未處理機密資料也一樣。這包括避免載入「複合型內容」，因為其中有些內容會透過 HTTPS 傳送初始要求，但透過 HTTP 載入部分資源。HTTPS 能防範入侵者竄改或被動監聽應用程式與使用者之間的通訊，同時也是使用 HTTP/2 和許多新式網路平台 API 的先決條件。</p>
        <p>「複合型內容」指的是使用者透過 HTTPS 載入初始的 HTML 網頁，但內容缺透過不安全的 HTTP 連接到其他外部資源，包含圖片、影片、CSS、JavaScript ...等。</p>
        <p><br></p>
        <h5>2. 避免在載入網頁時要求存取使用者的位置資訊</h5>
        <p>如果未提供其他資訊就要求存取使用者的位置資訊，會讓使用者感到困惑或不信任網站。建議你在使用者執行特定動作時，再提出這項要求。</p>
        <p><br></p>
        <h5>3. 避免在載入網頁時要求使用者允許網站顯示通知</h5>
        <p>如果未提供其他資訊就要求使用者允許網站顯示通知，會讓使用者感到困惑或不信任網站。建議你在使用者操作特定手勢時，再提出這項要求。</p>
        <p><br></p>
        <h5>4. 允許使用者將複製的資料貼入到輸入表單裡</h5>
        <p>防止使用者將複製的資料在表單輸入框裡直接貼上是一種「反 UX」的作法，會破壞使用者良好的網站體驗。</p>
        <p><br></p>
        <h4>Coding Style</h4>
        <h5>1. 網頁含有 HTML DOCTYPE</h5>
        <p>指定 DOCTYPE 能防止瀏覽器切換至相容模式，可避免網站以意外的方式呈現出來而令使用者產生混淆。</p>
        <p><br></p>
        <h5>2. 正確定義字元集</h5>
        <p>網站必須定義字元編碼宣告，以防止文字變成亂碼。通常我們會在 HTML 的 <meta> 標籤裡加入 charset 屬性來做明確的定義。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;meta charset="UTF-8"&gt;</code></pre>
        </div>
        <p><br></p>
        <h5>3. 圖片的顯示比例正確</h5>
        <p>圖片顯示尺寸應符合正常顯示比例，如果圖片渲染時與其原始尺寸不符，不僅會導致圖片內容失真，也會給使用者帶來不好的觀賞體驗。</p>
        <p><br></p>
        <h5>4. 提供的圖片解析度適當</h5>
        <p>和上一點有點雷同，但這裡要強調的是圖片實際尺寸應與顯示大小和像素比例成比例，才能呈現最清晰的圖片效果。之所以會這樣說，主要是現在的網站基本上都必須要有 RWD，若顯示大小與來源尺寸無法保持相等的比例，那麼部份裝置的使用者就會看到失真的圖片影像。</p>
        <p><br></p>
        <h5>5. 避免使用 unload 事件監聽器</h5>
        <p><em>unload</em> 事件無法穩定觸發，監聽該活動可能會妨礙系統進行某些瀏覽器最佳化作業（例如往返快取）。請改用 <em>pagehide</em> 或 <em>visibilitychange</em> 事件。</p>
        <p><br></p>
        <h5>6. 避免使用已淘汰的 API</h5>
        <p>系統最終會從瀏覽器中移除已淘汰的 API。</p>
        <p><br></p>
        <h4>瀏覽器相關</h4>
        <h5>1. 系統未在主控台中記錄瀏覽器發生的錯誤</h5>
        <p>如果主控台有錯誤記錄，表示系統有問題尚待解決，例如網路要求錯誤和其他瀏覽器問題。例如下面示意圖的網站就存在一些錯誤需要被解決：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-25.jpg">
        </figure>
        <p><br></p>
        <h3>搜尋引擎最佳化</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-26.jpg">
        </figure>
        <p>以下引述 <a href="https://developers.google.com/search/docs?hl=zh-tw" target="_blank">Google 搜尋中心</a>對 SEO 的其中一段介紹：</p>
        <p>搜尋引擎最佳化（SEO，Search Engine Optimization）通常是指對網站的某些部分進行小幅修改。如果分開來看，這些變更可能並不明顯，但是在結合其他最佳化措施的情況下，它們對您網站的使用者體驗以及自然搜尋結果中的表現有顯著影響。指南中的許多主題都是構成網頁的基本元素，因此您可能已經非常熟悉，但可能尚未充分發揮這些元素的完整功能。您建立的網站應該要能讓使用者受益，並著眼於任何能改善使用者體驗的最佳化作業。搜尋引擎也是這些使用者的其中一員，能幫助其他使用者發現您的內容，搜尋引擎最佳化作業則可以協助搜尋引擎解讀及呈現網站內容。</p>
        <p>大多數企業或品牌業者無不希望自己的網站能在搜尋引擎中很快就能被消費者找到，然而，無論是企業自行優化或委由專業行銷公司協助，實行 SEO 優化的過程往往很容易走火入魔，甚至可說是無所不用其極。這讓各大瀏覽器搜尋引擎，時常為了那些過頭的「優化方式」，不得不推翻過去的標準，重新調整排名優化比重去做因應，避免使用者難以快速且正確找到自己真正需要的資訊，或是不小心被不肖人士詐騙錢財或個資，這也間接讓網站效能評測工具很難有一套持之以恆的固定標準。</p>
        <p>儘管如此，坊間還是有整理出六項基本準則，如果網站能遵循這六項要點，那麼要提高 SEO 的自然排名也將不會是太困難的事。</p>
        <p><br></p>
        <h4>1. 設定較長的關鍵字片語</h4>
        <p>如果能讓你的網站主題關鍵字更長一些（但是也不要過長），會比起只有簡單兩三個字更有助於 SEO 排名。像 Google 搜尋引擎的建議相關搜尋往往是比大關鍵字推薦更長更詳細的關鍵字片語。譬如：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-27.jpg">
        </figure>
        <p><br></p>
        <h4>2. 將主要關鍵字放在 HTML 的關鍵位置</h4>
        <p>HTML 的元素標籤多半是存在其用意的，像 <em>&lt;h1&gt;</em> 標籤通常記錄網站的主要標題、<em>&lt;img&gt;</em> 用來連結影像等，而 SEO 也會將這些語意標籤的內容納入關鍵字搜尋，因此把正確的關鍵字放入正確的 HTML 標籤顯得格外重要。</p>
        <figure>
            <img src="/images/learn/html/pagespeed-28.jpg">
        </figure>
        <p><br></p>
        <h4>3. 在文章與文章間依照關聯性製作內部連結</h4>
        <p>執行 SEO，必須用對的內部連結（<em>&lt;a&gt;</em>）告訴搜尋引擎 AI 文章跟文章間的關連性。因為網站的連結重要性僅次於關鍵字，以 Google 為例，Google 是透過連結認識整個網站內容與文章間的關連性。</p>
        <p><br></p>
        <h4>4. 依照內容製作外部連結增加網站可信度</h4>
        <p>文章內引述公信力且品質高的網站內容，並用正確的外部連結告訴搜尋引擎引述來源，藉此提升網站內容的可信度。</p>
        <p><br></p>
        <h4>5. 確保網站被連結到信譽良好的網站上</h4>
        <p>被別人引述專業術語叫做『取得反向連結』。讓你的內容被引述、被分享，被連結到具有較高的域名權限、信譽良好的網站上，可以增加網站權威性。</p>
        <p><br></p>
        <h4>6. 持續更新內容</h4>
        <p>持續更新網站內容將非常有助於增進 SEO 自然排名。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>前面有提過，為了追求更快速衝排名的方式，國內外各個企業的行銷團隊無不使出渾身解數，所求為的就是提高 SEO 的分數，但如果用了錯誤甚至違規的方法做 SEO，最終可能會帶來後悔莫及的結果。在 SEO 術語中，有所謂的「黑帽」（Black Hat SEO）與「白帽」（White Hat SEO）定義，用來告訴大家如何謹慎且正確的去執行 SEO 優化。</p>
        <p><br></p>
        <h3>白帽（White Hat SEO）：</h3>
        <p>白帽 SEO 是指從「使用者需求」與「用戶體驗」的方向出發，並使用符合 Google 搜尋引擎規範的正當手法架設網站、產出內容，以及調整結構等優化行為。使用白帽 SEO 優化網站可以達到這些效果：</p>
        <ol>
            <li>確保提供使用者良好的閱讀體驗</li>
            <li>充分解決民眾問題或提供有用新知</li>
            <li>提升品牌形象、建立使用者忠誠度</li>
            <li>獲得大量的自然流量與更精準的潛在客戶</li>
            <li>獲得 Google 青睞，長期穩坐排名，省下大筆廣告費</li>
        </ol>
        <p>不過白帽 SEO 要投入的心力與資源相對較多，還必須隨時因應演算法及使用者需求調整內容與更新技術，效果還不一定馬上呈現，部分業者為了縮短與成功的距離，便屢番嘗試、尋求捷徑，於是黑帽 SEO 便在這個狀況下誕生...</p>
        <p><br></p>
        <h3>黑帽（Black Hat SEO）：</h3>
        <p>黑帽 SEO 是指違反 Google 規範、精神，利用 SEO 作弊的方式操作網站與內容，讓搜尋結果頁面排名能在短期內衝上第一頁，但卻對使用者絲毫沒有幫助的操作手法。以下是 Google 網站管理員指南公布的黑帽作法名單：</p>
        <ol>
            <li>自動產生的內容</li>
            <li>加入連結配罝</li>
            <li>建立沒有原創內容或極少原創內容的網頁</li>
            <li>偽裝</li>
            <li>幕後重新導向</li>
            <li>隱藏式文字或連結</li>
            <li>入口網頁</li>
            <li>抄襲的內容</li>
            <li>加入無法有效增值的聯盟計劃</li>
            <li>載入含有無關的關鍵字的網頁</li>
            <li>建立具有惡意行為的網頁，例如網路釣魚，或是植入病毒、木馬程式或其他惡意程式</li>
            <li>濫用複合式摘要標記</li>
            <li>對 Google 傳送自動查詢 </li>
        </ol>
        <p>項目很多，且有些敘述也不是很具體，不過基本上可以歸類為這三項原則：</p>
        <ol>
            <li>利用欺瞞方式獲取排名，對競爭者來說不公平</li>
            <li>不在乎使用者體驗與需求，甚至產出無用的劣質內容</li>
            <li>惡意操控搜尋引擎，傷害Google信譽與功能</li>
        </ol>
        <p>因為徹底的違背了 Google 的精神，對使用者來說也沒有任何好處，還公然作對，挑戰搜尋引擎的底線，因此使用黑帽 SEO 手法的業主往往會遭受 Google 的懲罰，演變成最糟的局面。</p>
        <p><br></p>
        <p>既然有白帽與黑帽，那有灰帽嗎？你可別說，還真的有...！</p>
        <p><br></p>
        <h3>灰帽（Gray Hat SEO）</h3>
        <p>灰帽 SEO 是指界於白帽 SEO 跟黑帽 SEO 之間的搜尋引擎優化操作手法，它帶有一點取巧的手段，卻沒有嚴重到違反 Google 的規範，因為介於模糊的灰色空間地帶，所以才稱呼它為灰帽。</p>
        <p>其實灰帽 SEO 界定是很浮動的，因為通常行銷團隊了解 SEO 基本概念後，就會想辦法從原則中發展更多不同的技巧幫助排名，很多時候這些操作行為或研發出來的方法就是灰帽擦邊球，甚至一個不小心就進了黑帽，或是未來也被列入黑帽禁止的事項當中，所以，盡可能的話，還是朝白帽 SEO 的方向去努力才比較不會衍生意外問題。</p>
        <p>說了這麼多關於 SEO 的知識，我們將重點拉回 Google PageSpeed Insights 的評分，細讀 Google PageSpeed Insights 的「搜尋引擎最佳化」評測結果，你會發現其稽核項目和前面幾個類別的項目有著高度重疊：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-29.jpg">
        </figure>
        <p>所以只要妥善改善這些項目，配合白帽 SEO 作法，就能有效提高這部分的評分。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>經過前面章節的介紹，已大致了解目前網站效能優化的相關要點，以及最具代表性的 Google PageSpeed Insights 評測工具的稽核基準，在這個章節則要來進行實作，來改善並優化<a href="https://shiqingdesign.com/">拾青網頁媒體設計</a>的效能。以下是其在 Google PageSpeed Insights 的評分結果：</p>
        <p>電腦版：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-30.jpg">
        </figure>
        <p>行動裝置：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-31.jpg">
        </figure>
        <p>其中「效能」與「無障礙功能」的分數都還保有較大幅度的進步空間，尤其是行動裝置效能的部份，甚至在接近不及格的邊緣。我們依據各項類別，一個個檢視具體的改善目標。</p>
        <p><br></p>
        <h3>效能</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-32.jpg">
        </figure>
        <p><br></p>
        <h4>1. 提供 next-gen 格式的圖片</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-33.jpg">
        </figure>
        <p>next-gen 格式圖片指的是 JPEG2000、JPEG XR、WebP 這三種可以有效減少容量大小的圖片格式。目前會看到警告畫面裡面列出來的圖片，都是使用傳統的 PNG 格式，Google PageSpeed Insights 建議如果能將 PNG 替換成其他壓縮效果更佳的 next-gen 圖片格式，不僅能使網站下載速度更快，也更能節省數量的使用量。</p>
        <p><br></p>
        <h5>JPEG2000：</h5>
        <p>JPEG2000 通常被認為是未來取代 JPEG 的下一代圖像壓縮標準，副檔名大多是為 <em>.jp2</em>，雖然 JPEG2000 在技術上有一定的優勢，但普遍仍是較少使用的圖像文件。與 JPEG 相較，JPEG2000 比較明顯的優點就是沒有 JPEG 壓縮中的馬賽克失真效果，主要為模糊失真。但在低壓縮比情形下（比如壓縮比小於 10：1），JPEG 圖像質量還是會比 JPEG2000要好，因此 JPEG2000 適用在壓縮比較高的情形下，優勢才會明顯。</p>
        <p><br></p>
        <h5>JPEG XR：</h5>
        <p>JPEG XR 由 Microsoft 開發，屬於 Windows Media 家族的一部分，用於替換 JPEG2000，增加 HDR 支援。微軟公司宣稱 JPEG XR「使用與 JPEG 算法相當的計算量，與內存消耗可以得到明顯地與 JPEG2000 相當的圖像品質。在有損壓縮的情況下可以得到明顯比 JPEG 好的品質並且文件大小減小一半」，不過迄今仍然是較少使用的圖像文件格式。</p>
        <p><br></p>
        <h5>WebP：</h5>
        <p>WebP 則由 Google 推出。跟 JPEG 採用同樣的壓縮技術，根據 Google 早期測試，WebP 的無失真壓縮比網路上找到的 PNG 檔少了 45％ 的檔案大小，即使這些 PNG 檔在使用 pngcrush 和 PNGOUT 處理過，WebP 還是可以減少 28％ 的檔案大小。也因為是 Google 本身自行推出，因此在主流瀏覽器 Google Chrome 支援性比較完整，相對於前兩者來說會較方便一些。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>權衡比較後，決定將網站中以 PNG 格式輸出的圖片，改由 WebP 格式輸出並取代。</p>
        </blockquote>
        <p><br></p>
        <h4>2. 排除禁止轉譯的資源</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-34.jpg">
        </figure>
        <p>為了避免網頁載入時，瀏覽器先讀取 HTML 裡面的內容卻沒即時同步載入相關樣式和程式腳本，造成網頁會有短暫跑版的現象──在這種情況下，我們可能會把 CSS 或 JavaScript 放在 HTML 的 <em>&lt;head&gt;</em> 標籤內，先讓瀏覽器讀取樣式表和程式腳本，然後才載入 HTML <em>&lt;body&gt;</em> 裡面的內容。</p>
        <p>然而這樣的做法也有個壞處，假如掛在 <em>&lt;head&gt;</em> 裡面的資源很多且檔案又很龐大的話，反而會造成瀏覽器初始載入的網頁時間變長，進而導致使用者不耐等待，選擇直接跳離網頁。因此又有一派的專家認為，應該要把 CSS、JavaScript 相關資源，擺在 <em>&lt;body&gt;</em> 的最末端，與其卡在讀取使人誤以為網站壞了，不如先顯示未經美化的 HTML 內容或許會更好一些。當然，隨著時間與技術推移，後來也衍生出了在網頁完全載入前，先以一段讀取動畫告知使用者網頁尚在載入的替代方案，或是使用者一邊瀏覽，一邊載入後續動態內容的折衷作法。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>回到 Google PageSpeed Insights 的分析，由於 Google PageSpeed Insights 在這部分的稽核標準是從 FCP 與 LCP 的觀點作切入，如果網頁初始畫面讀取過長，分數也會比較低。所以原先將掛在拾青 <em>&lt;head&gt;</em> 裡面的多數外部資源，轉移到 <em>&lt;body&gt;</em> 末端處，只保留最基礎的 <em>style.css</em> 與 <em>jquery.js</em> 在 <em>&lt;head&gt;</em> 先行載入，避免意外狀況發生。</p>
        </blockquote>
        <p><br></p>
        <h4>3. 請縮短初始伺服器回應時間</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-35.jpg">
        </figure>
        <p>根據 Google PageSpeed Insights 的進階文章解釋，造成伺服器回應時間緩慢的原因有很多，因此也有很多可能的改善方法，並列舉以下三種可行的大眾方案：</p>
        <blockquote>
            <ul>
                <li>Optimize the server's application logic to prepare pages faster. If you use a server framework, the framework may have recommendations on how to do this.</li>
                <li>Optimize how your server queries databases, or migrate to faster database systems.</li>
                <li>Upgrade your server hardware to have more memory or CPU.</li>
            </ul>
        </blockquote>
        <p>簡單來說，就是優化伺服器主機的應用邏輯，或優化伺服器查詢資料庫的方式，以及升級主機的硬體，例如增加內存記憶體或 CPU，從而提高主機效能...等作法。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>如果牽扯到硬體的部分可能不好調整，所以仍先從其他建議項目著手，再來觀察是否已能有效減少伺服器回應的時間。</p>
        </blockquote>
        <p><br></p>
        <h4>4. 減少無用的 JavaScript</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-36.jpg">
        </figure>
        <p>和第二項「排除禁止轉譯的資源」問題雷同，本項目主要針對 LCP 的部分，因為拾青最大的畫面區域（主視覺）沒有使用到其詳細資訊內列舉的兩個外部資源檔案（<em>three.min.js</em>、<em>TweenMax.min.js</em>），建議作法是將其移置到當網頁載入到有需求的內容再載入即可。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>在第二項最佳化建議事項中，已將大部分的 <em>.js</em> 資源移動到 <em>&lt;body&gt;</em> 末端，因此本項目理論上應該也會有所改善。</p>
        </blockquote>
        <p><br></p>
        <h4>5. 運用有效的快取政策提供靜態資產</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-37.jpg">
        </figure>
        <p>在上篇文章的優化項目說明曾提過，瀏覽器快取可以減少使用者對伺服器的請求，加快頁面載入的時間。假如網站沒有建立快取機制，對於一些靜態資源（例如圖片、影片）使用量龐大的網站來說，意味著使用者每造訪一次該網站，都要重新下載那些龐大的內容，不僅對伺服器造成負擔，同時也影響網站載入的效率。Google PageSpeed Insights 稽核的本項目指的就是如此，它建議我們可以嘗試延長快取生命週期，加快使用者再次造訪網頁的速度。</p>
        <p>所有透過瀏覽器發送的 HTTP 請求，都會先經過瀏覽器的快取，在這裡會先檢查是否有有效的快取內容可作為回應，如果有的話就直接讀取快取的內容，以減少網路的延遲和傳輸造成的成本。一般來說，瀏覽器會在發送請求的時候自動選擇最適合的快取方式，因此即使不去設定 <em>Cache-Control</em> 的 <em>header</em>，瀏覽器依然會選擇最適合的方式。</p>
        <p>Google 建議將網站伺服器的 <em>Cache-Control</em> 設定為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">Cache-Control: max-age=31536000</code></pre>
        </div>
        <p><em>31536000</em> 的單位為秒數，而這個數字相當於一年。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p><em>Cache-Control</em> 設定通常是在伺服器端進行的，因為這樣可以控制瀏覽器和代理伺服器中的快取行為。簡單來說，有關 HTTP Header 的設定通常是在網站伺服器上的配置文件中完成，例如 Apache 伺服器的 <em>.htaccess</em> 檔案或 Nginx 伺服器的 <em>nginx.conf</em> 檔案。</p>
        </blockquote>
        <p><br></p>
        <h4>6. 圖片元素沒有明確的 width 和 height</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-38.jpg">
        </figure>
        <p>如果網站裡使用的圖片沒有給定明確的寬高尺寸，若網頁讀取時因為各種原因導致版面產生位移，將會影響 CLS 的分數。倘落 CLS 的分數越高，表示使用者的瀏覽體驗會越不佳。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>儘管在 CLS 統計上評測的分數已是優良的 0 分，但既然診斷報告有顯現這樣的問題，我們便嘗試看看是否能解決錯誤報告。應對的作法是將詳細報告中羅列的圖片加上與其尺寸相等的 <em>width</em> 與 <em>height</em> 值，並藉由 CSS 調整其最大寬（<em>max-width</em>）與自動高度，防止 RWD 縮放下圖片會失真或跑版的情形。</p>
            <p><br></p>
            <p>不過，除非版型在頁面載入真的有出現跑版現象，或是 CLS 真實反饋的分數過高，原則上不是很建議強制給影像添加寬高屬性，一來 RWD 不好處理，二來也只是徒增切版的時間。我會在最後一個章節，解釋為什麼有派人士鼓吹不要過度相信效能分析工具的整理文章。</p>
        </blockquote>
        <p><br></p>
        <h4>7. 其他改動</h4>
        <p>除了 Google PageSpeed Insights 評定的改善方針之外，結合第一章列舉的優化項目建議，以下對拾青網站原始碼額外進行其他優化動作的項目有：</p>
        <ul>
            <li>使用 CDN：<br>將外部引用的 JavaScript 資源（如 jQuery、ThreeJS...等）從原本本機端載入的方式，變更為 CDN 引用。</li>
            <li>移除沒有使用的 JavaScript / CSS。</li>
        </ul>
        <p><br></p>
        <h3>無障礙功能</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-39.jpg">
        </figure>
        <p>雖說無障礙功能不會影響網站的效能和速度，但由於分數偏低，加上分數越高對身障使用者也會愈友善，盡量去改善缺失對網站本身而言並無壞處。以下來看看 Google PageSpeed Insights 提出的優化建議有哪些：</p>
        <p><br></p>
        <h4>1. 按鈕沒有可存取的名稱</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-40.jpg">
        </figure>
        <p>「按鈕」（<em>button</em>）是網頁與使用者進行互動的媒介之一，假如網站使用按鈕卻沒有為其賦予「名稱」，站在無障礙網頁的角度而言，按鈕就單純只是個「按鈕」，沒有辦法讓身障使用者透過螢幕閱讀器清楚明瞭該按鈕的用途是什麼。</p>
        <p>在 HTML 中，通常會使用 <em>aria-label</em> 這個屬性，使特定元素提供一個具有描述性的純文字標籤，讓使用螢幕閱讀器或其他輔助裝置的身障人士，得以更容易地理解該元素標籤的用途或作用。<em>aria-label</em> 不僅侷限於 <em>button</em> 元素，包含 <em>img</em>、<em>a</em>、<em>input</em> 在內的表單元素也都適用。</p>
        <p>語法範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;button aria-label="確認送出"&gt;Confirm&lt;/button&gt;</code></pre>
        </div>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>將網站內所有與使用者能產生交互作用的元素都添加 <em>aria-label</em> 屬性，並為其命名淺顯易懂的名稱。</p>
        </blockquote>
        <p><br></p>
        <h4>2. 圖片元素缺少 [alt] 屬性</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-41.jpg">
        </figure>
        <p>圖片元素（<em>img</em>）中的 <em>alt</em> 屬性主要是用來作為當圖片連結失效後的替代文字。它的使用目的有三：</p>
        <ul>
            <li>當圖片失效的時候，可以作為延續閱讀體驗的輔助。</li>
            <li>幫助視力障礙者可以藉由電腦輔助工具，理解圖片內容。</li>
            <li>幫助搜尋引擎爬蟲理解圖片內容，有助於圖片 SEO 排名。</li>
        </ul>
        <p>很多人會把 <em>alt</em> 與 <em>title</em> 屬性的用途搞混，然而這兩者的用途完全不同。<em>title</em> 屬性主要作為圖片或其他特定元素標籤的「標題」，用以標示該元素的說明文字，只有在滑鼠移動到元素上方才會顯示出來。而 <em>alt</em> 只有在圖片失效時，其替代文字才會顯示在網頁上，正常情況下只能從原始碼中才能查看它的文字內容。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>將網站內所有 <em>&lt;img&gt;</em> 元素標籤都添加 <em>alt</em> 屬性並命名（或者也可以用 <em>aria-label</em>）。</p>
        </blockquote>
        <p><br></p>
        <h4>3. 連結缺少可辨別的名稱</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-42.jpg">
        </figure>
        <p>和第一個項目「按鈕沒有可存取的名稱」基本是相同的建議，但本項目針對的對象是超連結標籤，也就是 <em>&lt;a&gt;</em> 元素標籤。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>將網站內所有 <em>&lt;a&gt;</em> 添加 <em>aria-label</em> 屬性，並為其命名淺顯易懂的名稱。</p>
        </blockquote>
        <p><br></p>
        <h4>4. &lt;meta name="viewport"&gt;元素中使用 [user-scalable="no"]，或 [maximum-scale] 屬性小於 5</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-43.jpg">
        </figure>
        <p>有時為了顧及一般大眾使用者的使用體驗，網站開發者會將 HTML 中的 <em>meta name="viewport"</em> 屬性關閉使用者縮放，以及限縮放大功能的倍率為 <em>1</em>（即不給縮放），但這麼做反倒讓視障人士無法藉由放大內容去看清楚網站的內容。</p>
        <p>Google PageSpeed Insights 的建議將 <em>meta name="viewport"</em> 的設定為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"&gt;</code></pre>
        </div>
        <p>然而，如果按照其建議，網站在行動裝置上可能很容易因為使用者無心的觸控操作，時不時一不小心就會放大內容，這對部分人而言在閱讀上可能會有不太舒暢的瀏覽體驗，因此，如何取捨就看各自團隊的決策了。</p>
        <p><br></p>
        <h4>5. 背景和前景顏色沒有足夠的對比度</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-44.jpg">
        </figure>
        <p>假如前景的文字顏色與背景的影像色彩對比度不夠明顯，使用者不僅難以閱讀，甚至也有可能根本看不清楚文字內容。而部份用色對比度不明顯的話，對一些患有色盲疾病的視障人士來說也無法辨別文字要傳達的資訊。</p>
        <p>經過 Google PageSpeed Insights 檢測，認為拾青在前景文字與背景色對比度不夠顯眼的區塊僅有一處：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-45.jpg">
        </figure>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>肉眼上看起來尚不至於有不容易辨識文字的情況，故不調整（或是考慮將文字顏色改成純白色 <em>#FFF</em>）。</p>
        </blockquote>
        <p><br></p>
        <h4>6. &lt;html&gt; 元素缺少 [lang] 屬性</h4>
        <figure>
            <img src="/images/learn/html/pagespeed-46.jpg">
        </figure>
        <p>在網站 <em>&lt;html&gt;</em> 標籤中加入 <em>lang</em> 屬性，可以幫助使用者更容易且正確地知道網站的主要語言是什麼，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;html lang="en"&gt; ... &lt;/html&gt;</code></pre>
        </div>
        <p>假如有需要，也可以在個別有包含文字內容的標籤添加 <em>lang</em> 屬性，讓網站裡各自區塊使用的文字語言更加精準化。而常見的 <em>lang</em> 屬性值有：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">值</div>
                    <div class="f-f1">語言</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>en</em></div>
                    <div class="f-f1">英語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>es</em></div>
                    <div class="f-f1">西班牙語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>fr</em></div>
                    <div class="f-f1">法語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>de</em></div>
                    <div class="f-f1">德語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>it</em></div>
                    <div class="f-f1">義大利語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ja</em></div>
                    <div class="f-f1">日語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ko</em></div>
                    <div class="f-f1">韓語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>pt</em></div>
                    <div class="f-f1">葡萄牙語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>ru</em></div>
                    <div class="f-f1">俄語</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>zh</em></div>
                    <div class="f-f1">中文</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <blockquote class="is-info">
            <p>改善作法：</p>
            <p><br></p>
            <p>於 <em>&lt;html&gt;</em> 標籤裡加入 <em>lang="zh"</em> 屬性。</p>
        </blockquote>
        <p><br></p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>不單是網站經營者，包含網站設計團隊在內，許多人都會將網站送到像 Google PageSpeed Insights 這樣具有大眾公信力的效能評測工具，依照其檢測並提供的效能優化建議，來對自家的網站進行改善。然而，這些網站效能測試工具所測試出來的結果，真的就是百分之百正確的嗎？</p>
        <p>事實上，WP Rocket 曾發表一篇有關 Google PageSpeed Insights 的文章：<a href="https://wp-rocket.me/blog/the-truth-about-google-pagespeed-insights/?sscid=41k7_dnvj1&utm_source=shareasale&utm_medium=affiliate&utm_campaign=2065420_1075949" target="_blank">Why You Should Care About Google PageSpeed Insights</a>，內文其實就建議大家不需過度追求 Google PageSpeed Insights 的分數。他們認為，過度追求成績是某程度上是浪費時間，沒有一個網站能獲得完美的成績，且實務上也幾乎不可能實現，並且由於它與真實效能速度並非絕對相關，新手要注意避免落入這種迷思。</p>
        <p>舉例來說，同樣的 A 網站，在不同的測試工具可能會獲得不同的評比結果。比如在 Google PageSpeed Insights 的效能分僅能得到 59 分，但是在另一個測速工具（例如 Pingdom）評測的載入時間只耗時約 300 毫秒，速度其實已經相當快速。</p>
        <p>再舉一個例子，有些人擔心網站在 Google PageSpeed Insights 測試的分數太低可能會影響到 SEO，但如果拿一些知名度高的網站來做測試（例如 Amazon、Facebook...），會意外發現它們分數也沒有想像中的高，有些甚至部份類別項目的評分偏低...即便如此也無損它們在各自領域的地位，不僅 SEO 排名依舊位居前列，實際使用體感也不若帳面分數上來得卡頓。</p>
        <p><br></p>
        <h5>Amazon：</h5>
        <figure>
            <img src="/images/learn/html/pagespeed-47.jpg">
        </figure>
        <p><br></p>
        <h5>Youtube：</h5>
        <figure>
            <img src="/images/learn/html/pagespeed-48.jpg">
        </figure>
        <p><br></p>
        <h5>Facebook：</h5>
        <figure>
            <img src="/images/learn/html/pagespeed-49.jpg">
        </figure>
        <p><br></p>
        <h5>NBA：</h5>
        <figure>
            <img src="/images/learn/html/pagespeed-50.jpg">
        </figure>
        <p><br></p>
        <h5>蝦皮：</h5>
        <figure>
            <img src="/images/learn/html/pagespeed-51.jpg">
        </figure>
        <p><br></p>
        <p>透過以上舉例可知，網站效能優化工具固然是一項指標，但也並非絕對，影響網站速度與 SEO 的因素有許多，並不能單靠一個指標來判斷，它們提供的建議也不一定要逐一完成。</p>
        <p>不過 WP Rocket 也有給新手一些有關如何正確使用 Google PageSpeed Insights 和應該有的心態建議：</p>
        <ul>
            <li>對自己能力所及，盡量去滿足相關的需求。</li>
            <li>對能力辦不到的事情，則應該忽略它，實際上的影響沒有非常大。</li>
            <li>使用針對網站速度的工具 <a href="https://www.pingdom.com" target="_blank">Pingdom</a> 和 <a href="https://gtmetrix.com" target="_blank">GTmetrix</a>，而非 Google PageSpeed Insights。</li>
            <li>專注於調整網站的速度和效能，而非籠統的分數表現。</li>
        </ul>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>