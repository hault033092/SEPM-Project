import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUser";

/* Components */
import ValidationMessage from "../../components/ValidationMessage";
import Button from "../../components/Button";
import SelectBox from "../../components/SelectBox";
import ProfileImg from "../../components/ProfileImg";
import { FlexContainer } from "../../components/FlexContainer";
import Input from "../../components/Input";
import { removeWhitespace } from "../../util/accountValidation";

/* Styled Components */
const InputWrapper = styled(FlexContainer)`
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
`;

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

const client = axios.create({
	baseURL: "http://localhost:8080/api/user/register",
});

const CreateAccount = ({ studentEmail }) => {
	const email = useRef(studentEmail);

	const [profileImg, setProfileImg] = useState("");
	const [username, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	const { setCurrentUser } = useContext(CurrentUserContext);

	const navigation = useNavigate();

	useEffect(() => {
		setIsValid(username && pwd && pwdConfirm && !errorMessage);
	}, [username, pwd, pwdConfirm, errorMessage]);

	const registerUser = async userInfo => {
		try {
			let response = await client
				.post("", userInfo)
				.then(response => {
					const currentUser = {
						uid: response.data,
						token: "token!",
					};
					setCurrentUser(currentUser);
					navigation("/");
				})
				.catch(error => {
					setErrorMessage(error.response.data);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const _handleProfileImgChange = e => {
		const {
			target: { files },
		} = e;

		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = readDataCompleted => {
			const {
				currentTarget: { result },
			} = readDataCompleted;
			setProfileImg(result);
		};
		reader.readAsDataURL(theFile);
	};

	const _handleUsernameChange = e => {
		const refinedUsername = removeWhitespace(e.target.value);
		setErrorMessage("");
		setUserName(refinedUsername);
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

	const _handleSubmit = async e => {
		const accountInfo = {
			userName: username,
			email: email.current,
			password: pwd,
		};
		registerUser(accountInfo);
	};

	return (
		<>
			<FlexContainer>
				<ProfileImg
					src={profileImg}
					onChangePhoto={_handleProfileImgChange}
					isShowButton
				/>
			</FlexContainer>
			<InputWrapper>
				<SubWrapper>
					<Input
						label={"Student email"}
						value={email.current}
						maxLength={30}
						isDisabled
						isRequired
					/>
					<Input
						label={"Username"}
						value={username}
						placeholder={"Please enter your username"}
						maxLength={30}
						onChange={_handleUsernameChange}
						isRequired
					/>
					<StyledText>Username must be 6 - 255 characters</StyledText>

				</SubWrapper>
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
					{!isValid && <ValidationMessage message={errorMessage} />}

					<Button
						title={"Create new account"}
						onClick={_handleSubmit}
						disabled={!isValid}
						hiddenHoverStyle={true}
					/>
				</SubWrapper>
			</InputWrapper>
		</>
	);
};

export default CreateAccount;
