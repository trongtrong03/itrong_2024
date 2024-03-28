<template>
    <section class="pages-wrap page-hikingbook">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Hiking Book</h1>
            </div>
            <div class="hikingbook-wrap">
                <HikingbookNav :propHikingbookValue="0" />
                <div class="hikingbook-head">
                    <p>在登山中，只有兩個等級：可以，或不能。</p>
                    <p>我們必須要朝著頂端不斷攀爬，才能看到更遠的景色，只有在冒險中，我們才能找到真正的自己。</p>
                </div>
                <div class="hikingbook-flex">
                    <div class="hikingbook-f1">
                        <div class="hikingbook-progress">
                            <h2>里程碑</h2>
                            <ul>
                                <li>
                                    <div id="circleArea1" class="progress-circle"></div>
                                    <h3>百岳</h3>
                                </li>
                                <li>
                                    <div id="circleArea2" class="progress-circle"></div>
                                    <h3>小百岳</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="hikingbook-f2">
                        <div>
                            <h2>近期完成山岳</h2>
                            <div class="hikingbook-lastest-list">
                                <ul>
                                    <li v-for="item in filteredMountainsData.slice(0, 6)" :key="item.id">
                                        <NuxtLink :to="'/mountains/' + item.id">
                                            <figure>
                                                <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                                                <img src="/images/mountains/thumb/default.jpg" v-else>
                                            </figure>
                                            <hgroup>
                                                <h3 v-text="item.name"></h3>
                                                <!-- <h4 v-text="item.county"></h4> -->
                                                <h5 v-text="item.height + 'm'"></h5>
                                                <time v-text="item.fDate"></time>
                                            </hgroup>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2>近期發表文章</h2>
                            <div class="hikingbook-lastest-article">
                                <ul>
                                    <li v-for="item in filteredLogsData" :key="item.id">
                                        <NuxtLink :to="'/logs/' + item.id">
                                            <figure>
                                                <span :style="{ 'background-image': 'url(/images/logs/cover' + item.id + '.jpg)' }"></span>
                                            </figure>
                                            <hgroup>
                                                <time v-text="item.time"></time>
                                                <p v-text="item.title"></p>
                                            </hgroup>
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hikingbook-block hikingbook-gallery">
                    <h2>影像故事</h2>
                    <ul>
                        <li v-for="(item, index) in galleryData" :key="index" @click="fetchGalleryData(item, index); noScroll()">
                            <figure>
                                <span :style="{ 'background-image': 'url(/images/gallery/' + item.id + '.jpg)' }"></span>
                            </figure>
                        </li>
                    </ul>
                </div>
                <div class="hikingbook-block hikingbook-link">
                    <h2>相關資源</h2>
                    <ul>
                        <li v-for="(item, index) in filteredLinksData" :key="index">
                            <figure>
                                <img :src="'/images/resources/hiking/' + item.img + '.jpg'" v-if="item.cover">
                                <img src="/images/resources/default.jpg" v-else>
                                <figcaption>
                                    <a :href="item.href" class="link" target="_blank"></a>
                                </figcaption>
                            </figure>
                            <hgroup>
                                <h2 v-text="item.title"></h2>
                            </hgroup>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- popup -->
        <div class="gallery-popup-wrap" v-if="selectedItem">
            <div class="gallery-popup-flex">
                <div class="gallery-popup-img">
                    <figure>
                        <span :style="{ 'background-image': 'url(/images/gallery/' + selectedItem.id + '.jpg)'}"></span>
                    </figure>
                </div>
                <div class="gallery-popup-content">
                    <p v-text="selectedItem.desc"></p>
                    <p v-text="selectedItem.site"></p>
                    <time v-text="selectedItem.time"></time>
                </div>
                <div class="gallery-popup-btn">
                    <button class="btn-prev" @click="loadPrevItem"></button>
                    <button class="btn-next" @click="loadNextItem"></button>
                </div>
            </div>
            <button class="popup-close" @click="selectedItem = !selectedItem; noScroll()">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;">
                    <path d="M20.02,22.13c-0.35,0.47-0.51,0.74-0.73,0.96c-5.3,5.32-10.6,10.63-15.9,15.94c-0.24,0.24-0.47,0.49-0.75,0.69
                        c-0.69,0.5-1.54,0.41-2.13-0.19c-0.58-0.59-0.65-1.45-0.15-2.14c0.18-0.25,0.42-0.47,0.64-0.69c5.32-5.33,10.64-10.66,15.97-15.98
                        c0.22-0.22,0.52-0.35,0.78-0.52c0.01-0.13,0.01-0.26,0.02-0.39c-0.27-0.17-0.57-0.29-0.79-0.51C11.62,13.95,6.29,8.6,0.95,3.25
                        C-0.12,2.19-0.26,1.27,0.5,0.48c0.79-0.81,1.73-0.67,2.82,0.42C8.64,6.23,13.97,11.56,19.28,16.9c0.22,0.22,0.39,0.49,0.64,0.8
                        c0.33-0.32,0.56-0.52,0.77-0.73C26.01,11.63,31.33,6.3,36.65,0.98c0.2-0.2,0.4-0.41,0.62-0.59C38-0.21,38.9-0.17,39.53,0.47
                        C40.15,1.1,40.18,2,39.59,2.73C39.41,2.95,39.2,3.15,39,3.35c-5.3,5.31-10.6,10.62-15.91,15.93c-0.22,0.22-0.51,0.35-0.78,0.53
                        c-0.01,0.13-0.02,0.26-0.02,0.39c0.27,0.17,0.57,0.29,0.79,0.51c5.33,5.32,10.65,10.65,15.97,15.98c0.24,0.24,0.49,0.48,0.68,0.75
                        c0.48,0.69,0.37,1.56-0.23,2.13c-0.59,0.55-1.41,0.62-2.08,0.14c-0.27-0.2-0.51-0.44-0.75-0.68c-5.3-5.31-10.61-10.62-15.9-15.94
                        C20.54,22.87,20.38,22.6,20.02,22.13z"/>
                </svg>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
    useHead({
        script: [
            { src: "/js/progressbar.js" }
        ],
    });

    const mountainsData = ref([]);
    const logsData = ref([]);
    const galleryData = ref([]);
    const linksData = ref([]);

    // Fetch data
    onMounted(async () => {
        await fetchData(mountainsData, 'mountainsList');
        await fetchData(logsData, 'mountainsLogs');
        await fetchData(linksData, 'mountainsLinks');
    });

    // 過濾條件
    const filteredMountainsData = computed(() => {
        // 過濾出 finish 為 true 的項目
        const finishedItems = mountainsData.value.filter((item) => item.finish);

        // 按 fDate 日期值由新到舊排列
        finishedItems.sort((a, b) => {
            return new Date(b.fDate).getTime() - new Date(a.fDate).getTime();
        });

        return finishedItems;
    });

    // 避免數據重新排列觸發更新導致 Uncaught (in promise) Maximum recursive updates exceeded in component
    const filteredLogsData = computed(() => {
        return logsData.value.slice().reverse().slice(0, 3);
    });

    const filteredLinksData = computed(() => {
        return linksData.value;
    });

    /* Gallery */
    const selectedItem = ref(null);
    const currentIndex = ref(0);

    onMounted(async () => {
        try {
            const response = await fetch('/js/data/mountainsGallery.json');
            const data = await response.json();
            galleryData.value = data.reverse().slice(0, 8).map((item, index) => ({
                ...item,
                currentIndex: index,
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Fetch data on component mounted
    const fetchGalleryData = (item) => {
        selectedItem.value = item;
        currentIndex.value = item.currentIndex;
    };

    // Function to toggle body scroll
    const noScroll = () => {
        document.body.classList.toggle('no-scroll');
    };

    // Function to load the previous item
    const loadPrevItem = () => {
        currentIndex.value--;
        if (currentIndex.value < 0) {
            currentIndex.value = galleryData.value.length - 1;
        }
        selectedItem.value = galleryData.value.find((item) => item.currentIndex === currentIndex.value);
    };

    // Function to load the next item
    const loadNextItem = () => {
        currentIndex.value++;
        if (currentIndex.value >= galleryData.value.length) {
            currentIndex.value = 0;
        }
        selectedItem.value = galleryData.value.find((item) => item.currentIndex === currentIndex.value);
    };

    /* 進度條 */
    const circleAreas = ref([]);
    const initCircles = () => {
        setTimeout(callFunc, 600);

        function callFunc() {
            const circles = [
                { selector: circleArea1, value: 0.14 },
                { selector: circleArea2, value: 0.53 }
            ];

            circles.forEach(circle => {
                const bar = new ProgressBar.Circle(circle.selector, {
                    color: '#aaa',
                    strokeWidth: 5,
                    trailWidth: 1,
                    easing: 'easeInOut',
                    duration: 1400,
                    text: {
                        autoStyleContainer: false
                    },
                    step: function(state, circle) {
                        circle.path.setAttribute('stroke', state.color);
                        circle.path.setAttribute('stroke-width', state.width);
                        var value = Math.round(circle.value() * 100);
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText(value);
                        }
                    }
                });
                bar.animate(circle.value);
                circleAreas.value.push(bar);
            });
        }
    };

    onBeforeMount(async () => {
        await fetchData(mountainsData, 'mountainsList');
        await fetchData(logsData, 'mountainsLogs');
        await fetchData(linksData, 'mountainsLinks');
        // initCircles();
    });

    const delayTime = 1000;
    const initialized = ref(false);

    onMounted(() => {
        setTimeout(() => {
            // 执行初始化逻辑
            initCircles();
            // 标记为已初始化
            initialized.value = true;
        }, delayTime);
    });

    onUnmounted(() => {
        circleAreas.value.forEach(bar => {
            bar.destroy();
        });
    });
</script>