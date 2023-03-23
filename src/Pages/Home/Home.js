import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as videoService from '~/services/videoService';

import { ModalContext } from '~/components/ModalProvider';
import VideoList from '~/components/VideoList';

function Home() {
    const randomPage = Math.floor(Math.random() * 10 + 1);
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(randomPage);
    const context = useContext(ModalContext);
    const location = useLocation();

    useEffect(() => {
        context.handleSetListVideo([]);
    }, [location.pathname]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.getVideoListForYou({ page: page });
            setVideoForYou((prev) => [...prev, ...result]);
            context.handleSetListVideo((prev) => [...prev, ...result]);
        };
        fetchApi();
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
        <div>
            <VideoList data={videoForYou} />
        </div>
    );
}

export default Home;
