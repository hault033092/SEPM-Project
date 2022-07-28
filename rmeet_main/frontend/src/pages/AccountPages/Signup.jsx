import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
	Input,
	ValidationMessage,
	Button,
	Logo,
	SelectBox,
	ProfileImg,
	StyledContainer,
} from "../../components";
import { majors } from '../../lib/data/data';
import { removeWhitespace } from "../../util/accountValidation";


const SignupCont = styled(StyledContainer)`
	width: ${props => props.width};
	padding: 5%;
	margin-left: 3vw;
	background-color: #000054;
	border-radius: 50px;
	flex-direction: column;
	justify-content: flex-start;
`;

const StyledTitle = styled.p`
	color: #ffffff;
	font-weight: 600;
	font-size: 4vw;
	margin: 2vw;
`;

const StyledText = styled.p`
	width: ${props => props.width};
	color: ${props => (props.color ? props.color : "#000")};
	font-size: ${props => props.fontSize};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : 0)};
`;

const Signup = ({ studentEmail = "s3878170@rmit.edu.vn" }) => {
	const email = useRef(studentEmail);

	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [profileImg, setProfileImg] = useState("");
	const [username, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [major, setMajor] = useState("");
	const [Bio, setBio] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		window.addEventListener("resize", _handleWindowSizeChange);
		return () => {
			window.addEventListener("resize", _handleWindowSizeChange);
		};
	}, []);

	useEffect(() => {
		setIsValid(username && pwd && pwdConfirm && major && !errorMessage);
	}, [username, pwd, pwdConfirm, major, errorMessage]);

	const _handleWindowSizeChange = () => {
		setScreenWidth(window.innerWidth);
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

	const _handleSubmit = e => {
		console.log("navigate to homepage!");
	};

	return (
		<StyledContainer
			width={screenWidth <= 900 ? "80%" : "50%"}
			height='90vh'
			margin='5vh 5vw'
			direction={screenWidth <= 900 ? "column-reverse" : "row"}>
			<StyledContainer
				direction={screenWidth <= 900 ? "row" : "column"}
				content={"space-between"}
				width={screenWidth <= 900 ? "80%" : "30%"}
				height={"30vh"}>
				<Logo width='30vw' height='30vh' />
				<StyledText fontSize='2vw'>
					RMEET is a private community for only RMIT students in Vietnam.
				</StyledText>
			</StyledContainer>

			<SignupCont isMobile={screenWidth <= 900}>
				<StyledContainer width='100%' direction='column' content='flex-start'>
					<StyledTitle>Sign up</StyledTitle>
					<ProfileImg
						src={profileImg}
						onChangePhoto={_handleProfileImgChange}
						screenWidth={screenWidth}
						isShowButton
					/>
				</StyledContainer>
				<StyledContainer width='100%' className='inputCont'>
					<StyledContainer
						width='100%'
						height='100%'
						direction='column'
						content='space-between'
						margin='0 5%'>
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
					</StyledContainer>
					<StyledContainer
						width='100%'
						height='100%'
						direction='column'
						content='space-between'>
						<StyledContainer
							width='100%'
							height='100%'
							direction='column'
							content='flex-start'>
							<SelectBox
								label={"Major"}
								value={major}
								groups={majors}
								onChange={_handleMajorChange}
							/>
							<Input
								label={"Bio"}
								value={Bio}
								maxLength={256}
								onChange={_handleBioChange}
								onKeyPress={_handleSubmit}
								isMultipleLine
							/>
							{!isValid && <ValidationMessage message={errorMessage} />}
						</StyledContainer>
						<StyledContainer width='100%' items='flex-end'>
							<Button
								title={"Create new account"}
								onClick={_handleSubmit}
								style={{}}
								disabled={!isValid}
							/>
						</StyledContainer>
					</StyledContainer>
				</StyledContainer>
			</SignupCont>
		</StyledContainer>
	);
};

export default Signup;
