import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
	Input,
	ErrorMessage,
	Button,
	Logo,
	SelectBox,
	ProfileImg,
} from "../components";
import { removeWhitespace } from "../util/accountValidation";
import ProfileImgSrc from "../lib/img/user.svg";

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

const SignupCont = styled(StyledContainer)`
	width: ${props => (props.isMobile ? "80%" : "70%")};
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
	font-size: 6vw;
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
	const [profileImg, setProfileImg] = useState(ProfileImgSrc);
	const [username, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwdConfirm, setPwdConfirm] = useState("");
	const [major, setMajor] = useState("");
	const [Bio, setBio] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isValid, setIsValid] = useState(false);

	const majors = {
		SSET: [
			{ key: "BH073", value: "Electronic and Computer Systems Engineering" },
			{ key: "BH120", value: "Software Engineering" },
			{ key: "BH070", value: "Applied Science (Aviation)" },
			{ key: "BH199", value: "Science (Food Technology and Nutrition)" },
			{ key: "BH123", value: "Robotics and Mechatronics Engineering" },
			{ key: "BH154", value: "Applied Science (Psychology)" },
			{ key: "BH162", value: "Information Technology" },
		],
		SCD: [
			{ key: "BP309", value: "Design (Digital Media)" },
			{ key: "BP316", value: "Design Studies" },
			{ key: "BP222", value: "Communication (Professional Communication)" },
			{ key: "BP317", value: "Languages" },
			{ key: "BP327", value: "Fashion (Enterprise)" },
			{ key: "BP325", value: "Digital Film and Video" },
			{ key: "BP214", value: "Design (Games)" },
		],
		SBM: [
			{ key: "BP343", value: "Business" },
			{ key: "BP312", value: "Tourism and Hospitality Management" },
			{ key: "BP318", value: " Digital Marketing" },
		],
	};

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
			width='90vw'
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
							{!isValid && <ErrorMessage message={errorMessage} />}
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
