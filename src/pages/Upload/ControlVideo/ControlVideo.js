import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import images from '~/assets/images';
import { VolumeIcon, VolumeMutedIcon } from '~/components/Icons';
import styles from './ControlVideo.module.scss';
import { useCalculator } from '~/hooks';

const cx = classNames.bind(styles);

function ControlVideo({ currentTime, duration, isMuted, handleMuted, isPlayed, handlePlayed, onPlayed }) {
    const controlRef = useRef();
    const selectorRef = useRef();

    const [currentMinutes, currentSeconds] = useCalculator(currentTime);
    const [durationMinutes, durationSeconds] = useCalculator(duration);

    useEffect(() => {
        controlRef.current.value = currentTime;
        handleSelector();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, duration]);

    const handleSelector = () => {
        selectorRef.current.style.width = `${(controlRef.current.value / controlRef.current.max) * 100}%`;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <div className={cx('container')}>
                    <div className={cx('button')} onClick={handlePlayed}>
                        <img src={isPlayed ? images.pause : images.play} alt="" />
                    </div>

                    <div className={cx('time-video')}>
                        <div className={cx('current-time')}>
                            {`${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${
                                currentSeconds < 10 ? '0' + currentSeconds : currentSeconds
                            }`}
                        </div>
                        <div>{`/`}</div>
                        <div className={cx('duration-time')}>
                            {`${durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes}:${
                                durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
                            }`}
                        </div>
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('button')} onClick={handleMuted}>
                        {isMuted ? (
                            <VolumeMutedIcon width="1.6rem" height="1.6rem" />
                        ) : (
                            <VolumeIcon width="1.6rem" height="1.6rem" />
                        )}
                    </div>
                    <div className={cx('fullscreen')}>
                        <img src={images.fullscreen} alt="" />
                    </div>
                </div>
            </div>
            <div className={cx('progress-bar')}>
                <input
                    type="range"
                    min="0"
                    max={duration?.toFixed(0)}
                    step="1"
                    ref={controlRef}
                    onInput={handleSelector}
                    onChange={(e) => onPlayed(e.target.value)}
                />
                <div className={cx('selector')} ref={selectorRef}></div>
            </div>
        </div>
    );
}

export default ControlVideo;
