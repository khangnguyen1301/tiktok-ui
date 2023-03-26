import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import config from '~/config';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { GetCoinsIcon, InboxIcon, LogoutIcon, MessageIcon, SettingsIcon, UserMenuIcon } from '~/components/Icons';
import Search from '../Search';
import { useContext } from 'react';
import { useLocalStorage } from '~/hooks';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { MENU_ITEMS } from '~/contants/contants';

const cx = classNames.bind(styles);

function Header({ className }) {
    const { showLoginModal } = useContext(ModalEnviroment);

    const { getDataLocalStorage } = useLocalStorage();

    const userInfo = getDataLocalStorage('user-info');
    const stateLogin = getDataLocalStorage('user-login');

    const userMenu = [
        {
            icon: <UserMenuIcon />,
            title: 'View profile',
            to: `/@${userInfo.data.nickName}`,
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
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', className)}>
                <div className={cx('logo-container')}>
                    <Link to={config.routes.home} className={cx('logo')}>
                        <img src={images.logo} alt="Tiktok" />
                    </Link>
                </div>

                {/* Search */}
                <Search />
                <div className={cx('actions')}>
                    {stateLogin?.state ? (
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
                        items={stateLogin?.state ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        offset={[14, 8]}
                        placement="bottom-end"
                        delay={[0, 700]}
                    >
                        {stateLogin?.state ? (
                            <Image
                                className={cx('user-avatar')}
                                src={userInfo.data?.avatar}
                                alt={userInfo.data?.nickName}
                            />
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
