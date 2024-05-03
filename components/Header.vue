<template>
    <header class="header-wrap" :class="{ 'is-active': navActive }">
        <figure class="logo-wrap">
            <NuxtLink to="/" @click="navToggleActiveRemove">
                <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" style="enable-background:new 0 0 130 130;">
                    <g>
                        <path class="st0" d="M86.8,71.1L73.1,94.8c-0.4,0.7-0.2,1.7,0.6,2.1c0.2,0.1,0.5,0.2,0.7,0.2h27.4c0.9,0,1.5-0.7,1.5-1.6c0-0.3-0.1-0.5-0.2-0.8
                            L89.4,71.1c-0.4-0.7-1.4-1-2.1-0.6C87.1,70.7,86.9,70.9,86.8,71.1"/>
                        <path class="st1" d="M83.5,65.3L66.4,94.8c-0.8,1.4-2.4,2.3-4,2.3h-5.9L69.3,75c0.9-1.5,0.4-3.4-1.2-4.3c-1.6-0.9-3.4-0.4-4.3,1.2l0,0
                            L49.2,97.1h-6.8l16.3-28.2c0.9-1.5,0.4-3.4-1.2-4.3c-1.5-0.9-3.4-0.4-4.3,1.2l0,0l-18,31.3h-8.5l36.2-62.7c0.9-1.5,2.7-2,4.2-1.1
                            c0.5,0.3,0.9,0.7,1.1,1.1l15.2,26.3C84.3,62.1,84.3,63.8,83.5,65.3"/>
                    </g>
                </svg>
            </NuxtLink>
        </figure>
        <nav class="nav-wrap" :class="navActive==true ? 'is-active' : ''">
            <div class="nav-link">
                <NuxtLink to="/about" @click="navToggleActiveRemove" class="lnk-about" title="關於我">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                    </svg>
                    <span>關於我</span>
                </NuxtLink>
            </div>
            <div class="nav-link">
                <NuxtLink to="/hikingbook" @click="navToggleActiveRemove" class="lnk-mountain" title="登山健行">
                    <span>登山健行</span>
                </NuxtLink>
            </div>
            <div class="nav-link">
                <NuxtLink to="/learn" @click="navToggleActiveRemove" class="lnk-learn" title="學習筆記">
                    <span>學習筆記</span>
                </NuxtLink>
            </div>
            <div class="nav-link">
                <NuxtLink to="/workshop" @click="navToggleActiveRemove" class="lnk-workshop" title="工作坊">
                    <span>工作坊</span>
                </NuxtLink>
            </div>
            <div class="nav-link">
                <NuxtLink to="/resources" @click="navToggleActiveRemove" class="lnk-resource" title="推薦資源">
                    <span>推薦資源</span>
                </NuxtLink>
            </div>
        </nav>
        <button class="nav-btn" aria-label="Nav Button" :class="navActive==true ? 'is-active' : ''" @click="navToggleActive">
            <span><b></b><b></b><b></b><b></b></span>
        </button>
    </header>
</template>

<script setup lang="ts">
    /* 定義資料類型 */
    const navActive = ref(false);

    // nav active event
    const navToggleActive = () => {
        navActive.value = !navActive.value;
        document.body.classList.remove('no-scroll');
    };
    const navToggleActiveRemove = () => {
        navActive.value = false;
        document.body.classList.remove('no-scroll');
    };

    // 監聽 popstate 事件，並在事件觸發時重置 navActive 狀態
    const handlePopState = () => {
        navActive.value = false;
    };

    // 在組件被卸載前移除 popstate 事件的監聽器，以免造成內存洩漏
    onBeforeUnmount(() => {
        window.removeEventListener('popstate', handlePopState);
    });

    // 監聽 popstate 事件
    onMounted(() => {
        window.addEventListener('popstate', handlePopState);
    });
</script>