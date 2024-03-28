<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="58" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、認識 API</a></li>
            <li><a href="#act2">二、Web API</a></li>
            <li><a href="#act3">三、Web API 的語法結構</a></li>
            <li><a href="#act4">四、REST 與 RESTful API</a></li>
            <li><a href="#act8">八、什麼是 CORS？</a></li>
            <li><a href="#act9">九、前端 API 與後端 API 的差異</a></li>
            <li><a href="#act10">十、實用的 API 工具</a></li>
            <li><a href="#act11">十一、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>不管是「打」API 還是「敲」API，其實都是比較口語化的用詞，若要用比較正式的術語來講，以「串接」API（API integration）為較主流的說法。而「打」這個詞通常用來指發送或請求的動作，所以整個意思就是「發送 API 請求」或「執行 API 操作」的程式行為。那麼，究竟什麼是 API？它在網頁裡扮演什麼樣的重要角色？為什麼我們很常在公司職缺應徵網頁前端工程師的專長需求列表裡，看到需要熟知串接 API 的技能？本篇文章就來聊聊 API 的相關知識。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、認識 API</h2>
        <p>API 是「Application Programming Interface」的縮寫，中文譯為「應用程式介面」，<a href="https://zh.wikipedia.org/zh-tw/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3" target="_blank">維基百科</a> 是這麼介紹的：</p>
        <blockquote>
            <p>應用程式介面（英語：application programming interface），縮寫為 API，是一種計算介面，它定義多個軟體中介之間的互動，以及可以進行的呼叫（call）或請求（request）的種類，如何進行呼叫或發出請求，應使用的資料格式，應遵循的慣例等。它還可以提供擴充機制，以便使用者可以通過各種方式對現有功能進行不同程度的擴充。一個 API 可以是完全客製化的，針對某個組件的，也可以是基於行業標準設計的以確保互操作性。通過資訊隱藏，API 實現了模組化編程，從而允許使用者實現獨立地使用介面。</p>
        </blockquote>
        <p>我知道，你會說維基百科的解釋太硬核很難啃，所以接下來舉幾個生活化的例子，應該可以比較容易理解 API 扮演的角色：</p>
        <p>想像一下，某日你去一家餐廳用餐。在點餐時，與櫃台服務生進行互動。你不需要去廚房自己做飯，也不需要知道如何製作每道菜。相反，你只需告訴服務生你想要的菜單項目，服務生就會將你的點餐報告給廚房，接著廚房根據你點的菜單準備食物，然後將佳餚送到你的桌上，讓你大快朵頤享用美食。</p>
        <p>在這個例子中，有以下三個關鍵角色，分別可以對應程式語言的：</p>
        <h5>我們（客戶）：</h5>
        <p>光顧餐廳的消費者代表發送請求的一方，顧客知道自己想要吃菜單上的什麼料理，卻不見得了解或完全不知道這些料理是如何烹飪出來的。</p>
        <h5>服務生（API）：</h5>
        <p>服務生是顧客和廚房之間的橋樑，負責將顧客的菜單（請求）傳遞給廚房（伺服器），以及將廚房完成的料理（結果）帶回（回應）顧客座位。</p>
        <h5>廚房（伺服器）：</h5>
        <p>負責處理顧客的請求，根據其菜單上的要求烹飪食物，並將料理（結果）傳遞（返回）給服務生，由服務生轉交至顧客面前。</p>
        <p><br></p>
        <p>另一個例子：</p>
        <p>我們去銀行操作 ATM 提款機進行提款，提款機展示了具有各種功能的操作介面，我們透過介面選擇「提款」並輸入提領金額，接著按下確認按鈕。然後，提款機將提款人輸入的金額傳送至銀行的中央系統，中央系統接收到相關資料後，比對提款者的資料與戶頭存款總額，確定我們的戶頭是否有足夠的資金可以提領。一旦確認，中央系統便會指示提款機發放相應金額的現鈔，最終，提款機順利將現鈔吐出來到我們手上。</p>
        <p>此例的三個關鍵角色分別是：</p>
        <h5>我們（客戶）：</h5>
        <p>通過操作提款機的介面（API）向銀行的中央系統（伺服器）發送提款請求。</p>
        <h5>提款機操作介面（API）：</h5>
        <p>提供了一個簡單的用戶界面，讓操作者可以與提款機進行互動，進行提款、存款、查詢戶頭餘額等多項操作。</p>
        <h5>銀行的中央系統（伺服器）：</h5>
        <p>處理客戶透過提款機發送的提款請求，經過審核流程作業後指示提款機發放現金。</p>
        <p><br></p>
        <p>再一個例子：</p>
        <p>有一天，阿比透過手機打電話給他的朋友。阿比開啟手機的通訊應用程式，透過其應用程式介面提供的通訊錄，選擇好友的電話號碼，然後按下撥打按鈕。當撥打按鈕觸發後，手機應用程式便將撥號請求發送給指定電信業者的伺服器，而電信業者網路的伺服器接收到來自阿比手機傳來的撥號請求，開始執行通訊連接至指定號碼的那端，直到對方接聽以開啟通訊。當有一方結束通話，手機上的通訊應用程式將終止請求發送給伺服器，以利伺服器終止通話連接。</p>
        <p>此例的三個關鍵角色分別是：</p>
        <h5>阿比與他的朋友（客戶）：</h5>
        <p>阿比透過手機通訊介面發送通話請求，而他的朋友則藉由其通訊介面接收伺服器端傳過來的通話請求。</p>
        <h5>手機通訊應用程式（API）：</h5>
        <p>提供手機使用者介面以方便撥號、接聽或查詢等其他功能。</p>
        <h5>電信網路伺服器（伺服器）：</h5>
        <p>接收用戶的撥號請求，將通訊連接到指定到號碼持有者那端，此外也會接收某一方結束通話請求，終止通訊連接。</p>
        <p><br></p>
        <p>從這三個例子是否可以理解 API 的功用了呢？在日常生活中，負責飾演 API 的角色、媒介主要在做的事情就是成為一個稱職的中間層，負責處理客戶端的需求，與伺服器端的回應，居中協調不同對象之間的互動，讓雙方往來更加高效與便利。程式語言的 API 亦是如此：API 負責處理請求和回應，並協調不同系統之間的互動，提高效率與便利性。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、Web API</h2>
        <p>透過前一個章節的幾個生活案利，我們應該已經對 API 扮演什麼角色有了大概輪廓，接下來回歸網頁程式語言的部分，基本上只要是由網頁提供的第三方功能和服務，我們都可以稱之為網頁 API，通稱 Web API。Web API 運用非常廣泛，以下列舉常見但不限於這些的 Web API 應用範例：</p>
        <h4>1. 地圖 API：</h4>
        <p>Google Maps API、Mapbox API 等提供了在網頁中嵌入地圖和地理位置相關功能的能力。這些 API 可以用於顯示地圖、標記位置、獲取路線指引等。</p>
        <h4>2. 社交媒體 API：</h4>
        <p>Facebook Graph API、Twitter API、Instagram API 等允許開發人員從自己的網頁應用程式中訪問和分享社交媒體平台上的內容，例如發布推文、顯示使用者的社交活動等。</p>
        <h4>3. 支付 API：</h4>
        <p>PayPal API、Stripe API 等提供了在網頁上處理支付交易的能力，包括接受信用卡付款、處理訂單、訂閱管理等。</p>
        <h4>4. 圖像和多媒體 API：</h4>
        <p>YouTube API、Flickr API 等提供了在網頁上嵌入圖像和視頻的能力，以及檢索和操作多媒體內容的能力。</p>
        <h4>5. 數據 API：</h4>
        <p>多種數據 API（如天氣 API、股票 API、新聞 API 等）提供了在網頁上獲取和顯示數據的能力，使得開發人員可以通過 API 請求獲取最新的數據並將其集成到自己的網頁應用程式中。</p>
        <h4>6. 服務和工具 API：</h4>
        <p>各種服務和工具提供了 API，用於在網頁上使用其功能，例如電子郵件發送 API、文字翻譯 API、語音識別 API 等。</p>
        <h4>7. 身份驗證和授權 API：</h4>
        <p>OAuth、OpenID Connect 等身份驗證和授權協議提供了在網頁上實現身份驗證和授權的能力，允許使用者通過第三方身份驗證提供者進行登錄和訪問授權。</p>
        <p><br></p>
        <p>這些現成的 API 功能可以減少企業網站的開發成本，因為企業網站需要什麼功能，開發人員只需要取得這些專業服務的公司所提供的 API，串接到網站指定的位置裡面即可，不用花時間自己去做開發甚至維護。</p>
        <p>網站開發導入 API 的優點：</p>
        <h4>1. 擴展性和可維護性：</h4>
        <p>使用 API 可以將網站的功能分解成多個獨立的服務或模塊，每個模塊都有自己的 API。這樣做可以使得系統更易於擴展和維護，因為修改或擴展一個模塊不會影響到其他部分。</p>
        <h4>2. 功能豐富性：</h4>
        <p>通過使用第三方 API，開發人員可以快速地添加新的功能和服務到網站中，而不需要自己開發和維護這些功能。例如，社交媒體 API 可以用於添加社交分享功能，地圖 API 可以用於添加地圖和定位功能等。</p>
        <h4>3. 節省時間和成本：</h4>
        <p>使用現有的 API 可以節省開發時間和成本，因為開發人員不需要從頭開始開發和測試所有的功能。相反，他們可以利用現有的 API，快速地集成這些功能到自己的網站中。</p>
        <h4>4. 提高性能和效率：</h4>
        <p>通過將一些複雜的處理和計算交給 API 服務器來處理，可以減輕網站本身的負擔，提高網站的性能和效率。例如，將圖像處理或數據分析等任務交給第三方 API 服務器來處理，可以減少網站的負載，提高網站的響應速度。</p>
        <h4>5. 跨平台和跨設備支援：</h4>
        <p>使用 API 可以使得網站更容易在不同的平台和設備上運行。通過使用 RESTful API 或 GraphQL 等通用的 API 標準，可以實現網站與不同平台和設備的無縫集成和通訊。</p>
        <p><br></p>
        <p>簡單來說，開發者只需要透過 API 去向目標程式發送請求，請程式幫我們做一些事情或回傳需要的資料，我們其實大可以不用知道程式是如何完成請求，重點只需要 API 替我們處理三件事：</p>
        <p><br></p>
        <h3>1. 在 API 發送請求前我們需要提供什麼資料？</h3>
        <h3>2. 如果 API 取得成功結果，它需要回傳給我什麼？</h3>
        <h3>3. 如果 API 取得失敗結果，它需要回傳給我什麼？</h3>
        <p><br></p>
        <p>這三件事是貫穿整個 API 技術的核心訴求，所以特別用粗體大字羅列出來。</p>
        <p><br></p>
        <p>不過話說回來，如果你是常常執行網頁開發的切版工程師，即便對 Web API 這個詞的概念一知半解，實務上其實已經有很高概率接觸或使用過他人 API 服務的經驗，例如曾在「聯絡我們」頁面嵌入客戶地址的 Google Map：</p>
        <figure>
            <img src="/images/learn/js/api-01.jpg">
        </figure>
        <p>或是使用某款網路大神開發的 JavaScript 套件：</p>
        <figure>
            <img src="/images/learn/js/api-02.jpg">
        </figure>
        <p><a href="https://swiperjs.com/" target="_blank">Swiper</a>，一款輪播圖套件，有提供 <a href="https://swiperjs.com/swiper-api" target="_blank">Swiper API</a> 整合並簡化功能讓開發者容易上手使用。</p>
        <p>所以啦，無論出自有意還是無意，我們都高機率曾已經碰觸並且使用過 Web API 技術。不過本篇文章要談的打 API，主要是針對伺服器端上的 JSON 資料，通過 HTTP 請求的方式去撈取資料下來到自己開發的網站內使用，和前面提到的地圖外嵌、JavaScript 動態效果套件這類提供比較偏向視覺化的 API 應用不太一樣。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Web API 的語法結構</h2>
        <p>雖然實現資料串接的 Web API 技術有很多，但結構組成方面皆大同小異，以下是其主要構成成分：</p>
        <h4>1. 端點（Endpoints）：</h4>
        <p>API 提供的各種功能或服務通常透過特定的端點來存取。每個端點對應 API 中的一個功能或資源，例如取得使用者資訊、提交表單資料等。端點通常由 URL 表示，並且可能包含路徑參數、查詢參數等用於指定特定操作的資訊。</p>
        <p>語法範例：</p>
        <ul>
            <li>建立使用者：<em>POST /api/users</em></li>
            <li>取得使用者列表：<em>GET /api/users</em></li>
            <li>取得指定使用者資訊：<em>GET /api/users/{userId}</em></li>
            <li>更新使用者資訊：<em>PUT /api/users/{userId}</em></li>
            <li>刪除使用者：<em>DELETE /api/users/{userId}</em></li>
        </ul>
        <p><br></p>
        <h4>2. 請求方法（Request Methods）：</h4>
        <p>HTTP 協定定義了一些常用的請求方法，包括 <em>GET</em>、<em>POST</em>、<em>PUT</em>、<em>DELETE</em> 等。使用網頁 API 時，開發人員需要選擇合適的請求方法來執行特定的操作。 例如，使用 <em>GET</em> 請求來取得資源，使用 <em>POST</em> 請求來提交資料等。</p>
        <p>語法範例：</p>
        <ul>
            <li>建立使用者：使用 <em>POST</em> 請求方法。</li>
            <li>取得使用者列表：使用 <em>GET</em> 請求方法。</li>
            <li>取得指定使用者資訊：使用 <em>GET</em> 請求方法。</li>
            <li>更新使用者資訊：使用 <em>PUT</em> 請求方法。</li>
            <li>刪除使用者：使用 <em>DELETE</em> 請求方法。</li>
        </ul>
        <p><br></p>
        <h4>3. 參數（Parameters）：</h4>
        <p>API 請求通常需要包含一些參數，用於指定操作的特定細節或條件。這些參數可以包括路徑參數、查詢參數、請求體（Request Body）中的資料等。參數的類型和格式通常由 API 文件定義，並且在請求時需要按照要求作設定。</p>
        <p>語法範例：</p>
        <ul>
            <li>建立使用者：需要在請求體裡包含使用者的資訊（例如姓名、電子郵件等）作為參數。</li>
            <li>取得指定使用者資訊：需要透過路徑參數 <em>{userId}</em> 指定要獲取的使用者 ID。</li>
            <li>更新使用者資訊：同樣需要在請求體中包含要更新的使用者資訊，並透過路徑參數指定要更新的使用者 ID。</li>
        </ul>
        <p><br></p>
        <h4>4. 響應（Response）：</h4>
        <p>API 請求傳送到伺服器後，伺服器會傳回對應的回應資料。回應通常以 JSON、XML 等格式傳回，並且包含了請求操作的結果或所需資源的資料。在接收到回應後，開發人員可以根據回應中的資料執行相應的操作或進行介面展示。</p>
        <p>語法範例：</p>
        <ul>
            <li>建立使用者、取得使用者清單、取得特定使用者資訊、更新使用者資訊和刪除使用者的操作將會傳回對應的 JSON 格式資料作為回應，包含操作結果或所需資源的資料。</li>
        </ul>
        <p><br></p>
        <h4>5. 身分驗證（Authentication）：</h4>
        <p>為了保護 API 的安全性，許多 API 都會要求進行身份驗證才能夠存取。常見的身份驗證方式包括 API 金鑰、OAuth 認證等。開發人員需要在請求中包含適當的身份驗證訊息，以確保可以成功地存取 API。</p>
        <p>語法範例：</p>
        <ul>
            <li>為了保護 API 的安全性，可以使用基於令牌的身份驗證機制來保護使用者資料的存取權限。例如，使用 JWT 令牌進行身份驗證。</li>
        </ul>
        <p><br></p>
        <h4>6. 錯誤處理（Error Handling）：</h4>
        <p>使用 API 時，可能會出現各種錯誤情況，例如要求的資源不存在、參數錯誤、權限不足等。API 通常會定義一套標準的錯誤碼和錯誤訊息，以便開發人員能夠識別和處理這些錯誤情況。</p>
        <p>語法範例：</p>
        <ul>
            <li><em>400 Bad Request</em>：表示請求參數錯誤。</li>
            <li><em>404 Not Found</em>：表示請求的資源不存在。</li>
        </ul>
        <p><br></p>
        <p>我們將以上這些 Web API 組成結構繪製成下方這張示意圖，應該能更清楚明白各關鍵角色之間的互動所對應的程式語法分別是哪些：</p>
        <figure>
            <img src="/images/learn/js/api-03.jpg">
        </figure>
        <p>看完模型圖，大概會有人心生疑惑：圖中的 RESTful API 又是什麼玩意？不急，下一個章節就來聊聊什麼是 REST。先來為本章節作一個結尾......目前資料串接 API 的實戰應用裡，以下這些是比較常見的技術，如果有興趣深入學習打 API 方法而又不知要得何門而入，可參考以下名單：</p>
        <ul>
            <li>AJAX：Superagent、jQuery Ajax</li>
            <li>XMLHttpRequest</li>
            <li>Fetch API</li>
            <li>Axios</li>
            <li>框架提供的 API 方法：Vue Resource、Angular HttpClient</li>
        </ul>
        <p>之後的文章也會盡可能將這些常見的 API 技術進行完整的筆記撰寫。</p>
        <p><br></p>
        <blockquote class="is-info">
            <p>也有一派將 Web API 語法結構濃縮為「CRUD」功能，分別對應 Create（新增）、Read（讀取）、Upated（更新）、Delete（刪除）這四項功能各取字首所組成的縮寫。也有的會加入 List（列表），使整體縮寫變為 CRUDL，但這派濃縮法相較罕見。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act4">
        <h2>四、REST 與 RESTful API</h2>
        <p>REST 為「Representational State Transfer」的縮寫，翻譯成中文術語叫作「表現層狀態轉換」，光看名字不說理解其含意，要記起來都十分困難，但無妨，首先 REST 一詞係由 HTTP 規範主要作者之一的 Roy Fielding 於其博士論文提出的概念，它是一種「軟體架構風格」而並非 HTTP 規範（標準）。這個理論誕生的目的是幫助幫助分散在世界各地不同的應用程式、軟體都能在網際網路上能夠互相傳遞訊息，每一個網頁都可以被視為一個「資源」（resource）提供使用者使用，</p>
        
    </div>
    

    <div class="text-block" id="act11">
        <h2>十一、參考資料</h2>
        <dl>
            <dd><a href="https://medium.com/@Tommmmm/%E5%B7%A5%E7%A8%8B%E5%B8%AB%E6%95%B4%E5%A4%A9%E6%8E%9B%E5%9C%A8%E5%98%B4%E9%82%8A%E7%9A%84api%E6%98%AF%E4%BB%80%E9%BA%BC-7ab8b522d3bc" target="_blank">工程師整天掛在嘴邊的API是什麼?</a></dd>
            <dd><a href="https://rlads2021.github.io/LabBook/ch10.html" target="_blank">10 擷取網路資料：Web API</a></dd>
            <dd><a href="https://tw.alphacamp.co/blog/api-introduction-understand-web-api-http-json" target="_blank">認識 API 與 Web API ，實用的 API 工具</a></dd>
            <dd><a href="https://blog.huli.tw/2023/01/10/security-of-encrypt-or-hash-password-in-client-side/" target="_blank">網站前端打 API 時把密碼加密，有意義嗎？</a></dd>
            <dd><a href="https://www.tpisoftware.com/tpu/articleDetails/396" target="_blank">【Web API 02】什麼是 REST、RESTful 以及 RESTful Web API</a></dd>
            <dd><a href="https://miahsuwork.medium.com/%E7%AC%AC%E5%85%AD%E9%80%B1-api-%E5%9F%BA%E7%A4%8E-json-restful-curl-%E6%8C%87%E4%BB%A4-28670813764e" target="_blank">[第六週] API 基礎-實際串接 API、資料格式: JSON、API Method 風格: RESTful</a></dd>
            <dd><a href="https://ihower.tw/blog/archives/1542?source=post_page-----7667b3054371--------------------------------" target="_blank">什麼是REST跟RESTful?</a></dd>
            <dd><a href="https://cindyliu923.medium.com/%E4%BB%80%E9%BA%BC%E6%98%AF-rest-restful-7667b3054371" target="_blank">什麼是 REST? RESTful?</a></dd>
            <dd><a href="https://blog.toright.com/posts/725/representational-state-transfer-%e8%bb%9f%e9%ab%94%e6%9e%b6%e6%a7%8b%e9%a2%a8%e6%a0%bc%e4%bb%8b%e7%b4%b9-part-i-%e5%be%9e%e4%ba%86%e8%a7%a3-rest-%e5%88%b0%e8%a8%ad%e8%a8%88-restful%ef%bc%81?source=post_page-----7667b3054371--------------------------------" target="_blank">淺談 REST 軟體架構風格 (Part.I) - 從了解 REST 到設計 RESTful！</a></dd>
            <dd><a href="XXXX" target="_blank">XXXXXX</a></dd>
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