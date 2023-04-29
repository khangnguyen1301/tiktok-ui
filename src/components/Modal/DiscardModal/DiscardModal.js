import classNames from 'classnames/bind';

import styles from './DiscardModal.module.scss';

const cx = classNames.bind(styles);

function DiscardModal({ onHideModal, onChangeFile }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('confirm-container')}>
                <div className={cx('title-box')}>
                    <div className={cx('modal-tilte')}>Discard this post?</div>
                    <div className={cx('sub-title')}>The video and all edits will be discarded.</div>
                </div>
                <div className={cx('replace-btn')} onClick={() => onChangeFile(true)}>
                    Discard
                </div>
                <div className={cx('continue-btn')} onClick={onHideModal}>
                    Continue editing
                </div>
            </div>
        </div>
    );
}

export default DiscardModal;
