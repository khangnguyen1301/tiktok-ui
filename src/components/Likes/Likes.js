import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import * as likeService from '~/services/likeService';
import { HeartedIcon, HeartIcon } from '../Icons';
import styles from './Likes.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Likes({ data, width, height, horizontal = false, noneBorder = false, shake = false }) {
    const [isLiked, setIsLiked] = useState(data?.is_liked);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    const [videoID, setVideoID] = useState(data?.id);

    const isLogin = useSelector((state) => state.auth.login?.isLogin) || false;

    useEffect(() => {
        setVideoID(data?.id);
        setIsLiked(data?.is_liked);
        setLikeCounts(data?.likes_count);
    }, [data]);

    const stateLikeVideo = () => {
        if (isLiked) {
            //unliked
            const unLikeVideo = async () => {
                // eslint-disable-next-line no-unused-vars
                const result = await likeService.unLikeVideo({ videoID: videoID });
                setLikeCounts(result.likes_count);
                setIsLiked(false);
            };
            unLikeVideo();
        } else {
            //likeVideo
            const likeVideo = async () => {
                const result = await likeService.likeVideo({ videoID: videoID });
                setLikeCounts(result.likes_count);
                setIsLiked(true);
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
            <strong className={cx('count')}>{likeCounts ?? 0}</strong>
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
