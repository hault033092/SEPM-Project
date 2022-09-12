import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

/* Components */
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FlexContainer } from "../../components/FlexContainer";
import CenterModal from "../../components/CenterModal";

/* Styled Components */
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

const ValidationMessage = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 1vw;
	font-weight: 400;
	margin: 5px;
	color: ${props => props.color};
`;

/* Style */
const InputStyle = {
	width: "2.5vw",
	height: "4vw",
	marginLeft: "1vw",
	padding: "3%",
	fontSize: "2vw",
};

/* utility Function */
const removeWhitespace = text => {
	const regex = /\s/g;
	return text.replace(regex, "");
};

const generateRandomNum = (maxVal, minVal) => {
	return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal).toString();
};

const validateStudentEmail = email => {
	const regex = /^(\w+\d+)@rmit.edu.vn$/;
	return regex.test(email);
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
	const [isModalShow, setIsModalShow] = useState(false);

	const sysCode = useRef(null);
	const modalConfig = useRef({
		header: "",
		desc: "",
		btnName: "",
		onSubmit: () => {},
	});

	const navigation = useNavigate();
	const location = useLocation();

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

	const _handleSubmit = async e => {
		if (sysCode.current === code) {
			// valid code
			const res = await isRegisteredEmail().then(response => {
				// check whether an email has not been registered on the system yet
				if (response && location.state.mode === "forgotPassword") {
					navigation("/resetPassword", { state: { email } });
				} else if (!response && location.state.mode === "forgotPassword") {
					setIsModalShow(true);
					modalConfig.current = {
						header: "This email has not been registered yet.",
						desc: "Do you want to sign up on the system?",
						btnName: "Sign up",
						onSubmit: () => {
							setConfirmedEmail(email);
						},
					};
				} else if (response) {
					setIsModalShow(true);
					modalConfig.current = {
						header: "This email has already been registered.",
						desc: "Do you want to sign in to the system?",
						btnName: "Sign in",
						onSubmit: () => {
							navigation("/");
						},
					};
				} else {
					setConfirmedEmail(email);
				}
			});
		} else {
			// invalid code
			setIsValidCodeInput(false);
			setCodeErrorMessage("Invalid code. Please try again.");
			setCode("");
		}
	};

	const isRegisteredEmail = async () => {
		return true;
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
			{!isValidEmail && <ValidationMessage color="#E60028">{emailErrorMessage}</ValidationMessage> }
			<Button
				title={"Send code"}
				onClick={_sendCode}
				disabled={!isValidEmail}
				hiddenHoverStyle={true}
			/>
			{isSuccessSendEmail && (
				<ValidationMessage color='#7ad483'>We sent the email to your student email. Check your inbox to crate your account.</ValidationMessage>
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
				{!isValidCodeInput &&  <ValidationMessage color="#E60028">{codeErrorMessage}</ValidationMessage>}
				<Button
					title={"Verify"}
					onClick={_handleSubmit}
					disabled={!isValidCodeInput}
					hiddenHoverStyle={true}
				/>
			</WrapperCont>
			<CenterModal
				header={modalConfig.current.header}
				desc={modalConfig.current.desc}
				BtnName={modalConfig.current.btnName}
				BtnOnClick={modalConfig.current.onSubmit}
				isModalShow={isModalShow}
				onHide={() => setIsModalShow(false)}
			/>
		</>
	);
};

export default Verification;