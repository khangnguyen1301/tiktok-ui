import classNames from 'classnames/bind';

import { useEffect, useRef, useState, useContext } from 'react';

import { useSelector } from 'react-redux';

import * as upLoadService from '~/services/uploadService';

import styles from './Upload.module.scss';

import PermissionForm from './PermissionForm';

import MobileFrame from './MobileFrame';
import HeaderUpload from './HeaderUpload';
import Footer from './Footer';
import VideoFile from './VideoFile';
import images from '~/assets/images';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

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
    const [detailUpload, setDetailUpload] = useState(false);
    const [permissionVideo, setPermissionVideo] = useState(initialChecked);
    const [permissionViewer, setPermissionViewer] = useState('Public');
    const [miniSnapshotRef, setMiniSnapShotRef] = useState();

    const { showConFirmModal, isChangeFile } = useContext(ModalEnviroment);

    const thumbnailRef = useRef();

    const userInfo = useSelector((state) => state.auth.login?.currentUser) ?? {};

    const upLoadVideo = async () => {
        let formdata = new FormData();
        formdata.append('description', caption);
        formdata.append('upload_file', videoFile);
        formdata.append('thumbnail_time', thumbnailRef.current.currentTime.toFixed(0));
        formdata.append('music', `Orginal sound - ${userInfo.nickname}`);
        formdata.append('viewable', permissionViewer.toLowerCase());

        // eslint-disable-next-line array-callback-return
        Object.entries(permissionVideo).map((item) => {
            const [type, value] = item;
            if (value === true) {
                formdata.append('allows[]', type);
            }
        });
        // eslint-disable-next-line no-unused-vars
        const result = await upLoadService.upLoadVideo(formdata);
        window.location.reload();
    };

    useEffect(() => {
        if (nameSlice.length > 0) {
            setCaption(nameSlice.join(''));
        } else {
            handleCaption();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoFile, nameSlice]);

    const handleDefaultCaption = (cap) => {
        setCaption(cap);
    };

    const handleCaption = () => {
        const captionSlice = videoFile?.name;
        for (let index = 0; index < captionSlice?.length - 4; index++) {
            setNameSlice((prev) => [...prev, captionSlice[index]]);
        }
    };

    const handleListChecked = (list) => {
        setPermissionVideo(list);
    };

    const handlePermissionViewer = (permission) => {
        setPermissionViewer(permission);
    };

    const handleForwardRef = (ref) => {
        setMiniSnapShotRef(ref);
    };

    const handleSetSrcVideo = (src) => {
        setSrcVideo(src);
    };

    const handleSetVideoFile = (file) => {
        setVideoFile(file);
    };

    const handleDetailUpload = (state) => {
        setDetailUpload(state);
    };

    const handleNameSlice = () => {
        setNameSlice([]);
    };

    return (
        <div className={cx('wrapper')}>
            {!detailUpload ? (
                <div className={cx('video-file')}>
                    <VideoFile
                        onChangeFile={handleSetVideoFile}
                        onChangSrcVideo={handleSetSrcVideo}
                        onDetailUpload={handleDetailUpload}
                    />
                </div>
            ) : (
                <div className={cx('container')}>
                    {!isChangeFile && (
                        <HeaderUpload srcVideo={srcVideo} nameSlice={nameSlice} forwardSnapshotRef={handleForwardRef} />
                    )}
                    <div className={cx('upload-container-v2')}>
                        <div className={cx('detail-upload')}>
                            <h1>Upload video</h1>
                            <h2>Post a video to your account</h2>
                            <div className={cx('content')}>
                                <div className={cx('frame')}>
                                    {!isChangeFile ? (
                                        <MobileFrame userInfo={userInfo} nameSlice={nameSlice} srcVideo={srcVideo} />
                                    ) : (
                                        <VideoFile
                                            onChangeFile={handleSetVideoFile}
                                            onChangSrcVideo={handleSetSrcVideo}
                                            onDetailUpload={handleDetailUpload}
                                            onNameSlice={handleNameSlice}
                                            className={cx('custom')}
                                        />
                                    )}
                                </div>
                                {/* form */}
                                <PermissionForm
                                    thumbnailRef={thumbnailRef}
                                    miniSnapshotRef={miniSnapshotRef}
                                    srcVideo={srcVideo}
                                    nameSliced={caption}
                                    initialList={permissionVideo}
                                    upLoadVideo={upLoadVideo}
                                    onPermission={handlePermissionViewer}
                                    onListChecked={handleListChecked}
                                    onCaption={handleDefaultCaption}
                                />
                            </div>
                            {!isChangeFile && (
                                <div className={cx('change-file')}>
                                    <img src={images.fileCheck} alt="" />
                                    <span title={videoFile.name} className={cx('file-name')}>
                                        {videoFile.name}
                                    </span>
                                    <span className={cx('change-video')} onClick={showConFirmModal}>
                                        Change video
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Upload;
