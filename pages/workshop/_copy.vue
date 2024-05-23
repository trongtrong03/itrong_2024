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
        <TempArticle :propValue="9" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="js,result" data-slug-hash="abPpQrV" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/abPpQrV">
            JS: copy text</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="content"&gt;
    &lt;div class="text"&gt;
        &lt;p&gt;文字內容&lt;/p&gt;
    &lt;/div&gt;
    &lt;button class="copy-btn" data-text="COPY" data-text-copied="COPIED"&gt;
        &lt;span&gt;COPY&lt;/span&gt;
    &lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">(function() {
    function copiq(selector, options) {
        const defaults = {
            parent: "body",
            content: "",
            onSuccess: function() {},
            onError: function() {},
        };

        const settings = Object.assign({}, defaults, options);
        const elements = document.querySelectorAll(selector);

        elements.forEach(function(element) {
            element.addEventListener("click", function() {
                const parent = document.querySelector(settings.parent);
                const content = parent.querySelector(settings.content);
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(content);
                selection.removeAllRanges();
                selection.addRange(range);

                try {
                    const successful = document.execCommand("copy");
                    const callback = successful ? settings.onSuccess : settings.onError;
                    callback(element, content, selection.toString());
                } catch (error) {}

                selection.removeAllRanges();
            });
        });
    }

    window.copiq = copiq;
})();

document.addEventListener("DOMContentLoaded", function() {
    copiq('.copy-btn', {
        parent: '.content',
        content: '.text',
        onSuccess: function(element, source, selection) {
            const span = element.querySelector('span');
            span.textContent = element.getAttribute("data-text-copied");
            setTimeout(function() {
                span.textContent = element.getAttribute("data-text");
            }, 2000);
        },
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
            <pre><code class="language-javascript">(function(n) {
    n.fn.copiq = function(e) {
        var t = n.extend({
            parent: "body",
            content: "",
            onSuccess: function() {},
            onError: function() {}
        }, e);
        return this.each(function() {
            var e = n(this);
            e.on("click", function() {
                var n = e.parents(t.parent).find(t.content);
                var o = document.createRange();
                var c = window.getSelection();
                o.selectNodeContents(n[0]);
                c.removeAllRanges();
                c.addRange(o);
                try {
                    var r = document.execCommand("copy");
                    var a = r ? "onSuccess" : "onError";
                    t[a](e, n, c.toString())
                } catch (i) {}
                c.removeAllRanges()
            })
        })
    }
})(jQuery);

$('.copy-btn').copiq({
        parent: '.content',
        content: '.text',
        onSuccess: function($element, source, selection) {
        $('span', $element).text($element.attr("data-text-copied"));
        setTimeout(function() {
            $('span', $element).text($element.attr("data-text"));
        }, 2000);
    }
});</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="vwXzLx" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/vwXzLx">
            jq-plugin: copy text</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
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
