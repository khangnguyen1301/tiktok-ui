import Sidebar from '~/layouts/components/Sidebar';

import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar className={cx('custom-sidebar')} />
            <div className={cx('profile')}>
                <h1>Profile Page</h1>
            </div>
        </div>
    );
}

export default Profile;
