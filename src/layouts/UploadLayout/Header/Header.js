import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import Image from '~/components/Image';
import config from '~/config';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    GetCoinsIcon,
    InboxIcon,
    LogoIcon,
    LogoutIcon,
    MessageIcon,
    SettingsIcon,
    UserMenuIcon,
} from '~/components/Icons';
import Search from '../Search';
import { useContext } from 'react';

import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { MENU_ITEMS_UPLOAD_LAYOUT } from '~/constants/constants';

const cx = classNames.bind(styles);

function Header({ className }) {
    const { showLoginModal } = useContext(ModalEnviroment);

    const userInfo = useSelector((state) => state.auth.login?.currentUser?.data) ?? {};
    const isLogin = useSelector((state) => state.auth.login?.isLogin) ?? false;

    const userMenu = [
        {
            icon: <UserMenuIcon />,
            title: 'View profile',
            to: `/@${userInfo.nickname}`,
        },
        {
            icon: <GetCoinsIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <SettingsIcon />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS_UPLOAD_LAYOUT,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            logout: true,
            separate: true,
        },
    ];
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                <div className={cx('logo-container')}>
                    <Link to={config.routes.home} className={cx('logo')}>
                        <LogoIcon />
                    </Link>
                </div>

                {/* Search */}
                <Search />
                <div className={cx('actions')}>
                    {isLogin ? (
                        <>
                            <Button
                                outline
                                custom
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                to={config.routes.upload}
                                className={cx('upload-btn')}
                            >
                                Upload
                            </Button>

                            <Tippy delay={[0, 50]} content="Messages" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} offset={[0, 6]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button custom leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={showLoginModal}>
                                Upload
                            </Button>

                            <Button primary onClick={showLoginModal}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu
                        items={isLogin ? userMenu : MENU_ITEMS_UPLOAD_LAYOUT}
                        onChange={handleMenuChange}
                        offset={[14, 8]}
                        placement="bottom-end"
                        delay={[0, 700]}
                        className={cx('upload-layout')}
                        uploadLayout
                    >
                        {isLogin ? (
                            <Image className={cx('user-avatar')} src={userInfo?.avatar} alt={userInfo?.nickName} />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
