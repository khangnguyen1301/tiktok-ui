import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    ShareIcon,
    CommentIcon,
    PlayIcon,
    VolumeIcon,
    ThreeDotIcon,
    HashTagMusicIcon,
} from '~/components/Icons';
import PropTypes from 'prop-types';

import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoPlayer({ data }) {
    return (
        <div className={cx('videoplayer-wrapper')}>
            <div className={cx('videoplayer-container')}>
                <div className={cx('mask')}></div>
                <div className={cx('thumbnail')}>
                    <img src={data?.thumb_url} alt={data?.user?.nickname} />
                </div>
                <div className={cx('video')}>
                    <video
                        src={data?.file_url}
                        //autoPlay
                        muted
                        //loop
                    />
                </div>

                {/* right-bar */}
                <div className={cx('button-container')}>
                    <button className={cx('back-button')}>
                        <ChevronUpIcon />
                    </button>
                    <button className={cx('next-button')}>
                        <ChevronDownIcon />
                    </button>
                </div>

                <div className={cx('heart-icon')}>
                    <div className={cx('icon')}>
                        <HeartIcon width="3.2rem" height="3.2rem" />
                    </div>
                    <p>1</p>
                </div>
                <div className={cx('comment-icon')}>
                    <div className={cx('icon')}>
                        <CommentIcon width="3.2rem" height="3.2rem" />
                    </div>
                    <p>1</p>
                </div>
                <div className={cx('share-icon')}>
                    <div className={cx('icon')}>
                        <ShareIcon width="3.2rem" height="3.2rem" />
                    </div>
                    <p>1</p>
                </div>

                {/* control-bar */}
                <div className={cx('controls-wrapper')}>
                    <div className={cx('time-line')}>
                        <input type="range" min="0" max="100" step="1" />
                    </div>

                    <div className={cx('controls-item')}>
                        <div className={cx('left-item')}>
                            <div className={cx('play-item')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                            <div className={cx('time-item')}>00:05 / 00:08</div>
                        </div>
                        <div className={cx('right-item')}>
                            <div className={cx('speed-item')}>
                                <span>Speed</span>
                            </div>
                            <div className={cx('volume-item')}>
                                <VolumeIcon />
                            </div>
                            <div className={cx('expand-item')}>
                                <img src={images.fullscreen} alt="" />
                            </div>
                            <div className={cx('more-item')}>
                                <ThreeDotIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* description */}
            <div className={cx('description-container')}>
                <div className={cx('caption')}>{data?.description}</div>
                <div className={cx('music')}>
                    <span>
                        <HashTagMusicIcon /> <span>{`Nhạc nền - ${data?.user?.nickname}`}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
VideoPlayer.propTypes = {
    data: PropTypes.object,
};
export default VideoPlayer;
