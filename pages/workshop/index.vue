<template>
    <section class="pages-wrap page-workshop">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Workshop</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-select">
                        <button></button>
                        <select @change="setType($event)" @click="filterOpen = false">
                            <option value="" selected>全部</option>
                            <option value="js">JavaScript</option>
                            <option value="jquery">jQuery</option>
                            <option value="vue">Vue</option>
                            <option value="css">CSS</option>
                        </select>
                    </div>
                    <div class="list-input">
                        <input type="text" placeholder="請輸入關鍵字" v-model="Filters.title">
                    </div>
                </div>
                <div class="pages-title">
                    <h2>工作坊</h2>
                </div>
                <div class="faq-area">
                    <h2>ＦＡＱ</h2>
                    <ul>
                        <template v-for="item in faqList">
                            <li :key="item.id" v-if="item.isOn">
                                <NuxtLink :to="'/workshop/__faq_' + item.href">
                                    <i class="icon" :class="'icon-' + item.href"></i>
                                    <p v-text="item.programs"></p>
                                </NuxtLink>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="workshop-list" v-if="isDataLoaded">
                    <h2>Plugins</h2>
                    <ul>
                        <li v-for="item in displayedItems" :key="item.id" :class="'is-' + item.class">
                            <NuxtLink :to="'/workshop/_' + item.href" :title="item.title">
                                <figure>
                                    <img :src="'/images/learn/js/plugin/' + item.href + '.png'">
                                </figure>
                                <h2 v-text="item.title"></h2>
                                <h6>
                                    <span class="icon icon-javascript" :class="item.js==true ? 'is-on' : ''"></span>
                                    <span class="icon icon-jquery" :class="item.jquery==true ? 'is-on' : ''"></span>
                                    <span class="icon icon-vue" :class="item.vue==true ? 'is-on' : ''"></span>
                                    <span class="icon icon-css3" :class="item.css==true ? 'is-on' : ''"></span>
                                </h6>
                            </NuxtLink>
                        </li>
                    </ul>
                    <!-- no results -->
                    <div class="no-results" v-if="displayedItems.length === 0">
                        <NoResult />
                    </div>
                </div>
                <div class="list-loading" v-else>
                    <Loading />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    /* 定義資料類型 */
    const jsonData = ref([]);
    const jsonDataLength = computed(() => jsonData.value.length);
    const isActive = ref(1);
    const filterOpen = ref(false);
    const Filters = ref({
        title: "",
        type: "",
    });
    const isDataLoaded = ref(false);
    const faqList = ref([
        { id: 1, programs: "javascript", href:"javascript", isOn: true },
        { id: 2, programs: "jQuery", href:"jquery", isOn: true },
        { id: 3, programs: "Vue", href:"vue", isOn: true },
        { id: 4, programs: "Nuxt", href:"nuxt", isOn: true },
        { id: 5, programs: "NodeJS", href:"nodejs", isOn: true },
        { id: 6, programs: "Yarn", href:"yarn", isOn: false },
        { id: 7, programs: "Git", href:"git", isOn: true },
    ]);
    
    // 篩選
    const setType = (e) => {
        Filters.value.type = e.target.value;
    };

    // 預設載入的資料筆數
    const defaultItemCount = 15;

    // 追蹤目前已經載入的資料數量
    const loadedItemCount = ref(defaultItemCount);

    // 計算顯示在頁面上的資料
    const displayedItems = computed(() => {
        // 先過濾資料
        let filteredData = jsonData.value;
        if (Filters.value.type !== "") {
            // 如果選擇了類型，僅返回相應類型為true的資料
            filteredData = jsonData.value.filter((item) => item[Filters.value.type]);
        }

        // 再過濾搜尋關鍵字
        if (Filters.value.title !== "") {
            filteredData = filteredData.filter((b) =>
                b.title.toLowerCase().includes(Filters.value.title.toLowerCase())
            );
        }

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
        await fetchData(jsonData, 'workshop', true);
        isDataLoaded.value = true;
    });
</script>