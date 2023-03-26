import classNames from 'classnames/bind';

import styles from './DetailVideo.module.scss';

const cx = classNames.bind(styles);

function DetailVideo() {
    return (
        <div className={cx('wrapper')}>
            <h1>Detail Video</h1>
            <div className={cx('loading')}></div>
        </div>
    );
}

export default DetailVideo;
