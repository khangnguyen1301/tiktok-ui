import { useEffect, useState } from 'react';

function useCalculator(value) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const [minutes, seconds] = calcTime(value);
        setMinutes(minutes);
        setSeconds(seconds);
    }, [value]);

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

    return [minutes, seconds];
}

export default useCalculator;
