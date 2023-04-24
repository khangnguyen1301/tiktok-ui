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
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading/HomeAccountLoading';
import { InView } from 'react-intersection-observer';
import TiktokLoading from '~/components/Loadings/TiktokLoading';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);

function Following() {
    const [followList, setFollowList] = useState([]);
    const [suggestAccounts, setSuggestAccounts] = useState([]);
    const [positionPlay, setPositionPlay] = useState(0);
    const [page, setPage] = useState(1);

    const isLogin = useSelector((state) => state.auth.login?.isLogin);

    const context = useContext(VideoEnviroment);
    const location = useLocation();

    useEffect(() => {
        context.handleSetListVideo([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useLayoutEffect(() => {
        const getSuggestAccount = async () => {
            const suggestAccountsList = await userService.getSuggested({ page: 9, perPage: DEFAULT_PERPAGE });
            handleSetSuggestList(suggestAccountsList);
        };
        const getFollowing = async () => {
            const followVideoList = await videoService.getVideoListFollowing({ page: page });
            handleSetFollowList((prev) => [...prev, ...followVideoList]);
            context.handleSetListVideo((prev) => [...prev, ...followVideoList]);
            getSuggestAccount();
        };
        isLogin ? getFollowing() : getSuggestAccount();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, page]);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const handleSetFollowList = async (list) => {
        await setFollowList(list);
    };

    const handleSetSuggestList = async (list) => {
        await setSuggestAccounts(list);
    };

    // const handleScroll = () => {
    //     if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    //         setPage((page) => page + 1);
    //     }
    // };

    const handleMouseMove = (value) => {
        setPositionPlay(value);
    };

    const handleRandomPage = () => {
        let checkDuplicate = false;
        let randomPage = 0;
        let prevPage = 0;
        do {
            prevPage = page;
            randomPage = Math.floor(Math.random() * 10 + 1);
            checkDuplicate = randomPage === prevPage;
        } while (checkDuplicate);

        setPage(randomPage);
    };

    return (
        <div className={cx('wrapper-following')}>
            {isLogin && suggestAccounts.length === 0 ? (
                <HomeAccountLoading />
            ) : !isLogin || (isLogin && followList.length === 0) ? (
                <div className={cx('wrapper')}>
                    {suggestAccounts.map((res, index) => (
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
                    <VideoList data={followList} />
                </div>
            )}
            <InView onChange={(inView) => inView && handleRandomPage()}>
                {suggestAccounts.length === 0 ? (
                    <></>
                ) : (
                    <div className={cx('load-more')}>
                        <TiktokLoading small />
                    </div>
                )}
            </InView>
        </div>
    );
}

export default Following;
