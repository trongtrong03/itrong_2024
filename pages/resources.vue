<template>
    <section class="pages-wrap page-resources">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Resources</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-select">
                        <button></button>
                        <select @change="setType($event)" @click="filterOpen = false">
                            <option value="" selected>全部</option>
                            <option value="前端工具">前端工具</option>
                            <option value="前端套件">前端套件</option>
                            <option value="影音圖像">影音圖像</option>
                            <option value="設計素材">設計素材</option>
                            <option value="架構規劃">架構規劃</option>
                            <option value="應用程式">應用程式</option>
                            <option value="教學資源">教學資源</option>
                            <option value="ＡＩ生成">ＡＩ生成</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                    <div class="list-input">
                        <input type="text" placeholder="請輸入關鍵字" v-model="Filters.title">
                    </div>
                    <div class="list-sort">
                        <button class="btn-grid" :class="isActive==1 ? 'is-active' : ''" @click="isActive=1"></button>
                        <button class="btn-list" :class="isActive==2 ? 'is-active' : ''" @click="isActive=2"></button>
                    </div>
                </div>
                <div class="pages-title">
                    <h2>推薦資源</h2>
                </div>
                <div class="list-list" :class="isActive==2 ? 'is-list' : 'is-grid'" v-if="isDataLoaded">
                    <ul>
                        <li class="list-item" v-for="(item, index) in displayedItems" :key="index">
                            <figure>
                                <span v-if="item.cover">
                                    <img src="/images/resources/default.jpg" class="background">
                                    <img :src="'/images/resources/' + item.img + '.jpg'" class="forward">
                                </span>
                                <span v-else>
                                    <img src="/images/resources/default.jpg">
                                </span>
                                <figcaption>
                                    <a :href="item.href" class="link" target="_blank"></a>
                                    <a :href="'/' + item.path" class="article" v-if="item.article"></a>
                                </figcaption>
                            </figure>
                            <div class="list-info">
                                <h2 v-text="item.title"></h2>
                                <p v-text="item.desc"></p>
                            </div>
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
    const jsonData = ref([]);
    const isActive = ref(1);
    const filterOpen = ref(false);
    const Filters = ref({
        title: "",
        type: "",
    });
    const isDataLoaded = ref(false);

    // 篩選
    const setType = (e) => {
        Filters.value.type = e.target.value;
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
                b.title.toLowerCase().includes(Filters.value.title.toLowerCase()) &&
                (Filters.value.type === "" || b.type.some(typeVar => typeVar.includes(Filters.value.type)))
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
        await fetchData(jsonData, 'resourceList');
        isDataLoaded.value = true;
    });
</script>