import classNames from 'classnames/bind';

import styles from './LineLoadingMedium.module.scss';

const cx = classNames.bind(styles);

function LineLoadingMedium() {
    return <div className={cx('line-loading')}></div>;
}

export default LineLoadingMedium;
