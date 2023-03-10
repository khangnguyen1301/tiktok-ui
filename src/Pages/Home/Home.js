import { useContext, useEffect, useRef, useState } from 'react';
import * as forYouService from '~/services/forYouService';
import Video from '~/components/Video';
import { ModalContext } from '~/components/ModalProvider';
import { useLocation } from 'react-router-dom';

function Home() {
    const randomPage = Math.floor(Math.random() * 10 + 1);
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(randomPage);
    const [volume, setVolume] = useState(0.6);
    const [prevVolume, setPrevVolume] = useState(volume);
    const [muted, setMuted] = useState(true);
    const [positionCurrentElement, setPositionCurrentElement] = useState(0);
    const wrapperRef = useRef();
    const context = useContext(ModalContext);
    const location = useLocation();
    useEffect(() => {
        console.log('da vao day');
        context.handleSetListVideo([]);
    }, [location.pathname]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await forYouService.getVideoListForYou({ page: page });
            setVideoForYou((prev) => [...prev, ...result]);
            context.handleSetListVideo((prev) => [...prev, ...result]);
        };
        fetchApi();
    }, [page]);

    useEffect(() => {
        console.log(context.positionVideo);
        setPositionCurrentElement(context.positionVideo);
    }, [context.positionVideo]);

    useEffect(() => {
        handleScrollElement(positionCurrentElement);
    }, [positionCurrentElement]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
    }, []);

    const handleKeydown = (e) => {
        if (e.key === 'ArrowDown') {
            setTimeout(() => {
                setPositionCurrentElement((prev) => prev + 1);
            }, 200);
        }
        if (e.key === 'ArrowUp') {
            setTimeout(() => {
                setPositionCurrentElement((prev) => prev - 1);
            }, 200);
        }
    };

    const handleScrollElement = (position) => {
        wrapperRef.current?.childNodes[position]?.scrollIntoView({
            behavior: 'smooth',
        });
        context.handleSetVideoID(videoForYou[position]?.id);
        context.handleSetPositionVideo(position);
    };

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
        setMuted(!value > 0);

        setVolume(value);
    };
    console.log(positionCurrentElement);
    return (
        <div ref={wrapperRef}>
            {videoForYou.map((res, index) => (
                <Video
                    data={res}
                    key={index}
                    muted={muted}
                    toggleMuted={toggleMuted}
                    volume={volume}
                    adjustVolume={handleAdjustVolume}
                    videoID={res?.id}
                    handleScroll={handleScrollElement}
                    index={index}
                />
            ))}
        </div>
    );
}

export default Home;
