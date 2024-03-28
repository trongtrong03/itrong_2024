<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="7" fileType="workshop" />
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
        <p>暫無內容。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、jQuery 版本</h2>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="GebNBX" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/GebNBX">
            jq-mixitup</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>官方套件：<a href="https://www.kunkalabs.com/mixitup/" target="_blank">MixItUp</a></p>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdn.jsdelivr.net/jquery.mixitup/latest/jquery.mixitup.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div class="filter-wrap"&gt;
    &lt;div class="filter-menu"&gt;
    &lt;input type="text" class="filter-input" placeholder="請輸入關鍵字"&gt;
        &lt;button class="filter" data-filter="all"&gt;All&lt;/button&gt;
        &lt;button class="filter" data-filter=".dataA"&gt;A&lt;/button&gt;
        &lt;button class="filter" data-filter=".dataB"&gt;B&lt;/button&gt;
        ...
    &lt;/div&gt;
    &lt;div class="filter-list"&gt;
        &lt;div class="filter-item mix dataA"&gt;
            &lt;h2 class="title"&gt;A1&lt;/h2&gt;
        &lt;/div&gt;
        &lt;div class="filter-item mix dataA"&gt;
            &lt;h2 class="title"&gt;A2&lt;/h2&gt;
        &lt;/div&gt;
        &lt;div class="filter-item mix dataC"&gt;
            &lt;h2 class="title"&gt;C1&lt;/h2&gt;
        &lt;/div&gt;
        &lt;div class="filter-item mix dataA"&gt;
            &lt;h2 class="title"&gt;A3&lt;/h2&gt;
        &lt;/div&gt;
        ...
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.filter-item {
    display: none;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function(){
    $(".filter-wrap").mixItUp();
    var inputText;
    var $matching = $();

    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $(".filter-input").keyup(function(){
        delay(function(){
            inputText = $(".filter-input").val().toLowerCase();
            if ((inputText.length) > 0) {            
                $( '.mix').each(function() {
                    $this = $("this");
                    if($(this).children('.title').text().toLowerCase().match(inputText)) {
                        $matching = $matching.add(this);
                    }
                    else {
                        $matching = $matching.not(this);
                    }
                });
                    $(".filter-wrap").mixItUp('filter', $matching);
            }
            else {
                $(".filter-wrap").mixItUp('filter', 'all');
            }
        }, 200);
    });
});</code></pre>
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、Vue 版本</h2>
        <p>引用外部檔案（非 CDN 建議下載至本機端專案資料夾內）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.37/vue.global.prod.min.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;div id="app"&gt;
    &lt;div class="btn"&gt;
        &lt;button :class="{ checked : letter == activeLetter }" @click="btnFilter(letter)" v-for="letter in buttons" v-text="letter"&gt;&lt;/button&gt;
    &lt;/div&gt;
    &lt;div class="item"&gt;
        &lt;div v-for="item in listFilter" v-text="item.type"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            items: lists,
            activeLetter: false,
            activeColor: false,
        }
    },
    methods: {
        btnFilter(letter) {
            let nextLetter;
            if (this.activeLetter == letter) {
                nextLetter = false;
            } else {
                nextLetter = letter;
            }
            this.$nextTick(() => {
                this.activeLetter = nextLetter;
            });
        },
    },
    computed: {
        buttons() {
            return this.items.map(item => {
                return item.type
            }).filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
        listFilter() {
            let listFilter = this.items;
            if (this.activeLetter) {
                listFilter = listFilter.filter(item => {
                    return item.type == this.activeLetter;
                })
            }
            if (this.activeColor) {
                listFilter = listFilter.filter(item => {
                    return item.bg == this.activeColor;
                })
            }
            return listFilter;
        }
    },
}

const lists = [
    { type: 'A' },
    { type: 'A' },
    { type: 'B' },
    { type: 'C' },
    { type: 'B' },
    { type: 'B' },
    { type: 'A' },
    { type: 'C' },
    { type: 'C' },
    { type: 'A' },
    { type: 'A' },
]

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="YbvXBE" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/YbvXBE">
            Vue-ex: filter</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
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