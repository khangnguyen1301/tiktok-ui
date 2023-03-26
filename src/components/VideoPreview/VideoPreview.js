import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import Image from '../Image';
import Button from '../Button';
import { PlayIcon } from '../Icons';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
const cx = classNames.bind(styles);

function VideoPreview({ data, index, handleMouseMove, videoID, play = false, profile = false }) {
    const videoRef = useRef();
    const context = useContext(VideoEnviroment);
    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.load();
    }, [play]);

    const handleSetPosition = () => {
        context.showVideoPlayer();
        context.handleGetVideoID(videoID);
        context.handleSetPositionVideo(index);
    };

    return (
        <div className={cx('wrapper')} onMouseOver={() => handleMouseMove(index)}>
            <div className={cx('container')}>
                {!profile ? (
                    <Link to={`/@${data.nickname}`}>
                        <div className={cx('content')}>
                            <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
                            {data.first_name ? (
                                <h5>{`${data?.first_name} ${data?.last_name}`}</h5>
                            ) : (
                                <h5>{data.nickname}</h5>
                            )}
                            <div className={cx('nickname')}>
                                <span>{data.nickname}</span>
                                <span className={cx('tick')}>
                                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} />}
                                </span>
                            </div>
                            <Button primary className={cx('follow-btn')}>
                                Follow
                            </Button>
                        </div>
                    </Link>
                ) : (
                    <div className={cx('content-profile')}>
                        <PlayIcon />
                        <span>{data.views_count}</span>
                    </div>
                )}

                <Image
                    src={!profile ? data?.popular_video?.thumb_url : data.thumb_url}
                    alt={data.nickname}
                    className={cx('thumb-video')}
                />
                <video
                    src={!profile ? data?.popular_video?.file_url : data.file_url}
                    muted
                    loop
                    ref={videoRef}
                    className={cx('popular-video', { active: play })}
                    onClick={handleSetPosition}
                />
            </div>
        </div>
    );
}

export default VideoPreview;
