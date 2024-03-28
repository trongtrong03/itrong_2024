<template>
    <div class="hikingbook-nav">
        <ul>
            <li class="lnk-database">
                <NuxtLink to="/mountains" :class="propHikingbookValue==1 ? 'is-active' : ''"><span>山岳資料</span></NuxtLink>
            </li>
            <li class="lnk-routes">
                <NuxtLink to="/routes" :class="propHikingbookValue==2 ? 'is-active' : ''"><span>路線彙整</span></NuxtLink>
            </li>
            <li class="lnk-article">
                <NuxtLink to="/logs" :class="propHikingbookValue==3 ? 'is-active' : ''"><span>登山心得</span></NuxtLink>
            </li>
            <li class="lnk-gallery">
                <NuxtLink to="/gallery" :class="propHikingbookValue==4 ? 'is-active' : ''"><span>影像故事</span></NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    // 使用 props 來傳入各個模板的值
    const props = defineProps({
        propHikingbookValue: {
            type: Number,
            required: true,
        }
    });
</script>