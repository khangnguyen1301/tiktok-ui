import classNames from 'classnames/bind';
import { HeartMiniIcon, LineLoading } from '~/components/Icons';

import styles from './VideoCard.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { useCalculator } from '~/hooks';

const cx = classNames.bind(styles);

function VideoCard({ data, videoID, index }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeVideo, setActiveVideo] = useState(false);

    const [minutes, seconds] = useCalculator(data.meta.playtime_seconds);
    const videoContext = useContext(VideoEnviroment);
    const videoRef = useRef();

    useEffect(() => {
        if (data.id === +videoID) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoID]);

    const handleMouseEnter = () => {
        if (isPlaying) {
            return;
        } else {
            setActiveVideo(true);
            setTimeout(() => {
                videoRef.current.play();
            }, 150);
        }
    };

    const handleMouseOut = () => {
        setActiveVideo(false);
        videoRef.current.load();
    };

    const handleVideoID = (id, index) => {
        videoContext.handleSetVideoID(id);
        videoContext.handleSetPositionVideo(index);
        videoContext.handleChangeState(true);
    };

    return (
        <div className={cx('videocard-wrapper')} onClick={() => handleVideoID(data.id, index)}>
            <div className={cx('content')} onMouseOver={handleMouseEnter} onMouseOut={handleMouseOut}>
                <div className={cx('playing-mask', { active: isPlaying })}>
                    <LineLoading />
                    <p>Playing now</p>
                </div>
                <div className={cx('thumbnail')}>
                    <img src={data.thumb_url} alt="" />
                </div>
                <div className={cx('video', { showVideo: activeVideo })}>
                    <video ref={videoRef} muted>
                        <source src={data.file_url} type="video/mp4" />
                    </video>
                    {/* <video src={data.file_url} muted ref={videoRef} /> */}
                </div>

                <div className={cx('time-video')}>{`${minutes < 10 ? '0' + minutes : minutes}:${
                    seconds < 10 ? '0' + seconds : seconds
                }`}</div>
            </div>
            <div className={cx('caption')}>
                <span>{data.description}</span>
            </div>
            <div className={cx('nickname')}>
                <span>{data.user.nickname}</span>
            </div>
            <div className={cx('interactive')}>
                <span>{data.created_at.slice(0, 10)}</span>
                <div className={cx('interactive-icon')}>
                    <span className={cx('icon')}>
                        <HeartMiniIcon width="1.6rem" height="1.6rem" />
                    </span>
                    <span className={cx('count')}>{data.likes_count}</span>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
