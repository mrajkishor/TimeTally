import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const Timer = ({
    rowKey, updateContextSwitches, onReset, onUpdateDuration
}) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [transitionCount, setTransitionCount] = useState(0); // Track transitions


    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => {
                    const newSeconds = seconds + 1;
                    // Call onUpdateDuration with newSeconds
                    onUpdateDuration(rowKey, newSeconds);
                    return newSeconds;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds, rowKey, onUpdateDuration]);

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
        // Notify about the reset with the current seconds before resetting
        onReset(rowKey, seconds);
        setSeconds(0);
        setTransitionCount(0);
        // Also update the duration to 0 in the parent component
        onUpdateDuration(rowKey, 0);
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
