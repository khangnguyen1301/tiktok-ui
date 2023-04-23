function useLocalStorage() {
    const setDataLocalStorage = (key, data = {}) => {
        const dataLocalStorage = JSON.stringify(data);
        localStorage.setItem(key, dataLocalStorage);
    };

    const getDataLocalStorage = (key) => {
        const data = JSON.parse(localStorage.getItem(key));
        return data;
    };

    return {
        setDataLocalStorage,
        getDataLocalStorage,
    };
}

export default useLocalStorage;
