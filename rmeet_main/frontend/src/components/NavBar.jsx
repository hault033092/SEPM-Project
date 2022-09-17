import { React, useState } from "react";
import styled from "styled-components";
import SideLogo from "../components/SideLogo";
import Image from "../components/Image";
import BurgerIcon from "../lib/img/icon/burger-icon.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	const [expandedNavbar, setExpandedNavbar] = useState("false");

	const toggleMobileNav = () => {
		setExpandedNavbar(!expandedNavbar);
	};

	return (
		<Navbar className={expandedNavbar ? "expanded-navbar" : "hidden-navbar"}>
			<MobileHeader>
				<MenuButton onClick={toggleMobileNav}>
					<Image
						src={BurgerIcon}
						ALT='Menu Icon'
						style={{
							width: "2.5rem",
							height: "2.5rem",
							padding: "0",
						}}
					/>
				</MenuButton>
				<LogoContainer>
					<SideLogo width='2rem' height='2.4rem' />
					<AppName>Rmeet</AppName>
				</LogoContainer>
			</MobileHeader>
			<NavbarWrapper
				className={expandedNavbar ? "expanded-navbar" : "hidden-navbar"}>
				<NavbarItems
					onClick={() => {
						setExpandedNavbar(!expandedNavbar);
					}}
					to='/'>
					Home
				</NavbarItems>
				<NavbarItems
					onClick={() => {
						setExpandedNavbar(!expandedNavbar);
					}}
					to='/board'>
					Board
				</NavbarItems>
				<NavbarItems
					onClick={() => {
						setExpandedNavbar(!expandedNavbar);
					}}
					to='/course'>
					Course
				</NavbarItems>
				<NavbarItems
					onClick={() => {
						setExpandedNavbar(!expandedNavbar);
					}}
					to='/message'>
					Message
				</NavbarItems>
				<NavbarItems
					onClick={() => {
						setExpandedNavbar(!expandedNavbar);
					}}
					to={`/my-profile/${window.sessionStorage.getItem("uid")}`}>
					Account
				</NavbarItems>
			</NavbarWrapper>
		</Navbar>
	);
};

const Navbar = styled.nav`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 15rem;
	padding: 3rem 3rem;
	border-left: 5px solid black;
	border-right: 5px solid black;

	@media screen and (max-width: 1199px) {
		width: 100%;
		background-color: #ffffff;
		padding: 0;
		border: none;

		&.expanded-navbar {
			position: absolute;
			z-index: 1;
		}

		&.hidden-navbar {
			position: absolute;
		}
	}
`;

const MobileHeader = styled.div`
    display: flex;

    @media screen and (max-width: 1199px) {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
`;

const MenuButton = styled.button`
	display: none;
	border: none;
	background-color: transparent;

	@media screen and (max-width: 1199px) {
		display: block;
		padding: 2rem 0;
	}
`;

const NavbarWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.3s ease-in-out;

	@media screen and (max-width: 1199px) {
		&.expanded-navbar {
			width: 100%;
			position: absolute;
			left: 0;
			justify-content: center;
			background-color: #ffffff;
			padding: 0 1rem;
		}

		&.hidden-navbar {
			display: none;
		}
	}
`;

const LogoContainer = styled.div`
	width: 10rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
	text-decoration: none;
	color: #000000;

	@media screen and (max-width: 1199px) {
		margin: 0;
	}
`;

const AppName = styled.p`
	font-size: 2.2rem;
	text-transform: uppercase;
	font-weight: 700;
`;

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

  @media screen and (max-width: 1199px) {
    &:last-child {
      margin: 0.6rem 0;
    }
  }
`;

export default NavBar;
