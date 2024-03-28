<template>
    <NuxtLayout name="workshop">
        <hgroup class="text-heading">
            <h1>Vue 常見錯誤訊息問題、除錯建議以及各種疑難雜症彙整</h1>
        </hgroup>
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act1">一、錯誤訊息</a></li>
            <li><a href="#act2">二、警告提示</a></li>
            <li><a href="#act3">三、其他疑難雜症</a></li>
        </ul>
    </div>
    <div class="text-block" id="act1">
        <h2>一、錯誤訊息</h2>
        <div class="text-accordin is-error">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1001;">
                    <p>Uncaught (in promise) Maximum recursive updates exceeded in component. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常發生於使用 <em>reverse()</em> 方法後，導致數據的重新排列，而重新排列可能觸發更新，從而導致遞歸更新。這可能會在 <em>computed</em> 或 <em>watch</em> 中引起問題，因為它們會跟蹤數據的變化並重新計算結果。</p>
                    <p>解決這個問題的方法之一是在 <em>computed</em> 屬性中使用函數，而不是在它們的直接返回值上進行數據操作。這樣做可以防止不必要的更新。此外，也可以考慮在 <em>computed</em> 中使用 <em>watch</em> 來觀察數據的變化，以避免不必要的更新。</p>
                    <p>以下是可能導致渲染出錯的寫法案例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-html">&lt;li v-for="item in lists.reverse().slice(0, 12)" :key="item.id"&gt;&lt;li&gt;</code></pre>
                    </div>
                    <p>解決方式是將 <em>reverse()</em> 方法轉移到 <em>computed</em> 屬性：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">const filteredData = computed(() => {
    return lists.value.slice().reverse().slice(0, 12);
});</code></pre>
                    </div>
                    <p>然後在模版中使用 <em>filteredData</em> ：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-html">&lt;li v-for="item in filteredData" :key="item.id"&gt;&lt;li&gt;</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、警告提示</h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、其他疑難雜症</h2>
        <div class="text-accordin is-others">
        </div>
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

    const isActive = ref(0);
</script>