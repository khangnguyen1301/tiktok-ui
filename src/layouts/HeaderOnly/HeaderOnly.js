import Header from '~/layouts/components/Header';

import classNames from 'classnames/bind';

import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <div>
            <Header className={cx('custom')} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
