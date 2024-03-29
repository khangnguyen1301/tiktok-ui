import { useEffect, useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import styles from './Comments.module.scss';
import Image from '~/components/Image';
import { GmailIcon, SmileIcon } from '~/components/Icons';
import CommentItem from './CommentItem';

import * as commentService from '~/services/commentService';
import images from '~/assets/images';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
const cx = classNames.bind(styles);

function Comments({ videoID }) {
    const [comments, setComments] = useState([]);
    const [contentComment, setContentComment] = useState('');

    const postRef = useRef();
    const inputRef = useRef();
    const { showLoginModal } = useContext(ModalEnviroment);
    const userInfo = useSelector((state) => state.auth.login?.currentUser) ?? {};
    const isLogin = useSelector((state) => state.auth.login?.isLogin);
    useEffect(() => {
        videoID && getComment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoID]);

    useEffect(() => {
        isLogin && (postRef.current.style.color = contentComment ? 'var(--primary)' : '(--background-gray-color-34');
    }, [contentComment]);

    useEffect(() => {
        if (contentComment) {
            document.addEventListener('keydown', handleKeydown);
            return () => document.removeEventListener('keydown', handleKeydown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentComment]);

    const handleKeydown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            postComment();
        }
    };

    const getComment = async () => {
        const result = await commentService.getComment({ videoID: videoID });
        setComments(result);
    };

    const postComment = async () => {
        // eslint-disable-next-line no-unused-vars
        if (contentComment) {
            await commentService.postComment({ videoID: videoID, comment: contentComment });
            getComment();
            inputRef.current.value = '';
        }
    };

    return (
        <div className={cx('comments-wrapper')}>
            <h3 className={cx('title')}>{`${comments?.length ?? '0'} comment`}</h3>
            <div className={cx('comments-container')}>
                <div className={cx('avatar')}>
                    <Image src={userInfo.avatar ?? images.noImage} alt={userInfo.nickname} />
                </div>

                <div className={cx('comments-bar')}>
                    {isLogin ? (
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
                    ) : (
                        <div className={cx('comments-enter')}>
                            <div className={cx('login-notify')} onClick={showLoginModal}>
                                Login to comment
                            </div>
                        </div>
                    )}
                    {isLogin && (
                        <div className={cx('post-comment')} ref={postRef} onClick={() => postComment()}>
                            <span>Post</span>
                        </div>
                    )}
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

Comments.propTypes = {
    videoID: PropTypes.string.isRequired,
};

export default Comments;
