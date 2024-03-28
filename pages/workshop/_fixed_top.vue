<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="22" fileType="workshop" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act1">一、JavaScript 版本</a></li>
            <li><a href="#act2">二、jQuery 版本</a></li>
            <li><a href="#act3">三、Vue 版本</a></li>
            <li><a href="#act4">四、CSS 版本</a></li>
        </ul>
    </div>
    <div class="text-block" id="act1">
        <h2>一、JavaScript 版本</h2>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="OJrWKbJ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/OJrWKbJ">
            JS effects: fixed-scroll</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;section&gt;
    &lt;div class="block"&gt;scroll down...&lt;/div&gt;
&lt;/section&gt;
&lt;div class="fixed"&gt;fix box&lt;/div&gt;</code></pre>
        </div>
        <p>這裡 HTML 的程式碼片段僅為示範用，不需要按照這個格式寫，主要是要將置頂觸發的元素添加名稱為 <em>.fixed</em> 的 class，以用來讓 JavaScript 能獲取到指定對象。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">document.addEventListener("DOMContentLoaded", function() {
    var block = document.querySelector(".block");
    var fixed = document.querySelector(".fixed");

    function updateFixedPosition() {
        var t = block.offsetHeight;
        fixed.style.top = Math.max(0, 240 - window.scrollY) + "px";
    }

    // 初始設定
    updateFixedPosition();

    // 網頁滾動時更新 .fixed 的位置
    window.addEventListener("scroll", updateFixedPosition);
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、jQuery 版本</h2>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function() {
    var t = $(".block").outerHeight();
    $(".fixed").css("top", t);

    $(window).scroll(function(){
        $(".fixed").css("top", Math.max(0, 240-$(this).scrollTop()));
    });
});</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="QgoGdx" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/QgoGdx">
            JQ-fixed-scroll</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vue 版本</h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、CSS 版本</h2>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;section&gt;
    &lt;div class="block"&gt;scroll down...&lt;/div&gt;
    &lt;div class="fixed"&gt;fix box&lt;/div&gt;
&lt;/section&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.fixed {
    position: sticky;
    top: 0;
}</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="WNLRVRw" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/WNLRVRw">
            CSS effects: fixed-scroll</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
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