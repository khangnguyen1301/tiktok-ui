import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDownIcon, ChevronLeftIcon, XMarkIcon } from '~/components/Icons';
import styles from './FormModal.module.scss';
import { FORM_ITEMS } from '~/constants/constants';
import Button from '~/components/Button';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginUser, registerUser } from '~/redux/apiRequest';
import Notify from '~/components/Notify';
import { resetLogin, resetRegister } from '~/redux/authSlice';
import { type } from '@testing-library/user-event/dist/type';

const cx = classNames.bind(styles);

function FormModal({ onHideModal }) {
    const [formLoginState, setFormLoginState] = useState('login');
    const [filteredForm, setFilteredForm] = useState([{}]);
    const [isChildren, setIsChildren] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [typePassword, setTypePassword] = useState('password');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRef = useRef();
    const loginFetching = useSelector((state) => state.auth?.login?.isFetching);
    const registerFetching = useSelector((state) => state.auth?.register?.isFetching);
    const isLogin = useSelector((state) => state.auth?.login?.isLogin);
    const isRegister = useSelector((state) => state.auth?.register?.isRegister);
    const isError = useSelector((state) => state.auth.login.error);
    const loginMessage = useSelector((state) => state.auth.login.message);
    const registerMessage = useSelector((state) => state.auth.register.message);
    const loginRegisterForm = useMemo(() => FORM_ITEMS, []);

    useEffect(() => {
        let timerID;
        if (!isError && isLogin) {
            timerID = setTimeout(() => {
                //onHideModal();
                window.location.reload();
            }, 1500);
        }
        return () => clearTimeout(timerID);
    }, [isError, isLogin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(resetRegister());
        const user = {
            email,
            password,
        };
        await loginUser(user, dispatch, navigate);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        await registerUser(user, dispatch);
        switchLogin();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formLoginState]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleKeydown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            submitRef.current.click();
        }
    };

    const handleMenu = (position) => {
        const nextForm = [...loginRegisterForm.find((form) => form.type === formLoginState).contents];
        // const newForm = [...nextForm.contents];
        nextForm.map((form, index) => {
            let parent = !!form.children;
            if (parent && position === index) {
                setFilteredForm(form.children);
                setIsChildren(true);
            } else {
                return;
            }
        });
    };
    const handleBack = () => {
        setIsChildren(false);
        resetMenu();
        setEmail('');
        setPassword('');
    };

    const switchLogin = () => {
        setFormLoginState('login');
        handleBack();
    };

    const switchRegister = () => {
        setFormLoginState('register');
        handleBack();
    };

    const handleCloseModal = () => {
        dispatch(resetLogin());
        dispatch(resetRegister());
        onHideModal();
    };

    const handleShowPassword = (e) => {
        e.preventDefault();
        typePassword.includes('password') ? setTypePassword('text') : setTypePassword('password');
    };

    return (
        <div className={cx('modal-mask')}>
            {(isLogin || isError || isRegister) && (
                <div
                    className={cx('notify-success', {
                        show: !loginFetching && !registerFetching,
                    })}
                >
                    <Notify message={isRegister ? registerMessage : loginMessage} />
                </div>
            )}
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
                                            onClick={() => handleMenu(index)}
                                            className={cx('menu-item')}
                                        >
                                            <span className={cx('icon')}>{content.icon}</span>
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
                        <form
                            className={cx('wrapper-login')}
                            onSubmit={filteredForm.title.toLowerCase() === 'log in' ? handleLogin : handleRegister}
                        >
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
                                        type={typePassword}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button className={cx('show-password')} onClick={handleShowPassword}>
                                        {typePassword.includes('password') ? (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className={cx('forgot')}>Forgot password</p>
                            <div>
                                <button
                                    disabled={!isSubmit}
                                    className={cx('custom-btn', { submit: isSubmit })}
                                    type="submit"
                                    ref={submitRef}
                                >
                                    {!loginFetching && !registerFetching ? (
                                        filteredForm.title
                                    ) : (
                                        <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />
                                    )}
                                </button>
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
                            <div className={cx('notify')}>
                                Don't have an account? <p onClick={switchRegister}> Sign up</p>
                            </div>
                        ) : (
                            <div className={cx('notify')}>
                                Already have an account? <p onClick={switchLogin}>Log in</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('close-btn')} onClick={handleCloseModal}>
                    <XMarkIcon />
                </div>
            </div>
        </div>
    );
}

export default FormModal;
