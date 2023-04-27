import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderUpload.module.scss';

import Button from '~/components/Button';
import { CutIcon, DecreaseIcon, IncreaseIcon, SplitIcon } from '~/components/Icons';
import { ModalEnviroment } from '~/context/ModalContext/ModalContext';
import { useCalculator } from '~/hooks';

const cx = classNames.bind(styles);

function HeaderUpload({ srcVideo, nameSlice, forwardSnapshotRef }) {
    const [loadedData, setLoadedData] = useState(false);
    const [durationTime, setDurationTime] = useState(0);

    const { isChangeFile } = useContext(ModalEnviroment);

    const miniSnapshotRef = useRef();
    const [durationMinutes, durationSeconds] = useCalculator(durationTime);

    useLayoutEffect(() => {
        if (loadedData || isChangeFile) {
            forwardSnapshotRef(miniSnapshotRef);
            setDurationTime(miniSnapshotRef.current.duration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedData, isChangeFile]);

    return (
        <div className={cx('header-upload')}>
            <div className={cx('edit-video')}>
                <div className={cx('video-edit-card')}>
                    <div className={cx('video-index')}>
                        <span>1</span>
                    </div>

                    <div className={cx('video-cover')}>
                        <video src={srcVideo} ref={miniSnapshotRef} onLoadedMetadata={() => setLoadedData(true)} />
                    </div>

                    <div className={cx('video-info')}>
                        <div className={cx('video-name')}>
                            <span>{nameSlice.join('')}</span>
                        </div>
                        <div className={cx('video-time')}>
                            <span>{'00:00'}</span>
                            <span>
                                {`${durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes}:${
                                    durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
                                }`}
                            </span>
                            {durationTime > 60 ? (
                                <span>
                                    {`${durationMinutes < 10 ? `${durationMinutes}m` : durationMinutes}${
                                        durationSeconds < 10 ? `${durationSeconds}s` : durationSeconds
                                    }`}
                                </span>
                            ) : (
                                <span>{`${durationSeconds}s`}</span>
                            )}
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
    );
}

export default HeaderUpload;
