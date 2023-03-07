import { useState, useEffect, useRef } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import classNames from 'classnames/bind';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './Video.module.scss';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentIcon, HashTagMusicIcon, HeartIcon, ShareIcon, VolumeIcon, VolumeMutedIcon } from '../Icons';

const cx = classNames.bind(styles);

function Video({ data, volume, adjustVolume, muted, toggleMuted }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlayed, setIsPlayed] = useState(true);

    const videoRef = useRef();
    const selectorRef = useRef();
    useEffect(() => {
        muted ? (videoRef.current.volume = 0) : (videoRef.current.volume = volume);
        selectorRef.current.style.width = `${muted ? 0 : volume * 100}%`;
    });

    useEffect(() => {});

    const togglePlay = () => {
        if (isPlayed) {
            videoRef.current.pause();
            setIsPlayed(false);
        } else {
            videoRef.current.play();
            setIsPlayed(true);
        }
    };

    useEffect(() => {
        let timerID;
        if (isVisible) {
            timerID = setTimeout(() => {
                videoRef.current.play();
            }, 200);
            setIsPlayed(true);
        } else {
            if (videoRef.current.play) {
                videoRef.current.load();
                setIsPlayed(false);
            }
        }

        return () => clearTimeout(timerID);
    }, [isVisible]);

    const handleRef = (visible) => {
        setIsVisible(visible);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <AccountPreviewHome data={data}>
                    <Image src={data?.user?.avatar} alt={data?.user?.nickname} className={cx('custom-img')} />
                </AccountPreviewHome>
            </div>

            <div className={cx('body')}>
                <div className={cx('name')}>
                    <AccountPreviewHome data={data}>
                        <div className={cx('info')}>
                            <h3>{data?.user?.nickname}</h3>
                            <h4>{`${data?.user?.first_name} ${data?.user?.last_name}`}</h4>
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
                        onChange={handleRef}
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
                            <video src={data?.file_url} loop ref={videoRef}></video>
                            <div className={cx('volume-icon', { muted: muted })}>
                                <div onClick={toggleMuted}>{muted ? <VolumeMutedIcon /> : <VolumeIcon />}</div>
                            </div>
                            <div className={cx('volume-control')}>
                                <div className={cx('volume-bar')}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={muted ? 0 : volume * 100}
                                        onChange={adjustVolume}
                                    />
                                    <div className={cx('selector')} ref={selectorRef}></div>
                                </div>
                            </div>

                            <div className={cx('play-icon')} onClick={togglePlay}>
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
                        <button type="button" className={cx('icon-box')}>
                            {/* icon */}
                            <ShareIcon />
                        </button>
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

export default Video;
