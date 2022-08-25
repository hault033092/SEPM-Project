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

/* Data */

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

const client = axios.create({
	baseURL: "http://localhost:8080/api/user/register",
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

	const { setCurrentUser } = useContext(CurrentUserContext);

	const navigation = useNavigate();

	useEffect(() => {
		setIsValid(username && pwd && pwdConfirm && major && !errorMessage);
	}, [username, pwd, pwdConfirm, major, errorMessage]);

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
				.catch(function (error) {
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

	const _handleMajorChange = e => {
		setErrorMessage("");
		setMajor(e.target.value);
	};

	const _handleBioChange = e => {
		setErrorMessage("");
		setBio(e.target.value);
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
