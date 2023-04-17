import { faCircleQuestion, faKeyboard, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { UserIcon, QRIcon, LanguagesIcon, FeedbackIcon, KeyboardIcon, MoonIcon } from '~/components/Icons';
import Theme from '~/components/Theme';

export const DEFAULT_USER_INFO = {
    state: false,
    data: {
        avatar: images.noImage,
        firstName: '',
        lastName: '',
        nickName: '',
        id: '',
        tick: false,
    },
};

export const MENU_ITEMS = [
    {
        icon: <LanguagesIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
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
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',
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

export const FAKE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
