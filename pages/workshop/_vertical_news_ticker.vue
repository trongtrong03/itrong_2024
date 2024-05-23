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
        <TempArticle :propValue="5" fileType="workshop" />
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
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="vbOvJP" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/vbOvJP">
            jq-newsticker</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="news-wrap"&gt;
    &lt;ul class="news-item"&gt;
        &lt;li&gt;&lt;a href="#0"&gt;標題A&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#0"&gt;標題B&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#0"&gt;標題C&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.news-list {
    overflow: hidden;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var hoverNews = null;
function newsTicker() {
  $(".news-list")
    .filter(function(item) {
        return !$(this).is(hoverNews);
    })
    .each(function() {
        $(this)
        .find("li:first")
        .slideUp(function() {
            var newsitem = $(this).closest(".news-list");
            $(this)
                .appendTo(newsitem)
                .slideDown();
        });
    });
}
setInterval(newsTicker, 1000);

$(function() {  
    $(".news-list").hover(
        function() {
            hoverNews = $(this);
        },
        function() {
            hoverNews = null;
        }
    );
});</code></pre>
        </div>
        <p><br></p>
        <p>假如要一次顯示比較多的筆數，可以從外層 <em>.news-list</em> 的高度著手，以前面預覽範例舉例，裡面單項 <em>li</em> 的高度為 <em>3rem</em>，假如我想要讓整個列表同時顯示三筆資料，則可以將 <em>.news-list</em> 的高度設置為 <em>9rem</em>（3rem * 3）</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>暫無內容。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
