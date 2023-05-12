import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import * as videoService from '~/services/videoService';

import VideoList from '~/components/VideoList';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/authSlice';
import { InView } from 'react-intersection-observer';
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading/HomeAccountLoading';
import TiktokLoading from '~/components/Loadings/TiktokLoading';

const cx = classNames.bind(styles);

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);
    const [totalPages, setTotalPages] = useState(15);
    const [page, setPage] = useState(0);
    const videoContext = useContext(VideoEnviroment);
    const location = useLocation();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.login?.currentUser);
    const isLogin = useSelector((state) => state.auth.login?.isLogin);
    const TTL_COOKIES = document.cookie.split(';')[0].slice(6);
    !TTL_COOKIES && isLogin && dispatch(logout());
    useEffect(() => {
        videoContext.handleSetListVideo([]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        if (page < 1) {
            return;
        }

        const fetchApi = async () => {
            const result = await videoService.getVideoListForYou({ page: page });
            const except = result.data.filter((video) => video.user.id !== userInfo?.id);
            setTotalPages(result.meta.pagination.total_pages);
            setVideoForYou((prev) => [...prev, ...except]);
            videoContext.handleSetListVideo((prev) => [...prev, ...except]);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleRandomPage = () => {
        let checkDuplicate = false;
        let randomPage = 0;
        let prevPage = 0;
        do {
            prevPage = page;
            randomPage = Math.floor(Math.random() * totalPages + 1);
            checkDuplicate = randomPage === prevPage;
        } while (checkDuplicate);

        setPage(randomPage);
    };

    return (
        <div className={cx('wrapper')}>
            <VideoList data={videoForYou} />

            <InView onChange={(inView) => inView && handleRandomPage()}>
                {videoForYou.length === 0 ? (
                    <HomeAccountLoading />
                ) : (
                    <div className={cx('load-more')}>
                        <TiktokLoading small />
                    </div>
                )}
            </InView>
        </div>
    );
}

export default Home;
