import { useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

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
    InboxedIcon,
    LogoIcon,
    LogoutIcon,
    MessageIcon,
    MessageSolidIcon,
    SettingsIcon,
    UserMenuIcon,
} from '~/components/Icons';
import Search from '../Search';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { MENU_ITEMS } from '~/constants/constants';

const cx = classNames.bind(styles);

function Header({ className }) {
    const { showLoginModal, showNotifiCationModal, isShowNotifiCation, hideNotifiModal } = useContext(ModalEnviroment);

    const location = useLocation();

    const user = useSelector((state) => state.auth.login?.currentUser) ?? {};
    const isLogin = useSelector((state) => state.auth.login?.isLogin) ?? false;
    const userMenu = [
        {
            icon: <UserMenuIcon />,
            title: 'View profile',
            to: `/@${user.nickname}`,
        },
        {
            icon: <GetCoinsIcon />,
            title: 'Get coins',
        },
        {
            icon: <SettingsIcon />,
            title: 'Settings',
        },
        ...MENU_ITEMS,
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

    const handleShowNotifiCation = () => {
        isShowNotifiCation ? hideNotifiModal() : showNotifiCationModal();
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
                            >
                                Upload
                            </Button>

                            <Tippy delay={[0, 50]} content="Messages" placement="bottom">
                                <Link to={'/message'}>
                                    <button className={cx('action-btn')}>
                                        {location.pathname.includes('/message') ? (
                                            <MessageSolidIcon />
                                        ) : (
                                            <MessageIcon />
                                        )}
                                    </button>
                                </Link>
                            </Tippy>
                            <Tippy delay={[0, 50]} offset={[0, 6]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')} onClick={handleShowNotifiCation}>
                                    {isShowNotifiCation ? <InboxedIcon /> : <InboxIcon />}
                                    {/* <span className={cx('badge')}>12</span> */}
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
                        items={isLogin ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        offset={[14, 8]}
                        placement="bottom-end"
                        delay={[0, 700]}
                        zIndex="99999"
                    >
                        {isLogin ? (
                            <Image className={cx('user-avatar')} src={user.avatar} alt={user.nickName} />
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
