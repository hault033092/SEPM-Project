import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Input, ErrorMessage, Button, Logo } from "../components";
import {
	validateStudentEmail,
	removeWhitespace,
} from "../util/accountValidation";

const StyledContainer = styled.div`
	display: flex;
	width: ${props => (props.width ? props.width : "auto")};
	height: ${props => (props.height ? props.height : "auto")};
	margin: ${props => (props.margin ? props.margin : "0")};
	padding: ${props => (props.padding ? props.padding : "auto")};
	flex-direction: ${props => (props.direction ? props.direction : "row")};
	justify-content: ${props => (props.content ? props.content : "center")};
	align-items: ${props => (props.items ? props.items : "center")};
`;

const LabelContainer = styled(StyledContainer)`
	width: 100%;
	height: auto;
	margin: 2vh 0;
	padding: 0 10px;
	justify-content: flex-start;
	align-items: flex-start;
`;

const SignupCont = styled(StyledContainer)`
	width: ${props => (props.screenWidth <= 900 ? "80%" : "60%")};
	padding: 5% 3%;
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

const CodeInputStyle = {
	width: "5vw",
	height: "8vw",
	padding: "15%",
	fontSize: "5vw",
};

const Verification = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [email, setEmail] = useState("");
	const [num1, setNum1] = useState("");
	const [num2, setNum2] = useState("");
	const [num3, setNum3] = useState("");
	const [num4, setNum4] = useState("");
	const [num5, setNum5] = useState("");
	const [num6, setNum6] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [codeErrorMessage, setCodeErrorMessage] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidCodeInput, setIsValidCodeInput] = useState(false);
	const [disabledCodeInput, setDisabledCodeInput] = useState(true);

	const sysCode = useRef(null);

	const generateCode = () => {
		sysCode.current = "111111";
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
		setIsValidCodeInput(
			num1 && num2 && num3 && num4 && num5 && num6 && !codeErrorMessage
		);
	}, [num1, num2, num3, num4, num5, num6, codeErrorMessage]);

	const isValidCode = () => {
		const userCode = num1 + num2 + num3 + num4 + num5 + num6;
		return sysCode.current === userCode;
	};

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

	const _sendCode = e => {
		console.log("send code! code:", sysCode);
		setDisabledCodeInput(false);
	};

	const _handleSubmit = e => {
		if (isValidCode()) {
			console.log("confirm valid code!");
			console.log("navigate to signup page!");
			return;
		}

		setIsValidCodeInput(false);
		setCodeErrorMessage("Invalid code. Please try again.");
		setNum1("");
		setNum2("");
		setNum3("");
		setNum4("");
		setNum5("");
		setNum6("");
	};

	return (
		<StyledContainer
			direction={screenWidth <= 900 ? "column-reverse" : "row"}
			width='90vw'
			height='90vh'
			margin='5vh 5vw'>
			<StyledContainer
				direction={screenWidth <= 900 ? "row" : "column"}
				content={"space-between"}
				width={screenWidth <= 900 ? "80%" : "40%"}
				height={"30vh"}>
				<Logo width={"30vw"} height={"30vh"} />
				<StyledText fontSize='3vw'>
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
				{!isValidEmail && <ErrorMessage message={emailErrorMessage} />}
				<Button
					title={"Send code"}
					onClick={_sendCode}
					disabled={!isValidEmail}
				/>
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
					<StyledContainer width='100%' direction='row' content='space-evenly'>
						<StyledContainer>
							<Input
								value={num1}
								maxLength={1}
								onChange={e => {
									setNum1(e.target.value);
								}}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
							<Input
								value={num2}
								maxLength={1}
								onChange={e => {
									setNum2(e.target.value);
								}}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
							<Input
								value={num3}
								maxLength={1}
								onChange={e => {
									setNum3(e.target.value);
								}}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
						</StyledContainer>
						<StyledContainer>
							<Input
								value={num4}
								maxLength={1}
								onChange={e => setNum4(e.target.value)}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
							<Input
								value={num5}
								maxLength={1}
								onChange={e => {
									setNum5(e.target.value);
								}}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
							<Input
								value={num6}
								maxLength={1}
								onChange={e => {
									setNum6(e.target.value);
								}}
								onKeyPress={_handleSubmit}
								isLabelHidden={true}
								style={CodeInputStyle}
								disabled={disabledCodeInput}
							/>
						</StyledContainer>
					</StyledContainer>
					{!isValidCodeInput && <ErrorMessage message={codeErrorMessage} />}
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
