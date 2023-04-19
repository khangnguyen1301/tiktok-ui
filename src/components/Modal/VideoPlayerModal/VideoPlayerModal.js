import { useContext, useEffect, useRef, useState, useLayoutEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button/Button';
import Likes from '~/components/Likes';
import { adjustVolume, handleMuted } from '~/redux/videoSlice';

import classNames from 'classnames/bind';
import {
    CommentIcon,
    EmbedIcon,
    FacebookIcon,
    GmailIcon,
    HashTagMusicIcon,
    HeartMiniIcon,
    PaperPlaneIcon,
    ShareMiniIcon,
    SmileIcon,
    ThreeDotIcon,
    TikTokIcon,
    TwitterIcon,
    VolumeIcon,
    VolumeMutedIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';
import styles from './VideoPlayerModal.module.scss';
import * as videoService from '~/services/videoService';
import * as commentService from '~/services/commentService';

import ShareAction from '~/components/ShareAction';
import Follow from '~/components/Follow';

import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import LineLoading from '~/components/Loadings/LineLoading';
import AvatarLoading from '~/components/Loadings/AvatarLoading';

const cx = classNames.bind(styles);

function VideoPlayerModal({ onHideModal }) {
    const [video, setVideo] = useState({});
    const [comments, setComments] = useState([]);
    const [isPlayed, setIsPlayed] = useState(true);
    const [contentComment, setContentComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);

    const videoRef = useRef();
    const selectorRef = useRef();
    const textRef = useRef();
    const commentRef = useRef();
    const postButtonRef = useRef();
    const contentRef = useRef();
    const adjustRef = useRef();

    const videoContext = useContext(VideoEnviroment);
    const { showLoginModal, isFormModalShow } = useContext(ModalEnviroment);

    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.auth.login?.isLogin) ?? false;
    const volume = useSelector((state) => state.video.defaultVolume);
    const isMuted = useSelector((state) => state.video.isMuted);

    useEffect(() => {
        videoRef.current.volume = isMuted ? 0 : volume;
        adjustRef.current.value = isMuted ? 0 : volume * 100;
        selectorRef.current.style.width = `${isMuted ? 0 : volume * 100}%`;
    }, [isMuted, volume]);

    useEffect(() => {
        getComment();
        getVideoInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.videoID]);

    useEffect(() => {
        const nickName = window.location.pathname.includes('/me') ? 'me' : `/@${videoContext.nickName}`;
        window.history.replaceState(null, '', `${nickName ?? ''}/video/${videoContext.videoID}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.videoID, videoContext.nickName]);

    useEffect(() => {
        isPlayed ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlayed]);

    useEffect(() => {
        setIsPlayed(!isFormModalShow);
    }, [isFormModalShow]);

    const getVideoInfo = async () => {
        const result = await videoService.getVideo(videoContext.videoID);
        setVideo(result);
        setCommentCount(result?.comments_count);
        setIsPlayed(true);
    };

    const getComment = async () => {
        const result = await commentService.getComment({ videoID: videoContext.videoID });
        setComments(result);
    };

    const postComment = async () => {
        // eslint-disable-next-line no-unused-vars
        const result = await commentService.postComment({
            videoID: videoContext.videoID,
            comment: contentComment,
        });
        getComment();
        getVideoInfo();
        videoContext.handleStateComment(true);
        contentRef.current.value = '';
        contentRef.current.blur();
        postButtonRef.current.style.color = 'var(--background-gray-color-34)';
    };
    const handlePlayVideo = () => {
        setIsPlayed(!isPlayed);
    };

    const handleCopyLink = () => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(textRef.current.innerText);
    };

    const handleFocusComment = () => {
        commentRef.current.style.border = '1px solid #16182333';
    };

    const handleBlurComment = () => {
        commentRef.current.style.border = '1px solid transparent';
    };

    const handlePostButton = (e) => {
        postButtonRef.current.style.color = e.target.value ? '#fe2c55' : 'var(--background-gray-color-34)';
        postButtonRef.current.style.cursor = 'pointer';
        setContentComment(e.target.value);
    };

    const handleHideModal = () => {
        window.history.replaceState(null, '', `/@`);
        onHideModal();
    };

    const handleAdjustVolume = (e) => {
        const _volume = e.target.value / 100;
        videoRef.current.volume = isMuted ? 0 : _volume;
        adjustRef.current.value = _volume * 100;
        selectorRef.current.style.width = `${isMuted ? 0 : _volume * 100}%`;
        isMuted && dispatch(handleMuted(false));
        _volume === 0 && dispatch(handleMuted(true));
    };

    const handleSetVolume = (e) => {
        const value = e.target.value / 100;
        dispatch(adjustVolume(value));
    };

    const handleToggleMuted = () => {
        dispatch(adjustVolume(volume === 0 ? 0.6 : volume));
        dispatch(handleMuted());
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <Image src={video?.thumb_url} className={cx('background')} />

                <div className={cx('mask')}></div>
                <div className={cx('mask')}></div>
                <div className={cx('mask')}></div>
                <div className={cx('mask')}></div>

                <div className={cx('play-icon', { active: !isPlayed })}>
                    <FontAwesomeIcon icon={faPlay} />
                </div>

                <div className={cx('video-box')} onClick={handlePlayVideo}>
                    <video src={video?.file_url} autoPlay loop ref={videoRef} className={cx('video')}></video>
                </div>

                <div className={cx('back-icon')}>
                    <div className={cx('btn-close')} onClick={onHideModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx('tiktok-logo')}>
                        <TikTokIcon />
                    </div>
                </div>

                <div className={cx('report')}>
                    <FontAwesomeIcon icon={faFlag} />
                    <p>Report</p>
                </div>

                <div
                    className={cx('btn-back', { hide: videoContext.positionVideo === 0 })}
                    onClick={() => videoContext.handleBackVideo()}
                >
                    <FontAwesomeIcon icon={faChevronUp} />
                </div>
                <div className={cx('btn-next')} onClick={() => videoContext.handleNextVideo()}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>

                <div className={cx('button')} onClick={handleToggleMuted}>
                    {isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
                </div>
                <div className={cx('adjust-volume')}>
                    <div className={cx('volume-bar')}>
                        <input
                            className={cx('input')}
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            onChange={handleAdjustVolume}
                            onMouseUp={handleSetVolume}
                            ref={adjustRef}
                        />
                        <div className={cx('selector')} ref={selectorRef}></div>
                    </div>
                </div>
            </div>

            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    {Object.keys(video).length === 0 ? (
                        <div className={cx('info')}>
                            <div className={cx('name-container')}>
                                <div className={cx('avatar')}>
                                    <AvatarLoading />
                                </div>
                                <div className={cx('name')}>
                                    <div className={cx('nickname')}>
                                        <LineLoading />
                                    </div>
                                    <div className={cx('fullname')}>
                                        <LineLoading />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('info')}>
                            <AccountPreviewHome data={video}>
                                <Link to={`/@${video?.user?.nickname}`} onClick={handleHideModal}>
                                    <div className={cx('name-container')}>
                                        <Image src={video?.user?.avatar} className={cx('avatar')} />

                                        <div className={cx('name')}>
                                            <p className={cx('nickname')}>{video?.user?.nickname}</p>
                                            <p className={cx('fullname')}>
                                                {`${video?.user?.first_name} ${
                                                    video?.user?.last_name === ''
                                                        ? video?.user?.nickname
                                                        : video?.user?.last_name
                                                } · ${video?.created_at?.slice(0, 10)}`}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </AccountPreviewHome>

                            {!isLogin ? (
                                <Button
                                    small
                                    primary={false}
                                    outline={true}
                                    className={cx('follow-btn')}
                                    onClick={showLoginModal}
                                >
                                    Follow
                                </Button>
                            ) : (
                                <Follow
                                    className={cx('custom-btn')}
                                    userID={video?.user?.id}
                                    isFollow={video?.user?.is_followed}
                                />
                            )}
                        </div>
                    )}

                    <div className={cx('content')}>
                        <div className={cx('description')}>{video?.description}</div>
                        <div className={cx('link-music')}>
                            <span className={cx('music-icon')}>
                                <HashTagMusicIcon />
                            </span>
                            <span>{video?.music}</span>
                        </div>

                        <div className={cx('interactive')}>
                            <div className={cx('internal-icon')}>
                                <div className={cx('icon-box')}>
                                    <Likes data={video} width="2rem" height="2rem" horizontal />
                                </div>
                                <div className={cx('icon-box')}>
                                    <div className={cx('icon')}>
                                        <CommentIcon width="2rem" height="2rem" />
                                    </div>
                                    <strong className={cx('count')}>{commentCount ?? 0}</strong>
                                </div>
                            </div>

                            <div className={cx('social-icon')}>
                                <Tippy content="Embed" zIndex="99999" placement="top">
                                    <button>
                                        <EmbedIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </Tippy>
                                <Tippy content="Send to friends" zIndex="99999" placement="top">
                                    <button>
                                        <PaperPlaneIcon width="2.4rem" height="2.4rem" />
                                    </button>
                                </Tippy>
                                <Tippy content="Share to Facebook" zIndex="99999" placement="top">
                                    <button>
                                        <FacebookIcon />
                                    </button>
                                </Tippy>

                                <Tippy content="Share to WhatsApp" zIndex="99999" placement="top">
                                    <button>
                                        <WhatsAppIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Share to Twitter" zIndex="99999" placement="top">
                                    <button>
                                        <TwitterIcon />
                                    </button>
                                </Tippy>
                                <ShareAction
                                    offset={[-43, 10]}
                                    placement="bottom-end"
                                    delay={[0, 300]}
                                    zIndex="999999999"
                                >
                                    <div className={cx('share-btn')}>
                                        <button>
                                            <ShareMiniIcon />
                                        </button>
                                    </div>
                                </ShareAction>
                            </div>
                        </div>
                        <div className={cx('video-link')}>
                            <div className={cx('link')} ref={textRef}>
                                {video.file_url}
                            </div>

                            <div className={cx('btn-copy')} onClick={handleCopyLink}>
                                <strong>Copy link</strong>
                            </div>
                        </div>
                    </div>
                </div>
                {Object.keys(video).length === 0 ? (
                    <div className={cx('comment-container')}>
                        <div className={cx('comment-item')}>
                            <div className={cx('avatar-box')}>
                                <div className={cx('avatar')}>
                                    <AvatarLoading />
                                </div>
                            </div>
                            <div className={cx('nickname-item')}>
                                <LineLoading />
                            </div>
                            <div className={cx('content-comment')} style={{ marginTop: '35px' }}>
                                <LineLoading />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('comment-container')}>
                        {comments?.map((comment, index) => (
                            <div className={cx('comment-item')} key={index}>
                                <AccountPreviewHome data={comment}>
                                    <Link to={`/@${comment?.user?.nickname}`} onClick={onHideModal}>
                                        <div className={cx('avatar-box')}>
                                            <Image
                                                src={comment?.user?.avatar}
                                                alt={comment?.user?.nickname}
                                                className={cx('avatar')}
                                            />
                                        </div>
                                        <div className={cx('nickname-item')}>
                                            <strong>{comment?.user?.nickname}</strong>
                                        </div>
                                    </Link>
                                </AccountPreviewHome>

                                <div className={cx('content-comment')}>
                                    <p>{comment?.comment}</p>
                                    <div className={cx('reply')}>
                                        <span className={cx('created-date')}>{comment?.created_at.slice(0, 10)}</span>
                                        <span className={cx('reply-btn')}>Reply</span>
                                    </div>
                                </div>
                                <div className={cx('icon')}>
                                    <ThreeDotIcon className={cx('hidden')} />
                                    <HeartMiniIcon className={cx('color-icon')} />
                                    <span className={cx('likes-count')}>{comment?.likes_count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className={cx('footer-comment')}>
                    {!isLogin ? (
                        <div className={cx('notify')} onClick={showLoginModal}>
                            Log in to comment
                        </div>
                    ) : (
                        <div className={cx('container')}>
                            <div className={cx('comment-box')} ref={commentRef}>
                                <input
                                    type="text"
                                    className={cx('comment-enter')}
                                    placeholder="Add comment..."
                                    onFocus={handleFocusComment}
                                    onBlur={handleBlurComment}
                                    onInput={handlePostButton}
                                    ref={contentRef}
                                />
                                <Tippy
                                    content={`"@" a user to tag them in your comments`}
                                    placement="top"
                                    zIndex="99999"
                                >
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
                            <div className={cx('post-comment')} ref={postButtonRef} onClick={() => postComment()}>
                                Post
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(VideoPlayerModal);
