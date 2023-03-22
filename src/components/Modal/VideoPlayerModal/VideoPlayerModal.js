import { useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import {
    CommentIcon,
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    GmailIcon,
    HashTagMusicIcon,
    HeartIcon,
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
import * as postCommentService from '~/services/postCommentService';
import { ModalContext } from '~/components/ModalProvider';
import ShareAction from '~/components/ShareAction';

const cx = classNames.bind(styles);

function VideoPlayerModal() {
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

    const context = useContext(ModalContext);
    const userLogin = localStorage.getItem('user-login');
    const stateLogin = JSON.parse(userLogin);

    useLayoutEffect(() => {
        videoRef.current.volume = context.isMuted ? 0 : context.volume;
        selectorRef.current.style.width = `${context.isMuted ? 0 : context.volume * 100}%`;
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        getComment();
        fetchApi();
    }, [context.videoID]);

    useEffect(() => {
        if (context.isMuted) {
            videoRef.current.volume = 0;
        } else {
            videoRef.current.volume = context.volume;
        }
    }, [context.isMuted]);

    useEffect(() => {
        isPlayed ? videoRef.current.play() : videoRef.current.pause();
    }, [isPlayed]);

    const fetchApi = async () => {
        const result = await videoService.getVideo(context.videoID);
        setVideo(result);
        setCommentCount(result?.comments_count);
        setIsPlayed(true);
    };

    const getComment = () => {
        let myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3ODM3Mjk1OSwiZXhwIjoxNjgwOTY0OTU5LCJuYmYiOjE2NzgzNzI5NTksImp0aSI6IkZZVU9WbVZqbDBMdW5oTnIiLCJzdWIiOjUyMDMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.iGRQH_zF5tXyClugWNIfUfTySW-pz3PWUC69MT6YSBk',
        );

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`https://tiktok.fullstack.edu.vn/api/videos/${context.videoID}/comments`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setComments(result);
            })
            .catch((error) => console.log('error', error));
    };

    const postComment = () => {
        postCommentService.postComment(context.videoID, contentComment, getComment);
        fetchApi();
        setCommentCount(video?.comments_count);
        contentRef.current.value = '';
        contentRef.current.blur();
        postButtonRef.current.style.color = '#16182357';
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
        postButtonRef.current.style.color = e.target.value ? '#fe2c55' : '#16182357';
        postButtonRef.current.style.cursor = 'pointer';
        setContentComment(e.target.value);
    };
    console.log(commentCount);
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
                    <div className={cx('btn-close')} onClick={context.handleHidePlayer}>
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
                    className={cx('btn-back', { hide: context.positionVideo === 0 })}
                    onClick={context.handleBackVideo}
                >
                    <FontAwesomeIcon icon={faChevronUp} />
                </div>
                <div className={cx('btn-next')} onClick={context.handleNextVideo}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>

                <div className={cx('button')} onClick={context.handleMutedVideo}>
                    {context.isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
                </div>
                <div className={cx('adjust-volume')}>
                    <div className={cx('volume-bar')}>
                        <input
                            className={cx('input')}
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={context.isMuted ? 0 : context.volume * 100}
                            onChange={context.handleAdjustVolume}
                        />
                        <div className={cx('selector')} ref={selectorRef}></div>
                    </div>
                </div>
            </div>

            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <AccountPreviewHome data={video}>
                            <Link to={`/@${video?.user?.nickname}`} onClick={context.handleHidePlayer}>
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

                        <Button outline className={cx('custom-btn')}>
                            Follow
                        </Button>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('description')}>{video?.description}</div>
                        <div className={cx('link-music')}>
                            <HashTagMusicIcon />
                            <p>{video?.music}</p>
                        </div>

                        <div className={cx('interactive')}>
                            <div className={cx('internal-icon')}>
                                <div className={cx('icon-box')}>
                                    <div className={cx('icon')}>
                                        <HeartIcon width="2rem" height="2rem" />
                                    </div>
                                    <strong className={cx('count')}>{video?.likes_count}</strong>
                                </div>
                                <div className={cx('icon-box')}>
                                    <div className={cx('icon')}>
                                        <CommentIcon width="2rem" height="2rem" />
                                    </div>
                                    <strong className={cx('count')}>{commentCount}</strong>
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
                                <ShareAction offset={[-43, 10]} placement="bottom-end" delay={[0, 300]}>
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
                <div className={cx('comment-container')}>
                    {comments?.data?.map((comment, index) => (
                        <div className={cx('comment-item')} key={index}>
                            <AccountPreviewHome data={comment}>
                                <Link to={`/@${comment?.user?.nickname}`} onClick={context.handleHidePlayer}>
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
                <div className={cx('footer-comment')}>
                    {!stateLogin ? (
                        <div className={cx('notify')}>Log in to comment</div>
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

export default VideoPlayerModal;
