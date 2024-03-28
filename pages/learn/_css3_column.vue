<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="25" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Column 基本概念</a></li>
            <li><a href="#act2">二、如何分割欄位？</a></li>
            <li><a href="#act3">三、如何改變欄位的間距？</a></li>
            <li><a href="#act4">四、欄位內的標題處理</a></li>
            <li><a href="#act5">五、如何製作瀑布流佈局？</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>假設有個排版的需求，希望網頁上的文章能像報章雜誌那樣呈現多欄排列的樣貌，一般我們可能會使用 <em>float</em> 或 <em>display: inline-block</em> 屬性達到預期效果。不過在 CSS3 中，Column 系列屬性就能直接將一段文字分割成欄，使其具有多欄式陳列內容的編排方式，此外，也有人活用其特性，實現過往得搭配 JavaScript 才能做到的「瀑布流」（Masonry）布局。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Column 基本概念</h2>
        <p>在進入 CSS3 Column 語法相關應用前，我們必須先釐清一些概念：當我們檢視一張表格或一個陣列矩陣的時候，橫向會稱為「列」，縱向則稱為「行」，但在部份華語國家，例如中國，則剛好相反，橫向為行，縱向為列，因此我們讀到相關文章時，有時候會產生行列混亂的錯覺，實乃雙方詞語定義上的誤會。而行列交織的每一個區塊，則通常稱為「欄」。</p>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/column-1.jpg">
        </figure>
        <p>不過對使用拉丁字母語系的 CSS 程式語言來說，行列的觀念比較明確且單純，元素裡的水平橫向就叫做列（Row），像 Flexbox 裡控制子元件排列方向的屬性 <em>flex-direction</em>，其預設值 <em>row</em>，及反向排列參數 <em>row-reverse</em> 指的便是該元素列位本身的控制。</p>
        <p>這裡插個題外話，之前介紹 CSS Flexbox 另一個屬性 <em>flex-wrap</em>，是用來定義父容器中的子元件是否「換行」，這其實也是中文詞彙美麗的謬誤之一，就前面敘述來看，我們應當稱之「換列」才對，因為當 <em>flex-wrap</em> 的值設定為 <em>wrap</em> 的時候，一旦子元件溢出父容器的寬度，則該子元件就會推移到下一列（或上一列，這就要看 <em>flex-direction</em> 的值是什麼）繼續做排序。</p>
        <p>回歸正題，相較於列（row），CSS 對於行跟欄的區分目前還沒有這麼明確，通常都是用帶有 <em>column</em> 單字的詞綴屬性來表示一列裡的欄或行相關設定。譬如 <em>column</em> 自成一格系列屬性外，<em>grid</em> 系列裡也有部份屬性也有摻雜 Column 概念，例如 <em>grid-template-columns</em>。</p>
        <blockquote class="is-info"><em>grid</em> 與 <em>column</em> 這兩套也是蠻多人不太懂區別的佈局屬性，簡單來說，<em>grid</em> 比較像是區域「格線」上的佈局，比起 <em>column</em>，倒不如說更常拿來與 <em>flex</em> 做比較。因為本篇文章重點不在這裡，在此先不多作贅述。</blockquote>
        <p><br></p>
        <p>那麼 CSS3 Column 具體如何運作，是怎麼影響目標設定 HTML 對象元素的畫面呈現呢？透過示意圖應該就能理解：</p>
        <figure>
            <img src="/images/learn/css/column-2.jpg">
        </figure>
        <p>這只是簡單的示意圖，實務上根據參數定義、網頁內容長短的不同，呈現出來的樣貌也會有所落差，甚至會產生一些容易被誤認為是 Bug 的問題，所以有派人不太喜歡這個屬性（後面會再提到原因），不過一般而言要用來處理純文字內容的排版風格還是很足夠用的。</p>
        <p><br></p>
        <p>當然，CSS3 Column 只是個屬性統稱，它底下還有數個功能各自不同的相關屬性，以下用一張簡表敘述之：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1 is-sticky">屬性</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>columns</em></div>
                    <div class="f-f3">設定欄寬與數量，為 <em>column-width</em> 與 <em>column-count</em> 的組合寫法</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>column-width</em></div>
                    <div class="f-f3">設定欄寬，預設值為 <em>auto</em></div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>column-count</em></div>
                    <div class="f-f3">設定欄位的數量</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>column-gap</em></div>
                    <div class="f-f3">設定欄與欄之間的間距</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>column-rule</em></div>
                    <div class="f-f3">設定欄與欄之間的邊線樣式，為 <em>column-rule-width</em>、<em>column-rule-style</em>、<em>column-rule-color</em> 的組合寫法</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>column-span</em></div>
                    <div class="f-f3">設定是否受 <em>columns</em> 影響，或者說是否讓指定元素橫跨多個欄位</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、如何分割欄位？</h2>
        <p>假設目前有一個文字區域，其原本 HTML 程式碼片段如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;section&gt;
    &lt;h1&gt;Aritcle Title&lt;/h1&gt;
    &lt;p&gt;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.&lt;/p&gt;
&lt;/section&gt;</code></pre>
        </div>
        <p>畫面：</p>
        <div class="text-example">
            <div class="ex-column">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p>現在需要將其排版更改成三欄式，若以過去傳統思維，可能會想說要將 <em>&lt;section&gt;</em> 拆成三個，透過 <em>float</em> 之類的屬性使其並排，然後再去把內文切割成三等份，平均地分配到三個 <em>&lt;section&gt;</em> 元素裡，以達到需求要求的結果。聽起來挺大費周章，對吧？也許有其他更省心省事的方法，但通常還是必須對原本的程式碼結構進行一番加工修改，而 CSS3 Column 屬性完全不需要改變現有架構，單純在 CSS 下定義即可。譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">section {
    column-count: 3;
}</code></pre>
        </div>
        <p>效果展示：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3;">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p><em>column-count</em> 這個屬性用來告知瀏覽器該區域將要切割成對應數字的欄位數量，在預設情況下，瀏覽器會將各欄位寬度作平均分配，假設要改變寬度──希望欄寬不要低於某個畫面尺寸，避免畫面寬度在縮窄過小，多欄排版反而降低閱讀性，那麼我們可以透過 <em>column-width</em> 去規範它。例如上面的例子我們添加 <em>column-width</em> 並設定為 <em>400px</em>，呈現出來的結果將會是：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3; column-width: 400px;">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p>會發現這個結果使得區域變成兩欄式了（但是 <em>column-count</em> 的值依舊是 <em>3</em>），你可以將欄位寬度值理解為「最小寬度值」，當欄位數量各自乘以寬度值的總和，大於總體版寬，瀏覽器將會自行調整欄位排版，減少欄位數量的同時，重新分配寬度以填滿整個版面。</p>
        <p><br></p>
        <p><em>column-width</em> 與 <em>column-count</em> 可以合併成 <em>columns</em> 單一簡寫屬性，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">section {
    columns: 3 200px;
}</code></pre>
        </div>
        <p>屬性值先後不影響渲染結果，如果只設定一個值，會由瀏覽器自行判斷是 <em>column-width</em> 還是 <em>column-count</em>，然後去對版面進行欄位分割的調整。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、如何改變欄位的間距？</h2>
        <p>用來改變欄位之間距離的屬性是 <em>column-gap</em>，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">section {
    column-gap: 60px;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3; column-gap: 60px;">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p>對比套用前的間距：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3;">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p>在沒有特意設定 <em>column-gap</em> 屬性的情況下，各分欄之間的間距值會以瀏覽器內建的預設值為主，通常是 <em>16px</em>。</p>
        <p><br></p>
        <p>另外，除了可以改變分欄間的間距外，還有一個 <em>column-rule</em> 屬性，它可以在欄與欄之間添加分隔線，語法、參數如同 <em>border</em> 與 <em>outline</em>。</p>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">section {
    column-rule: 4px dotted #f00;
}</code></pre>
        </div>
        <p>結果：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3; column-rule: 4px dotted #f00;">
                <h1>Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
        <p>如果要拆開來寫，個別定義和 <em>border</em> 一樣，分別是 <em>column-rule-width</em>（寬度）、<em>column-rule-style</em>（樣式）以及<em>column-rule-color</em>（顏色）。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、欄位內的標題處理</h2>
        <p>假設添加 <em>columns</em> 屬性的區塊，裡面包含了標題和內文，通常 <em>columns</em> 會將整個區域內所有元素一視同仁進行分欄調配，但一般我們閱讀文章時，標題通常會佔據一整列，而不會跟內文混合在一起被切割。雖說可以直接把標題元素拉出 Column 區域外來解決問題，但秉持著不修改原先 HTML 程式碼片段的前提，是否有什麼 CSS 屬性可以直接處理這個問題？有的，答案是 <em>column-span</em> 這個屬性。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">h1 {
    column-span: all;
}</code></pre>
        </div>
        <p>要注意這個屬性不是添加在設置 <em>columns</em> 屬性的主區域元素，而是要下在標題所在的元素本身。預設值是 <em>none</em>，表示該元素會跟隨主區域的設置一起加入欄位分割；而 <em>all</em> 值則表示不參與分欄，它將會直接占據一整列。</p>
        <p>效果：</p>
        <div class="text-example">
            <div class="ex-column" style="column-count: 3;">
                <h1 style="column-span: all;">Aritcle Title</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci tempora minus fugiat laudantium ullam a ad quam cum voluptates maxime nihil facere sint illum magni minima vitae, culpa nisi modi dignissimos voluptatem voluptas consequatur animi eveniet. Impedit minus earum soluta perspiciatis inventore blanditiis, quidem nisi necessitatibus ea reprehenderit deserunt labore sequi porro neque excepturi dignissimos enim animi voluptas beatae eum aspernatur? Mollitia natus magnam ducimus optio quia sapiente voluptatibus, sequi atque obcaecati quam veritatis, odio et deleniti at aut fugiat accusamus recusandae saepe quibusdam! Ullam ad sint iste quae modi reiciendis, similique, amet corrupti quia ex illo rem adipisci.</p>
            </div>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、如何製作瀑布流佈局？</h2>
        <p>最後來講講瀑布流佈局，所謂瀑布流（Masonry），指的是向下排列卡片式物件的一種編排模式，尤其是各物件高度不一的情況下，透過瀑布流進行編排是相當常見的作法，知名的設計師平台 <a href="https://www.pinterest.com/">Pinterest</a> 便是其中一例經典。</p>
        <figure>
            <img src="/images/learn/css/column-2.jpg">
            <figcaption>Pinterest 的瀑布流佈局排版。</figcaption>
        </figure>
        <p>要實現瀑布流效果基本需要通過 JavaScript 實現，不過後來有人發現，利用 CSS3 Column 屬性同樣也可以達成瀑布流的視覺效果，不僅語法簡單，而且還不需要依賴第三方套件（例如 jQuery），我們可以透過下方實例看看 CSS3 Column 是如何做到的：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="BaKYzeG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: Column-5">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/BaKYzeG">
            CSS3: Column-5</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>僅需 <em>columns-count</em> 和 <em>columns-gap</em> 兩個屬性分別設定欄數與間距即可。儘管輕鬆簡單，但仔細看排版會發現效果也非完美無瑕，舉例來說，我們可以從實例中的圖片編號發現，其物件是採先上下後左右的均分方式進行排序，而非先左右後上下的正常邏輯，當要進行特定條件的篩選排序（例如：時間）時，使用 CSS3 Column 實現的瀑布流佈局顯然會存在難以善了的問題。JavaScript 與 CSS3 的瀑布流佈局皆有各自優缺之處，要採用哪一種方式實現就自行斟酌。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://wcc723.github.io/css/2015/07/23/css-column/" target="_blank">CSS column 教學</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10195002?sc=rss.iron" target="_blank">CSS：column 瀑布流版型</a></dd>    
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
