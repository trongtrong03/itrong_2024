<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、什麼是 Flexible Box？' },
        { id: 2, title: '二、認識主軸與交錯軸' },
        { id: 3, title: '三、如何讓子元件水平居中排列？' },
        { id: 4, title: '四、如何讓子元件垂直居中排列？' },
        { id: 5, title: '五、子元件之間的對齊方式能不一樣嗎？' },
        { id: 6, title: '六、子元件是否能換行或多行排列？' },
        { id: 7, title: '七、可以改變子元件的順序嗎？' },
        { id: 8, title: '八、父容器 flex 與 inline-flex 的差異？' },
        { id: 9, title: '九、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="14" fileType="learnList" />
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
        <p>在 Div 佈局概念還未普及之前，網頁前端開發者們習慣用 Table 進行網頁排版，但受限表格欄列式並排的排版結構，很難實現或必須用更多的表格嵌套實現較繁瑣的版型設計，隨著 Div 佈局的興起，其較自由又簡便的格式遂逐漸取代 Table，成為迄今依舊蔚為主流的排版佈局。然而，儘管 Div 大大提升網頁排版的靈活度，但是在部分需求上仍顯得支絀──例如令元素垂直居中對齊且等高，排版必須使用不下於 Table 階層數量的 Div 才能達到需求。例如：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="oNjrmjq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS: table-cell">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/oNjrmjq">
            CSS: table-cell</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>到了令網頁排版有大幅度變革的 CSS3 時代，排版佈局的方法也有顯著的提升，「CSS Flexible Box Layout」便是其中之一。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>CSS Flexible Box Layout，一般以 Flexbox 稱之，它是一種彈性容器（盒子），可以更簡單有效解決複雜的網頁佈局，譬如序章描述想實現的垂直居中效果，無論是 Tabale 或傳統 Div 設置 <em>display: table</em> 的應用，都需要插入大量的 HTML 標籤做嵌套，但如果透過 Flexbox 便可以大大減少 Div 的使用。</p>
        <p>Flexbox 的結構概念是這樣子的：</p>
        <figure>
            <img src="/images/learn/css/flexbox-1.jpg">
        </figure>
        <p>基本上就是建立一個父容器元素，然後裡面（下一階層）包覆著一或多個子元件。也有一說是外容器與內元件的關係，無妨，傳達概念都是一樣的。知道基礎概念後，實務層面應該如何寫呢？假定我們賦予父容器元素一個 <em>.parent</em> 的類別選擇器名稱，而子元件則給予 <em>.child</em>，HTML 標籤的程式碼將會是：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="parent"&gt;
    &lt;div class="child"&gt;子元件1&lt;/div&gt;
    &lt;div class="child"&gt;子元件2&lt;/div&gt;
    &lt;div class="child"&gt;子元件3&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p>CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
}

.child {
    flex: 1;
}</code></pre>
        </div>
        <p>這樣就能建立一個基本的 Flexbox 了，父容器必須將 <em>display</em> 定義為 <em>flex</em> 或 <em>inline-flex</em> 才能使其成為彈性盒子，這應該不難理解，比較令一般人生疏的是子元件的 <em>flex</em> 屬性，此屬性其實是 <em>flex-grow</em>、<em>flex-shrink</em>、<em>flex-basis</em> 組合起來的單行簡寫屬性，當 <em>flex</em> 只有一個值的時候，瀏覽器會默認其為 <em>flex-grow</em> 的值，而 <em>flex-grow</em> 的用途，主要用來分配該元素在父容器裡可佔據之寬度空間。以下我們針對這三個屬性個別做更詳盡的說明：</p>
        <p><br></p>
        <h3>flex-grow：</h3>
        <p>它的值是一個沒有單位的純數字，其預設值是 <em>0</em>，不允許負值或小數。在 <em>flex-basis</em> 沒有設定或它的值「小」於它在父容器分配到的寬度時，其佔寬會以設定之數值去做比例分配並作伸展。舉例來說，假設現在有三個子元件，其單位分別是：A = 1、B = 2、C = 1，則 A 在父容器裡延展的寬度將會是 1/4，B 則是 2/4，C 則與 A 相同都是 1/4。</p>
        <figure>
            <img src="/images/learn/css/flexbox-6.jpg">
        </figure>
        <p><br></p>
        <h3>flex-shrink：</h3>
        <p>與 <em>flex-grow</em> 相反，這個屬性代表的是「收縮」，在 <em>flex-basis</em> 沒有設定或它的值「大」於它在父容器分配到的寬度時，其佔寬會以設定之數值去做比例分配並作收縮，同樣地它的屬性值只會是數字，預設值為 <em>1</em>，<em>0</em> 代表不進行彈性變化。</p>
        <p><br></p>
        <h3>flex-basis：</h3>
        <p>它用來定義子元件的基本寬度，是個有單位的數值，例如 <em>100px</em>、<em>20em</em>...等等，預設值為 <em>0</em>。當此屬性沒有設定數值的時候，子元素將會以 <em>flex-grow</em> 的值去作彈性伸縮。</p>
        <p>舉例來說，某個彈性盒子裡有兩個子元件，CSS 設定分別為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child-1 {
    flex-grow: 1;
    flex-basis: 200px;
}

.child-2 {
    flex-grow: 0;
    flex-basis: 200px;
}</code></pre>
        </div>
        <p>實際結果：</p>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1 0 200px; background-color: aliceblue; padding: 1rem">child-1</div>
                <div class="child-2" style="flex: 0 0 200px; background-color: antiquewhite; padding: 1rem">child-2</div>
            </div>
        </div>
        <p><br></p>
        <p>很明顯可以發現，<em>.child-1</em> 因為允許該元素自動延展填充整個父容器的剩餘空間，因此兩個子元素平平都設定基本寬度為 <em>200px</em>，但 <em>.child-1</em> 實際佔寬明顯比較多；而 <em>.child-2</em> 雖然將伸展參數值設定為 <em>0</em>，但因為有設置基本寬度的緣故，所以最起碼還是能在父容器裡分得 <em>200px</em> 的寬度空間。</p>
        <p><br></p>
        <p>看完三個屬性的說明，接著回頭看看簡寫屬性 <em>flex</em>，如果我們要定義一個可延展，但不接受收縮，基本寬度為 <em>150px</em> 的子元件，則語法定義如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child {
    flex: 1 0 150px;
}</code></pre>
        </div>
        <p>接下來的內容會需要大量相關範例展示，幫助我們了解彈性盒子相關屬性的應用，以下建立一組包含三個子元件的彈性盒子，作為後續練習的基礎：</p>
        <p>CSS（只列出彈性盒子必要，及區分父容器與子元件的邊框、背景識別屬性）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
    border: 1px dashed #000;
}

.child-1 {
    flex: 1;
    background-color: aliceblue;
}

.child-2 {
    flex: 2;
    background-color: antiquewhite;
}

.child-3 {
    flex: 0 0 100px;
    background-color: lavender;
}</code></pre>
        </div>
        <p>實際結果：</p>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1; background-color: aliceblue; padding: 1rem">child-1</div>
                <div class="child-2" style="flex: 2; background-color: antiquewhite; padding: 1rem">child-2</div>
                <div class="child-3" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child-3</div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>彈性盒子許多屬性的參數運作，都是基於主軸與交錯軸去進行排序或對齊的，什麼是主軸與交錯軸？以下透過一圖以蔽之：</p>
        <figure>
            <img src="/images/learn/css/flexbox-2.jpg">
        </figure>
        <p>CSS 彈性盒子裡有個 <em>flex-direction</em> 屬性，它可以控制父容器的主軸、交錯軸的起始值，改變其他排序屬性的對齊依據，如同上方式意圖，瀏覽器預設情況下，<em>flex-direction</em> 的值為 <em>row</em>，表示子元件的排列參考點為由左至右。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
}

.child {
    flex: 0 0 100px;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p>如果改變 <em>flex-direction</em> 的值：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
    flex-direction: row-reverse;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; flex-direction: row-reverse; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p><em>row-reverse</em> 意思表示倒敘排列子元素，所以你才會看到上面範例中，子元素適從父容器的右側開始排起。</p>
        <p>除了上述的值，<em>flex-direction</em> 一共有這些參數：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f2">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>row</em></div>
                    <div class="f-f2">【預設值】由左至右，從上到下</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>row-reverse</em></div>
                    <div class="f-f2">由右至左，從下到上</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>column</em></div>
                    <div class="f-f2">從上到下，再由左至右</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>column-reverse</em></div>
                    <div class="f-f2">從下到上，再由右至左</div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>再進階來說，彈性盒子的父容器會以 <em>flex-direction</em> 設定的方向為「主軸」，與之垂直的另一軸則稱為「交錯軸」，它將會直接影響 <em>justify-content</em> 與 <em>align-items</em> 等屬性的對齊依據。一般而言，若 <em>flex-direction</em> 設定是水平排列，則 <em>justify-content</em> 將會是水平方向對齊方式（主軸為水平），<em>align-items</em> 則是對齊垂直方向（交錯軸為垂直）。</p>
        <p>但除非你是 CSS Flexbox 運用自如的宗師達人，不然一般情況下不是很建議修改 <em>flex-direction</em> 的方向機制，尤其是對正在使用的彈性盒子佈局進行維護時，任意改變 <em>flex-direction</em> 的值很可能導致整個網頁排版的崩潰。後續的文章說明，皆會以多數瀏覽器原本的預設值（<em>row</em>）為主。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>當父容器中的子元件未填滿整個寬度空間時，若要使子元件水平方向居中，我們需要在父容器對應的 CSS 選擇器裡，添加 <em>justify-content</em> 屬性，此屬性主要就是用來定義子元件要如何對齊父容器的主軸。</p>
        <p>在未設置 <em>justify-content</em> 屬性前，子元件在父容器裡的排列是靠「頭」（左）開始排列：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
}

.child {
    flex: 0 0 100px;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p><br></p>
        <p>若要靠中對齊，則加入 <em>justify-content</em>，並給予參數值 <em>center</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    justify-content: center;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; justify-content: center; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p>靠「尾」（右）對齊則是 <em>flex-end</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    justify-content: flex-end;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; justify-content: flex-end; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p>另外還有 <em>space-between</em> 與 <em>space-around</em> 兩個參數值，將子元件平均分散在父容器裡，兩者差別在於後者會保留首、尾子元素距離父元素兩側的間距。</p>
        <p><em>space-between</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    justify-content: space-between;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; justify-content: space-between; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p><em>space-around</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    justify-content: space-around;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; justify-content: space-around; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3</div>
            </div>
        </div>
        <p><br></p>
        <p>簡表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-start</em></div>
                    <div class="f-f4">【預設值】向主軸的頭（左或上）對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-end</em></div>
                    <div class="f-f4">向主軸的尾（右或下）對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>center</em></div>
                    <div class="f-f4">向主軸的中間對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>space-between</em></div>
                    <div class="f-f4">頭尾分散對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>space-around</em></div>
                    <div class="f-f4">頭尾分散對齊，但頭尾兩端留有間距</div>
                </div>
            </div>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/flexbox-3.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>還記得前面提過的主軸與交錯軸嗎？在預設條件下，彈性盒子裡的主軸呈水平方向，而掌控主軸子元件對齊的屬性是 <em>justify-content</em>，用來設置交錯軸──意即垂直方向的對齊屬性，則是 <em>align-items</em> 屬性，所以從某個方面來說，這兩個屬性可謂相對的存在。</p>
        <p>但有點和 <em>justify-content</em> 預設值將子元件靠頭對齊不同，<em>align-items</em> 的預設值（<em>stretch</em>）是將子元件拉伸填滿整個父容器的高度，而非子元件本身 Content 的高度。最明顯的一點在於當某個子元件的高度比其他來的高，但所有子元件的高度仍然相同。例如：</p>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2<br>child 2<br>child 2<br>child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3<br>child 3</div>
            </div>
        </div>
        <p>如果要針對單一子元件的垂直排序方式做調整，可以透過 <em>align-self</em> 屬性，這部分留到晚點再說，假如現在要處理的是將父容器裡的子元件通通垂直置中對齊的話，只需要在父容器對應的 CSS 選擇器裡，添加 <em>align-items</em> 屬性並給 <em>center</em> 值即可。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    align-items: center;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; align-items: center; text-align: center; border: 1px dashed #000;">
                <div class="child" style="flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2<br>child 2<br>child 2<br>child 2</div>
                <div class="child" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3<br>child 3</div>
            </div>
        </div>
        <p><br></p>
        <p>完整參數值列表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-start</em></div>
                    <div class="f-f4">靠頭對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-end</em></div>
                    <div class="f-f4">靠尾對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>center</em></div>
                    <div class="f-f4">向交錯軸的中間對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>baseline</em></div>
                    <div class="f-f4">對齊內元件內容的基線</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>stretch</em></div>
                    <div class="f-f4">【預設值】內元件拉伸至容器範圍</div>
                </div>
            </div>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/flexbox-4.jpg">
        </figure>
        <blockquote>
            <p>預設值 <em>stretch</em> 是很有意思的屬性值，它會將所有子元件的高度自動撐滿至與父容器同高，這在部分排版布局上（例如兩欄式排版左右要等高）非常實用。然而，需要注意的是若子元件一旦設定高度，則此參數便無效。</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <p>上一個章節問題介紹的是父容器裡的子元件垂直對齊方式，<em>align-items</em> 設定的值會套用到父容器裡面的所有子元件，那如果要針對某些子元件之間的對齊方式，則需要針對目標子元件添加 <em>align-self</em> 屬性。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child-1 {
    align-self: center;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="align-self: center; flex: 0 0 100px; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 0 0 100px; background-color: antiquewhite; padding: 1rem">child 2<br>child 2<br>child 2<br>child 2</div>
                <div class="child-3" style="flex: 0 0 100px; background-color: lavender; padding: 1rem">child 3<br>child 3</div>
            </div>
        </div>
        <p>至於它的屬性值和 <em>align-items</em> 差不多，以下列出幾項較常見的參數：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>auto</em></div>
                    <div class="f-f4">【預設值】子元件拉伸至容器範圍</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>stretch</em></div>
                    <div class="f-f4">子元件拉伸至容器範圍（與 <em>auto</em> 相同）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-start</em></div>
                    <div class="f-f4">靠頭對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-end</em></div>
                    <div class="f-f4">靠尾對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>center</em></div>
                    <div class="f-f4">向交錯軸的中間對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>baseline</em></div>
                    <div class="f-f4">對齊內元件內容的基線</div>
                </div>
            </div>
        </div>
        <p>此外要注意的是，假設父容器已設定 <em>align-item</em>，而某個子元件也有設定 <em>align-self</em> 情況下，則該子元件在交錯軸對齊的位置將會以自身的 <em>align-self</em> 屬性值為主。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>CSS Flexbox 中有一個 <em>flex-wrap</em> 屬性，可以令父容器裡的子元件超過、溢出父容器寬度範圍時，是否要進行換行或其他動作。通常瀏覽器預設值為 <em>nowrap</em>，也就是不換行，若子元件有設定 <em>flex-shrink</em> 收縮值，一旦子元件總佔寬超過父容器寬度，那些收縮值不為 <em>0</em> 的子元件就會向內收縮；反之若所有子元件都不允許收縮，則會直接溢出父容器外。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child {
    flex: 1 0 30%;
}</code></pre>
        </div>
        <div class="text-example" style="overflow-y: auto;">
            <div class="parent" style="display: flex; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1 0 30%; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 1 0 30%; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: lavender; padding: 1rem">child 3</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: mintcream; padding: 1rem">child 4</div>
            </div>
        </div>
        <p>若要實現父容器換行效果，將 <em>flex-wrap</em> 值修改為 <em>wrap</em> 即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    flex-wrap: wrap;
}

.child {
    flex: 1 0 30%;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; flex-wrap: wrap; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1 0 30%; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 1 0 30%; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: lavender; padding: 1rem">child 3</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: mintcream; padding: 1rem">child 4</div>
            </div>
        </div>
        <p>當第四個子元件因為塞不下父容器而推移到第二行，由於 <em>.child</em> 的 <em>flex-grow</em> 不等於 <em>0</em>，加上新的一行只有它一個子元件，所以便直接填滿該行全部的寬度。</p>
        <p>除了上述兩個值，<em>flex-wrap</em> 還有另一個值是 <em>wrap-reverse</em>，該參數除了表示換行，同時還會令子元素的排列方向進行反轉：</p>
        <div class="text-example">
            <div class="parent" style="display: flex; flex-wrap: wrap-reverse; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1 0 30%; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 1 0 30%; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: lavender; padding: 1rem">child 3</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: mintcream; padding: 1rem">child 4</div>
            </div>
        </div>
        <p><br></p>
        <p>以下對 <em>flex-wrap</em> 屬性的參數值做一個總整理列表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>wrap</em></div>
                    <div class="f-f4">換行</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>nowrap</em></div>
                    <div class="f-f4">【預設值】，不換行</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>wrap-reverse</em></div>
                    <div class="f-f4">換行且反轉</div>
                </div>
            </div>
        </div>
        <p>補充說明一點，<em>flex-direction</em> 和 <em>flex-wrap</em> 屬性可以簡寫為 <em>flex-flow</em> 一行屬性，前者用來控制子元件排列的主軸方向，後者則是設定當子元件溢出父容器寬度範圍時是否要換行。語法規則為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    flex-flow: flex-direction flex-wrap;
}</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    flex-flow: row wrap;
}</code></pre>
        </div>
        <p><br></p>
        <p>除此之外，這裡還要再另外介紹一個看上去跟 <em>align-items</em> 有幾分神似的 <em>align-content</em> 屬性，堪稱是前者的多行版本，也是用來控制子元件在多行排版情況下，於父容器裡交錯軸的對齊方向。以下是它的參數值列表：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">參數值</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-start</em></div>
                    <div class="f-f4">靠頭對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>flex-end</em></div>
                    <div class="f-f4">靠尾對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>center</em></div>
                    <div class="f-f4">向交錯軸的中間對齊</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>space-between</em></div>
                    <div class="f-f4">分散對齊容器交錯軸兩端</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>space-around</em></div>
                    <div class="f-f4">散對齊容器交錯軸兩端，但頭尾兩端留有間距（間距平均分配）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>stretch</em></div>
                    <div class="f-f4">【預設值】內元件拉伸至容器範圍</div>
                </div>
            </div>
        </div>
        <p>示意圖：</p>
        <figure>
            <img src="/images/learn/css/flexbox-5.jpg">
        </figure>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.parent {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    height: 200px;  /* 用來凸顯 align-content 的效果 */
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; flex-wrap: wrap; height: 200px; align-content: space-between; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 1 0 30%; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 1 0 30%; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: lavender; padding: 1rem">child 3</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: mintcream; padding: 1rem">child 4</div>
                <div class="child-3" style="flex: 1 0 30%; background-color: aliceblue ; padding: 1rem">child 5</div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[7].id">
        <h2 v-text="catalog[7].title"></h2>
        <p>有時候網頁前端作業時，會遇到原本左 A 右 B 並排的區塊，在 RWD 縮放到某一區間時要改為左 B 右 A 的排版需求，有時甚至不單單只是如此，也可能是上 A 下左 B 右 C，變成上 B 下左 C 右 A 之類的，如果是過去傳統的佈局方法，總是令開發者一個頭兩個大。不過，CSS Flexbox 可以漂亮地解決開發者這方面的困擾。</p>
        <p>雖說前面練習各種彈性盒子的相關屬性語法中，其實已經多次改變了子元件在畫面上顯示的順序，譬如透過 <em>flex-direction</em> 進行方向的反轉，不過這些充其量都是針對父容器裡的子元件做出整體的排序調整，若要在不變更 HTML 標籤順序的前提下，用 CSS 改變子元件的排列順序，那麼就需要 <em>order</em> 這個強大的屬性了，而這也是彈性盒子比過去傳統 Table 與 Div 佈局來得更強大、更具「彈性」靈活的優勢之一。</p>
        <p><em>order</em> 的使用方式很簡單，只要直接添加在子元件對應的 CSS 選擇器裡，並依想要排序的順序給數字值即可，數字越大，表示優先度越靠後。</p>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child-1 {
    order: 3;
}

.child-2 {
    order: 2;
}

.child-3 {
    order: 4;
}

.child-4 {
    order: 1;
}</code></pre>
        </div>
        <div class="text-example">
            <div class="parent" style="display: flex; flex-wrap: wrap; text-align: center; border: 1px dashed #000;">
                <div class="child-1" style="flex: 0 0 100px; order: 3; background-color: aliceblue; padding: 1rem">child 1</div>
                <div class="child-2" style="flex: 0 0 100px; order: 2; background-color: antiquewhite; padding: 1rem">child 2</div>
                <div class="child-3" style="flex: 0 0 100px; order: 4; background-color: lavender; padding: 1rem">child 3</div>
                <div class="child-4" style="flex: 0 0 100px; order: 1; background-color: mintcream; padding: 1rem">child 4</div>
            </div>
        </div>
        <p><em>order</em> 的預設值是 <em>0</em>，且允許使用負數，它會和其他子元件的 <em>order</em> 數值比較，數字越小排在越前面。回到開頭遇到的問題，如果子元件在面對 RWD 不同尺寸區間有不同的排序，那麼只要在指定的 <em>@media</em> 區間針對子元件的 <em>order</em> 值做數字大小上的更動即可，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.child-1 {
    order: 1;
}

.child-2 {
    order: 2;
}

.child-3 {
    order: 3;
}

@media only screen and (max-width: 768px) {
    .child-1 {
        order: 3;
    }

    .child-2 {
        order: 2;
    }

    .child-3 {
        order: 1;
    }
}</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[8].id">
        <h2 v-text="catalog[8].title"></h2>
        <p>要將 HTML 元素標籤的 <em>display</em> 屬性定義為彈性盒子，CSS 提供兩種參數值，分別是 <em>flex</em> 與 <em>inline-flex</em>，這兩者的差別在哪裡呢？或許有些眼尖的人會覺得似乎和 <em>block</em> 及 <em>inline-block</em> 有異曲同工之妙，事實上也的確如此。</p>
        <p><em>flex</em> 等同 <em>block</em> 的排列模式，會獨自佔據 HTML Content 裡的一整列，會將同階層的前後其他元素推擠到上或下列的位置；而 <em>inline-flex</em> 則類似 <em>inline-block</em>，會接受與其他同質的前後元素並排，除非 HTML Content 的一列空間塞不下，才會將後續其他元素推移到下一列去。</p>
        <p>單純文字說明不容易理解，我們直接觀看實際演練的結果：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-theme-id="dark" data-default-tab="css,result" data-user="itrong" data-slug-hash="mdeZoVJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS3: flexbox-1">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/mdeZoVJ">
            CSS3: flexbox-1</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[9].id">
        <h2 v-text="catalog[9].title"></h2>
        <dl>
            <dd><a href="https://developer.mozilla.org/en-US/docs/Glossary/Flexbox" target="_blank">MDN web docs</a></dd>
            <dd><a href="https://www.oxxostudio.tw/articles/201501/css-flexbox.html" target="_blank">深入解析 CSS Flexbox</a></dd>
            <dd><a href="https://wcc723.github.io/css/2017/07/21/css-flex/" target="_blank">圖解：CSS Flex 屬性一點也不難</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>