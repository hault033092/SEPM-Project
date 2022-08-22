import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Components */
import { Input, ValidationMessage, Button } from "../../components";
import AccPageTemplate from "../../components/TemplateCmp/AccPageTemplate";
import {
	validateStudentEmail,
	removeWhitespace,
} from "../../util/accountValidation";

/* Styled Components */

const StyledText = styled.p`
	color: #ffffff;
	font-size: 1vw;
	text-decoration: underline;
	padding-top: 5%;
	cursor: pointer;
`;

/* Data */
const failLoginMsg = "Please check your email and password and try again.";

const client = axios.create({
	baseURL: "https://localhost:8080",
});

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	const navigation = useNavigate();

	useEffect(() => {
		if (errorMessage === failLoginMsg) {
			setErrorMessage("");
		}
	}, [email, password]);

	useEffect(() => {
		setIsValid(email && password && !errorMessage);
	}, [email, password, errorMessage]);



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

	const _handleSubmit = () => {
		const user = {
			email,
			password,
		};

		const isLoginSuccess = true;
		if (isLoginSuccess) {
			console.log("navigate to homepage", "user info", user);
			return;
		}

		setErrorMessage(failLoginMsg);
		setIsValid(false);
	};

	const _handleSignUp = e => {
		navigation("/signup");
	};

	return (
		<AccPageTemplate pageTitle='Sign In'>
			<Input
				label={"Email"}
				value={email}
				placeholder={"Please enter your student email"}
				maxLength={30}
				onChange={_handleEmailChange}
			/>
			<Input
				label={"Password"}
				value={password}
				placeholder={"Please enter your password"}
				maxLength={30}
				onChange={_handlePasswordChange}
				onKeyPress={_handleSubmit}
				isPassword={true}
			/>
			{!isValid && <ValidationMessage message={errorMessage} />}
			<Button
				title={"Log in"}
				onClick={_handleSubmit}
				disabled={!isValid}
				hiddenHoverStyle={true}
			/>
			<StyledText onClick={_handleSignUp}>create new account</StyledText>
		</AccPageTemplate>
	);
};

export default Signin;
