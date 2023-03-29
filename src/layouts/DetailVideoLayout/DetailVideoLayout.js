import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';

import styles from './DetailVideoLayout.module.scss';

import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function DetailVideoLayout({ children }) {
    return (
        <div>
            <Header className={cx('custom-header')} />
            <div className={cx('wrapper')}>
                <Sidebar className={cx('custom-sidebar')} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DetailVideoLayout;
