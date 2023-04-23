import classNames from 'classnames/bind';

import images from '~/assets/images';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('logo')}>
                <img src={images.footerIcon} alt="" />
                <img src={images.footerLogo} alt="" />
            </div>
            <div className={cx('footer-content')}>
                <div className={cx('content-item')}>
                    <h4>Company</h4>
                    <h5>About</h5>
                    <h5>Newsroom</h5>
                    <h5>Contact</h5>
                    <h5>Careers</h5>
                    <h5>ByteDance</h5>
                </div>

                <div className={cx('content-item')}>
                    <h4>Programs</h4>
                    <h5>TikTok for Good</h5>
                    <h5>Advertise</h5>
                    <h5>Developers</h5>
                    <h5>TikTok Rewards</h5>
                    <h5>TikTok Browse</h5>
                    <h5>TikTok Embeds</h5>
                </div>

                <div className={cx('content-item')}>
                    <h4>Support</h4>
                    <h5>Help Center</h5>
                    <h5>Safety Center</h5>
                    <h5>Creator Portal</h5>
                    <h5>Community Guidelines</h5>
                    <h5>Transparency</h5>
                    <h5>Acessibility</h5>
                </div>

                <div className={cx('content-item')}>
                    <h4>Legal</h4>
                    <h5>Terms of Use</h5>
                    <h5>Privacy Policy</h5>
                </div>
            </div>
            <div className={cx('language')}>
                <select>
                    <option>English</option>
                    <option>Tiếng Việt</option>
                    <option>English</option>
                    <option>Tiếng Việt</option>
                    <option>English</option>
                    <option>Tiếng Việt</option>
                    <option>English</option>
                    <option>Tiếng Việt</option>
                    <option>English</option>
                    <option>Tiếng Việt</option>
                </select>
                <span>&copy; 2023 TikTok</span>
            </div>
        </div>
    );
}

export default Footer;
