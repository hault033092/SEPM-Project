import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

/* Components */
import Button from "../../components/Button";
import { FlexContainer } from "../../components/FlexContainer";
import Input from "../../components/Input";
import AccPageTemplate from "../../components/AccPageTemplate";
import CenterModal from "../../components/CenterModal";

/* Styled Components */
const SubWrapper = styled(FlexContainer)`
	width: 90%;
	margin: 0 5%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;

const StyledText = styled.p`
	font-size: 0.8vw;
	color: ${props => props.theme.fontColorWhite};
	margin: 0.5% 0 0.5% 0;
`;

const ValidationMessage = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 1vw;
	font-weight: 400;
	margin: 5px;
	color: ${props => props.color};
`;

/* utility Function */
const removeWhitespace = text => {
	const regex = /\s/g;
	return text.replace(regex, "");
};

/* Data */

const client = axios.create({
	baseURL: "http://localhost:8080/api/user/register",
});

const ResetPassword = () => {
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isModalShow, setIsModalShow] = useState(false);
	const [isSpinner, setIsSpinner] = useState(false);

	const navigation = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.state === null) {
			navigation("/"); // prevent reset password from invalid access
		}
	});

	useEffect(() => {
		setIsValid(pwd && pwdConfirm && !errorMessage);
	}, [pwd, pwdConfirm, errorMessage]);

	const resetPassword = async userInfo => {
		// setIsSpinner(true)
		// try {
		// 	let response = await client
		// 		.post("", userInfo)
		// 		.then(response => {
		// 			isModalShow(true);
		// 		})
		// 		.catch(error => {
		// 			console.error(error);
		// 		}).finally(()=>{
		// 			setIsSpinner(false);
		// });
		// } catch (error) {
		// 	console.error(error);
		// }
		// 	setIsSpinner(false)
		setIsModalShow(true);
	};

	const _handlePwdChange = e => {
		const refinedPwd = removeWhitespace(e.target.value);
		setErrorMessage("");
		setPwd(refinedPwd);
		setPwdConfirm("");
	};

	const _handlePwdConfirmChange = e => {
		const refinedPwdConfirm = removeWhitespace(e.target.value);
		setErrorMessage("");
		setPwdConfirm(refinedPwdConfirm);
		setErrorMessage(
			pwd === refinedPwdConfirm ? "" : "Confirm password does not match."
		);
	};

	const _handleSubmit = e => {
		const accountInfo = {
			email: location.state.email,
			password: pwd,
		};

		resetPassword(accountInfo);
	};

	return (
		<AccPageTemplate pageTitle='Reset Password' isSpinnerVisible={isSpinner}>
			<SubWrapper>
				<Input
					label={"Password"}
					value={pwd}
					placeholder={"Please enter your password"}
					maxLength={20}
					onChange={_handlePwdChange}
					isRequired
					isPassword
				/>
				<StyledText>Password must be 6 - 1024 characters</StyledText>
				<Input
					label={"Password confirm"}
					value={pwdConfirm}
					placeholder={"Please confirm your password"}
					maxLength={20}
					onChange={_handlePwdConfirmChange}
					isRequired
					isPassword
				/>
				{!isValid && <ValidationMessage color="#E60028">{errorMessage}</ValidationMessage>}

				<Button
					title={"Reset Password"}
					onClick={_handleSubmit}
					disabled={!isValid}
					hiddenHoverStyle={true}
				/>
			</SubWrapper>
			<CenterModal
				header='Successfully reset the password.'
				desc={`Return to the sign-in page`}
				BtnName='Sign in'
				BtnOnClick={() => {
					navigation("/");
				}}
				isModalShow={isModalShow}
				onHide={() => {}}
			/>
		</AccPageTemplate>
	);
};

export default ResetPassword;
