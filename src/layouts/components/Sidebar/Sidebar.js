import { useState, useEffect, useRef, useContext } from 'react';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    HashTagIcon,
    HashTagMusicIcon,
    CreateEffectIcon,
} from '~/components/Icons';
import SuggestAccounts from '~/components/SuggestAccounts';
import * as userService from '~/services/userService';
import Button from '~/components/Button';
import images from '~/assets/images';
import { ModalContext } from '~/components/ModalProvider';
const cx = classNames.bind(styles);

const DEFAULT_PERPAGE = 15;

const HASH_TAG = [
    {
        tag: true,
        content: 'suthatla',
    },
    {
        tag: true,
        content: 'mackedoi',
    },
    {
        tag: true,
        content: 'sansangthaydoi',
    },

    {
        tag: false,
        content: 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & hOn & BHMedia',
    },
    {
        tag: false,
        content: 'Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàn',
    },
    {
        tag: false,
        content: 'Thiên Thần Tình Yêu - RICKY STAR',
    },
    {
        tag: true,
        content: '7749hieuung',
    },
    {
        tag: true,
        content: 'genzlife',
    },
    {
        tag: false,
        content: 'Tình Đầy Một Tim - Huyền Tâm Môn',
    },
    {
        tag: false,
        content: 'Thằng Hầu (Thái Hoàng Remix ) [Short Version]',
    },
];

function Sidebar({ className }) {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const sideBarRef = useRef();
    const context = useContext(ModalContext);

    useEffect(() => {
        async function fetchApi() {
            const data = await userService.getSuggested({ page: 1, perPage: DEFAULT_PERPAGE });
            setSuggestedUsers(data);
        }
        fetchApi();
    }, []);
    return (
        <aside className={cx('wrapper', className)} ref={sideBarRef}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <div className={cx('log-in')}>
                <p className={cx('title')}>Log in to follow creators, like videos, and view comments.</p>
                <Button large outline className={cx('custom-btn')} onClick={context?.handleShowModal}>
                    Log in
                </Button>
            </div>
            <SuggestAccounts title="Suggested accounts" data={suggestedUsers} sideBarRef={sideBarRef} />
            <div className={cx('hashtag')}>
                <p className={cx('discover')}>Discover</p>
                <div className={cx('hashtag-box')}>
                    {HASH_TAG.map((hashtag, index) => (
                        <button key={index} className={cx('hashtag-btn')}>
                            {hashtag.tag ? <HashTagIcon /> : <HashTagMusicIcon className={cx('style-music')} />}
                            <span className={cx('hashtag-content')}>{hashtag.content}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className={cx('effect')}>
                <div className={cx('bg-container')}>
                    <img src={images.btnBackground} className={cx('effect-btn')} />
                    <a href="https://effecthouse.tiktok.com/" target={'_blank'}>
                        <div className={cx('bg-content')}>
                            {' '}
                            <CreateEffectIcon />
                            <span className={cx('content')}>Create effects</span>
                        </div>
                    </a>
                </div>
            </div>
            <div className={cx('link-container')}>
                <p className={cx('link')}>About</p>
                <p className={cx('link')}>Newsroom</p>
                <p className={cx('link')}>Contact</p>
                <p className={cx('link')}>Careers</p>
                <p className={cx('link')}>ByteDance</p>
                <p className={cx('link')}>TikTok for Good</p>
                <p className={cx('link')}>Advertise</p>
                <p className={cx('link')}>Developers</p>
                <p className={cx('link')}>Transparency </p>
                <p className={cx('link')}>TikTok Rewards</p>
                <p className={cx('link')}>TikTok Browse</p>
                <p className={cx('link')}>TikTok Embeds</p>
                <p className={cx('link')}>Help</p>
                <p className={cx('link')}>Safety</p>
                <p className={cx('link')}>Terms</p>
                <p className={cx('link')}>Privacy</p>
                <p className={cx('link')}>Creator Portal</p>
                <p className={cx('link')}>Community Guidelines </p>
            </div>
            <div className={cx('tiktok')}>&copy; 2023 TikTok</div>
        </aside>
    );
}

export default Sidebar;
