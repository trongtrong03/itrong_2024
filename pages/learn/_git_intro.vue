<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、認識版本控制的種類' },
        { id: 2, title: '二、學習 Git 的原因' },
        { id: 3, title: '三、安裝 Git 與初始設定' },
        { id: 4, title: '四、基本流程簡述' },
        { id: 5, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="26" fileType="learnList" />
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
        <p>無論是個人獨立作業或是團隊協作，在專案開發、修改乃至於維護上，皆需要進行版本控管，以防專案損壞時，苦無可以回溯的版本去進行修復。對任何專案而言，保存檔案是很重要的工作，善用版本控制系統，可以有效記錄檔案之間的演進過程與歷史變更訊息，方便管理者取回特定版本的資料。而本系列要學習記錄的主題，是時下廣受開發者或團隊歡迎的 Git 版本控制系統，以下就一同探索 Git 的世界吧。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>在正式學習 Git 之前，我們需先認識版本控制有哪些類型。大抵可分為三類：</p>
        <p><br></p>
        <h3>1. 本機端版本控制系統</h3>
        <figure>
            <img src="/images/learn/dev/git-intro-1.jpg">
        </figure>
        <p>它有以下這些特色：</p>
        <ol>
            <li>將檔案複製在本機端其他目錄下。</li>
            <li>方便獨立作業操作使用。</li>
            <li>缺點是無法共同協作。</li>
        </ol>
        <p><br></p>
        <h3>2. 集中化版本控制系統</h3>
        <figure>
            <img src="/images/learn/dev/git-intro-2.jpg">
        </figure>
        <p>它有以下這些特色：</p>
        <ol>
            <li>具有遠端伺服器，記錄檔案變動過程。</li>
            <li>其他人員可透過伺服器取得檔案。</li>
            <li>缺點是若無法連接伺服器，就無法將開發或更新的檔案執行上傳。</li>
            <li>若伺服器毀損，也有資料付諸東流的可能。</li>
        </ol>
        <p><br></p>
        <h3>3. 分散式版本控制系統</h3>
        <figure>
            <img src="/images/learn/dev/git-intro-3.jpg">
        </figure>
        <p>Distributed Version Control Systems，簡稱 DVCSs，此版控方式是目前比較主流的版本控制系統，它兼具前兩者的優勢，針對它們弱勢的部份也有妥善因應之策，以下整理出分散式版本控制系統的特色：</p>
        <ol>
            <li>擁有本機端與集中化兩者版本控制系統的優勢。</li>
            <li>每次更動都必須擁有最新完整的版本，故不單是伺服器端，每個開發人員本機也擁有最新版本的資料。</li>
            <li>承上，即使單一開發人員或伺服器損壞，仍然可以從其他人員取得最新檔案。</li>
        </ol>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>以前還沒開始使用版本控制工具管理專案之前，自己跟公司在備份專案時使用的方法都是較傳統的本機端及集中化的管理方式，例如下圖所示：</p>
        <figure>
            <img src="/images/learn/dev/git-intro-4.jpg">
        </figure>
        <p>起初在備份時不覺得有什麼不妥之處，但隨著版本備份日積月累，許多困擾也接踵而至......像是逐漸搞不清楚每一次備份細節是什麼，或是回頭尋找某一個備份版本的檔案時無法迅速地找到需要的檔案。自己已是如此，更不用說他人接手或接手他人的專案，光是要釐清各版本的差異就得虛擲大把時間，不僅影響工作效率，還會形成惡性循環。</p>
        <p>除此之外，若是由多人共同執行的專案，很難不遇到「你怎麼把我的檔案給覆蓋掉了」、「我正在維護的檔案少了你最近維護的內容」、「是不是有人沒有確實填寫更新日至」諸如此類因專案管理不夠周全而衍生出的問題族繁不及備載，為了解決衝突最終必須有人得退一步作出妥協，先花時間將版本差異的問題排除，再來繼續執行手頭的專案。</p>
        <p>經網路爬文後發現以上種種困擾情境其實並不罕見，甚至說是開發者及工作團隊一一將分散式版本控制系統導入進團隊的「標準 SOP」也不為過，而在數款分散式版本控制系統當中，Git 是最為倍受推崇的佼佼者，儼然已成為所有程式語言相關工作者的必要技能。比起其他同類型的版控工具，Git 在以下這些方面顯得更加突出：</p>
        <ol>
            <li>快速</li>
            <li>簡潔</li>
            <li>完整</li>
            <li>方便</li>
        </ol>
        <p>全世界最具代表性的程式設計討論區之一的 <a href="https://stackoverflow.com/" target="_blank">Stack Overflow</a> 公佈的 <a href="https://insights.stackoverflow.com/survey/2017" target="_blank">2017 程式設計師問券調查</a> 中，Git 在 <a href="https://insights.stackoverflow.com/survey/2017#work-_-version-control" target="_blank">版本控制</a> 項目中獲得 69.2% 完全壓制性的得票率，足見 Git 已是版本控制工具選擇的熱門首選。所以，當你與你的團隊還在煩惱檔案版本控制的問題，請不要再有任何猶豫，將 Git 導入到專案管理裡絕對是利遠大於弊。</p>
        <figure>
            <img src="/images/learn/dev/git-intro-5.jpg">
            <figcaption>Git 在 Version Control 一欄獲得極高的支持率。</figcaption>
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>本節要介紹的是安裝 Git 與其初始使用者設定的方法：</p>
        <p><br></p>
        <h6>1. 下載 Git 並安裝</h6>
        <p>首先從<a href="https://gitforwindows.org/" target="_blank">官方網站</a>下載 Git 安裝應用程式，然後進行安裝，過程中會詢問多項選用功能的項目細節，如果你不是很了解這些功能選用的目的，建議直接按下一步至安裝完成即可。</p>
        <p>完成安裝之後，你應該可以在滑鼠右鍵開啟的呼叫選單上看見 Git 相關的功能項目：</p>
        <figure>
            <img src="/images/learn/dev/git-intro-6.jpg">
        </figure>
        <p>GUI 指的是圖形化介面，而 Bash 則是類似命令提示字元的 Linux Unix shell（命令行介面），Bash 模式對新手來說較難上手，但官方的 GUI （圖形操作介面）也不是那麼方便好用，故一般利用 GUI 進行控管的使用者，大多會再額外安裝較多使用者推薦的軟件，像是 <a href="https://tortoisegit.org/download/" target="_blank">TortoiseGit</a> 或 <a href="https://www.sourcetreeapp.com/" target="_blank">SourceTree</a> 之類的非官方元件，以取代原本的 Git 提供的圖形化介面管理。</p>
        <p><br></p>
        <h6>2. 下載 TortoiseGit</h6>
        <p>假如你打算用 Bash 輸入指令的方式操作 Git，那麼可以直接進入第三步驟。若是想透過 GUI 進行管理，本步驟將分享 <a href="https://tortoisegit.org/download/" target="_blank">TortoiseGit</a> 的安裝流程，首先，進入 <a href="https://tortoisegit.org/download/" target="_blank">TortoiseGit</a> 的官方下載頁面。</p>
        <figure>
            <img src="/images/learn/dev/git-intro-7.jpg">
        </figure>
        <p>除了主程式外，它下方提供多個國家的語言包，若有需要可以一併下載。不過個人建議維持英文語系就好，畢竟大家討論 Git 指令功能時通常會講英文術語，且不見得每個人員都知曉那些術語的中文轉譯。</p>
        <p><br></p>
        <h6>3. 設定使用者名稱與電子信箱帳號</h6>
        <p>這個步驟非常重要，不少人安裝完 Git 之後就迫不及待趕緊運用到專案管理上，但在這之前最好先設定使用者的名稱與電子信箱，否則後續執行提交（<em>commit</em>）指令時，Git 會發出警示訊息，要求你設定這兩項資訊。主要是因為每一次提交 Git 都會記錄此次提交版本的作者是誰，以供其他人員方便「緝凶」。</p>
        <p>設定使用者名稱與電子信箱帳號的 Git Bash 指令分別是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$ git config --global user.name "名稱"
$ git config --global user.email 電子信箱帳號</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$ git config --global user.name "iTrong"
$ git config --global user.email trongtrong03@gmail.com</code></pre>
        </div>
        <p><br></p>
        <p>若要查詢使用者資料，可以輸入以下指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$ git config --global user.name
$ git config --global user.email</code></pre>
        </div>
        <p>或是輸入 <em>config --list</em> 也可以：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$ git config --list</code></pre>
        </div>
        <p>只不過這個指令同時會列出其他設定訊息，需要花點心思找出使用者名稱與電子信箱帳號的條列位置。</p>
        <p><br></p>
        <p>接著來說說 Tortoisegit 的使用者設定方式，於任一視窗空白處點擊滑鼠右鍵呼叫快速選單，滑至「<b>Tortoisegit</b>」項目，於次選單項目中選擇「<b>Settings</b>」功能。</p>
        <figure>
            <img src="/images/learn/dev/git-intro-8.jpg">
        </figure>
        <p><br></p>
        <p>彈出 Tortoisegit GUI 視窗後，在左側列表裡選擇「<b>Git</b>」，右側隨即出現 <b>User info</b> 的相關設定。</p>
        <figure>
            <img src="/images/learn/dev/git-intro-9.jpg">
        </figure>
        <p>透過 Tortoisegit GUI 我們發現使用者設定分為三個層級──「Local」、「Global」、「 System」，套用的優先層級以「Local」最高，「Global」居次，「System」則是最低優先層級。</p>
        <p><br></p>
        <p>以上就是 Git 的使用者資訊設定方式，或許會有人問該用 GUI 或 Bash 哪一種方式比較好？這其實沒有所謂的最佳答案，若已熟悉 Bash 指令，操作 Git 時會非常迅速俐落。但 GUI 較容易上手且可以用流程圖表示版控歷程記錄的分支、合併關係，是純顯示程式碼指令的 Bash 介面無法達到的視覺表現。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>在 Git 工作區域大抵可分為三個部分，分別是工作目錄（Working Directory）、暫存區域（Staging Area）以及版本儲存庫（.git directory（Repository））。其中，版本儲存庫依照個人、團隊的需求或差異，又可分為本地端（Local）以及遠端（Remote），以下我們先敘述本地端的版控流程，然後再來講遠端的部分。</p>
        <figure>
            <img src="/images/learn/dev/git-process-1.jpg">
        </figure>
        <p>這是一套基本的 Git 工作流程，使用者在工作目錄完成專案檔案，把檔案新增到暫存區域，接著進行提交（<em>commit</em>）的動作，提交出去的檔案就會永久地儲存進版本庫內。簡單來說，即我們每次提交的動作都會令版本庫新增一個版本紀錄，但是也可以反過來，我們亦可以從版本庫裡索取最新的，或是某一個時間的版本檔案出來檢視或執行其他動作。</p>
        <p><br></p>
        <p>再來簡單解釋三個工作區域的用途：</p>
        <p><br></p>
        <h3>工作目錄（Working Directory）：</h3>
        <p>使用者用來存放專案檔案的資料夾，也可能是從 Git 儲存庫中取出的其中一個版本，放在本機端供使用者編輯修改。</p>
        <p><br></p>
        <h3>暫存區域（Staging Area）：</h3>
        <p>在過去曾被稱為索引（index），它是一個單純的檔案，一般來說放在 Git 目錄，儲存關於下一個提交的資訊。</p>
        <p><br></p>
        <h3>版本儲存庫（.git directory（Repository））：</h3>
        <p>它是 Git 最重要的核心，主要存放使用者的專案檔案數據及物件資料庫，使用者可在此取出特定專案版本的資料，儲存到自己的本機工作目錄來操作，達到分散式版本控制的效果。</p>
        <p><br></p>
        <p>假如加入遠端的需求，工作流程就會變成下圖：</p>
        <figure>
            <img src="/images/learn/dev/git-process-2.jpg">
            <figcaption>多了 <em>push</em> 與 <em>fetch</em> 兩個操作指令，只有在本機端的儲存庫（Local Repository）才可以推送資料，至遠端的儲存庫（Remote Repository）。</figcaption>
        </figure>
        <p>「推送」與「取得」也有人說是 <em>Push</em> 與 <em>Pull</em>，其實這兩個功能非常類似，<em>fetch</em> 負責檢查遠端倉儲中是否有更新版本的檔案，接著讓使用者手動合併檔案；而 <em>pull</em> 則是先呼叫 <em>fetch</em> 檢查有無新版本後，由系統自動做合併動作，也就是 <em>pull</em> = <em>fetch</em> + <em>merge</em>。遇到無法解決的衝突（conflict）才需要透過手動處理。</p>
        <p><br></p>
        <p>以上就是 Git 的流程介紹，最後我們將整個流程再做個簡化：</p>
        <h6>1. 修改工作目錄內的檔案。</h6>
        <h6>2. 將檔案的快照新增到暫存區域。</h6>
        <h6>3. 交暫存區域的檔案，使其永久儲存在 Git 目錄。</h6>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://git-scm.com/" target="_blank">Git</a></dd>
            <dd><a href="https://gitbook.tw/chapters/introduction/what-is-git.html" target="_blank">什麼是 Git？為什麼要學習它？</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>