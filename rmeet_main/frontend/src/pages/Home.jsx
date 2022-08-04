import React from "react"
import styled from "styled-components"
import Logo from "../components/Logo"
import Clock from "../components/Clock"
import LiveDate from "../components/LiveDate"
import Image from "../components/Image"

import Dashboard from "../images/study.png"
import OES from "../images/online-course.png"
import Allocate from "../images/allocate.png"
import Board from "../images/conversation.png"

const Home = () => {
    return (
        <HomeContainer>
            <HomeContent>
                <Logo width="8rem" height="8rem"/>
                <Heading>Greetings RMIT student, today is:</Heading>
                <DateTimeContainer>
                    <LiveDate />
                    <Clock />
                </DateTimeContainer>
            </HomeContent>
            <RedirectContent>
                <CircleImage href="https://www.rmit.edu.vn/students/my-studies/canvas-study-portal" target="_blank">
                    <Image src={Dashboard} ALT="dashboard" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>Dashboard</Label>
                </CircleImage>
                <CircleImage href="https://oes.rmit.edu.vn/login" target="_blank">
                    <Image src={OES} ALT="OES" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>OES</Label>
                </CircleImage>
                <CircleImage href="https://www.rmit.edu.vn/students/my-studies/class-timetables" target="_blank">
                    <Image src={Allocate} ALT="Allocate+" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>Allocate+</Label>
                </CircleImage>
                <CircleImage href="">
                    <Image src={Board} ALT="Board" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>Board</Label>
                </CircleImage>
            </RedirectContent>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 1.5rem 0;
`

const HomeContent = styled.div`
    height: 75%;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`

const RedirectContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto 0 0 0;
`

const DateTimeContainer = styled.div`
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    color: black;
    font-weight: 900;
`

const CircleImage = styled.a`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    color: black;
    transition: 0.4s ease-in-out;

    &:hover {
        transform: scale(1.2, 1.2);

    }
`

const Label = styled.h3`
    font-size: 1.2rem;
    color: black;
`

export default Home;