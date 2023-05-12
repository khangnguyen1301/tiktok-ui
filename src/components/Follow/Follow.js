import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';

import Button from '../Button';
import * as followService from '~/services/followService';
import * as videoService from '~/services/videoService';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { handleRequestFollow, handleRequestUnFollow } from '~/redux/followSlice';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Follow({ className, primary = false, outline = true, userID, videoID, isFollow }) {
    const [isFollowed, setIsFollowed] = useState(isFollow);
    const dispatch = useDispatch();
    const { isChangeFollow, synchronizedFollow } = useSelector((state) => state.follow);

    useEffect(() => {
        const getFollowInfo = async () => {
            const res = await videoService.getVideo(videoID);
            setIsFollowed(res?.user?.is_followed);
        };
        if (videoID) {
            synchronizedFollow && getFollowInfo();
        }
    }, [isChangeFollow]);

    const stateFollowUser = () => {
        if (!isFollowed) {
            const follow = async () => {
                const result = await followService.followUser({ userID: userID });
                setIsFollowed(result?.is_followed);
                dispatch(handleRequestFollow());
            };
            follow();
        } else {
            const unFollow = async () => {
                const result = await followService.unFollowUser({ userID: userID });
                setIsFollowed(result?.is_followed);
                dispatch(handleRequestUnFollow());
            };
            unFollow();
        }
    };

    return (
        <div>
            {isFollowed ? (
                <Button custom className={cx('follow', { [className]: className })} onClick={() => stateFollowUser()}>
                    Following
                </Button>
            ) : (
                <Button
                    small
                    outline={outline}
                    primary={primary}
                    className={cx('un-follow', { [className]: className })}
                    onClick={() => stateFollowUser()}
                >
                    Follow
                </Button>
            )}
        </div>
    );
}

Follow.propTypes = {
    className: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    userID: PropTypes.number,
    index: PropTypes.number,
    isFollow: PropTypes.bool,
    updateFollow: PropTypes.object,
    handleFollow: PropTypes.func,
    isUpdateFollow: PropTypes.bool,
};

export default Follow;
