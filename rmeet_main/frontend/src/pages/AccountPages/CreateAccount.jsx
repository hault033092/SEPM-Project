import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

/* Components */
import {
	ValidationMessage,
	Button,
	SelectBox,
	ProfileImg,
	FlexContainer,
} from "../../components";
import Input from "../../components/Input";
import { majors } from "../../lib/data/data";
import { removeWhitespace } from "../../util/accountValidation";

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

const client = axios.create({
	baseURL: "https://localhost:8080/api/user/register",
});

const CreateAccount = ({ studentEmail }) => {
	const email = useRef(studentEmail);

	const [profileImg, setProfileImg] = useState("");
	const [username, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [major, setMajor] = useState(
		"Electronic and Computer Systems Engineering"
	);
	const [bio, setBio] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		setIsValid(username && pwd && pwdConfirm && major && !errorMessage);
	}, [username, pwd, pwdConfirm, major, errorMessage]);

	const registerUser = userInfo => {
		client
			.post("", userInfo)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("error: ", error);
			});
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
		setUserName(refinedUsername);
	};

	const _handlePwdChange = e => {
		const refinedPwd = removeWhitespace(e.target.value);
		setPwd(refinedPwd);
		setPwdConfirm("");
	};

	const _handlePwdConfirmChange = e => {
		const refinedPwdConfirm = removeWhitespace(e.target.value);
		setPwdConfirm(refinedPwdConfirm);
		setErrorMessage(
			pwd === refinedPwdConfirm ? "" : "Confirm password does not match."
		);
	};

	const _handleMajorChange = e => {
		setMajor(e.target.value);
	};

	const _handleBioChange = e => {
		setBio(e.target.value);
	};

	const _handleSubmit = async e => {
		const accountInfo = {
			email: email.current,
			password: pwd,
		};

		console.log(accountInfo)

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
					<Input
						label={"Password"}
						value={pwd}
						placeholder={"Please enter your password"}
						maxLength={20}
						onChange={_handlePwdChange}
						isRequired
						isPassword
					/>
					<Input
						label={"Password confirm"}
						value={pwdConfirm}
						placeholder={"Please confirm your password"}
						maxLength={20}
						onChange={_handlePwdConfirmChange}
						isRequired
						isPassword
					/>
				</SubWrapper>
				<SubWrapper>
					<SelectBox
						label={"Major"}
						value={major}
						groups={majors}
						onChange={_handleMajorChange}
						isGrouped
						style={{
							labelColor: "#ffffff",
						}}
					/>
					<Input
						label={"Bio"}
						value={bio}
						maxLength={256}
						onChange={_handleBioChange}
						onKeyPress={_handleSubmit}
						isMultipleLine
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
