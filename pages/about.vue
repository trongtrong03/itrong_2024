<template>
    <section class="pages-wrap page-about">
        <PagesBackground />
        <div class="about-center">
            <div class="about-photo">
                <figure>
                    <i></i>
                    <span id="parallaxStage">
                        <b data-depth="0.5"></b>
                    </span>
                </figure>
            </div>
            <div class="about-main">
                <div class="about-nav">
                    <ul>
                        <li>
                            <button :class="isActive==1 ? 'is-active' : ''" @click="scrollToTop(1)">基本資料</button>
                        </li>
                        <li>
                            <button :class="isActive==2 ? 'is-active' : ''" @click="scrollToTop(2)">技能專長</button>
                        </li>
                        <li>
                            <button :class="isActive==3 ? 'is-active' : ''" @click="scrollToTop(3)">專案作品</button>
                        </li>
                    </ul>
                    <figure>
                        <a href="https://github.com/trongtrong03" target="_blank" class="lnk-github" title="GitHub">
                            <span>GitHub</span>
                        </a>
                        <a href="https://codepen.io/itrong" target="_blank" class="lnk-codepen" title="Codepen">
                            <span>Codepen</span>
                        </a>
                        <a href="https://www.instagram.com/ttrong.hiker/" target="_blank" class="lnk-instagram" title="Instagram">
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.linkedin.com/in/%E9%9F%8B%E7%BF%B0-%E9%99%B3-58a9921b3/" target="_blank" class="lnk-linkedin" title="Linkedin">
                            <span>Linkedin</span>
                        </a>
                    </figure>
                </div>
                <div class="about-tabs">
                    <div class="about-content" v-if="isActive==1">
                        <div class="about-datalist">
                            <ul>
                                <li>
                                    <h3>Name</h3>
                                    <p>陳韋翰<b>（壯壯）</b></p>
                                </li>
                                <li>
                                    <h3>Birthday</h3>
                                    <p>1989.8.6</p>
                                </li>
                                <li>
                                    <h3>Live</h3>
                                    <p>台中</p>
                                </li>
                                <li>
                                    <h3>Interest</h3>
                                    <p>登山 / 慢跑 / 籃球 / 健身 / 手工藝</p>
                                </li>
                                <li>
                                    <h3>E-mail</h3>
                                    <p>
                                        <a href="mailto:trongtrong03@gmail.com" target="_blank" class="mail-icon" title="Mail to me">
                                            <span>trongtrong03@gmail.com</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                                            </svg>
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <h3>Edu</h3>
                                    <p>國立彰化師範大學資管系</p>
                                </li>
                                <li>
                                    <h3>Exp</h3>
                                    <ol>
                                        <li>
                                            <time>2013.06 ~ 2016.03</time>
                                            <span><i>里陽數位科技</i><i>網頁設計師</i></span>
                                        </li>
                                        <li>
                                            <time>2016.04 ~ 2023.12</time>
                                            <span><i>中佑資訊</i><i>網頁前端工程師</i></span>
                                        </li>
                                        <li>
                                            <time>2018.04 ~</time>
                                            <span><i>Kiwigo 奇果，創意設計</i><i>接案前端工程師</i></span>
                                        </li>
                                        <li>
                                            <time>2020.10 ~</time>
                                            <span><i>山水雲林</i><i>接案前端工程師</i></span>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <h3>Motto</h3>
                                    <p>莫忘初衷</p>
                                </li>
                                <li>
                                    <h3>Intro</h3>
                                    <p>
                                        <span>嗨，我是韋翰，從事網頁設計已有十多年餘載，主要負責前端切版方面的工作，偶爾客串架構規劃與切版小老師，不敢妄稱自己能力出眾，但從零開始慢慢堆砌的經驗與熱忱，成為我在這個領域闖蕩多年的優勢。</span>
                                        <span><br></span>
                                        <span>高中文組出身，和許多同組學子一樣，對寫程式興致缺缺，連大學就讀彰師大資管系亦皆以「設計」相關學分作為主修。然而，進入職場沒多久便深刻體悟到自身設計競爭力在碩大市場可謂乏善可陳，經過幾番「洗禮」，決定學習架設網站並充實個人作品，以突破停滯不前的現狀。意外地在自主鑽研網頁程式語言期間，慢慢喜歡上了寫程式，如果要探究箇中原由，那肯定是出於獨立完成一個網站後產生的成就感吧，即便時至今日，我也依然對於能成功交付任何一個專案感到自豪。</span>
                                        <span><br></span>
                                        <span>儘管起步比許多專科從業人士晚，但我仍舊保持持續學習、充實自己的心態，這也正是我對待人生的寫照──不是正在探索，就是在前往探索的路上。</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="about-content" v-if="isActive==2">
                        <div class="about-skilllist">
                            <hgroup>
                                <h2>Programming Language</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-html5"></i>
                                            <i class="icon icon-haml"></i>
                                            <i class="icon icon-pug"></i>
                                            <i class="icon icon-svg"></i>
                                            <span></span>
                                            <i class="icon icon-css3"></i>
                                            <i class="icon icon-sass"></i>
                                            <i class="icon icon-stylus"></i>
                                            <!-- <i class="icon icon-less"></i> -->
                                            <!-- <i class="icon icon-tailwindcss"></i> -->
                                            <span></span>
                                            <i class="icon icon-javascript"></i>
                                            <i class="icon icon-jquery"></i>
                                            <i class="icon icon-nodejs"></i>
                                            <!-- <i class="icon icon-typescript"></i> -->
                                            <i class="icon icon-vue"></i>
                                            <!-- <i class="icon icon-vuex"></i> -->
                                            <i class="icon icon-nuxt"></i>
                                            <i class="icon icon-vite"></i>
                                            <!-- <i class="icon icon-vuetify"></i> -->
                                            <!-- <i class="icon icon-react"></i> -->
                                            <!-- <i class="icon icon-angular"></i> -->
                                            <!-- <i class="icon icon-ajax"></i> -->
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                            <hgroup>
                                <h2>Design Software</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-adobe-ps"></i>
                                            <i class="icon icon-adobe-ai"></i>
                                            <i class="icon icon-adobe-xd"></i>
                                            <i class="icon icon-adobe-ae"></i>
                                            <span></span>
                                            <i class="icon icon-figma"></i>
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                            <hgroup>
                                <h2>Development Tools</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-git"></i>
                                            <span></span>
                                            <i class="icon icon-vscode"></i>
                                            <i class="icon icon-sublime"></i>
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                        </div>
                    </div>
                    <div class="about-content" v-if="isActive==3">
                        <div class="works-wrap">
                            <div class="works-head">
                                <p>工作內容：</p>
                                <ul>
                                    <li>前端設計切版</li>
                                    <li>RWD 響應式網頁設計</li>
                                    <li>動態效果開發</li>
                                    <li>網頁效能優化</li>
                                    <li>網頁建議與規劃</li>
                                </ul>
                                <p><strong>※ 本作品集僅供面試參考，請勿外傳或作其他任何用途，謝謝。</strong></p>
                            </div>
                            <div class="works-list" v-if="isDataLoaded">
                                <div class="works-item" v-for="(item, index) in displayedItems" :key="index" @click="fetchData(item, index); noScroll()">
                                    <span :style="{ 'background-image': 'url(/images/works/A' + item.img + '.jpg)'}"></span>
                                    <div class="works-info">
                                        <time v-text="item.year"></time>
                                        <h2 v-text="item.title"></h2>
                                    </div>
                                </div>
                            </div>
                            <div class="list-loading" v-else>
                                <Loading />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="works-popup-wrap" v-if="selectedItem">
            <div class="works-popup-flex">
                <div class="works-popup-img">
                    <figure>
                        <img :src="'/images/works/A' + selectedItem.img + '.jpg'">
                    </figure>
                </div>
                <div class="works-popup-content">
                    <div class="text">
                        <h2 v-text="selectedItem.title"></h2>
                        <p>專案時間：{{ selectedItem.year }}</p>
                        <p>
                            <span>網站類型：{{ selectedItem.type }}</span>
                        </p>
                        <p>
                            <span>專案來源：{{ selectedItem.from }}</span>
                        </p>
                        <p>
                            <span>專案描述：</span>
                            <span>{{ selectedItem.desc }}</span>
                        </p>
                    </div>
                    <div class="qrcode" v-if="selectedItem.href">
                        <a :href="'https://itrong.yidas.net/__work/' + selectedItem.img + '/'" target="_blank">
                            <img :src="'images/works/qrcode/A' + selectedItem.img + '.png'">
                        </a>
                    </div>
                    <div class="btn">
                        <button class="btn-prev" @click="loadPrevItem"></button>
                        <button class="btn-next" @click="loadNextItem"></button>
                    </div>
                </div>
            </div>
            <button class="popup-close" @click="closePopup">
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
            { src: "/js/parallax.min.js" }
        ],
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

    /* 切換頁籤並移動至頂部 */
    const isActive = ref(1);
    const scrollToTop = (section) => {
        // 定義 isActive 值
        isActive.value = section;

        // 頁面移動至頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /* 專案作品 */
    const jsonData = ref([]);
    const selectedItem = ref(null);
    const currentIndex = ref(0);
    const isDataLoaded = ref(false);

    // Fetch data on component mounted
    onMounted(async () => {
        try {
            const response = await fetch('/js/data/works.json');
            const data = await response.json();
            jsonData.value = data.reverse().map((item, index) => ({
                ...item,
                currentIndex: index,
            }));
        } catch (error) {
            console.error('Error:', error);
        }
        isDataLoaded.value = true;
    });

    // Function to fetch data for a selected item
    const fetchData = (item) => {
        selectedItem.value = item;
        currentIndex.value = item.currentIndex;
    };

    // Function to toggle body scroll
    const noScroll = () => {
        document.body.classList.toggle('no-scroll');
    };

    const closePopup = () => {
        selectedItem.value = false;
        document.body.classList.remove('no-scroll');
    };

    // Function to load the previous item
    const loadPrevItem = () => {
        currentIndex.value--;
        if (currentIndex.value < 0) {
        currentIndex.value = jsonData.value.length - 1;
        }
        selectedItem.value = jsonData.value.find((item) => item.currentIndex === currentIndex.value);
    };

    // Function to load the next item
    const loadNextItem = () => {
        currentIndex.value++;
        if (currentIndex.value >= jsonData.value.length) {
        currentIndex.value = 0;
        }
        selectedItem.value = jsonData.value.find((item) => item.currentIndex === currentIndex.value);
    };

    /* 偵測使用者是否按下瀏覽器上一頁按扭 */
    // Handler for popstate event
    const handlePopState = () => {
        // 清除 noScroll 狀態
        document.body.classList.remove('no-scroll');
    };

    // 監聽 popstate 事件
    onMounted(() => {
        window.addEventListener('popstate', handlePopState);
    });

    /* 動態滾動載入資料 */
    // 預設載入的資料筆數
    const defaultItemCount = 15;

    // 追蹤目前已經載入的資料數量
    const loadedItemCount = ref(defaultItemCount);

    // 計算顯示在頁面上的資料
    const displayedItems = computed(() => jsonData.value.slice(0, loadedItemCount.value));

    // 滾動加載更多資料的處理函式
    const handleScroll = () => {
        // 如果目前載入的資料數量小於 JSON 資料的總數，並且滾動到了頁面底部
        if (loadedItemCount.value < jsonData.value.length && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // 加載下一批資料
            loadedItemCount.value += defaultItemCount;
        }
    };

    // 監聽滾動事件
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    // 組件被卸載時移除滾動事件的監聽
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    // 生命鉤子
    onMounted(() => {
        parallax();
    });

    onUpdated(() => {
        parallax();
    });
</script>