import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useContext } from 'react';
import Follow from '~/components/Follow';

import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);
function AccountPreview({ data, outlineButton = false, bioDescription = false, videoID }) {
    const isLogin = useSelector((state) => state.auth.login?.isLogin) ?? false;

    const { showLoginModal } = useContext(ModalEnviroment);

    const context = useContext(VideoEnviroment);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link className={cx('link')} to={`/@${data?.nickname}`} onClick={() => context.hideVideoPlayer()}>
                    <Image className={cx('avatar')} src={data?.avatar} alt={data?.nickname} />
                </Link>
                {!isLogin ? (
                    <Button
                        small
                        primary={!outlineButton}
                        outline={outlineButton}
                        className={cx('follow-btn')}
                        onClick={showLoginModal}
                    >
                        Follow
                    </Button>
                ) : (
                    <Follow
                        primary={!outlineButton}
                        outline={outlineButton}
                        userID={data?.id}
                        videoID={videoID}
                        isFollow={data?.is_followed}
                        className={cx('follow-btn')}
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
    outlineButton: PropTypes.bool,
    bioDescription: PropTypes.bool,
};

export default AccountPreview;
