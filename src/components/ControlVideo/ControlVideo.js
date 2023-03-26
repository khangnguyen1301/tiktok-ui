import classNames from 'classnames/bind';
import { useLayoutEffect, useRef, useState } from 'react';
import images from '~/assets/images';
import { VolumeIcon, VolumeMutedIcon } from '../Icons';
import styles from './ControlVideo.module.scss';

const cx = classNames.bind(styles);

function ControlVideo({ currentTime, duration, isMuted, handleMuted, isPlayed, handlePlayed, onPlayed }) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);
    const [durationSeconds, setDurationSeconds] = useState(0);

    const controlRef = useRef();
    const selectorRef = useRef();

    useLayoutEffect(() => {
        const [currentMinutes, currentSeconds] = calcTime(currentTime);
        const [durationMinutes, durationSeconds] = calcTime(duration);
        setMinutes(currentMinutes);
        setSeconds(currentSeconds);
        setDurationMinutes(durationMinutes);
        setDurationSeconds(durationSeconds);
        controlRef.current.value = currentSeconds;
        handleSelector();
    }, [currentTime, duration]);

    const calcTime = (time) => {
        let minutes = 0;
        let seconds = 0;
        if (time >= 60) {
            minutes = (time / 60)?.toFixed(0);
            seconds = (time % 60)?.toFixed(0);
        } else {
            seconds = time?.toFixed(0);
        }
        return [minutes, seconds];
    };

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
                        <span>
                            {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? '0' + seconds : seconds} / ${
                                durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes
                            }:${durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}`}
                        </span>
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
