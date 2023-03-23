import classNames from 'classnames/bind';
import VideoThumbnail from 'react-video-thumbnail';
import { useEffect, useRef, useState } from 'react';

import Image from '~/components/Image';
import images from '~/assets/images';
import Button from '~/components/Button';
import * as upLoadService from '~/services/uploadService';
import {
    BottomArrowIcon,
    CheckIcon,
    CutIcon,
    DecreaseIcon,
    HashTagMusicIcon,
    IncreaseIcon,
    SplitIcon,
} from '~/components/Icons';

import styles from './Upload.module.scss';
import Thumbnail from '~/components/Thumbnail';

const cx = classNames.bind(styles);

const initialChecked = {
    comment: true,
    duet: true,
    stitch: true,
};
function Upload() {
    const [videoFile, setVideoFile] = useState();
    const [srcVideo, setSrcVideo] = useState('');
    const [caption, setCaption] = useState('');
    const [nameSlice, setNameSlice] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [detailUpload, setDetailUpload] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isDetected, setIsDetected] = useState(false);
    const [listChecked, setListChecked] = useState(initialChecked);
    const [permissionViewer, setPermissionViewer] = useState('Public');

    const [snapshots, setSnapshots] = useState([]);

    const inputRef = useRef();
    const checkRef = useRef();
    const copyCheck = useRef();
    const selectRef = useRef();
    const thumbnailRef = useRef();
    const videoRef = useRef();
    const snapshotRef = useRef();
    const translateRef = useRef();
    const miniSnapshotRef = useRef();
    const captionRef = useRef();

    const upLoadVideo = async () => {
        let formdata = new FormData();
        formdata.append('description', caption);
        formdata.append('upload_file', videoFile);
        formdata.append('thumbnail_time', thumbnailRef.current.currentTime.toFixed(0));
        formdata.append('music', `Orginal sound - duykhang1301`);
        formdata.append('viewable', permissionViewer.toLowerCase());

        Object.entries(listChecked).map((res) => {
            const [key, value] = res;
            if (value === true) {
                formdata.append('allows[]', key);
            }
        });
        const result = await upLoadService.upLoadVideo(formdata);
    };

    useEffect(() => {
        if (nameSlice.length > 0) {
            setCaption(nameSlice.join(''));
        } else {
            handleCaption();
        }
    }, [videoFile, nameSlice]);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setVideoFile(e.dataTransfer.files[0]);
            setDetailUpload(true);
            setSrcVideo(URL.createObjectURL(e.dataTransfer.files[0]));
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setVideoFile(selectedFile);
        setSrcVideo(URL.createObjectURL(selectedFile));
        setDetailUpload(true);
    };

    const handleUploadFile = () => {
        inputRef.current.click();
    };

    const handlePermission = () => {
        setIsSelected(!isSelected);
    };

    const handleInnerText = (e) => {
        setPermissionViewer(e.target.innerText);
        setIsSelected(false);
    };

    const handleChecked = (e, type) => {
        const checked = e.target.checked;
        setListChecked((prev) => ({ ...prev, [type]: checked }));
    };

    const handleShowDetected = (e) => {
        const checked = e.target.checked;
        setIsDetected(checked);
    };

    const handleOnClickOutSide = (event) => {
        const { target } = event;
        if (!selectRef.current.contains(target)) {
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
    const handleCaption = () => {
        const captionSlice = videoFile?.name;
        for (let index = 0; index < captionSlice?.length - 4; index++) {
            setNameSlice((prev) => [...prev, captionSlice[index]]);
        }
    };
    return (
        <div className={cx('wrapper')}>
            {!detailUpload ? (
                <div className={cx('upload-container')}>
                    <label className={cx('label-file')} ref={inputRef}>
                        <input type="file" accept="video/*" onChange={handleFileChange} />
                    </label>

                    <div
                        className={cx('upload-info')}
                        onClick={handleUploadFile}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <img src={images.upload} alt="" />
                        <span className={cx('title')}>Select video to upload</span>
                        <span className={cx('text-info')}>Or drag and drop a file</span>
                        <span className={cx('text-info')}>
                            Long videos can be split into multiple parts to get more exposure
                        </span>
                        <div className={cx('text-video')}>
                            <span>MP4 or WebM</span>
                            <span>720x1280 resolution or higher</span>
                            <span>Up to 30 minutes</span>
                            <span>Less than 2 GB</span>
                        </div>
                        <div className={cx('btn-container')}>
                            <Button primary large className={cx('upload-btn')}>
                                Select file
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={cx('header-upload')}>
                        <div className={cx('edit-video')}>
                            <div className={cx('video-edit-card')}>
                                <div className={cx('video-index')}>
                                    <span>1</span>
                                </div>
                                <div className={cx('video-cover')}>
                                    <video src={srcVideo} ref={miniSnapshotRef} />
                                </div>
                                <div className={cx('video-info')}>
                                    <div className={cx('video-name')}>
                                        <span>{nameSlice.join('')}</span>
                                    </div>
                                    <div className={cx('video-time')}>
                                        <span>
                                            {`00:00 00:${
                                                isNaN(videoRef.current?.duration)
                                                    ? '00'
                                                    : videoRef.current?.duration.toFixed(0) ?? '00'
                                            } ${
                                                isNaN(videoRef.current?.duration)
                                                    ? '00'
                                                    : videoRef.current?.duration.toFixed(0) ?? '00'
                                            }s
                                        `}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('btn-edit')}>
                                <Button primary leftIcon={<CutIcon />} className={cx('edit')}>
                                    <span>Edit video</span>
                                </Button>
                            </div>
                        </div>
                        <div className={cx('split-card')}>
                            <div className={cx('split-body')}>
                                <span>Split into multiple parts to get more exposure</span>
                                <div className={cx('split-increment')}>
                                    <div className={cx('icon-minus')}>
                                        <span>
                                            <DecreaseIcon />
                                        </span>
                                    </div>
                                    <div className={cx('split-num')}>
                                        <span>2</span>
                                    </div>
                                    <div className={cx('icon-plus')}>
                                        <span>
                                            <IncreaseIcon />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('btn-split')}>
                                <Button leftIcon={<SplitIcon />} custom className={cx('split-custom')}>
                                    Split
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('upload-container-v2')}>
                        <div className={cx('detail-upload')}>
                            <h1>Upload video</h1>
                            <h2>Post a video to your account</h2>
                            <div className={cx('content')}>
                                <div className={cx('mobile-frame')}>
                                    <img src={images.mobileFrame} alt="" className={cx('frame')} />
                                    <div className={cx('meta-data')}>
                                        <div className={cx('nickname')}>@duykhang1301</div>
                                        <div className={cx('name-video')}>{nameSlice.join('')}</div>
                                        <div className={cx('music')}>
                                            <HashTagMusicIcon />
                                            <div className={cx('music-running')}>
                                                <span>Orginal sound - duykhang1301</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('control')}>
                                        <img src={images.control} alt="" className={cx('img-control')} />
                                    </div>
                                    <div className={cx('header-item')}>
                                        <img src={images.live} alt="" />
                                        <span>Following</span>
                                        <span className={cx('boder-bot')}>For You</span>
                                        <img src={images.search} alt="" />
                                    </div>
                                    <div className={cx('icon-frame')}>
                                        <Image src="" className={cx('avatar')} />
                                        <img src={images.iconFrame} alt="" />
                                        <div src="" className={cx('avatar-rotate-container')}>
                                            <Image src="" className={cx('avatar-rotate')} />
                                        </div>
                                    </div>
                                    <video src={srcVideo} muted loop className={cx('video-preview')} ref={videoRef} />
                                </div>
                                <div className={cx('form')}>
                                    <div className={cx('caption')}>
                                        <span className={cx('title-caption')}>Caption</span>
                                        <span className={cx('count-char')}>{`${caption.length}/150`}</span>
                                    </div>

                                    <div className={cx('caption-content')}>
                                        <input
                                            type="text"
                                            className={cx('input-caption')}
                                            onChange={(e) => setCaption(e.target.value)}
                                            defaultValue={caption}
                                            ref={captionRef}
                                        />
                                        <img src={images.email} className={cx('email')} alt="" />
                                        <img src={images.hastag} className={cx('hastag')} alt="" />
                                    </div>

                                    <div className={cx('thumbnail')}>
                                        <span>Cover</span>
                                        <div className={cx('thumb-image')}>
                                            <div className={cx('img-container')}>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={thumbnailRef.current?.duration.toFixed(0)}
                                                    step="1"
                                                    className={cx('time-snapshot')}
                                                    ref={snapshotRef}
                                                    onInput={handleTranslate}
                                                />

                                                <div className={cx('image-dragbox')} ref={translateRef}>
                                                    <div className={cx('video-snapshot')}>
                                                        <video src={srcVideo} ref={thumbnailRef} />
                                                    </div>
                                                </div>

                                                <div className={cx('mask-container')}></div>
                                                {[...Array(8)].map((res, index) => (
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
                                                {snapshots.map((res, index) => (
                                                    <div className={cx('snapshot-container')} key={index}>
                                                        <img src={res} alt="" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('permisson')}>
                                        <span>Who can watch this video</span>
                                        <div className={cx('select-container')}>
                                            <div className={cx('select')} onClick={handlePermission}>
                                                <span> {permissionViewer}</span>
                                                <div
                                                    className={cx('icon', { activeIcon: !isSelected })}
                                                    onClick={handlePermission}
                                                >
                                                    <BottomArrowIcon />
                                                </div>
                                            </div>
                                            <div
                                                className={cx('select-item', { selected: !isSelected })}
                                                ref={selectRef}
                                                onClick={handleOnClickOutSide}
                                            >
                                                <div
                                                    className={cx('item', {
                                                        activeItem: permissionViewer === 'Public',
                                                    })}
                                                    onClick={handleInnerText}
                                                >
                                                    <span>Public</span>
                                                </div>
                                                <div
                                                    className={cx('item', {
                                                        activeItem: permissionViewer === 'Friends',
                                                    })}
                                                    onClick={handleInnerText}
                                                >
                                                    <span>Friends</span>
                                                </div>
                                                <div
                                                    className={cx('item', {
                                                        activeItem: permissionViewer === 'Private',
                                                    })}
                                                    onClick={handleInnerText}
                                                >
                                                    <span>Private</span>
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
                                                Note: Results of copyright checks aren't final. For instance, future
                                                changes of the copyright holder's authorization to the sound may impact
                                                your video may impact your video.
                                            </p>
                                            <span>Learn more</span>
                                        </div>

                                        <div className={cx('button')}>
                                            <Button custom className={cx('btn-discard')}>
                                                Discard
                                            </Button>
                                            <Button primary className={cx('btn-post')} onClick={() => upLoadVideo()}>
                                                Post
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
        </div>
    );
}

export default Upload;
