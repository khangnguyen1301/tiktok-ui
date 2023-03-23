import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import VideoPreview from '~/components/VideoPreview';
import styles from './Following.module.scss';
import * as userService from '~/services/userService';
import * as videoService from '~/services/videoService';

import VideoList from '~/components/VideoList';
import { ModalContext } from '~/components/ModalProvider';
import { useLocation } from 'react-router-dom';

const DEFAULT_PERPAGE = 15;

const cx = classNames.bind(styles);

function Following() {
    const [followList, setFollowList] = useState([]);
    const [positionPlay, setPositionPlay] = useState(0);
    const [page, setPage] = useState(1);

    const userLogin = localStorage.getItem('user-login');
    const stateLogin = JSON.parse(userLogin);
    const context = useContext(ModalContext);
    const location = useLocation();

    useEffect(() => {
        context.handleSetListVideo([]);
    }, [location.pathname]);

    useEffect(() => {
        if (stateLogin.state) {
            const getFollowing = async () => {
                const followVideoList = await videoService.getVideoListFollowing({ page: page });
                setFollowList((prev) => [...prev, ...followVideoList]);
                context.handleSetListVideo((prev) => [...prev, ...followVideoList]);
            };
            getFollowing();
        } else {
            async function getSuggestAccount() {
                const data = await userService.getSuggested({ page: 9, perPage: DEFAULT_PERPAGE });
                setFollowList(data);
            }
            getSuggestAccount();
        }
    }, [stateLogin.state, page]);

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
                    <VideoList data={followList} />
                </div>
            )}
        </>
    );
}

export default Following;
