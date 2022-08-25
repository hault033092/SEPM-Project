import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";

/*Components */
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Course from "../../components/Course";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components";


/*Sample Data */
import { sampleCourseList } from "../../lib/data/data";

/* Styled Component */
const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	padding: 1%;
`;

const SearchBarCont = styled(FlexContainer)`
	width: 100%;
	height: auto;
	justify-content: space-between;
	align-items: flex-start;
	padding: 2% 0;

	@media (max-width: 400px) {
		margin-bottom: 3vh;
	}
`;

const SearchBarWrapper = styled(FlexContainer)`
	flex-direction: column;
	align-items: flex-start;
	width: 100%;

	@media (max-width: 820px) {
		margin: 0;
	}
`;

const ErrMsgWrapper = styled.div`
	height: 1vw;
`;

const StyleTitle = styled.h1`
	font-size: 5vh;
	font-weight: 800;
	@media (max-width: 820px) {
		font-size: 5vh;
		font-weight: 600;
	}

	@media (max-width: 400px) {
		font-size: 3vh;
		font-weight: 600;
	}
`;

const CourseCont = styled.div`
	height: 70vh;
	overflow-y: scroll;
	width: 100%;
`;



/* Data */
const errMsg = "Please enter the course name.";

const CourseMain = () => {
	const [courseList, setCourseList] = useState();
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigation = useNavigate();
	const theme = useContext(ThemeContext);

	const _onSearchValChange = e => {
		if (errorMessage === errMsg) {
			setErrorMessage("");
		}
		
		setCourse(e.target.value);
	};

	const _handleCreateReview = () => {
		navigation("/review-course");
	};

	const _handleSearch = () => {
		if (course === "") {
			setErrorMessage(errMsg);
			return;
		}

		console.log("search processing runs!!");
		console.log("search for ", course);
	};

	const _handleDelete = () => {
		setCourse("");
	};

	const _handleCourseEvent = value => {
		setCourse(value);
	};

	return (
		<Screen>
			<StyleTitle>Course</StyleTitle>
			<SearchBarCont>
				<SearchBarWrapper>
					<SearchBar
						value={course}
						placeholder={"Enter the course name..."}
						onChange={_onSearchValChange}
						onSubmit={_handleSearch}
						onDelete={_handleDelete}
						setValue={_handleCourseEvent}
						valuesList={sampleCourseList}
					/>
					<ErrMsgWrapper>
						<ValidationMessage message={errorMessage} />
					</ErrMsgWrapper>
				</SearchBarWrapper>
				<Button
					title='Post'
					onClick={_handleCreateReview}
					style={{
						width: "15vw",
						height: "auto",
						padding: "1% 5%",
						btnColor: theme.mainRed,
						margin: "0",
					}}
				/>
			</SearchBarCont>
			<CourseCont>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar, Anas Sarwar, Anas Sarwar, Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
				<Course
					courseID={"111"}
					courseName='Genre and Historical Movements'
					LecturerName='Anas Sarwar'
					rateValue={4.5}
				/>
			</CourseCont>
		</Screen>
	);
};

export default CourseMain;
