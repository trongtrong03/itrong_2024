<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Tabnine 介紹' },
        { id: 2, title: '二、安裝與使用' },
        { id: 3, title: '三、優劣分析' },
        { id: 4, title: '四、其他產品' },
        { id: 5, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="39" fileType="learnList" />
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
        <p>以前在學校修程式語言課程的時候，教授期中、期末考都是用紙筆請學生正確寫出一套指定的程式結構，為了通過考試，大夥兒花費很多心思去背教科書裡的程式碼格式和行句。但是出社會從事程式開發的工作後，發現其實沒什麼人在乎你能不能直接默寫出一段程式，基本上都是複製已經寫好的過來改，要不就是使用編輯器內建的輔助輸入工具，遠比一個字一個字慢慢敲來得有效率。當然啦，說這些不是要否定以前教授教學的方法，死背硬記其實也是培養程式碼敏銳度的一種方式，然而在資訊技術快速發展的現代，企業往往更注重如何更高效率產出客戶需要的東西，所以我們在開發的時候，自然也是要選擇適合自己且又保有效率的開發模式。</p>
        <p>現在開發程式的自動輔助工具已經非常豐富多樣，在寫 CSS 與 HTML 方面，個人習慣使用的輔助套件是「<a href="https://emmet.io" target="_blanl">Emmet</a>」，只需要輸入指定語法其中一兩個字，編輯器立即就會出現浮窗提示我們對應的語法，且容錯判斷也做的相當不錯。又或者是依照他們釋出的速查表，輸入簡單的公式代碼，一個 <b>Tab</b> 鍵就能快速生成完整的程式碼結構，大幅縮短重複輸入的作業。</p>
        <p>不過本篇的主角不是 Emmet，有關它的介紹和用法之後再開篇幅去填坑，今天要介紹的是前陣子從網路廣告上看到的一套蠻有趣的套件，和 Emmet 一樣都是輔助使用者產出程式碼的開發工具，它的名字叫做 <a href="https://www.tabnine.com/" target="_blanl">Tabnine</a>。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-1.jpg">
        </figure>
        <p>AI 人工智慧發展至今在各領域都逐漸實現驚人的應用，同樣地，現在也擴及至程式語言開發領域上。<a href="https://www.tabnine.com/" target="_blanl">Tabnine</a> 是一款透過人工 AI 自動補齊程式碼的開發工具，其宣稱透過深度學習的方式，幫助開發者能更加快速地編寫程式碼。</p>
        <blockquote>
            <p>The more team members you add, the faster Tabnine's Team Learning Algorithm will learn your team’s projects, preferences, and patterns, suggesting even more accurate code completions.</p>
        </blockquote>
        <p>這段話大意是在說 Tabnine 會去學習我們團隊專案的程式開發偏好、模式，從而建議或提供更精準的完整程式碼。</p>
        <p><br></p>
        <p>官方有直接在他們網頁展示 DEMO，而下圖是我從中節錄的部份 GIF 畫面，DEMO 呈現的方式很有趣，是直接用程式作出動態輸入模型，有興趣的話建議直接連結到官網欣賞。</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-2.gif">
        </figure>
        <p>從展示的 DEMO Coding 的過程不難看出，Tabnine 做的不單只是看使用者輸入什麼關鍵字就吐什麼語法或公式而已，它也會去根據我們引入的變數或之前寫過的相關內容，即時產出一段在之後可能要編寫的函式提示，如果正好、或差不多就是我們接下來想寫的內容，那麼我們剩下要做的就只剩按下 <b>Enter</b> 鍵，然後繼續寫或略作微調即可，大幅縮短完整輸入函式單字及結構的時間。</p>
        <p><br></p>
        <blockquote>
            <p>Tabnine supports over 30 languages in 21 IDEs</p>
        </blockquote>
        <p>既然主打程式語言 AI 智能輔助，Tabnine 自然是要盡析各式各樣的程式語言。據 Tabnine 官網描述，它們服務範圍涵蓋超過 30 種程式語言，並且能在 21 款主流 IDE 上使用它們，IDE 全名 Integrated Development Environment，譯名為整合開發環境，其實就是我們平常在說的程式編輯器。</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-3.jpg">
            <figcaption>官網有提供完整的支援名單並提供使用者查詢。</figcaption>
        </figure>
        <p><br></p>
        <p>收費方面則分成三個等級：</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-4.jpg">
        </figure>
        <p>除了最基本的個人免費版（Free）之外，Tabnine 為團隊（Team）或企業（Enterprise）分別提供不同付費方案，企業級方案姑且不討論，免費版與團隊版主要差異在AI 先進運算程度、團隊學習，以及後者會提供更完善的資安、備份服務。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <h3>安裝：</h3>
        <p>我們可以在 Tabnine <a href="https://www.tabnine.com/install" target="_blank">install</a> 頁中搜尋團隊或自己平常使用的 IDE（基本上目前主流的 IDE 都有支援），找到並點擊圖示後就能看見套件的安裝方式。</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-5.jpg">
        </figure>
        <p><br></p>
        <h4>Sublime Text：</h4>
        <p>以我個人最常使用的 Sublime Text 為例，安裝 Tabnine 方式就如同其他擴充套件一樣簡單，首先以從上方工具列選擇 <b>Tools</b> -> <b>Command Palette...</b> 開啟指令面板，或是按下 <b>Ctrl</b> + <b>Shift</b> + <b>P</b> 快捷組合鍵也可以。</p>
        <p>接著在指令面板中輸入 <b>Package Control: Install Package</b>（但我通常只打 ins），呼叫出套件包安裝列表。</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-6.jpg">
        </figure>
        <p><br></p>
        <p>在套件安裝列表中搜尋 <b>Tabnine</b>，然後 <b>Enter</b> 或滑鼠點擊即可進行安裝。</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-7.jpg">
        </figure>
        <p><br></p>
        <h3>使用：</h3>
        <p>通常安裝完成後就會立即啟用 AI 智能輔助功能了，當你在寫程式碼的時候，提示視窗很快就會顯示 Tabnine 提供的建議：</p>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-8.jpg">
        </figure>
        <p>因為個人才剛開始用沒多久，還感覺不到明顯有效的地方，不過據說隨著時間進展，Tabnine 也會變得越來越好用，或許就是在印證它們 AI 智能會配合使用者開發習慣進行學習，以提供更加精準、完善的服務吧。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>再優質的產品，也不可能 100% 盡善盡美。這個章節除了闡述 Tabnine 帶給使用者的好處外，也會說說一些個人實際使用上，或從網路其他網友分享心得蒐集下來的負面影響。</p>
        <p><br></p>
        <h3>優點：</h3>
        <h4>1. 支援大多數的程式語言與主流 IDE</h4>
        <p>在我剛開始接觸的時候，Tabnine 支援的程式語言和 IDE 各只有 23 種程式語言和 5 款 IDE，不過現在已經各增長到超過 30 種程式語言和 21 款 IDE 了，服務規模仍持續地擴大當中。</p>
        <p><br></p>
        <h4>2. 容易上手</h4>
        <p>安裝 Tabnine 非常容易，官網為每款有支援的 IDE 皆附專頁說明安裝套件的流程，基本都是在 IDE 套件功能裡直接搜尋，然後執行安裝就可啟用。</p>
        <p><br></p>
        <h4>3. 省時</h4>
        <p>TabNine 的宗旨之一就是希望幫助使用者能透過他們的 AI 智能自動補齊程式碼，省略掉人工繁瑣輸入單字的時間。</p>
        <p><br></p>
        <h4>4. 持續學習進化</h4>
        <p>Tabnine 標榜他們的 AI 人工智能會學習使用者的程式邏輯，進行預測然後提供自動補齊程式碼的服務。比方來說，我如果要寫很多類似邏輯的函式，當我寫完第一個之後，之後 Tabnine 可能就會提供類似的程式碼建議，假如正好與我的邏輯相符，我就不需要重新輸入，直接透過 Tabnine 生成即可。</p>
        <p><br></p>
        <h3>缺點：</h3>
        <h4>1. 記憶體佔用大</h4>
        <p>其實這是可以想而預見的情況，隨著程式開發作業時間增長，Tabnine 人工智能 AI 需要佔用記憶體資源進行大量運算，耗用的記憶體也越高。假如電腦本身記憶體已經比較吃緊的情況下，可能就會有延遲的狀況發生，儘管聽說有 Cloud 版可以解決本機端消耗內存的問題，不過這對公司企業而言可能會有資安方面的疑慮。</p>
        <p><br></p>
        <h4>2. 不擅長創造性程式碼</h4>
        <p>說到底，AI 智能也是基於從龐大資料庫中進行運算，以在使用者輸入程式時提供可能符合的建議，所以對於使用者與團隊開發的是過去未曾有過的新架構，即便 AI 具有學習的特性，剛開始仍比較難即時提供準確的輔助。</p>
        <p><br></p>
        <h4>3. 與其他同性質輔助功能混雜</h4>
        <p>現在 IDE 也越來越進步，有些 IDE 本身就有提供自動完成的提示服務，又或者像我本身已經有在使用 Emmet 這類型的擴充套件，那麼在開發程式的時候，Tabnine、Emmet、IDE 本身的建議就有可能同時出現，太多選擇反而一時間會影響到我判斷。</p>
        <p><br></p>
        <p>當然，Tabnine 的優點在有些人眼裡可能算不上優點，缺點對他們而言也可能在尚可接受的範圍，最主要的還是找到最適合自己與團隊舒服、順暢的開發模式，這些程式碼擴充套件主要是用來輔助我們開發更加省時，而非妨礙工作效率。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>最後我們來認識一下除了 Tabnine 之外，坊間還有什麼同性質的 AI 人工智能程式工具吧：</p>
        <h3>OpenAI GPT-3</h3>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-9.jpg">
        </figure>
        <p><a href="https://openai.com/blog/gpt-3-apps/" target="_blank">GPT-3</a> 全名是 Generative Pre-trained Transformer 3，是一種自迴歸語言模型，主要是透過 AI 深度學習的方式，去產生人類可以理解的自然語言。GPT-3 為 GPT-2 的下一代，都是由 OpenAI 訓練與開發的產物，據說 GPT-3 已可寫出一般人難以辨別是出自於電腦運算之手的文章。</p>
        <p>不過 GPT-3 目前並非專攻程式語言方面，且仍聚焦於研究計畫階段，所以這邊只要知道有這項科技即可，有興趣的人可自行深入了解。</p>
        <p><br></p>
        <h3>GitHub Copilot</h3>
        <figure>
            <img src="/images/learn/dev/tabnine-intro-10.jpg">
        </figure>
        <p><a href="https://copilot.github.com/" target="_blank">GitHub Copilot</a> 是 GitHub 與 OpenAI 聯手推出的 AI 程式碼產生工具，不僅可以自動補齊程式碼，也能根據使用者已開發的程式碼，自動猜測接下來的程式函數，性質與 Tabnine 非常相似，互相叫板的意味濃厚。</p>
        <p>有趣的是，GitHub Copilot 的核心模型 Codex 主要借助的就是 GPT-3 強大的生成能力。前面介紹 GPT-3 有說該模型並非專攻程式語言這個領域，但是後來開放 API 之後，被許多神通廣大的網路神人運用在程式開發上，這也讓 OpenAI 發現其寫程式的潛力。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="https://www.tabnine.com/" target="_blank">tabnine</a></dd>
            <dd><a href="https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/700335/" target="_blank">IDEAI自動補全插件TabNine</a></dd>
            <dd><a href="https://cloud.tencent.com/developer/article/1478294" target="_blank">抢程序员饭碗？自动写代码的Deep TabNine真如此神奇？</a></dd>
            <dd><a href="https://buzzorange.com/techorange/2019/08/02/nice-coding-tool/" target="_blank">工程師殺手級工具！一秒自動補齊後續程式碼，還支援 23 種程式語言</a></dd>
            <dd><a href="https://www.wfublog.com/2017/08/emmet-sublime-text.html" target="_blank">前端開發神器 Emmet 快速上手教學整理，減少 HTML / CSS 輸入的麻煩﹍Sublime Text</a></dd>
            <dd><a href="https://technews.tw/2021/07/02/github-copilot/" target="_blank">和 AI 結伴寫程式！OpenAI 與 GitHub 聯手推出 AI 程式碼產生工具，比 GPT-3 更強大</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>