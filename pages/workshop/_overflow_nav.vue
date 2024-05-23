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
        <TempArticle :propValue="25" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="bGOrRqr" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/bGOrRqr">
            jQuery effects-overflow nav</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
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
            <pre><code class="language-html">&lt;nav&gt;
    &lt;ul id="nav"&gt;
        &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;News&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Products&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#"&gt;Store&lt;/a&gt;&lt;/li&gt;
        ...
        &lt;li class="more"&gt;
            &lt;span&gt;...&lt;/span&gt;
            &lt;ul id="navSub"&gt;&lt;/ul&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">nav ul {
    overflow: hidden;
}

nav li {
    float: left;
}

nav li.more {
    display: none;
}

nav li.more:hover #navSub {
    opacity: 1;
    visibility: visible;
}

#navSub {
    opacity: 0;
    visibility: hidden;
}

#navSub li {
    float: none;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">window.onresize = navigationResize;
navigationResize();

function navigationResize() {
    $('#nav li.more').before($('#navSub > li'));

    var $navItemMore = $('#nav > li.more'),
        $navItems = $('#nav > li:not(.more)'),
        navItemMoreWidth = navItemWidth = $navItemMore.width(),
        navWidth = $("#nav").width(),
        navItemMoreLeft, offset, navOverflowWidth;

    $navItems.each(function() {
        navItemWidth += $(this).width();
    });

    navItemWidth > navWidth ? $navItemMore.show() : $navItemMore.hide();

    while (navItemWidth > navWidth) {
        navItemWidth -= $navItems.last().width();
        $navItems.last().prependTo('#navSub');
        $navItems.splice(-1, 1);
    }

    navItemMoreLeft = $('#nav .more').offset().left;
    navOverflowWidth = $('#navSub').width();
    offset = navItemMoreLeft + navItemMoreWidth - navOverflowWidth;

    $('#navSub').css({
        'left': offset
    });
}</code></pre>
        </div>
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
