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
                    <option>Tiếng Việt (Việt Nam)</option>
                    <option>العربية</option>
                    <option>বাঙ্গালি (ভারত)</option>
                    <option>Cebuano (Pilipinas)</option>
                    <option>Čeština (Česká republika)</option>
                    <option>Deutsch</option>
                    <option>Ελληνικά (Ελλάδα)</option>
                    <option>Español</option>
                    <option>Suomi (Suomi)</option>
                    <option>Filipino (Pilipinas)</option>
                    <option>Français</option>
                    <option>हिंदी</option>
                    <option>Magyar (Magyarország)</option>
                    <option>Italiano (Italia)</option>
                    <option>日本語（日本）</option>
                    <option>Basa Jawa (Indonesia)</option>
                    <option>ខ្មែរ (កម្ពុជា)</option>
                    <option>한국어 (대한민국)</option>
                    <option>Bahasa Melayu (Malaysia)</option>
                    <option>မြန်မာ (မြန်မာ)</option>
                    <option>Nederlands (Nederland)</option>
                    <option>Polski (Polska)</option>
                    <option>Português (Brasil)</option>
                    <option>Română (Romania)</option>
                    <option>Русский (Россия)</option>
                    <option>Svenska (Sverige)</option>
                    <option>ไทย (ไทย)</option>
                    <option>Türkçe (Türkiye)</option>
                    <option>Українська (Україна)</option>
                    <option>اردو </option>
                    <option>简体中文</option>
                    <option>繁體中文</option>
                </select>
                <span>&copy; 2023 TikTok</span>
            </div>
        </div>
    );
}

export default Footer;
