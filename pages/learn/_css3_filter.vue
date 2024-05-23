<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、濾鏡規則與效果一覽' },
        { id: 2, title: '二、濾鏡效果展示' },
        { id: 3, title: '三、多重定義' },
        { id: 4, title: '四、相容性支援' },
        { id: 5, title: '五、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="24" fileType="learnList" />
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
        <p>「我的圖片要在滑鼠移到上方的時候從灰階轉變成原色」──相信很多網頁前端開發者都有承接過類似的視覺表現需求。早期較直覺的處理方式，不外乎是透過繪圖軟體將原圖另外儲存灰階的圖片，利用 CSS <em>hover</em> 或 HTML <em>onmouseover</em>、<em>onmouseout</em> 觸發，又或者是使用 jQuery <em>hover</em> 事件達到圖片置換的效果。這些方法當然不會說它們不好，只不過在 CSS3 蓬勃發展的現在，網頁對影像處理上也有顯著提升，其中，<em>filter</em> 便是用來為圖片添加濾鏡的屬性，讓我們得以不需要再透過額外出圖的方式，就能實現圖片濾鏡變換的效果。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>以下是 CSS3 <em>filter</em> 屬性基本的語法規則：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">selector {
    filter: filter-function(value);
}</code></pre>
        </div>
        <p><em>filter-function</em> 表示濾鏡效果的名稱，並在括號類填入要套用的 <em>value</em> 值。</p>
        <p><em>filter-function</em> 目前有以下這些參數值：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1 is-sticky">title</div>
                    <div class="f-f1">title</div>
                    <div class="f-f3">title</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>grayscale</em></div>
                    <div class="f-f1">灰階</div>
                    <div class="f-f3">0 ~ 1（或 0% ~ 100%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>sepia</em></div>
                    <div class="f-f1">褐色</div>
                    <div class="f-f3">0 ~ 1（或 0% ~ 100%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>saturate</em></div>
                    <div class="f-f1">飽和度</div>
                    <div class="f-f3">0 ~ N（或 0% ~ N%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>hue-rotate</em></div>
                    <div class="f-f1">色相旋轉</div>
                    <div class="f-f3">0deg ~ 360deg</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>invert</em></div>
                    <div class="f-f1">負片</div>
                    <div class="f-f3">0 ~ 1（或 0% ~ 100%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>opacity</em></div>
                    <div class="f-f1">透明度</div>
                    <div class="f-f3">0 ~ 1（或 0% ~ 100%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>brightness</em></div>
                    <div class="f-f1">亮度</div>
                    <div class="f-f3">0 ~ N（或 0% ~ N%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>contrast</em></div>
                    <div class="f-f1">對比度</div>
                    <div class="f-f3">0 ~ N（或 0% ~ N%）</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>blur</em></div>
                    <div class="f-f1">高斯模糊</div>
                    <div class="f-f3">用單位表示，如 <em>px</em>、<em>em</em>...</div>
                </div>
                <div class="f-row">
                    <div class="f-f1 is-sticky"><em>drop-shadow</em></div>
                    <div class="f-f1">下拉陰影</div>
                    <div class="f-f3">(x y blur color)</div>
                </div>
            </div>
        </div>
        <p>儘管標題和前言都在強調這個屬性可以為圖片帶來濾鏡變化的效果，但實際上它影響範圍涵蓋指定元素本身及其內部所有子元素內容，絕不單單侷限於 <em>img</em> 而已。此外，嚴格說起來，瀏覽器渲染 <em>filter</em> 的方式其實也是透過矩陣運算，如果你有看過或學過 <em>transform</em> 的 <em>matrix</em> 的矩陣運算方法，就知道要用矩陣去定義想要的效果可以到非常非常非常麻煩的程度，大多數人也包含自己在內，應該都沒那個心思想去深入理解瀏覽器如何將矩陣參數轉換給圖片的過程，所以上面這些效果參數是 <em>filter</em> 已經定義好並有既定命名的十種特效。</p>
        <blockquote class="is-warning">
            <p>為了避免誤導，以下章節開始不再稱「圖片」套用濾鏡，而以「元素」取代之。</p>
        </blockquote>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>這個章節要來展示 <em>filter</em> 內建的十大效果呈現出來的結果會是什麼樣子的：</p>
        <p><br></p>
        <h3>grayscale：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: grayscale(1);
}</code></pre>
        </div>
        <p><em>grayscale</em> 可使元素變成灰階，它的範圍從 <em>0</em> 到 <em>1</em>（也可以用百分比表示），數值越小代表越接近原色，反之則越灰階化。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: grayscale(1);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>sepia：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: sepia(1);
}</code></pre>
        </div>
        <p><em>sepia</em> 可使元素變成褐色（復古風），它的範圍從 <em>0</em> 到 <em>1</em>（也可以用百分比表示），數值越小代表越接近原色，反之則越褐色化。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: sepia(1);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>saturate：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: saturate(3);
}</code></pre>
        </div>
        <p><em>saturate</em> 可調整元素的飽和度，其參數值以 <em>1</em>（或 <em>100%</em>）作為分野，<em>1</em> 代表維持原狀，越靠近 <em>0</em> 則飽和度越低，數字越大則色彩越飽滿。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: saturate(3);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>hue-rotate：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: hue-rotate(180deg);
}</code></pre>
        </div>
        <p><em>hue-rotate</em> 可令元素進行色相旋轉，使元素產生異色的變化。它的參數值是 <em>0</em> 到 <em>360</em> ，單位為 <em>deg</em> 的旋轉角度，<em>0</em> 與 <em>360</em> 皆為原狀。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: hue-rotate(180deg);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>invert：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: invert(1);
}</code></pre>
        </div>
        <p><em>invert</em> 可讓元素產生負片效果，它的範圍從 <em>0</em> 到 <em>1</em>（也可以用百分比表示），數值越小代表越接近原色，反之則越負片化。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: invert(1);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>opacity：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: opacity(0.5);
}</code></pre>
        </div>
        <p><em>opacity</em> 這個參數和 CSS3 獨立屬性 <em>opacity</em> 產生的效果是一樣的，皆是用來設定元素的不透明度，範圍從 <em>0</em> 到 <em>1</em>（也可以用百分比表示），數值越接近 <em>0</em> 代表越透明，<em>1</em> 則是完全不透明。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: opacity(0.5);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>brightness：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: brightness(2);
}</code></pre>
        </div>
        <p><em>brightness</em> 可為元素調整亮度，以 <em>1</em> 為界（即 <em>100%</em>），代表保持原本亮度，數值越靠近 <em>0</em> 越暗，數值越大則越亮。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: brightness(2);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>contrast：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: contrast(0.6);
}</code></pre>
        </div>
        <p><em>contrast</em> 用來調整元素的對比度，<em>1</em>（<em>100%</em>）是為原狀，數字越大對比度越高。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: contrast(0.6);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>blur：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: blur(5px);
}</code></pre>
        </div>
        <p><em>blur</em> 可設定元素的高斯模糊程度，<em>0</em> 代表不進行任何模糊。和其他多數濾鏡效果不同，它需要指定明確的數值單位，數值越大則模糊強度越高。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: blur(5px);"></span>
            </div>
        </div>
        <p><br></p>
        <h3>drop-shadow：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: drop-shadow(x y blur color);
}</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: drop-shadow(4px 4px 8px #000);
}</code></pre>
        </div>
        <p><em>drop-shadow</em> 可以為元素添加「真實描邊」的陰影，何謂真實描邊？假如影像是透明背景格式（如 PNG）的圖片，則 <em>drop-shadow</em> 會沿著有色彩的像素格邊緣添加陰影。它常常會拿來與 <em>box-shadow</em> 做比較，只不過後者是針對元素的輪廓給予陰影，無法像 <em>drop-shadow</em> 可以賦予形狀多變的透明背景影像貼合的陰影。</p>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: drop-shadow(4px 4px 8px #000);"></span>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>如同 <em>transform</em> 屬性，同一個元素亦可以套用多個 <em>filter</em> 效果，只需要各濾鏡參數之間用「空格」間隔開來即可。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: saturate(120%) brightness(150%) blur(10px);
}</code></pre>
        </div>
        <p>效果展示：</p>
        <div class="ex-filter">
            <div>
                <span></span>
            </div>
            <div>
                <span style="filter: saturate(120%) brightness(150%) blur(10px);"></span>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <p>截至 2020 年，幾乎各大主流瀏覽器都已經能省略各自的兼容前綴，成功判讀 CSS3 的屬性標準定義。唯獨 IE──是的，令諸多開發者頭疼的萬惡 IE 瀏覽器，儘管隨 Windows 10 OS 推出的 IE Edge 已經改善不少，但包含末代版本 11 在內的 舊 IE，一律不支援標準的 <em>filter</em> 語法格式，從 <a href="https://caniuse.com/#feat=css-filters" target="_blank">Can I use</a> 網站中就能清楚看出：</p>
        <figure>
            <img src="/images/learn/css/filter-1.jpg">
            <figcaption>主流瀏覽器的 filter 兼容一覽表</figcaption>
        </figure>
        <p>假如想使用 <em>filter</em> 屬性卻又必須顧及 IE11 以下版本兼容性問題的話，則可以試著在 <em>filter</em> 後方添加支援方案：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    filter: grayscale(1);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}</code></pre>
        </div>
        <p>然而，也有一派專家認為這條 IE 替代語法可能沒有效果，並提出透過 SVG 或 Canvas 圖形繪製的方式才是最佳的兼容方案。至於如何利用 SVG、Canvas 實現濾鏡的效果，由於這已經超過 CSS3 的範疇，因此就先不在這篇文章進行記述，待日後有開這兩者的學習筆記再行補述。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <dl>
            <dd><a href="http://blog.shihshih.com/css-filter/" target="_blank">簡單究好--CSS濾鏡效果</a></dd>
            <dd><a href="https://zhuanlan.zhihu.com/p/125137964" target="_blank">知乎--CSS filter与前端滤镜</a></dd>
            <dd><a href="https://www.cnblogs.com/fsjohnhuang/p/4127888.html" target="_blank">CSS3魔法堂：CSS3滤镜及Canvas、SVG和IE滤镜替代方案详解</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>