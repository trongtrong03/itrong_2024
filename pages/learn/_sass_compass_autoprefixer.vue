<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="7" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Autoprefixer 是什麼？</a></li>
            <li><a href="#act2">二、要如何安裝 Autoprefixer？</a></li>
            <li><a href="#act3">三、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>隨著網路世代技術的推展，網頁瀏覽器如雨後春筍般紛紛冒頭出來，但並不是所有瀏覽器供應商都能在第一時間內支援 CSS 的最新語法，為了在實現支持語法的這段期間也能讓使用者及開發者可以在他們的瀏覽器正常檢視語法，瀏覽器供應商便於測試階段在該 CSS 屬性前添加自家瀏覽器引擎的名稱以利辨別，也就是我們常說的「前綴」。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Autoprefixer 是什麼？</h2>
        <p><a href="https://github.com/postcss/autoprefixer" target="_blank">Autoprefixer</a> 是一款處理 CSS 跨瀏覽器支援語法的編譯工具，透過該工具，我們只需要編寫 CSS（主要是 CSS3）的標準屬性，Autoprefixer 編譯時就會自動為需要支援不同瀏覽器的屬性添加相應的前綴。例如 <em>transform</em> 屬性經由 Autoprefixer 協助，輸出的 CSS 樣式表會同時包含 <em>transform</em> 與 <em>-webkit-transform</em> 的語法結果。</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">前綴</div>
                    <div class="f-f1">瀏覽器</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>-ms-</em></div>
                    <div class="f-f1">IE</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>-moz-</em></div>
                    <div class="f-f1">FireFox</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>-webkit-</em></div>
                    <div class="f-f1">Chrome、Safari</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>-o-</em></div>
                    <div class="f-f1">Opera</div>
                </div>
            </div>
        </div>
        <p>坊間流行的前端自動化工具都可以安裝 Autoprefixer，本篇要安裝的對象是 Compass。可能部份人員會疑惑，為什麼是 Compass？Compass 自己不就有提供 CSS3 的 <em>@import</em> 方法？Compass 確實可以使用 <em>@import "compass/css3";</em> 直接將 CSS3 前綴支援導入到專案內。然而 Compass 已經停止更新多年，隨著瀏覽器版本更新，許多前綴已經不需要添加，抑或是無法支援新的 CSS3 屬性，反過來 Autoprefixer 則是依據 <a href="https://caniuse.com/" target="_blank">Can I use</a> 的標準，持續穩定地更新前綴新知。假設現在仍透過 Compass 開發專案的使用者，會傾向建議拋棄 Compass 內建的 <em>import</em>，額外使用 Autoprefixer 工具處理 CSS 屬性前綴的問題。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、要如何安裝 Autoprefixer？</h2>
        <p>Compass 要使用 Autoprefixer 並不困難，首先，我們要確認以下幾個前置作業重點：</p>
        <ol>
            <li>Ruby 版本不宜過舊也不宜過新<br>經測試，2.5 與 2.6 左右的版本是較為穩定的，其他版本都有可能令 Compass 監控 Autoprefixer 時發生錯誤。</li>
            <li>需安裝 <a href="https://nodejs.org/en/" target="_blank">Node.js</a>。</li>
        </ol>
        <p><br></p>
        <h6>1. 於命令提示字元輸入安裝指令</h6>
        <p>開啟工作電腦內的終端機或命令提示字元，輸入以下安裝指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">gem install autoprefixer-rails</code></pre>
        </div>
        <p><br></p>
        <h6>2. 於 <b>config.rb</b> 設定文件加入參數。</h6>
        <p><b>config.rb</b> 文件是 Compass 執行編譯作業時最重要的依賴，故我們需要將 Autoprefixer 的相關函式加入到文件裡，Compass 才能正確執行它。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">require 'autoprefixer-rails'
on_stylesheet_saved do |file|
    css = File.read(file)
    map = file + '.map'
    if File.exists? map
        result = AutoprefixerRails.process(css,
        from: file,
        to:   file,
        map:  { prev: File.read(map), inline: false })
    File.open(file, 'w') { |io| io &lt;&lt; result.css }
    File.open(map,  'w') { |io| io &lt;&lt; result.map }
    else
        File.open(file, 'w') { |io| io &lt;&lt; AutoprefixerRails.process(css) }
    end
end</code></pre>
        </div>
        <p><br></p>
        <h6>3. 開始或重新執行 <em>compass watch</em>。</h6>
        <p>如果編輯 <b>config.rb</b> 文件的同時忘記先把 <em>compass watch</em> 終止，記得要重新執行，修改的參數才能成功啟用。</p>
        <p>接著就可以輸入點什麼來測試看看是否有效：</p>
        <figure>
            <img src="/images/learn/css/autoprefixer-1.gif">
            <figcaption>編譯成功！</figcaption>
        </figure>

    </div>
    <div class="text-block" id="act3">
        <h2>三、參考資料</h2>
        <dl>
            <dd><a href="https://github.com/ai/autoprefixer-rails" target="_blank">Autoprefixer Github</a></dd>
            <dd><a href="https://blog.gtwang.org/web-development/autoprefixer-css-vender-prefixes/" target="_blank">Autoprefixer：最佳的 CSS 供應商前綴（Vender Prefixes）後處理器</a></dd>
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
