<template>
    <section class="mountains-wrap">
        <div class="mountains-container">
            <div class="mountains-content">
                <div class="mountains-info">
                    <h1 v-text="getIndex(postID).name"></h1>
                    <h6 v-text="getIndex(postID).intro"></h6>
                    <figure v-if="postID && getIndex(postID).id">
                        <span :style="{ 'background-image': 'url(/images/mountains/' + getIndex(postID).id + '.jpg)' }" v-if="getIndex(postID).img"></span>
                    </figure>
                    <hgroup>
                        <ul>
                            <li>
                                <span>別名</span>
                                <span v-text="getIndex(postID).anotherName"></span>
                            </li>
                            <li>
                                <span>高度</span>
                                <span v-text="getIndex(postID).height + 'm'"></span>
                            </li>
                            <li>
                                <span>縣市</span>
                                <span v-text="getIndex(postID).county + ' ' + getIndex(postID).town"></span>
                            </li>
                            <li>
                                <span>頭銜</span>
                                <span v-text="getIndex(postID).title"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>等級</span>
                                <span v-text="getIndex(postID).lv"></span>
                            </li>
                            <li>
                                <span>山系</span>
                                <span v-text="getIndex(postID).mts"></span>
                            </li>
                            <li>
                                <span>園區</span>
                                <span v-text="getIndex(postID).nPark"></span>
                            </li>
                            <li>
                                <span>入園</span>
                                <span v-if="getIndex(postID).application_p">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>
                                <span>入山</span>
                                <span v-if="getIndex(postID).application_m">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>步道</span>
                                <span v-text="getIndex(postID).trail"></span>
                            </li>
                            <li>
                                <span>起登</span>
                                <span v-text="getIndex(postID).start"></span>
                            </li>
                            <li>
                                <span>路線</span>
                                <span v-text="getIndex(postID).route"></span>
                            </li>
                            <li>
                                <span>里程</span>
                                <span v-text="'約 ' + getIndex(postID).distance + ' K'"></span>
                            </li>
                            <li>
                                <span>天數</span>
                                <span v-text="getIndex(postID).day"></span>
                            </li>
                            <li>
                                <span>GPX</span>
                                <span>
                                    <a :href="getIndex(postID).gpx" target="_blank">軌跡連結</a>
                                </span>
                            </li>
                            <li>
                                <span>備註</span>
                                <span v-text="getIndex(postID).notes"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>首登</span>
                                <span v-text="getIndex(postID).fDate"></span>
                            </li>
                            <li>
                                <span>心得</span>
                                <span>
                                    <a class="article" :href="getIndex(postID).aLink" target="_blank" v-text="getIndex(postID).article"></a>
                                </span>
                            </li>
                        </ul>
                    </hgroup>
                </div>
                <div class="main-bottom">
                    <NuxtLink to="/mountains">返回</NuxtLink>
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
    const postID = ref(null);

    // 取得路由傳參
    const route = useRoute();
    postID.value = route.params.id;

    // mounted
    onMounted(async () => {
        await fetchData(jsonData, 'mountainsList');
    });

    // 建立一個方法來取得資料數據
    const getIndex = (id) => {
        return jsonData.value.find(item => item.id === id) || {};
    };
</script>