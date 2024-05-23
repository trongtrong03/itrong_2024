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
        <TempArticle :propValue="14" fileType="workshop" />
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
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="oNJBJYQ" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/oNJBJYQ">
            JS effects: gotop</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <p>HTML：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;button class="btn-top"&gt;top&lt;/button&gt;</code></pre>
        </div>
        <p><br></p>
        <p>CSS（僅列出必要部份）：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.btn-top {
    display: none;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">document.addEventListener("DOMContentLoaded", function() {
    const btnTop = document.querySelector(".btn-top");

    function handleScroll() {
        if (window.scrollY > 240) {
            btnTop.style.display = "block";
        } else {
            btnTop.style.display = "none";
        }
    }

    function scrollToTop() {
        const scrollDuration = 500;
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        const scrollInterval = setInterval(function() {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    window.addEventListener("scroll", handleScroll);
    btnTop.addEventListener("click", scrollToTop);
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
            <pre><code class="language-javascript">$(function() {
    $(".btn-top").click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
    });
});</code></pre>
        </div>
        <p>如果要使按鈕在網頁捲動到一定距離後才顯現，可添加以下這段程式碼：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 240) {
            $(".btn-top").fadeIn();
        } else {
            $(".btn-top").fadeOut();
        }
    });
});</code></pre>
        </div>
        <p><em>240</em> 表示頁面向下捲動的距離（單位為像素），可自行更換為理想的數字。</p>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="MoxypL" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/MoxypL">
            JQ-gotop</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
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
    &lt;p&gt;scroll down&lt;/p&gt;
    &lt;button @click="goTop" ref="btn"&gt;TOP&lt;/button&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            isTop: true,
        }
    },
    mounted() {
        this.needScroll();
    },
    methods: {
        goTop() {
            let self = this
            self.timer = setInterval(function() {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                let ispeed = Math.floor(-osTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
                self.isTop = true
                if (osTop === 0) {
                    clearInterval(self.timer)
                }
            }, 30)
        }
    },
}

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>如果要使按鈕在畫面下滾到一定高度後才顯示，首先 CSS 部份要記得將按鈕 <em>display</em> 設定為 <em>none</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">.btn-top {
    display: none;
}</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            isTop: true,
        }
    },
    mounted() {
        this.needScroll();
    },
    methods: {
        needScroll() {
            let clientHeight = 200
            let obtn = this.$refs.btn
            window.onscroll = function() {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                if (osTop >= clientHeight) {
                    obtn.style.display = 'block'
                } else {
                    obtn.style.display = 'none'
                }
                if (!this.isTop) {
                    clearInterval(this.timer)
                }
                this.isTop = false
            }
        },
        goTop() {
            let self = this
            self.timer = setInterval(function() {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop
                let ispeed = Math.floor(-osTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
                self.isTop = true
                if (osTop === 0) {
                    clearInterval(self.timer)
                }
            }, 30)
        }
    },
}

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="pmGdYV" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/pmGdYV">
            vue-ex: gotop2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>CSS3 的 <em>scroll-behavior</em> 屬性同樣可以令網頁移動至指定區域時產生平滑移動的動畫視覺效果，而且完全不需要動用到 JavaScript 幫忙。語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">html {
    scroll-behavior: smooth;
}</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="js,result" data-slug-hash="YzdNdVM" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/YzdNdVM">
            CSS effects: gotop</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>但這個方法除了舊版本瀏覽器不相容，目前 Apple iOS 系統（包含 MAC、iPhone）同樣也不支援這個語法，故使用時恐怕得多留意相容性的問題。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>
