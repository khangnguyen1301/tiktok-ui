import Header from '~/layouts/UploadLayout/Header';
import classNames from 'classnames/bind';

import styles from './UploadLayout.module.scss';

const cx = classNames.bind(styles);

function UploadLayout({ children }) {
    return (
        <div>
            <Header className={cx('custom')} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default UploadLayout;
