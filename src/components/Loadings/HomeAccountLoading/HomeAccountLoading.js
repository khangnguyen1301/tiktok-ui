import classNames from 'classnames/bind';

import styles from './HomeAccountLoading.module.scss';

const cx = classNames.bind(styles);

function HomeAccountLoading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}></div>
            <div className={cx('body')}>
                <p className={cx('username')}></p>
                <p className={cx('full-name')}></p>
                <p className={cx('description')}></p>
                <p className={cx('description')}></p>
            </div>
        </div>
    );
}

export default HomeAccountLoading;
