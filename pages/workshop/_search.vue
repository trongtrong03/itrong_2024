<template>
    <NuxtLayout name="workshop">
        <TempArticle :propValue="20" fileType="workshop" />
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
        <p>暫無內容。</p>
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
    &lt;input type="text" placeholder="請輸入球員名稱關鍵字" v-model="query"&gt;
    &lt;ul&gt;
        &lt;li v-for="item in filterSearch"&gt;{{ item.player }}&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
        </div>
        <p><br></p>
        <p>JavaScript：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const vueExample = {
    data() {
        return {
            query: "",
            count: 0,
            lists: players,
        }
    },

    computed: {
        filterSearch: function() {
            var search = this;
            return this.lists.filter(function(item) {
                return item.player.toLowerCase().indexOf(search.query.toLowerCase()) !== -1;
            });
        },
    },
}

const players = [
    { player: 'K.Bryant' },
    { player: 'D.Wade' },
    { player: 'P.Gasol' },
    { player: 'S.Nash' },
    { player: 'S.Curry' },
]

Vue.createApp(vueExample).mount('#app');</code></pre>
        </div>
        <p><br></p>
        <p>效果演示：</p>
        <div class="text-codepen">
            <p class="codepen" data-height="480" data-default-tab="result" data-slug-hash="PXyQqR" data-user="itrong" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
            <span>See the Pen <a href="https://codepen.io/itrong/pen/PXyQqR">
            vue-ex: search</a> by Trong (<a href="https://codepen.io/itrong">@itrong</a>)
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