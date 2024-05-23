<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、常用特殊符號' },
        { id: 2, title: '二、數學單位特殊符號' },
        { id: 3, title: '三、貨幣符號' },
        { id: 4, title: '四、方向符號' },
        { id: 5, title: '五、其他特殊符號' },
        { id: 6, title: '六、線上工具' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="1" fileType="learnList" />
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
        <p>一篇文章的構成，除了各國自己使用的語言外，還包含一些特殊符號，它們通常具備計算用途或象徵標記之類的功能，因此這些特殊符號也經常會寫在 HTML 文章裡。然而部份特殊符號（尤其是括號符、計算符）同時也是 HTML 程式碼的必要組成，在編譯輸出時，某些時候可能會被判定為程式碼的一部份，導致不會被顯示在頁面上。</p>
        <p>為了避免這種情況，HTML 針對常用的特殊符號標記提供對應的編碼，當我們使用的特殊符號無法順利顯示在文章上時，可改用編碼取代便能正確地被編譯出來。</p>
        <p>本篇主要目的將常見特殊符號及相應的編碼整理成表格，以便查找。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">符號</div>
                    <div class="f-f1">編碼</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&lt;</div>
                    <div class="f-f1">&amp;lt;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">></div>
                    <div class="f-f1">&amp;gt;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&</div>
                    <div class="f-f1">&amp;amp;</div>
                    <div class="f-f4">And</div>
                </div>
                <div class="f-row">
                    <div class="f-f0"> </div>
                    <div class="f-f1">&amp;nbsp;</div>
                    <div class="f-f4">空格</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">"</div>
                    <div class="f-f1">&amp;quot;</div>
                    <div class="f-f4">雙引號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">©</div>
                    <div class="f-f1">&amp;copy;</div>
                    <div class="f-f4">版權所有</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">®</div>
                    <div class="f-f1">&amp;reg;</div>
                    <div class="f-f4">Registered，已註冊的商標</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">™</div>
                    <div class="f-f1">&amp;trade;</div>
                    <div class="f-f4">Trademark，尚未註冊的商標</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&lsaquo;</div>
                    <div class="f-f1">&amp;lsaquo;</div>
                    <div class="f-f4">左單尖箭頭</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&rsaquo;</div>
                    <div class="f-f1">&amp;rsaquo;</div>
                    <div class="f-f4">右單尖箭頭</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&laquo;</div>
                    <div class="f-f1">&amp;laquo;</div>
                    <div class="f-f4">左雙尖箭頭</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">&raquo;</div>
                    <div class="f-f1">&amp;raquo;</div>
                    <div class="f-f4">右雙尖箭頭</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">符號</div>
                    <div class="f-f1">編碼</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">×</div>
                    <div class="f-f1">&amp;times;  </div>
                    <div class="f-f4">乘號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">÷</div>
                    <div class="f-f1">&amp;divide;</div>
                    <div class="f-f4">除號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">±</div>
                    <div class="f-f1">&amp;plusmn;</div>
                    <div class="f-f4">正負符號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">∞</div>
                    <div class="f-f1">&amp;infin;</div>
                    <div class="f-f4">無限大</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">°</div>
                    <div class="f-f1">&amp;deg;</div>
                    <div class="f-f4">度數</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">ƒ</div>
                    <div class="f-f1">&amp;fnof;</div>
                    <div class="f-f4">function</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">√</div>
                    <div class="f-f1">&amp;根號</div>
                    <div class="f-f4">radic;</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">≠</div>
                    <div class="f-f1">&amp;ne;</div>
                    <div class="f-f4">不等於</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">≡</div>
                    <div class="f-f1">&amp;相等</div>
                    <div class="f-f4">equiv;</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">≤</div>
                    <div class="f-f1">&amp;le;</div>
                    <div class="f-f4">小於等於</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">≥</div>
                    <div class="f-f1">&amp;ge;</div>
                    <div class="f-f4">大於等於</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⊥</div>
                    <div class="f-f1">&amp;perp;</div>
                    <div class="f-f4">垂直</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">½</div>
                    <div class="f-f1">&amp;frac12;</div>
                    <div class="f-f4">二分之一</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¼</div>
                    <div class="f-f1">&amp;frac14;</div>
                    <div class="f-f4">四分之一</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¾</div>
                    <div class="f-f1">&amp;frac34;</div>
                    <div class="f-f4">四分之三</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">‰</div>
                    <div class="f-f1">&amp;permil;</div>
                    <div class="f-f4">百分符號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">π</div>
                    <div class="f-f1">&amp;pi;</div>
                    <div class="f-f4">圓周率</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">∴</div>
                    <div class="f-f1">&amp;there4;</div>
                    <div class="f-f4">所以</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">符號</div>
                    <div class="f-f1">編碼</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">€</div>
                    <div class="f-f1">&amp;euro;</div>
                    <div class="f-f4">歐元</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¢</div>
                    <div class="f-f1">&amp;cent;</div>
                    <div class="f-f4">美分</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">£</div>
                    <div class="f-f1">&amp;pound;</div>
                    <div class="f-f4">英鎊</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¥</div>
                    <div class="f-f1">&amp;yen;</div>
                    <div class="f-f4">日圓</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">符號</div>
                    <div class="f-f1">編碼</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">↑</div>
                    <div class="f-f1">&amp;uarr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">↓</div>
                    <div class="f-f1">&amp;darr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">←</div>
                    <div class="f-f1">&amp;larr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">→</div>
                    <div class="f-f1">&amp;rarr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">↔</div>
                    <div class="f-f1">&amp;harr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⇑</div>
                    <div class="f-f1">&amp;uArr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⇓</div>
                    <div class="f-f1">&amp;dArr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⇐</div>
                    <div class="f-f1">&amp;lArr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⇒</div>
                    <div class="f-f1">&amp;rArr;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⇔</div>
                    <div class="f-f1">&amp;hArr;</div>
                    <div class="f-f4"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[5].id">
        <h2 v-text="catalog[5].title"></h2>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f0">符號</div>
                    <div class="f-f1">編碼</div>
                    <div class="f-f4">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">«</div>
                    <div class="f-f1">&amp;laquo;</div>
                    <div class="f-f4">雙左箭頭</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">»</div>
                    <div class="f-f1">&amp;raquo;</div>
                    <div class="f-f4">雙右箭頭</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¿</div>
                    <div class="f-f1">&amp;iquest;</div>
                    <div class="f-f4">倒問號</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">§</div>
                    <div class="f-f1">&amp;sect;</div>
                    <div class="f-f4">章節</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¶</div>
                    <div class="f-f1">&amp;para;</div>
                    <div class="f-f4">段落</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">…</div>
                    <div class="f-f1">&amp;hellip;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">⊕</div>
                    <div class="f-f1">&amp;oplus;</div>
                    <div class="f-f4">邏輯互斥或，與一般的邏輯或（OR）不同，當兩兩數值相同為否，而數值不同時為真</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">∇</div>
                    <div class="f-f1">&amp;nabla;</div>
                    <div class="f-f4">倒三角型</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">¹</div>
                    <div class="f-f1">&amp;sup1;</div>
                    <div class="f-f4">註解1</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">²</div>
                    <div class="f-f1">&amp;sup2;</div>
                    <div class="f-f4">註解2</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">³</div>
                    <div class="f-f1">&amp;sup3;</div>
                    <div class="f-f4">註解3</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">↵</div>
                    <div class="f-f1">&amp;crarr;</div>
                    <div class="f-f4">Enter</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">♠</div>
                    <div class="f-f1">&amp;spades;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">♣</div>
                    <div class="f-f1">&amp;clubs;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">♥</div>
                    <div class="f-f1">&amp;hearts;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">♦</div>
                    <div class="f-f1">&amp;diams;</div>
                    <div class="f-f4"></div>
                </div>
                <div class="f-row">
                    <div class="f-f0">α</div>
                    <div class="f-f1">&amp;alpha;</div>
                    <div class="f-f4">Alpha</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">β</div>
                    <div class="f-f1">&amp;beta;</div>
                    <div class="f-f4">Bata</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">γ</div>
                    <div class="f-f1">&amp;gamma;</div>
                    <div class="f-f4">Gamma</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">Δ</div>
                    <div class="f-f1">&amp;Delta;</div>
                    <div class="f-f4">Delta</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">θ</div>
                    <div class="f-f1">&amp;theta;</div>
                    <div class="f-f4">Theta</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">λ</div>
                    <div class="f-f1">&amp;lambda;</div>
                    <div class="f-f4">Lambda</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">Σ</div>
                    <div class="f-f1">&amp;Sigma;</div>
                    <div class="f-f4">Sigma</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">τ</div>
                    <div class="f-f1">&amp;tau;</div>
                    <div class="f-f4">Tau</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">ω</div>
                    <div class="f-f1">&amp;omega;</div>
                    <div class="f-f4">Omega</div>
                </div>
                <div class="f-row">
                    <div class="f-f0">Ω</div>
                    <div class="f-f1">&amp;Omega;</div>
                    <div class="f-f4">Omega、歐姆</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[6].id">
        <h2 v-text="catalog[6].title"></h2>
        <p>網路上也有許多提供特殊符號對應程式碼的線上工具，例如 <a href="https://www.toptal.com/designers/htmlarrows/" target="_blank">HTML Arrows</a> 便是其中之一，它不僅提供 HTML 格式的符號代碼，還有其他格式例如 Unicode、Hex Code，可說是非常便利。</p>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>