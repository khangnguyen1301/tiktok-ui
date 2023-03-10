import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useContext } from 'react';

import { ChevronDownIcon, ChevronLeftIcon, QRIcon, UserIcon, XMarkIcon } from '~/components/Icons';
import styles from './FormModal.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function FormModal({ onHide }) {
    const [formLoginState, setFormLoginState] = useState('login');
    const [filteredForm, setFilteredForm] = useState([{}]);
    const [isChildren, setIsChildren] = useState(false);
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const context = useContext(ModalContext);
    const loginRegisterForm = useMemo(
        () => [
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
        ],
        [],
    );

    const fetchApi = () => {
        var myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3NzY3NDMxNiwiZXhwIjoxNjgwMjY2MzE2LCJuYmYiOjE2Nzc2NzQzMTYsImp0aSI6InZYUm52eVVON0tYOWtBMHkiLCJzdWIiOjUyMDEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.LUQ7k9LZunOWgtO9SsDGMUiIth4pDCIzWiU31l_a0Kw',
        );
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            email: `${email}`,
            password: `${password}`,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('https://tiktok.fullstack.edu.vn/api/auth/login', requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((result) => {
                context.handleSetUserData(result);
                context.handleUserLogIn();
                window.location.reload();
            })
            .catch((error) => console.log('error', error));
    };

    const resetMenu = () => {
        const newForm = loginRegisterForm.find((form) => form.type === formLoginState);
        setFilteredForm(newForm);
    };

    useEffect(() => {
        if (email && password) {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    }, [email, password]);

    useEffect(() => {
        resetMenu();
    }, [loginRegisterForm, formLoginState]);

    const handleMenu = () => {
        const nextForm = loginRegisterForm.find((form) => form.type === formLoginState);
        const newForm = [...nextForm.contents];
        newForm.map((form) => {
            const parent = !!form.children;
            if (parent) {
                setFilteredForm(form.children);
                setIsChildren(true);
            }
        });
    };
    const handleBack = () => {
        setIsChildren(false);
        resetMenu();
    };
    return (
        <div className={cx('modal-mask')}>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    {!isChildren ? (
                        <div className={cx('inner')}>
                            <div className={cx('title')}>{filteredForm.title}</div>

                            <div className={cx('list')}>
                                {filteredForm.contents?.map((content, index) => {
                                    return (
                                        <Button
                                            style={{ height: '44px', marginBottom: '16px' }}
                                            key={index}
                                            onClick={handleMenu}
                                        >
                                            <span className={cx('icon')}>{content.icon}</span>{' '}
                                            <span>{content.title}</span>
                                        </Button>
                                    );
                                })}

                                {filteredForm.showMore && (
                                    <div
                                        className={cx('more-btn')}
                                        onClick={() => setFormLoginState('register-expanded')}
                                    >
                                        <ChevronDownIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <form className={cx('wrapper-login')}>
                            <div className={cx('back-btn')} onClick={handleBack}>
                                <ChevronLeftIcon />
                            </div>
                            <div className={cx('title')}>{filteredForm.title}</div>
                            <p className={cx('type')}>Email or username</p>
                            <div className={cx('form-login')}>
                                <div className={cx('email')}>
                                    <input
                                        type="text"
                                        placeholder="Email or username"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={cx('password')}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <p className={cx('forgot')}>Forgot password</p>
                            <div>
                                <Button
                                    disabled={!isSubmit}
                                    primary
                                    className={cx('custom-btn')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fetchApi();
                                    }}
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>
                    )}

                    {formLoginState.startsWith('register') && (
                        <div className={cx('agreement')}>
                            <p>
                                By continuing, you agree to TikTok's <Link to="/">Terms of Service</Link> and confirm
                                that you have read TikTok's <Link to="/">Privacy Policy</Link>.
                            </p>
                        </div>
                    )}

                    <div className={cx('footer')}>
                        {formLoginState === 'login' ? (
                            <>
                                Don't have an account? <p onClick={() => setFormLoginState('register')}> Sign up</p>{' '}
                            </>
                        ) : (
                            <>
                                Already have an account? <p onClick={() => setFormLoginState('login')}>Log in</p>
                            </>
                        )}
                    </div>
                </div>

                <div className={cx('close-btn')} onClick={onHide}>
                    <XMarkIcon />
                </div>
            </div>
        </div>
    );
}

export default FormModal;
