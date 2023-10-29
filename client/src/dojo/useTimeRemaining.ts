import { useState, useEffect } from 'react';

const useTimeRemaining = (time_built?: number, GROW_TIME = 0) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    useEffect(() => {
        if (time_built) {
            const duration = Date.now() - (time_built * 1000);
            setTimeRemaining(GROW_TIME - duration);
        }
    }, [time_built, GROW_TIME]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeRemaining && timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1000);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timeRemaining]);

    const getTimeRemaining = () => {
        if (timeRemaining === null) return '';
        const minutes = Math.floor(timeRemaining / 60000);
        const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    };

    return { getTimeRemaining, timeRemaining };
};

export default useTimeRemaining;