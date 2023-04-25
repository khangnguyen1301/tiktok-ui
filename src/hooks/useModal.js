import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { resetLogin, resetRegister } from '~/redux/authSlice';

const useModal = (Modal) => {
    const [changeFile, setChangeFile] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const videoContext = useContext(VideoEnviroment);
    const dispatch = useDispatch();

    const handleShowModal = () => {
        document.body.style.overflow = 'hidden';
        setIsShow(true);
        dispatch(resetRegister());
        dispatch(resetLogin());
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
