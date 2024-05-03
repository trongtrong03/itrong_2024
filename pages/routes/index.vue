<template>
    <section class="pages-wrap page-hikingbook">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Hiking Book</h1>
            </div>
            <div class="hikingbook-wrap">
                <HikingbookNav :propHikingbookValue="2" />
                <div class="hikingbook-inside">
                    <div class="hikingbook-block hikingbook-mountains">
                        <div class="pages-title">
                            <h2>路線彙整</h2>
                        </div>
                        <div class="hikingbook-tips">
                            <p>目前已蒐集 {{ jsonDataLength }} 筆資料</p>
                        </div>
                        <div class="list-wrap">
                            <div class="list-tools">
                                <div class="list-select">
                                    <button></button>
                                    <select @change="setLevel($event)" @click="filterOpen = false">
                                        <option value="">全部等級</option>
                                        <option value="郊山">郊山</option>
                                        <option value="中級山">中級山</option>
                                        <option value="高山">高山</option>
                                        <option value="進階探勘">進階探勘</option>
                                    </select>
                                </div>
                                <div class="list-select">
                                    <button class="btn-km"></button>
                                    <select @change="setLength($event)" @click="filterOpen = false">
                                        <option value="">全部長度</option>
                                        <option value="10">10K以下</option>
                                        <option value="20">11 ~ 20K</option>
                                        <option value="30">21 ~ 30K</option>
                                        <option value="40">31 ~ 40K</option>
                                        <option value="50">41 ~ 50K</option>
                                        <option value="60">51 ~ 60K</option>
                                        <option value="70">61 ~ 70K</option>
                                        <option value="80">71 ~ 80K</option>
                                        <option value="90">81K以上</option>
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
                                        <p class="area2">縣市</p>
                                        <p class="lv2">等級</p>
                                        <p class="ap">入園</p>
                                        <p class="am">入山</p>
                                        <p class="trail">步道</p>
                                        <p class="route">路線</p>
                                        <p class="distance">里程</p>
                                        <p class="finish">完登</p>
                                    </div>
                                    <ul>
                                        <li class="mountains-item" v-for="item in displayedItems" :key="item.id">
                                            <NuxtLink :to="'/routes/' + item.id" :class="{ 'is-finished': item.finish===true }">
                                                <hgroup>
                                                    <figure>
                                                        <span :style="{ 'background-image': 'url(/images/routes/thumb/' + item.id + '.jpg)' }" v-if="item.img"></span>
                                                        <img src="/images/routes/default.png" v-else>
                                                    </figure>
                                                    <h2 v-text="item.name"></h2>
                                                    <p class="area2">
                                                        <span v-text="item.area"></span>
                                                    </p>
                                                    <p class="lv2" v-text="item.lv"></p>
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
                                                    <p class="distance" v-text="item.length + 'K'"></p>
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
        lv: "",
        length: "",
    });
    const isDataLoaded = ref(false);
    
    // 篩選
    const setLevel = (e) => {
        Filters.value.lv = e.target.value;
    };

    const setLength = (e) => {
        Filters.value.length = e.target.value;
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
                b.lv.includes(Filters.value.lv) &&
                b.length.includes(Filters.value.length)
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
        await fetchData(jsonData, 'mountainsRoutes');
        isDataLoaded.value = true;
    });
</script>