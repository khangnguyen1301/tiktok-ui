import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import VideoPreview from '~/components/VideoPreview';
import styles from './Following.module.scss';
import * as userService from '~/services/userService';
import * as videoService from '~/services/videoService';

import VideoList from '~/components/VideoList';
import { useLocation } from 'react-router-dom';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { useSelector } from 'react-redux';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);

function Following() {
    const [followList, setFollowList] = useState([]);
    const [suggestAccount, setSuggestAccount] = useState([]);
    const [positionPlay, setPositionPlay] = useState(0);
    const [page, setPage] = useState(1);

    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;

    const context = useContext(VideoEnviroment);
    const location = useLocation();

    useEffect(() => {
        context.handleSetListVideo([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useLayoutEffect(() => {
        if (isLogin) {
            const getFollowing = async () => {
                const followVideoList = await videoService.getVideoListFollowing({ page: page });
                setFollowList((prev) => [...prev, ...followVideoList]);
                context.handleSetListVideo((prev) => [...prev, ...followVideoList]);
            };
            getFollowing();
        }
        async function getSuggestAccount() {
            const data = await userService.getSuggested({ page: 9, perPage: DEFAULT_PERPAGE });
            setSuggestAccount(data);
        }
        getSuggestAccount();
    }, [isLogin, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    };

    const handleMouseMove = (value) => {
        setPositionPlay(value);
    };

    return (
        <>
            {!isLogin ? (
                <div className={cx('wrapper')}>
                    {suggestAccount.map((res, index) => (
                        <VideoPreview
                            data={res}
                            key={res?.id}
                            index={index}
                            handleMouseMove={handleMouseMove}
                            play={index === positionPlay}
                        />
                    ))}
                </div>
            ) : followList.length > 0 || isLogin ? (
                <div>
                    <VideoList data={followList} />
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    {suggestAccount.map((res, index) => (
                        <VideoPreview
                            data={res}
                            key={res?.id}
                            index={index}
                            handleMouseMove={handleMouseMove}
                            play={index === positionPlay}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Following;
