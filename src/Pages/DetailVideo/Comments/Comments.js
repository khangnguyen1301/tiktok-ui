import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './Comments.module.scss';
import Image from '~/components/Image';
import { GmailIcon, SmileIcon } from '~/components/Icons';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function Comments({ data }) {
    return (
        <div className={cx('comments-wrapper')}>
            <h3 className={cx('title')}>{`${data.length} comment`}</h3>
            <div className={cx('comments-container')}>
                <div className={cx('avatar')}>
                    <Image src="" alt="" />
                </div>
                <div className={cx('comments-bar')}>
                    <div className={cx('comments-enter')}>
                        <input type="text" placeholder="Add comment..." className={cx('comments-box')} />
                        <Tippy content={`"@" a user to tag them in your comments`} placement="top" zIndex="99999">
                            <button className={cx('comment-icon')}>
                                <GmailIcon />
                            </button>
                        </Tippy>
                        <Tippy content="Click to add emojis" placement="top" zIndex="99999">
                            <button className={cx('comment-icon')}>
                                <SmileIcon />
                            </button>
                        </Tippy>
                    </div>
                    <div className={cx('post-comment')}>
                        {' '}
                        <span>Post</span>{' '}
                    </div>
                </div>
            </div>
            {data?.map((res) => (
                <div className={cx('content-comment')} key={res.id}>
                    <CommentItem data={res} />
                </div>
            ))}
        </div>
    );
}

export default Comments;
