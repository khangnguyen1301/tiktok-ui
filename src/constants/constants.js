import images from '~/assets/images';
import { UserIcon, QRIcon, LanguagesIcon, FeedbackIcon, KeyboardIcon, MoonIcon } from '~/components/Icons';
import Theme from '~/components/Theme';

export const MENU_ITEMS = [
    {
        icon: <LanguagesIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'Tiếng Việt (Việt Nam)',
                },
                {
                    title: 'English',
                },
                {
                    title: 'العربية',
                },
                {
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    title: 'Cebuano (Pilipinas)',
                },
                {
                    title: 'Čeština (Česká republika)',
                },
                {
                    title: 'Deutsch',
                },
                {
                    title: 'Ελληνικά (Ελλάδα)',
                },
                {
                    title: 'Español',
                },
                {
                    title: 'Suomi (Suomi)',
                },
                {
                    title: 'Filipino (Pilipinas)',
                },
                {
                    title: 'Français',
                },
                {
                    title: 'हिंदी',
                },
                {
                    title: 'Magyar (Magyarország)',
                },

                {
                    title: 'Italiano (Italia)',
                },
                {
                    title: '日本語（日本）',
                },
                {
                    title: 'Basa Jawa (Indonesia)',
                },
                {
                    title: 'ខ្មែរ (កម្ពុជា)',
                },
                {
                    title: '한국어 (대한민국)',
                },
                {
                    title: 'Bahasa Melayu (Malaysia)',
                },
                {
                    title: 'မြန်မာ (မြန်မာ)',
                },
                {
                    title: 'Nederlands (Nederland)',
                },
                {
                    title: 'Polski (Polska)',
                },
                {
                    title: 'Português (Brasil)',
                },
                {
                    title: 'Română (Romania)',
                },
                {
                    title: 'Русский (Россия)',
                },
                {
                    title: 'Svenska (Sverige)',
                },
                {
                    title: 'ไทย (ไทย)',
                },
                {
                    title: 'Türkçe (Türkiye)',
                },
                {
                    title: 'Українська (Україна)',
                },
                {
                    title: 'اردو',
                },
                {
                    title: '简体中文',
                },
                {
                    title: '繁體中文',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
        action: 'showKeyboardModal',
    },
    {
        icon: <MoonIcon />,
        title: 'Dark mode',
        rightIcon: <Theme />,
    },
];

export const MENU_ITEMS_UPLOAD_LAYOUT = [
    {
        icon: <LanguagesIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'Tiếng Việt (Việt Nam)',
                },
                {
                    title: 'English',
                },
                {
                    title: 'العربية',
                },
                {
                    title: 'বাঙ্গালি (ভারত)',
                },
                {
                    title: 'Cebuano (Pilipinas)',
                },
                {
                    title: 'Čeština (Česká republika)',
                },
                {
                    title: 'Deutsch',
                },
                {
                    title: 'Ελληνικά (Ελλάδα)',
                },
                {
                    title: 'Español',
                },
                {
                    title: 'Suomi (Suomi)',
                },
                {
                    title: 'Filipino (Pilipinas)',
                },
                {
                    title: 'Français',
                },
                {
                    title: 'हिंदी',
                },
                {
                    title: 'Magyar (Magyarország)',
                },

                {
                    title: 'Italiano (Italia)',
                },
                {
                    title: '日本語（日本）',
                },
                {
                    title: 'Basa Jawa (Indonesia)',
                },
                {
                    title: 'ខ្មែរ (កម្ពុជា)',
                },
                {
                    title: '한국어 (대한민국)',
                },
                {
                    title: 'Bahasa Melayu (Malaysia)',
                },
                {
                    title: 'မြန်မာ (မြန်မာ)',
                },
                {
                    title: 'Nederlands (Nederland)',
                },
                {
                    title: 'Polski (Polska)',
                },
                {
                    title: 'Português (Brasil)',
                },
                {
                    title: 'Română (Romania)',
                },
                {
                    title: 'Русский (Россия)',
                },
                {
                    title: 'Svenska (Sverige)',
                },
                {
                    title: 'ไทย (ไทย)',
                },
                {
                    title: 'Türkçe (Türkiye)',
                },
                {
                    title: 'Українська (Україна)',
                },
                {
                    title: 'اردو',
                },
                {
                    title: '简体中文',
                },
                {
                    title: '繁體中文',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
        action: 'showKeyboardModal',
    },
];

export const FORM_ITEMS = [
    {
        type: 'login',
        title: 'Log in to TikTok',
        contents: [
            {
                icon: <QRIcon />,
                title: 'Use QR code',
            },
            {
                login: 'email',
                icon: <UserIcon />,
                title: 'Use phone / email / username',
                children: {
                    title: 'Log in',
                    data: [{ title: 'Phone' }],
                },
            },
            {
                icon: <img src={images.facebook} alt="" />,
                title: 'Continue with Facebook',
            },
            {
                icon: <img src={images.google} alt="" />,
                title: 'Continue with Google',
            },
            {
                icon: <img src={images.twitter} alt="" />,
                title: 'Continue with Twitter',
            },
            {
                icon: <img src={images.line} alt="" />,
                title: 'Continue with LINE',
            },
            {
                icon: <img src={images.kakaotalk} alt="" />,
                title: 'Continue with KakaoTalk',
            },
            {
                icon: <img src={images.apple} alt="" />,
                title: 'Continue with Apple',
            },
            {
                icon: <img src={images.instagram} alt="" />,
                title: 'Continue with Instagram',
            },
        ],
    },
    {
        type: 'register',
        title: 'Sign up for TikTok',
        showMore: true,
        contents: [
            {
                icon: <UserIcon />,
                title: 'Use phone or email',
                children: {
                    title: 'Register',
                    data: [{ title: 'Phone' }],
                },
            },
            {
                icon: <img src={images.facebook} alt="" />,
                title: 'Continue with Facebook',
            },
            {
                icon: <img src={images.google} alt="" />,
                title: 'Continue with Google',
            },
        ],
    },
    {
        type: 'register-expanded',
        title: 'Sign up for TikTok',
        contents: [
            {
                icon: <UserIcon />,
                title: 'Use phone or email',
                children: {
                    title: 'Log in',
                    data: [{ title: 'Phone' }],
                },
            },
            {
                icon: <img src={images.facebook} alt="" />,
                title: 'Continue with Facebook',
            },
            {
                icon: <img src={images.google} alt="" />,
                title: 'Continue with Google',
            },
            {
                icon: <img src={images.twitter} alt="" />,
                title: 'Continue with Twitter',
            },
            {
                icon: <img src={images.line} alt="" />,
                title: 'Continue with LINE',
            },
            {
                icon: <img src={images.kakaotalk} alt="" />,
                title: 'Continue with KakaoTalk',
            },
        ],
    },
];
