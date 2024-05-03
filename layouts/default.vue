<template>
    <article id="wrap">
        <!--header -->
        <Header />
        <!-- main -->
        <main class="main-wrap">
            <div class="main-inside">
                <slot />
            </div>
        </main>
        <ScrollToTop />
        <!-- footer -->
        <Footer />
    </article>
</template>