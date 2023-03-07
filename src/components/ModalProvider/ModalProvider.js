import { useState, createContext } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);

    const handleShowModal = () => {
        setActive(true);
    };

    const handleHideModal = () => {
        setActive(false);
    };

    const handleUserLogIn = () => {
        setCurrentUser(true);
    };
    const handleUserLogOut = () => {
        setCurrentUser(false);
    };
    const value = {
        currentUser,
        active,
        handleShowModal,
        handleHideModal,
        handleUserLogIn,
        handleUserLogOut,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalContext, ModalProvider };
