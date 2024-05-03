export const NavItemActive = (className: string) => {
    // 為 header 項目添加&移除 active
    onMounted(() => {
        const element = document.querySelector(className);
        if (element) {
            element.classList.add("router-link-active");
        }
    });

    onBeforeUnmount(() => {
        const element = document.querySelector(className);
        if (element) {
            element.classList.remove("router-link-active");
        }
    });
};