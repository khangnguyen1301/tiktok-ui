import classNames from 'classnames/bind';
import { useState, useMemo, useEffect, useContext } from 'react';

import { ChevronDownIcon, ChevronLeftIcon, XMarkIcon } from '~/components/Icons';
import styles from './FormModal.module.scss';
import { FORM_ITEMS } from '~/constants/constants';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function FormModal({ onHideModal }) {
    const [formLoginState, setFormLoginState] = useState('login');
    const [filteredForm, setFilteredForm] = useState([{}]);
    const [isChildren, setIsChildren] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const { handleSetUserData, handleUserLogIn } = useContext(ModalEnviroment);
    const loginRegisterForm = useMemo(() => FORM_ITEMS, []);

    const handleLogin = async () => {
        const result = await userService.userLogin({ email: email, password: password });
        handleSetUserData(result);
        handleUserLogIn();
        window.location.reload();
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
                                            onClick={() => handleMenu(index)}
                                            className={cx('menu-item')}
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
                                        handleLogin();
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
                            <div className={cx('notify')}>
                                Don't have an account? <p onClick={() => setFormLoginState('register')}> Sign up</p>{' '}
                            </div>
                        ) : (
                            <div className={cx('notify')}>
                                Already have an account? <p onClick={() => setFormLoginState('login')}>Log in</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('close-btn')} onClick={onHideModal}>
                    <XMarkIcon />
                </div>
            </div>
        </div>
    );
}

export default FormModal;
