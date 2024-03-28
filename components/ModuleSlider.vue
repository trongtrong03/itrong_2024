<template>
    <section class="index-slider-wrap">
        <div class="index-slider-main">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <figure style="background-image: url('/images/index/photo01.jpg')"></figure>
                </div>
                <div class="swiper-slide">
                    <figure style="background-image: url('/images/index/photo02.jpg')"></figure>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
</template>

<script setup lang="ts">
    // swiper slider
    useHead({
        script: [
            { src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" }
        ],
        link: [
            { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" }
        ],
    });

    const slider = () => {
        const swiper = new Swiper('.index-slider-main', {
            direction: "horizontal",
            speed: 1000,
            spaceBetween: 0,
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: false,
                disableOnInteraction: false,
            },
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    };

    onMounted(() => {
        slider();
    });
</script>

<style>
    .index-slider-wrap {
        position: relative;
    }

    .index-slider-main {
        position: relative;
        height: 600px;
        overflow: hidden;
    }

    .index-slider-main .swiper-slide figure {
        height: 600px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        animation-name: indexSlideAni;
        animation-duration: 20s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: linear;
    }

    .index-slider-main.swiper-button-prev,
    .index-slider-main.swiper-button-next {
        width: 40px;
        height: 40px;
        font-size: 20px;
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .index-slider-main.swiper-button-prev {
        left: 0;
    }

    .index-slider-main.swiper-button-next {
        right: 0;
    }

    .index-slider-main.swiper-button-prev::before,
    .index-slider-main.swiper-button-next::before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
    }

    .index-slider-main.swiper-button-prev::after,
    .index-slider-main.swiper-button-next::after {
        display: none;
    }

    .index-slider-main.swiper-button-prev::before {
        content: '\f104';
    }

    .index-slider-main.swiper-button-prev::after {
        content: '\f105';
    }
</style>