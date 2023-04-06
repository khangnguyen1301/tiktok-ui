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
    const [isFirstVideo, setIsFirstVideo] = useState(true);
    const [firstVideo, setFirstVideo] = useState({});

    const [page, setPage] = useState(randomPage);
    const [videoID, setVideoID] = useState('');
    const [listVideo, setListVideo] = useState([]);
    const [video, setVideo] = useState({});

    const [activeSticky, setActiveSticky] = useState(false);
    const [playerPlayed, setPlayerPlayed] = useState(true);
    const [stickyPlayed, setStickyPlayed] = useState(true);
    const [playerReload, setPlayerReload] = useState(false);
    const [stickyReload, setStickyReload] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const videoContext = useContext(VideoEnviroment);

    useEffect(() => {
        const pathName = window.location.pathname;
        const rawID = [];
        for (let index = pathName.length; index > 0; index--) {
            if (pathName[index] === '/') {
                setVideoID(rawID.reverse().join(''));
                break;
            } else {
                rawID.push(pathName[index]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.videoID, window.location.pathname]);

    useEffect(() => {
        const getVideo = async () => {
            const result = await videoService.getVideo(videoID);
            if (isFirstVideo) {
                setFirstVideo(result);
            }
            setVideo(result);
        };

        if (videoID) {
            getVideo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoID]);

    useEffect(() => {
        const getListVideo = async () => {
            const result = await videoService.getVideoListForYou({ page: page });
            setListVideo((prev) => (isFirstVideo ? [firstVideo, ...result] : [...prev, ...result]));
            videoContext.handleSetListVideo((prev) => (isFirstVideo ? [firstVideo, ...result] : [...prev, ...result]));
            setIsFirstVideo(false);
        };
        if (isFirstVideo && Object.keys(firstVideo).length > 0) {
            getListVideo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstVideo]);

    useEffect(() => {
        window.addEventListener('scroll', handleStickyVideo);

        return () => window.removeEventListener('scroll', handleStickyVideo);
    }, []);

    const handleStickyVideo = () => {
        if (window.scrollY > 500) {
            setActiveSticky(true);
        } else {
            setActiveSticky(false);
        }
    };

    const handleSetCurrentTime = (current) => {
        setCurrentTime(current);
    };
    const handleStickyPlayed = (state) => {
        setStickyPlayed(state);
    };

    const handlePlayVideo = (state) => {
        setPlayerPlayed(state);
    };

    const handlePlayerReload = (state) => {
        setPlayerReload(state);
    };
    const handleStickyReload = (state) => {
        setStickyReload(state);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail-container')}>
                    <VideoPlayer
                        data={video}
                        listVideo={listVideo}
                        stickyPlayed={stickyPlayed}
                        stickyLoaded={stickyReload}
                        activeSticky={activeSticky}
                        onUpdateTime={handleSetCurrentTime}
                        onPlayed={handlePlayVideo}
                        onLoad={handlePlayerReload}
                    />
                    <UserInfo data={video} />
                    <Comments videoID={videoID} />
                </div>
                <div className={cx('list-container')}>
                    <h3 className={cx('title')}>You may like</h3>
                    <div className={cx('list-card')}>
                        {listVideo.map(
                            (res, index) =>
                                index > 0 && <VideoCard data={res} key={res.id} videoID={videoID} index={index} />,
                        )}
                    </div>
                </div>
            </div>

            <VideoSticky
                data={video}
                currentTime={currentTime}
                playerPlayed={playerPlayed}
                stickyPlayed={handleStickyPlayed}
                playerLoaded={playerReload}
                onLoad={handleStickyReload}
                activeSticky={activeSticky}
            />
        </div>
    );
}

export default DetailVideo;
