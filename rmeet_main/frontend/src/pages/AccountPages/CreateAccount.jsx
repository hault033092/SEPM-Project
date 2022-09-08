import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import qs from "qs";

/* Components */
import Button from "../../components/Button";
import ProfileImg from "../../components/ProfileImg";
import { FlexContainer } from "../../components/FlexContainer";
import Input from "../../components/Input";
import CenterModal from "../../components/CenterModal";

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

const VerificationWrapper = styled(FlexContainer)`
	margin: 10% 0;
	height: 1vw;
	@media (max-width: 400px) {
		margin: 25% 0;
	}
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

const CreateAccount = ({ studentEmail, setIsSpinner }) => {
	const email = useRef(studentEmail);
	const [pfImg, setPfImg] = useState("");
	const [username, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [isModalShow, setIsModalShow] = useState(false);

	const navigation = useNavigate();

	useEffect(() => {
		setIsValid(username && pwd && pwdConfirm && !errorMessage);
	}, [username, pwd, pwdConfirm, errorMessage]);

	const registerUser = async userInfo => {
		const client = axios.create({
			baseURL: "http://localhost:8080/api/user/register",
		});

		setIsSpinner(true);
		try {
			let response = await client
				.post("", userInfo)
				.then(response => {
					setIsModalShow(true);
				})
				.catch(error => {
					setErrorMessage(error.response.data);
				})
				.finally(() => {
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}
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

	const _handleUploadPic = async e => {
		try {
			const reader = new FileReader();
			const selectedFile = e.target.files[0];
			reader.readAsDataURL(selectedFile);
			reader.onloadend = () => {
				getImgLink(reader.result, selectedFile);
			};
			reader.onerror = () => {
				setErrorMessage("Fail to upload file on the DB!");
			};
		} catch (error) {
			console.error(error);
		}
	};

	const getImgLink = async (imgData, theFile) => {
		console.log(imgData);
		try {
			const config = {
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					"auth-token":
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzAzMzkwMjY1MDBhZWJjZTFkOTlmOTMiLCJpYXQiOjE2NjE1MzA2NDh9.brEWTDLemp8ctjTcxZBW3uLTICgMvFVdUx-9yNdgFHI",
				},
			};
			let fd = new FormData();
			fd.append("picture", theFile);
			return axios
				.post("http://localhost:8080/api/userProfile/uploadPicture", fd, config)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
					// setErrorMessage(error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form>
			<FlexContainer>
				<ProfileImg src={pfImg} onUploadPhoto={_handleUploadPic} isShowButton />
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
						onKeyPress={_handleSubmit}
						isRequired
						isPassword
					/>
					<VerificationWrapper>
						{!isValid && (
							<ValidationMessage color='#E60028'>
								{errorMessage}
							</ValidationMessage>
						)}
					</VerificationWrapper>
					<Button
						title={"Create new account"}
						onClick={_handleSubmit}
						disabled={!isValid}
						hiddenHoverStyle={true}
					/>
				</SubWrapper>
			</InputWrapper>
			<CenterModal
				header='Your sign up was successful.'
				desc='Congratulations, your account has been successfully created.'
				BtnName='Sign in'
				BtnOnClick={() => {
					navigation("/");
				}}
				isModalShow={isModalShow}
				onHide={() => {}}
			/>
		</form>
	);
};

export default CreateAccount;
