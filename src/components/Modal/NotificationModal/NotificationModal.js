import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './NotificationModal.module.scss';
import {
    CommentsActivityIcon,
    FollowerActivityIcon,
    LikeActivityIcon,
    MentionActivityIcon,
    MessageActivityIcon,
} from '~/components/Icons';
import TiktokLoading from '~/components/Loadings/TiktokLoading';

const cx = classNames.bind(styles);

const ALL_TABS = [
    {
        id: 'activity',
        icon: <MessageActivityIcon />,
        title: 'All activity',
        message: 'Notifications about your account will appear here.',
    },
    {
        id: 'like',
        icon: <LikeActivityIcon />,
        title: 'Likes on your videos',
        message: `When someone likes one of your videos, you'll see it here`,
    },
    {
        id: 'comment',
        icon: <CommentsActivityIcon />,
        title: 'Comments on your videos',
        message: `When someone comments on one of your videos, you'll see it here`,
    },
    {
        id: 'mention',
        icon: <MentionActivityIcon />,
        title: 'Mentions of You',
        message: `When someone mentions you, you'll see it here`,
    },
    {
        id: 'follower',
        icon: <FollowerActivityIcon />,
        title: 'New followers',
        message: `When someone new follows you, you'll see it here`,
    },
];

function NotificationModal({ onHideModal }) {
    const [content, setContent] = useState(ALL_TABS[0]);
    const [loading, setLoading] = useState(false);

    const selectRef = useRef();

    useLayoutEffect(() => {
        setLoading(true);
        const timerID = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timerID);
    }, [content]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOnClickOutSide);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleOnClickOutSide);
        };
    }, [selectRef]);

    const handleSetContent = (id) => {
        const contentItem = ALL_TABS.find((item) => item.id === id);
        setContent(contentItem);
    };

    const handleOnClickOutSide = (event) => {
        const { target } = event;
        if (selectRef.current && !selectRef.current.contains(target)) {
            onHideModal();
        }
    };

    return (
        <div className={cx('wrapper')} ref={selectRef}>
            <div className={cx('header')}>
                <span className={cx('title')}>Notifications</span>
                <div className={cx('notify-container')}>
                    <div
                        className={cx('notify-item', { active: content.id === 'activity' })}
                        onClick={() => handleSetContent('activity')}
                    >
                        All activity
                    </div>
                    <div
                        className={cx('notify-item', { active: content.id === 'like' })}
                        onClick={() => handleSetContent('like')}
                    >
                        Likes
                    </div>
                    <div
                        className={cx('notify-item', { active: content.id === 'comment' })}
                        onClick={() => handleSetContent('comment')}
                    >
                        Comments
                    </div>
                    <div
                        className={cx('notify-item', { active: content.id === 'mention' })}
                        onClick={() => handleSetContent('mention')}
                    >
                        Mentions and tags
                    </div>
                    <div
                        className={cx('notify-item', { active: content.id === 'follower' })}
                        onClick={() => handleSetContent('follower')}
                    >
                        Followers
                    </div>
                </div>
            </div>
            {loading ? (
                <div className={cx('loading')}>
                    <TiktokLoading small />
                </div>
            ) : (
                <div className={cx('content')}>
                    <div>{content.icon}</div>
                    <div className={cx('content-title')}>{content.title}</div>
                    <div className={cx('content-message')}>{content.message}</div>
                </div>
            )}
        </div>
    );
}

export default NotificationModal;
