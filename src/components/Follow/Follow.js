import classNames from 'classnames/bind';
import styles from './Follow.module.scss';

import Button from '../Button';
import * as followService from '~/services/followService';
import { useContext, useLayoutEffect, useState } from 'react';

import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

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

    useLayoutEffect(() => {
        setIsFollowed(isFollow);
    }, [userID]);

    const follow = async () => {
        const result = await followService.followUser({ userID: userID || context.listVideo[index]?.user?.id });
        setIsFollowed(true);
        handleFollow(result);
    };

    const unFollow = async () => {
        const result = await followService.unFollowUser({ userID: userID || context.listVideo[index]?.user?.id });
        setIsFollowed(false);
        handleFollow(result);
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

export default Follow;
