import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './DownloadMobileModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function DownloadMobileModal({ onHideModal }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <span className={cx('title')}>Get the TikTok app</span>
                    <span className={cx('close-btn')} onClick={onHideModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </div>
                <span className={cx('title-code')}>Scan QR code to download TikTok</span>
                <div className={cx('QR-code')}>
                    <img src={images.codeQR} alt="" />
                </div>
                <span className={cx('title-code')}>Download for app stores</span>
                <div className={cx('stores')}>
                    <div className={cx('stores-item')}>
                        <img src={images.microsoftStore} alt="" />
                    </div>
                    <div className={cx('stores-item')}>
                        <img src={images.appStore} alt="" />
                    </div>
                    <div className={cx('stores-item')}>
                        <img src={images.amazonStore} alt="" />
                    </div>

                    <div className={cx('stores-item')}>
                        <img src={images.googleStore} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

DownloadMobileModal.propTypes = {
    onHideModal: PropTypes.func,
};

export default DownloadMobileModal;
