import React from "react"
import styled from "styled-components"

const LiveDate = () => {
    const d = new Date()

    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    
    const day = weekDays[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

    return (
        <DateContainer>
            <DateContent>
                <Display>
                    <DateElement>{day}</DateElement>
                    <DateElement>{date}</DateElement>
                    <DateElement>{month}</DateElement>
                    <DateElement>{year}</DateElement>
                </Display>
            </DateContent>
        </DateContainer>
    )
}

const DateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Orbitron", sans-serif;
`

const DateContent = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    color: #FFFFFF;
    font-size: 1rem;
`

const Display = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`

const DateElement = styled.h2`
    cursor: pointer;
    transition: 0.5s ease-in-out;
    height: 6rem;
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.4rem solid #FFFFFF;
    border-radius: 2rem;
    background-color: #000054;
    margin: 0 1rem;

    &:hover {
        transform: translateY(-1rem);
        box-shadow: 0 0 0.5rem 0.5rem rgba(0,0,0,0.5);
    }

    &:nth-child(3):hover,
    &:nth-child(4):hover {
        transform: translateY(1rem);
    } 
`

export default LiveDate;