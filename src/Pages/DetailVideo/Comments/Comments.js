import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './Comments.module.scss';
import Image from '~/components/Image';
import { GmailIcon, SmileIcon } from '~/components/Icons';
import CommentItem from './CommentItem';
import { useLocalStorage } from '~/hooks';
import * as commentService from '~/services/commentService';
const cx = classNames.bind(styles);

function Comments({ videoID }) {
    const [comments, setComments] = useState([]);
    const [contentComment, setContentComment] = useState('');

    const { getDataLocalStorage } = useLocalStorage();
    const postRef = useRef();
    const inputRef = useRef();

    const userInfo = getDataLocalStorage('user-info').data;

    useEffect(() => {
        videoID && getComment();
    }, [videoID]);

    useEffect(() => {
        postRef.current.style.color = contentComment ? 'var(--primary)' : 'var(--background-gray-color-34)';
    }, [contentComment]);

    const getComment = async () => {
        const result = await commentService.getComment({ videoID: videoID });
        setComments(result);
    };

    const postComment = async () => {
        // eslint-disable-next-line no-unused-vars
        if (contentComment) {
            const result = await commentService.postComment({ videoID: videoID, comment: contentComment });
            getComment();
            inputRef.current.value = '';
        }
    };

    return (
        <div className={cx('comments-wrapper')}>
            <h3 className={cx('title')}>{`${comments.length} comment`}</h3>
            <div className={cx('comments-container')}>
                <div className={cx('avatar')}>
                    <Image src={userInfo.avatar} alt={userInfo.nickName} />
                </div>
                <div className={cx('comments-bar')}>
                    <div className={cx('comments-enter')}>
                        <input
                            type="text"
                            placeholder="Add comment..."
                            className={cx('comments-box')}
                            onChange={(e) => setContentComment(e.target.value)}
                            ref={inputRef}
                        />
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
                    <div className={cx('post-comment')} ref={postRef} onClick={() => postComment()}>
                        <span>Post</span>
                    </div>
                </div>
            </div>
            {comments?.map((res) => (
                <div className={cx('content-comment')} key={res.id}>
                    <CommentItem data={res} />
                </div>
            ))}
        </div>
    );
}

export default Comments;
