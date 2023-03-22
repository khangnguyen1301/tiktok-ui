import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import VideoThumbnail from 'react-video-thumbnail';
import styles from './Thumbnail.module.scss';

const cx = classNames.bind(styles);

function Thumbnail({ videoURL, snapShotAtTime }) {
    const [snapshots, setSnapshots] = useState('');

    const handleSnapshot = (thumb) => {
        setSnapshots(thumb);
    };
    console.log(snapShotAtTime);
    return (
        <div className={cx('thumbnail')}>
            <div className={cx('snapshot-container')}>
                <div className={cx('snapshot-temp')}>
                    <VideoThumbnail
                        videoUrl={videoURL}
                        snapShotAtTime={snapShotAtTime}
                        //renderThumbnail={false}
                        //thumbnailHandler={(thumbnail) => handleSnapshot(thumbnail)}
                    />
                </div>
                {/* <img src={snapshots} alt="No snapshot" className={cx('snapshot-img')} /> */}
            </div>
        </div>
    );
}

export default Thumbnail;
