<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="41" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、屬性介紹</a></li>
            <li><a href="#act2">二、超級比一比</a></li>
            <li><a href="#act3">三、mix-blend-mode V.S. background-blend-mode</a></li>
            <li><a href="#act4">四、其它運用</a></li>
            <li><a href="#act5">五、總結與相容性</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>很多前端工程師在執行切版的時候，必須肩負設計稿出圖的作業。如果你是屬於這類需要自行出圖的開發者，相信對 Adobe Photoshop 應該不陌生，作為視覺設計最常被使用的電腦繪圖軟體之一，我們拿到的 Photoshop 設計稿時常遇到部分影像圖層使用到了圖層混合效果（或者說混色）的功能，例如下圖：</p>
        <figure>
            <img src="/images/learn/css/mix-blend-mode-1.jpg">
        </figure>
        <p>遇到這類型的混合效果，我們通常都是不做他想直接轉存成圖片了事，事實上，這樣的做法也沒什麼問題，畢竟本來這個畫面橫豎就是要透過影像來表達......惟比較困擾的狀況為：倘若同一張原圖在不同互動行為（例如點擊或滑鼠移入）分別使用了不同的混合效果，意味著上述常態作法得分別輸出多張圖片。先不說工程師得先搞懂 Photoshop 各個圖層效果前後關係的時間消耗，網頁載入過程也得花時間讀取這些「底圖相同只是混合效果不同」所輸出的個別圖片，假如單張圖片檔案很大，勢必讀取等待時間也愈長，這在講求要讓使用者快速取得資訊並獲得良好操作體驗的現代，似乎不是很好的現象。</p>
        <p>其實早在多年前，CSS3 就有釋出可以將影像（正確來說可能是元素）添加混色效果改變其色彩模式的屬性，只是初期有提供支援的瀏覽器鮮少，開發者大多都僅止於知道但實務上仍趨保守的階段。如今各家瀏覽器發展迅速，也紛紛對相關屬性提供了支援，我們逐漸能在一些網站上看到他們對原形圖片所在的元素施加 CSS3 屬性，達到近似於 Photoshop 圖層混合的效果。以下我們就來看看實際要如何應用吧！</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、屬性介紹</h2>
        <p>Blend Mode，中文直翻叫做「混合模式」，是 CSS3 主要用來針對元素裡的內容改變其色彩呈現的屬性，它近似 Photoshop 的圖層混合特效，可以透過不同選項，讓圖片與圖片、圖片與圖層之間產生各種獨特、有趣的色差效果。CSS 混合模式屬性主要有兩個，分別是 <em>mix-blend-mode</em> 與 <em>background-blend-mode</em>，嗅覺靈敏的你應該已經隱隱約約察覺到這兩者不同，不過實際應用差異仍暫且保留到後面再說。</p>
        <p>無論是 <em>mix-blend-mode</em> 還是 <em>background-blend-mode</em>，它們的屬性值皆相同，以下以表格展列之：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">屬性值</div>
                    <div class="f-f1">名稱</div>
                    <div class="f-f2">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>normal</em></div>
                    <div class="f-f1">正常</div>
                    <div class="f-f2">【預設值】，沒有套用混合效果。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>multiply</em></div>
                    <div class="f-f1">色彩增值</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>screen</em></div>
                    <div class="f-f1">濾色</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>overlay</em></div>
                    <div class="f-f1">覆蓋</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>darken</em></div>
                    <div class="f-f1">變暗</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>lighten</em></div>
                    <div class="f-f1">變亮</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color-dodge</em></div>
                    <div class="f-f1">加亮顏色</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color-burn</em></div>
                    <div class="f-f1">加深顏色</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>hard-light</em></div>
                    <div class="f-f1">實光</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>soft-light</em></div>
                    <div class="f-f1">柔光</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>difference</em></div>
                    <div class="f-f1">差異化</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>exclusion</em></div>
                    <div class="f-f1">排除</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>hue</em></div>
                    <div class="f-f1">色相</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>saturation</em></div>
                    <div class="f-f1">飽和度</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>color</em></div>
                    <div class="f-f1">顏色</div>
                    <div class="f-f2"></div>
                </div>
                <div class="f-row">
                    <div class="f-f1"><em>luminosity</em></div>
                    <div class="f-f1">明度</div>
                    <div class="f-f2"></div>
                </div>
            </div>
        </div>
        <p>屬性值中文名稱基本上是對照 Photoshop 的同名選項，當然光看文字也很難想像這些屬性值的差異在哪裡，我們可以先透過下方這張三原色交疊的示意圖稍微對這些參數值呈現的效果有些想像：</p>
        <figure>
            <img src="/images/learn/css/mix-blend-mode-2.jpg">
        </figure>
        <p>下個章節將直接透過實際範例的展示以及與 Photoshop 內套用的相同效果來做一個比較。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、超級比一比</h2>
        <p>接下來將以下方這張原圖，逐個套用 CSS <em>mix-blend-mode</em> 屬性，並與 Photoshop 相同的效果放在一起做對照，觀察看看由 CSS3 產生的效果與其是否相似。</p>
        <p>使用圖片與背景色：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">原圖</div>
                    <div class="f-f1">背景色</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <figure>
                            <img src="/images/example01.jpg">
                        </figure>
                    </div>
                    <div class="f-f1">
                        <div class="ex-mix-1"></div>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>multiply（色彩增值）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: multiply;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: multiply;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-3.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>screen（濾色）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: screen;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: screen;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-4.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>overlay（覆蓋）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: overlay;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: overlay;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-5.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>darken（變暗）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: darken;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: darken;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-6.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>lighten（變亮）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: lighten;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: lighten;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-7.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>color-dodge（加亮顏色）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: color-dodge;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: color-dodge;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-8.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>color-burn（加深顏色）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: color-burn;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: color-burn;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-9.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>hard-light（實光）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: hard-light;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: hard-light;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-10.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>soft-light（柔光）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: soft-light;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: soft-light;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-11.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>difference（差異化）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: difference;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: difference;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-12.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>exclusion（排除）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: exclusion;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: exclusion;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-13.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>hue（色相）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: hue;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: hue;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-14.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>saturation（飽和度）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: saturation;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: saturation;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-15.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>color（顏色）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: color;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: color;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-16.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <h3>luminosity（明度）</h3>
        <p>語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-css">img {
    mix-blend-mode: luminosity;
}</code></pre>
        </div>
        <p>範例：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">CSS3</div>
                    <div class="f-f1">Photoshop</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">
                        <div class="ex-mix-2">
                            <img src="/images/example01.jpg" style="mix-blend-mode: luminosity;">
                        </div>
                    </div>
                    <div class="f-f1">
                        <figure>
                            <img src="/images/learn/css/mix-blend-mode-17.jpg">
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <p><br></p>
        <p>如何？是不是所有的屬性值都和對照的 Photoshop 相同效果幾乎沒有任何差別？由此可見，只用一張原圖，然後給予設計稿於不同情境下轉換濾鏡效果的混合值是可行的，就不需要大費周章各別輸出成圖片了。</p>
        <p>另外可能有些人會好奇，CSS 混合模式 <em>mix-blend-mode</em> 只能用在圖片影像上嗎？其實可以從前面一些論述的字詞中發現到，我提到 CSS3 混合模式套用的對象是 HTML 「元素」，也就是說在有背景的情況下，上層的元素都可以通過混合模式來改變它的成色。譬如：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-default-tab="css,result" data-slug-hash="GRQPvEW" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/GRQPvEW">
            CSS3: mix-blend-mode</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p>透過上方範例可以發現文字也能套用混和模式的效果，真是妙不可言。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、mix-blend-mode V.S. background-blend-mode</h2>
        <p>上一個章節是以 <em>mix-blend-mode</em> 這個屬性來介紹 CSS3 Blend Mode，接著來談談另一個混合屬性──<em>background-blend-mode</em>，儘管這兩個屬性吃的值一模一樣，實際運用場合則略有所不同。如同字面上意思與背景有關，<em>background-blend-mode</em> 主要用於同一元素內存在多張背景圖的時候，近似於塑造背景圖層疊合混色的概念。這個屬性只能用於背景，不像 <em>mix-blend-mode</em> 可以作用於整個元素的其他內容。</p>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="css,result" data-slug-hash="YzedrXx" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/YzedrXx">
            CSS3: background-blend-mode</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" id="act4">
        <h2>四、其它運用</h2>
        <p>我們已經看完 CSS Blend Mode 各項參數值之於影像圖層混合的變化，其實除了用在圖片上面外，也可以利用其特性，塑造出其他不同的效果。</p>
        <p><br></p>
        <h3>1. 文字鏤空</h3>
        <p>其實在先前章節也已經有看過類似效果了，主要是利用將 <em>mix-blend-mode</em> 套用在上層元素的方式，讓上層元素內的文字內容透過「濾色」（<em>screen</em>）而轉變成透明色彩，達到文字鏤空的效果。</p>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="360" data-default-tab="result" data-slug-hash="QWQzPKO" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/QWQzPKO">
            CSS3: mix-blend-mode-2</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
        <p><br></p>
        <h3>2. 跟隨滑鼠的局部移動遮罩</h3>
        <p>「遮罩」效果也是近年來網頁屢見不鮮的視覺設計，比較常見到的實務用法是利用 SVG 來實現各種形狀的遮罩樣式。不過如果是簡單的幾何圖形遮罩，其實也可以利用 <em>mix-blend-mode</em> 來實現，概念就和文字鏤空如出一轍，所以本範例將追加另一個效果──讓遮罩跟著滑鼠一起移動，為實現這個效果，我們必須額外借助 JavaScript 的力量，去捕捉滑鼠移動的座標，以令遮罩跟隨滑鼠一同位移。</p>
        <p>範例：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="ExQGJbz" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/ExQGJbz">
            CSS3: mix-blend-mode-3</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
            on <a href="https://codepen.io">CodePen</a>.</span>
            </p>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、總結與相容性</h2>
        <p>「圖片影像」的處理素來就是視覺設計、前後端工程師難捨難分的愛恨情仇，過多的圖片除了讓前端開發者不容易輸出之外，使用者也必須等待網頁載入所有圖片才能完整地閱覽內容；反過來若要求設計師減少圖片的使用，有可能讓設計師沒有辦法很好地傳達其設計理念。近年來 CSS3 不僅減少對 JavaScript 動態效果的需求，也大幅度補足視覺面的依賴，舉凡 SVG 向量繪圖的語法、Filter 濾鏡效果，以及本篇介紹的 Blend Mode 都是其中幾種經典表現。</p>
        <p>當我們面對那些使用相同原始圖片，只是單純透過不同圖層混合效果表達使用者不同操作情境下所呈現的互動樣貌，CSS Blend Mode 混合模式已經能充分取代出圖，我們從第二章節實際效果演示可以看到，由瀏覽器渲染的結果與 Photoshop 幾乎沒有差異。唯一需要考量的是各家瀏覽器相容與否的問題，我們來看看 <a href="https://caniuse.com/?search=mix-blend-mode" target="_blank">Can I use</a> 上的數據：</p>
        <figure>
            <img src="/images/learn/css/mix-blend-mode-18.jpg">
        </figure>
        <p>可以看到全球（Global）整體瀏覽器支援比率已高達 93.77%，幾乎所有主流瀏覽器都完全相容 CSS Blend Mode 相關語法（除了連微軟自家人都已經棄用的舊 IE），因此我們已不太需要擔心使用這些相關屬性是否會令各家瀏覽器使用者無法順利閱覽網頁的內容了。</p>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://www.w3schools.com/cssref/pr_background-blend-mode.asp" target="_blank">w3schools</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode" target="_blank">mda</a></dd>
            <dd><a href="https://www.zhangxinxu.com/wordpress/2015/05/css3-mix-blend-mode-background-blend-mode/" target="_blank">CSS混合模式mix-blend-mode/background-blend-mode简介</a></dd>
            <dd><a href="https://juejin.cn/post/7083696693354430471" target="_blank">有趣的颜色混合模式——mix-blend-mode</a></dd>
        </dl>
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
