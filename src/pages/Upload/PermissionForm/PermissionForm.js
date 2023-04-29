import PropTypes from 'prop-types';
import { useState, useRef, useEffect, useContext } from 'react';
import VideoThumbnail from 'react-video-thumbnail';

import classNames from 'classnames/bind';

import styles from './PermissionForm.module.scss';
import images from '~/assets/images';
import { BottomArrowIcon, CheckIcon } from '~/components/Icons';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PermissionForm({
    srcVideo,
    nameSliced,
    initialList,
    thumbnailRef,
    miniSnapshotRef,
    upLoadVideo,
    onCaption,
    onPermission,
    onListChecked,
    loading = false,
}) {
    const [caption, setCaption] = useState('');
    const [isDetected, setIsDetected] = useState(false);
    const [snapshots, setSnapshots] = useState([]);
    const [listChecked, setListChecked] = useState(initialList);
    const [isSelected, setIsSelected] = useState(false);
    const [permissionViewer, setPermissionViewer] = useState('Public');
    const checkRef = useRef();
    const copyCheck = useRef();
    const captionRef = useRef();
    const selectRef = useRef();
    const snapshotRef = useRef();
    const translateRef = useRef();

    const { isChangeFile, isDiscardFile, showDisCardModal } = useContext(ModalEnviroment);

    useEffect(() => {
        if (isChangeFile || isDiscardFile) {
            setSnapshots([]);
            setCaption('');
            captionRef.current.value = '';
            translateRef.current.style.transform = `translateX(0px)`;
        } else {
            setCaption(nameSliced);
            captionRef.current.value = nameSliced;
        }
    }, [isChangeFile, nameSliced, isDiscardFile]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOnClickOutSide);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleOnClickOutSide);
        };
    }, [selectRef]);

    const handlePermission = () => {
        setIsSelected(!isSelected);
    };

    const handleInnerText = (e) => {
        onPermission(e.target.innerText);
        setPermissionViewer(e.target.innerText);
        setIsSelected(false);
    };

    const handleChecked = (e, type) => {
        const checked = e.target.checked;
        onListChecked((prev) => ({ ...prev, [type]: checked }));
        setListChecked((prev) => ({ ...prev, [type]: checked }));
    };

    const handleShowDetected = (e) => {
        const checked = e.target.checked;
        setIsDetected(checked);
    };

    const handleOnClickOutSide = (event) => {
        const { target } = event;
        if (selectRef.current && !selectRef.current.contains(target)) {
            setIsSelected(false);
        }
    };

    const handleTranslate = () => {
        thumbnailRef.current.currentTime = snapshotRef.current?.value;
        miniSnapshotRef.current.currentTime = snapshotRef.current?.value;
        translateRef.current.style.transform = `translate3d(${
            6.3 * ((thumbnailRef.current.currentTime / thumbnailRef.current.duration) * 100)
        }px,1px,0px)`;
    };

    const handleCaption = (e) => {
        onCaption(e.target.value);
        setCaption(e.target.value);
    };

    const handleUploadVideo = (e) => {
        e.preventDefault();
        upLoadVideo();
    };

    return (
        <form className={cx('form')} onSubmit={handleUploadVideo}>
            <div className={cx('caption')}>
                <span className={cx('title-caption')}>Caption</span>
                <span className={cx('count-char')}>{`${caption.length}/2200`}</span>
            </div>

            <div className={cx('caption-content')}>
                <input
                    type="text"
                    className={cx('input-caption')}
                    onChange={(e) => handleCaption(e)}
                    //defaultValue={nameSliced}
                    ref={captionRef}
                />
                <img src={images.email} className={cx('email')} alt="" />
                <img src={images.hastag} className={cx('hastag')} alt="" />
            </div>

            <div className={cx('thumbnail')}>
                <span>Cover</span>
                <div className={cx('thumb-image')}>
                    <div className={cx('img-container')}>
                        {!isChangeFile && !isDiscardFile && (
                            <input
                                type="range"
                                min="0"
                                max={thumbnailRef.current?.duration.toFixed(0)}
                                step="1"
                                className={cx('time-snapshot')}
                                ref={snapshotRef}
                                onInput={handleTranslate}
                            />
                        )}

                        {isChangeFile || isDiscardFile ? (
                            <div className={cx('image-dragbox')} ref={translateRef}>
                                <div className={cx('video-snapshot')}></div>
                            </div>
                        ) : (
                            <div className={cx('image-dragbox')} ref={translateRef}>
                                <div className={cx('video-snapshot')}>
                                    <video src={srcVideo} ref={thumbnailRef} />
                                </div>
                            </div>
                        )}

                        {/* <div className={cx('mask-container')}></div> */}
                        {!isChangeFile &&
                            !isDiscardFile &&
                            [...Array(8)].map((res, index) => (
                                <div className={cx('image')} key={index}>
                                    <div className={cx('image-none')}>
                                        <VideoThumbnail
                                            videoUrl={srcVideo}
                                            snapshotAtTime={index}
                                            thumbnailHandler={(thumbnail) =>
                                                setSnapshots((prev) => [...prev, thumbnail])
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        {(!isChangeFile || !isDiscardFile) &&
                            snapshots.map((res, index) => (
                                <div className={cx('snapshot-container')} key={index}>
                                    <img src={res} alt="" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className={cx('permisson')}>
                <span>Who can watch this video</span>
                <div className={cx('select-container')} ref={selectRef}>
                    <div className={cx('select')} onClick={handlePermission}>
                        <span> {permissionViewer}</span>
                        <div className={cx('icon', { activeIcon: !isSelected })}>
                            <BottomArrowIcon />
                        </div>
                    </div>
                    <div className={cx('select-item', { selected: !isSelected })} onClick={handleOnClickOutSide}>
                        <div
                            className={cx('item', {
                                activeItem: permissionViewer === 'Public',
                            })}
                            onClick={handleInnerText}
                        >
                            <span className={cx('title')}>Public</span>
                        </div>
                        <div
                            className={cx('item', {
                                activeItem: permissionViewer === 'Friends',
                            })}
                            onClick={handleInnerText}
                        >
                            <span className={cx('title')}>Friends</span>
                        </div>
                        <div
                            className={cx('item', {
                                activeItem: permissionViewer === 'Private',
                            })}
                            onClick={handleInnerText}
                        >
                            <span className={cx('title')}>Private</span>
                        </div>
                    </div>
                </div>
                <span>Allow users to:</span>
                <div className={cx('checkbox-container')} ref={checkRef}>
                    <div className={cx('checkbox')}>
                        <div className={cx('checkbox-item')}>
                            <div
                                className={cx('checked-item', {
                                    checked: listChecked.comment,
                                })}
                            >
                                <CheckIcon />
                            </div>
                            <input
                                type="checkbox"
                                onClick={(e) => handleChecked(e, 'comment')}
                                defaultChecked={listChecked.comment}
                            />
                        </div>
                        <span>Comment</span>
                    </div>

                    <div className={cx('checkbox')}>
                        <div className={cx('checkbox-item')}>
                            <div
                                className={cx('checked-item', {
                                    checked: listChecked.duet,
                                })}
                            >
                                <CheckIcon />
                            </div>
                            <input
                                type="checkbox"
                                onClick={(e) => handleChecked(e, 'duet')}
                                defaultChecked={listChecked.duet}
                            />
                        </div>

                        <span>Duet</span>
                    </div>
                    <div className={cx('checkbox')}>
                        <div className={cx('checkbox-item')}>
                            <div
                                className={cx('checked-item', {
                                    checked: listChecked.stitch,
                                })}
                            >
                                <CheckIcon />
                            </div>
                            <input
                                type="checkbox"
                                onClick={(e) => handleChecked(e, 'stitch')}
                                defaultChecked={listChecked.stitch}
                            />
                        </div>
                        <span>Stitch</span>
                    </div>
                </div>
                <div className={cx('copy-check')}>
                    <span>Run a copyright check</span>
                    <div className={cx('check-btn')}>
                        <input
                            type="checkbox"
                            id="switch"
                            className={cx('switch-input')}
                            ref={copyCheck}
                            onClick={(e) => handleShowDetected(e)}
                        />
                        <label htmlFor="switch" className={cx('switch')}></label>
                    </div>
                </div>
                {isDetected && (
                    <div className={cx('check-content')}>
                        <img src={images.check} alt="" />
                        <span>No issues detected.</span>
                    </div>
                )}

                <div className={cx('note')}>
                    <p>
                        Note: Results of copyright checks aren't final. For instance, future changes of the copyright
                        holder's authorization to the sound may impact your video may impact your video.
                    </p>
                    <span>Learn more</span>
                </div>

                <div className={cx('button')}>
                    <button type="button" className={cx('btn-discard')} onClick={() => showDisCardModal()}>
                        Discard
                    </button>
                    <button type="submit" className={cx('btn-post', { disabled: isChangeFile || isDiscardFile })}>
                        {loading ? (
                            <div className={cx('loading')}>
                                <FontAwesomeIcon icon={faCircleNotch} />
                            </div>
                        ) : (
                            'Post'
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}

PermissionForm.propTypes = {
    srcVideo: PropTypes.string.isRequired,
    nameSliced: PropTypes.string,
    initialList: PropTypes.object,
    upLoadVideo: PropTypes.func,
    onCaption: PropTypes.func,
    onPermission: PropTypes.func,
    onListChecked: PropTypes.func,
    loading: PropTypes.bool,
};

export default PermissionForm;
