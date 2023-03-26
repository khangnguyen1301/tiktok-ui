import { DEFAULT_USER_INFO } from '~/contants/contants';

function useLocalStorage() {
    const setDataLocalStorage = (key, data = {}) => {
        const dataLocalStorage = JSON.stringify(data);
        localStorage.setItem(key, dataLocalStorage);
    };

    const getDataLocalStorage = (key) => {
        const data = JSON.parse(localStorage.getItem(key)) ?? DEFAULT_USER_INFO;
        return data;
    };

    return {
        setDataLocalStorage,
        getDataLocalStorage,
    };
}

export default useLocalStorage;
