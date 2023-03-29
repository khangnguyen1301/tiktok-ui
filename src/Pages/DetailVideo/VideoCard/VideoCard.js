import classNames from 'classnames/bind';
import { HeartMiniIcon, LineLoading } from '~/components/Icons';

import styles from './VideoCard.module.scss';

const cx = classNames.bind(styles);

function VideoCard({ data }) {
    return (
        <div className={cx('videocard-wrapper')}>
            <div className={cx('content')}>
                <div className={cx('playing-mask')}>
                    <LineLoading />
                    <p>Playing now</p>
                </div>
                <div className={cx('thumbnail')}>
                    <img src={data.thumb_url} alt="" />
                </div>
                <div className={cx('video')}>
                    <video src={data.file_url} muted />
                </div>
                <div className={cx('time-video')}>00:08</div>
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
