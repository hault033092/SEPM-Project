import React from "react"
import styled from "styled-components"
import Clock from "../components/Clock"
import LiveDate from "../components/LiveDate"
import Image from "../components/Image"

import Canvas from "../lib/img/study.png"
import OES from "../lib/img/online-course.png"
import Allocate from "../lib/img/allocate.png"
import Library from "../lib/img/library.png"
import MainLogoSrc from "../lib/img/logo.svg";

const Home = () => {
    return (
        <HomeContainer>
            <HomeContent>
                <LogoWrapper>
                <Image
					src={MainLogoSrc}
					alt={"RMEET main logo image"}
					style={{
						width: "8rem",
						height: "8rem",
					}}
				/>
                </LogoWrapper>
                <Heading>Greetings RMIT student, today is:</Heading>
                <DateTimeContainer>
                    <LiveDate />
                    <Clock />
                </DateTimeContainer>
            </HomeContent>
            <RedirectContent>
                <CircleImage href="https://www.rmit.edu.vn/students/my-studies/canvas-study-portal" target="_blank">
                    <Image src={Canvas} ALT="Canvas" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>Canvas</Label>
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
                <CircleImage href="https://www.rmit.edu.vn/libraryvn" target="_blank">
                    <Image src={Library} ALT="Library" style={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        padding: "0",
                        outline: "0.2rem solid black",
                    }}/>
                    <Label>Library</Label>
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

    @media screen and (max-width: 1199px) {
        position: absolute;
        justify-content: space-between;
        padding: 0;
    }
`

const HomeContent = styled.div`
    height: 75%;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    @media screen and (max-width: 1199px) {
        height: 80%;
        padding: 7rem 1rem 0 1rem;
    }
`

const RedirectContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto 0 0 0;

    @media screen and (max-width: 1199px) {
        margin: 0 auto;
    }
`

const LogoWrapper = styled.div`
    @media screen and (max-width: 1199px) {
        display: none;
    }
`

const DateTimeContainer = styled.div`
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media screen and (max-width: 1199px) {
        flex-direction: column;
    }
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    color: black;
    font-weight: 900;

    @media screen and (max-width: 1199px) {
        font-size: 1.6rem;
    }
`

const CircleImage = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    color: black;
    transition: 0.4s ease-in-out;

    &:hover {
        transform: scale(1.2, 1.2);
    }

    @media screen and (max-width: 1199px) {
        width: 3rem;
    }
`

const Label = styled.h3`
    font-size: 1.2rem;
    color: black;
`

export default Home;