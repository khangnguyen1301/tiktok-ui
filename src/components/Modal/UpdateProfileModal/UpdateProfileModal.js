import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLocalStorage } from '~/hooks';
import { EditAvatarIcon } from '~/components/Icons';
import * as userService from '~/services/userService';
import Button from '~/components/Button';
import Image from '~/components/Image';

import styles from './UpdateProfileModal.module.scss';

const cx = classNames.bind(styles);

function UpdateProFileModal({ onHideModal }) {
    const [avatarPreview, setAvatarPreview] = useState();
    const [avatar, setAvatar] = useState();
    const [textCount, setTextCount] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [bio, setBio] = useState('');
    const [isReady, setIsReady] = useState(false);
    const { setDataLocalStorage, getDataLocalStorage } = useLocalStorage();

    const userInfo = getDataLocalStorage('user-info').data;

    const avatarRef = useRef();

    useEffect(() => {
        if (firstName && lastName && birthDay && bio) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [firstName, lastName, birthDay, bio]);

    const updateProFile = async () => {
        let formData = new FormData();
        if (avatar) {
            formData.append('avatar', avatar);
        }
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('date_of_birth', birthDay);
        formData.append('bio', bio);
        const result = await userService.userUpdateInfo(formData);
        setDataLocalStorage('user-info', {
            data: {
                ...userInfo,
                avatar: result.avatar,
            },
        });
        window.location.reload();
    };

    const handleOpenSelectImage = () => {
        avatarRef.current.click();
    };

    const handleAvatarChange = (e) => {
        const avatar = e.target.files[0];
        setAvatarPreview(URL.createObjectURL(avatar));
        setAvatar(avatar);
    };

    const handleFirstName = (e) => {
        const text = e.target.value;
        setFirstName(text);
    };

    const handleLastName = (e) => {
        const text = e.target.value;
        setLastName(text);
    };

    const handleBirthDay = (e) => {
        const text = e.target.value;
        setBirthDay(text);
    };

    const handleBio = (e) => {
        const text = e.target.value;
        setBio(text);
        setTextCount(text.length);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('update-wrapper')}>
                <div className={cx('update-container')}>
                    <div className={cx('header-bar')}>
                        <div className={cx('title')}>
                            <span>Edit profile</span>
                        </div>
                        <div className={cx('close-btn')} onClick={onHideModal}>
                            <span>
                                <FontAwesomeIcon icon={faXmark} />
                            </span>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('profile-photo')}>
                            <span>Profile photo</span>
                            <div className={cx('avatar-container')} onClick={handleOpenSelectImage}>
                                <label className={cx('label-avatar')} ref={avatarRef}>
                                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                                </label>
                                <Image
                                    src={avatarPreview || userInfo.avatar}
                                    alt={userInfo.nickName}
                                    className={cx('avatar-preview')}
                                />
                                <div className={cx('edit-icon')}>
                                    <EditAvatarIcon />
                                </div>
                            </div>
                        </div>
                        <div className={cx('first-name')}>
                            <span>First name</span>
                            <div className={cx('content-edit')}>
                                <input type="text" placeholder="First name" onChange={(e) => handleFirstName(e)} />
                                <p>{`www.tiktok.com/@${userInfo.nickName}`}</p>
                                <p>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link
                                </p>
                            </div>
                        </div>
                        <div className={cx('last-name')}>
                            <span>Last name</span>
                            <div className={cx('content-edit')}>
                                <input type="text" placeholder="Last name" onChange={(e) => handleLastName(e)} />
                                <p>Please enter last name</p>
                            </div>
                        </div>
                        <div className={cx('birthday')}>
                            <span>Date of birth</span>
                            <div className={cx('content-edit')}>
                                <input
                                    type="text"
                                    placeholder="Example: 2000-01-13"
                                    onChange={(e) => handleBirthDay(e)}
                                />
                                <p>Please enter day of birth</p>
                            </div>
                        </div>
                        <div className={cx('bio')}>
                            <span>Bio</span>
                            <div className={cx('bio-edit')}>
                                <textarea placeholder="Bio" onChange={(e) => handleBio(e)} />
                                <p>{`${textCount}/80`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('cancel-container')} onClick={onHideModal}>
                            <Button custom className={cx('cancel-btn')}>
                                Cancel
                            </Button>
                        </div>
                        <div className={cx('save-container')}>
                            <Button
                                disabled={!isReady}
                                custom
                                className={cx('save-btn', { submit: isReady })}
                                onClick={() => updateProFile()}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProFileModal;
