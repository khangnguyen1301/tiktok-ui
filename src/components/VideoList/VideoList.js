import { useCallback, useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';

import HomeAccountLoading from '../Loadings/HomeAccountLoading';
import Video from '~/components/Video';

import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

function VideoList({ data }) {
    const [positionCurrentElement, setPositionCurrentElement] = useState(0);
    const [updateFollow, setUpdateFollow] = useState({});
    const [keyDown, setKeyDown] = useState(false);
    const wrapperRef = useRef();
    const context = useContext(VideoEnviroment);
    const maxLength = data.length - 1;
    useLayoutEffect(() => {
        if (positionCurrentElement >= maxLength) {
            return;
        } else {
            setPositionCurrentElement(context.positionVideo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.positionVideo]);

    useLayoutEffect(() => {
        if (context.isVideoModalShow || keyDown) {
            if (positionCurrentElement > maxLength) {
                setPositionCurrentElement(maxLength);
            } else {
                handleScrollElement(positionCurrentElement);
                setKeyDown(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionCurrentElement, keyDown]);

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
        context.handleSetVideoID(data[position]?.id);
        context.handleSetPositionVideo(position);
    };

    const handleSetCurrentElement = useCallback((position) => {
        setPositionCurrentElement(position);
    }, []);

    const handleFollow = (data) => {
        setUpdateFollow(data);
    };

    return (
        <div ref={wrapperRef}>
            {data.length === 0 ? (
                <HomeAccountLoading />
            ) : (
                data?.map((video, index) => (
                    <Video
                        data={video}
                        key={index}
                        videoID={video?.id}
                        index={index}
                        onCloseModal={index === positionCurrentElement}
                        currentElement={handleSetCurrentElement}
                        handleFollow={handleFollow}
                        updateFollow={updateFollow}
                    />
                ))
            )}
        </div>
    );
}

export default VideoList;
