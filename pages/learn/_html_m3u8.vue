<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="42" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、認識 HTTP Live Streaming</a></li>
            <li><a href="#act2">二、什麼是 M3U8？</a></li>
            <li><a href="#act3">三、如何下載與轉換</a></li>
            <li><a href="#act4">四、FFmpeg 工具介紹</a></li>
            <li><a href="#act5">五、使用 JS 播放 M3U8</a></li>
            <li><a href="#act6">六、其他名詞補充</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>在介紹 M3U8 之前，先來講講 HTTP Live Streaming 這項技術，縮寫為 HLS 的 HTTP Live Streaming 是由蘋果公司提出基於 HTTP 的一種串流媒體網路傳輸協定，一般我們稱之為「HTTP 即時串流」。它把整個將影片檔案細分為較小且可下載的 HTTP 檔案，並經由 HTTP 通訊協定傳遞檔案，使用者透過所使用之裝置載入這些 HTTP 檔案，以影片的格式來進行播放，這就是 HLS 的運作原理。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、認識 HTTP Live Streaming</h2>
        <p>承襲序章對 HTTP Live Streaming 粗略的介紹，我們接著來談談使用 HLS 的優點。使用 HLS 的優點是：只要能連上網路的裝置，基本上都支援 HTTP，因此相較於其他使用專屬伺服器的串流通訊而言更容易實行。而真正最大的好處，在於 HLS 串流可依據網路傳輸的速度，單純提高或降低影片的品質，盡可能不干擾影片播放的進度。例如 Youtube，我們觀看影片時，畫質有時會因為網速下降而自動調整為低解析度，但是當網速恢復正常時，畫質也隨之調整回較高解析度的品質，這便是 HLS 實行下的表現（自適應位元速率串流）──當然我們也可以手動自行切換。不過假如沒有此功能，緩慢的網速可能會直接導致影片停止播放。</p>
        <p>HLS 具體是如何運作的，我們可以透過下圖了解：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-1.jpg">
        </figure>
        <p>蘋果公司將 HLS 分成三個主要角色來實行整個運作，這三個角色分別是：</p>
        <p><br></p>
        <h3>1. Server（伺服器）：</h3>
        <p>根據串流服務的不同，伺服器也可分為來自於儲存媒體檔案的伺服器（隨選串流），或串流建立所在的位址（即時串流）。然而無論是何者，伺服器只要在正常傳輸的網路環境下皆可成功啟動串流服務。</p>
        <p>伺服器這個角色主要執行兩件事：「編碼」（Media encoder）與「分段」（Stream segmenter）。</p>
        <p>編碼：<br>重新格式化影片資料，好讓任何裝置都能辨識和解譯資料。HLS 必須使用 H.264 或 H.265 編碼。</p>
        <p>分段：<br>影片以數秒長度的方式分成不同片段，片段長度可自行改變。除了將影片分段， HLS 建立影片區段的索引檔案，以記錄其所屬順序。HLS 也以不同的品質等級，建立幾個區段的複製組合，例如 480p、720p、1080p ...等等。</p>
        <p><br></p>
        <h3>2. Distribution（發佈）：</h3>
        <p>一旦用戶端裝置要求串流，已編碼的影片區段將透過網際網路推送至其裝置。以上是概念上的解釋，具體行為就是一個 HTTP web Server，透過簡單的 Request 與 Response，向用戶端發送對應的影音媒體檔案。例如將 MIME type 限制在 <em>.m3u8</em> 或 <em>.ts</em> 檔案。</p>
        <p><br></p>
        <h3>3. Client（用戶端）：</h3>
        <p>更精確地說，這裡用戶端角色指的是用戶端所使用的裝置，它們的職責在於解析發佈階段產生的索引檔（譬如 <em>.m3u8</em>），並依照索引檔提供的 URL 下載串流影音檔（例如 <em>.ts</em>），串流檔下載足夠量時，將其組裝並呈現給用戶收看。除此之外，用戶端裝置也會觀察網路傳輸速度，切換較高或較低品質的影音畫面。</p>
        <p><br></p>
        <p><strong>如何判斷下載的檔案是否為 HLS？</strong></p>
        <p>基本上，下載的檔案如果是 <em>.m3u8</em> 或 <em>.ts</em> 格式，基本上就能確定它使用的是 HLS 技術。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、什麼是 M3U8？</h2>
        <p>看完 HTTP Live Streaming 的介紹，大概能推論出 M3U8 就是 HLS 運作過程中用來輔助用戶端裝置判讀影音來源的播放清單格式，而 M3U8 是 M3U 的其中一根細枝，後面的 8 則表示該格式採用 UTF-8 進行編碼。</p>
        <p>M3U8 格式檔案的副檔名為 <em>.m3u8</em>，屬於純文字檔，基本上大多數的文字編輯器都能開啟它，包含 Windows 的記事本。</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-2.jpg">
        </figure>
        <p>透過文字編輯器開啟的 <em>.m3u8</em> 檔案只會看到它編寫的資訊，並不能實際播放這份清單裡面記載的影音內容。假如想要播放它，必須透過支援其檔案格式的影音播放媒體，像是 iTunes、VLC media player ...之類，透過這些有提供支援的軟體開啟 <em>.m3u8</em> 後會自動產生一個播放清單，接著就會開始播放清單裡面的影音檔案。總的來說，我們要有 <em>.m3u8</em> 並非影音媒體的一種格式，而是一份播放清單的認知。</p>
        <p><br></p>
        <h3>如何開啟 M3U8 檔案？</h3>
        <p>作為基於 HTML 開發的即時串流，M3U8 的檔案通常會以 URL 連結的形式出現在電腦瀏覽器網頁上，正常思路下通常會認為只要網路可以正常連線，就能直接觀看其播放清單裡面的影音內容。然而，除了蘋果內建的 Safari 瀏覽器之外，其他作業系統（例如 Windows）、瀏覽器（Google Chrome、FireFox）事實上無法直接解析 M3U8 裡面的影音串流，當我們在瀏覽器網址列貼上並前往 M3U8 的 URL 連結，得到的結果通常是直接下載該 M3U8 檔案或顯示其裡面的串流編碼而已。至於手機作業系統方面，iOS3、Android 4.0 以後的版本皆已支援播放 M3U8 影音清單內容。</p>
        <p>說了這麼多，那麼非 Safari 的其他瀏覽器，以及在本機電腦究竟要如何播放 M3U8 呢？在瀏覽器方面，我們可以在網頁上引用有支援處理串流影音功能，像是 <a href="https://videojs.com/" target="_blank">Video.js</a>、<a href="https://flowplayer.com/" target="_blank">flowplayer</a> 這類 JavaScript 套件來進行播放。至於要在本機電腦的媒體播放器播放 M3U8 檔案，則需要透過有支援其格式的播放器軟體，例如 iTunes。至於有些網路教學文章說 Windows 內建的 Windows Media Player 也可以，但經過實測似乎不支持播放，不然就是得開啟串流功能並設定區域連線權限設定什麼的，貿然改變設定的話也許會有資安上的疑慮，故還是尋求坊間其他媒體播放軟體為上。</p>
        <p>VLC media player 是其中一款有支援 M3U8 格式的影音媒體播放軟體，而且已有通過公司安全檢測，因此如果想在電腦上觀看 HLS 串流影音可以優先考慮安裝這款軟體（以 MCD-ONE 上提供的安裝檔為主，不直接下載官網連結的版本以避免可能的資安問題）。</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-3.jpg">
        </figure>
        <p>如果你在安裝過程中有勾選將 VLC media player 預設為所有影音檔案開啟的應用程式，那麼會發現安裝完成後電腦上的 .m3u8 檔案圖示已自動更換為 VLC media player 的圖示，此時就能直接開啟並播放它。如果沒有設為預設，抑或者是要播放網路上的 M3U8 URL，我們可以開啟 VLC media player 程式，從功能面板去呼叫：</p>
        <p><br></p>
        <h6>1. 工具列選擇「媒體」->「開啟網路串流」</h6>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-4.jpg">
        </figure>
        <p><br></p>
        <h6>2. 輸入網址</h6>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-5.jpg">
        </figure>
        <p>將要觀看的 HLS 串流 URL 複製貼到「請輸入網址」的輸入框裡，最後按下「播放」便能觀看影音內容了。</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-6.jpg">
        </figure>
    </div>
    <div class="text-block" id="act3">
        <h2>三、如何下載與轉換</h2>
        <p>除了支援播放串流影音之外，VLC media player 也可以把裡面影音內容下載下來（或稱轉換）。步驟如下：</p>
        <h6>1. 在輸入串流網址的下方「播放」旁箭頭->「轉換」</h6>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-7.jpg">
        </figure>
        <p>首先在輸入串流網址的下方「播放」按鈕旁邊有一顆小的三角形按鈕，點擊後會出現清單，選擇「轉換」：</p>
        <p><br></p>
        <h6>2. 選擇要轉換的格式</h6>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-8.jpg">
        </figure>
        <p>接著會跳出彈窗，在設定檔的下拉清單中選擇想要轉換的格式，例如 720P 畫質的 .mp4 格式，選擇好後按下目的檔案儲存位置的「瀏覽」按鈕：</p>
        <p><br></p>
        <h6>3. 更改檔案名稱</h6>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-9.jpg">
        </figure>
        <p>預設名稱通常是原本 HLS 的串流名稱與副檔名，記得修改掉，不然之後輸出的檔案可能會是原本的 HLS 格式。重新命名後點擊「存檔」，回到轉換彈窗後再按下「開始」，VLC media player 即開始進行轉檔的動作。</p>
        <p><br></p>
        <h6>4. 轉檔完成</h6>
        <p>當藍色進度條跑完就代表轉檔完成了：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-10.jpg">
        </figure>
        <p>前往儲存檔案的資料夾位置可以查看完成轉換的輸出檔案：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-11.jpg">
        </figure>
        <blockquote class="is-warning">
            <p>雖說 VLC media player 有提供 HLS 轉檔這項功能，但經過測試有許多來源的 HLS URL 都無法順利轉出（即便轉檔輸出成影像格式，也就只有寥寥數秒的黑畫面），有可能是主流影音平台如 Youtube 對影音的加密方法比較嚴謹所以無法解析，但具體原因仍未知。</p>
        </blockquote>
        <p><br></p>
        <h3>用線上工具下載/轉換 HLS M3U8：</h3>
        <p>誠如前面提到 VLC media player 可能無法順利將 HLS 播放清單裡面的影音內容輸出成電腦可以直接觀看的影音格式，摒除主流影音平台加密技術的因素，我們還有其他方法可以提取網路上 HLS 串流 URL 裡面的內容，那就是這款「<a href="https://github.com/Momo707577045/m3u8-downloader" target="_blank">m3u8 视频在线提取工具</a>」套件，官方 GitHub 文件下方有撰寫使用教學，如果不甚清楚也可以參考以下手把手的實作練習流程：</p>
        <p><br></p>
        <h6>1. 取得 HLS URL</h6>
        <p>這裡以 Yahoo 新聞的影音串流為例，使用的瀏覽器為 Google Chrome，在要進行轉換的新聞連結畫面下打開「開發者工具」（快捷鍵 F12），並切換到「網路」（Network）頁籤。</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-12.jpg">
        </figure>
        <p>讓它偵測監聽一會兒，底下會慢慢列出該網頁使用到的各項資源文件。我們可以在「篩選」輸入框輸入「m3u8」，來過濾出我們要找的 HLS 串流檔案：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-13.jpg">
        </figure>
        <p>有時候可能會過濾出很多個 M3U8 文件，這時就需要點擊去查看它的內容。點擊該文件，右側頁籤切換到「預覽」（Preview）就可以查看它的程式碼，如果程式碼裡面沒有很多 <em>.m3u8</em> 或 <em>.ts</em> 的文件名稱，即表示該 M3U8 檔案很可能只是索引文件，而非真正的播放清單。像下方這個檔案就不是我們要找的目標：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-14.jpg">
        </figure>
        <p>至於底下那兩個檔案就是播放清單的檔案：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-15.jpg">
        </figure>
        <p>確認後便可以切換回「標頭」（Headers）的頁籤：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-16.jpg">
        </figure>
        <p>第一欄資訊裡面的 Request URL 即為該播放清單的網址，將其選取起來並複製。</p>
        <p><br></p>
        <h6>2. 將 URL 貼到線上工具</h6>
        <p>連結：<a href="https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html?source=https://edgecast-cf-prod.yahoo.net/cp-video-transcode/production/d36fa0a9-3bac-3f89-9361-590d61767f60/2023-01-31/00-29-39/fa4c4986-e8c9-546c-9e1d-0dde21007b72/stream_960x540x806_v2.m3u8" target="_blank">m3u8 视频在线提取工具</a></p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-17.jpg">
        </figure>
        <p>把在上一個步驟中取得的 HLS URL 複製並貼上到線上工具的輸入框內，右側分別有三個按鈕：「特定範圍下載」、「原格式下載」、「轉碼為MP4下載」。「轉碼為MP4下載」應該不難理解，就是直接將播放清單裡面切割成各個小片段的 <em>.ts</em> 檔案合併並輸出為 <em>.mp4</em> 檔案。「原格式下載」也是將 <em>.ts</em> 合併成一個，只不過輸出的檔案一樣會維持副檔名為 <em>.ts</em> 的影像格式。</p>
        <p>至於「特定範圍下載」則可以讓我們設定想要合併的 <em>.ts</em> 範圍：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-18.jpg">
        </figure>
        <p>線上工具會自動解析使用者要轉檔的 HLS URL 裡面有多少個 <em>.m3u8</em> 或 <em>.ts</em> 分割檔，我們可以自行修改分割檔合併的起始值與結束值，分別輸入好數值後按下「Enter」鍵即可。</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-19.jpg">
        </figure>
        <p><br></p>
        <p>不過這個線上工具也並非萬靈丹，根據開發者的敘述，也是有下載轉檔的影音無法進行觀看：</p>
        <blockquote>
            <p>【下载后的视频资源不可看】</p>
            <p><br></p>
            <p>● 网站对视频源进行了加密操作。不同的视频网站有不同的算法操作。无法通用处理。</p>
            <p><br></p>
            <p>● 一般网站不会有这种情况。爱奇艺，腾讯等大视频网站才会有该安全措施。</p>
        </blockquote>
        <p>當然除了以上提到的應用程式、線上工具，網路上依然有不少提供相關服務的軟體、套件，例如 Google Chrome 的線上應用程式商店裡有一款名為「<a href="https://chrome.google.com/webstore/detail/%E7%8C%AB%E6%8A%93/jfedfbgedapdagkghmgibemcoggfppbb">貓抓</a>」的擴充套件也具備相同的功能，有相關需求或對此感興趣的人可以多方嘗試看看。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、FFmpeg 工具介紹</h2>
        <p>前面幾個章節大概介紹了 M3U8 的歷史淵源，以及相關播放及下載方式，而本章節則說明要如何自行製作 M3U8 播放清單。這裡使用首選的工具為 <a href="https://ffmpeg.org/" target="_blank">FFmpeg</a>，它是一款基於 C 程式語言開發的開源多媒體處理框架，FF 指的是 Fast Forward（快進之意），可以為各種影音格式的檔案執行解碼、編碼、串流...等動作。</p>
        <p><br></p>
        <h3>Windows 安裝流程：</h3>
        <h6>1. 下載資源包</h6>
        <p>下載連結：<a href="https://ffmpeg.org/download.html" target="_blank">https://ffmpeg.org/download.html</a></p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-20.jpg">
        </figure>
        <p>首先選擇你使用的作業系統，以 Windows 為例，滑鼠移至 Windows 圖示上方，無需點擊，下方連結選項會自動切換與該作業系統對應的資源項目，然後點擊「Windows builds from gyan.dev」連結。</p>
        <p><br></p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-21.jpg">
        </figure>
        <p>你可以直接下載最新的版本，或是從已發布版本（release builds）中挑選相對穩定的舊版本，附圖範例選擇後者，點擊壓縮檔連結進行下載。下載完成後將檔案解壓縮，會看到資料夾有這些內容：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-22.jpg">
        </figure>
        <p>由於後續要設定電腦環境的配置，建議將資料夾檔案轉移到個人適當管理的地方，並將資料夾重新命名成更淺顯易懂的名稱。譬如：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-23.jpg">
        </figure>
        <p><br></p>
        <h6>2. 配置環境變數</h6>
        <p>開啟「控制台」，點擊「系統與安全性」：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-24.jpg">
        </figure>
        <p>接著選擇「系統」：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-25.jpg">
        </figure>
        <p>點擊系統面板右側的「進階系統設定」->「環境變數」：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-26.jpg">
        </figure>
        <p>找到「Path」變數，並雙擊它：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-27.jpg">
        </figure>
        <p>右側點擊「新增」，然後把你存放 FFmepg bin 資料夾檔案的完整資料夾路徑貼上，例如 <em>D:\FFmpeg\bin</em>，完成後按下「確定」：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-28.jpg">
        </figure>
        <p><br></p>
        <h6>3. 測試安裝設定是否成功</h6>
        <p>上個步驟已經完成了 FFmpeg 在作業系統的設置，但不像一般安裝應用程式完成安裝後會告知是否有成功安裝，因此我們可以透過命令提示元指令來確認是否有正確將 FFmpeg 安裝到作業系統裡。</p>
        <p><br></p>
        <p>從「開始」選單裡找到「命令提示字元」應用程式，或快捷鍵「Windows」+「R」，輸入「cmd」亦可快速呼叫出命令提示字元，然後輸入 <em>ffmpeg –version</em> 指令：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-29.jpg">
        </figure>
        <p>儘管版本號未必會相同，但如果有回饋以下這些資訊就代表環境設置的操作是有成功的：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-30.jpg">
        </figure>
        <p><br></p>
        <h3>MAC 安裝流程：</h3>
        <h6>1. 安裝 Homebrew</h6>
        <p>如果使用的作業系統為蘋果 MAC，可以考慮透過 <a href="https://brew.sh/" target="_blank">Homebrew</a> 來安裝 FFmepg，如果你的 MAC 沒有安裝過 Homebrew，請打開終端機，輸入下方指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></pre>
        </div>
        <p>安裝完成後可以透過 <em>brew -v</em> 來檢查 Homebrew 是否有安裝成功。</p>
        <p><br></p>
        <h6>2. 安裝 FFmepg</h6>
        <p>開啟終端機，透過 Homebrew 的 <em>brew</em> 指令來安裝 FFmepg：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">$ brew install ffmpeg</code></pre>
        </div>
        <p>之後可輸入 <em>ffmpeg -v</em> 指令來確認 FFmepg 是否有成功安裝至 MAC 電腦裡。</p>
        <p><br></p>
        <p>假如因為各種原因導致你的 MAC 怎麼樣就是無法透過 Homebrew 指令順利安裝 FFmepg，那麼也可以考慮下載 <a href="https://ffmpeg.org/download.html" target="_blank">FFmepg</a> 提供的資源包，滑鼠移至蘋果圖示上方，點擊下方的「Static builds for macOS 64-bit」連結：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-31.jpg">
        </figure>
        <p>點擊下載第一個壓縮檔連結：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-32.jpg">
        </figure>
        <p>下載好後解壓縮，你會得到一個名稱「ffmepg」的 Unix 執行檔：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-33.jpg">
        </figure>
        <p>由於這個檔案並非從 App Store 下載的應用程式，直接開啟嘗試安裝通常會跳出「無法打開『ffmpeg』，因為無法驗證開發者」的阻擋警告訊息，請確認是否已有開啟第三方 APP 安裝的允許權限。</p>
        <p><br></p>
        <p>打開終端機，用指令前往「下載」資料夾並進行安裝：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">$ cd Downloads
$ ./ffmpeg [option]</code></pre>
        </div>
        <p>如果上述方法依舊無法安裝，可試著參閱這篇文章的方法： <a href="https://www.bilibili.com/read/cv16171744/" target="_blank" >MAC 安装ffmpeg失败解决方案(附ffmpeg常用命令使用文档)</a></p>
        <p><br></p>
        <h3>事前作業：</h3>
        <p>在開始用 FFmepg 指令對影音媒體檔案進行各項操作之前，記得要將命令提示字元的路徑切換至影音媒體檔案所在的資料夾路徑底下，否則 FFmepg 執行指令時會無法找到影音檔案的所在位置。比如資料夾（名稱為 video）在桌面，其輸入指令為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">cd Desktop\video</code></pre>
        </div>
        <p><br></p>
        <h3>語法規則：</h3>
        <p>我們可以在命令提示字元視窗輸入 <em>ffmpeg</em> 指令，可以從返回訊息中找到 FFmepg 編譯指令的語法基本規則：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-34.jpg">
        </figure>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...</code></pre>
        </div>
        <ul>
            <li><em>ffmpeg</em>：表示 FFmepg 執行的基本指令名稱。</li>
            <li><em>[options]</em>：表示 FFmepg 全域參數項目。譬如 <em>-y</em> 用來複寫輸出的檔案、<em>-vol volume</em> 用來改變聲音檔的音量...等等，非必要指令。</li>
            <li><em>[[infile options] -i infile]...</em>：表示輸入的指令部份。</li>
            <li><em>{[outfile options] outfile}...</em>：表示輸出的指令部份。</li>
        </ul>
        <p><br></p>
        <p>輸入與輸出指令的規則乍看不好理解，我們直接透過下方的簡易範例演示其功用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg -i a.mov -c copy b.mp4</code></pre>
        </div>
        <p><em>-i</em> a.mov 為輸入部份，<em>-i</em> 表示輸入指定檔案，<em>a.mov</em> 為檔案名稱，整體的意思為將 <em>a.mov</em> 餵給 <em>ffmpeg</em>，讓它吐出我們想要的另一個東西。<em>-c copy b.mp4</em> 則表示輸出的部份，<em>b.mp4</em> 就是前面我們餵的 <em>a.mov</em> 經過 <em>ffmpeg</em> 轉換後輸出的新檔案。<em>-c</em> 表示為輸出的檔案指定編碼格式，<em>copy</em> 意思則是直接複製 <em>a.mov</em> 的音頻與影像編碼數據，這整串指令得以將來源檔案快速地轉換成另一種想要的格式。</p>
        <p>補充一點，輸入指令中的 <em>[infile options]</em> 參數選項只對輸入的檔案有作用，不過大多情況下不太會去使用到它；反之 <em>[outfile options]</em> 為輸出檔案的參數選項。</p>
        <p><br></p>
        <h3>切割檔案：</h3>
        <p>以下各項情境需求將都會先看範例，然後再來解釋各個指令代碼的用途。假設我們只要分割來源檔案的部份內容並另外輸出新的影片片段，比如只擷取 <em>In.mp4</em> 這個影片開頭的前五秒，FFmpeg 的指令為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg -ss 00:00:00 -t 00:00:05 -i In.mp4 -vcodec copy -acodec copy Out.mp4</code></pre>
        </div>
        <ul>
            <li><em>-ss</em>：開始擷取的時間點。</li>
            <li><em>-t</em>：擷取的時間長度。</li>
            <li><em>-i</em>：輸入的檔案對象，也就是我們要擷取的檔案來源 In.mp4。</li>
            <li><em>-vcodec copy</em>：複製影像的編碼。</li>
            <li><em>-acodec copy</em>：複製聲音的編碼。</li>
        </ul>
        <p>假如擷取的新片段需要包含來源影像和聲音的話，那麼指令上 <em>-vcodec</em> 和 <em>-acodec</em> 都要一併輸入以利複製（<em>copy</em>）給新的檔案。當然也可以直接使用 <em>-c copy</em> 悉數複製編碼過去。</p>
        <p>結果：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-35.jpg">
        </figure>
        <p><br></p>
        <h3>合併檔案：</h3>
        <p>前面講到分割檔案，那麼如果要將很多不同的檔案合併成一個新檔案呢？假設現在手邊有 <em>file01.ts</em> ~ <em>file03.ts</em> 共計三個檔案，我們要將其合併成一個檔案並命名為 <em>Out.mp4</em>，整串指令為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg -i "concat:file01.ts|file02.ts|file03.ts" -c copy Out.mp4</code></pre>
        </div>
        <ul>
            <li><em>-i：</em>輸入的檔案對象。</li>
            <li><em>concat</em>：表示要用來合併的檔案，以 <em>|</em> 串聯每一個檔案，並用雙引號 " 概括起來。</li>
            <li><em>-c copy</em>：完全複製來源檔案全部的編碼格式。</li>
        </ul>
        <p>結果：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-36.jpg">
        </figure>
        <p><br></p>
        <h3>製作 M3U8 播放清單：</h3>
        <p>其實和上一節「合併檔案」的指令有同工異曲之妙，拿上面範例來說，我們只要將合併輸出的新檔案副檔名格式修改為 <em>.m3u8</em> 即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg -i "concat:file01.ts|file02.ts|file03.ts" -c copy Out.m3u8</code></pre>
        </div>
        <p>結果：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-37.jpg">
        </figure>
        <p>你會發現 <em>.m3u8</em> 播放清單製作好了，且 FFmepg 會自動將原本輸入的檔案視情況重新分割成許多分割檔案。</p>
        <p>所以在這裡可以得出一個結論：如果使用 FFmepg 來製作 M3U8 播放清單，我們大可不必先將原始檔案切割成許多細小的 <em>.ts</em> 或 <em>.m4s</em> 之類的串流格式，然後再重新合併成播放清單。我們反而可以直接用指令讓原始檔輸出 <em>.m3u8</em> 格式，FFmpeg 就可以自動幫我們完成分割的動作。</p>
        <p>我們拿前面 <em>In.mp4</em> 為例，輸入：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">ffmpeg -i "concat:In.mp4" -c copy Out.m3u8</code></pre>
        </div>
        <p>然後得到：</p>
        <figure>
            <img src="/images/learn/html/m3u8/m3u8-38.jpg">
        </figure>
        <p>完全不需要先經過轉檔或分割小檔案的程序，是不是很方便呢？</p>
        <p><br></p>
        <h3>教學影片：</h3>
        <p>FFmpeg 的指令用途族繁不及備載，如果對 FFmpeg 有興趣想要更進一步了解、學習相關概念和指令操作，可以參考以下個人覺得解說蠻淺易懂的某位 Youtuber 的系列教學介紹：</p>
        <ul>
            <li><a href="https://youtu.be/qf90-IeE4q8" target="_blank">ffmpeg实用教程：1 基础安装与介绍</a></li>
            <li><a href="https://youtu.be/oa7RaknU-2U" target="_blank">ffmepg实用教程：2 基础使用方法入门</a></li>
            <li><a href="https://youtu.be/dBsqIL11Q4I" target="_blank">ffmpeg实用教程：3 ffplay万能播放器</a></li>
            <li><a href="https://youtu.be/xPOwD3ld4k4" target="_blank">ffmpeg实用教程：4 ffprobe 音视频分析工具</a></li>
            <li><a href="https://youtu.be/bFK6zSXMhbY" target="_blank">ffmpeg实用教程：5 编码与封装格式</a></li>
            <li><a href="https://youtu.be/Py03rrjgGEI" target="_blank">ffmpeg实用教程：6 视频转码指南</a></li>
            <li><a href="https://youtu.be/fAYLSs5srfI" target="_blank">ffmpeg实用教程：7 音频转码指南</a></li>
        </ul>
    </div>
    <div class="text-block" id="act5">
        <h2>五、使用 JS 播放 M3U8</h2>
        <p>由於只有 MAC 的 Safari 瀏覽器能直接讀取 M3U8 的播放清單，其他作業系統與瀏覽器（包含在 MAC 安裝的其他瀏覽器）若開啟 M3U8 檔案只能讀取其內部的編碼指令，或是直接下載檔案到本機端裡面。因此，我們需要藉由套件讓使用者可以在這些瀏覽器順利播放 M3U8 串流播放清單。也許你會疑問為什麼透過 JavaScript 就可以做到原本瀏覽器做不到的事情（播放 HLS）？其實這和 W3C 的 Media Source Extensions 規範有關，有關 Media Source Extensions 的詳細介紹會放在補充章節說明，這裡只要先知道我們可以利用一些熱門、常見且容易使用的 JavaScript 框架、函式庫，像是 <a href="https://videojs.com/" target="_blank">Video.js</a>、<a href="https://hls-js.netlify.app/demo/" target="_blank">hls.js</a> ...等來實現播放串流影音的需求，而本章節中將以 hls.js 作為我們的首選輔助套件。</p>
        <p><br></p>
        <h3>套件介紹：</h3>
        <p>官方 GitHub 連結：<a href="https://github.com/video-dev/hls.js">https://github.com/video-dev/hls.js</a></p>
        <p>hls.js 名稱的 hls 其實指的就是 HLS（HTTP Live Streaming），HTTP 即時串流之意，有關 HLS 的介紹第一個章節已有概略的說明，此處就不再贅述，我們只要知道 hls.js 就是用來專門處理串流影音的函式庫。和一般影音播放器套件相較，hls.js 最大優點在於不需要引用任何播放器，只要確保瀏覽器能支援 HTML5 的 <em>&lt;video&gt;</em> 標籤便能運行，套件導入到專案的方式也相當簡單。</p>
        <p><br></p>
        <h3>使用方式：</h3>
        <h6>1. 下載腳本文件並引用</h6>
        <p>將 hls.js 的運行角本檔案引用到網頁上，語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdn.jsdelivr.net/npm/hls.js@latest"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p>建議將腳本檔案下載到專案資料夾裡用本機端引用的方式為佳。</p>
        <p><br></p>
        <h6>2. 建立 video 元素</h6>
        <p>在要插入影片的位置處建立 <em>&lt;video&gt;</em> 標籤，並賦予 ID 名稱，以便給 hls.js 調用。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;video id="demo" loop autoplay muted&gt;&lt;/video&gt;</code></pre>
        </div>
        <p>hls.js 只是幫助我們播放 HLS 協議的函式庫，其運行基本不影響 <em>&lt;video&gt;</em> 標籤本身的屬性，因此可視需求自行添加，比如範例裡就另外啟用了「重複播放」、「自動播放」、「靜音」三個屬性功能。（基於瀏覽器資安政策，如果要讓影片自動播放，起始狀態必須設置為靜音）</p>
        <p><br></p>
        <h6>3. 撰寫 JavaScript</h6>
        <p>接著是 JavaScript 的部份，一般而言會透過呼叫 <em>Hls.isSupported()</em> 檢查使用者瀏覽器是否支援 HLS 功能並回傳 Boolean 值，如果 Boolean 值為 <em>true</em>，就會繼續執行判斷式裡面的內容。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (Hls.isSupported()) {
    // 要執行的函式內容
}</code></pre>
        </div>
        <p>再來就是建立 hls 物件並與 video 做綁定了，以下先展示基本執行的程式碼，然後再解釋各個關鍵事件與方法的用途：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (Hls.isSupported()) {
    var video = document.getElementById("demo");
    var hls = new Hls();
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource("file.m3u8");
    });
}</code></pre>
        </div>
        <ul>
            <li><em>hls.attachMedia()</em>：attachMedia 可以幫我們連結 HLS 物件與 video 變數所設定的 <em>video</em> 對應的 ID 對象。</li>
            <li><em>hls.on()</em>：表示 hls.js 事件監聽的方法，其構成為 <em>hls.on(事件名稱, 回呼函式)</em>。</li>
            <li><em>Hls.Events.MEDIA_ATTACHED</em>：指的是當 hls 使用 <em>attachMedia</em> 與某些 DOM 物件成功綁定的這個事件。<em>Hls.Events</em> 的種類非常多樣，稍後會再另外補充說明。</li>
            <li><em>hls.loadSource</em>：要載入的影音媒體檔案的來源，可以是本機端文件路徑，也可以是 URL 連結。</li>
        </ul>
        <p>到這裡一個基本能播放包含 M3U8 格式在內的 HLS 串流影音內容就算完成了。且看實作範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="js,result" data-slug-hash="ExpMewK" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/ExpMewK">
            hls.js</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>補充說明：</h3>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f2">事件</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.MEDIA_ATTACHING</em></div>
                    <div class="f-f3">HLS 物件附加到媒體元素之前觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.MEDIA_ATTACHED</em></div>
                    <div class="f-f3">HLS 物件成功附加到媒體元素時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.MEDIA_DETACHING</em></div>
                    <div class="f-f3">從 media 元素中分離 HLS 物件之前觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.MEDIA_DETACHED</em></div>
                    <div class="f-f3">HLS 物件與媒體元素分離時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.BUFFER_RESET</em></div>
                    <div class="f-f3">當影片緩衝重置時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.LEVEL_SWITCHING</em></div>
                    <div class="f-f3">當發出切換畫質請求時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.AUDIO_TRACK_SWITCHING</em></div>
                    <div class="f-f3">發出聲音檔切換請求時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.AUDIO_TRACK_SWITCHED</em></div>
                    <div class="f-f3">聲音檔切換後觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.AUDIO_TRACK_LOADING</em></div>
                    <div class="f-f3">聲音檔加載開始時觸發。</div>
                </div>
                <div class="f-row">
                    <div class="f-f2"><em>Hls.Events.AUDIO_TRACK_LOADED</em></div>
                    <div class="f-f3">聲音檔加載完成時觸發。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act6">
        <h2>六、其他名詞補充</h2>
        <p>本章節將針對整篇文章所提及的一些專有名詞或技術做一些補充介紹。</p>
        <p><br></p>
        <h3>HTTP：</h3>
        <p>HTTP（HyperText Transfer Protocol，超文本傳輸協定）是應用程式層的通訊協定，用以在多個連線網路的裝置間傳輸資訊。一般使用者可存取的每個網站和應用程式，都是在 HTTP 上執行。具體上 HTTP 是根據要求和回應傳輸資料，且幾乎所有 HTTP 訊息都是特定要求，或對要求作出的回應。</p>
        <p>HTTP 上的串流不適用於標準的要求-回應模式。用戶端和伺服器之間的連線在串流期間維持開放，且伺服器將推送影片資料至用戶端，因此用戶端毋須要求每個影片資料的區段。</p>
        <p><br></p>
        <h3>串流：</h3>
        <p>串流透過網際網路向使用者傳遞視覺和音訊媒體。它的運作方法是：持續傳送少量的媒體檔案，而不是立即傳送所有檔案。原始的媒體檔案將儲存於遠端，或若為即時串流，會利用遠端攝像機或麥克風即時建立檔案。如此一來，使用者無需將影片或音訊檔案下載至裝置，即可播放檔案。</p>
        <p>除了 HLS 之外還有一些類似的串流通訊協定，例如：也在 HTTP 上執行，以及也提供自適應位元速率串流的 MPEG-DASH 和 HDS。在 RTMP 或 HDS 上執行的 Adobe Flash 一度是視訊串流的主流技術；不過，許多瀏覽器已不再支援 Flash。與 HLS 同樣常見於直播所使用的 RTMP 技術雖仍在使用當中，但已在走下坡路。</p>
        <p><br></p>
        <h3>MIME type：</h3>
        <p>中文譯為「網際網路媒體類型」，是一種給網際網路上傳輸的內容賦予分類的網際網路標準，最早是用在電子郵件系統上，後來也應用拓展到瀏覽器服務。藉由 MIME 語法來表示引用對象的類型與格式，瀏覽器運作的時候就能準確地判讀目標的用途，但假如引用的檔案類型與 MIME 描述不符，就會造成瀏覽器解讀錯誤，致使網頁無法正常地運作。</p>
        <p>通常網頁宣告引用對象的 MIME type 是由 <em>type/subtype</em> 大類型細分小類型的語法結構所組成，大小寫不限，不過通常會以小寫書寫表示。以下就是過去我們很常見的一個經典定義範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script type="text/javascript" src="script.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p>儘管現在的瀏覽器已能識別部分 MIME type 故可以省略不寫，但其中 <em>type="text/javascript"</em> 這串語法即表示 &lt;script&gt; 要引用的檔案類型是 JavaScript 的文件檔案。</p>
        <p><br></p>
        <h3>H.264：</h3>
        <p>H.264，也稱作 MPEG-4 AVC（Advanced Video Codec，高級影像編碼），是一種視訊壓縮標準，同時也是一種被廣泛使用的高精度影像的錄製、壓縮和發佈格式。H.264 因其是藍光光碟的一種編解碼標準而著名，所有藍光播放機都必須能解碼 H.264。比其他編碼標準，H.264 有著更高的影像品質和更低的碼率，因此受到了人們的認可，H.264 也被廣泛用於網路流媒體資料、各種高清晰度電視陸地廣播，以及衛星電視廣播等領域。</p>
        <p><br></p>
        <h3>H.265：</h3>
        <p>H.265/HEVC 的編碼架構，大致上和 H.264/AVC 的架構相似，H.265 標準圍繞著，現有的影像編碼標準 H.264，保留原來的某些技術，同時對一些相關的技術加以改進。新技術使用先進的技術，用以改善碼流、編碼品質、延時和演算法複雜度之間的關係，達到最優化設置。</p>
        <p>比起 H.264/AVC，H.265/HEVC 提供了更多不同的工具來降低碼率，以編碼單位來說，H.264 中每個宏塊（marcoblock, MB）大小都是固定的16x16像素，而 H.265 的編碼單位可以選擇從最小的 8x8，到最大的 64x64。在相同的圖像品質下，相較於 H.264，通過 H.265 編碼的影像大小，將減少大約 39-44%（不過這個數字仍會因品質控制的測定方法不同而會有相應的變化）。在碼率減少 51-74% 的情況下，H.265 編碼影像的品質，還能與 H.264 編碼影像近似甚至更好。</p>
        <p><br></p>
        <h3>M3U8 編碼語法：</h3>
        <p>如果用文字編輯器打開 <em>.m3u8</em> 文件，裡面的編碼格式最基本的通常會長這樣：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:2
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:2.000000,
IndexVideo1_0.ts
#EXTINF:2.000000,
IndexVideo1_1.ts
#EXTINF:2.000000,
IndexVideo1_2.ts
#EXTINF:2.000000,
IndexVideo1_3.ts
#EXTINF:2.000000,
IndexVideo1_4.ts
#EXT-X-ENDLIST</code></pre>
        </div>
        <ul>
            <li><em>#EXTM3U</em>：M3U8 的開頭標籤，是必須包含也必須位於文件中的第一行。</li>
            <li><em>#EXT-X-VERSION</em>：M3U8 文件的版本。</li>
            <li><em>#EXT-X-TARGETDURATION</em>：用來指定每個分割切片檔案持續時間的最大值，後續 #EXTINF 標籤的時間數值不得大於此標籤設定的數值。比如範例中設定為 2，表示各分割檔案的時長不得大於兩秒。</li>
            <li><em>#EXT-X-MEDIA-SEQUENCE</em>：開啟 M3U8 時用來播放對應序列數值之分割檔案名稱。</li>
            <li><em>#EXTINF</em>：表示分割切片檔案（下一行）的持續時間。</li>
            <li><em>#EXT-X-ENDLIST</em>：表示切片結束，也可以視為該 M3U8 文件播放到這裡停止不再更新。因此有些人會以文件是否有這行標籤作為直播串流或點播串流的依據，該標籤不一定會位於整份文件的最末端，但一個 M3U8 文件只能出現一次此指令標籤。</li>
        </ul>
        <p><br></p>
        <h3>MPEG2-TS：</h3>
        <p>不管是自行轉譯或下載網路上 M3U8 播放清單時，時常會看到播放清單裡面的分割檔案的副檔名格式為 <em>.ts</em>，這些 <em>.ts</em> 檔案就是 MPEG2-TS 其中一種副檔名，TS 代表「傳輸流」（Transport Stream）的意思，主流上都用來作為高清裝置的標準格式，像是電視、攝影機...等。而我們在網路上下載下來的 TS 檔案，則多半可能源自於 DVD 藍光光碟中提取出來的。</p>
        <p>由於 TS 影片的兼容性不是很好，並非所有裝置都能直接支援播放，除了透過轉檔方式將其轉換成 MP4 或其他熱門影音格式外，通常還有另一種簡單直白的方法──那就是嘗試直接將副檔名更改成 <em>.mpeg</em>，現今大多裝置設備或媒體播放器皆能識別此副檔名格式的檔案。</p>
        <p><br></p>
        <h3>Media Source Extensions：</h3>
        <p>媒體源擴充（Media Source Extensions，縮寫為 MSE）是 W3C 其中一項規範，它允許 JavaScript 將位元流（bitstream）傳送至網頁瀏覽器中支援 HTML5 影音的編解碼器。所以一些多媒體常見的直播協議，像是 HLS、DASH、HTTP-FLV ...等，若瀏覽器本身無法直接支援播放，通常就會透過此協議讓提供相關支持的 JavaScript 函式庫來協助影片能在網頁上正常播放顯示。</p>
        <p>根據 W3C 的解釋，建立 MSE 的用意是讓 JavaScript 去擴充 HTMLMediaElement（也就是<em>&lt;audio&gt;</em>、<em>&lt;video&gt;</em>）以彌補當前網頁影音的不足之處。MSE 以 MediaSource 作為影音數據來源物件，並透過 SourceBuffer 與 TrackBuffer API 處理，最終用 Decoder ( 解碼器 ) 去做對應音訊、影像的編碼解碼，使其能從現有的 HTML5 HTMLMediaElement 元素上播出。</p>
        <p>不同的直播協議，提供相關支援的 JavaScript 函式庫也不同，例如 HLS 會使用 <a href="https://github.com/video-dev/hls.js/" target="_blank">hls.js</a> 來解析、幫助前端轉譯 HTTP-FLV 的 <a href="https://github.com/Bilibili/flv.js/" target="_blank">FLV.js</a>，或是使用 <a href="https://github.com/Dash-Industry-Forum/dash.js" target="_blank">DASH.js</a> 解析 MPEG-DASH 協議，使用這些函式庫之前最好先了解自己所使用的直播協議類型是哪一種方能對症下藥。</p>
        <p>儘管目前各大主流的瀏覽器皆已有支援 WSE 協議，但這不意味著所有使用者所有瀏覽器都有提供支援，基本上太舊的瀏覽器版本仍舊有可能不支援 WSE，導致即便引用 JavaScript 函式庫，該瀏覽器依然無法正常播放直播協議的影音檔案。</p>
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