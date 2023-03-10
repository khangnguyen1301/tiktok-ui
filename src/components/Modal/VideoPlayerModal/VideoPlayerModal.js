import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import {
    CommentIcon,
    EmbedIcon,
    FacebookIcon,
    HashTagMusicIcon,
    HeartIcon,
    PaperPlaneIcon,
    ShareMiniIcon,
    TikTokIcon,
    TwitterIcon,
    VolumeMutedIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import AccountPreviewHome from '~/components/Video/AccountPreviewHome';
import styles from './VideoPlayerModal.module.scss';
import * as videoService from '~/services/videoService';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function VideoPlayerModal() {
    const [video, setVideo] = useState({});
    const context = useContext(ModalContext);
    useEffect(() => {
        const getComment = () => {
            var myHeaders = new Headers();
            myHeaders.append(
                'Authorization',
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3ODM3Mjk1OSwiZXhwIjoxNjgwOTY0OTU5LCJuYmYiOjE2NzgzNzI5NTksImp0aSI6IkZZVU9WbVZqbDBMdW5oTnIiLCJzdWIiOjUyMDMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.iGRQH_zF5tXyClugWNIfUfTySW-pz3PWUC69MT6YSBk',
            );

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

            fetch(`https://tiktok.fullstack.edu.vn/api/videos/${context.videoID}/comments`, requestOptions)
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        };
        const fetchApi = async () => {
            const result = await videoService.getVideo(context.videoID);
            setVideo(result);
        };
        fetchApi();
    }, [context.videoID]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-container')}>
                <Image src={video?.thumb_url} className={cx('background')} />

                <div className={cx('mask')}></div>
                <div className={cx('video-box')}>
                    <video src={video?.file_url} autoPlay loop className={cx('video')}></video>
                </div>

                <div className={cx('back-icon')}>
                    <div className={cx('button')} onClick={context.handleHidePlayer}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx('button')}>
                        <TikTokIcon />
                    </div>
                </div>

                <div className={cx('controls')}>
                    <div className={cx('report')}>
                        <FontAwesomeIcon icon={faFlag} />
                        <p>Report</p>
                    </div>
                    <div>
                        <div className={cx('button')} onClick={context.handleBackVideo}>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </div>
                        <div className={cx('button')} onClick={context.handleNextVideo}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <VolumeMutedIcon />
                    </div>
                </div>
            </div>
            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <AccountPreviewHome data={video}>
                            <Image src={video?.user?.avatar} className={cx('avatar')} />
                        </AccountPreviewHome>
                        <AccountPreviewHome data={video}>
                            <div className={cx('name')}>
                                <p className={cx('nickname')}>{video?.user?.nickname}</p>
                                <p
                                    className={cx('fullname')}
                                >{`${video?.user?.first_name} ${video?.user?.last_name}`}</p>
                            </div>
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
                                    <strong className={cx('count')}>{video?.comments_count}</strong>
                                </div>
                            </div>

                            <div className={cx('social-icon')}>
                                <EmbedIcon width="2.4rem" height="2.4rem" />
                                <PaperPlaneIcon width="2.4rem" height="2.4rem" />
                                <FacebookIcon />
                                <WhatsAppIcon />
                                <TwitterIcon />
                                <div className={cx('share-btn')}>
                                    <ShareMiniIcon />
                                </div>
                            </div>
                        </div>
                        <div className={cx('video-link')}>
                            <div className={cx('link')}>
                                https://www.tiktok.com/@bussdownblu/video/7185817134809861422?is_from_webapp=1&sender_device=pc&web_id=7207816087235364394
                            </div>

                            <div className={cx('btn-copy')}>
                                <strong>Copy link</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('comment-container')}>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                    <div className={cx('comment-item')}>Test comment</div>
                </div>
                <div className={cx('footer-comment')}>
                    <div className={cx('notify')}>Log in to comment</div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayerModal;
