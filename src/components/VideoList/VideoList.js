import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState, useLayoutEffect } from 'react';
import Video from '~/components/Video';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';
import { useSelector } from 'react-redux';

function VideoList({ data }) {
    const [positionCurrentElement, setPositionCurrentElement] = useState(0);
    const [updateFollow, setUpdateFollow] = useState({});
    const [keyDown, setKeyDown] = useState(false);
    const [inView, setInView] = useState(false);
    const [positionInView, setPositionInView] = useState(0);

    const wrapperRef = useRef(null);
    const videoContext = useContext(VideoEnviroment);
    const maxLength = data.length - 1;
    const isChangeStateLike = useSelector((state) => state.like?.isLiked);

    useLayoutEffect(() => {
        if (positionCurrentElement >= maxLength) {
            return;
        } else {
            setPositionCurrentElement(videoContext.positionVideo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoContext.positionVideo, isChangeStateLike]);

    useLayoutEffect(() => {
        if (videoContext.isVideoModalShow || keyDown) {
            if (positionCurrentElement > maxLength) {
                setPositionCurrentElement(maxLength);
            } else {
                videoContext.videoInViewList.forEach((video, index) => {
                    video.inView = index === positionCurrentElement;
                });
                handleScrollElement(positionCurrentElement);
                setKeyDown(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [positionCurrentElement, keyDown]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    useLayoutEffect(() => {
        const firstInView = handleVideoInView();
        setPositionInView(firstInView);
        console.log('VideoList', videoContext.videoInViewList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, positionCurrentElement]);

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
        videoContext.handleSetVideoID(data[position]?.id);
        videoContext.handleSetPositionVideo(position);
    };

    const handleSetCurrentElement = useCallback((position) => {
        setPositionCurrentElement(position);
    }, []);

    const handleFollow = (data) => {
        setUpdateFollow(data);
    };

    const handleInViewPlay = (view) => {
        setInView(view);
    };

    const handleVideoInView = () => {
        const firstVideo = videoContext.videoInViewList.findIndex((entity) => entity?.inView === true);
        return firstVideo;
    };

    return (
        <div ref={wrapperRef}>
            {data?.map((video, index) => (
                <Video
                    data={video}
                    key={index}
                    videoID={video?.id}
                    index={index}
                    onCloseModal={index === positionCurrentElement}
                    currentElement={handleSetCurrentElement}
                    handleFollow={handleFollow}
                    updateFollow={updateFollow}
                    onInView={handleInViewPlay}
                    inViewPlay={index === positionInView}
                />
            ))}
        </div>
    );
}

VideoList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default VideoList;
