import classNames from 'classnames/bind';
import Follow from '~/components/Follow';

import Image from '~/components/Image';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';

import styles from './UserInfo.module.scss';

const cx = classNames.bind(styles);

function UserInfo() {
    return (
        <div className={cx('userinfo-wrapper')}>
            <div className={cx('userinfo-container')}>
                <AccountPreviewHome>
                    <div className={cx('avatar')}>
                        <Image src="https://files.fullstack.edu.vn/f8-tiktok/users/5203/6420153761a88.jpg" alt="" />
                    </div>
                </AccountPreviewHome>

                <AccountPreviewHome>
                    <div className={cx('info')}>
                        <div className={cx('nickname')}>
                            <span>duykhang1301</span>
                        </div>
                        <div className={cx('fullname')}>
                            <span>Khang Nguyễn · 29-03</span>
                        </div>
                    </div>
                </AccountPreviewHome>
                <div className={cx('follow')}>
                    <Follow primary={true} outline={false} className={cx('custom')} />
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
