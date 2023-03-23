import Button from '../Button';
import * as followService from '~/services/followService';
import { useContext, useState } from 'react';
import { ModalContext } from '../ModalProvider';
import { useLocation } from 'react-router-dom';

function Follow({
    className,
    primary = false,
    outline = true,
    userID,
    index,
    isFollow,
    updateFollow,
    handleFollow,
    isUpdateFollow,
}) {
    const [isFollowed, setIsFollowed] = useState(isFollow);
    const context = useContext(ModalContext);
    const location = useLocation();

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
                <Button custom className={className} onClick={() => unFollow()}>
                    Following
                </Button>
            ) : (
                <Button small outline={outline} primary={primary} className={className} onClick={() => follow()}>
                    Follow
                </Button>
            )}
        </div>
    );
}

export default Follow;
