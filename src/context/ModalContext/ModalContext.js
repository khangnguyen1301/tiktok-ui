import { createContext } from 'react';
import {
    FormModal,
    UpdateProfileModal,
    ConfirmModal,
    DownloadMobileModal,
    KeyboardModal,
    NotificationModal,
} from '~/components/Modal';
import { useModal } from '~/hooks';

export const ModalEnviroment = createContext();

function ModalContext({ children }) {
    const [LoginModal, showLoginModal, isFormModalShow] = useModal(FormModal);
    const [UpdateProFileModal, showUpdateModal] = useModal(UpdateProfileModal);
    const [ConFirmModal, showConFirmModal, isConFirmShow, hideConFirmModal, isChangeFile, handleChangeFile] =
        useModal(ConfirmModal);
    const [DownLoadMobileModal, showDownLoadMobileModal] = useModal(DownloadMobileModal);
    const [KeyBoardModal, showKeyBoardModal] = useModal(KeyboardModal);
    const [NotifiCationModal, showNotifiCationModal, isShowNotifiCation, hideNotifiModal] = useModal(NotificationModal);

    const value = {
        isFormModalShow,
        isConFirmShow,
        isChangeFile,
        isShowNotifiCation,
        showLoginModal,
        showUpdateModal,
        showConFirmModal,
        showDownLoadMobileModal,
        showKeyBoardModal,
        showNotifiCationModal,
        hideConFirmModal,
        hideNotifiModal,
        handleChangeFile,
    };

    return (
        <ModalEnviroment.Provider value={value}>
            {children}
            <LoginModal />
            <UpdateProFileModal />
            <ConFirmModal />
            <DownLoadMobileModal />
            <KeyBoardModal />
            <NotifiCationModal />
        </ModalEnviroment.Provider>
    );
}

export default ModalContext;
