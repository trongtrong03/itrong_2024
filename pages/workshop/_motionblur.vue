<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、如何使用？' },
        { id: 2, title: '二、動畫測試' },
        { id: 3, title: '三、如何重複使用？' },
    ]);

    // avtive
    const isActive = ref(0);

    // load js
    useHead({
        script: [
            { src: "/js/motionblur_blur.js", body: true }
        ],
    });
</script>

<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="24" fileType="workshop" />
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
        <p><a href="https://www.motionblurjs.com/" target="_blank">MotionBlurJS</a> 是一款輕量化的 JavaScript 函式庫，它可以令我們透過 CSS 寫的動畫（animation）效果更加自然、平滑，且導入方法簡單，調用參數也不多，十分容易上手。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>僅需下載 MotionBlurJS 提供的 <a href="https://www.motionblurjs.com/blurSVG.js" target="_blank">JS</a> 文件並置入專案資料夾內，然後在網頁文件中引用它即可：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;script src="https://www.motionblurjs.com/blurSVG.js"&gt;&lt;/script&gt;</code></pre>
        </div>
        <p><br></p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-1"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-1 blurjs"></b>
                    <b class="ball-1 blurjs"></b>
                    <b class="ball-1 blurjs"></b>
                    <b class="ball-1 blurjs"></b>
                </div>
                <h3 class="ex-title">MotionBlurJS</h3>
            </div>
        </div>
        <p>（如果效果沒有執行，請重新整理網頁）</p>
        <p><br></p>
        <p>以上方原生動畫為例，其 HTML 結構為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;b class="ball-1"&gt;&lt;/b&gt;</code></pre>
        </div>
        <p>如果要加入 MotionBlurJS 效果，只需要在 <em>class</em> 裡添加 <em>blurjs</em> 即可，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;b class="ball-1 blurjs"&gt;&lt;/b&gt;</code></pre>
        </div>
        <p><br></p>
        <p>除了 <em>blurjs</em> 參數，還有另一個參數為 <em>fadejs</em>，以下為它們的比較：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-1 blurjs2"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-1 fadejs"></b>
                    <b class="ball-1 fadejs"></b>
                    <b class="ball-1 fadejs"></b>
                    <b class="ball-1 fadejs"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;!-- blurjs --&gt;
&lt;b class="className blurjs"&gt;&lt;/b&gt;

&lt;!-- fadejs --&gt;
&lt;b class="className fadejs"&gt;&lt;/b&gt;</code></pre>
        </div>
        <p><br></p>
        <p>如果有需要為元素調整透明度，可以通過 <em>fadejs-data</em> 屬性來設置：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;b class="className blurjs" fadejs-data="opacity: 0.6;"&gt;&lt;/b&gt;</code></pre>
        </div>
        <p>但經過測試，<em>fadejs-data</em> 參數的作用與 CSS 的 <em>opacity</em> 相差無幾，若無必要，要調整元素的透明度建議仍直接從 CSS 下手。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>1. 移動（<em>transform: translate</em>）：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-2"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-2 blurjs3"></b>
                    <b class="ball-2 blurjs3"></b>
                    <b class="ball-2 blurjs3"></b>
                    <b class="ball-2 blurjs3"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-2 fadejs2"></b>
                    <b class="ball-2 fadejs2"></b>
                    <b class="ball-2 fadejs2"></b>
                    <b class="ball-2 fadejs2"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <p><br></p>
        <p>2. 縮放（<em>transform: scale</em>）：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-3"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-3 blurjs4"></b>
                    <b class="ball-3 blurjs4"></b>
                    <b class="ball-3 blurjs4"></b>
                    <b class="ball-3 blurjs4"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-3 fadejs3"></b>
                    <b class="ball-3 fadejs3"></b>
                    <b class="ball-3 fadejs3"></b>
                    <b class="ball-3 fadejs3"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <p><br></p>
        <p>3. 旋轉（<em>transform: rotate</em>）：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-4"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-4 blurjs5"></b>
                    <b class="ball-4 blurjs5"></b>
                    <b class="ball-4 blurjs5"></b>
                    <b class="ball-4 blurjs5"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-4 fadejs4"></b>
                    <b class="ball-4 fadejs4"></b>
                    <b class="ball-4 fadejs4"></b>
                    <b class="ball-4 fadejs4"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <p><br></p>
        <p>4. 垂直旋轉（<em>transform: rotateY</em>）：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-5"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-5 blurjs6"></b>
                    <b class="ball-5 blurjs6"></b>
                    <b class="ball-5 blurjs6"></b>
                    <b class="ball-5 blurjs6"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-5 fadejs5"></b>
                    <b class="ball-5 fadejs5"></b>
                    <b class="ball-5 fadejs5"></b>
                    <b class="ball-5 fadejs5"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <p><br></p>
        <p>5. 傾斜（<em>transform: skew</em>）：</p>
        <div class="ex-wrap">
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-6"></b>
                </div>
                <h3 class="ex-title">原生</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-6 blurjs7"></b>
                    <b class="ball-6 blurjs7"></b>
                    <b class="ball-6 blurjs7"></b>
                    <b class="ball-6 blurjs7"></b>
                </div>
                <h3 class="ex-title">blurjs</h3>
            </div>
            <div class="ex-item">
                <div class="ex-stage">
                    <b class="ball-6 fadejs6"></b>
                    <b class="ball-6 fadejs6"></b>
                    <b class="ball-6 fadejs6"></b>
                    <b class="ball-6 fadejs6"></b>
                </div>
                <h3 class="ex-title">fadejs</h3>
            </div>
        </div>
        <p><br></p>
        <p>可以看出，MotionBlurJS 對於縮放（<em>scale</em>）與傾斜（<em>skew</em>）的表現並不明顯，若搭配位移則可能會有較明顯的效果展現。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>預設狀態下，無論是 <em>blurjs</em> 還是 <em>fadejs</em> 都僅能在單一網頁上作用於單一元素，若重複使用，則第二個之後的元素皆無法作用。倘若該網頁有複數個元素需要相同的 MotionBlurJS 效果，我們可以直接從官方文件中進行修改。</p>
        <p>首先在 JS 文件中找到這一段：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var x = document.getElementsByClassName("blurjs");
var i;
for (i = 0; i &lt; x.length; i++) {
    if(window.runScriptA !== 1){
        var y = x[i].parentNode.children;
        var r;
        for (r = 0; r &lt; y.length; r++) {
            if(y[r].className.search("blurjs") >= 0){
                var justTemp_1 = y[r].outerHTML.replace(/class=/, "style='animation-delay:0ms;' class=");
                var justTemp_2 = y[r].outerHTML.replace(/class=/, "style='animation-delay:20ms;' class=");
                var justTemp_3 = y[r].outerHTML.replace(/class=/, "style='animation-delay:40ms;' class=");
                var justTemp_4 = y[r].outerHTML.replace(/class=/, "style='animation-delay:60ms;' class=");
                y[r].outerHTML = justTemp_4+justTemp_3+justTemp_2+justTemp_1;
                r += 3;
            }
        }
        window.runScriptA = 1;
    }    
}</code></pre>
        </div>
        <p>整段選取並複製，如果要調整的是 <em>fadejs</em> 則複製它那一段原始碼就好，複製後在下方貼上，並修改 <em>blurjs</em> 與 <em>runScriptA</em> 的名稱（各有兩處要修改）。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var x = document.getElementsByClassName("blurjs2");   // 修改
var i;
for (i = 0; i &lt; x.length; i++) {
    if(window.runScriptB2 !== 1){   // 修改
        var y = x[i].parentNode.children;
        var r;
        for (r = 0; r &lt; y.length; r++) {
            if(y[r].className.search("blurjs2") >= 0){  // 修改
                var justTemp_1 = y[r].outerHTML.replace(/class=/, "style='animation-delay:0ms;' class=");
                var justTemp_2 = y[r].outerHTML.replace(/class=/, "style='animation-delay:20ms;' class=");
                var justTemp_3 = y[r].outerHTML.replace(/class=/, "style='animation-delay:40ms;' class=");
                var justTemp_4 = y[r].outerHTML.replace(/class=/, "style='animation-delay:60ms;' class=");
                y[r].outerHTML = justTemp_4+justTemp_3+justTemp_2+justTemp_1;
                r += 3;
            }
        }
        window.runScriptB2 = 1; // 修改
    }    
}</code></pre>
        </div>
        <p>之後第二個元素就可以套用 <em>blurjs2</em> 效果了，如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-html">&lt;b class="className blurjs2"&gt;&lt;/b&gt;</code></pre>
        </div>
        <p>假如有第三、第四...等 N 個元素需要套用，則重複上方操作即可。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>

<style>
    .ex-wrap {
        display: flex;
        border: 1px solid #CCC;
    }

    .ex-item {
        position: relative;
        flex: 1;
        border-right: 1px solid #CCC;
        padding: 2rem 2rem 1rem;
    }

    .ex-item:last-child {
        border-right: 0;
    }

    .ex-stage {
        position: relative;
        width: 100%;
        height: 300px;
    }

    .ex-title {
        text-align: center;
        margin-top: 1rem;
    }


    /* example */
    b[class*="ball-"] {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 3rem;
        height: 3rem;
        background-color: #40a8c4;
        border-radius: 100%;
        animation-duration: 2s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
    }

    b[class*="ball-"].is-origin {
        background-color: #40a8c4;
    }

    b[class*="ball-"].is-blur {
        background-color: #ff8c00;
    }

    b.ball-1 {
        animation-name: move1;
    }

    b.ball-2 {
        top: 0;
        left: calc(50% - 1.5rem);
        animation-name: move2;
    }

    b.ball-3 {
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        animation-name: move3;
    }

    b.ball-4 {
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        animation-name: move4;
        border-radius: 0;
    }

    b.ball-5 {
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        animation-name: move5;
        animation-duration: 1.5s;
        border-radius: 0;
    }

    b.ball-6 {
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
        animation-name: move6;
        border-radius: 0;
    }

    @keyframes move1 {
        0% {
            top: 0;
            left: 0;
        }
        25% {
            top: 0;
            left: calc(100% - 3rem);
        }
        50% {
            top: calc(100% - 3rem);
            left: calc(100% - 3rem);
        }
        75% {
            top: calc(100% - 3rem);
            left: 0%;
        }
        100% {
            top: 0;
            left: 0;
        }
    }

    @keyframes move2 {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(300%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes move3 {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(2);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes move4 {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @keyframes move5 {
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(360deg);
        }
        100% {
            transform: rotateY(0deg);
        }
    }

    @keyframes move6 {
        0% {
            transform: skew(0deg, 0deg);;
        }
        50% {
            transform: skew(30deg, 30deg);;
        }
        100% {
            transform: skew(0deg, 0deg);
        }
    }
</style>