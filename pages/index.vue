<template>
    <!-- cover -->
    <section class="index-cover-wrap">
        <figure class="index-cover-bg">
            <div></div>
        </figure>
        <hgroup class="index-cover-text">
            <h1>ITRONG</h1>
            <h2>WORK STUDIO</h2>
        </hgroup>
        <button id="scrollDown" class="scroll-down">
            <span>SCROLL DOWN</span>
            <b></b>
        </button>
    </section>
    <!-- about -->
    <section id="scrollArea" class="index-about-wrap">
        <div class="index-about-ceter" data-aos="custom">
            <div class="index-about-title">
                <h2>I am...</h2>
            </div>
            <div class="index-about-article">
                <div class="index-about-photo">
                    <figure>
                        <i></i>
                        <span id="parallaxStage">
                            <b data-depth="0.5"></b>
                        </span>
                    </figure>
                </div>
                <div class="index-about-text">
                    <hgroup>
                        <h2>Trong.Chen</h2>
                        <ul>
                            <li>Born in 1989</li>
                            <li>現居台中</li>
                            <li>國立彰化師範大學資管系 畢業</li>
                        </ul>
                        <ul>
                            <li>
                                <time>2013.06 ~ 2016.03</time>
                                <p>
                                    <span>里陽數位科技</span>
                                    <span>網頁設計師</span>
                                </p>
                            </li>
                            <li>
                                <time>2016.04 ~ 2023.12</time>
                                <p>
                                    <span>中佑資訊</span>
                                    <span>網頁前端工程師</span>
                                </p>
                            </li>
                            <li>
                                <time>2018.04 ~</time>
                                <p>
                                    <span>Kiwigo 奇果，創意設計</span>
                                    <span>接案前端工程師</span>
                                </p>
                            </li>
                            <li>
                                <time>2020.10 ~</time>
                                <p>
                                    <span>山水雲林</span>
                                    <span>接案前端工程師</span>
                                </p>
                            </li>
                        </ul>
                    </hgroup>
                </div>
            </div>
            <MyNuxtLink to="/about" class="more-button"></MyNuxtLink>
            <div class="index-about-bg">
                <ul>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                </ul>
            </div>
        </div>
    </section>
    <!-- job -->
    <section class="index-job-wrap">
        <div class="index-job-ceter" data-aos="custom">
            <div class="index-job-title">
                <h2>My job is...</h2>
            </div>
            <div class="index-job-name">
                <h2>Web front-end engineer</h2>
            </div>
            <div class="index-job-text">
                <hgroup>
                    <h3>Programming</h3>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>SCSS</li>
                        <li>JavaScript</li>
                        <li>jQuery</li>
                        <li>Vue</li>
                    </ul>
                </hgroup>
                <hgroup>
                    <h3>Design</h3>
                    <ul>
                        <li>Photoshop</li>
                        <li>Illustrator</li>
                        <li>XD</li>
                        <li>Figma</li>
                    </ul>
                </hgroup>
                <hgroup>
                    <h3>Development</h3>
                    <ul>
                        <li>Git</li>
                        <li>Visual Studio Code</li>
                        <li>Sublime Text</li>
                    </ul>
                </hgroup>
            </div>
            <MyNuxtLink to="/learn" class="more-button"></MyNuxtLink>
        </div>
    </section>
    <!-- hiker -->
    <section class="index-hiker-wrap">
        <div class="index-hiker-ceter" data-aos="custom">
            <div class="index-hiker-title">
                <h2>I am also...</h2>
            </div>
            <div class="index-hiker-name">
                <h2>Adventurer</h2>
            </div>
            <div class="index-hiker-marquee">
                <div class="index-hiker-photo" v-for="index in 30" :key="index"></div>
            </div>
            <MyNuxtLink to="/hikingbook" class="more-button"></MyNuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
    useHead({
        script: [
            { src: "/js/parallax.min.js" },
            { src: "/js/scroll-animation.js" }
        ],
    });

    /* AOS 指定元素進入畫面才觸發 */
    const funcAOS = () => {
        const elementsToAnimate = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    initializeAOS(); // Initialize AOS when the element is in view
                    observer.disconnect(); // Stop observing once initialized
                }
            });
        });
        
        elementsToAnimate.forEach((element) => {
            observer.observe(element);
        });
    };

    onBeforeMount(() => {
        funcAOS();
    });

    onUpdated(() => {
        funcAOS();
    });


    /* scroll down button */
    const scrollDown = () => {
        const scrollDownButton = document.getElementById("scrollDown");
        const scrollDownArea = document.getElementById("scrollArea");

        scrollDownButton.addEventListener("click", function() {
            scrollDownArea.scrollIntoView({ behavior: 'smooth' });
        });
    };

    onMounted(() => {
        scrollDown();
    });

    /* 視差滾動 */
    const parallax = () => {
        if (typeof Parallax !== 'undefined') {
            var bg = document.getElementById("parallaxStage");
            var parallax_sk = new Parallax(bg, {
                // limitY: 0,
            });
        }
    };

    onMounted(() => {
        parallax();
    });

    onUpdated(() => {
        parallax();
    });

    /* 圖片跑馬燈 */
    const marquee = () => {
        const marqueeImages = document.querySelectorAll(".index-hiker-photo");

        marqueeImages.forEach((marqueeImage) => {
            marqueeImage.animate(
                {
                    translate: [0, "calc(-1500% - 15rem)"]
                },
                {
                    duration: 50000,
                    iterations: Infinity
                }
            );
        });
    }

    onMounted(() => {
        marquee();
    });
</script>