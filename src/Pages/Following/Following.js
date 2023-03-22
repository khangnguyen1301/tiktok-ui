import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import VideoPreview from '~/components/VideoPreview';
import styles from './Following.module.scss';
import * as userService from '~/services/userService';
import * as followingService from '~/services/followingService';
import Home from '../Home';
import Video from '~/components/Video';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);
function Following() {
    const [followList, setFollowList] = useState([]);
    const [positionPlay, setPositionPlay] = useState(0);
    const userLogin = localStorage.getItem('user-login');
    const stateLogin = JSON.parse(userLogin);
    useEffect(() => {
        if (stateLogin.state) {
            const getFollowing = async () => {
                const followVideoList = await followingService.getVideoListFollowing({ page: 1 });
                setFollowList(followVideoList);
            };
            getFollowing();
        } else {
            async function fetchApi() {
                const data = await userService.getSuggested({ page: 9, perPage: DEFAULT_PERPAGE });
                setFollowList(data);
            }
            fetchApi();
        }
    }, [userLogin]);
    const handleMouseMove = (value) => {
        setPositionPlay(value);
    };
    return (
        <>
            {!stateLogin.state ? (
                <div className={cx('wrapper')}>
                    {followList.map((res, index) => (
                        <VideoPreview
                            data={res}
                            key={res?.id}
                            index={index}
                            handleMouseMove={handleMouseMove}
                            play={index === positionPlay}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {followList?.map((video, index) => (
                        <Video
                            data={video}
                            videoID={video?.id}
                            index={index}
                            //onCloseModal={index === positionCurrentElement}
                            //currentElement={handleSetCurrentElement}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Following;
