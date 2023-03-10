import { useState, createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [changeUserID, setChangeUserID] = useState(false);
    const [videoID, setVideoID] = useState(0);
    const [positionVideo, setPositionVideo] = useState(0);
    const [listVideo, setListVideo] = useState([]);

    const [userData, setUserData] = useState({});
    const location = window.location.pathname;
    useEffect(() => {
        console.log(location);
        setPositionVideo(0);
    }, [location]);

    useEffect(() => {
        setVideoID(listVideo[positionVideo]?.id);
    }, [positionVideo]);

    const handleSetPositionVideo = (position) => {
        setPositionVideo(position);
    };

    const handleSetListVideo = (video) => {
        setListVideo(video);
    };

    const handleShowModal = () => {
        setActive(true);
    };

    const handleHideModal = () => {
        setActive(false);
    };

    const handleHidePlayer = () => {
        //document.body.style.scrollba = 'overlay';
        setShowVideoPlayer(false);
    };

    const handleShowPlayer = () => {
        setShowVideoPlayer(true);
    };

    const handleUserLogIn = () => {
        setCurrentUser(true);
        localStorage.setItem('user-login', JSON.stringify({ state: currentUser }));
    };

    const handleUserLogOut = () => {
        setCurrentUser(false);
    };

    const handleChangePathName = () => {
        setChangeUserID(!changeUserID);
    };

    const handleNotChangePathName = () => {
        setChangeUserID(false);
    };

    const handleSetUserData = (data) => {
        setUserData(data);
        localStorage.setItem('user', JSON.stringify({ data: data.meta.token }));
    };

    const handleGetVideoID = (id) => {
        setShowVideoPlayer(true);
        setVideoID(id);
    };

    const handleSetVideoID = (id) => {
        setVideoID(id);
    };
    const handleNextVideo = () => {
        if (positionVideo >= listVideo.length - 1) {
            setPositionVideo(listVideo.length - 1);
        } else {
            setPositionVideo((prev) => prev + 1);
        }
    };

    const handleBackVideo = () => {
        if (positionVideo <= 0) {
            setPositionVideo(0);
        } else {
            setPositionVideo((prev) => prev - 1);
        }
    };

    console.log('position video: ', positionVideo);
    const value = {
        listVideo,
        positionVideo,
        videoID,
        userData,
        changeUserID,
        currentUser,
        active,
        showVideoPlayer,
        handleShowPlayer,
        handleHidePlayer,
        handleGetVideoID,
        handleSetUserData,
        handleShowModal,
        handleHideModal,
        handleUserLogIn,
        handleUserLogOut,
        handleChangePathName,
        handleNotChangePathName,
        handleSetVideoID,
        handleSetPositionVideo,
        handleSetListVideo,
        handleNextVideo,
        handleBackVideo,
    };
    console.log(userData);
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalContext, ModalProvider };
