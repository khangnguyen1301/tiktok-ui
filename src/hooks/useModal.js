import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    console.log(isShowing);
    const toggle = () => {
        setIsShowing(!isShowing);
    };

    return {
        isShowing,
        toggle,
    };
};

export default useModal;
