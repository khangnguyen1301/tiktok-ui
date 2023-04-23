import classNames from 'classnames/bind';

import styles from './KeyboardModal.module.scss';
import { LikeKey, MuteKey, NextKey, PreviousKey } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function KeyboardModal({ onHideModal }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span>Keyboard shortcuts</span>
                </div>
                <div className={cx('key-item')}>
                    <span>Go to previous video</span>
                    <div>
                        <PreviousKey />
                    </div>
                </div>
                <div className={cx('key-item')}>
                    <span>Go to next video</span>
                    <div>
                        <NextKey />
                    </div>
                </div>
                <div className={cx('key-item')}>
                    <span>Like video</span>
                    <div>
                        <LikeKey />
                    </div>
                </div>
                <div className={cx('key-item')}>
                    <span>Mute / unmute video</span>
                    <div>
                        <MuteKey />
                    </div>
                    <div className={cx('close-btn')} onClick={onHideModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeyboardModal;
