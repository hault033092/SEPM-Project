import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*Components */
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Course from "../../components/Course";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components";
import Spinner from "../../components/Spinner";

/*Context */
import { CurrentUserContext } from "../../contexts/CurrentUser";

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
	const [courseList, setCourseList] = useState([]);
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSpinner, setIsSpinner] = useState(false);

	const theme = useContext(ThemeContext);
	const { currentUser } = useContext(CurrentUserContext);
	const navigation = useNavigate();

	useEffect(() => {
		const client = getClient();
		getCourses(client);
	}, []);

	const getClient = () => {
		const { uid } = currentUser; // get current user's token
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": uid,
			},
		});

		return client;
	};

	const getCourses = async client => {
		setIsSpinner(true);
		try {
			let response = await client
				.get("/api/course/getCourses")
				.then(response => {
					setCourseList(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		} catch (error) {
			console.error(error);
		}
		setIsSpinner(false);
	};

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
						valuesList={{}}
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

			{isSpinner ? (
				<Spinner isVisible={isSpinner} />
			) : (
				<CourseCont>
					{Object.values(courseList).map((course, index) => (
						<Course
							key={index}
							courseID={course._id}
							courseName={course.courseName}
							LecturerName={course.lecturerName}
							rateValue={course.__v}
						/>
					))}
				</CourseCont>
			)}
		</Screen>
	);
};

export default CourseMain;
