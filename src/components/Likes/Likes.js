import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useContext, useEffect, useState } from 'react';
import * as likeService from '~/services/likeService';
import * as videoService from '~/services/videoService';
import { HeartedIcon, HeartIcon } from '../Icons';
import styles from './Likes.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { liked, unliked } from '~/redux/likesSlice';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { VideoEnviroment } from '~/context/VideoContext/VideoContext';

const cx = classNames.bind(styles);

function Likes({ data, width, height, horizontal = false, noneBorder = false, shake = false, defaultColor = false }) {
    const [isLiked, setIsLiked] = useState(data?.is_liked);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    const [loading, setLoading] = useState(false);

    const { showLoginModal } = useContext(ModalEnviroment);
    const videoContext = useContext(VideoEnviroment)
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;
    const isChangeStateLike = useSelector((state) => state.like?.isLiked);
    const syncLikes = useSelector((state) => state.like?.syncLikes)

    useEffect(()=>{
        setIsLiked(data?.is_liked);
        setLikeCounts(data?.likes_count);
    },[data])

    useEffect(() => {
        if(data?.id === videoContext.videoID) {
            if(syncLikes){
                setIsLiked(isChangeStateLike);
                isChangeStateLike ? setLikeCounts((prev)=> prev + 1) : setLikeCounts((prev)=> prev - 1);
            }
        }
    }, [isChangeStateLike]);

    const stateLikeVideo = () => {
        videoContext.handleSetVideoID(data.id)
        if (isLiked) {
            //unliked
            setIsLiked(false);
            // setLikeCounts((prev)=> prev - 1);
            dispatch(unliked());
            const unLikeVideo = async () => {
                setLoading(true);
                // eslint-disable-next-line no-unused-vars
                await likeService.unLikeVideo({ videoID: data?.id });
                setLoading(false);
            };
            unLikeVideo();
        } else {
            //likeVideo
            setIsLiked(true);
            // setLikeCounts((prev)=> prev + 1);
            dispatch(liked());
            const likeVideo = async () => {
                setLoading(true);
                await likeService.likeVideo({ videoID: data?.id });
                setLoading(false);
            };
            likeVideo();
        }
    };

    return (
        <div className={cx('wrapper', { horizontal })}>
            {!isLogin ? (
                <>
                    <button
                        type="button"
                        className={cx('icon-box', { modalOn: horizontal, noneBorder, shake, defaultColor })}
                        onClick={() => showLoginModal()}
                    >
                        {/* icon */}

                        <HeartIcon width={width} height={height} />
                    </button>
                    <strong className={cx('count', { defaultColor })}>{likeCounts ?? '0'}</strong>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className={cx('icon-box', { modalOn: horizontal, noneBorder, shake, defaultColor })}
                        onClick={() => stateLikeVideo()}
                    >
                        {/* icon */}
                        {isLiked && isLogin ? (
                            <HeartedIcon width={width} height={height} className={cx('scale-heart')} />
                        ) : (
                            <HeartIcon width={width} height={height} className={cx('scale-heart')} />
                        )}
                    </button>
                    <strong className={cx('count', { defaultColor })}>{likeCounts ?? '0'}</strong>
                </>
            )}
        </div>
    );
}

Likes.propTypes = {
    data: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    horizontal: PropTypes.bool,
    noneBorder: PropTypes.bool,
    shake: PropTypes.bool,
};

export default Likes;
