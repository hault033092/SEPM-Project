import React from 'react';
import {useState, useEffect} from 'react';
import './Clock.css';

const Clock = () => {
    //State
    const [time, setTime] = useState('');

    function formatTime(val) {
        if (val < 10) {
            return '0'
        } else {
            return '';
        }
    }

    //Set an interval for our clock tick function
    useEffect(() => {
        //Interval
        const timerID = setInterval(
            () => tick(), 1000)
        
        //Cleanup
        return function cleanup() {
            clearInterval(timerID)
        }
    })

    //Clock tick function
    function tick() {
        //Date variables
        const day = new Date();
        const hour = day.getHours();
        const minute = day.getMinutes();
        const second = day.getSeconds();

        //Set the State to the formatted time
        setTime(formatTime(hour) + hour + ':' + formatTime(minute) + minute + ':' + formatTime(second) + second);

    }

    return (
        <div className="clock">
            <div className="screen">
                <h1 className="time">{time}</h1>
            </div>
        </div>
    )
}

export default Clock;