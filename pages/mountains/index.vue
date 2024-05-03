<template>
    <section class="pages-wrap page-hikingbook">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Hiking Book</h1>
            </div>
            <div class="hikingbook-wrap">
                <HikingbookNav :propHikingbookValue="1" />
                <div class="hikingbook-inside">
                    <div class="hikingbook-block hikingbook-mountains">
                        <div class="pages-title">
                            <h2>山岳資料</h2>
                        </div>
                        <div class="hikingbook-tips">
                            <p>目前已蒐集 {{ jsonDataLength }} 筆資料</p>
                        </div>
                        <div class="list-wrap">
                            <div class="list-tools">
                                <div class="list-select">
                                    <button class="btn-county"></button>
                                    <select @change="setCounty($event)" @click="filterOpen = false">
                                        <option value="">全部縣市</option>
                                        <option value="基隆市">基隆市</option>
                                        <option value="台北市">台北市</option>
                                        <option value="新北市">新北市</option>
                                        <option value="桃園市">桃園市</option>
                                        <option value="新竹縣">新竹縣</option>
                                        <option value="新竹市">新竹市</option>
                                        <option value="苗栗縣">苗栗縣</option>
                                        <option value="台中市">台中市</option>
                                        <option value="彰化縣">彰化縣</option>
                                        <option value="南投縣">南投縣</option>
                                        <option value="雲林縣">雲林縣</option>
                                        <option value="嘉義縣">嘉義縣</option>
                                        <option value="嘉義市">嘉義市</option>
                                        <option value="台南市">台南市</option>
                                        <option value="高雄市">高雄市</option>
                                        <option value="屏東縣">屏東縣</option>
                                        <option value="宜蘭縣">宜蘭縣</option>
                                        <option value="花蓮縣">花蓮縣</option>
                                        <option value="台東縣">台東縣</option>
                                        <option value="澎湖縣">澎湖縣</option>
                                        <option value="金門縣">金門縣</option>
                                        <option value="馬祖縣">馬祖縣</option>
                                    </select>
                                </div>
                                <div class="list-select">
                                    <button class="btn-level"></button>
                                    <select @change="setTags($event)" @click="filterOpen = false">
                                        <option value="">全部分類</option>
                                        <option value="百岳">百岳</option>
                                        <option value="小百岳">小百岳</option>
                                        <option value="百名山">百名山</option>
                                        <option value="百步道">百步道</option>
                                    </select>
                                </div>
                                <div class="list-input">
                                    <input type="text" placeholder="請輸入山岳名稱" v-model="Filters.name">
                                </div>
                            </div>
                            <div class="mountains-list" v-if="isDataLoaded">
                                <div class="mountains-overflow">
                                    <div class="mountains-tb">
                                        <p class="img"></p>
                                        <p class="name">名稱</p>
                                        <p class="area">區域</p>
                                        <p class="site">縣市</p>
                                        <p class="lv">等級</p>
                                        <p class="height">高度</p>
                                        <p class="ap">入園</p>
                                        <p class="am">入山</p>
                                        <p class="trail">步道</p>
                                        <p class="route">路線</p>
                                        <p class="distance">里程</p>
                                        <p class="finish">完登</p>
                                    </div>
                                    <ul>
                                        <li class="mountains-item" v-for="item in displayedItems" :key="item.id">
                                            <NuxtLink :to="'/mountains/' + item.id" :class="{ 'is-finished': item.finish===true }">
                                                <hgroup>
                                                    <figure>
                                                        <span :style="{ 'background-image': 'url(/images/mountains/thumb/' + item.id + '.jpg)' }" v-if="item.img"></span>
                                                        <img src="/images/mountains/default.png" v-else>
                                                    </figure>
                                                    <h2 v-text="item.name"></h2>
                                                    <p class="area" v-text="item.area"></p>
                                                    <p class="site">
                                                        <span v-text="item.county"></span>
                                                        <span v-text="item.town"></span>
                                                    </p>
                                                    <p class="lv" v-text="item.lv"></p>
                                                    <p class="height" v-text="item.height + 'm'"></p>
                                                    <p class="ap">
                                                        <span v-if="item.application_p">●</span>
                                                        <span v-else></span>
                                                    </p>
                                                    <p class="am">
                                                        <span v-if="item.application_m">●</span>
                                                        <span v-else></span>
                                                    </p>
                                                    <p class="trail" v-text="item.trail"></p>
                                                    <p class="route">
                                                        <span class="route-icon r-1" v-if="item.route == '單線來回'"></span>
                                                        <span class="route-icon r-2" v-if="item.route == '環狀Ｏ繞'"></span>
                                                        <span class="route-icon r-3" v-if="item.route == '雙向進出'"></span>
                                                    </p>
                                                    <p class="distance" v-text="item.distance + 'K'"></p>
                                                    <i v-if="item.finish"></i>
                                                </hgroup>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                    <!-- no results -->
                                    <div class="no-results" v-if="displayedItems.length === 0">
                                        <NoResult />
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
    </section>
</template>

<script setup lang="ts">
    /* 調用 NavItemActive.ts */
    NavItemActive(".lnk-mountain");

    /* 定義資料類型 */
    const jsonData = ref([]);
    const jsonDataLength = computed(() => jsonData.value.length);
    const filterOpen = ref(false);
    const Filters = ref({
        name: "",
        county: "",
        tags: "",
    });
    const isDataLoaded = ref(false);

    // 篩選
    const setCounty = (e) => {
        Filters.value.county = e.target.value;
    };

    const setTags = (e) => {
        Filters.value.tags = e.target.value;
    };

    // 預設載入的資料筆數
    const defaultItemCount = 30;

    // 追蹤目前已經載入的資料數量
    const loadedItemCount = ref(defaultItemCount);

    // 計算顯示在頁面上的資料
    const displayedItems = computed(() => {
        // 先過濾資料
        const filteredData = jsonData.value.filter((b) => {
            return (
                b.name.toLowerCase().includes(Filters.value.name.toLowerCase()) &&
                b.county.includes(Filters.value.county) &&
                (Filters.value.tags === "" || b.tags.some(tag => tag.includes(Filters.value.tags)))
            );
        });

        // 再取出前 N 筆資料
        return filteredData.slice(0, loadedItemCount.value);
    });

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

    // Fetch data
    onMounted(async () => {
        await fetchData(jsonData, 'mountainsList');
        isDataLoaded.value = true;
    });
</script>