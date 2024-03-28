<template>
    <div id="parallax" class="main-bg">
        <h2></h2>
    </div>
</template>

<script setup lang="ts">
    // Parallax Scrolling
    const parallax = () => {
        const parallaxElement = document.getElementById("parallax");
        if (parallaxElement) {
            parallaxElement.style.top = -(window.pageYOffset / 4) + 'px';
        }
    }

    // Event Listeners
    onMounted(() => {
        window.addEventListener('scroll', parallax);
    });
    
    // Cleanup
    const beforeUnmount = () => {
        window.removeEventListener('scroll', parallax);
    }
</script>