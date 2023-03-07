import { useEffect, useState } from 'react';
import * as forYouService from '~/services/forYouService';

import Video from '~/components/Video';

function Home() {
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState(0.6);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await forYouService.getVideoListForYou({ page: page });
            setVideoForYou((prev) => [...prev, ...result]);
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
    const toggleMuted = () => {
        if (muted) {
            setVolume(prevVolume);
            setMuted(false);
        } else {
            setPrevVolume(volume);
            setVolume(0);
            setMuted(true);
        }
    };
    const handleAdjustVolume = (e) => {
        let value = e.target.value / 100;
        if (value > 0) {
            setMuted(false);
        } else {
            setMuted(true);
        }
        setVolume(value);
    };

    return (
        <>
            {videoForYou.map((res, index) => (
                <Video
                    data={res}
                    key={index}
                    muted={muted}
                    toggleMuted={toggleMuted}
                    volume={volume}
                    adjustVolume={handleAdjustVolume}
                />
            ))}
        </>
    );
}

export default Home;
