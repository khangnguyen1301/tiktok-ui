import { createContext } from 'react';
import { FormModal, UpdateProfileModal } from '~/components/Modal';
import { useLocalStorage, useModal } from '~/hooks';

export const ModalEnviroment = createContext();

function ModalContext({ children }) {
    const { setDataLocalStorage } = useLocalStorage();
    const [LoginModal, showLoginModal, isFormModalShow] = useModal(FormModal);
    const [UpdateProFileModal, showUpdateModal] = useModal(UpdateProfileModal);

    const handleUserLogIn = () => {
        setDataLocalStorage('user-login', { state: true });
    };

    const handleSetUserData = (data) => {
        setDataLocalStorage('user', { data: data.meta.token });
        setDataLocalStorage('user-info', {
            data: {
                avatar: data.data.avatar,
                firstName: data.data.first_name,
                lastName: data.data.last_name,
                nickName: data.data.nickname,
                id: data.data.id,
                tick: data.data.tick,
            },
        });
    };

    const value = {
        isFormModalShow,
        showLoginModal,
        showUpdateModal,
        handleUserLogIn,
        handleSetUserData,
    };

    return (
        <ModalEnviroment.Provider value={value}>
            {children}
            <LoginModal />
            <UpdateProFileModal />
        </ModalEnviroment.Provider>
    );
}

export default ModalContext;
