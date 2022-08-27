import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const CreatePost = () => {
	const navigate = useNavigate();
	const location = useLocation();

	console.log(location.state.mode);

	return (
		<PostContainer>
			<Heading>Board</Heading>
			<PostContent>
				<Field>
					<TitleInput
						type='text'
						placeholder='Enter title here...'></TitleInput>
				</Field>
				<Field>
					<Area
						id='bio'
						type='textarea'
						rows='15'
						spellcheck='false'
						value='Your content goes here...'></Area>
				</Field>
				<Field>
					<SelectGroup>
						<Label htmlFor='semester'>Semester:</Label>
						<SelectBox id='semester'>
							<Option value=''></Option>
							<Option value='october'>October</Option>
							<Option value='june'>June</Option>
							<Option value='february'>February</Option>
						</SelectBox>
					</SelectGroup>
				</Field>
				<Field>
					<SelectGroup>
						<Label htmlFor='year'>Year:</Label>
						<SelectBox id='year'>
							<Option value=''></Option>
							<Option value='2022'>2022</Option>
							<Option value='2021'>2021</Option>
							<Option value='2020'>2020</Option>
						</SelectBox>
					</SelectGroup>
				</Field>
				<SubmitField>
					<CancelButton onClick={() => navigate("/board")}>Return</CancelButton>
					<SaveButton>Post</SaveButton>
				</SubmitField>
			</PostContent>
		</PostContainer>
	);
};

const PostContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 1.5rem 1.5rem;

	@media screen and (max-width: 1199px) {
		position: absolute;
		justify-content: space-between;
		padding: 7rem 1rem 0 1rem;
	}
`;

const Heading = styled.h1`
	font-family: "Orbitron", sans-serif;
	font-size: 2rem;
	text-transform: uppercase;
	color: black;
	font-weight: 900;

	@media screen and (max-width: 1199px) {
		font-size: 2.4rem;
	}
`;

const PostContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	padding: 1.5rem 1.5rem;
	background-color: #00005433;
	border-radius: 1rem;
	border: none;
`;

const Field = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const TitleInput = styled.input`
	width: 100%;
	border: none;
	text-decoration: underline;
	font-size: 3rem;
	font-weight: 700;
	color: #000054;
	background-color: transparent;

	&:focus {
		outline: none;
	}

	&::placeholder {
		font-weight: 700;
		color: #000054;
		opacity: 0.5;
	}

	@media screen and (max-width: 1199px) {
		font-size: 2.4rem;
	}
`;

const Area = styled.textarea`
	width: 100%;
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

const SelectGroup = styled.div`
	display: flex;
	margin-right: 2rem;
`;

const Label = styled.label`
	font-weight: 700;
	color: #000054;
	margin-right: 1rem;
	width: 10rem;
	display: flex;
	align-items: center;
`;

const SelectBox = styled.select`
	width: 6rem;
	border-radius: 1rem;
	border: none;
	text-align: center;
	display: flex;
`;

const Option = styled.option`
	color: #000054;
`;

const SubmitField = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 100%;
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

const CancelButton = styled(Button)`
	width: 8rem;
`;

const SaveButton = styled(Button)`
	width: 8rem;
`;

export default CreatePost;
