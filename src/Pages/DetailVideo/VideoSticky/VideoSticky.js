import classNames from 'classnames/bind';
import { BackIcon, CloseIcon, GhimIcon, NextIcon, PlayIcon } from '~/components/Icons';

import styles from './VideoSticky.module.scss';

const cx = classNames.bind(styles);

function VideoSticky() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('video')}>
                    <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/1946-6423383dcf32e.mp4" />
                </div>
                <div className={cx('ghim-top')}>
                    <GhimIcon />
                </div>
                <div className={cx('close-sticky')}>
                    <CloseIcon />
                </div>
                <div className={cx('controls')}>
                    <div className={cx('back-btn')}>
                        <BackIcon />
                    </div>
                    <div className={cx('state-btn')}>
                        <PlayIcon width="4rem" height="4rem" />
                    </div>
                    <div className={cx('next-btn')}>
                        <NextIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoSticky;
