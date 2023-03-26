import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { ChevronDownIcon } from '~/components/Icons';
import { computeHeadingLevel } from '@testing-library/react';
import { useLocalStorage } from '~/hooks';
const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
    items = [],
    children,
    onHideResetAction,
    customMenuItem,
    shareMenuItem,
    offset,
    delay,
    placement,
    zIndex,
    custom,
    className,
    onChange = defaultFn,
    hideOnClick = false,
    arrowBottom = false,
    expanded = false,
    hidden = false,
    share = false,
    shareActive = false,
}) {
    const [history, setHistory] = useState([{ data: items }]);

    const { setDataLocalStorage } = useLocalStorage();

    const current = history[history.length - 1];

    useLayoutEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper', { [className]: className, arrow: arrowBottom })}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body', { hidden: hidden })}>{renderItems()}</div>
                {expanded && (
                    <div className={cx('expand-btn')} onClick={() => onHideResetAction(false)}>
                        <ChevronDownIcon />
                    </div>
                )}
            </PopperWrapper>
        </div>
    );

    const handleReset = () => {
        if (!expanded && share) {
            onHideResetAction((prev) => !prev);
        }
        setHistory((prev) => prev.slice(0, 1));
    };

    const logOut = () => {
        setDataLocalStorage('user-login', { state: false });
        window.location.reload();
    };

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item?.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            if (item.logout) {
                                console.log('da vao day');
                                logOut();
                            } else {
                                onChange(item);
                            }
                        }
                    }}
                    custom={custom}
                    customMenuItem={customMenuItem}
                    shareMenuItem={shareMenuItem}
                    shareActive={shareActive}
                />
            );
        });
    };

    return (
        <div>
            <Tippy
                interactive
                delay={delay}
                offset={offset}
                placement={placement}
                hideOnClick={hideOnClick}
                render={handleResult}
                onHide={handleReset}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
                zIndex={zIndex}
            >
                {children}
            </Tippy>
        </div>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
