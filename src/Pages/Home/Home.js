import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import * as videoService from '~/services/videoService';

import VideoList from '~/components/VideoList';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/authSlice';

const cx = classNames.bind(styles);

function Home() {
    const randomPage = Math.floor(Math.random() * 10 + 1);
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(randomPage);
    const videoContext = useContext(VideoEnviroment);
    const location = useLocation();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.login?.currentUser);

    const TTL_COOKIES = document.cookie.split(';')[0].slice(6);
    !TTL_COOKIES && dispatch(logout());
    useEffect(() => {
        videoContext.handleSetListVideo([]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.getVideoListForYou({ page: page });
            const except = result.filter((video) => video.user.id !== userInfo?.id);
            setVideoForYou((prev) => [...prev, ...except]);
            videoContext.handleSetListVideo((prev) => [...prev, ...except]);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            setPage((page) => page + 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <VideoList data={videoForYou} />
        </div>
    );
}

export default Home;
