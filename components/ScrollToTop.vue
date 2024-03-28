<template>
    <button class="btn-top" :class="{ 'is-show': isShowButton }" @click="onBtnTopClick"></button>
</template>

<script setup lang="ts">
    const onBtnTopClick = () => {
        const duration = 500;
        const start = window.pageYOffset;
        let startTime = null;

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            const scrollTop =
            easeInOutCubic(Math.min(progress / duration, 1)) * (0 - start) + start;
            window.scrollTo(0, scrollTop);
            if (progress < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    const isShowButton = ref(false);
    const updateButtonVisibility = () => {
        isShowButton.value = window.scrollY > 400;
    };


    // mounted
    onMounted(async () => {
        onBtnTopClick();
        updateButtonVisibility();
    });

    onBeforeMount(() => {
        // Add event listener
        window.addEventListener("scroll", updateButtonVisibility);
    });

    onBeforeUnmount(() => {
        // Remove event listener
        window.removeEventListener("scroll", updateButtonVisibility);
    });
</script>