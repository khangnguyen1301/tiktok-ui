import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import * as likeService from '~/services/likeService';
import * as videoService from '~/services/videoService';
import { HeartedIcon, HeartIcon } from '../Icons';
import styles from './Likes.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { liked, unliked } from '~/redux/likesSlice';

const cx = classNames.bind(styles);

function Likes({ data, width, height, horizontal = false, noneBorder = false, shake = false }) {
    const [isLiked, setIsLiked] = useState(data?.is_liked);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;
    const isChangeStateLike = useSelector((state) => state.like?.isLiked);

    useEffect(() => {
        const getLikeInfo = async () => {
            const res = await videoService.getVideo(data?.id);
            setIsLiked(res?.is_liked);
            setLikeCounts(res?.likes_count);
        };
        data?.id && getLikeInfo();
    }, [data, isChangeStateLike]);

    const stateLikeVideo = () => {
        if (isLiked) {
            //unliked
            const unLikeVideo = async () => {
                // eslint-disable-next-line no-unused-vars
                const result = await likeService.unLikeVideo({ videoID: data?.id });
                setLikeCounts(result?.likes_count);
                setIsLiked(false);
                dispatch(unliked());
            };
            unLikeVideo();
        } else {
            //likeVideo
            const likeVideo = async () => {
                const result = await likeService.likeVideo({ videoID: data?.id });
                setLikeCounts(result?.likes_count);
                setIsLiked(true);
                dispatch(liked());
            };
            likeVideo();
        }
    };
    return (
        <div className={cx('wrapper', { horizontal })}>
            <button
                type="button"
                className={cx('icon-box', { modalOn: horizontal, noneBorder, shake })}
                onClick={() => stateLikeVideo()}
            >
                {/* icon */}
                {isLiked && isLogin ? (
                    <HeartedIcon width={width} height={height} />
                ) : (
                    <HeartIcon width={width} height={height} />
                )}
            </button>
            <strong className={cx('count')}>{likeCounts ?? '0'}</strong>
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
