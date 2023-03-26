import { useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = (Modal) => {
    const [isShow, setIsShow] = useState(false);

    const handleShowModal = () => {
        document.body.style.overflow = 'hidden';
        setIsShow(true);
    };

    const handleHideModal = () => {
        document.body.style.overflow = 'overlay';
        setIsShow(false);
    };

    const ModalComponent = () => {
        return isShow && createPortal(<Modal onHideModal={handleHideModal} />, document.body);
    };

    return [ModalComponent, handleShowModal, isShow];
};

export default useModal;
