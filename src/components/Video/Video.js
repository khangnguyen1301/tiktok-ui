import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import classNames from 'classnames/bind';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './Video.module.scss';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentIcon, HashTagMusicIcon, HeartIcon, ShareIcon, VolumeIcon, VolumeMutedIcon } from '../Icons';

import ShareAction from '../ShareAction';
import Follow from '../Follow';
import TiktokLoading from '../Loadings/TiktokLoading';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import Likes from '../Likes';
import { adjustVolume, handleMuted } from '~/redux/videoSlice';
import { useInView } from 'react-intersection-observer';

const cx = classNames.bind(styles);

function Video({
    data,
    videoID,
    index,
    currentElement,
    onInView = () => {},
    inViewPlay = false,
    onCloseModal = false,
}) {
    const [isPlayed, setIsPlayed] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInteract, setUserInteract] = useState(false);
    const [commentCount, setCommentCount] = useState(data?.comments_count);

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;

    const volume = useSelector((state) => state.video.defaultVolume);
    const isMuted = useSelector((state) => state.video.isMuted);
    const { showLoginModal } = useContext(ModalEnviroment);
    const videoContext = useContext(VideoEnviroment);

    const videoRef = useRef();
    const selectorRef = useRef();
    const adjustRef = useRef();

    const {
        meta: {
            video: { resolution_x: videoWidth, resolution_y: videoHeight },
        },
    } = data;

    const directionVideoClass = videoWidth < videoHeight;

    const [inViewRef, isInView] = useInView({ root: null, rootMargin: '20px', threshold: 0.47 });

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Tạm dừng video khi tab trở thành không hiển thị
                if (inViewPlay && !videoContext.isVideoModalShow) {
                    setIsPlayed(false);
                    videoRef.current.pause();
                }
            } else if (document.visibilityState === 'visible') {
                // Phát video khi tab trở lại hiển thị
                if (inViewPlay && !videoContext.isVideoModalShow) {
                    setIsPlayed(true);
                    videoRef.current.play();
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            // Xóa lắng nghe sự kiện khi component bị xóa khỏi DOM
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewPlay]);

    useLayoutEffect(() => {
        updateInViewList(isInView, index);
        isInView ? currentElement(index) : handleReloadVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    useEffect(() => {
        const currentScrollPos = window.scrollY;
        const handleInteractive = () => {
            const newScrollPos = window.scrollY;
            setUserInteract(false);
            if (newScrollPos > currentScrollPos) {
                //scroll down
                updateInViewList(false, index);
            } else {
                //scroll up
                if (isPlayed) {
                    updateInViewList(true, index);
                } else {
                    setTimeout(() => {
                        setIsPlayed(true);
                        videoRef.current.play();
                    }, 250);
                }
            }
        };
        if (userInteract) {
            document.addEventListener('scroll', handleInteractive);
            return () => {
                document.removeEventListener('scroll', handleInteractive);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInteract, isPlayed]);

    useEffect(() => {
        let timerID;
        if (!userInteract) {
            if (inViewPlay && !videoContext.isVideoModalShow) {
                timerID = setTimeout(() => {
                    setIsPlayed(true);
                    videoRef.current.play();
                }, 230);
            } else {
                videoRef.current.play && handleReloadVideo();
            }

            return () => clearTimeout(timerID);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewPlay]);

    useEffect(() => {
        adjustRef.current.value = isMuted ? 0 : volume * 100;
        videoRef.current.volume = isMuted ? 0 : volume;
        selectorRef.current.style.width = `${isMuted ? 0 : volume * 100}%`;
    }, [isMuted, volume]);

    useEffect(() => {
        if (videoContext.isVideoModalShow) {
            setIsPlayed(false);
            videoRef.current.pause();
        } else {
            if (onCloseModal && !videoContext.isVideoModalShow && isInView) {
                setIsPlayed(true);
                videoRef.current.load();
                videoRef.current.play();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.isVideoModalShow]);

    useEffect(() => {
        if (videoContext.isComment && videoContext.isVideoModalShow)
            if (videoContext.videoID === data?.id) {
                setCommentCount((prev) => prev + 1);
                videoContext.handleStateComment(false);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.isComment]);

    const updateInViewList = (inView, position) => {
        videoContext.videoInViewList[position].updateInview(inView);
        onInView(inView);
    };

    const handleAdjustVolume = (_value) => {
        const _volume = _value / 100;
        videoRef.current.volume = _volume;
        selectorRef.current.style.width = `${_volume * 100}%`;
        dispatch(handleMuted(!_volume > 0));
        isMuted && dispatch(adjustVolume(_volume));
    };

    const handleSetVolume = (_value) => {
        const value = _value / 100;
        dispatch(adjustVolume(value));
    };

    const handleToggleMuted = () => {
        dispatch(adjustVolume(volume === 0 ? 0.6 : volume));
        dispatch(handleMuted(!isMuted));
    };

    const handlePlayVideo = () => {
        if (isPlayed) {
            if (!isInView) {
                currentElement(index + 1);
            }
            setIsPlayed(false);
            videoRef.current.pause();
        } else {
            if (!isInView) {
                currentElement(index);
                updateInViewList(true, index);
                setUserInteract(true);
            }
            setIsPlayed(true);
            videoRef.current.play();
        }
    };

    const handleReloadVideo = () => {
        setIsPlayed(false);
        videoRef.current.load();
        setUserInteract(false);
    };

    const handleClickVideo = () => {
        videoContext.handleGetVideoID(videoID);
        videoContext.handleSetPositionVideo(index);
        videoContext.showVideoPlayer();
    };

    const handleResetLoading = () => {
        setIsLooping(false);
        setLoading(false);
    };

    const handleVideoEnded = () => {
        const video = videoRef.current;
        const { currentTime, duration } = video;

        if (currentTime >= +duration.toFixed(0)) {
            setIsLooping(true);
            setLoading(false);
        }
    };

    const handleSetLoading = () => {
        setLoading(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <AccountPreviewHome data={data}>
                    <Link to={`/@${data?.user?.nickname}`}>
                        <Image src={data?.user?.avatar} alt={data?.user?.nickname} className={cx('custom-img')} />
                    </Link>
                </AccountPreviewHome>
            </div>

            <div className={cx('body')}>
                <div className={cx('name')}>
                    <AccountPreviewHome data={data}>
                        <div className={cx('info')}>
                            <Link to={`/@${data?.user?.nickname}`}>
                                <div className={cx('info-box')}>
                                    <h3>{data?.user?.nickname}</h3>
                                    <h4>{`${data?.user?.first_name} ${data?.user?.last_name}`}</h4>
                                </div>
                            </Link>
                        </div>
                    </AccountPreviewHome>
                </div>
                <div className={cx('content')}>
                    <p>{data?.description}</p>
                </div>
                <div className={cx('music')}>
                    <HashTagMusicIcon />
                    {<p className={cx('name-music')}>{data?.music}</p> ?? (
                        <p className={cx('name-music')}>Can't find the music link</p>
                    )}
                </div>
                <div className={cx('video-container')} ref={inViewRef}>
                    <div
                        className={cx('video', {
                            vertical: directionVideoClass,
                            horizontal: !directionVideoClass,
                        })}
                    >
                        {loading && isPlayed && (
                            <div className={cx('video-loading')}>
                                <TiktokLoading medium />
                            </div>
                        )}
                        <img src={data?.thumb_url} alt="" className={cx('thumb-video', { active: inViewPlay })} />
                        <video
                            src={data?.file_url}
                            loop
                            ref={videoRef}
                            onClick={handleClickVideo}
                            onPlaying={() => handleResetLoading()}
                            onTimeUpdate={() => handleVideoEnded()}
                            onWaiting={() => !isLooping && handleSetLoading()}
                        ></video>
                        <div className={cx('volume-icon', { muted: isMuted })}>
                            <div onClick={handleToggleMuted}>{isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}</div>
                        </div>
                        <div className={cx('volume-control')}>
                            <div className={cx('volume-bar')}>
                                <input
                                    className={cx('input')}
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    onChange={(e) => handleAdjustVolume(e.target.value)}
                                    onMouseUp={(e) => handleSetVolume(e.target.value)}
                                    ref={adjustRef}
                                />
                                <div className={cx('selector')} ref={selectorRef}></div>
                            </div>
                        </div>

                        <div className={cx('play-icon')} onClick={handlePlayVideo}>
                            {isPlayed ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </div>

                        <div className={cx('report')}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>Report</span>
                        </div>
                    </div>
                    <div className={cx('interactive')}>
                        {!isLogin ? (
                            <div className={cx('likes-box')}>
                                <button type="button" className={cx('icon-box')} onClick={showLoginModal}>
                                    <HeartIcon />
                                </button>
                                {!isLogin && <strong className={cx('count')}>{data?.likes_count ?? 0}</strong>}
                            </div>
                        ) : (
                            <Likes data={data} />
                        )}
                        <button type="button" className={cx('icon-box')} onClick={() => handleClickVideo()}>
                            {/* icon */}
                            <CommentIcon />
                        </button>
                        <strong className={cx('count')}>{commentCount ?? 0}</strong>
                        <ShareAction
                            offset={[-30, 13]}
                            placement="top-start"
                            delay={[0, 400]}
                            arrowBottom={true}
                            zIndex="9"
                        >
                            <button type="button" className={cx('icon-box')}>
                                <div>
                                    <ShareIcon />
                                </div>
                            </button>
                        </ShareAction>
                        <strong className={cx('count')}>{data?.shares_count ?? 0}</strong>
                    </div>
                </div>

                {!isLogin ? (
                    <Button small outline className={cx('follow-btn')} onClick={showLoginModal}>
                        Follow
                    </Button>
                ) : (
                    <Follow
                        className={cx('follow-btn')}
                        videoID={videoID}
                        index={index}
                        isFollow={data?.user?.is_followed}
                        userID={data?.user?.id}
                    />
                )}
            </div>
        </div>
    );
}

Video.propTypes = {
    data: PropTypes.object,
    videoID: PropTypes.number,
    index: PropTypes.number,
    currentElement: PropTypes.func,
    onInView: PropTypes.func,
    inViewPlay: PropTypes.bool,
    onCloseModal: PropTypes.bool,
};

export default memo(Video);
