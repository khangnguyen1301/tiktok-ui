import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Follow from '~/components/Follow';
import Image from '~/components/Image';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';
import Button from '~/components/Button/Button';
import styles from './UserInfo.module.scss';
import { Link } from 'react-router-dom';

import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);

function UserInfo({ data }) {
    const { showLoginModal } = useContext(ModalEnviroment);

    const isLogin = useSelector((state) => state.auth.login?.isLogin) ?? false;

    return (
        <div className={cx('userinfo-wrapper')}>
            <div className={cx('userinfo-container')}>
                <AccountPreviewHome data={data}>
                    <Link to={`/@${data.user?.nickname}`}>
                        <div className={cx('avatar')}>
                            <Image src={data.user?.avatar} alt={data.user?.nickname} />
                        </div>
                    </Link>
                </AccountPreviewHome>

                <AccountPreviewHome data={data}>
                    <div className={cx('info')}>
                        <div className={cx('nickname')}>
                            <Link to={`/@${data.user?.nickname}`}>
                                <span>{data.user?.nickname}</span>
                            </Link>
                        </div>
                        <div className={cx('fullname')}>
                            <span>{`${data.user?.first_name} ${data.user?.last_name} · ${data?.created_at?.slice(
                                0,
                                10,
                            )}`}</span>
                        </div>
                    </div>
                </AccountPreviewHome>
                <div className={cx('follow')}>
                    {!isLogin ? (
                        <Button
                            small
                            primary={false}
                            outline={true}
                            className={cx('follow-btn')}
                            onClick={showLoginModal}
                        >
                            Follow
                        </Button>
                    ) : (
                        <Follow
                            primary={true}
                            outline={false}
                            userID={data.user?.id}
                            isFollow={data.user?.is_followed}
                            className={cx('custom')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

UserInfo.propTypes = {
    data: PropTypes.object.isRequired,
};

export default UserInfo;
