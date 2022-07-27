import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Input, ValidationMessage, Button, Image, Logo, StyledContainer } from "../components";
import {
	validateStudentEmail,
	removeWhitespace,
} from "../util/accountValidation";

const SigninCont = styled(StyledContainer)`
	width: ${props => (props.isMobile ? "80%" : "50%")};
	padding: 3%;
	margin-left: 3vw;
	background-color: #000054;
	border-radius: 50px;
	flex-direction: column;
`;

const StyledTitle = styled.p`
	color: #ffffff;
	font-weight: 800;
	font-size: 6vw;
	margin: 2vw;
`;

const StyledText = styled.p`
	color: #ffffff;
	font-size: 2vw;
	text-decoration: underline;
	padding-top: 5%;
`;

const Signin = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", _handleWindowSizeChange);
		return () => {
			window.addEventListener("resize", _handleWindowSizeChange);
		};
	}, []);

	useEffect(() => {
		setIsValid(email && password && !errorMessage);
	}, [email, password, errorMessage]);

	const _handleWindowSizeChange = () => {
		setScreenWidth(window.innerWidth);
	};

	const _handleEmailChange = e => {
		const refinedEmail = removeWhitespace(e.target.value);
		setEmail(refinedEmail);
		setErrorMessage(
			validateStudentEmail(refinedEmail) ? "" : "Please verify your email"
		);
	};

	const _handlePasswordChange = e => {
		setPassword(removeWhitespace(e.target.value));
	};

	const _handleSubmit = e => {
		console.log("submit!");
	};

	const _handleSignUp = e => {
		console.log("navigate to verification page!");
	};

	return (
		<StyledContainer
			width='90vw'
			height='90vh'
			margin='5vh 5vw'
			direction={screenWidth <= 900 ? "column" : "row"}>
			<SigninCont isMobile={screenWidth <= 900}>
				<StyledTitle>RMEET</StyledTitle>
				<Input
					label={"Email"}
					value={email}
					placeholder={"Please enter your student email"}
					maxLength={30}
					onChange={_handleEmailChange}
					width={"100%"}
				/>
				<Input
					label={"Password"}
					value={password}
					placeholder={"Please enter your password"}
					maxLength={30}
					onChange={_handlePasswordChange}
					onKeyPress={_handleSubmit}
					width={"100%"}
					isPassword={true}
				/>
				{!isValid && <ValidationMessage message={errorMessage} />}
				<Button title={"Log in"} onClick={_handleSubmit} disabled={!isValid} />
				<StyledText onClick={_handleSignUp}>create new account</StyledText>
			</SigninCont>
			<StyledContainer
				direction='column'
				content={"space-between"}
				width={screenWidth <= 900 ? "80%" : "50%"}>
				{screenWidth <= 900 || <Logo width={"30vw"} height={"30vh"} />}
				<StyledContainer direction={"row"} content={"space-around"}>
					<FontAwesomeIcon icon={solid("angle-left")} size='6x' />
					<Logo width={"30vw"} height={"30vh"} />
					<FontAwesomeIcon icon={solid("angle-right")} size='6x' />
				</StyledContainer>
			</StyledContainer>
		</StyledContainer>
	);
};

export default Signin;
