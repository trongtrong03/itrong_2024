<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="1" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="ZEVLqOm" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/ZEVLqOm">
            JS-Accordion</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;ul&gt;
    &lt;li&gt;
        &lt;div class="title"&gt;Title A&lt;/div&gt;
        &lt;div class="content"&gt;
            &lt;div&gt;content&lt;/div&gt;
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;div class="title"&gt;Title B&lt;/div&gt;
        &lt;div class="content"&gt;
            &lt;div&gt;content&lt;/div&gt;
        &lt;/div&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.content {
    display: none;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">document.addEventListener("DOMContentLoaded", function() {
    var titles = document.querySelectorAll(".title");
    
    titles.forEach(function(title) {
        title.addEventListener("click", function(e) {
            var parent = this.parentElement;
            var content = parent.querySelector(".content");

            if (content) {
                e.preventDefault();
            }

            if (!this.classList.contains("is-active")) {
                var allContents = document.querySelectorAll(".content");
                var allTitles = document.querySelectorAll(".title");

                allContents.forEach(function(item) {
                    item.style.display = "none";
                });

                allTitles.forEach(function(item) {
                    item.classList.remove("is-active");
                });

                content.style.display = "block";
                this.classList.add("is-active");
            } else if (this.classList.contains("is-active")) {
                this.classList.remove("is-active");
                content.style.display = "none";
            }
        });
    });
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、jQuery 版本</h2>
        <p><br></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function(){
    $(".title").on("click", function(e){
        if($(this).parent().has(".content")) {
            e.preventDefault();
        }
        if(!$(this).hasClass("is-active")) {
            $(".content").slideUp();
            $(".title").removeClass("is-active");
            $(this).next(".content").slideDown();
            $(this).addClass("is-active");
        }
        else if($(this).hasClass("is-active")) {
            $(this).removeClass("is-active");
            $(this).next(".content").slideUp();
        }
    });
});</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="weOBOe" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/weOBOe">
            JQ-收合選單</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>假如要令第一個或指定項目在網頁載入時為展開狀態，僅需調整 HTML 程式碼即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;ul&gt;
    &lt;li&gt;
        &lt;div class="title is-active"&gt;Title A&lt;/div&gt;
        &lt;div class="content" style="display: block;"&gt;
            &lt;div&gt;content&lt;/div&gt;
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;div class="title"&gt;Title B&lt;/div&gt;
        &lt;div class="content"&gt;
            &lt;div&gt;content&lt;/div&gt;
        &lt;/div&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vue 版本</h2>
        <p>暫無內容。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、CSS 版本</h2>
        <p>暫無內容。</p>
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