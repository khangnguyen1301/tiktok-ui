import { useState } from 'react';
import { createPortal } from 'react-dom';

const useModal = (Modal) => {
    const [changeFile, setChangeFile] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const handleShowModal = () => {
        document.body.style.overflow = 'hidden';
        setIsShow(true);
    };

    const handleHideModal = () => {
        document.body.style.overflow = 'overlay';
        setIsShow(false);
    };

    const handleChangeFile = (state) => {
        setChangeFile(state);
        handleHideModal();
    };
    const ModalComponent = () => {
        return (
            isShow &&
            createPortal(<Modal onHideModal={handleHideModal} onChangeFile={handleChangeFile} />, document.body)
        );
    };

    return [ModalComponent, handleShowModal, isShow, handleHideModal, changeFile, handleChangeFile];
};

export default useModal;
