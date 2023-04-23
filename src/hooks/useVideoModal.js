import { useState } from 'react';
import { createPortal } from 'react-dom';

const useVideoModal = (Modal) => {
    const [isShow, setIsShow] = useState(false);
    const [urlStart, setUrlStart] = useState('/@');

    const handleShowVideoModal = () => {
        document.body.style.overflow = 'hidden';
        setIsShow(true);

        // Location change
        const { pathname, hash, search } = window.location;
        const urlOrigin = pathname + hash + search;
        setUrlStart(urlOrigin);
    };

    const handleHideVideoModal = () => {
        document.body.style.overflow = 'overlay';
        setIsShow(false);
        window.history.replaceState(null, '', urlStart);
    };

    const ModalComponent = () => {
        return isShow && createPortal(<Modal onHideModal={handleHideVideoModal} />, document.body);
    };

    return [ModalComponent, handleShowVideoModal, handleHideVideoModal, isShow];
};

export default useVideoModal;
