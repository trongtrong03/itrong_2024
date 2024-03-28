<template>
    <article id="wrap" class="page-logs">
        <!--header -->
        <Header :propNavLinkVal="propNavLinkVal" />
        <!-- main -->
        <main class="main-wrap">
            <div class="main-inside">
                <section class="article-wrap">
                    <div class="article-container">
                        <div class="article-content">
                            <slot />
                        </div>
                    </div>
                    <div class="article-float">
                        <NuxtLink to="/logs" class="btn-back"></NuxtLink>
                        <NuxtLink to="/" class="btn-home"></NuxtLink>
                        <ScrollToTop />
                    </div>
                </section>
            </div>
        </main>
        <!-- footer -->
        <Footer />
    </article>
</template>

<script setup lang="ts">
    const propNavLinkVal = "hikingbook";
</script>