<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 1, title: '一、JavaScript 版本' },
        { id: 2, title: '二、jQuery 版本' },
        { id: 3, title: '三、Vue 版本' },
        { id: 4, title: '三、CSS 版本' },
    ]);
</script>

<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="3" fileType="workshop" />
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
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="KKbaGLE" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/KKbaGLE">
            JS effects-tabs</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="tabs-wrap"&gt;
    &lt;div class="tabs-nav"&gt;
        &lt;ul&gt;
            &lt;li class="tabs-item"&gt;標題A&lt;/li&gt;
            &lt;li class="tabs-item"&gt;標題B&lt;/li&gt;
            &lt;li class="tabs-item"&gt;標題C&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class="tabs-main"&gt;
        &lt;div class="tabs-content"&gt;內容A&lt;/div&gt;
        &lt;div class="tabs-content"&gt;內容B&lt;/div&gt;
        &lt;div class="tabs-content"&gt;內容C&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.tabs-wrap {
    display: flex;
}

.tabs-nav {
    flex: 0 0 8rem;
}

.tabs-content {
    display: none;
}

.tabs-content.is-active {
    display: block;
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}</code></pre>
        </div>
        <p>也可以使用 <em>float</em> 或 <em>display: inline-block</em> 等方式取代 <em>flex</em> 使標題與內容左右排列。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">document.addEventListener("DOMContentLoaded", function () {
    var tabsItems = document.querySelectorAll(".tabs-item");
    var tabsContent = document.querySelectorAll(".tabs-content");

    tabsItems[0].classList.add("is-active");
    tabsContent[0].classList.add("is-active");

    tabsItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            tabsItems.forEach(function (tab) {
                tab.classList.remove("is-active");
            });
            tabsContent.forEach(function (content) {
                content.classList.remove("is-active");
            });
            item.classList.add("is-active");
            tabsContent[index].classList.add("is-active");
        });
    });
});</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function(){
    $(".tabs-item:first").addClass("is-active");
    $(".tabs-content:first").addClass("is-active");
    $(".tabs-item").click(function(){
        $(this).addClass("is-active");
        $(this).siblings().removeClass("is-active");
        $(".tabs-content").siblings().removeClass("is-active");  
        $(".tabs-content").eq($(this).index()).addClass("is-active");
    });
});</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="VJQbYN" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/VJQbYN">
            jq-tabs</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.37/vue.global.prod.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="app"&gt;
    &lt;div class="tabs-nav"&gt;
        &lt;ul&gt;
            &lt;li class="tabs-item" :class="isActive==1 ? 'is-active' : ''" @click="isActive=1"&gt;標題A&lt;/li&gt;
            &lt;li class="tabs-item" :class="isActive==2 ? 'is-active' : ''" @click="isActive=2"&gt;標題B&lt;/li&gt;
            &lt;li class="tabs-item" :class="isActive==3 ? 'is-active' : ''" @click="isActive=3"&gt;標題C&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class="tabs-main"&gt;
        &lt;div class="tabs-content" v-if="isActive==1"&gt;內容A&lt;/div&gt;
        &lt;div class="tabs-content" v-if="isActive==2"&gt;內容B&lt;/div&gt;
        &lt;div class="tabs-content" v-if="isActive==3"&gt;內容C&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS：</p>
        <p>在前面 JavaScript 與 jQuery 版本中，會需要將 <em>.tabs-content</em> 的 <em>display</em> 屬性值設為 <em>none</em>，但 Vue 本身具備被調用才會被 DOM 渲染的特性，所以不需要改變 <em>.tabs-content</em> 的 <em>display</em>。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            isActive: 1,
        }
    },
}

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="jOXyQNJ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/jOXyQNJ">
            Vue effects-vertical tabs</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>暫無內容。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
