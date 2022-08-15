import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

/*Components */
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Course from "../../components/Course";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components";

const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	margin: 1%;
`;

const SearchBarCont = styled(FlexContainer)`
	width: 100%;
	justify-content: space-around;
	align-items: flex-start;
	padding: 3% 0;
	margin-bottom: 10px;
`;

const SearchBarWrapper = styled(FlexContainer)`
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
`;

const StyleTitle = styled.h1`
	font-size: 3vw;
`;

const CourseCont = styled.div`
	height: 70vh;
	overflow-y: scroll;
	width: 100%;
`;

const errMsg = "Please enter the course name.";

const CourseMain = () => {
	const [courseList, setCourseList] = useState();
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const theme = useContext(ThemeContext);

	const _onSearchValChange = e => {
		setCourse(e.target.value);
	};

	const _handleCreate = () => {
		console.log("navigate to post page");
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
						valuesList={courseList}
					/>
					<ValidationMessage message={errorMessage} />{" "}
				</SearchBarWrapper>
				<Button
					title='Create'
					onClick={_handleCreate}
					style={{
						width: "15%",
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
