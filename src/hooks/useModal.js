import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

const useModal = (Modal) => {
    const [changeFile, setChangeFile] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const videoContext = useContext(VideoEnviroment);

    const handleShowModal = () => {
        document.body.style.overflow = 'hidden';
        setIsShow(true);
    };

    const handleHideModal = () => {
        document.body.style.overflow = videoContext?.isVideoModalShow ? 'hidden' : 'overlay';
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
