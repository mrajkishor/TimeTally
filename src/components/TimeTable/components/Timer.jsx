import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const Timer = ({
    rowKey, updateContextSwitches, onReset
}) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [transitionCount, setTransitionCount] = useState(0); // Track transitions


    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else if (!isActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggle = () => {

        if (!isActive) {
            // Transitioning from pause to start
            if (transitionCount % 2 === 0) { // This ensures we only count the start after a pause or initial start
                updateContextSwitches(rowKey);
            }
            setTransitionCount(transitionCount + 1); // Increment transitions on start
        } else {
            // Transitioning from start to pause
            setTransitionCount(transitionCount + 1); // Increment transitions on pause
        }

        setIsActive(!isActive);
        // // Update context switches only when starting or stopping the timer, not when resetting
        // if (seconds > 0) {
        //     updateContextSwitches(rowKey);
        // }


    };

    const reset = () => {
        setIsActive(false);
        setSeconds(0);
        setTransitionCount(0); // Reset transition count on reset
        onReset(rowKey); // Call the onReset function passed as prop

    };

    const formatTime = () => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            <span>{formatTime()}</span>
            <Button size="small" onClick={toggle} style={{ marginLeft: 8 }}>
                {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button size="small" onClick={reset} disabled={isActive} style={{ marginLeft: 8 }}>
                Reset
            </Button>
        </div>
    );
};

export default Timer;
