import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import TippyHeadless from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import images from '~/assets/images';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ShareIcon,
    CommentIcon,
    VolumeIcon,
    ThreeDotIcon,
    HashTagMusicIcon,
    ReloadIcon,
    CheckIcon,
    VolumeMutedIcon,
    ChevronLeftIcon,
    PlayIcon,
} from '~/components/Icons';

import styles from './VideoPlayer.module.scss';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { useCalculator } from '~/hooks';
import Likes from '~/components/Likes';
import { useDispatch, useSelector } from 'react-redux';
import { hanldeChangeCurrentTime } from '~/redux/videoSlice';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);

const SPEED_ITEM = [
    {
        title: '0.75x',
        selected: false,
        speed: 0.75,
    },
    {
        title: '1.0x',
        selected: true,
        speed: 1,
    },
    {
        title: '1.25x',
        selected: false,
        speed: 1.25,
    },
    {
        title: '1.5x',
        selected: false,
        speed: 1.5,
    },
    {
        title: '2.0x',
        selected: false,
        speed: 2,
    },
];

function VideoPlayer({ data, listVideo, onPlayed, onUpdateTime, stickyPlayed, onLoad, stickyLoaded, activeSticky }) {
    const [suggestVideo, setSuggestVideo] = useState([]);
    const [isTurnAround, setIsTurnAround] = useState(false);
    const [isPlayed, setIsPlayed] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [reload, setReload] = useState(false);
    const [visibleVolume, setVisibleVolume] = useState(false);
    const [holdVolumeBar, setHoldVolumeBar] = useState(false);
    const [isChangeVideo, setIsChangeVideo] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(0);
    const [defaultSpeed, setDefaultSpeed] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [prevVolume, setPrevVolume] = useState(0.6);
    const [speedItem, setSpeedItem] = useState(SPEED_ITEM);
    const videoRef = useRef();
    const selectorRef = useRef();
    const inputRef = useRef();
    const timeRef = useRef();
    const timeLineRef = useRef();

    const dispatch = useDispatch();

    const { showLoginModal } = useContext(ModalEnviroment);

    const isLogin = useSelector((state) => state.auth?.login?.isLogin);

    const [currentMinutes, currentSeconds] = useCalculator(+currentTime);
    const [durationMinutes, durationSeconds] = useCalculator(data?.meta?.playtime_seconds);
    const videoContext = useContext(VideoEnviroment);

    useEffect(() => {
        if (listVideo) {
            const [, firstVideo, secondVideo] = listVideo;
            setSuggestVideo([firstVideo, secondVideo]);
        }
        //videoContext.handleSetVideoID(0);
    }, [listVideo]);

    useEffect(() => {
        const nickName = videoContext.nickName;
        const videoID = videoContext.videoID;
        timeRef.current.value = 0;
        timeLineRef.current.style.width = `0%`;
        if (isChangeVideo || videoContext.isChangeState) {
            window.history.replaceState(null, '', `/@${nickName ?? ''}/video/${videoID}`);
            setIsEnded(false);
        }
        setIsPlayed(true);
        onPlayed(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.videoID, videoContext.nickName, isChangeVideo]);

    useEffect(() => {
        const synchronized = stickyPlayed === isPlayed;
        if ((isPlayed && stickyPlayed) || synchronized || reload || stickyLoaded) {
            setTimeout(() => {
                videoRef.current.play();
            }, 150);
            setIsEnded(false);
            setReload(false);
            onLoad(false);
        } else {
            videoRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlayed, stickyPlayed, reload, stickyLoaded]);

    useEffect(() => {
        videoRef.current.playbackRate = defaultSpeed;
        videoRef.current.volume = currentVolume;
        selectorRef.current.style.width = `${videoRef.current.volume * 100}%`;
        timeRef.current.value = currentTime;
        onUpdateTime(currentTime);
        handleTimeLine();
        setIsChangeVideo(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, currentVolume]);

    const handleChangeCurrentTimeVideo = (e) => {
        handleCurrentTime(e.target.value);
        onUpdateTime(e.target.value);
        isEnded && handleReloadVideo();
        dispatch(hanldeChangeCurrentTime());
    };

    const handlePlayVideo = () => {
        onPlayed(!isPlayed);
        setIsPlayed(!isPlayed);
    };

    const handleVideoEnded = () => {
        // if (isChangeVideo) {
        //     setIsChangeVideo(false);
        // } else {
        setIsEnded(true);
        setIsPlayed(true);
        onPlayed(true);
        isChangeVideo ? setIsEnded(false) : setIsEnded(true);
        // }
    };

    const handleReloadVideo = () => {
        setReload(true);
        onLoad(true);
    };

    const handleAdjustVolume = (e) => {
        let volume = e.target.value / 100;
        setIsMuted(volume === 0 ? true : false);
        setCurrentVolume(volume);
        setPrevVolume(volume);
        inputRef.current.value = e.target.value;
    };

    const handleMutedVolume = () => {
        setIsMuted(!isMuted);
        setCurrentVolume(!isMuted ? 0 : prevVolume);
    };

    const handleShowVolumeBar = () => {
        setVisibleVolume(true);
        setHoldVolumeBar(true);
    };
    const handleHideVolumeBar = () => {
        setVisibleVolume(false);
        setHoldVolumeBar(false);
    };

    const handleTimeLine = () => {
        timeLineRef.current.style.width = `${(timeRef.current.value / timeRef.current.max) * 100}%`;
    };

    const handleCurrentTime = (value) => {
        videoRef.current.currentTime = value;
        if (isEnded) {
            setIsPlayed(true);
            handleReloadVideo();
        } else {
            return;
        }
    };

    const handleNextVideo = () => {
        if (videoContext.videoID === 0) {
            videoContext.handleSetVideoID(listVideo[0].id);
            setIsChangeVideo(true);
        } else {
            videoContext.handleNextVideo();
            setIsChangeVideo(true);
        }
    };

    const handleBackVideo = () => {
        videoContext.handleBackVideo();
        setIsChangeVideo(true);
    };

    const handleSetSpeed = (item, position) => {
        const newItem = [];
        speedItem.forEach((item, index) => {
            if (index === position) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            newItem.push(item);
        });
        setSpeedItem(newItem);
        setDefaultSpeed(item.speed);
        videoRef.current.playbackRate = item.speed;
    };

    const handleBackSuggest = () => {
        const [, firstVideo, secondVideo] = listVideo;
        setSuggestVideo([firstVideo, secondVideo]);
    };

    const handleNextSuggest = () => {
        const [, , firstVideo, secondVideo] = listVideo;
        setSuggestVideo([firstVideo, secondVideo]);
        setIsTurnAround(true);
    };

    const handleNextTurnAround = () => {
        const [firstVideo, , secondVideo] = listVideo;
        setSuggestVideo([firstVideo, secondVideo].reverse());
        setIsTurnAround(false);
    };

    const handleSelectedSuggest = (id) => {
        const positionVideo = listVideo.findIndex((item) => suggestVideo[id].id === item.id);
        videoContext.handleSetPositionVideo(positionVideo);
        videoContext.handleSetVideoID(suggestVideo[id].id);
        videoContext.handleChangeState(true);
    };

    const handleSetTimeVideo = (current) => {
        setCurrentTime(current);
    };

    const renderSpeedView = (attrs) => (
        <div className={cx('speed-view')} tabIndex="-1" {...attrs}>
            {speedItem.map((item, index) => (
                <div className={cx('speed-view-item')} key={index}>
                    <div className={cx('speed-view-title')} onClick={() => handleSetSpeed(item, index)}>
                        <div className={cx('speed-view-check')}>
                            {item.selected && <CheckIcon width="1.6rem" height="1.6rem" />}
                        </div>
                        <span>{item.title}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={cx('videoplayer-wrapper')}>
            <div className={cx('videoplayer-container')}>
                <div className={cx('mask')}></div>
                <div className={cx('thumbnail')}>
                    <img src={data?.thumb_url} alt={data?.user?.nickname} />
                </div>
                <div className={cx('video')} onClick={isEnded ? handleReloadVideo : handlePlayVideo}>
                    <video
                        src={data?.file_url}
                        autoPlay
                        onEnded={() => handleVideoEnded()}
                        onTimeUpdate={() => handleSetTimeVideo(videoRef.current.currentTime.toFixed(0))}
                        ref={videoRef}
                    />
                </div>
                {isEnded && currentTime === videoRef.current.duration.toFixed(0) && (
                    <div className={cx('end-background')}>
                        <div className={cx('back-btn')} onClick={handleBackSuggest}>
                            <ChevronLeftIcon width="3.2rem" height="3.2rem" />
                        </div>
                        {suggestVideo.map((video, index) => (
                            <div
                                className={cx('video-card')}
                                key={video?.id}
                                onClick={() => handleSelectedSuggest(index)}
                            >
                                <img src={video?.thumb_url} alt={video?.user?.nickName} />
                                <div className={cx('caption')}>{video?.description}</div>
                                <div className={cx('view-count')}>
                                    <PlayIcon width="2rem" height="2rem" />
                                    <span>{video?.views_count}</span>
                                </div>
                                <div className={cx('play-icon')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div
                            className={cx('next-btn')}
                            onClick={isTurnAround ? handleNextTurnAround : handleNextSuggest}
                        >
                            <ChevronLeftIcon width="3.2rem" height="3.2rem" />
                        </div>
                    </div>
                )}
                {activeSticky && <div className={cx('mask-overscroll')}></div>}
                {/* right-bar */}
                {/* <div className={cx('button-container')}> */}
                <div className={cx('backButton-container')}>
                    <button
                        className={cx('back-button', { disabled: videoContext.positionVideo === 0 })}
                        onClick={handleBackVideo}
                        disabled={videoContext.positionVideo === 0}
                    >
                        <ChevronUpIcon />
                    </button>
                </div>
                <div className={cx('nextButton-container')}>
                    <button className={cx('next-button')} onClick={handleNextVideo}>
                        <ChevronDownIcon />
                    </button>
                </div>
                {/* </div> */}

                <div className={cx('heart-icon')}>
                    <Likes data={data} width="3.2rem" height="3.2rem" noneBorder shake defaultColor={true} />
                </div>
                <div className={cx('comment-icon')} onClick={!isLogin ? showLoginModal : () => {}}>
                    <div className={cx('icon')}>
                        <CommentIcon width="3.2rem" height="3.2rem" />
                    </div>
                    <p>{data?.comments_count}</p>
                </div>
                <div className={cx('share-icon')}>
                    <div className={cx('icon')}>
                        <ShareIcon width="3.2rem" height="3.2rem" />
                    </div>
                    <p>{data?.shares_count}</p>
                </div>

                {/* control-bar */}
                <div className={cx('controls-wrapper')}>
                    <div className={cx('time-line')}>
                        <input
                            type="range"
                            min="0"
                            max={videoRef.current?.duration.toFixed(0)}
                            step="1"
                            onInput={handleTimeLine}
                            onChange={(e) => handleCurrentTime(e.target.value)}
                            onClick={handleChangeCurrentTimeVideo}
                            ref={timeRef}
                        />
                        <div className={cx('timeline-selector')} ref={timeLineRef}></div>
                    </div>

                    <div className={cx('controls-item')}>
                        <div className={cx('left-item')}>
                            <div className={cx('play-item')}>
                                {isEnded ? (
                                    <div className={cx('reload-item')} onClick={handleReloadVideo}>
                                        <ReloadIcon width="2.4rem" height="2.4rem" />
                                    </div>
                                ) : isPlayed === stickyPlayed ? (
                                    <div onClick={handlePlayVideo}>
                                        <FontAwesomeIcon icon={faPause} />
                                    </div>
                                ) : (
                                    <div onClick={handlePlayVideo}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </div>
                                )}
                            </div>
                            <div className={cx('time-item')}>
                                {`${currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}:${
                                    currentSeconds < 10 ? '0' + currentSeconds : currentSeconds
                                }`}
                            </div>
                            <div className={cx('separation')}>/</div>

                            <div className={cx('time-item')}>
                                {`${durationMinutes < 10 ? '0' + durationMinutes ?? 0 : durationMinutes ?? 0}:${
                                    durationSeconds < 10 ? '0' + durationSeconds ?? 0 : durationSeconds ?? '00'
                                }`}
                            </div>
                        </div>
                        <div className={cx('right-item')}>
                            <div>
                                <TippyHeadless
                                    interactive
                                    render={renderSpeedView}
                                    offset={[0, 25]}
                                    delay={[0, 200]}
                                    zIndex="1"
                                    placement="top"
                                    popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                                >
                                    <div className={cx('speed-item')}>
                                        <span>Speed</span>
                                    </div>
                                </TippyHeadless>
                            </div>

                            <div
                                className={cx('adjust-container', { visible: visibleVolume || holdVolumeBar })}
                                onMouseMove={() => setVisibleVolume(true)}
                                onMouseOut={handleHideVolumeBar}
                            >
                                <div className={cx('adjust-volume')}>
                                    <div className={cx('volume-bar')}>
                                        <input
                                            className={cx('input')}
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={currentVolume * 100}
                                            onInput={handleAdjustVolume}
                                            ref={inputRef}
                                        />
                                        <div className={cx('selector')} ref={selectorRef}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('volume-item')}>
                                <div
                                    onClick={handleMutedVolume}
                                    className={cx('volume-icon')}
                                    onMouseMove={handleShowVolumeBar}
                                    onMouseOut={handleHideVolumeBar}
                                >
                                    {isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
                                </div>
                            </div>

                            <div className={cx('expand-item')}>
                                <img src={images.fullscreen} alt="" />
                            </div>
                            <div className={cx('more-item')}>
                                <ThreeDotIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* description */}
            <div className={cx('description-container')}>
                <div className={cx('caption')}>{data?.description}</div>
                <div className={cx('music')}>
                    <span>
                        <HashTagMusicIcon /> <span>{`Nhạc nền - ${data?.user?.nickname}`}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    data: PropTypes.object,
};

export default VideoPlayer;
