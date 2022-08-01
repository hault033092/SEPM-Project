import React from 'react'
import {useState, useEffect} from 'react'
import styled from "styled-components"

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
        <Screen>
            <ClockDisplay>
                <Heading>{time}</Heading>
            </ClockDisplay>
        </Screen>
    )
}

const Screen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    width: clamp(18rem, 24rem, 36rem);
    height: clamp(8rem, 12rem, 16rem);
    border-radius: 2rem;
    border: 0.4rem solid #FFFFFF;
    background: linear-gradient(
        -45deg, #000054 0%,
        #000054 25%,
        #000054 50%,
        #000054 100%
    );

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 0.5rem 0.5rem rgba(0,0,0,0.5);
    }
`

const ClockDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: clamp(15rem, 20rem, 30rem);
    height: clamp(5rem, 8rem, 10rem);
    border-radius: 2rem;
    background: linear-gradient(
        -45deg, red 0%,
        red 25%,
        red 50%,
        red 100%
    );
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 3rem;
    font-weight: 500;
    color: white;
`

export default Clock;