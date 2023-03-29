import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as videoService from '~/services/videoService';
import * as commentService from '~/services/commentService';
import Comments from './Comments';

import styles from './DetailVideo.module.scss';
import UserInfo from './UserInfo';
import VideoCard from './VideoCard';
import VideoPlayer from './VideoPlayer';
import VideoSticky from './VideoSticky';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

const cx = classNames.bind(styles);

function DetailVideo() {
    const randomPage = Math.floor(Math.random() * 10 + 1);
    const [page, setPage] = useState(randomPage);
    const [videoID, setVideoID] = useState('');
    const [listVideo, setListVideo] = useState([]);
    const [video, setVideo] = useState({});
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const videoContext = useContext(VideoEnviroment);
    useEffect(() => {
        const pathName = location.pathname;
        const rawID = [];
        for (let index = pathName.length; index > 0; index--) {
            if (pathName[index] === '/') {
                setVideoID(rawID.reverse().join(''));
                break;
            } else {
                rawID.push(pathName[index]);
            }
        }
    }, []);

    useEffect(() => {
        const getVideo = async () => {
            const result = await videoService.getVideo(videoID);
            setVideo(result);
        };
        const getComment = async () => {
            const result = await commentService.getComment({ videoID: videoID });
            setComments(result);
        };
        const getListVideo = async () => {
            const result = await videoService.getVideoListForYou({ page: page });
            setListVideo(result);
            // videoContext.handleSetListVideo((prev) => [...prev, ...result]);
        };
        if (videoID) {
            getListVideo();
            getVideo();
            getComment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoID]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-container')}>
                    <VideoPlayer data={video} />
                    <UserInfo />
                    <Comments data={comments} />
                </div>
                <div className={cx('list-container')}>
                    <h3 className={cx('title')}>You may like</h3>
                    <div className={cx('list-card')}>
                        {listVideo.map((res) => (
                            <VideoCard data={res} key={res.id} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('video-sticky')}>
                <VideoSticky />
            </div>
        </div>
    );
}

export default DetailVideo;
