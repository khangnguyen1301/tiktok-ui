import { createContext } from 'react';
import { FormModal, UpdateProfileModal, ConfirmModal } from '~/components/Modal';
import { useModal } from '~/hooks';

export const ModalEnviroment = createContext();

function ModalContext({ children }) {
    const [LoginModal, showLoginModal, isFormModalShow] = useModal(FormModal);
    const [UpdateProFileModal, showUpdateModal] = useModal(UpdateProfileModal);
    const [ConFirmModal, showConFirmModal, isConFirmShow, hideConFirmModal, isChangeFile, handleChangeFile] =
        useModal(ConfirmModal);

    const value = {
        isFormModalShow,
        isConFirmShow,
        isChangeFile,
        showLoginModal,
        showUpdateModal,
        showConFirmModal,
        hideConFirmModal,
        handleChangeFile,
    };

    return (
        <ModalEnviroment.Provider value={value}>
            {children}
            <LoginModal />
            <UpdateProFileModal />
            <ConFirmModal />
        </ModalEnviroment.Provider>
    );
}

export default ModalContext;
