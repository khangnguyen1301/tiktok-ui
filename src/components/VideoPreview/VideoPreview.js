import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import Image from '../Image';
import Button from '../Button';
const cx = classNames.bind(styles);

function VideoPreview({ data }) {
    const videoRef = useRef();
    const [isPlayed, setIsPlayed] = useState(false);
    // useEffect(() => {
    //     videoRef.current.
    // }, []);

    const handleVideoPlay = () => {
        setIsPlayed((prev) => !prev);
    };

    return (
        <Link to={`/@${data.nickname}`}>
            <div className={cx('wrapper')}>
                <div className={cx('container')} onMouseOver={handleVideoPlay}>
                    <div className={cx('content')}>
                        <Image src={data.avatar} alt={data.nickname} className={cx('avatar')} />
                        {data.first_name ? (
                            <h5>{`${data?.first_name} ${data?.last_name}`}</h5>
                        ) : (
                            <h5>{data.nickname}</h5>
                        )}
                        <div className={cx('nickname')}>
                            <span>{data.nickname}</span>
                            <span className={cx('tick')}>{data.tick && <FontAwesomeIcon icon={faCheckCircle} />}</span>
                        </div>
                        <Button primary className={cx('follow-btn')}>
                            Follow
                        </Button>
                    </div>

                    <Image src={data?.popular_video?.thumb_url} alt={data.nickname} className={cx('thumb-video')} />
                    <video
                        src={data?.popular_video?.file_url}
                        muted
                        autoPlay
                        loop
                        className={cx('popular-video', { active: isPlayed })}
                        ref={videoRef}
                    />
                </div>
            </div>
        </Link>
    );
}

export default VideoPreview;
