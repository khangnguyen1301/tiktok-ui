import { useLayoutEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Menu from '../Popper/Menu';
import images from '~/assets/images';
import {
    EmbedIcon,
    LinkRoundedIcon,
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    RedditIcon,
    LineIcon,
    PinterestIcon,
} from '../Icons';

import styles from './ShareAction.module.scss';

const cx = classNames.bind(styles);

const SHARE_MENU = [
    {
        icon: <EmbedIcon />,
        title: 'Embed',
    },
    {
        icon: <FacebookIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Facebook',
    },
    {
        icon: <img src={images.whatsapp} alt="" />,
        title: 'Share to WhatsApp',
    },
    {
        icon: <TwitterIcon width="2.6rem" height="2.6rem" />,
        title: 'Share to Twitter',
    },

    {
        icon: <LinkRoundedIcon />,
        title: 'Copy link',
    },
];

const EXPANDED_SHARE_MENU = [
    ...SHARE_MENU,
    {
        icon: <img src={images.linkedin} alt="" />,
        title: 'Share to LinkedIn',
    },
    {
        icon: <RedditIcon />,
        title: 'Share to Reddit',
    },

    {
        icon: <img src={images.telegram} alt="" />,
        title: 'Share to Telegram',
    },
    {
        icon: <EmailIcon />,
        title: 'Share to Email',
    },
    {
        icon: <LineIcon />,
        title: 'Share to LINE',
    },
    {
        icon: <PinterestIcon />,
        title: 'Share to Pinterest',
    },
];

function ShareAction({ children, offset, delay, placement, arrowBottom, zIndex }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [items, setItems] = useState(SHARE_MENU);

    useLayoutEffect(() => {
        !isExpanded ? setItems(EXPANDED_SHARE_MENU) : setItems(SHARE_MENU);
    }, [isExpanded]);

    const handleResetAction = (value) => {
        setIsExpanded(value);
    };
    return (
        <div>
            <Menu
                items={items}
                onHideResetAction={handleResetAction}
                customMenuItem
                custom
                className={cx('share-menu')}
                expanded={isExpanded}
                hidden={isExpanded}
                share={true}
                shareActive={true}
                offset={offset}
                delay={delay}
                placement={placement}
                arrowBottom={arrowBottom}
                zIndex={zIndex}
            >
                {children}
            </Menu>
        </div>
    );
}

export default ShareAction;
