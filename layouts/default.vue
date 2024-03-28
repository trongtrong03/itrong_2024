<template>
    <article id="wrap">
        <slot name="header" />
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