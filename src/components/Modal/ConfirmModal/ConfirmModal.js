import classNames from 'classnames/bind';

import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

function ConfirmModal({ onHideModal, onChangeFile }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('confirm-container')}>
                <div className={cx('title-box')}>
                    <div className={cx('modal-tilte')}>Replace this video?</div>
                    <div className={cx('sub-title')}>Caption and video settings will still be saved.</div>
                </div>
                <div className={cx('replace-btn')} onClick={() => onChangeFile(true)}>
                    Replace
                </div>
                <div className={cx('continue-btn')} onClick={onHideModal}>
                    Continue editing
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
