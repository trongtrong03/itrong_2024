<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="23" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="wvRgEMa" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/wvRgEMa">
            JS- Table rows fixed</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;table id="tbDemo"&gt;
    &lt;tr&gt;
        &lt;th&gt;head1&lt;/th&gt;
        &lt;th&gt;head2&lt;/th&gt;
        &lt;th&gt;head3&lt;/th&gt;
    &lt;/tr&gt;
    &lt;tr class="this-row"&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;01&lt;/td&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;xxx&lt;/td&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;xxx&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="this-row"&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;02&lt;/td&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;xxx&lt;/td&gt;
        &lt;td row-chosen="this-row" row-scope="this-row"&gt;xxx&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr class="this-row"&gt;
        ...
    &lt;/tr&gt;
&lt;/table&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">:root {
    --stack-amt: 1;
}

th {
    position: sticky;
    top: 0;
}

.is-selected * {
    position: sticky;
    top: calc( (1rem + 1rem + 1em + 2px) * var(--stack-amt) );
}</code></pre>
        </div>
        <p><em>.is-selected *</em> 中的 <em>top</em> 計算公式為 <em>td</em> 欄位的高度，乘以變數 <em>--stack-amt</em> 的數字，<em>td</em> 欄位高度若不是固定值，就要推算自己設定的 <em>padding</em>、<em>line-height</em> 或字級大小......等等，就如同範例那樣。而 <em>--stack-amt</em> 數字會由 JavaScript 去判斷，依據點選行列的次數和順序去做累計。</p>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">let root = document.documentElement;

root.addEventListener("row-chosen", e => {
    root.style.setProperty('--stack-amt', e + 1);
});

var elems = document.querySelectorAll("[row-chosen]"),
    closestParent = function(child, match) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(match) || child.nodeName.toLowerCase() == match) {
            return child;
        } else {
            return closestParent(child.parentNode, match);
        }
    }

for (var i = 0; i &lt; elems.length; i++) {
    elems[i].addEventListener("click", function(e) {
        e.preventDefault();
        if (this.getAttribute("row-scope")) {
            var scopeElement = closestParent(this, this.getAttribute("row-scope"));
        }

        if (scopeElement) {
            var linkedElement = scopeElement.querySelectorAll("." + this.getAttribute("row-chosen"));
            linkedElement = Array.prototype.slice.call(linkedElement);
            if (scopeElement.classList.contains(this.getAttribute("row-chosen"))) {
                linkedElement.unshift(scopeElement);
            }
        } else {
            var linkedElement = document.querySelectorAll("." + this.getAttribute("row-chosen"));
        }

        for (var i = 0; i &lt; linkedElement.length; i++) {
            linkedElement[i].classList.toggle("is-selected");
        }

        var amtChosen = document.querySelectorAll('#tbDemo .is-selected').length;
        console.log(amtChosen);

        var chosenArray = document.getElementsByClassName('is-selected');

        for (var i = 0; i &lt;= amtChosen; i++) {
            if (chosenArray[i] != null) {
                chosenArray[i].setAttribute("style", "--stack-amt: " + (i + 1));
            }
        }

    });
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、jQuery 版本</h2>
        <p>暫無內容。</p>
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