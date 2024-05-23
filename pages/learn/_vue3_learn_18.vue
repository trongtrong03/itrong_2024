<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、基本插槽' },
        { id: 2, title: '二、具名插槽' },
        { id: 3, title: '三、作用域插槽' },
        { id: 4, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="79" fileType="learnList" />
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
        <p>在前面父子組件通信文章所闡述與練習的範例裡，父組件透過屬性傳遞資料和配置到子組件，這種方式在簡單的架構規劃中基本沒什麼問題，但當需要傳遞複雜的模板結構或動態內容時，傳統方法便顯得力不從心，我們可能必須藉由相對複雜的方法，例如使用 <em>v-if</em> 判斷式辨別傳遞資料的種類，但是面對要傳遞的內容是較複雜的 HTML 結構時，傳統的 props 傳遞便毫無用武之地。</p>
        <p>綜觀上述，傳統 props 資料傳遞有以下這些侷限性：</p>
        <h4>1. 模板結構無法靈活傳遞：</h4>
        <p>當父組件需要傳遞複雜的模板結構時，props 只能傳遞數據，無法傳遞 HTML 結構。</p>
        <h4>2. 動態內容難以管理：</h4>
        <p>父組件需要傳遞動態內容時，需要額外的邏輯處理，增加了程式碼複雜度。</p>
        <h4>3. 組件復用性降低：</h4>
        <p>子組件的結構和行為在設計時已被固定，靈活性較低。</p>
        <p><br></p>
        <p>在 Vue 3 中，有一個名為 slot 的功能，便是用來解決傳統傳遞方式的諸多不足之處。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>

    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://cn.vuejs.org/" target="_blank">Vue.js</a></dd>
            <dd><a href="https://www.youtube.com/watch?v=49b150tKIUc&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=61" target="_blank">【极简Vue3】061 插槽 默认插槽</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>