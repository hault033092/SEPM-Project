import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import OtpInput from "react-otp-input";
import { Input, ValidationMessage, Button, Logo, StyledContainer } from "../components";
import {
	validateStudentEmail,
	removeWhitespace,
	generateRandomNum,
} from "../util/accountValidation";



const LabelContainer = styled(StyledContainer)`
	width: 100%;
	height: auto;
	margin: 2vh 0;
	padding: 0 10px;
	justify-content: flex-start;
	align-items: flex-start;
`;

const SignupCont = styled(StyledContainer)`
	width: ${props => (props.screenWidth <= 900 ? "80%" : "800px")};
	padding: 3% 3%;
	margin-left: 10%;
	background-color: #000054;
	border-radius: 50px;
	flex-direction: column;
`;

const StyledTitle = styled.p`
	color: #ffffff;
	font-weight: 600;
	font-size: 3vw;
	margin: 2vw;
`;

const StyledText = styled.p`
	width: ${props => props.width};
	color: ${props => (props.color ? props.color : "#000")};
	font-size: ${props => props.fontSize};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : 0)};
`;

const Verification = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [codeErrorMessage, setCodeErrorMessage] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidCodeInput, setIsValidCodeInput] = useState(false);
	const [isSuccessSendEmail, setIsSuccessSendEmail] = useState(false);
	const [disabledCodeInput, setDisabledCodeInput] = useState(true);

	const sysCode = useRef(null);

	const generateCode = () => {
		sysCode.current = generateRandomNum(100000, 999999);
	};

	useEffect(() => {
		generateCode();
		window.addEventListener("resize", _handleWindowSizeChange);
		return () => {
			window.addEventListener("resize", _handleWindowSizeChange);
		};
	}, []);

	useEffect(() => {
		setIsValidEmail(email && !emailErrorMessage);
	}, [email, emailErrorMessage]);

	useEffect(() => {
		setIsValidCodeInput(code && !codeErrorMessage);
	}, [code, codeErrorMessage]);

	const _handleWindowSizeChange = () => {
		setScreenWidth(window.innerWidth);
	};

	const _handleEmailChange = e => {
		const refinedEmail = removeWhitespace(e.target.value);
		setEmail(refinedEmail);
		setEmailErrorMessage(
			validateStudentEmail(refinedEmail) ? "" : "Please verify your email"
		);
	};

	const _handleCodeChange = e => {
		setCode(e);
	};

	const _sendCode = e => {
		e.preventDefault();
		const serviceID = "default_service";
		const templateID = "template_6c8c2ja";
		const accPublicKey = "lwab-hOM-Z0QUdaDH";
		const content = {
			userEmail: email,
			code: sysCode.current,
		};

		emailjs
			.send(serviceID, templateID, content, accPublicKey)
			.then(res => {
				console.log(res);
				setIsSuccessSendEmail(true);
			})
			.catch(error => console.log(error));

		setDisabledCodeInput(false);
	};

	const _handleSubmit = e => {
		if (sysCode.current === code) {
			console.log("confirm valid code!");
			console.log("navigate to signup page!");
			return;
		}

		setIsValidCodeInput(false);
		setCodeErrorMessage("Invalid code. Please try again.");
		setCode("");
	};

	return (
		<StyledContainer
			direction={screenWidth <= 900 ? "column" : "row"}
			width='70vw'
			height='60vh'
			margin='20vh 15vw'>
			<StyledContainer
				direction={screenWidth <= 900 ? "row" : "column"}
				content={"space-between"}
				width={screenWidth <= 900 ? "80%" : "40%"}
				height={"30vh"}>
				<Logo width={"30vw"} height={"30vh"} />
				<StyledText fontSize='2vw'>
					RMEET is a private community for only RMIT students in Vietnam.
				</StyledText>
			</StyledContainer>
			<SignupCont screenWidth={screenWidth}>
				<StyledTitle>Verification</StyledTitle>
				<Input
					label={"Student email"}
					value={email}
					placeholder={"Please enter your student email"}
					maxLength={30}
					onChange={_handleEmailChange}
					onKeyPress={_sendCode}
				/>
				{!isValidEmail && <ValidationMessage message={emailErrorMessage} />}
				<Button
					title={"Send code"}
					onClick={_sendCode}
					disabled={!isValidEmail}
				/>
				{isSuccessSendEmail && (
					<ValidationMessage
						message={
							"We sent the email to your student email. Check your inbox to crate your account."
						}
						color='#005B09'
					/>
				)}
				<StyledContainer
					width='100%'
					direction='column'
					content='flex-start'
					margin='10% 0'>
					<LabelContainer>
						<StyledText
							fontSize='2vw'
							fontWeight='600'
							color='#fff'
							width='100%'>
							Verification code:
						</StyledText>
					</LabelContainer>
					<OtpInput
						value={code}
						onChange={_handleCodeChange}
						numInputs={6}
						separator={<span></span>}
						isDisabled={!isValidEmail}
					/>
					{!isValidCodeInput && (
						<ValidationMessage message={codeErrorMessage} />
					)}
					<Button
						title={"Verify"}
						onClick={_handleSubmit}
						disabled={!isValidCodeInput}
					/>
				</StyledContainer>
			</SignupCont>
		</StyledContainer>
	);
};

export default Verification;
