import classNames from 'classnames/bind';
import { BackIcon, CloseIcon, GhimIcon, NextIcon, ReloadIcon } from '~/components/Icons';

import styles from './VideoSticky.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

const cx = classNames.bind(styles);

function VideoSticky({
    data,
    playerPlayed,
    currentTime,
    stickyPlayed,
    onLoad,
    isChangeVideo,
    playerLoaded,
    activeSticky,
}) {
    const [isPlayed, setIsPlayed] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [reload, setReload] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const videoRef = useRef();

    const videoContext = useContext(VideoEnviroment);

    useEffect(() => {
        const synchronized = playerPlayed === isPlayed;
        if ((isPlayed && playerPlayed) || synchronized || reload || playerLoaded || isChangeVideo) {
            videoRef.current.play();
            setIsEnded(false);
            setReload(false);
            onLoad(false);
        } else {
            videoRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlayed, playerPlayed, reload, playerLoaded, isChangeVideo]);

    useEffect(() => {
        videoRef.current.currentTime = currentTime;
        isEnded && setIsPlayed(true);
        setIsEnded(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime]);

    useEffect(() => {
        setIsPlayed(true);
        stickyPlayed(true);
        setIsEnded(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.videoID]);

    useEffect(() => {
        activeSticky && setIsClose(false);
    }, [activeSticky]);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePlayVideo = () => {
        setIsPlayed(!isPlayed);
        stickyPlayed(!isPlayed);
    };

    const handleVideoEnded = () => {
        setIsEnded(true);
        setIsPlayed(true);
        stickyPlayed(true);
    };

    const handleReload = () => {
        setReload(true);
        onLoad(true);
    };

    const handleBackVideo = () => {
        videoContext.handleBackVideo();
        videoContext.handleChangeState(true);
    };

    const handleNextVideo = () => {
        videoContext.handleNextVideo();
        videoContext.handleChangeState(true);
    };

    return (
        <div
            className={cx('wrapper', { activeSticky: activeSticky & !isClose })}
            style={
                data?.meta?.video?.resolution_x > data?.meta?.video?.resolution_y
                    ? { width: '350px', height: '197px' }
                    : { width: '197px', height: '350px' }
            }
        >
            <div className={cx('container')}>
                <div className={cx('thumb-image')}>
                    <img src={data?.thumb_url} alt={data.user?.nickname} />
                </div>
                <div className={cx('mask')}></div>
                <div className={cx('video')}>
                    <video src={data.file_url} muted autoPlay ref={videoRef} onEnded={handleVideoEnded} />
                </div>
                <div className={cx('ghim-top', { show: isEnded })} onClick={handleScrollToTop}>
                    <GhimIcon />
                </div>
                <div className={cx('close-sticky', { show: isEnded })} onClick={() => setIsClose(true)}>
                    <CloseIcon />
                </div>
                <div className={cx('controls', { show: isEnded })}>
                    <div
                        className={cx('back-btn', { hide: videoContext.positionVideo === 0 })}
                        onClick={handleBackVideo}
                    >
                        <BackIcon />
                    </div>
                    <div className={cx('state-btn')}>
                        {isEnded ? (
                            <div className={cx('reload-icon')} onClick={handleReload}>
                                <ReloadIcon width="3.2rem" height="3.2rem" />
                            </div>
                        ) : isPlayed === playerPlayed ? (
                            <div className={cx('pause-btn')} onClick={handlePlayVideo}>
                                <FontAwesomeIcon icon={faPause} />
                            </div>
                        ) : (
                            <div className={cx('play-btn')} onClick={handlePlayVideo}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        )}
                    </div>
                    <div className={cx('next-btn')} onClick={handleNextVideo}>
                        <NextIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoSticky;
