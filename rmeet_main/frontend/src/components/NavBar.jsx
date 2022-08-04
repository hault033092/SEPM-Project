import React from "react"
import styled from "styled-components"
import SideLogo from "../components/SideLogo"
import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <Navbar>
      <LogoContainer>
        <SideLogo width='2rem' height='2.4rem'/>
        <AppName>Rmeet</AppName>
      </LogoContainer>
      <NavbarItems to="/">Home</NavbarItems>
      <NavbarItems to="/timetable">Timetable</NavbarItems>
      <NavbarItems to="/course">Course</NavbarItems>
      <NavbarItems to="/message">Message</NavbarItems>
      <NavbarItems to="/account">Account</NavbarItems>
    </Navbar>
  )
}

const LogoContainer = styled.div`
  width: 10rem; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #000000;
  `

const AppName = styled.p`
  font-size: 2.2rem;
  text-transform: uppercase;
  font-weight: 700;
`

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 15rem;
  padding: 3rem 3rem;
  border-left: 5px solid black;
  border-right: 5px solid black;
`

const NavbarItems = styled(NavLink)`
  width: 10rem; 
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  padding: 1rem 1rem;
  margin: 0.6rem 0;
  border: none;
  border-radius: 1.4rem;
  color: #000054;
  background-color: #00005465;
  transition: 0.25s ease-in-out;
  }

  &:hover, &:last-child:hover {
    opacity: 0.75;
  }

  &:last-child {
    margin-top: auto;
    background-color: red;
    color: white;
    margin-bottom: 0;
  }

  &.active, &:last-child.active {
    background-color: #000054;
    color: #FFFFFF;
  }
`

export default NavBar;
