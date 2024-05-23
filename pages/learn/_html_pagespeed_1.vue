<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、常見優化項目' },
        { id: 2, title: '二、什麼是 AMP？' },
        { id: 3, title: '三、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="12" fileType="learnList" />
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
        <p>隨著網頁開發技術、工具的演化變遷，針對網站本身的效能與 SEO 優化亦產生些許變化，儘管最直接、快速的方式仍是透過升級主機硬體，來提升網站伺服器回應的時間。根據 Google 官方提供的資訊，主機回應的速度最好能控制在 200 毫秒以內，假如伺服器主機回應的時間總是過長，且當網速流量增大時，資料庫連線總是頻繁地遭遇無法連線的情況，這意味著我們應該考慮將主機進行升級。然而，考量金錢成本問題，「升級主機」往往不會是開發者端最優先的解答，因此，從網站程式碼與所使用的各種檔案仍是多數開發者與評測工具著重的目標，而這也是本篇文章聚焦的主題──網頁開發者可以透過那些方式，提升、優化自己的網站。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <ul>
            <li>圖片壓縮</li>
            <li>移除未使用的 JavaScript / CSS</li>
            <li>解決 Javascript 阻礙頁面渲染時間</li>
            <li>靜態檔案壓縮</li>
            <li>使用 CDN 服務</li>
            <li>減少轉址的次數</li>
            <li>增加並善用快取機制</li>
            <li>使用 AMP</li>
        </ul>
        <p><br></p>
        <h3>1. 圖片壓縮</h3>
        <p>無論是哪個技術發展時期，圖片壓縮一直都是網頁優化很重要的評測項目之一。通常網頁內容容量佔比最大的檔案，扣除影片之後再來就是圖片了，一個網站也許不會使用到影片，但基本上幾乎全部的網站都至少會使用一張以上的圖片，假如每張圖片的檔案都很大，勢必會影響網頁載入的速度，且也很耗費整體流量。因此當我們實踐網頁優化的過程中，圖片壓縮通常會是首要目標。</p>
        <p>我的常用圖片壓縮線上工具：</p>
        <ul>
            <li><a href="https://tinypng.com/" target="_blank">TinyPNG</a></li>
            <li><a href="https://squoosh.app/" target="_blank">Squoosh</a></li>
        </ul>
        <p>如果要說近年來值得一提的圖片壓縮技術，莫過於提倡使用「WebP」格式來取代傳統的「JPEG」或「PNG」影像格式。WebP 是一種同時提供失真與無失真壓縮的圖片檔案格式，目的在於減少圖片的檔案大小、提高圖片檔案在網路上的傳送時間，但同時又能和 JPG 與 PNG 等格式相同的圖片品質。</p>
        <h5>WebP 的優點：</h5>
        <p>1. 檔案較小<br>WebP 格式在與其他圖片都相同的尺寸下，檔案會比其他檔案格式還要小，檔案較小，對網頁的載入速度也會更加友善。</p>
        <p>2. 可動態與透明化<br>WebP 支援動畫與透明度，並分成失真、無失真壓縮模式。在過去，動態圖片（動畫）大多採用 GIF 格式檔案來顯示、透明化的圖片為 PNG 格式，而現在則多了檔案較小的 WebP 可以選擇。</p>
        <h5>WebP 的缺點：</h5>
        <p>1. 並非所有瀏覽器都支援<br>儘管數據上顯示超過 94% 的瀏覽器已有支援 WebP 格式圖片，從趨勢來看 WebP 也有蔚為主流的跡象，但這仍不代表全部瀏覽器皆有支援，尤其是那些已經放棄維護的老舊版本瀏覽器，像是 IE 系列。</p>
        <p>2. 製作不易<br>一般常用的繪圖軟體像是 Adobe Photoshop，如果是比較早期的版本無法直接將檔案轉存成 WebP 格式，必須是 23.2 之後的版本才能在不依賴外掛套件，直接從應用程式中轉存匯出。詳情可見此篇 Adobe 官方文章：<a href="https://helpx.adobe.com/tw/photoshop/kb/support-webp-image-format.html" target="_blank">在 Photoshop 中使用 webP 檔案</a></p>
        <p><br></p>
        <p>轉存 Webp 的範例：</p>
        <h6>1. 點擊上方工具列的「檔案」->「儲存副本」。</h6>
        <figure>
            <img src="/images/learn/html/pagespeed-1.jpg">
        </figure>
        <p><br></p>
        <h6>2. 從彈窗下方「存檔類型」下拉清單中尋找「WebP」格式，接著按下「存檔」。</h6>
        <figure>
            <img src="/images/learn/html/pagespeed-2.jpg">
        </figure>
        <p><br></p>
        <h6>3. 自行調整要輸出的品質，最後點擊「確定」即可輸出 WebP。</h6>
        <figure>
            <img src="/images/learn/html/pagespeed-3.jpg">
        </figure>
        <p><br></p>
        <p>比較一下 WebP、JPEG、PNG 三者分別佔據的檔案大小（皆未另外做壓縮處理）：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-4.jpg">
        </figure>
        <p>如果另外將 PNG 和 JPEG 進行壓縮，PNG 大約能壓縮至 500KB 左右，仍不及 WebP 來的輕量；JPEG 雖然可以壓縮至只剩下 50KB 左右，但由於 JPEG 屬於破壞性壓縮，多少會影響圖片本身的品質，而且 WebP 轉存時若將品質控制在「中等」左右的等級，輸出的檔案也僅僅只有 30KB 左右的大小。</p>
        <p><br></p>
        <h3>2. 移除未使用的 JavaScript / CSS</h3>
        <p>我們在引用現成套件（例如輪播圖、Animate.css...）導入到自己專案時，多數時候都是直接把整個檔案丟進去專案資料夾裡面，比較好的則會稍加將其與專案資料夾內的同語言文件進行整合，但不管怎樣，實際上我們可能只需要套件函式庫裡的某項功能或其中一個範例，其餘則完全不需要。假如一個網站內使用了很多套件，那些閒置又多餘的程式碼累積下來其實也相當可觀。盡可能移除這些非必要的程式碼，對網頁讀取速度多少都會有幫助。</p>
        <p>舉例來說像 <a href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.css" target="_blank">Animate.css</a> 洋洋灑灑有四千多行，但我們需要套用的動畫效果可能只有其中數個，那麼只需保留基本定義和有使用到的效果樣式，其他未使用的程式碼則可移除掉以節省檔案的大小。</p>
        <p><br></p>
        <h3>3. 解決 Javascript 阻礙頁面渲染時間</h3>
        <p>有派觀念認為要把一些重要的 JavaScript Framework 或 Library 掛在網頁的 <em>&lt;head&gt;</em> 元素標籤裡，使網頁載入時能比內容更優先被讀取到，以確保相關程式碼能順利執行。然而如果當這些腳本程式碼太過龐大或礙於其他因素無法迅速載入時，反倒會成為網頁渲染的阻礙，延遲了使用者觀看網頁內容的時間。</p>
        <p>所以非必要的話，建議將 JavaScript 程式碼移動到 <em>&lt;body&gt;</em> 的末端，先讓 <em>&lt;head&gt;</em> 載入 CSS 樣式與 HTML 的文件內容，最後再載入 JavaScript，如此一來至少能先讓使用者閱覽到網站的靜態內容及樣式，而非盯著白茫茫的頁面空等。</p>
        <p><br></p>
        <h3>4. 靜態檔案壓縮</h3>
        <p>這裡的靜態檔案泛指 HTML、CSS、JavaScript 這些網頁文件，透過移除空白、縮排可以讓整個文件大小變得簡潔、輕量，藉此提升網頁讀取速度。當然取而代之的缺點就是程式碼會變得相當不易閱讀，因此通常都是讓自動化工具（例如 Webpack、React、Gulp...等），輸出文件時一併執行壓縮的動作。如果要手動進行壓縮也可以在網路上找到相似的壓縮工具，功能皆大同小異，主流的 IDE 也都有提供相關外掛來協助壓縮的動作。</p>
        <p>如果不是使用自動化工具開發網頁，且後續還有維護的需要，可能不太建議為了網站優化而強迫自己把全部的靜態檔案通通進行壓縮，這會使得日後自己或接手的人員難以閱讀檔案裏面的程式碼。不過如果有引用外部的套件腳本，例如 jQuery、Vue 之類的 JavaScript 框架、函式庫，則建議使用經過壓縮的版本（因為通常不會對其做出修改也不太會去檢視它的內容），通常官方文件的末端會是 <em>.min.js</em> 的格式來表示此為壓縮後的文件。</p>
        <figure>
            <img src="/images/learn/html/pagespeed-5.jpg">
        </figure>
        <p>例如 jQuery 官網 CDN 頁面上就分別提供了未壓縮及壓縮後的版本引用方式，3.x 版本甚至還提供了名為 Slim 的閹割版，閹割版主要移除了 AJAX 和 Effect 特效的部份，如果確定要開發的專案不會使用這些功能，就可以導入閹割版的官方腳本文件。</p>
        <p><br></p>
        <h3>5. 使用 CDN 服務</h3>
        <p>什麼是 CDN？CDN 全名為 Content Delivery Network（內容傳遞網路），是指一組分佈在不同地理位置的伺服器，協同工作以提供網際網路內容的快速交付。單從字面上解釋也許不好理解，以下列舉一個情境案例：</p>
        <p>試想當你的網頁可以讓很多國家的人觀看，譬如日本、韓國...甚至是美國，這些不同國家的使用者要讀取資料時，仍須從台灣的伺服器回傳資訊到他們的裝置上，不難設想當距離本地伺服器越遠的使用者，載入網頁所要花的時間也就更長。但如果有些資料內容可以透過使用者所處國家的本地伺服器載入，就可以有效降低他們讀取網頁的時間──這就是 CDN 所提供的技術與服務。簡單來說，CDN 會透過判斷目前使用者的位置，找到最近的 CDN 伺服器並讀取其中的快取內容，讓該使用者需要伺服器回應的時間降到最低，變相提升網頁的讀取速度。</p>
        <figure>
            <img src="/images/learn/html/pagespeed-6.jpg">
        </figure>
        <p>很多虛擬主機服務商都會提供 CDN 服務，像是最知名的免費 CDN 服務商 <a href="https://www.cloudflare.com/zh-tw/learning/cdn/what-is-a-cdn/" target="_blank">CloudFlare</a>。除此之外，現在很多有名的網頁套件 Framework 或 Library 都有提供 CDN 的快取連結提供開發者引用，舉例來說：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-7.jpg">
        </figure>
        <figure>
            <img src="/images/learn/html/pagespeed-8.jpg">
        </figure>
        <p>這是 Codepen 添加外部套件的設定視窗，可以明顯看到這些從外部載入的外掛文件都出自於 CDN 伺服器端，而非套件官方網站本身的網址空間。</p>
        <p><br></p>
        <h5>使用 CDN 的優點：</h5>
        <p>1. 減少網站載入時間<br>透過連結最近的 CDN 伺服器內的快取內容，網站內容能更快的被讀取，同時讓使用者等待載入的時間變短，若是使用較多網站會使用的 JavaScript Library，可能使用者在別的網站已經被載入過，因此在讀取你的網站時，又可以省去載入時間了！</p>
        <p>2. 被 Block 的風險<br>如果網站突然無法連線所使用的 CDN，或是該 CDN 遭受駭客攻擊或其他問題導致無法正常運作，導致網站無法順利讀取 CDN，那麼網頁內容就會無法正常地顯示。</p>
        <p>3. 也許需要更長的載入時間<br>雖然 CDN 標榜的是在地伺服器服務，但也並非遍及世界的任何一個角落。如果使用者離網站本地端伺服器接近，然而該網站使用之 CDN 鄰近卻沒有伺服器，這反倒會讓使用者要花比較長的時間去連線更遠的伺服器端。</p>
        <p><br></p>
        <h5>使用 CDN 的缺點：</h5>
        <p>1. 增加成本<br>雖然像 GoogleAPI、BootstrapCDN 等是提供免費的 CDN 服務，但大多數的 CDN 會依照網站所發出的請求量收費，因此如果有打算將自己網站的文件藉由 CDN 服務提升網站速度，可能要評估使用付費 CDN 每月需要負擔的額外費用。</p>
        <p>2. 被 Block 的風險<br>如果網站突然無法連線所使用的 CDN，或是該 CDN 遭受駭客攻擊或其他問題導致無法正常運作，導致網站無法順利讀取 CDN，那麼網頁內容就會無法正常地顯示。</p>
        <p>3. 也許需要更長的載入時間<br>雖然 CDN 標榜的是在地伺服器服務，但也並非遍及世界的任何一個角落。如果使用者離網站本地端伺服器接近，然而該網站使用之 CDN 鄰近卻沒有伺服器，這反倒會讓使用者要花比較長的時間去連線更遠的伺服器端。</p>
        <p><br></p>
        <h3>6. 減少轉址的次數</h3>
        <p>轉址（Redirects）指的是將原本的網址重新定向到新網址的過程。網站的轉址行為除了會對 SEO 帶來影響，因為每一次的轉址都在向伺服器重新提出一次請求，過多的轉址請求也會為伺服器帶來負擔，盡可能減少網站內的轉址次數，同時也會降低網站效能的負荷。</p>
        <p><br></p>
        <h3>7. 增加並善用快取機制</h3>
        <p>快取（Cache）機制指的就是將使用者要的結果先儲存在快取裡，而不需要再跟資料庫連線，瀏覽器快取可以減少使用者對伺服器的請求，加快頁面載入的時間。舉例來說，假設使用者總是頻繁地造訪某一個網站，而該網站擁有龐大豐富的內容，若該網站沒有建立快取機制，意味著使用者每一次瀏覽網頁時，都要重新向伺服器請求讀取相關資源（譬如 CSS、JavaScript、圖片...等）。反過來說，如果該網站存在快取機制，那麼當使用者初次造訪該網頁時，快取就會將那些靜態的資料儲存在電腦瀏覽器裡，當使用者再次造訪網頁且快取尚未過期時，就會優先呼叫快取保留下來的資料，而不會向伺服器端發送讀取請求。快取的方式其實有好幾種，但不管是什麼方式，它們的目標只有一種：「重複利用資源以避免浪費效能」。</p>
        <h5>網頁的快取機制</h5>
        <p>快取中常說的暫存資源通常是指網頁裡重要的 HTML、CSS、Javascript、圖片...等內容，但網站不大可能總是都一直使用相同的內容，總會有更新的時候，因此 HTTP 1.1 版的協議設計了兩道機制，讓快取在客戶端（Client）與伺服器端（Server）之間透過 Header 的「交互作用」以達成目的。快取的交互作用仰賴 Expires 和 Cache-control 來處理快取的有效期限，後者比較新，假設兩者同時存在，Cache-control 的設定會優先於 Expires。</p>
        <p>Cache-control 示意圖表：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-9.jpg">
        </figure>
        <p>四個主要狀態：</p>
        <ul>
            <li>public：公開的資源，可以被所有節點暫存。</li>
            <li>private：私有的資源，只被允許儲存成使用者的本地快取。</li>
            <li>no-cache：本地暫存，但使用前會先詢問過期沒。</li>
            <li>no-store：一律不會快取內容。</li>
        </ul>
        <p>其中，public 及 private 還可以設定 <em>max-age</em> 來指定快取多久後會過期，而前面提到的 Expires 就是類似的功能，但因為 Expires 屬於 HTTP 比較早期版本的產物，所以 <em>max-age</em> 的值會覆蓋掉 Expires 設定的值。（但這也不意味著 Expires 已一無四處，它的使用時機在於 Cache-Control 不存在的時候）</p>
        <p><em>max-age</em> 用來指定快取多久後會到期，它的值為數字，單位為秒，假設有效期限是 30 天，指定的數字就為 2592000（60 * 60 * 24 * 30）。</p>
        <p><br></p>
        <h3>8. 使用 AMP</h3>
        <p>AMP 的全名叫做 Accelerated Mobile Pages，是 Google 為了提升行動版網頁速度所推出的項目。AMP 的運作機制其實也是一種快取的概念，只是這個快取存在 Google 伺服器裡面，所以當使用者在手機上打開 AMP 頁面時，會發現上方網址列是 Google 的網址，因為 Google 把該網頁儲存在它的快取裡面，只有當使用者對網站進行第二次點擊互動時，才會導向網站自己的網址。</p>
        <p>若想知道更多有關 AMP 的說明，請見下一章的介紹。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p><a href="https://amp.dev/" target="_blank">Accelerated Mobile Pages</a>，簡稱AMP，顧名思義指的就是「加速手機頁面」，意思就是一種為了加快讀取網站內容而生的框架技術，它是由 Google 於 2016 年正式發布的服務項目。</p>
        <p>為什麼需要 AMP？主要原因有兩個：「手機使用者激增」以及「手機效能不一」。</p>
        <h3>手機使用者激增</h3>
        <figure>
            <img src="/images/learn/html/pagespeed-10.jpg">
        </figure>
        <p>上表是國外市調公司《Strategy Analytics》於 2021 年發布的智慧型手機普及率調查報告，指出直至該報告發表的當下，全世界智慧型手機數量持續成長，全世界已有超過一半的人口擁有智慧型手機。而這還「只是」 2021 年的報告，透過圖表可以看到從 2012 開始智慧型手機持有量的曲線幾乎是以等比的速度飛速成長，時至 2023 的今日想必已經遠超兩年前的數字。</p>
        <p>值得一提的是，台灣市調解析同樣也有對國人智慧型手機持有率進行調查，赫然發現台灣人擁有智慧型手機的比例高達近九成（89.2%），足見現代人對手機的高度依賴。這也意味著透過手機上網來獲取想要資訊的使用者越來越多，假如網站需要花費大量時間進行載入，很可能造成使用者不耐進而放棄等待並直接跳出網頁。</p>
        <p><br></p>
        <h3>手機效能不一</h3>
        <p>再來就是手機效能問題，雖說網頁讀取速度和網路速度有密切關聯，但手機晶片處理器同樣也是影響網頁載入的一大關鍵。儘管各家廠牌現今都有推出自家號稱超高效能的旗艦型智慧手機，但並非所有使用者持有的手機都是這些高規格且高價位的手機，仍然有不少人在使用數年前、已老化的舊機子，假如網站內容太龐大、動態特效繁多，且優化也沒臻至完善，對於那些比較中低階或老舊的手機都會比較吃力。</p>
        <p>那麼該如何讓大多數使用者順暢地使用手機來閱覽網頁內容？基於以上理由，大概可以整理出三個方向：</p>
        <ul>
            <li>提升網路速度</li>
            <li>更換高階手機</li>
            <li>優化網頁內容</li>
        </ul>
        <p>網路速度與電信業者有關，更換手機則取決於使用者自身的意志，因此前面兩種方向顯得不切實際，最終還是得從網頁優化著手去做，這也是 Google 推出 AMP 的始源初衷。簡單來說，AMP 就是摒除那些常人不可控的變因之後，盡可能讓使用者用手機快速地載入並閱讀網站裡的內容。</p>
        <p><br></p>
        <h4>AMP 的技術原理</h4>
        <p>AMP 主要由 3 個部分組成：AMP HTML、AMP JS 和 AMP Cache。</p>
        <p><br></p>
        <h5>AMP HTML：</h5>
        <p>是一種專門為 AMP 所設計的 HTML 規範，在圖像、影片和廣告顯示方面有特定專用標籤，如 <em>amp-img</em>、<em>amp-video</em>、<em>amp-iframe</em>，並且為了保持讀取速度，限制了某些非必要性的 HTML 使用。</p>
        <p><br></p>
        <h5>AMP JS：</h5>
        <p>是一套為了保證 AMP HTML 快速且正確顯示的 JavaScript 函式庫，能夠管理網頁載入、快速轉譯舊網頁。</p>
        <p><br></p>
        <h5>AMP Cache：</h5>
        <p>是一種快取和傳輸 AMP 的內容傳遞網路（CDN），也就是當使用者點擊 AMP 網站時，存取的是經過 AMP Cache 最佳化的快取頁面。</p>
        <p>前面講的是 AMP 建構核心的部分，再來講講 AMP 要刪除什麼原本網站裡的內容？其實主要也就兩樣東西──「CSS」與「JavaScript」。不過與其說是刪除，不如說是「簡化」會更貼切，意思是只保留最重要的基本元素，刪除其餘非必要的內容。那什麼是非必要的內容？例如 Javascript 限制只能使用 AMP JS，其他像是 jQuery、AngularJS、Vue...等通通不能使用；至於 CSS 也有規範，AMP 限制 CSS 必須要控制在 50KB 以內，並且要寫在 HTML <em>&lt;head&gt;</em> 裡的 <em>&lt;style&gt;</em> 標籤，不能引用外部的 CSS 檔案。</p>
        <p>所以當我們刪除掉這些內容後，可想而知網頁將會變得有多單調，沒有動態、沒有特效，排版也受限 CSS 簡化無法創造出生動的設計。雖然 AMP 可以讓手機使用者獲得即時資訊，卻也是它的缺點──幾乎所有網頁都長得大同小異，失去鮮明的企業品牌辨別度。</p>
        <p><br></p>
        <h4>如何建立 AMP HTML？</h4>
        <p>AMP HTML 建立方式與一般網頁 HTML 類似，寫法大致上也大同小異。文件副檔名的部分 AMP HTML 一樣可以使用 <em>.html</em>，不過有些人為了方便識別，會採用 <em>.amp.html</em> 的格式來與一般 <em>.html</em> 做區隔。</p>
        <p>如果要建立 AMP HTML 網頁，記得要在 <em>&lt;html&gt;</em> 元素標籤裡加入 <em>amp</em> 屬性。除此之外，<em>&lt;head&gt;</em> 標籤裡則需要包含 <em>charset</em> 與 <em>viewport</em> 屬性的 <em>&lt;meta&gt;</em> 標籤，以及分別放置 CSS 與 JavaScript 的 <em>&lt;style&gt;</em> 與 <em>&lt;script&gt;</em> 標籤。當然，這裡說的 JavaScript 指的是 AMP 使用的 AMP JS。格式範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div&gt;
    &lt;p&gt;&lt;/p&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><em>div</em> > <em>p</em>，區塊元素包含行內元素，此為合法。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;!doctype html&gt;
&lt;html amp lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"&gt;
        &lt;title&gt;Hello, AMPs&lt;/title&gt;
        &lt;link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup/"&gt;
        &lt;script async src="https://cdn.ampproject.org/v0.js"&gt;&lt;/script&gt;
        &lt;style amp-boilerplate&gt; ... &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        <p>一般 HTML 使用的元素基本上 AMP HTML 也可以使用，不過 AMP HTML 也有自訂一些特別的元素標籤來取代對應的 HTML 標籤，像是 <em>&lt;amp-img&gt;</em>（取代 <em>&lt;img&gt;</em>）、<em>&lt;amp-video&gt;</em>（取代 <em>&lt;video&gt;</em>）...諸如此類的元素，還有一些顯示外部網站內容例如 <em>&lt;amp-facebook&gt;</em>、<em>&lt;amp-twitter&gt;</em> ...等等。</p>
        <p><br></p>
        <h4>驗證與 SEO</h4>
        <p>如果想要檢測別人或自己的網站是否有符合 AMP 規範，可透過 Google 提供的 AMP 測試工具：<a href="https://search.google.com/test/amp?hl=zh-TW" target="_blank">AMP 測試</a></p>
        <p>假定網站有通過檢測，瀏覽器網址列下方會有一條象徵 AMP 版本的 Header Bar：</p>
        <figure>
            <img src="/images/learn/html/pagespeed-11.jpg">
        </figure>
        <p>至於關於 SEO 的部分，早期 Google 為了鼓勵網站開發能多多應用 AMP 技術，只要網站本身提供 AMP 網頁，就能吃到 Google 搜尋引擎的排名紅利。不過在 2021 年 Google 調整搜尋演算法的方式後，AMP 的 SEO 紅利也隨之取消，Google 搜尋引擎不再以網站是否具備 AMP 作為判定標準，改以網頁使用體驗及內容作為 SEO 搜尋排名的加權依據，這也算是遏止開發者為了追求 SEO 過度使用 AMP 而完全忽略使用者體驗的歪風。</p>
        <p>儘管不再享有加權，AMP 仍舊是網站執行效率與載入速度上，非常優秀且重要的技術，如果網站內容簡單、不需要特效、形象或互動，就可以考慮加入AMP技術，畢竟網站的開啟、載入與瀏覽速度對SEO來說也是一項非常重要的評分項目。總而言之，Google 目前不以 AMP 技術作為主要加權依據，沒有使用 AMP 技術的網站仍能因為網站架構邏輯完善、內容豐富與優秀的瀏覽體驗，躍升至 SEO 搜尋排名的前排；如果網站沒有特殊需求，像是新聞、純圖文類型的平台，也能透過 AMP 技術來加速網站的載入速度，提升使用者瀏覽網站的耐心與興趣，只是這並不代表使用了 AMP 技術後，排名肯定就會大幅提升。</p>
        <p><br></p>
        <h4>AMP 的優缺點</h4>
        <p>最後來總結一下使用 AMP 網頁的優缺點有哪些：</p>
        <h5>優點：</h5>
        <ol>
            <li>網站載入速度提升。</li>
            <li>提高使用者的網站瀏覽體驗。</li>
            <li>降低網站跳出率。</li>
            <li>提高站內產品、文章或任何連結的點擊率。</li>
            <li>網站載入速度變快，有機會提高 SEO 搜尋排名。</li>
            <li>AMP 是開源專案，任何人都可以免費使用。</li>
            <li>網頁簡單乾淨。</li>
        </ol>
        <p><br></p>
        <h5>缺點：</h5>
        <ol>
            <li>僅限於 Google 搜尋引擎。</li>
            <li>減少了使用者停留在網站的時間。</li>
            <li>廣告投放只能在 Google Ads（Google 的廣告）。</li>
            <li>為了網站內容呈現快速，所以很多特效與裝飾都會被限制，網站設計靈活度低、自由度差，設計僅限於圖文表現。</li>
            <li>只在行動裝置上才能瀏覽 AMP 網頁。</li>
            <li>因 AMP 網站屬於 Google 網域，可能導致流量分散</li>
        </ol>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <dl>
            <dd><a href="https://zh.wikipedia.org/zh-tw/Accelerated_Mobile_Pages" target="_blank">維基百科 - Accelerated Mobile Pages</a></dd>
            <dd><a href="https://frankknow.com/what-is-amp/" target="_blank">維基百科 - Accelerated Mobile Pages</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
