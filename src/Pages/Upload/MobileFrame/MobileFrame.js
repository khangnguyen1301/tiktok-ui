import { useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';

import Image from '~/components/Image';
import { HashTagMusicIcon } from '~/components/Icons';
import ControlVideo from '../ControlVideo';
import styles from './MobileFrame.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

let animate;

function MobileFrame({ userInfo, nameSlice, srcVideo }) {
    const [isPlayed, setIsPlayed] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTimeVideo, setCurrentTimeVideo] = useState(0);
    const [durationTime, setDurationTime] = useState(0);

    const avatarRotateRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (isPlayed) {
            videoRef.current?.play();
            animate?.play();
        } else {
            videoRef.current?.pause();
            animate?.pause();
        }
    }, [srcVideo, isPlayed]);
    useEffect(() => {
        animate = avatarRotateRef.current?.animate(
            [
                {
                    transform: 'rotate(360deg)',
                },
            ],
            {
                duration: 2000,
                iterations: Infinity,
            },
        );
        animate?.pause();
    }, [nameSlice]);

    const handleCurrentTime = (value) => {
        videoRef.current.currentTime = value;
    };

    const handlePlayVideo = () => {
        setIsPlayed(!isPlayed);
    };

    const handleSetCurrentTime = () => {
        setCurrentTimeVideo(videoRef.current?.currentTime);
    };

    const handleSetDurationTime = () => {
        setDurationTime(videoRef.current?.duration);
    };

    const handleMuted = () => {
        if (!isMuted) {
            videoRef.current.muted = true;
        } else {
            videoRef.current.muted = false;
        }
        setIsMuted(!isMuted);
    };

    const handleEndedVideo = () => {
        setIsPlayed(false);
    };

    return (
        <div className={cx('mobile-frame')}>
            <img src={images.mobileFrame} alt="" className={cx('frame')} />
            <div className={cx('meta-data')}>
                <div className={cx('nickname')}>{userInfo.data.nickName}</div>
                <div className={cx('name-video')}>{nameSlice.join('')}</div>
                <div className={cx('music')}>
                    <HashTagMusicIcon />
                    <div className={cx('music-running')}>
                        <span>{`Orginal sound - ${userInfo.data.nickName}`}</span>
                    </div>
                </div>
            </div>
            <div className={cx('control')}>
                <img src={images.control} alt="" className={cx('img-control')} />
            </div>
            <div className={cx('header-item')}>
                <img src={images.live} alt="" />
                <span>Following</span>
                <span className={cx('boder-bot')}>For You</span>
                <img src={images.search} alt="" />
            </div>
            <div className={cx('icon-frame')}>
                <Image src={userInfo.data.avatar} alt={userInfo.data.nickName} className={cx('avatar')} />
                <img src={images.iconFrame} alt="" />
                <div className={cx('avatar-rotate-container')} ref={avatarRotateRef}>
                    <Image src={userInfo.data.avatar} alt={userInfo.data.nickName} className={cx('avatar-rotate')} />
                </div>
            </div>
            <video
                src={srcVideo}
                className={cx('video-preview')}
                onTimeUpdate={handleSetCurrentTime}
                onLoadedData={handleSetDurationTime}
                onEnded={handleEndedVideo}
                ref={videoRef}
            />
            <div className={cx('video-control')}>
                <ControlVideo
                    currentTime={currentTimeVideo}
                    duration={durationTime}
                    isPlayed={isPlayed}
                    onPlayed={handleCurrentTime}
                    handlePlayed={handlePlayVideo}
                    isMuted={isMuted}
                    handleMuted={handleMuted}
                />
            </div>
        </div>
    );
}

export default MobileFrame;
