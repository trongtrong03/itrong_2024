<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="65" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、監視 ref 基本型別響應式資料</a></li>
            <li><a href="#act2">二、監視 ref 物件型別響應式資料</a></li>
            <li><a href="#act3">三、監視 reactive 物件型別響應式資料</a></li>
            <li><a href="#act4">四、監視 ref 或 reactive 物件裡的指定屬性</a></li>
            <li><a href="#act5">五、監視多筆指定資料</a></li>
            <li><a href="#act6">六、解除對響應式資料的監視</a></li>
            <li><a href="#act7">七、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p><em>watch</em> 也是 Vue 元老級的特殊屬性，它的功能如其名所示，用來監視資料數據的變化，即便到了 Vue 3，它也依然扮演同樣的角色。只不過在 Vue 3，它能監看的項目有被明確陳述出來，分別是以下四種資料類型：</p>
        <ul>
            <li><em>ref</em> 定義的響應式資料</li>
            <li><em>reactive</em> 定義的響應式資料</li>
            <li>函式回傳的一個值（<em>getter</em> 函式）</li>
            <li>一個包含以上三者資料組成的陣列</li>
        </ul>
        <p>而監視這四樣資料類型時可能會產生五種情境，而這五種情境便是本篇文章各個章節的主軸。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、監視 ref 基本型別響應式資料</h2>
        <p>首先，我們建立一個可響應同步資料的範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2&gt;總和：{{ sum }}&lt;/h2&gt;
    &lt;button @click="addSum"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let sum = ref(0);

    function addSum(){
        sum.value += 1;
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>這個範例效果是當使用者點擊 <em>button</em> 按鈕時，會觸發 <em>addSum</em> 事件，該事件會使目前 <em>sum</em> 的值累進 + 1。</p>
        <p>我們除了可以直接在 DOM 上綁定的元素觀察到資料的變化外，也可以透過 <em>watch</em> 來監視。在 Vue 2 年代，<em>watch</em> 是 Options API 的其中一個配置項，到了 Vue 3，<em>watch</em> 如同上一篇文章學習的 <em>computed</em>，變成了函式架構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { watch } from "vue";
watch(Val, (newValue, oldValue) => { ... }, { immediate: true })</code></pre>
        </div>
        <p>1. <em>Val</em>：指的是我們宣告為響應式資料的變數名稱。</p>
        <p>2. <em>(newValue, oldValue) => {}</em>：為回調函式，當監視的狀態發生變化時就會被呼叫，這個回調函式接收兩個參數，分別是新的值以及舊的值。</p>
        <p>3. <em>{ immediate: true }</em>：如果有設置這個參數，表示立即執行一次回調函式，而不需要等待狀態的變化，這個參數是可填也可不填的配置項目。</p>
        <p>所以 Vue 3 <em>watch</em> 函式結構主要由上面三個參數組成，而第三個參數通常不是必要選項，也並非只有 <em>immediate</em>，還有其他林林總總不同用途的參數。大概看完了結構，接著將 <em>watch</em> 導入到現有的範例中：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;h2&gt;總和：{{ sum }}&lt;/h2&gt;
    &lt;button @click="addSum"&gt;Add&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, watch } from "vue";

    let sum = ref(0);

    function addSum(){
        sum.value += 1;
    }

    watch(sum, (newValue, oldValue) => {
        console.log("newValue:", newValue, "oldValue", oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>實際測試：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-1.jpg">
        </figure>
    </div>
    <div class="text-block" id="act2">
        <h2>二、監視 ref 物件型別響應式資料</h2>
        <p><em>ref</em> 物件型別的響應式監視會比基本型別來得複雜一些，開始說明前同樣先建立個範例，這次就一併把 <em>watch</em> 定義進去，然後再慢慢說明細節：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;名字：{{ user.name }}&lt;/p&gt;
    &lt;p&gt;年齡：{{ user.age }}&lt;/p&gt;
    &lt;button @click="changeName"&gt;修改名字&lt;/button&gt;
    &lt;button @click="changeAge"&gt;修改年齡&lt;/button&gt;
    &lt;button @click="changeUser"&gt;修改使用者&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, watch } from "vue";

    let user = ref({
        name: "阿比",
        age: 18
    })

    function changeName(){
        user.value.name += '~';
    }

    function changeAge(){
        user.value.age += 1;
    }

    function changeUser(){
        user.value = {
            name: "喵喵",
            age: 24
        }
    }

    watch(user, (newValue, oldValue) => {
        console.log("change", newValue, oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>首先，我們在此範例加入了三個按鈕，分別觸發三種不同的事件：修改姓名（添加 ~ 符號）、修改年齡，以及改變 <em>user</em> 物件裡所有屬性的值。確保它們能各自正常運作後，接著來看監視函式的部分，<em>watch</em> 裡頭定義的內容很簡單，就單純只是打印回傳響應式資料變更後的新、舊值。</p>
        <p>於是實際來觀測各個按鈕觸發後與監視之間的變化：</p>
        <p>觸發 <em>changeName</em>，DOM 上面的資料有響應，但是 <em>watch</em> 沒有反應。</p>
        <p>觸發 <em>changeAge</em>，DOM 上面的資料有響應，但是 <em>watch</em> 沒有反應。</p>
        <p>觸發 <em>changeUser</em>，DOM 上面的資料有響應，同時 <em>watch</em> 也回傳結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-2.jpg">
        </figure>
        <p>這說明了 <em>watch</em> 監視物件響應式資料時，並不關注物件裡面屬性的變化，而是當整個物件的「參考」發生變化時，監視狀態才會有所動作。</p>
        <h5>參考是什麼？</h5>
        <p>在 JavaScript 中，物件的參考指的是指向物件在記憶體中位置的指標。當我們建立一個物件並將其賦值給一個變數時，實際上是將該物件在記憶體中的位置保存在變數中，而不是物件本身的副本。因此，多個變數可以指向同一個對象，它們共享相同的參考。</p>
        <p>舉例來說，我們建立了以下一個物件：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const obj1 = { name: "阿比" };</code></pre>
        </div>
        <p>在這裡，<em>obj1</em> 指向了一個具有 <em>name</em> 屬性的對象，而物件在記憶體中的位置被儲存在 <em>obj1</em> 中。如果現在將 <em>obj1</em> 賦值給另一個變數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const obj2 = obj1;</code></pre>
        </div>
        <p>那麼 <em>obj2</em> 現在也指向同一個對象，即與 <em>obj1</em> 共享相同的引用。當我們修改 <em>obj1</em> 或 <em>obj2</em> 中的屬性時，實際上是修改了同一個對象，因為它們指向相同的記憶體位置。</p>
        <p>在 Vue.js 中，預設的 <em>watch</em> 行為是只監視物件的參考變化，也就是只有當物件的參考發生變化時才會觸發 <em>watch</em> 函式。如果只是修改物件內部的屬性而不改變物件的參考，<em>watch</em> 函式便不會觸發。</p>
        <p>然而，這也並不代表我們就完全無法監視特定物件屬性值的變化，只是我們需要多添加一個參數──<em>deep</em>，一般稱為深度或深層監視。</p>
        <p>在原本範例裡的 <em>watch</em> 函式多添加 <em>deep</em> 參數：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch(user, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
}, { deep: true })</code></pre>
        </div>
        <p>這時我們再去點擊 <em>button</em> 觸發 <em>changeName</em>、<em>changeAge</em> 事件，就可以在 Console 視窗觀看 <em>watch</em> 作用時回傳的資料變化。</p>
        <p>修改名字：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-3.jpg">
        </figure>
        <p>修改年齡：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-4.jpg">
        </figure>
        <p>眼尖的你也許已經發現，修改物件裡的屬性值，監視回傳的新值（<em>newValue</em>）和舊值（<em>oldValue</em>）都是同一個值（新值），而不像前面我們修改整個物件的內容，回傳的新值是新值，舊值是舊值。</p>
        <p>乍看會覺得不合理對吧？或許用日常生活的例子就比較能釋懷了：我們想像物件是一個房子，房子的牆面張貼了某款壁紙（屬性），當今天更換了壁紙，新的壁紙（新值）覆蓋掉原本的壁紙（舊值），我們查看（監視）房子時，就只會看到新的壁紙。但如果今天是換了一棟新房子（新值），舊的房子也還是存在（舊值），我們都還是能分別看到新與舊的房子（物件）。</p>
        <p>其實監視物件屬性值資料變化的新舊值都是指向新的值是 Vue 2 版本就已經存在的小問題，只是實務上程式多半只需要監視新的值，而不太會去管舊的值。</p>
        <p>總結以上所述，精簡一下重點：</p>
        <ul>
            <li>若修改 <em>ref</em> 物件資料裡的屬性，<em>newValue</em> 與 <em>oldValue</em> 都是新的值，因為它們都還是同一個物件。</li>
            <li>落修改 <em>ref</em> 物件資料裡的整個物件本身，<em>newValue</em> 會是新值，<em>oldValue</em> 則是舊值，因為它們已經不是同一個物件。</li>
        </ul>
    </div>
    <div class="text-block" id="act3">
        <h2>三、監視 reactive 物件型別響應式資料</h2>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;名字：{{ user.name }}&lt;/p&gt;
    &lt;p&gt;年齡：{{ user.age }}&lt;/p&gt;
    &lt;button @click="changeName"&gt;修改名字&lt;/button&gt;
    &lt;button @click="changeAge"&gt;修改年齡&lt;/button&gt;
    &lt;button @click="changeUser"&gt;修改使用者&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive, watch } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    function changeName(){
        user.name += '~';
    }

    function changeAge(){
        user.age += 1;
    }

    function changeUser(){
        Object.assign(user, { name: "喵喵", age: 24});
    }

    watch(user, (newValue, oldValue) => {
        console.log("change", newValue, oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p><em>reactive</em> 定義物件型別響應式資料的方式和 <em>ref</em> 差不多，所以直接進到差異比較的環節。</p>
        <p>上一篇文章介紹 <em>reactive</em> 用法時曾提到，透過 <em>reactive</em> 建立的響應式物件資料，只能針對物件裡的個別屬性，沒有辦法直接修改整個物件的內容，必須使用 <em>Object.assign</em> 函式，把新的物件資料匹配到原本的物件，覆蓋原本物件同名的屬性值。</p>
        <p>當我們監視由 <em>ref</em> 創建的響應式物件資料，只有整個物件被變更時，監視才會有所動作，如果只是修改物件裡面某個屬性的值，雖然 DOM 會響應新的值，但監視事件並不會有任何反應，除非我們在監視函式的後方加入第三個參數：<em>{ deep: true }</em>，啟用深層監視的功能。</p>
        <p>不過我們實測 <em>reactive</em> 的範例會發現，即便沒有加上 <em>{ deep: true }</em>，瀏覽器一樣可以監視到物件屬性的資料變化：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-5.jpg">
        </figure>
        <p>如果監視的對象是 <em>reactive</em> 響應式物件資料，那麼預設就是會啟用深層監視模式。以下再舉一個包含多層嵌套屬性的物件，來證明前面敘述的正確性。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;好詩好詩： {{ obj.stage1.stage2.stage3 }}&lt;/p&gt;
    &lt;button @click="changeObj"&gt;修改&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive, watch } from "vue";

    let obj = reactive({
        stage1: {
            stage2: {
                stage3: "庭院深深深幾許"
            }
        }
    })

    function changeObj(){
        obj.stage1.stage2.stage3 = "淚眼問花花不語"
    }

    watch(obj, (newValue, oldValue) => {
        console.log("change", newValue, oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-6.jpg">
        </figure>
        <p>可以看到即便修改的物件屬性位於該物件很深層的嵌套裡，<em>watch</em> 也依然可以在沒有引用 <em>{ deep: true }</em> 參數的情況下準確監視到 <em>reactive</em> 建立的物件資料。只不過要多注意的是，這種情況下的深層監視功能是無法被關閉的，即便加上 <em>{ deep: false }</em> 也無法關閉，而官方也為這種情境下的監視操作給予了一個正式專業術語：「隱式創建深層監視」。</p>
        <p>至於對眼睛依舊銳利的人會說，怎麼新值和舊值都是變更後的「淚眼問花花花不語」？這個問題的原理其實和上個章節最後講述的狀況是一樣的，響應式變更的資料是針對原物件的屬性值做更新，並沒有額外建立新的物件。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、監視 ref 或 reactive 物件裡的指定屬性</h2>
        <p>這種情況的監視定義上比較複雜，但它也是僅次第一種監視基本型別資料情境，時常於實務上出沒的需求。為什麼會說比較複雜？因為物件指定的屬性值，有可能是基本型別的資料，譬如純數字、字串，但也有可能是物件格式的資料，根據型別的不同，監視的方法也會不同。</p>
        <p><br></p>
        <h3>如果指定的屬性值是基本型別的值</h3>
        <p>複習一下上一章寫的範例（刪去修改整個物件資料的程式碼片段）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;名字：{{ user.name }}&lt;/p&gt;
    &lt;p&gt;年齡：{{ user.age }}&lt;/p&gt;
    &lt;button @click="changeName"&gt;修改名字&lt;/button&gt;
    &lt;button @click="changeAge"&gt;修改年齡&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive, watch } from "vue";

    let user = reactive({
        name: "阿比",
        age: 18
    })

    function changeName(){
        user.name += '~';
    }

    function changeAge(){
        user.age += 1;
    }

    watch(user, (newValue, oldValue) => {
        console.log("change", newValue, oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>當我們分別點擊按鈕觸發 <em>changeName</em> 以及 <em>changeAge</em> 事件，都會使監視函式偵測到資料改變而產生指定的動作。但如果現在我們只希望某個特定的屬性值被改變時，才會啟用監視功能，其餘屬性值被修改則不反應，也就是章節標題所描述的：監視 <em>ref</em> 或 <em>reactive</em> 物件裡的指定屬性。</p>
        <p>首先，直覺可能會想到我在監視函式裡直接調用物件該屬性如何？譬如只監視 <em>name</em> 屬性值的變化：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch(user, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
})</code></pre>
        </div>
        <p>回到瀏覽器去做測試，點擊按鈕發現 DOM 對應元素裡面顯示的資料數值是更新了，但 Console 視窗裡並沒有看到監視作用時回傳的內容，反倒是給了這方一條警告訊息：</p>
        <blockquote class="is-danger">
            <p>[Vue warn]: Invalid watch source:  阿比 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.</p>
        </blockquote>
        <p>它講述的內容其實就是前言提到的，<em>watch</em> 只能監看四種類型的資料來源，而物件型別裡的屬性並不包含在內。不過仔細看它的說明，其中一項提到了「getter/effect function」，所謂 <em>getter</em> 函式白話來說指的是能返回一個值的函式，既然 <em>watch</em> 不能直接監視物件裡的屬性，那麼換位思考，把要監視的指定物件屬性值傳給 <em>getter</em> 函式，再讓 <em>watch</em> 去監視該函式。</p>
        <p><em>watch</em> 函式裡調用 <em>getter</em> 函式的寫法為下：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch(()=>{ return user.name }, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
})</code></pre>
        </div>
        <p>測試結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-7.jpg">
        </figure>
        <p>可以看到 <em>name</em> 綁定的名字欄位確實有隨著資料響應更新而啟用監看，另一方面，沒有要讓 <em>watch</em> 監視的 <em>age</em> 屬性資料，無論我們觸發了多少次 <em>changeAge</em> 事件，監視函式也依然無動於衷。</p>
        <p>而 <em>getter</em> 函式還可以更進一步簡化，省略掉 <em>return</em>，保留要被監視的屬性即可：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch(()=> user.name, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
})</code></pre>
        </div>
        <p><br></p>
        <h3>如果指定的屬性值是物件</h3>
        <p>一樣，先呈上範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;p&gt;品種：{{ user.pets.b1 }}、{{ user.pets.b2 }}&lt;/p&gt;
    &lt;button @click="changeB1"&gt;換b1&lt;/button&gt;
    &lt;button @click="changeB2"&gt;換b2&lt;/button&gt;
    &lt;button @click="changePets"&gt;全換&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { reactive, watch } from "vue";

    let user = reactive({
        pets: {
            b1: "狗",
            b2: "貓"
        }
    });

    function changeB1(){
        user.pets.b1 = "水豚"
    }

    function changeB2(){
        user.pets.b2 = "鱷魚"
    }

    function changePets(){
        user.pets = {
            b1: "貓頭鷹",
            b2: "鸚鵡"
        }
    }

    watch(user.pets, (newValue, oldValue) => {
        console.log("change", newValue, oldValue);
    })
&lt;/script&gt;</code></pre>
        </div>
        <p>在這個範例應用中，我們不管是觸發 <em>changeB1</em> 抑或者 <em>changeB2</em> 事件，都會被 <em>watch</em> 監視到並回傳 Console 結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-8.jpg">
        </figure>
        <p>但是我們點擊按鈕觸發 <em>changePets</em>，DOM 的資料是更新了，卻沒有被監視：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-9.jpg">
        </figure>
        <p>這是一個很奇怪的現象，因為範例程式碼中監視的對象分明是 <em>user.pets</em>，結果 <em>user.pets</em> 裡面的屬性可以正常被監視到，修改整個 <em>user.pets</em> 卻反倒被忽視，且即便加上 <em>{ deep: true }</em> 也依然無濟於事，因為問題跟監視深不深層沒有什麼關係。</p>
        <p>雖然這麼說有點饒舌，但是當我們透過函式 <em>changePets</em> 觸發 <em>user.pets</em> 物件的修改，這時的 <em>user.pets</em> 已經不是當初 <em>watch</em> 所監視的那個 <em>user.pets</em> 了。</p>
        <p>如果我們要讓 <em>watch</em> 能順利監視 <em>user.pets</em> 物件裡全部的資料變化，作法其實就和基本型別的操作一樣，讓該物件變成傳入 <em>getter</em> 函式的一個值即可。所以上面原本 <em>watch</em> 的程式碼要改寫為：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch(() => user.pets, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
})</code></pre>
        </div>
        <p>這麼一來就能實現屬性值為物件的監視功能了：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-10.jpg">
        </figure>
        <p>不過這時監視的對象只會是 <em>user.pets</em> 整體被改變時才會有作用，假如希望監視不單單只有在物件整個被改變的時候作用，包含原本的 <em>user.pets.b1</em> 和 <em>user.pets.b2</em> 發生資料改變時也要能被監視到，那麼只要引入第三個參數 <em>{ deep: true }</em> 啟用深層監視就可以了。</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch(() => user.pets, (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
}, { deep: true })</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-11.jpg">
        </figure>
        <p><br></p>
        <p>最後精簡一下這個章節的內容，監視 <em>ref</em> 或 <em>reactive</em> 定義的物件響應式資料中的指定屬性，需要注意以下兩點：</p>
        <ol>
            <li>如果該屬性的值是基本資料型別的值，需要寫成函式（<em>getter</em>）將該屬性值視為參數傳入。</li>
            <li>如果該屬性的值是物件，則可以直接監視，也可以寫成函式（<em>getter</em>），通常建議後者。</li>
        </ol>
        <p>結論：監視的來源若是物件裡的屬性，無論屬性的值是基本型別還是物件，最好都用 <em>getter</em> 函式將其當作參數傳入。如果監視的物件是參考，且需要關注其內部其它屬性的變化，則要記得手動添加 <em>{ deep: true }</em> 開啟深層監視。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、監視多筆指定資料</h2>
        <p>前面四種監視情況都是針對某種整體類型或指定某物件裡屬性的資料，如果今天想在茫茫資料大海中只監視某幾項資料，函式邏輯要如何定義？</p>
        <p>這裡就不列出完整的模板程式碼了，只列出 <em>reactive</em> 資料定義的片段：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">let user = reactive({
    name: "阿比",
    age: 18,
    pets: {
        b1: "狗",
        b2: "貓"
    }
});

function changeName(){
    user.name = "喵喵"
}

function changeAge(){
    user.age += 1
}

function changeB1(){
    user.pets.b1 = "水豚"
}

function changeB2(){
    user.pets.b2 = "鱷魚"
}

function changePets(){
    user.pets = {
        b1: "貓頭鷹",
        b2: "鸚鵡"
    }
}</code></pre>
        </div>
        <p>首先，一樣得透過 <em>getter</em> 函式，只不過我們要將這個函式放在陣列裡面：</p>
        <div class="text-code" v-pre>
                <pre><code class="language-javascript">watch([() => user.name, () => user.pets.b1], (newValue, oldValue) => {
    console.log("change", newValue, oldValue);
})</code></pre>
        </div>
        <p>陣列裡的每筆資料都是獨立的 <em>getter</em> 函式。</p>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-12.jpg">
        </figure>
        <p>（第一筆是觸發 <em>changeName</em>，第二筆則觸發 <em>changeB1</em>）</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、解除對響應式資料的監視</h2>
        <p>不管是哪一種情境，一但事件觸發後，監視就會一直持續，即便該事件已經滿足某種預期的結果。以下這些情況通常都會希望停止響應式狀態的監視：</p>
        <h5>1. 條件變更時：</h5>
        <p>有時候你可能只需要在特定條件下監視某個狀態，一旦條件不再滿足，你就可以停止監視以節省資源。</p>
        <h5>2. 元件銷毀時：</h5>
        <p>當元件被銷毀時，你可能不再需要繼續對某個狀態進行監視，這時你可以在元件的 <em>beforeUnmount</em> 生命週期鉤子中呼叫停止函式，以避免不必要的效能開銷或記憶體洩漏。</p>
        <p>停止監視可以避免不必要的資源消耗，提高效能，並且在不再需要時釋放對狀態的引用，有助於避免記憶體洩漏問題。</p>
        <p>具體停止監視的方法並不複雜，在 Vue 3中，停止對響應式資料的監視可以透過呼叫 <em>watch</em> 函式傳回的停止函式來實現。當呼叫這個停止函式時，對應的監視將會被移除。</p>
        <p>以第一種情況的範例來衍伸，原本 <em>watch</em> 的敘述為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">watch(sum, (newValue, oldValue) => {
    console.log("newValue:", newValue, "oldValue", oldValue);
});</code></pre>
        </div>
        <p>改成用變數包裝（當然這個變數定義的內容也還是個函式），手動設定停止監視的條件，比如當總和響應累加到 5 便終止持續監視的行為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const stopWatch = watch(sum, (newValue, oldValue) => {
    console.log("newValue:", newValue, "oldValue", oldValue);
    if(newValue >= 5){
        stopWatch();
        console.log("Stop watch!!");
    }
});</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-4-13.jpg">
        </figure>
        <p>可以看到雖然 <em>addSum</em> 事件一直持續在進行，但是當總和到達 5 （我們設定的條件）的時候，瀏覽器便停止了對響應式資料的監視。</p>
    </div>
    <div class="text-block" id="act7">
        <h2>七、參考資料</h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=c2ZaqEyLVZI&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=17" target="_blank">【极简Vue3】017 watch监视 情况一</a></dd>
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