import { useState, createContext, useEffect } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [active, setActive] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [changeUserID, setChangeUserID] = useState(false);
    const [videoID, setVideoID] = useState(0);
    const [positionVideo, setPositionVideo] = useState(0);
    const [listVideo, setListVideo] = useState([]);
    const [isMuted, setIsMuted] = useState(true);

    const [volume, setVolume] = useState(0.6);
    const [prevVolume, setPrevVolume] = useState(volume);

    const [userData, setUserData] = useState({});
    const location = window.location.pathname;
    useEffect(() => {
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
        document.body.style.overflow = 'overlay';
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

    const handleMutedVideo = () => {
        setIsMuted(!isMuted);
        setVolume(0.6);
    };

    const handleAdjustVolume = (e) => {
        let value = e.target.value / 100;
        setIsMuted(!value > 0);
        setVolume(value);
    };

    const value = {
        volume,
        isMuted,
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
        handleMutedVideo,
        handleAdjustVolume,
    };
    console.log(userData);
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export { ModalContext, ModalProvider };
