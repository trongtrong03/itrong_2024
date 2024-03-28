<template>
    <hgroup class="text-heading">
        <ul v-if="fileType == 'mountainsLogs'">
            <li v-for="(tag, index) in getIndex({ jsonData, index: jsonData.length-propValue }).tags" :key="index">{{ tag }}</li>
        </ul>
        <time v-text="getIndex({ jsonData, index: jsonData.length-propValue }).time"></time>
        <h1 v-text="getIndex({ jsonData, index: jsonData.length-propValue }).title"></h1>
    </hgroup>
</template>

<script setup lang="ts">
    // 使用 props 來傳入各個模板的值
    const props = defineProps({
        propValue: {
            type: Number,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
    });

    const jsonData = ref([]);

    const getIndex = ({ jsonData = [], index = 0 }) => {
        return jsonData[index] || {};
    };

    // Fetch data
    onMounted(async () => {
        await fetchData(jsonData, `${props.fileType}`, true);
    });
</script>
