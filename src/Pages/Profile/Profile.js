/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import {
    BanMiniIcon,
    BlockIcon,
    EditIcon,
    FlagMiniIcon,
    LinkIcon,
    MessageMiniIcon,
    ProfileIcon,
    ShareIconRegular,
    ThreeDotIcon,
} from '~/components/Icons';
import * as proFileService from '~/services/proFileService';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '~/layouts/components/Sidebar';
import Button from '~/components/Button';
import Image from '~/components/Image';
import VideoPreview from '~/components/VideoPreview';
import Menu from '~/components/Popper/Menu';
import ShareAction from '~/components/ShareAction';
import Follow from '~/components/Follow';
import { useLocalStorage } from '~/hooks';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);

const VIDEO_TAB = 1;
const LIKED_TAB = 2;

const ACTION_MENU = [
    {
        icon: <MessageMiniIcon />,
        title: 'Send message',
    },
    {
        icon: <FlagMiniIcon />,
        title: 'Report',
        separate: true,
    },
    {
        icon: <BanMiniIcon />,
        title: 'Block',
        separate: true,
    },
];

function Profile() {
    const [user, setUser] = useState({});
    const [selectTab, setSelectTab] = useState(VIDEO_TAB);
    const [activeBar, setActiveBar] = useState(VIDEO_TAB);
    const [positionPlay, setPositionPlay] = useState(0);
    const { getDataLocalStorage } = useLocalStorage();
    const stateLogin = getDataLocalStorage('user-login');
    const userInfo = getDataLocalStorage('user-info');

    const userID = useLocation();
    const { showLoginModal, showUpdateModal } = useContext(ModalEnviroment);
    const context = useContext(VideoEnviroment);

    useEffect(() => {
        context.handleSetPositionVideo(0);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchApi = async () => {
            const result = await proFileService.getInfoUser(userID.pathname);
            setUser(result);
            context.handleSetListVideo(result?.videos);
        };
        fetchApi();
        setSelectTab(VIDEO_TAB);
        setActiveBar(VIDEO_TAB);
    }, [userID.pathname]);

    const handleSelectTab = (tab) => {
        setSelectTab(tab);
    };

    const handleActiveBarShow = (tab) => {
        setActiveBar(tab);
    };

    const handleMouseMove = (value) => {
        setPositionPlay(value);
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar className={cx('custom-sidebar')} />
            <div className={cx('profile')}>
                <div className={cx('info')}>
                    <div className={cx('header')}>
                        <Image src={user?.avatar} alt={user?.nickname} className={cx('avatar')} />
                        <div className={cx('name-container')}>
                            <div className={cx('name')}>
                                <h2 className={cx('nick-name')}>{user?.nickname}</h2>
                                {user?.tick && (
                                    <span>
                                        <FontAwesomeIcon icon={faCircleCheck} className={cx('tick')} />
                                    </span>
                                )}
                            </div>
                            <h1 className={cx('full-name')}>{`${user?.first_name} ${user?.last_name}`}</h1>

                            {!stateLogin?.state ? (
                                <Button small primary className={cx('custom-btn')} onClick={showLoginModal}>
                                    Follow
                                </Button>
                            ) : userID.pathname.includes(userInfo.data.nickName) ? (
                                <Button
                                    leftIcon={<EditIcon />}
                                    custom
                                    className={cx('edit-btn')}
                                    onClick={showUpdateModal}
                                >
                                    Edit profile
                                </Button>
                            ) : (
                                <Follow
                                    primary
                                    outline={false}
                                    className={cx('custom-btn')}
                                    userID={user?.id}
                                    isFollow={user?.is_followed}
                                />
                            )}
                        </div>
                    </div>
                    <div className={cx('counter')}>
                        <strong>{user?.followings_count}</strong>
                        <span>Following</span>
                        <strong>{user?.followers_count}</strong>
                        <span>Followers</span>
                        <strong>{user?.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                    <h2 className={cx('bio')}>{user?.bio ?? 'No bio yet'}</h2>
                    <div className={cx('link')}>
                        <LinkIcon />
                        <span>{`www.facebook.com/${user?.nickname}`}</span>
                    </div>
                    <div className={cx('icon')}>
                        <ShareAction delay={[0, 300]} offset={[-43, 0]} placement="bottom-end" zIndex="999">
                            <div className={cx('icon-item')}>
                                <ShareIconRegular />
                            </div>
                        </ShareAction>
                        <Menu
                            items={ACTION_MENU}
                            className={cx('custom-menu')}
                            offset={[60, 0]}
                            delay={[0, 300]}
                            placement="bottom-end"
                            custom
                            customMenuItem
                        >
                            <div className={cx('icon-item')}>
                                <ThreeDotIcon />
                            </div>
                        </Menu>
                    </div>
                </div>

                <div className={cx('video-container')}>
                    <div className={cx('tab-redirect')}>
                        <span
                            className={cx('tab-item', { text: selectTab === VIDEO_TAB })}
                            onClick={() => handleSelectTab(VIDEO_TAB)}
                            onMouseOver={() => handleActiveBarShow(VIDEO_TAB)}
                            onMouseOut={() => handleActiveBarShow(selectTab)}
                        >
                            Videos
                        </span>

                        <div
                            className={cx('tab-item', { text: selectTab === LIKED_TAB })}
                            onClick={() => handleSelectTab(LIKED_TAB)}
                            onMouseOver={() => handleActiveBarShow(LIKED_TAB)}
                            onMouseOut={() => handleActiveBarShow(selectTab)}
                        >
                            <BlockIcon />
                            <span>Liked</span>
                        </div>
                        <div
                            className={cx('active-bar', {
                                active: activeBar !== VIDEO_TAB,
                            })}
                        ></div>
                    </div>
                    {user?.videos?.length === 0 && (
                        <div className={cx('none-item')}>
                            <ProfileIcon />
                            {selectTab === VIDEO_TAB ? (
                                <p> No videos have been posted yet</p>
                            ) : (
                                <p> No liked videos yet</p>
                            )}
                        </div>
                    )}
                    {selectTab === VIDEO_TAB ? (
                        <div className={cx('video-item')}>
                            {user?.videos?.map((res, index) => (
                                <VideoPreview
                                    data={res}
                                    key={res.id}
                                    index={index}
                                    handleMouseMove={handleMouseMove}
                                    play={index === positionPlay}
                                    profile={true}
                                    videoID={res.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={cx('none-item')}>
                            <ProfileIcon />
                            <p> No liked videos yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
