import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import Image from '../Image';
import { PlayIcon } from '../Icons';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import Follow from '../Follow/Follow';
const cx = classNames.bind(styles);

function VideoPreview({ data, index, handleMouseMove, videoID, play = false, profile = false }) {
    const videoRef = useRef();
    const context = useContext(VideoEnviroment);
    useEffect(() => {
        play
            ? setTimeout(() => {
                  videoRef.current?.play();
              }, 150)
            : videoRef.current?.load();
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

                            <Follow
                                className={cx('follow-btn')}
                                primary={true}
                                outline={false}
                                userID={data?.id}
                                isFollow={data?.is_followed}
                            />
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

VideoPreview.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number,
    handleMouseMove: PropTypes.func,
    videoID: PropTypes.number,
    play: PropTypes.bool,
    profile: PropTypes.bool,
};

export default VideoPreview;
