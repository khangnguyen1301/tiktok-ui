import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useLocalStorage } from '~/hooks';
import styles from './Theme.module.scss';

const cx = classNames.bind(styles);

function Theme() {
    const { setDataLocalStorage, getDataLocalStorage } = useLocalStorage();
    const currentTheme = getDataLocalStorage('history-theme')?.theme;
    const [isDarkMode, setIsDarkMode] = useState(currentTheme === 'dark');

    const themeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const themeData = {
            theme: 'light',
        };

        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeData.theme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        setDataLocalStorage('history-theme', themeData);
    }, [isDarkMode, setDataLocalStorage]);

    return (
        <div>
            <input type="checkbox" id={cx('theme-input')} hidden checked={isDarkMode} onChange={themeToggle} />
            <label className={cx('switch')} htmlFor={cx('theme-input')}></label>
        </div>
    );
}

export default Theme;
