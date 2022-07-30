import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import OtpInput from "react-otp-input";
import {
	Input,
	ValidationMessage,
	Button,
	FlexContainer,
} from "../../components";
import {
	validateStudentEmail,
	removeWhitespace,
	generateRandomNum,
} from "../../util/accountValidation";

const LabelContainer = styled(FlexContainer)`
	width: 100%;
	height: auto;
	margin: 2vh 0;
	padding: 0 10px;
	justify-content: flex-start;
	align-items: flex-start;
`;

const WrapperCont = styled(FlexContainer)`
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	margin: 10% 0;
`;

const StyledText = styled.p`
	width: 100%;
	color: ${props => props.theme.fontColorWhite};
	font-size: 1.2vw;
	font-weight: 600;
`;

const InputStyle = {
	width: "2.5vw",
	height: "4vw",
	marginLeft: "1vw",
	padding: "3%",
	fontSize: "2vw",
};

const Verification = ({ setConfirmedEmail }) => {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [codeErrorMessage, setCodeErrorMessage] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [isValidCodeInput, setIsValidCodeInput] = useState(false);
	const [isSuccessSendEmail, setIsSuccessSendEmail] = useState(false);
	const [disabledCodeInput, setDisabledCodeInput] = useState(true);

	const sysCode = useRef(null);

	useEffect(() => {
		setIsValidEmail(email && !emailErrorMessage);
	}, [email, emailErrorMessage]);

	useEffect(() => {
		setIsValidCodeInput(code && !codeErrorMessage);
	}, [code, codeErrorMessage]);

	const _handleEmailChange = e => {
		const refinedEmail = removeWhitespace(e.target.value);
		setEmail(refinedEmail);
		setEmailErrorMessage(
			validateStudentEmail(refinedEmail) ? "" : "Please verify your email"
		);
	};

	const _handleCodeChange = e => {
		if (codeErrorMessage.length > 0) {
			setCodeErrorMessage("");
		}
		setCode(e);
	};

	const _sendCode = e => {
		// create code
		sysCode.current = generateRandomNum(100000, 999999);

		// send code
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
				setIsSuccessSendEmail(true);
			})
			.catch(error => console.log("Fail to send code", error));

		setDisabledCodeInput(false);
	};

	const _handleSubmit = e => {
		if (sysCode.current === code) {
			setConfirmedEmail(email);
			return;
		}

		setIsValidCodeInput(false);
		setCodeErrorMessage("Invalid code. Please try again.");
		setCode("");
	};

	return (
		<>
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
			<WrapperCont>
				<LabelContainer>
					<StyledText>Verification code:</StyledText>
				</LabelContainer>
				<OtpInput
					value={code}
					onChange={_handleCodeChange}
					numInputs={6}
					separator={<span></span>}
					isDisabled={disabledCodeInput}
					inputStyle={InputStyle}
				/>
				{!isValidCodeInput && <ValidationMessage message={codeErrorMessage} />}
				<Button
					title={"Verify"}
					onClick={_handleSubmit}
					disabled={!isValidCodeInput}
				/>
			</WrapperCont>
		</>
	);
};

export default Verification;
