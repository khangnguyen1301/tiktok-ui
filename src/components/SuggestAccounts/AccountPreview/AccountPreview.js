import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext } from 'react';
import { ModalContext } from '~/components/ModalProvider';
import Follow from '~/components/Follow';

const cx = classNames.bind(styles);
function AccountPreview({ data, outlineButton = false, bioDescription = false }) {
    const userLogin = localStorage.getItem('user-login');
    const stateLogin = JSON.parse(userLogin);

    const context = useContext(ModalContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('link')} to={`/@${data?.nickname}`} onClick={context.handleHidePlayer}>
                    <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname} />
                </Link>
                {!stateLogin.state ? (
                    <Button
                        small
                        primary={!outlineButton}
                        outline={outlineButton}
                        className={cx('custom-btn')}
                        onClick={() => context.handleShowModal()}
                    >
                        Follow
                    </Button>
                ) : (
                    <Follow
                        primary={!outlineButton}
                        outline={outlineButton}
                        userID={data?.id}
                        isFollow={data?.is_followed}
                        className={cx('custom-btn')}
                    />
                )}
            </div>
            <div className={cx('body')}>
                <Link to={`/@${data?.nickname}`} className={cx('body-link')} onClick={context.handleHidePlayer}>
                    <p className={cx('nickname')}>
                        <strong>{data?.nickname}</strong>
                        {data?.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                    </p>
                    <p className={cx('name')}>{`${data?.first_name} ${data?.last_name}`}</p>
                </Link>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{`${data?.followers_count ?? 0}`} </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>{`${data?.likes_count}`} </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
            {bioDescription && (
                <div className={cx('footer')}>
                    <p className={cx('bio')}>{data?.bio}</p>
                </div>
            )}
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object,
};

export default AccountPreview;
