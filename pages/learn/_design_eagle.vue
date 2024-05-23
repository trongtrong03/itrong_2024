<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 1, title: '一、基本介紹' },
        { id: 2, title: '二、安裝流程' },
        { id: 3, title: '三、介面總覽' },
        { id: 4, title: '四、標籤管理' },
        { id: 5, title: '五、提高辨識' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="22" fileType="learnList" />
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
        <p><a href="https://tw.eagle.cool/" target="_blank">eagle</a> 是一款標榜輕鬆蒐集與管理素材，藉以激發靈感並增進工作效率的素材管理應用程式，其管理素材的範疇涵蓋圖片、影片甚至是音樂，通通都能在他們應用程式介面下進行操作。</p>
        <p>使用 eagle 有以下好處：</p>
        <ol>
            <li>透過應用程式介面管理取代資料夾層層來回查找的繁瑣作業。</li>
            <li>人性且直覺化的操作介面。</li>
            <li>可為不同資料夾的影像貼上共同的標籤。</li>
            <li>支援不同應用程式的檔案。</li>
            <li>可透過瀏覽器擴充插件，在網頁直接收藏想要的素材。</li>
        </ol>
        <p>不過要注意的是，eagle 並非免費的應用軟體，僅提供使用者 30 天的免費使用體驗，不過只需要花費 $900 台幣，就能獲得永久免費授權與免費更新的服務，而且單一序號還能「同時」綁定兩台裝置，這裡之所以強調「同時」，是因為即使未來更換電腦設備，只要解除汰換掉的裝置註冊後，就能在新的設備進行綁定，十分人性化。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <h6>1. 首先至<a href="https://tw.eagle.cool/" target="_blank">官方網站</a>下載 eagle 的應用程式(有支援MacOS)。</h6>
        <figure>
            <img src="/images/learn/others/eagle/eagle-1.jpg">
        </figure>
        <p><br></p>
        <h6>2. 下載完成後執行安裝。</h6>
        <figure>
            <img src="/images/learn/others/eagle/eagle-2.jpg">
        </figure>
        <p><br></p>
        <h6>3. 開啟應用程式，選擇「開始使用」。</h6>
        <figure>
            <img src="/images/learn/others/eagle/eagle-3.jpg">
        </figure>
        <p>程式會詢問你是否要安裝瀏覽器擴充，這部份可視個人需求執行是否安裝，本次練習先暫時跳過不裝。不過別擔心，後續也可以從官方文件提供的連結，依據自身常使用的瀏覽器進行擴充。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-4.jpg">
        </figure>
        <p>如果之前電腦已經有使用過 eagle 且有建立資料庫的記錄，可以在下一個步驟重新匯入，如果是初次使用，則選擇「建立新的資料庫」。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-5.jpg">
        </figure>
        <p><br></p>
        <h6>4. 為資料庫命名以建立新的資料庫。</h6>
        <figure>
            <img src="/images/learn/others/eagle/eagle-6.jpg">
        </figure>
        <p>命名完成後按下「建立資料庫」，接著系統會要求使用者選擇作為資料庫存放檔案用的資料夾。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-7.jpg">
        </figure>
        <p>完成資料庫的建立：</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-8.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>以下介紹 eagle 資料庫介面中幾個較常用到的功能：</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-9.jpg">
        </figure>
        <ol>
            <li>資料庫列表，可進行切換、載入、合併其他資料庫的動作，底下則是該資料庫內所有影像檔案的近期操作狀態。</li>
            <li>匯入當前資料庫內的資料夾列表，可以從介面新增資料夾，或是透過右鍵選單改變資料庫的圖示或顏色…等。</li>
            <li>快速切換至資料庫內的任一資料夾或檔案。</li>
            <li>建立/匯入資料夾、檔案。</li>
            <li>展開/收合兩側欄位。</li>
            <li>縮放下方區域檔案預覽圖的大小。</li>
            <li>建立動作，例如為匯入的檔案新增標籤、評分等等。</li>
            <li>改變檔案瀏覽區域的排序(按照日期、檔案大小…)與呈現(如瀑布流、列表模式…)方式。</li>
            <li>篩選工具，例如依據標籤、形狀或評分等。</li>
            <li>是否令預覽區域顯示的檔案包含子資料夾的內容(預設模式僅顯示當下資料夾同一層內的檔案)。</li>
        </ol>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>除了透過資料夾分門別類外，我們可以透過 eagle 標籤的功能，來為不同分類的影像，建立共通的標籤，以利我們大方向的搜尋。</p>
        <p>可由左上角工具導覽列選項中找到標籤管理，也可以從尚未貼上標籤的影像右側資訊欄中，點擊「新增標籤」的按鈕。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-10.jpg">
        </figure>
        <p>建立名為「紅色系」的標籤：</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-11.jpg">
        </figure>
        <p>接著就能在各影像右側標籤欄中，選擇系統智慧型預設或自己設定的標籤。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-12.jpg">
        </figure>
        <p>之後可以透過篩選或標籤管理，快速呼叫出貼上指定標籤的影像囉。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-13.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>當資料庫內的資料夾很多的情況下，一時間內肉眼捕捉不到自己要找的目標在所難免，因此 eagle 在這方面提供更換資料夾圖示的功能，來加強資料夾的辨識程度。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-14.jpg">
        </figure>
        <p>在欲改變圖示的資料夾上方點擊滑鼠右鍵，便能看見「資料夾圖示」的項目，然後選擇適應的圖示即可。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-15.jpg">
        </figure>
        <p>此外還可以改變圖示的顏色，進一步添增辨識度之外，也讓整個介面看上去更加活潑美觀。</p>
        <figure>
            <img src="/images/learn/others/eagle/eagle-16.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>