export const fetchData = async (jsonData: Ref<any[]>, jsonFileName: string, shouldReverse: boolean = false) => {
    try {
        const response = await fetch(`/js/data/${jsonFileName}.json`);
        // const response = await fetch(`https://itrong.yidas.net/__data/${jsonFileName}.json`);
        const data = await response.json();
        jsonData.value = shouldReverse ? data.reverse() : data;
    } catch (error) {
        console.error('Error:', error);
    }
};