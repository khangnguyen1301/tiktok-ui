import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactVisibilitySensor from 'react-visibility-sensor';
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

const cx = classNames.bind(styles);

function Video({ data, videoID, index, currentElement, updateFollow, handleFollow, onCloseModal = false }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlayed, setIsPlayed] = useState(true);
    const [loading, setLoading] = useState(true);
    const [commentCount, setCommentCount] = useState(data?.comments_count);

    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;

    const { showLoginModal } = useContext(ModalEnviroment);
    const videoContext = useContext(VideoEnviroment);
    const videoRef = useRef();
    const selectorRef = useRef();

    useLayoutEffect(() => {
        videoRef.current.volume = videoContext.isMuted ? 0 : videoContext.volume;
        selectorRef.current.style.width = `${videoContext.isMuted ? 0 : videoContext.volume * 100}%`;
    });

    useEffect(() => {
        if (videoContext.isVideoModalShow) {
            videoRef.current.pause();
            setIsPlayed(false);
        } else {
            if (onCloseModal && !videoContext.isVideoModalShow && isVisible) {
                videoRef.current.load();
                videoRef.current.play();
                setIsPlayed(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.isVideoModalShow]);

    useLayoutEffect(() => {
        let timerID;
        if (isVisible && !videoContext.isVideoModalShow) {
            timerID = setTimeout(() => {
                videoRef.current.play();
                setIsPlayed(true);
            }, 250);
            currentElement(index);
        } else {
            if (videoRef.current.play) {
                videoRef.current.load();
                setIsPlayed(false);
            }
        }

        return () => clearTimeout(timerID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    useEffect(() => {
        if (videoContext.isComment && videoContext.isVideoModalShow)
            if (videoContext.videoID === data?.id) {
                setCommentCount((prev) => prev + 1);
                videoContext.handleStateComment(false);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.isComment]);

    const handleVisibleVideo = (visible) => {
        setIsVisible(visible);
    };

    const handlePlayVideo = () => {
        if (isPlayed) {
            videoRef.current.pause();
            setIsPlayed(false);
        } else {
            videoRef.current.play();
            setIsPlayed(true);
        }
    };

    const handleClickVideo = () => {
        videoContext.handleGetVideoID(videoID);
        videoContext.handleSetPositionVideo(index);
        videoContext.showVideoPlayer();
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
                <div className={cx('video-container')}>
                    <ReactVisibilitySensor
                        onChange={handleVisibleVideo}
                        partialVisibility={true}
                        offset={{ top: 300, bottom: 200 }}
                    >
                        <div
                            className={cx('video')}
                            style={
                                data?.meta?.video?.resolution_x < data?.meta?.video?.resolution_y
                                    ? { width: '313px', height: '553px' }
                                    : { width: '500px', height: '313px' }
                            }
                        >
                            {loading && (
                                <div className={cx('video-loading')}>
                                    <TiktokLoading medium />
                                </div>
                            )}
                            <img src={data?.thumb_url} alt="" className={cx('thumb-video', { active: isPlayed })} />
                            <video
                                src={data?.file_url}
                                loop
                                ref={videoRef}
                                onClick={handleClickVideo}
                                onLoadedMetadata={() => setLoading(false)}
                            ></video>
                            <div className={cx('volume-icon', { muted: videoContext.isMuted })}>
                                <div onClick={videoContext.handleMutedVideo}>
                                    {videoContext.isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
                                </div>
                            </div>
                            <div className={cx('volume-control')}>
                                <div className={cx('volume-bar')}>
                                    <input
                                        className={cx('input')}
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={videoContext.isMuted ? 0 : videoContext.volume * 100}
                                        onChange={videoContext.handleAdjustVolume}
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
                    </ReactVisibilitySensor>

                    <div className={cx('interactive')}>
                        {!isLogin ? (
                            <button type="button" className={cx('icon-box')} onClick={showLoginModal}>
                                <HeartIcon />
                            </button>
                        ) : (
                            <Likes data={data} />
                        )}

                        {/* <strong className={cx('count')}>{likeCount ?? 0}</strong> */}

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
                    <Button small outline className={cx('follow-btn')} onClick={() => videoContext.handleShowModal()}>
                        Follow
                    </Button>
                ) : (
                    <Follow
                        className={cx('follow-btn')}
                        index={index}
                        isFollow={data?.user?.is_followed}
                        handleFollow={handleFollow}
                        updateFollow={updateFollow}
                        isUpdateFollow={data?.user?.id === (updateFollow?.id ?? data?.user?.id)}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(Video);
