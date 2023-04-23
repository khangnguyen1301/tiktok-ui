import classNames from 'classnames/bind';

import styles from './AvatarLoading.module.scss';

const cx = classNames.bind(styles);

function AvatarLoading() {
    return <div className={cx('avatar-loading')}></div>;
}

export default AvatarLoading;
