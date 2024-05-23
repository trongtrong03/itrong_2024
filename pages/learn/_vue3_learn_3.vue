<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、建立一個響應式資料相加的範例' },
        { id: 2, title: '二、使用 computed 計算屬性' },
        { id: 3, title: '三、讓計算屬性從唯讀變成可修改的值' },
        { id: 4, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="64" fileType="learnList" />
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
        <p>這個章節學習的主題是 <em>computed</em>，也就是「計算」屬性，計算屬性是早在 Vue 早期版本便具有的功能之一，用途如其名，用於定義計算屬性的選項。計算屬性是一種依賴其他屬性值並且具有快取機制的屬性。它們的值是根據相關屬性值計算得出的，只有在相關屬性發生變化時才會重新計算，否則會直接傳回快取的結果。</p>
        <p>計算屬性的引入使得在 Vue.js 組件中可以非常方便地定義複雜的計算邏輯，並且可以在模板中像存取普通屬性一樣使用這些計算屬性。這種方式使得組件的模板更加簡潔和易讀，同時也提高了程式碼的可維護性和可讀性。在 Vue 3 版本中，計算屬性並沒有顯著的變化，大抵與 Vue 2 版本保持一致，只是因為 Vue 3 導入 Composition API，加上渲染效能提升等因素，計算屬性比起過去版本來得更加靈活、高效及容易使用。</p>
        <p>也因為計算屬性本身使用方式並沒有太大變革，即便站在 Vue 3 角度學習它，其概念回到 Vue 2 乃至於 Vue 1 也依然適用。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>在開始操作計算屬性之前，我們先建立一個範例，這個範例的功能需要兩個輸入框，分別是姓氏和名字，該輸入框可以即時接收使用者輸入的內容，然後在表單下方將姓氏與名字相結合並輸出成純文字。</p>
        <p>程式碼結構範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;label&gt;姓氏：&lt;/label&gt;
        &lt;input type="text" v-model="firstName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label&gt;名字：&lt;/label&gt;
        &lt;input type="text" v-model="lastName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ firstName + lastName }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref } from "vue";

    let firstName = ref("黃");
    let lastName = ref("阿比");
&lt;/script&gt;</code></pre>
        </div>
        <p>簡單說明幾個要點：</p>
        <p>1. 使用 <em>v-model</em> 來綁定輸入框與對應響應式資料的值。</p>
        <p>2. 定義的變數資料使用 <em>ref</em> 來使其成為響應式資料，否則若只是單純的變數，縱使修改了輸入框的值，也無法同步響應到變數身上。</p>
        <p>3. 使用 <em v-pre>{{ }}</em> 將 <em>firstName</em> 與 <em>lastName</em> 相接，從而達到顯示姓名的純文字效果。</p>
        <p>初始畫面：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-1.jpg">
        </figure>
        <p>嘗試修改輸入框裡的值，可以發現下方姓名的文字也會同步更新：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-2.jpg">
        </figure>
        <p>事實上，這個把姓氏與名字串接起來的 <em v-pre>{{ firstName + lastName }}</em> 就是一個簡單的計算邏輯，既然這種方式就能實現計算需求，那還有必要使用 <em>computed</em> 屬性嗎？先不急著下定論，先就上方建立好的範例，繼續衍生其它需求。</p>
        <p>假設現在輸入的是英文姓名，譬如「li」（姓）、「jessica」（名），正常情況下，英文姓名的首字應該為大寫，可是我們無法保證每個填寫表單的使用者都會自動自發地將首字母輸入為大寫，因此我們只能透過程式輔助，將輸入框裡的資料首字母強制以大寫表示。</p>
        <p>在不改變目前程式碼結構的前提下，我們只能從 <em v-pre>{{ firstName + lastName }}</em> 作文章，詳細實現過程就不多作解釋了，直接呈上結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">
&lt;p&gt;姓名：{{ firstName.slice(0, 1).toUpperCase() + firstName.slice(1)+ "." + lastName.slice(0, 1).toUpperCase() + lastName.slice(1) }}&lt;/p&gt;</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-3.jpg">
        </figure>
        <p>需求實現是實現了，但，不覺得這樣子寫非常難以閱讀嗎？況且 Vue 官方總是強調開發者應該避免在模板上添加過多的程式碼，盡可能讓模板看起來簡單乾淨，顯然上面的寫法已經違反此一原則。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>承接上一章節的尾段，比起把模板搞得花花綠綠，Vue 官方更希望開發者將這些程式碼轉移到 <em>&lt;script&gt;</em> 裡面，透過 <em>computed</em> 計算屬性來撰寫程式運算邏輯。過往 Vue 2 Options API 的 <em>computed</em> 屬性配置是這樣調用：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">new Vue({
    computed: { ... }
});</code></pre>
        </div>
        <p>到了 Vue 3 Composition API 寫法則有些不同，首先我們一樣要在 <em>import</em> 裡把 <em>computed</em> 呼叫進來：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">import { computed } from "vue";</code></pre>
        </div>
        <p>而 <em>computed</em> 則變成了函式定義的寫法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let Func = computed(() => { ... })</code></pre>
        </div>
        <p>因為 Vue 3 淡化了 <em>this</em> 的存在，所以在 Vue 3 的函式普遍都會直接用箭頭函式來陳述程式敘述句。</p>
        <p>結合前一章範例的內容，完整程式碼將會改寫為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;label&gt;姓氏：&lt;/label&gt;
        &lt;input type="text" v-model="firstName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label&gt;名字：&lt;/label&gt;
        &lt;input type="text" v-model="lastName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, computed } from "vue";

    let firstName = ref("li");
    let lastName = ref("jessica");

    let fullName = computed(() => {
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1)+ "." + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    });
&lt;/script&gt;</code></pre>
        </div>
        <p>唯一要注意的重點就是在 JavaScript 裡面操作 <em>firstName</em> 和 <em>lastName</em> 的值時，別忘記要添加 <em>.value</em>，因為它們都是藉由 <em>ref</em> 定義的響應式資料。</p>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-3.jpg">
        </figure>
        <p>使用 <em>computed</em> 的益處也不單只有將模板簡單化，它還有著可緩存的特性。是否還記得前言曾這樣描述計算屬性嗎？</p>
        <blockquote>
            <p>計算屬性是一種依賴其他屬性值並且具有快取機制的屬性。它們的值是根據相關屬性值計算得出的，只有在相關屬性發生變化時才會重新計算，否則會直接傳回快取的結果。</p>
        </blockquote>
        <p>現在我們於 <em>computed</em> 添加一個 Console 句，並且在模板多次呼叫調用 <em>computed</em> 的函式名稱：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;!-- 略 --&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, computed } from "vue";

    let firstName = ref("li");
    let lastName = ref("jessica");

    let fullName = computed(() => {
        console.log("computed!");
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1)+ "." + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    });
&lt;/script&gt;</code></pre>
        </div>
        <p>呼叫了五次，憑感覺來說 Console 也應該會輸出五次「computed!」，然而實際測試的結果卻是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-4.jpg">
        </figure>
        <p>假如資料沒有任何變動，不管我們在模板上調用了幾次 <em>fullName</em>，它都只會保存第一次記錄下來的結果，直到資料發生變化，它才會再次進行計算。譬如我們透過姓氏輸入框把「li」修改成「wu」：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-5.jpg">
        </figure>
        <p>這時就會看到 Console 回傳了四次「computed!」，因為先是逐一刪除「l」、「i」單字，後又分別鍵入了「w」以及「u」，總計發生了四次變化。</p>
        <p>簡單來說，只要資料沒有變動，那麼 <em>computed</em> 就不會重複做多餘的動作，但如果不使用它，單純使用函式來處裡需求：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;!-- 略 --&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ fullName() }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName() }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName() }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName() }}&lt;/p&gt;
        &lt;p&gt;姓名：{{ fullName() }}&lt;/p&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, computed } from "vue";

    let firstName = ref("li");
    let lastName = ref("jessica");

    function fullName(){
        console.log("computed!");
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1)+ "." + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    } 
&lt;/script&gt;</code></pre>
        </div>
        <p>這麼做確實也能達到姓氏與名字字首皆強制大寫且拼接成完整姓名的效果，然而打開 Console 視窗一看：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-6.jpg">
        </figure>
        <p>會發現模板調用了幾次，它就會執行幾次程式，完全不在乎內容是否都相同，徒增記憶體的浪費。如果像上面的操作將「li」修改成「wu」，你就會發現 Console 視窗輸出的數量非常驚人：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-7.jpg">
        </figure>
        <p>截圖就不截到底了，總之就是 4 * 5 總共輸出了 20 次「computed!」。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>根據前面練習的範例，事實上我們在輸入框修改的內容，並不會直接傳給 <em>fullName</em>。舉例來說，當我們於 <em>lastName</em> 輸入框修改它原本的值「阿比」變更為「喵喵」，首先是 <em>lastName</em> 這個響應式資料的值更新成「喵喵」，然後才經由 <em>fullName</em> 進行計算，最後返回到畫面上的元素。</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-8.jpg">
        </figure>
        <p>為了驗證 <em>fullName</em> 的類型，我們在模板新增一個按鈕，並且添加一個點擊事件 <em>changeFullName</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;label&gt;姓氏：&lt;/label&gt;
        &lt;input type="text" v-model="firstName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label&gt;名字：&lt;/label&gt;
        &lt;input type="text" v-model="lastName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
    &lt;/div&gt;
    &lt;button @click="changeFullName"&gt;Change fullName&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, computed } from "vue";

    let firstName = ref("黃");
    let lastName = ref("阿比");

    let fullName = computed(() => {
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    });

    function changeFullName(){
        console.log(fullName);
    }
&lt;/script&gt;</code></pre>
        </div>
        <p>先在 <em>changeFullName</em> 函式中 Console <em>fullName</em>，點擊按鈕觸發該事件，得到的 Console 輸出結果是：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-9.jpg">
        </figure>
        <p><em>fullName</em> 的類型是 ComputedRefImpl，雖然不完全等同 RefImpl，但這也代表它也是一個響應式資料，如果我們想修改它的值，就必須添加 <em>.value</em>。</p>
        <p>──直覺這麼想，合理，對吧？於是我們嘗試透過 <em>changeFullName</em> 函式變更其資料，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function changeFullName(){
    fullName.value = "李喵喵";
}</code></pre>
        </div>
        <p>來到網頁應用進行測試，卻發現按鈕點擊了沒有任何反應，打開 Console 工具，發現視窗裡頭反饋了一則警告：</p>
        <blockquote class="is-danger">
            <p>[Vue warn] Write operation failed: computed value is readonly</p>
        </blockquote>
        <p>意思是在說 <em>computed</em> 裡的 <em>value</em> 是唯讀屬性，不能被更改。那我們該怎麼做，才能令 <em>fullName</em> 的值成為可讀又可改的資料呢？解鈴還須繫鈴人，答案是我們得從 <em>computed</em> 計算屬性函式裡下手。</p>
        <p><em>computed</em> 裡分別需要用到兩種函式：<em>get</em>（getter）和 <em>set</em>（setter）：</p>
        <h5><em>get</em>：</h5>
        <p>用於定義計算屬性的 getter，即當存取計算屬性時會執行的函式。這個函式沒有參數，它通常用於傳回計算屬性的值，可以依賴其他響應式資料。</p>
        <h5><em>set</em>：</h5>
        <p>用於定義計算屬性的 setter，即設定計算屬性的值時會執行的函式。它會接收一個參數，通常用於處理計算屬性值的修改，並且可以執行一些額外的邏輯。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let fullName = computed({
    get(){
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    },
    set(e){
        console.log(e);    // 李喵喵
    }
});

function changeFullName(){
    fullName.value = "李喵喵";
}</code></pre>
        </div>
        <p>現階段 <em>set</em> 裡的程式功能只有單純輸出（Console）傳進來參數的值是什麼而已，目的是要讓我們瞭解它傳進來的參數指向是 <em>changeFullName</em> 事件觸發時 <em>value</em> 改變的值。</p>
        <p>回到原本的程式需求，讓 <em>changeFullName</em> 事件觸發後，DOM 畫面上的 <em>fullName</em> 能變更成我們設定的資料，<em>set</em> 應該要這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let fullName = computed({
    get(){
        return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
    },
    set(e){
        const str1 = e.slice(0, 1);
        const str2 = e.slice(1);
        firstName.value = str1;
        lastName.value = str2;
    }
});</code></pre>
        </div>
        <p>實測結果：</p>
        <figure>
            <img src="/images/learn/js/vue3-learn-3-10.jpg">
        </figure>
        <p>完整的程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;template&gt;
    &lt;div&gt;
        &lt;label&gt;姓氏：&lt;/label&gt;
        &lt;input type="text" v-model="firstName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;label&gt;名字：&lt;/label&gt;
        &lt;input type="text" v-model="lastName"&gt;
    &lt;/div&gt;
    &lt;div&gt;
        &lt;p&gt;姓名：{{ fullName }}&lt;/p&gt;
    &lt;/div&gt;
    &lt;button @click="changeFullName"&gt;Change fullName&lt;/button&gt;
&lt;/template&gt;

&lt;script lang="ts" setup&gt;
    import { ref, computed } from "vue";

    let firstName = ref("黃");
    let lastName = ref("阿比");

    let fullName = computed({
        get(){
            return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + lastName.value.slice(0, 1).toUpperCase() + lastName.value.slice(1);
        },
        set(e){
            const str1 = e.slice(0, 1);
            const str2 = e.slice(1);
            firstName.value = str1;
            lastName.value = str2;
        }
    });

    function changeFullName(){
        fullName.value = "李喵喵";
    }
&lt;/script&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=9PhQoYMQjWw&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=16" target="_blank">【极简Vue3】016 computed计算属性</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>