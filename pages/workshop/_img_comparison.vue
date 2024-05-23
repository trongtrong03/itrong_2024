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
        <TempArticle :propValue="6" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="PEQgPQ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/PEQgPQ">
            jq-plugin: image-comparison-slider</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
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
            <pre><code class="language-html">&lt;div class="image-comparison-wrap"&gt;
    &lt;img src="影像1"&gt;  
    &lt;div class="resize"&gt;
        &lt;img src="影像2"&gt;
    &lt;/div&gt;
    &lt;span class="handle"&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.resize {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
}

.handle {
    position: absolute; 
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    margin-left: -2px;
    cursor: ew-resize;
}

.handle::after {
    content:'\21d4';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition:all 0.3s ease;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// Call & init
$(function () {
        $('.image-comparison-wrap').each(function(){
        var cur = $(this);
        var width = cur.width()+'px';
        cur.find('.resize img').css('width', width);
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });
});

$(window).resize(function(){
    $('.image-comparison-wrap').each(function(){
        var cur = $(this);
        var width = cur.width()+'px';
        cur.find('.resize img').css('width', width);
    });
});

function drags(dragElement, resizeElement, container) {
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();

        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidt

        dragElement.parents().on("mousemove touchmove", function(e) {
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

            leftValue = moveX + posX - dragWidth;

            if ( leftValue &lt; minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);
        }).on('mouseup touchend touchcancel', function(){
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e){
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}</code></pre>
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
    &lt;div class="comparison-wrap" ref="comparisonWrap"&gt;
        &lt;div class="comparison-bg" @mousemove="dragScraper($event.clientX)" @touchmove="dragScraper($event.touches[0].clientX)"&gt;
            &lt;img class="comparison-back" src="https://via.placeholder.com/600x300/000"&gt;
            &lt;div class="comparison-front" ref="comparisonFront"&gt;
                &lt;img src="https://via.placeholder.com/600x300/900" ref="comparisonAfter"&gt;
            &lt;/div&gt;
            &lt;div class="comparison-ctrl" ref="comparisonCtrl"&gt;
                &lt;i class="fas fa-arrows-alt-h"&gt;&lt;/i&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">#app {
    overflow: hidden;
}

.comparison-wrap {
    max-width: 640px;
    margin: 0 auto;
}

.comparison-bg {
    position: relative;
    cursor: w-resize;
}

.comparison-bg img {
    display: block;
    max-width: 100%;
    width: 100%;
}

.comparison-front {
    overflow: hidden;
    transform: translate(-50%, 0);
}

.comparison-front img {
    overflow: hidden;
    transform: translate(50%, 0);
}

.comparison-back {
    position: absolute;
    top: 0;
    left: 0;
}

.comparison-ctrl {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    margin-left: calc(-1rem - 4px);
    background-size: contain;
    transform: translate(49%, 0);
}

.comparison-ctrl::before {
    content: '';
    position: absolute;
    top: 0;
    left: 14px;
    width: 4px;
    height: 100%;
    background-color: #333;
}

.comparison-ctrl i {
    position: absolute;
    top: calc(50% - 1rem);
    left: 2px;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1rem;
    color: #fff;
    background-color: #000;
    border-radius: 100%;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            innerWidth: window.innerWidth
        }
    },
    created() {
        window.addEventListener('resize', this.setInnerWidth)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setInnerWidth)
    },
    computed: {
        minX() {
            return (this.innerWidth - this.$refs.comparisonWrap.clientWidth) / 2
        },
        maxX() {
            return this.$refs.comparisonWrap.clientWidth + this.minX
        }
    },
    methods: {
        setInnerWidth() {
            this.innerWidth = window.innerWidth
        },
        dragScraper(clientX) {
            let px
            let pxRevert

            if (clientX &lt; this.minX) {
                px = 0
            } else if (clientX > this.maxX) {
                px = this.$refs.comparisonWrap.clientWidth
            } else {
                px = clientX - this.minX
            }
            pxRevert = this.$refs.comparisonWrap.clientWidth - px + 'px'
            px = px + 5 + 'px'

            this.$refs.comparisonFront.style.transform = 'translate(-' + pxRevert + ', 0)'
            this.$refs.comparisonCtrl.style.transform = 'translate(' + px + ', 0)'
            this.$refs.comparisonAfter.style.transform = 'translate(' + pxRevert + ', 0)'
        }
    }
}

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="JQverQ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/JQverQ">
            vue-ex: image-comparison</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
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
