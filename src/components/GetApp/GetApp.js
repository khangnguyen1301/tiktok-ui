import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './GetApp.module.scss';

import Button from '../Button';
import { ScrollToTopIcon } from '../Icons';

const cx = classNames.bind(styles);

function GetApp() {
    const [active, setActive] = useState(false);
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

    return (
        <div className={cx('action', { active: active })}>
            <Button custom className={cx('get-app')}>
                Get app
            </Button>
            <Button small className={cx('scroll-top')} primary onClick={handleScrollToTop}>
                <ScrollToTopIcon />
            </Button>
        </div>
    );
}

export default GetApp;
