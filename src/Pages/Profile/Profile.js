import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { BlockIcon, LinkIcon, ShareIconRegular, ThreeDotIcon } from '~/components/Icons';
import Image from '~/components/Image';
import * as proFileService from '~/services/proFileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '~/layouts/components/Sidebar';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

function Profile() {
    const [user, setUser] = useState({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const userID = useLocation();
    useEffect(() => {
        const fetchApi = async () => {
            const result = await proFileService.getInfoUser(userID.pathname);
            setUser(result);
        };
        fetchApi();
    }, [userID.pathname]);
    return (
        <div className={cx('wrapper')}>
            <Sidebar className={cx('custom-sidebar')} />
            <div className={cx('profile')}>
                <div className={cx('info')}>
                    <div className={cx('header')}>
                        <Image src={user.avatar} alt={user.nickname} className={cx('avatar')} />
                        <div className={cx('name-container')}>
                            <div className={cx('name')}>
                                <h2 className={cx('nick-name')}>{user.nickname}</h2>
                                <span>
                                    <FontAwesomeIcon icon={faCircleCheck} className={cx('tick')} />
                                </span>
                            </div>
                            <h1 className={cx('full-name')}>{`${user.first_name} ${user.last_name}`}</h1>
                            <Button primary large className={cx('custom-btn')}>
                                Follow
                            </Button>
                        </div>
                    </div>
                    <div className={cx('counter')}>
                        <strong>{user.followings_count}</strong>
                        <span>Following</span>
                        <strong>{user.followers_count}</strong>
                        <span>Followers</span>
                        <strong>{user.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                    <h2 className={cx('bio')}>{user.bio ?? 'No bio yet'}</h2>
                    <div className={cx('link')}>
                        <LinkIcon />
                        <span>{`www.facebook.com/${user.nickname}`}</span>
                    </div>
                    <div className={cx('icon')}>
                        <span>
                            <ShareIconRegular />
                        </span>
                        <span>
                            <ThreeDotIcon />
                        </span>
                    </div>
                </div>

                <div className={cx('video-container')}>
                    <div className={cx('tab-redirect')}>
                        <span className={cx('tab-item')}>Videos</span>

                        <div className={cx('tab-item')}>
                            <BlockIcon />
                            <span>Liked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
