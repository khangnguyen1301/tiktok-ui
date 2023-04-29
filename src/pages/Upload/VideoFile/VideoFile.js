import PropTypes from 'prop-types';
import { useState, useRef, useContext, useEffect } from 'react';

import classNames from 'classnames/bind';

import styles from './VideoFile.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';

const cx = classNames.bind(styles);

const defaultFunc = () => {};

function VideoFile({
    onChangeFile = defaultFunc,
    onChangeSrcVideo,
    onDetailUpload = defaultFunc,
    onNameSlice = defaultFunc,
    className,
}) {
    const [dragActive, setDragActive] = useState(false);

    const inputRef = useRef();

    const { isChangeFile, handleChangeFile, handleDiscardFile } = useContext(ModalEnviroment);

    useEffect(() => {
        if (isChangeFile) {
            inputRef.current.value = '';
        }
    }, [isChangeFile]);

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
            onChangeFile(e.dataTransfer.files[0]);
            onChangeSrcVideo(URL.createObjectURL(e.dataTransfer.files[0]));
            onDetailUpload(true);
            handleChangeFile(false);
            handleDiscardFile(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        onChangeFile(selectedFile);
        onChangeSrcVideo(URL.createObjectURL(selectedFile));
        onDetailUpload(true);
        handleChangeFile(false);
        handleDiscardFile(false);
        if (isChangeFile) {
            onNameSlice();
        }
    };

    const handleUploadFile = () => {
        inputRef.current.click();
    };

    return (
        <div className={cx('upload-container', { [className]: className })}>
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
    );
}

VideoFile.propTypes = {
    onChangeFile: PropTypes.func,
    onChangeSrcVideo: PropTypes.func,
    onDetailUpload: PropTypes.func,
    onNameSlice: PropTypes.func,
    className: PropTypes.string,
};

export default VideoFile;
