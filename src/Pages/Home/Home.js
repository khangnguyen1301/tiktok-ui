import { useCallback, useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as forYouService from '~/services/forYouService';
import Video from '~/components/Video';
import { ModalContext } from '~/components/ModalProvider';

function Home() {
    const randomPage = Math.floor(Math.random() * 10 + 1);
    const [videoForYou, setVideoForYou] = useState([]);
    const [page, setPage] = useState(randomPage);
    const [positionCurrentElement, setPositionCurrentElement] = useState(0);
    const [keyDown, setKeyDown] = useState(false);
    const wrapperRef = useRef();
    const context = useContext(ModalContext);
    const location = useLocation();
    const maxLength = videoForYou.length - 1;

    useEffect(() => {
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

    useLayoutEffect(() => {
        if (positionCurrentElement >= maxLength) {
            return;
        } else {
            setPositionCurrentElement(context.positionVideo);
        }
    }, [context.positionVideo]);

    useLayoutEffect(() => {
        if (context.showVideoPlayer || keyDown) {
            if (positionCurrentElement > maxLength) {
                setPositionCurrentElement(maxLength);
            } else {
                handleScrollElement(positionCurrentElement);
                setKeyDown(false);
            }
        }
    }, [positionCurrentElement, keyDown]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleKeydown = (e) => {
        //back video
        if (e.keyCode === 38) {
            e.preventDefault();
            setTimeout(() => {
                setPositionCurrentElement((prev) => (prev <= 0 ? 0 : prev - 1));
                setKeyDown(true);
            }, 200);
        }
        //next video
        if (e.keyCode === 40) {
            e.preventDefault();
            setTimeout(() => {
                setPositionCurrentElement((prev) => prev + 1);
                setKeyDown(true);
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

    const handleSetCurrentElement = useCallback((position) => {
        setPositionCurrentElement(position);
    }, []);

    return (
        <div ref={wrapperRef}>
            {videoForYou.map((res, index) => (
                <Video
                    data={res}
                    key={index}
                    videoID={res?.id}
                    index={index}
                    onCloseModal={index === positionCurrentElement}
                    currentElement={handleSetCurrentElement}
                />
            ))}
        </div>
    );
}

export default Home;
