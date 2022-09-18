import { React, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Rating from "@mui/material/Rating";

const CourseReview = () => {
	const navigate = useNavigate();

	const [isEnabled, setIsEnabled] = useState("false");
	const [rating, setRating] = useState(0.0);
	const [courseName, setCourseName] = useState("");

	const toggleOverlayDiv = () => {
		setIsEnabled(!isEnabled);
	};

	const onCourseName = e => {
		setCourseName(e.target.value);
	};

	return (
		<ReviewContainer>
			<Heading>Account Details</Heading>
			<ReviewContent>
				<Label htmlFor='courseName'>*Course name:</Label>
				<ReviewInputField
					id='courseName'
					type='text'
					value={courseName}
					onChange={onCourseName}
					placeholder='Enter course name'
					required></ReviewInputField>
				<ReviewToggle>
					<Text>Please write a review to help other students:</Text>
					<ReviewInputField
						onClick={toggleOverlayDiv}
						id='skipReview'
						type='checkbox'
						value='Skip'
						name='choice'
						style={{ width: "auto" }}></ReviewInputField>
					<Label htmlFor='skipReview'>Skip for now!</Label>
				</ReviewToggle>
				<ReviewWrapper>
					<Overlay className={isEnabled ? "hidden" : ""}></Overlay>
					<MainReview>
						<ReviewSection>
							<Title>Overall Review</Title>
							<ReviewField>
								<Label htmlFor='courseNameReview'>Course:</Label>
								<ReviewInputField
									id='courseNameReview'
									type='text'
									value=''
									placeholder='Enter course name'></ReviewInputField>
							</ReviewField>
							<ReviewField>
								<Label htmlFor='rating'>Rating (1-5):</Label>
								<StyledRating
									name='half-rating'
									defaultValue={0}
									value={rating}
									precision={0.5}
									onChange={(event, newRating) => {
										setRating(newRating);
									}}></StyledRating>
							</ReviewField>
							<SelectField>
								<SelectGroup>
									<Label htmlFor='semester'>Semester:</Label>
									<SelectBox id='semester'>
										<Option value=''></Option>
										<Option value='october'>October</Option>
										<Option value='june'>June</Option>
										<Option value='february'>February</Option>
									</SelectBox>
								</SelectGroup>
								<SelectGroup>
									<Label htmlFor='year'>Year:</Label>
									<SelectBox id='year'>
										<Option value=''></Option>
										<Option value='2022'>2022B</Option>
										<Option value='2022'>2022A</Option>
										<Option value='2021'>2021C</Option>
									</SelectBox>
								</SelectGroup>
							</SelectField>
							<ReviewField>
								<Label htmlFor='lecturerName'>Lecturer:</Label>
								<ReviewInputField
									id='lecturerName'
									type='text'
									value=''
									placeholder='Enter lecturer name'></ReviewInputField>
							</ReviewField>
							<Label htmlFor='review'>Detailed review:</Label>
							<Area
								id='review'
								type='textarea'
								rows='2'
								spellcheck='false'
								value=''></Area>
						</ReviewSection>
						<AssignmentSection>
							<Title>Assignments</Title>
							<ReviewField>
								<Label htmlFor='type'>Assignment type:</Label>
								<SelectBox id='type'>
									<Option value=''></Option>
									<Option value='quiz'>Quiz</Option>
									<Option value='team'>Team</Option>
									<Option value='individual'>Individual</Option>
								</SelectBox>
							</ReviewField>
							<ReviewField>
								<Label htmlFor='quantity'>Quantity:</Label>
								<ReviewInputField
									id='quantity'
									type='number'
									value=''></ReviewInputField>
							</ReviewField>
							<AddButton>+ Add assignment</AddButton>
						</AssignmentSection>
					</MainReview>
					<CourseInfo>
						<Title>Course Information</Title>
						<CourseInfoField>
							<Text>Study mode:</Text>
							<RadioGroup>
								<ReviewInputField
									id='mode1'
									type='radio'
									value='Offline'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='mode1'>Offline</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='mode2'
									type='radio'
									value='Online'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='mode2'>Online</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='mode3'
									type='radio'
									value='Hybrid'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='mode3'>Hybrid</Label>
							</RadioGroup>
						</CourseInfoField>
						<CourseInfoField>
							<Text>Course type:</Text>
							<RadioGroup>
								<ReviewInputField
									id='type1'
									type='radio'
									value='Lecture'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='type1'>Lecture only</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='type2'
									type='radio'
									value='Tutorial'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='type2'>Tutorial only</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='type3'
									type='radio'
									value='Both'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='type3'>Hybrid</Label>
							</RadioGroup>
						</CourseInfoField>
						<CourseInfoField>
							<Text>Recommended:</Text>
							<RadioGroup>
								<ReviewInputField
									id='first'
									type='radio'
									value='1st'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='first'>1st year</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='second'
									type='radio'
									value='2nd'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='second'>2nd year</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='third'
									type='radio'
									value='3rd'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='third'>3rd year</Label>
							</RadioGroup>
							<RadioGroup>
								<ReviewInputField
									id='any'
									type='radio'
									value='all'
									name='option'
									style={{ width: "auto" }}></ReviewInputField>
								<Label htmlFor='any'>Anyone</Label>
							</RadioGroup>
						</CourseInfoField>
					</CourseInfo>
				</ReviewWrapper>
				<SubmitField>
					<CancelButton
						onClick={() => {
							navigate(
								`/update-account/${window.sessionStorage.getItem("uid")}`
							);
						}}>
						Cancel
					</CancelButton>
					<SaveButton>Save course</SaveButton>
				</SubmitField>
			</ReviewContent>
		</ReviewContainer>
	);
};

const ReviewContainer = styled.div`
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

const ReviewContent = styled.div`
	height: 100%;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	background-color: #ffffff;
	border-radius: 1rem;
	border: 0.4rem solid #000054;
	padding: 0 1.5rem;
	box-shadow: 0 0 0 50rem rgba(0 0 0 / 0.75);

	@media screen and (max-width: 1199px) {
		height: auto;
		width: 100%;
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

const Title = styled.h2`
	font-family: "Orbitron", sans-serif;
	font-size: 1.6rem;
	color: #000054;
`;

const StyledRating = styled(Rating)`
	height: 1.5rem;
	background-color: #ffffff;
	border-radius: 2rem;
	padding: 0 0.4rem;

	& span {
		height: 1.5rem;
		display: flex;
		align-items: center;
	}
`;

const ReviewField = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

const SelectField = styled(ReviewField)`
	@media screen and (max-width: 1199px) {
		flex-direction: column;
	}
`;

const CourseInfoField = styled(ReviewField)`
	@media screen and (max-width: 1199px) {
		flex-direction: column;

		&:not(:last-child) {
			margin-bottom: 1rem;
		}
	}
`;

const ReviewWrapper = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
`;

const MainReview = styled.div`
	width: 100%;
	height: 68%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;

	@media screen and (max-width: 1199px) {
		flex-direction: column;
	}
`;

const Overlay = styled.div`
	position: absolute;
	inset: 0;
	background-color: white;
	opacity: 0.75;
	border-radius: 1rem;

	&.hidden {
		display: none;
	}
`;

const ReviewSection = styled.div`
	width: 66%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #00005433;
	padding: 1rem 1rem;
	border-radius: 1rem;

	@media screen and (max-width: 1199px) {
		height: 60vh;
		width: 100%;
		border-radius: 1rem 1rem 0 0;
		border-bottom: 0.2rem solid #000054;
	}
`;

const AssignmentSection = styled.div`
	width: 33%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #00005433;
	padding: 1rem 1rem;
	border-radius: 1rem;

	@media screen and (max-width: 1199px) {
		height: 40vh;
		width: 100%;
		border-radius: 0;
		border-top: 0.2rem solid #000054;
		border-bottom: 0.4rem solid #000054;
	}
`;

const CourseInfo = styled.div`
	height: 30%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	background-color: #00005433;
	border-radius: 1rem;
	padding: 1rem 1rem;

	@media screen and (max-width: 1199px) {
		height: auto;
		border-radius: 0 0 1rem 1rem;
	}
`;

const RadioGroup = styled.div`
	display: flex;

	@media screen and (max-width: 1199px) {
		width: 100%;
	}
`;

const Label = styled.label`
	font-weight: 700;
	color: #000054;
	margin-right: 1rem;
	width: 7.5rem;
	display: flex;
	align-items: center;

	@media screen and (max-width: 1199px) {
		margin: 0;
	}
`;

const ReviewInputField = styled.input`
	width: 100%;
	border-radius: 1rem;
	border: 0.2rem solid black;
	margin-right: 0.5rem;
	text-align: center;
	transition: 0.25s ease-in-out;

	&:focus {
		transform: scale(1.05, 1.05);
		background-color: lightskyblue;
	}

	@media screen and (max-width: 1199px) {
		&[type="radio"] {
			max-width: 2rem;
		}
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

const ReviewToggle = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

const Text = styled.p`
	color: #000054;
	font-weight: 700;
	margin-right: 1.5rem;
`;

const SelectGroup = styled.div`
	display: flex;
	margin-right: 2rem;

	@media screen and (max-width: 1199px) {
		margin: 0.6rem 0;
	}
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
	justify-content: flex-end;

	@media screen and (max-width: 1199px) {
		justify-content: space-between;
	}
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

const AddButton = styled(Button)`
	width: 8rem;
	border-radius: 0.5rem;
	background-color: #000054;
	margin: 0.5rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CancelButton = styled(Button)`
	width: 8rem;
`;

const SaveButton = styled(Button)`
	width: 8rem;
`;

export default CourseReview;
