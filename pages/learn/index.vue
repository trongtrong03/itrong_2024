<template>
    <section class="pages-wrap page-learn">
        <PagesBackground />
        <div class="main-center">
            <div class="main-head">
                <h1>Learn</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-select">
                        <button></button>
                        <select @change="setType($event)" @click="filterOpen = false">
                            <option value="" selected>全部({{ jsonData.length }})</option>
                            <template v-for="(count, type) in getTypeCountsSorted()">
                                <option :value="type">{{ typeDisplayMap[type] }} ({{ count }})</option>
                            </template>
                        </select>
                    </div>
                    <div class="list-input">
                        <input type="text" placeholder="請輸入關鍵字" v-model="Filters.title">
                    </div>
                </div>
                <div class="pages-title">
                    <h2>學習筆記</h2>
                </div>
                <div class="list-article" v-if="isDataLoaded">
                    <ul>
                        <li v-for="item in displayedItems" :key="item.id" :class="'is-' + item.class">
                            <NuxtLink :to="'/learn/_' + item.href">
                                <figure></figure>
                                <h2 v-text="item.title"></h2>
                                <time v-text="item.time"></time>
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
    const defaultItemCount = 15;

    // 追蹤目前已經載入的資料數量
    const loadedItemCount = ref(defaultItemCount);

    // 計算顯示在頁面上的資料
    const displayedItems = computed(() => {
        // 先過濾資料
        const filteredData = jsonData.value.filter((b) => {
            return (
                b.title.toLowerCase().includes(Filters.value.title.toLowerCase()) &&
                b.type.includes(Filters.value.type)
            );
        });

        // 排序按照時間
        const sortedData = filteredData.sort((a, b) => {
            // 將時間字符串轉換為日期對象
            const dateA = new Date(a.time);
            const dateB = new Date(b.time);
            // 比較日期
            return dateB - dateA;
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
        await fetchData(jsonData, 'learnList', true);
        isDataLoaded.value = true;
    });

    /* 計算每個 type 的數量並按照特定順序排序 */
    // 將類型名稱映射到顯示名稱的對應表
    const typeDisplayMap = {
        'html': 'HTML',
        'css': 'CSS',
        'javascript': 'JavaScript',
        'design': '設計相關',
        'develop': '開發工具',
        'others': '其他'
    };

    const getTypeCountsSorted = () => {
        const typeCounts = {};
        jsonData.value.forEach(item => {
            typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
        });

        // 依據顯示名稱的映射表順序排序
        const sortedTypeCounts = {};
        Object.keys(typeDisplayMap).forEach(key => {
            if (typeCounts[key]) {
                sortedTypeCounts[key] = typeCounts[key];
            }
        });
        return sortedTypeCounts;
    };
</script>