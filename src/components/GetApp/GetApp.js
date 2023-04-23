import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './GetApp.module.scss';

import Button from '../Button';
import { DeskTopIcon, MobileIcon, ScrollToTopIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);

function GetApp() {
    const [active, setActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const { showDownLoadMobileModal } = useContext(ModalEnviroment);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        setActive(window.scrollY > 80);
    };

    const handleShowDownLoadModal = () => {
        setShowOptions(false);
        showDownLoadMobileModal();
    };

    return (
        <div className={cx('action', { active: active })}>
            <div className={cx('download-container')}>
                <Button custom className={cx('get-app', { hide: showOptions })} onClick={() => setShowOptions(true)}>
                    Get app
                </Button>
                <div className={cx('download-options', { activeDownload: showOptions })}>
                    <div className={cx('close-icon')} onClick={() => setShowOptions(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx('download-item')}>
                        <DeskTopIcon />
                        <span className={cx('title')}>Get TikTok for desktop</span>
                    </div>
                    <div className={cx('download-item')} onClick={handleShowDownLoadModal}>
                        <MobileIcon />
                        <span className={cx('title')}>Get TikTok App</span>
                    </div>
                </div>
            </div>

            <Button small className={cx('scroll-top')} primary onClick={handleScrollToTop}>
                <ScrollToTopIcon />
            </Button>
        </div>
    );
}

export default GetApp;
