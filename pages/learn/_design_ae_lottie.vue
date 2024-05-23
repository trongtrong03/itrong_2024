<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、什麼是 Lottie？' },
        { id: 2, title: '二、下載檔案' },
        { id: 3, title: '三、開始安裝' },
        { id: 4, title: '四、使用方法' },
        { id: 5, title: '五、如何預覽' },
        { id: 6, title: '六、注意事項' },
        { id: 7, title: '七、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="21" fileType="learnList" />
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
        <p>SVG（Scalable Vector Graphics，可縮放向量圖形）已經是現在網頁圖像表現的主流方法之一，因為向量的特色，解決了一般像素影像一經縮放就會失真的困擾，在檔案大小也較傳統影像格式來的節省。所以現在我們看到很多網站 Logo，乃至於精緻的小動畫，基本都直接透過 SVG 來完成。</p>
        <p>建立 SVG 的方式很多，精通語法的程式設計師可以用 IDE 輕鬆地寫出與形狀、色彩對應的 SVG 程式碼；而對視覺設計師來說，現在主流繪圖軟體例如 Adobe 系列的 Photoshop、illustrator 等也都有提供將檔案輸出成 SVG 格式的服務，不僅簡單，還直接節省去程式設計師作業時間。然而，姑且不提繪圖軟體轉出的 SVG 原始碼不是很乾淨這個缺點，此輸出方式通常僅止於滿足「靜態」 SVG 的需求，假如要做的是「動態」SVG，視覺設計師大多能協助的只剩下提供視覺素材，動畫方面依舊需要仰賴程式設計師幫忙實現，分工不是不好，只是有可能衍生以下幾個情況：</p>
        <ol>
            <li>視覺設計師需要額外製作分鏡圖或動畫示意。</li>
            <li>程式設計師需要耗費很多時間編寫動畫程式碼。</li>
            <li>程式設計師不一定能順利寫出視覺設計師理想中的動畫效果。</li>
            <li>完成的動畫與預期有落差。</li>
        </ol>
        <p>相信相關從業人員都明瞭，當設計師與工程師陷入彼此不同調的泥沼，通常要嘛是設計師妥協工程師提交的結果，要不就是工程師反覆修改程式，盡可能滿足設計師期望。無論是哪一種，顯然都不會是良好團隊合作經驗。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-1.jpg">
        </figure>
        <p>為了解決 SVG 動畫造成的時間與溝通成本耗費甚多的問題，<a href="https://airbnb.design/lottie/" target="_blank">Airbnb Design</a> 推出一款名為「Lottie」的函式庫，藉由系統、軟體或網頁等媒介，直接製作出 SVG 動畫。這些媒介會將 SVG 輸出成 <b>.json</b> 格式的檔案，程式人員只需要將 JSON 嵌入到程式碼裡，網頁（或 APP）加載後程式碼就會自己匯入並生成出動畫......聽起來是不是很棒？</p>
        <p>而 Lottie 實現 SVG 動畫檔案的其中一個主要方式是透過 Adobe After Effect 來執行，接下來幾個章節將會說明相關套件安裝，以及使用流程與預覽方式。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>進行安裝之前，我們要先下載兩樣東西，分別是 Bodymovin 的套件壓縮檔，以及輔助 AE 套件管理的程式 ZXP installer。</p>
        <h3>Bodymovin GitHub：</h3>
        <p>下載連結：<a href="https://github.com/airbnb/lottie-web" target="_blank">https://github.com/airbnb/lottie-web</a></p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-2.jpg">
        </figure>
        <p>點擊 GitHub 頁面右上方的「Clone or download」綠色按鈕，選擇「Download ZIP」，當然如果你會用 GIT 也可以用指令去 <em>clone</em> 檔案到個人電腦裡。</p>
        <p>下載完成後將壓縮檔解壓縮。</p>

        <p><br></p>
        <h3>ZXP Installer：</h3>
        <p>下載連結：<a href="https://aescripts.com/learn/zxp-installer/" target="_blank">https://aescripts.com/learn/zxp-installer/</a></p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-3.jpg">
        </figure>
        <p>aescripts + aeplugins 可說是 AE 套件的寶庫，使用者能從中搜尋符合需求的相關腳本或套件（據說是付費的，不確定），而我們要下載的是安裝套件格式 <em>.zxp</em> 時所需的 ZXP Installer，該軟體為免費公開資源，只需選擇自己個人電腦使用的作業系統對應的下載按鈕即可。</p>
        <p>以上兩個檔案都下載（ GitHub 下載的 Bodymovin 後記得解壓縮）後，此時你應該要有以下這些東西：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-4.jpg">
        </figure>
        <p>接下來就要開始進行安裝了，請注意！安裝外掛套件時，請先確認 After Effect 是否已關閉喔！</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <h3>Windows：</h3>
        <h6>1. 安裝 ZXP</h6>
        <p>執行 <b>aescripts + aeplugins zxp installer(setup).exe</b> 應用程式，基本上就是按照預設建議安裝程式即可。</p>
        <h6>2. 開啟 ZXP</h6>
        <p>安裝完後啟動該應用程式，以繼續安裝 bodymovin。</p>
        <h6>3. 將 bodymovin.zxp 拖曳至 ZXP</h6>
        <p>從 <b>lottie-web-master\build\extension</b> 找到 <b>bodymovin.zxp</b>，將他直接拖曳到 ZXP 視窗裡，或是從 ZXP 工具列「<b>File -> Open</b>」選取檔案。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-5.jpg">
        </figure>
        <p>安裝前 ZXP 會詢問是否確定要安裝 Bodymovin，選擇「OK」。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-6.jpg">
        </figure>
        <p>安裝成功的畫面：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-7.jpg">
        </figure>
        <p>安裝完就可以關閉了。</p>
        <h6>4. 開啟 AE 設定權限</h6>
        <p>打開 AE（建議版本越新越好），從上方工具列依序尋找「<b>Edit -> Preferences -> General...</b>」來開啟偏好設定。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-8.jpg">
        </figure>
        <p>找到「<b>Allow Scripts to Write Files and Access Network</b>」這個項目並打勾：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-9.jpg">
        </figure>
        <blockquote class="is-warning">
            <p>一定要確認是否有打勾！如果沒勾，Bodymovin 要進行 Render 時就會因為沒有開放腳本寫入權限而出錯。</p>
        </blockquote>
        <p>到這裡 Bodymovin 的安裝與設定就完成了，接下來使用方式會在下一個章節作說明。</p>
        <p><br></p>
        <h3>MAC：</h3>
        <p>基本上 MAC 的安裝流程和 Windows 作業系統一樣，主要差別在 AE 偏好設定的部份，要從工具列依序選擇「<b>After Effects -> Preferences -> Scripting & Expressions...</b>」：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-10.jpg">
        </figure>
        <p>然後一樣也是將「<b>Allow Scripts to Write Files and Access Network</b>」選項核選打勾：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-11.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>假設現在我們已經在 AE 把動畫都做好了，確認可以輸出成 SVG 動畫，我們從上方工具列選擇「<b>Window -> Extensions -> Bodymovin</b>」：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-12.jpg">
        </figure>
        <p>接著選取（selected）要輸出的動畫圖層，選擇輸出存放的資料夾路徑，再按下「Render」即可。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-13.jpg">
            <figcaption>依照編號順序執行。</figcaption>
        </figure>
        <p>如果檔案有多個動畫圖層，可以全部或把需要輸出的圖層選取起來，但輸出路徑的檔名記得每個都不一樣（例如：<b>data1.json</b>、<b>data2.json</b>...），否則後面輸出的檔案會直接覆蓋掉前面圖層輸出的 JSON 檔。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-14.jpg">
        </figure>
        <p>當你看到「<b>Renders Finished</b>」的訊息出現，即代表 Bodymovin 已經完成輸出，便可以將視窗關閉。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-15.jpg">
        </figure>
        <p>Bodymovin 輸出一個動畫只會有一個 JSON 檔，若輸出內容包含外嵌影像（例如：點陣圖），則會多一個 <b>images</b> 資料夾，以用來存放該動畫所使用的影像圖片。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-16.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>一般情況下我們沒有辦法立即查看 Bodymovin 輸出的 JSON 檔轉譯之動畫，所以需要進一步借助其他方式來確認動畫是否有問題，預覽 JSON 檔的方式有以下三種：線上工具預覽、本機預覽，或在 AE Bodymovin 執行 Renders 前選擇一併輸出可 Demo 的 html 檔案。</p>
        <h3>線上工具：</h3>
        <p>LottieFiles：<a href="https://lottiefiles.com/preview" target="_blank">https://lottiefiles.com/preview</a></p>
        <p>操作方式很簡單，只需要將 <b>data.json</b> 拖曳到網站裡的上傳區域中即可。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-17.gif">
        </figure>
        <p>如果動畫有含影像，則需要將 <b>data.json</b> 與 <b>images</b> 一起壓縮為 <b>.zip</b> 的壓縮檔，然後上傳到 LottieFiles。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-18.gif">
        </figure>
        <p><br></p>
        <h3>本機預覽：</h3>
        <p>這個方式是由我們自行去建立一個可以執行 JSON 檔案的網頁，本機預覽需要用到 <a href="https://www.apachefriends.org/zh_tw/index.html" target="_blank">XAMPP</a> 或其他能建立本機網頁伺服器的軟體，請先確認自己電腦是否有安裝並啟用。</p>
        <h6>1. 下載 Lottie.js</h6>
        <p>首先我們需要下載 Lottie 的官方腳本 <a href="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.9/lottie.min.js" target="_blank">lottie.min.js</a>，下載後與動畫 <b>.json</b> 及 <b>images</b> 資料夾放入同一個資料夾內。</p>
        <p>接著在資料夾內建立一個 HTML 網頁，並命名為 <b>index</b>（要用別的名稱或網頁格式也可以）。完成以上動作後，此時資料夾內應該會有以下這些檔案：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-19.jpg">
            <figcaption>若動畫沒有使用到影像圖片，那麼不會有 <b>images</b> 這個資料夾。</figcaption>
        </figure>
        <h6>2. 編輯 index.html</h6>
        <p>將以下程式碼複製貼到 <b>index.html</b> 裡：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Lottie Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="animation" style="width: 200px; height: 200px;"&gt;&lt;/div&gt;
    &lt;script src="lottie.min.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        lottie.loadAnimation({
            path:'data.json',   // json 文件路徑與名稱
            loop:true,
            autoplay:true,
            renderer:'canvas',  // 渲染方式，有 html、canvas、svg 三種可以設定
            container:document.getElementById('animation')
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        <p>其中，將 <em>#animation</em> <em>div</em> 的寬度（<em>width</em>）、高度（<em>height</em>）更改為動畫專案設定的寬高。這麼做的目的是確保到時候網頁打開後，動畫與我們在 AE 裡製作的尺寸一致。</p>
        <h6>3. 利用虛擬網頁伺服器預覽</h6>
        <p>在網址列輸入 <b>localhost/</b> 與 <b>demo</b> 資料夾路徑即可，例如 <b>localhost/202004/demo</b>：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-20.gif">
        </figure>
        <p><br></p>
        <h3>AE 輸出 Demo：</h3>
        <p>本機端預覽的方式對多數視覺設計師而言可能會比較棘手，沒關係，其實也可以直接在 AE 執行 Render 時一併匯出 HTML 格式的 Demo 檔案。</p>
        <p>首先，於 Bodymovin Render 視窗中對要輸出的動畫，點擊「Settings」齒輪圖示：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-21.jpg">
        </figure>
        <p>從 Export Modes 功能區域中找到 Demo 的選項，並將其勾選，儲存後 Render 輸出即可。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-22.jpg">
        </figure>
        <p>然後你就會看到輸出的檔案除了原本已知的 <b>data.json</b> 與 <b>images</b> 外，還多了一個 <b>demo</b> 資料夾：</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-23.jpg">
        </figure>
        <p>輸出資料夾裡除了 JSON 文件與外嵌影像存放的 <b>images</b> 資料夾外，還多了一個 <b>demo</b> 的資料夾，裡面有一個 <b>data.html</b> 的網頁檔案，打開就可以在本機預覽動畫輸出成 JSON 格式的結果畫面。然而，本方法生成的 Demo 僅適合觀看，並不適合直接用在專案網頁（因為 Demo 程式碼多且雜），提交時仍只提供 <b>.json</b> 與 <b>images</b> 給工程師即可。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>最後來提一些用 AE 製作 SVG 動畫時需要注意的幾個細節：</p>
        <p>1. Lottie 並不支援所有 AE 功能，尤其是工具列上 <b>Layer</b> 與 <b>Effect</b> 功能裡的特效。Lottie 官網有提供一份<a href="https://airbnb.io/lottie/#/supported-features" target="_blank">Supported Features</a> 清單，提供使用者查詢他們動畫使用的效果是否有被支援。</p>
        <figure>
            <img src="/images/learn/others/lottie/svg-lottie-24.jpg">
        </figure>
        <p>2. 盡量避免使用影像格式的圖片作素材，畢竟 SVG 主要優勢在於可縮放式向量圖形能確保在各種尺寸畫面上都不失真。</p>
        <p>3. 安裝 Bodymovin 外掛套件後，記得要在偏好設定裡將「<b>Allow Scripts to Write Files and Access Network</b>」項目打勾，這樣 Render 才能順利輸出動畫檔案而不受權限阻擋。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <dl>
            <dd><a href="https://aescripts.com/bodymovin/" target="_blank">Lottie &#8211; Airbnb Design</a></dd>
            <dd><a href="https://aescripts.com/bodymovin/" target="_blank">Bodymovin - Lottie</a></dd>
            <dd><a href="https://designtongue.me/effect-%E8%BD%89-svg-%E5%8B%95%E7%95%AB-%E7%A5%9E%E5%A5%87%E7%9A%84bodymovin%E6%8F%92%E4%BB%B6/" target="_blank">AFTER EFFECT 轉 SVG 動畫 – 神奇的 BODYMOVIN 插件</a></dd>
            <dd><a href="https://tzuhui.github.io/2019/09/26/JavaScript/lottie/lottie-intro/" target="_blank">Lottie 輕鬆實現動畫效果</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>