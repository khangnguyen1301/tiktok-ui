import { createContext, useEffect, useState } from 'react';

import { VideoPlayerModal } from '~/components/Modal';
import useVideoModal from '~/hooks/useVideoModal';

export const VideoEnviroment = createContext();

function VideoContext({ children }) {
    const [changeUserID, setChangeUserID] = useState(false);
    const [isChangeState, setIsChangeState] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isComment, setIsComment] = useState(false);
    const [videoID, setVideoID] = useState(0);
    const [positionVideo, setPositionVideo] = useState(0);
    const [listVideo, setListVideo] = useState([]);
    const [volume, setVolume] = useState(0.6);
    const [nickName, setNickName] = useState('');

    const [, showVideoPlayer, hideVideoPlayer, isVideoModalShow] = useVideoModal(VideoPlayerModal);

    useEffect(() => {
        setNickName(listVideo[positionVideo]?.user?.nickname);
        setVideoID(listVideo[positionVideo]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionVideo, videoID, nickName]);

    const handleSetPositionVideo = (position) => {
        setPositionVideo(position);
    };

    const handleSetListVideo = (video) => {
        setListVideo(video);
    };

    const handleChangePathName = () => {
        setChangeUserID(!changeUserID);
    };

    const handleNotChangePathName = () => {
        setChangeUserID(false);
    };

    const handleGetVideoID = (id) => {
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

    const handleChangeState = (state) => {
        setIsChangeState(state);
    };

    const handleStateComment = (state) => {
        setIsComment(state);
    };

    const value = {
        isVideoModalShow,
        showVideoPlayer,
        hideVideoPlayer,
        volume,
        isMuted,
        listVideo,
        positionVideo,
        nickName,
        videoID,
        changeUserID,
        isChangeState,
        isComment,
        handleGetVideoID,
        handleChangePathName,
        handleNotChangePathName,
        handleSetVideoID,
        handleSetPositionVideo,
        handleSetListVideo,
        handleNextVideo,
        handleBackVideo,
        handleMutedVideo,
        handleAdjustVolume,
        handleChangeState,
        handleStateComment,
    };

    return <VideoEnviroment.Provider value={value}>{children}</VideoEnviroment.Provider>;
}

export default VideoContext;
