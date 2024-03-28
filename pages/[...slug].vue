<template>
    <div class="error-wrap">
        <div class="error-bg"></div>
        <h1>Ooops!</h1>
        <h2>很抱歉！此網頁不存在。</h2>
        <div class="error-btn">
            <NuxtLink to="/">首頁</NuxtLink>
            <a href="javascript:history.back()">上一頁</a>
        </div>
    </div>
</template>

<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 404
    setResponseStatus(404);
</script>