import { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
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
import { ModalContext } from '../ModalProvider';
import ShareAction from '../ShareAction';

const cx = classNames.bind(styles);

function Video({ data, videoID, index, currentElement, onCloseModal = false }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlayed, setIsPlayed] = useState(true);
    const context = useContext(ModalContext);
    const videoRef = useRef();
    const selectorRef = useRef();

    useLayoutEffect(() => {
        videoRef.current.volume = context.isMuted ? 0 : context.volume;
        selectorRef.current.style.width = `${context.isMuted ? 0 : context.volume * 100}%`;
    });

    useEffect(() => {
        if (context.showVideoPlayer) {
            videoRef.current.pause();
            setIsPlayed(false);
        } else {
            if (onCloseModal && !context.showVideoPlayer && isVisible) {
                videoRef.current.load();
                videoRef.current.play();
                setIsPlayed(true);
            }
        }
    }, [onCloseModal, context.showVideoPlayer]);

    useLayoutEffect(() => {
        let timerID;
        if (isVisible && !context.showVideoPlayer) {
            timerID = setTimeout(() => {
                videoRef.current.play();
            }, 250);
            setIsPlayed(true);
            currentElement(index);
        } else {
            if (videoRef.current.play) {
                videoRef.current.load();
                setIsPlayed(false);
            }
        }

        return () => clearTimeout(timerID);
    }, [isVisible]);

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
        context.handleGetVideoID(videoID);
        context.handleSetPositionVideo(index);
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
                        offset={{ top: 350, bottom: 150 }}
                    >
                        <div
                            className={cx('video')}
                            style={
                                data?.meta?.video?.resolution_x < data?.meta?.video?.resolution_y
                                    ? { width: '282px' }
                                    : { width: '463px' }
                            }
                        >
                            <img src={data?.thumb_url} alt="" className={cx('thumb-video', { active: isVisible })} />
                            <video src={data?.file_url} loop ref={videoRef} onClick={handleClickVideo}></video>
                            <div className={cx('volume-icon', { muted: context.isMuted })}>
                                <div onClick={context.handleMutedVideo}>
                                    {context.isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
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
                                        value={context.isMuted ? 0 : context.volume * 100}
                                        onChange={context.handleAdjustVolume}
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
                        <button type="button" className={cx('icon-box')}>
                            {/* icon */}
                            <HeartIcon />
                        </button>

                        <strong className={cx('count')}>{data?.likes_count ?? 0}</strong>
                        <button type="button" className={cx('icon-box')}>
                            {/* icon */}
                            <CommentIcon />
                        </button>
                        <strong className={cx('count')}>{data?.comments_count ?? 0}</strong>
                        <ShareAction
                            offset={[-30, 13]}
                            placement="top-start"
                            delay={[0, 400]}
                            arrowBottom={true}
                            zIndex={0}
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

                <Button small outline className={cx('follow-btn')}>
                    Follow
                </Button>
            </div>
        </div>
    );
}

export default memo(Video);
