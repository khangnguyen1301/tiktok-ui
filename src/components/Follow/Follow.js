import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Follow.module.scss';

import Button from '../Button';
import * as followService from '~/services/followService';
import { useContext, useLayoutEffect, useState } from 'react';

import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { useDispatch } from 'react-redux';
import { changeFollow } from '~/redux/followSlice';

const cx = classNames.bind(styles);

function Follow({
    className,
    primary = false,
    outline = true,
    userID,
    index,
    isFollow,
    updateFollow,
    handleFollow = () => {},
    isUpdateFollow,
}) {
    const [isFollowed, setIsFollowed] = useState(false);
    const context = useContext(VideoEnviroment);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        setIsFollowed(isFollow);
    }, [userID]);

    const follow = async () => {
        const result = await followService.followUser({ userID: userID || context.listVideo[index]?.user?.id });
        setIsFollowed(true);
        handleFollow(result);
        dispatch(changeFollow());
    };

    const unFollow = async () => {
        const result = await followService.unFollowUser({ userID: userID || context.listVideo[index]?.user?.id });
        setIsFollowed(false);
        handleFollow(result);
        dispatch(changeFollow());
    };

    return (
        <div>
            {((updateFollow?.is_followed ?? isFollowed) && isUpdateFollow) || isFollowed ? (
                <Button custom className={cx('follow', { [className]: className })} onClick={() => unFollow()}>
                    Following
                </Button>
            ) : (
                <Button
                    small
                    outline={outline}
                    primary={primary}
                    className={cx('un-follow', { [className]: className })}
                    onClick={() => follow()}
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
