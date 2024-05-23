<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、Compass 是什麼？' },
        { id: 2, title: '二、我該如何進行環境安裝？' },
        { id: 3, title: '三、要如何在專案裡使用 Compass？' },
        { id: 4, title: '四、config.rb 的功用是什麼？' },
        { id: 5, title: '五、快速懶人包' },
        { id: 5, title: '六、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="6" fileType="learnList" />
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
        <p>在正式提到 <a href="http://compass-style.org/" target="_blank">Compass</a> 之前，得先稍微將話題兜到 Sass 上。假如此刻你對 Sass 的認識仍處於一問三不知的階段，只需知道 Sass 是一套可以幫助我們更有效開發 CSS 的編譯工具即可。根據書寫規則的不同（顯著差異在於巢狀結構），Sass 又可分為 Sass 與 SCSS 兩種格式，但不管要用哪一種格式來寫 CSS 樣式，使用的工作電腦都必須安裝可支援語法的依賴，而本篇介紹的主角 Compass 便是其中之一。至於有關 Sass / SCSS 的詳細內容則留待日後其他篇幅再作介紹，本篇主要重點在於介紹如何安裝並使用 Compass。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>誠如 Sass 是一套讓 CSS 開發更具效率的工具，Compass 則是一款可以更加簡化 Sass 作業的輔助工具，它不僅可以自動補足部分 CSS 屬性因應不同瀏覽器產生的不同前綴，也提供許多類似 Javascript 的函式，例如 <em>for</em> 迴圈、<em>if</em> 敘述句等，又或者內建 CSS3 函數、Reset 重置表、圖片合併、產出壓縮...林林總總多樣功能，自其正式問世後，很快地成為受諸多網頁前端工程師喜愛的 Sass 開發工具之一。</p>
        <blockquote class="is-warning">
            <p>唯比較可惜的是 Compass 在 2014 年之後就不再持續維護更新，許多功能放到多年後的現今要不已經過時，不然就是有更佳的替代方案，編譯 Sass 的任務也多由 Gulp、Webpack 之類的自動化管理工具取代。</p>
        </blockquote>
        <p>既然如此，為什麼還要介紹 Compass 呢？畢竟對許多網頁前端初學者而言，要馬上學會 Gulp、Webpack 這類基於 NodeJS 打造的管理工具並不容易。因此，Compass 即便不再更新，卻仍舊是幫助初學者由淺入深的不錯門檻之一。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>開始使用 Compass 編寫 Sass 之前，我們需要在工作電腦裡下載並安裝以下這些程式：</p>
        <ol>
            <li>Ruby</li>
            <li>Sass</li>
            <li>Compass</li>
        </ol>
        <h6>1. 下載 <a href="https://rubyinstaller.org/" target="_blank">RubyInstaller</a> 並安裝。</h6>
        <figure>
            <img src="/images/learn/css/compass-1.jpg">
        </figure>
        <p>由於 Sass 是用 Ruby 語言開發的，因此工作電腦必須先安裝 Ruby，至於 Mac 電腦本身內建 Ruby，使用者可以跳過這個步驟。</p>
        <p>關於下載版本的部份，雖說理論上是越新越好，但倘若你有需要另外安裝其他輔助擴充套件（例如之後會撰文介紹的 Autoprefixer 自動前綴工具），必須考量擴充套件相對 Ruby 版本的相容程度，版本太舊或太新都有可能會導致擴充套件無法順利執行編譯。個人選擇的是 2.5.7-1 的版本，此為確保 Autoprefixer 可以正確執行的版本（2.6.5 或許也可以，但 2.7.0 開始就不相容，該套件則不支援 2.4.9 以下的版本）。</p>
        <p><br></p>
        <h6>2. 安裝 Sass。</h6>
        <p>呼叫你的終端機或命令提示字元（並非一定要用安裝 Ruby 附帶的 Start Command Prompt with Ruby），輸入下方指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">gem install sass</code></pre>
        </div>
        <p>如果要確認是否有安裝成功，可以輸入 <em>sass -v</em> 來確認 Sass 的版本，若有反饋版本號，即代表 Sass 已成功安裝。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">sass -v</code></pre>
        </div>
        <p><br></p>
        <h6>3. 安裝 Compass。</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">gem install compass</code></pre>
        </div>
        <p>和安裝 Sass 差不多，第三步要作的即是將 Compass 也安裝到工作電腦裡，安裝完畢後同樣可以透過輸入 <em>-v</em> 指令查看版本來確認是否有安裝 Compass 成功。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">compass -v</code></pre>
        </div>
        <p>Ruby、Sass、Compass 皆分別安裝完畢後，我們就可以開始在自己的工作電腦用 Compass 編譯 Sass 了。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <h6>1. 建立空白資料夾並移動至資料夾內。</h6>
        <p>假設我們要在 D 槽建立並執行由 Compass 編譯的專案，而資料夾名稱為「demo」，那麼其完整資料夾路徑就是 <b>D:/demo</b>。開啟終端機或命令提示字元，輸入下方指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">d:</code></pre>
        </div>
        <p>上面的指令目的是將命令提示字元切換磁碟至指定的 D 槽，接著我們才可以使用 <em>cd</em> 指令，把命令提示字元切換路徑到 <b>demo</b> 資料夾內：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">cd demo</code></pre>
        </div>
        <blockquote>
            <p>如果你覺得你的專案資料夾的路徑太長，也可以使用滑鼠拖曳的方式，直接用滑鼠壓住資料夾不放，將其拉進命令提示字元內，然後按下 <b>Enter&crarr;</b> 鍵，一樣可以令命令提示字元快速移動至該專案資料夾內。</p>
        </blockquote>
        <h6>2. compass create 建立 Compass 專案</h6>
        <p>此刻 <b>demo</b> 資料夾裡頭仍空空如也，鍵入以下指令：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">compass create</code></pre>
        </div>
        <p>這個指令的目的是讓 <b>demo</b> 產生編譯 Compass 所需的相關設定檔及初始配置，當然我們在下達 <em>compass create</em> 的同時也可以在後方添加一個名稱，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">compass create project</code></pre>
        </div>
        <p>那麼 Compass 就會在 <b>demo</b> 資料夾底下新增一個 <b>project</b> 資料夾，將編譯相關檔案生成在其內部。</p>
        <p><br></p>
        <p><em>compass create</em> 執行完之後，會看見資料夾內產生以下這些內容物：</p>
        <figure>
            <img src="/images/learn/css/compass-2.jpg">
        </figure>
        <h5>.sass-cache：</h5>
        <p>存放 Sass 編譯時產生的暫存檔案，可以刪除，但每一次編譯會再次出現（後面會介紹取消暫存的方法）。</p>
        <h5>sass：</h5>
        <p>放置 Sass 檔案，Compass 會從這裡執行編譯。</p>
        <h5>stylesheets：</h5>
        <p>放置 Compass 編譯輸出後的 CSS 樣式表。</p>
        <h5>config.rb：</h5>
        <p>Compass 的設定檔，不可刪除。</p>
        <p>我們可以透過添加或修改 <em>config.rb</em> 設定檔裡面的參數，變更 <b>sass</b> 與 <b>stylesheets</b> 的相關配置，又或是取消 <b>.sass-cache</b> 暫存機制，詳細說明將留到之後 <b>config.rb</b> 介紹再行敘述。</p>
        <p><br></p>
        <h6>3. compass watch 監控 Compass 專案</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">compass watch</code></pre>
        </div>
        <p>輸入 <em>compass watch</em>，專案即開始執行監控，只要 <b>sass</b> 資料夾內的 <b>.sass</b> 文件一經儲存，Compass 便會將 <b>sass</b> 編譯輸出成 <b>css</b> 格式。舉例來說，我們在 <b>print.scss</b> 這支檔案新增 CSS 樣式，接著儲存 <b>print.scss</b>，Compass 就會立即監控檔案，將其編譯為 CSS 格式，並輸出至 <b>stylesheets</b> 資料夾裡生成 <b>print.css</b> 樣式表。</p>
        <figure>
            <img src="/images/learn/css/compass-3.jpg">
            <figcaption><em>compass watch</em> 監控中。</figcaption>
        </figure>
        <p><br></p>
        <h6>4. 結束監控</h6>
        <p>若專案已經完成或暫時告一段落，可以同時按下 <b>ctrl</b> 與 <b>C</b> 鍵結束 <em>compass watch</em>。</p>
        <figure>
            <img src="/images/learn/css/compass-4.jpg">
            <figcaption>Ctrl + C 後詢問是否終止工作？輸入 y 確認即可。</figcaption>
        </figure>
        <p><br></p>
        <p>以上便是專案導入 Compass 並使用的流程，簡單來說只要架設起 Compass 作業環境後，往後基本上只需要 <em>cd</em> 資料夾並 <em>compass watch</em> 編譯 Sass 這兩項指令就能撰寫專案的 CSS。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p><b>config.rb</b> 是 Compass 專案不可缺少的設定文件，它記載著 Compass 執行編譯時所需的相關參數。儘管我們不能隨意刪除它，但有些參數細節可以視個人或團隊的需要去作變更，本節將介紹其設定文件的幾個重要參數，以及可以額外新增哪些參數進去。</p>
        <p>我們先來看看透過 <em>compass create</em> 所產生預設 <b>config.rb</b> 文件裡的配置內容：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass</code></pre>
        </div>
        <p><em>#</em> 代表註解的意思，只要在起始處加上 <em>#</em> 符號，該行內容都會成為註解，因此可以看到文件預設狀態下，有很多功能參數尚未被啟用（因為被註解化）。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">require 'compass/import-once/activate'</code></pre>
        </div>
        <p>這行的意思是當重複引用某 <b>sass</b> 文件時，最終也只會輸出一次編譯效果。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "javascripts"</code></pre>
        </div>
        <p>這幾行用來決定資料夾根目錄的路徑，以及執行編譯時對應的資料夾名稱。<em>http_path</em> 指的是根目錄路徑，它主要用來幫助 Compass 提供的一些便利功能，例如 <em>image-url</em> 語法，只要預先設置好 <em>http_path</em> 的路徑，我們在 Sass 插入影像時只需要填入 <em>images</em> 之後的影像路徑就好。</p>
        <p>至於 <em>css_dir</em>、<em>sass_dir</em>、<em>images_dir</em>、<em>javascripts_dir</em> 則分別代表 CSS、Sass、Images、Javascript 的資料夾名稱，通常我會將 <em>css_dir</em> 預設值 <em>stylesheets</em> 修改成較直覺的 <em>css</em>（重新執行編譯後別忘記把舊的 <em>stylesheets</em> 資料夾移除）。其他像是將 <em>javascripts</em> 改成 <em>js</em>、<em>sass</em> 則變更為 <em>scss</em>（此乃因為我使用的格式是 Scss）。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby"># output_style = :expanded or :nested or :compact or :compressed</code></pre>
        </div>
        <p><em>output_style</em> 指的是輸出 CSS 的格式，它有以下四種選擇：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">參數</div>
                    <div class="f-f1">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>:expanded</em></div>
                    <div class="f-f1">預設值，保持原格式，每行 CSS 皆會斷行。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>:nested</em></div>
                    <div class="f-f1">保留 Sass 的巢狀結構，父選擇器內的子選擇器會保留槽狀縮排。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>:compact</em></div>
                    <div class="f-f1">簡潔格式，每一個 CSS 選擇器只有一行，其包含屬性都會擠在同一行內，因為少了許多縮進排版，故檔案大小會比前兩者輕量。</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"><em>:compressed</em></div>
                    <div class="f-f1">極致壓縮，所有選擇器及其包含屬性通通會壓縮為一行表示。比 <em>:compact</em> 更加輕量，卻也最不易閱讀。</div>
                </div>
            </div>
        </div>
        <p>每一個參數都有其優劣，筆者較偏好維持預設的 <em>:expanded</em> 參數，或將選擇器僅佔單行表示的 <em>:compact</em> 格式。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">output_style = :compact</code></pre>
        </div>
        <p>如果要使用其他格式，記得要將註解符號（<em>#</em>）刪除，由於 <em>:expanded</em> 是內建預設值所以有沒有取消註解的影響較不大。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby"># line_comments = false</code></pre>
        </div>
        <p><em>line_comments</em> 用來決定輸出的 CSS 樣式表是否加上 <b>Sass</b> 的逐行註解，它的預設值是 <em>true</em>，編譯出來的結果可參考下方此圖：</p>
        <figure>
            <img src="/images/learn/css/compass-5.jpg">
        </figure>
        <p>個人認為逐行註解沒有什麼必要，建議可以將參數註解取消，使其定義為 <em>false</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">line_comments = false</code></pre>
        </div>
        <p><br></p>
        <p>再來是額外添加的部分，我個人習慣讓自己開發的專案 <b>config.rb</b> 文件另外添加一些配置，取消不必要的暫存生成，以及相關識別輔助...等，額外增添的參數不侷限於寫在文件的何處，我習慣加在文件的末端。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">cache = false</code></pre>
        </div>
        <p>此參數可以使 <b>.sass-cache</b> 的生成失效。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">sourcemap = true</code></pre>
        </div>
        <p>令 Compass 產出 CSS 樣式表的同時也生成 <b>.map</b> 格式的文件，它可以幫助我們直接在瀏覽器開發者模式裡閱讀到 CSS 屬性對應的 Sass 內容。</p>
        <p><br></p>
        <p>假如你有使用到 <em>image-url</em> 這個功能，像是給選擇器插入 <em>background-image</em> 屬性：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">body {
    background-image: image-url('img.jpg');
}</code></pre>
        </div>
        <p>編譯成 CSS 的結果為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">body {
    background-image: url('../images/img.jpg?1584062772');
}</code></pre>
        </div>
        <p>會發現 CSS 的影像後方多了一串代碼，其實這是 <em>image-url</em> 公式裡的第三個參數 <em>$cache-buster</em> 生成的，其完整公式為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-scss">image-url($path, $only-path, $cache-buster)</code></pre>
        </div>
        <p>這裡姑且不贅述它們的用途，只是要告訴大家如果使用這個函數，卻又不希望 CSS 生成那一串代碼，我們可以在使用 <em>image-url</em> 同時，給 <em>$cache-buster</em> 賦予 <em>false</em> 值即可，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-scss">body {
    background-image: image-url('img.jpg', false, false);
}</code></pre>
        </div>
        <p>然而，每一個影像都需要這樣寫又稍嫌麻煩了些，因此，我們就可以在 <b>config.rb</b> 文件配置這個參數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">asset_cache_buster {|*args| nil }</code></pre>
        </div>
        <p>如此一來編譯時系統就不會產出那串代碼了。</p>
        <p><br></p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">Encoding.default_external = 'utf-8'</code></pre>
        </div>
        <blockquote class="is-info">
            <p>部分 Ruby 版本（通常是比較早期的版本）在執行編譯時，會噴出「Error: Invalid CP950 character "\xxx"」這樣的訊息，大意是在說你的檔案內有存在 Ruby 無法識別的字元，遇到這種情況，我們可以在 <b>config.rb</b> 添加上方參數代碼，應該就能解決問題。</p>
        </blockquote>
        <p><br></p>
        <p>最後附上我個人的 <b>config.rb</b> 完整配置，提供給有需要的人員參考：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-ruby">require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "../"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

Encoding.default_external = 'utf-8'
cache = false
sourcemap = true
asset_cache_buster {|*args| nil }</code></pre>
        </div>
        <blockquote class="is-warning">
            <p>假如你在變更 <b>config.rb</b> 參數時已正在執行 <em>compass watch</em>，則必須終止並重新進行監控，<b>config.rb</b> 新變更的參數才會生效。</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>以下筆記從初始安裝到編譯專案的完整指令流程：</p>
        <h6>1. 下載、安裝 <a href="https://rubyinstaller.org/" target="_blank">RubyInstaller</a>。</h6>
        <h6>2. 於命令提示字元視窗依序輸入以下指令：</h6>
        <div class="text-code" v-pre>
            <pre><code class="language-bash">// 安裝 sass、compass
gem install sass
gem install compass

// cd 至專案資料夾底下，也可用滑鼠拖曳的方式
cd 專案資料夾

// 建立 compass 初始環境
compass create

// 執行監控
compass watch</code></pre>
        </div>

    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <dl>
            <dd><a href="http://compass-style.org/" target="_blank">Compass</a></dd>
            <dd><a href="http://blog.shihshih.com/installing-the-sass-and-compass/" target="_blank">CSS開發工具(Sass + Compass)的環境安裝教學及基本操作</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10128634" target="_blank">30天掌握Sass語法 - (8)Sass、Compass環境安裝流程教學</a></dd>
            <dd><a href="https://frankknow.com/sass-tutorial/" target="_blank">SASS教學 ＋SCSS：CSS 再進化，掌握語法攻略！</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>