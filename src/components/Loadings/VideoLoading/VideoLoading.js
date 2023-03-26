import classNames from 'classnames/bind';

import styles from './VideoLoading.module.scss';

const cx = classNames.bind(styles);

function VideoLoading() {
    return <div className={cx('video-loading')}></div>;
}

export default VideoLoading;
