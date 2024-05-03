<template>
    <section class="mountains-wrap">
        <div class="mountains-container">
            <div class="mountains-content">
                <div class="mountains-info">
                    <h1 v-text="getIndex(postID).name"></h1>
                    <h6 v-text="getIndex(postID).intro"></h6>
                    <figure v-if="postID && getIndex(postID).id">
                        <span :style="{ 'background-image': 'url(/images/routes/' + getIndex(postID).id + '.jpg)' }" v-if="getIndex(postID).img"></span>
                    </figure>
                    <div class="routes-list">
                        <div class="routes-item" v-for="(item, index) in 31" :key="index">
                            <div class="routes-box" v-if="getIndex(postID)['p'+index+'_state']">
                                <b :class="getIndex(postID)['p'+index+'_type'] == 'start' ? 'is-start' : getIndex(postID)['p'+index+'_type'] == 'house' ? 'is-house' : getIndex(postID)['p'+index+'_type'] == 'moutain' ? 'is-moutain' : getIndex(postID)['p'+index+'_type'] == 'lake' ? 'is-lake' : getIndex(postID)['p'+index+'_type'] == 'camp' ? 'is-camp' : getIndex(postID)['p'+index+'_type'] == 'mark' ? 'is-mark' : getIndex(postID)['p'+index+'_type'] == 'nature' ? 'is-nature' : getIndex(postID)['p'+index+'_type'] == 'goal' ? 'is-goal' : ''"></b>
                                <p v-text="getIndex(postID)['p'+index+'_name']"></p>
                                <span v-text="getIndex(postID)['p'+index+'_tag']"></span>
                            </div>
                        </div>
                    </div>
                    <hgroup>
                        <ul>
                            <li>
                                <span>別名</span>
                                <span v-text="getIndex(postID).anotherName"></span>
                            </li>
                            <li>
                                <span>等級</span>
                                <span v-if="getIndex(postID).lv == '郊山'">郊山</span>
                                <span v-if="getIndex(postID).lv == '中級山'">中級山</span>
                                <span v-if="getIndex(postID).lv == '高山'">高山</span>
                                <span v-if="getIndex(postID).lv == '進階探勘'">進階探勘</span>
                            </li>
                            <li>
                                <span>縣市</span>
                                <span v-text="getIndex(postID).area"></span>
                            </li>
                            <li>
                                <span>山脈</span>
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
                                <span>出發</span>
                                <span v-text="getIndex(postID).start"></span>
                            </li>
                            <li>
                                <span>路線</span>
                                <span v-text="getIndex(postID).route"></span>
                            </li>
                            <li>
                                <span>GPX</span>
                                <span v-if="getIndex(postID).gpx1_state">
                                    <a :href="getIndex(postID).gpx1_link" target="_blank">軌跡連結1</a>
                                </span>
                                <span v-if="getIndex(postID).gpx2_state">
                                    <a :href="getIndex(postID).gpx2_link" target="_blank">軌跡連結2</a>
                                </span>
                                <span v-if="getIndex(postID).gpx3_state">
                                    <a :href="getIndex(postID).gpx3_link" target="_blank">軌跡連結3</a>
                                </span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>里程</span>
                                <span v-if="getIndex(postID).length == '10'">10K以下</span>
                                <span v-if="getIndex(postID).length == '20'">11 ~ 20K</span>
                                <span v-if="getIndex(postID).length == '30'">21 ~ 30K</span>
                                <span v-if="getIndex(postID).length == '40'">31 ~ 40K</span>
                                <span v-if="getIndex(postID).length == '50'">41 ~ 50K</span>
                                <span v-if="getIndex(postID).length == '60'">51 ~ 60K</span>
                                <span v-if="getIndex(postID).length == '70'">61 ~ 70K</span>
                                <span v-if="getIndex(postID).length == '80'">71 ~ 80K</span>
                                <span v-if="getIndex(postID).length == '90'">81K以上</span>
                            </li>
                            <li>
                                <span>天數</span>
                                <span v-if="getIndex(postID).daytime == '1'">可當日往返</span>
                                <span v-if="getIndex(postID).daytime == '2'">至少2日</span>
                                <span v-if="getIndex(postID).daytime == '3'">至少3日</span>
                                <span v-if="getIndex(postID).daytime == '4'">至少4日</span>
                                <span v-if="getIndex(postID).daytime == '5'">至少5日</span>
                                <span v-if="getIndex(postID).daytime == '6'">6日以上</span>
                            </li>
                            <li v-if="getIndex(postID).d1_state">
                                <span>DAY1</span>
                                <span v-text="getIndex(postID).d1_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d2_state">
                                <span>DAY2</span>
                                <span v-text="getIndex(postID).d2_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d3_state">
                                <span>DAY3</span>
                                <span v-text="getIndex(postID).d3_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d4_state">
                                <span>DAY4</span>
                                <span v-text="getIndex(postID).d4_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d5_state">
                                <span>DAY5</span>
                                <span v-text="getIndex(postID).d5_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d6_state">
                                <span>DAY6</span>
                                <span v-text="getIndex(postID).d6_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d7_state">
                                <span>DAY7</span>
                                <span v-text="getIndex(postID).d7_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d8_state">
                                <span>DAY8</span>
                                <span v-text="getIndex(postID).d8_route"></span>
                            </li>
                            <li v-if="getIndex(postID).d9_state">
                                <span>DAY9</span>
                                <span v-text="getIndex(postID).d9_route"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>通訊</span>
                                <span v-text="getIndex(postID).communication"></span>
                            </li>
                            <li>
                                <span>水源</span>
                                <span v-text="getIndex(postID).water"></span>
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
                                    <a :href="getIndex(postID).aLink" target="_blank" v-text="getIndex(postID).article"></a>
                                </span>
                            </li>
                        </ul>
                    </hgroup>
                </div>
                <div class="main-bottom">
                    <NuxtLink to="/routes">返回</NuxtLink>
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
        await fetchData(jsonData, 'mountainsRoutes');
    });

    // 建立一個方法來取得資料數據
    const getIndex = (id) => {
        return jsonData.value.find(item => item.id === id) || {};
    };
</script>
  