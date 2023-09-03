import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';

import Button from '../Button';
import * as followService from '~/services/followService';
import { useState } from 'react';

import { handleRequestFollow, handleRequestUnFollow, handleCurrentVideoId, handleResetStateFollow } from '~/redux/followSlice';

const cx = classNames.bind(styles);

function Follow({ className, primary = false, outline = true, userID, isFollow }) {
    const [isFollowed, setIsFollowed] = useState(isFollow);
    const dispatch = useDispatch();
    const { isChangeFollow, stateFollow, synchronizedFollow, currentUserId } = useSelector((state) => state.follow);

    useLayoutEffect(() => {
        setIsFollowed(isFollow);
    }, [userID]);

    useEffect(() => {
        if (userID === currentUserId) {
            synchronizedFollow && setIsFollowed(stateFollow);
        }
    }, [isChangeFollow, currentUserId]);

    const stateFollowUser = () => {
        dispatch(handleCurrentVideoId(userID));
        if (!isFollowed) {
            const follow = async () => {
                setIsFollowed(true);
                dispatch(handleRequestFollow());
                await followService.followUser({ userID });
            };
            follow();
        } else {
            const unFollow = async () => {
                setIsFollowed(false);
                dispatch(handleRequestUnFollow());
                await followService.unFollowUser({ userID });
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
    videoID: PropTypes.number,
    index: PropTypes.number,
    isFollow: PropTypes.bool,
};

export default Follow;
