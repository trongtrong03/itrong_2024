// search on
export const useSearch = () => {
    const searchOn = ref(false);
    const searchToggleActive = () => {
        searchOn.value = !searchOn.value;
    };
  
    return { searchOn, searchToggleActive };
};

// search function
export const createFilterSearch = (jsonData: Ref<[]>, query: Ref<string>) => {
    return computed(() => {
        return jsonData.value.filter((item) => {
            return item.title.toLowerCase().indexOf(query.value.toLowerCase()) !== -1;
        });
    });
};