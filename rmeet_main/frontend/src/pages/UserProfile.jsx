import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../components/ProfileImg";
import DefaultImg from "../lib/img/icon/user.svg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
	const { userId } = useParams();
	console.log("userId: ", userId);

	const navigate = useNavigate();

	const [userProfile, setUserProfile] = useState([]);

	const config = {
		headers: {
			"auth-token": window.sessionStorage.getItem("token"),
		},
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/user/${userId}`, config)
			.then((response) => {
				setUserProfile(response.data);
			});
	}, []);
	console.log(userProfile.userName);

	return (
		<ProfileContainer>
			<Heading>User Profile</Heading>
			<ProfileContent>
				<PersonalInfo>
					<Title>Personal Info</Title>
					<ProfileImg src={userProfile.profileImg} width="8rem" height="8rem" />
					<Field>
						<Label htmlFor="username">Username:</Label>
						<InputField
							id="username"
							type="text"
							value={userProfile.userName}
							readOnly="readonly"
						/>
					</Field>
					<Field>
						<Label htmlFor="gender">Gender:</Label>
						<InputField
							id="gender"
							type="text"
							value={userProfile.gender}
							readOnly="readonly"
						/>
					</Field>
					<Field>
						<Label htmlFor="email">Email:</Label>
						<InputField
							id="email"
							type="email"
							value={userProfile.email}
							readOnly="readonly"
						/>
					</Field>
					<Field>
						<Label htmlFor="password">Password:</Label>
						<InputField
							id="password"
							type="password"
							value="aaaaaaaa"
							readOnly="readonly"
						/>
					</Field>
				</PersonalInfo>
				<AcademicInfo>
					<Title>Academic Info</Title>
					<Field>
						<Label htmlFor="major">Major:</Label>
						<InputField
							id="major"
							type="text"
							value={userProfile.major}
							readOnly="readonly"
						/>
					</Field>
					<Field>
						<Label htmlFor="bio">Bio:</Label>
						<Area
							id="bio"
							type="textarea"
							rows="3"
							spellcheck="false"
							value={userProfile.bio}
							readOnly="readonly"
						></Area>
					</Field>
					<Field>
						<Label htmlFor="courses">Completed course(s):</Label>
						<CoursesList></CoursesList>
					</Field>
					<SubmitField>
						<UpdateButton
							onClick={() => {
								navigate(`/update-account/${userId}`);
							}}
						>
							Update Info
						</UpdateButton>
					</SubmitField>
				</AcademicInfo>
			</ProfileContent>
		</ProfileContainer>
	);
};

const ProfileContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 1.5rem;
	margin: 0 auto;

	@media screen and (max-width: 1199px) {
		position: absolute;
		justify-content: space-between;
		padding: 7rem 0 0 0;
	}
`;

const Heading = styled.h1`
	font-family: "Orbitron", sans-serif;
	font-size: 2rem;
	text-transform: uppercase;
	text-align: center;
	color: black;
	font-weight: 900;
`;

const ProfileContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 1199px) {
		height: auto;
		position: relative;
		flex-direction: column;
		padding: 1rem 0;
	}
`;

const PersonalInfo = styled.div`
	height: inherit;
	width: 25%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	background-color: #00005433;
	border-top-left-radius: 1rem;
	border-bottom-left-radius: 1rem;
	border-right: 0.2rem solid #000054;
	padding: 1.2rem 1.2rem 4.6rem 1.2rem;

	@media screen and (max-width: 1199px) {
		height: 80vh;
		width: 90%;
		border-top-right-radius: 1rem;
		border-bottom-left-radius: 0;
		border-bottom: 0.2rem solid #000054;
		border-right: none;
	}
`;

const AcademicInfo = styled.div`
	height: 100%;
	width: 65%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	background-color: #00005433;
	border-top-right-radius: 1rem;
	border-bottom-right-radius: 1rem;
	border-left: 0.2rem solid #000054;
	padding: 1.2rem;

	@media screen and (max-width: 1199px) {
		height: 80vh;
		width: 90%;
		border-bottom-left-radius: 1rem;
		border-top-right-radius: 0;
		border-top: 0.2rem solid #000054;
		border-left: none;
	}
`;

const Title = styled.h2`
	font-family: "Orbitron", sans-serif;
	font-size: 1.6rem;
	color: #000054;
`;

const Field = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	font-weight: 700;
	color: #000054;
	margin-right: 1rem;
	width: 10rem;
	display: flex;
	align-items: center;
`;

const InputField = styled.input`
	border-radius: 1rem;
	border: none;
	text-align: center;
	transition: 0.25s ease-in-out;

	&:focus {
		transform: scale(1.05, 1.05);
		background-color: lightskyblue;
	}
`;

const Area = styled.textarea`
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	border: none;
	transition: 0.25s ease-in-out;
	cursor: default;

	&:focus {
		transform: scaleX(1.05);
		background-color: lightskyblue;
	}
`;

const CoursesList = styled.div`
	height: 12rem;
	width: 100%;
	display: flex;
	background-color: #ffffff;
	padding: 0.5rem 1rem;
	border-radius: 1rem;
	border: none;
	overflow-y: scroll;
`;

const SubmitField = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const UpdateButton = styled.button`
	width: 50%;
	border-radius: 1rem;
	border: none;
	padding: 0.5rem 0;
	background-color: red;
	color: #ffffff;
	font-weight: 700;
	transition: 0.25s ease-in-out;

	&:hover {
		opacity: 0.75;
	}
`;

export default UserProfile;
