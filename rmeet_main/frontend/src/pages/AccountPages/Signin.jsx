import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CurrentUserContext } from "../../contexts/CurrentUser";

/* Components */
import { Input, ValidationMessage, Button } from "../../components";
import AccPageTemplate from "../../components/AccPageTemplate";
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

const StyledForm = styled.form`
	width: 100%;
`;

/* Data */
const failLoginMsg = "Please check your email and password and try again.";

const client = axios.create({
	baseURL: "http://localhost:8080/api/user/login",
});

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	const { setCurrentUser } = useContext(CurrentUserContext);

	const navigation = useNavigate();

	useEffect(() => {
		setIsValid(email && password && !errorMessage);
	}, [email, password, errorMessage]);

	const login = async user => {
		try {
			let response = await client
				.post("", user)
				.then(response => {
					const currentUser = {
						token: response.data,
					};
					setCurrentUser(currentUser);
				})
				.catch(function (error) {
					setErrorMessage(error.response.data);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const _handleEmailChange = e => {
		const refinedEmail = removeWhitespace(e.target.value);
		setErrorMessage("");
		setEmail(refinedEmail);
		setErrorMessage(
			validateStudentEmail(refinedEmail) ? "" : "Please verify your email"
		);
	};

	const _handlePasswordChange = e => {
		setErrorMessage("");
		setPassword(removeWhitespace(e.target.value));
	};

	const _handleSubmit = () => {
		const user = {
			email,
			password,
		};

		login(user);
	};

	const _handleSignUp = e => {
		navigation("/signup");
	};

	return (
		<AccPageTemplate pageTitle='Sign In'>
			<StyledForm>
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
				<ValidationMessage message={errorMessage} />
				<Button
					title={"Log in"}
					onClick={_handleSubmit}
					disabled={!isValid}
					hiddenHoverStyle={true}
				/>
			</StyledForm>
			<StyledText onClick={_handleSignUp}>create new account</StyledText>
		</AccPageTemplate>
	);
};

export default Signin;
