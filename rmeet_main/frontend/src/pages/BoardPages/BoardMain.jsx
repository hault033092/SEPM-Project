import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

/*Components */
import SingleBoard from "../../components/SingleBoard";
import SearchBar from "../../components/SearchBar";
import SelectBox from "../../components/SelectBox";
import Button from "../../components/Button";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components";

/*Sample Data */
import {
	sampleCurrentUser,
	samplePostList,
	semesterInfo,
	yearInfo,
	sampleCourseList,
} from "../../lib/data/data";

const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	margin: 1%;
`;

const SearchBarCont = styled(FlexContainer)`
	width: 100%;
	height: auto;
	justify-content: space-between;
	align-items: flex-start;
	padding: 3% 0;
	margin-bottom: 10px;

	@media (max-width: 820px) {
		flex-direction: column;
	}
`;

const StyleTitle = styled.h1`
	font-size: 3vw;

	@media (max-width: 820px) {
		font-size: 3vh;
	}
`;

const SearchBarWrapper = styled(FlexContainer)`
	flex-direction: column;
	align-items: flex-end;

	@media (max-width: 820px) {
		margin-top: 3%;
		width: 100%;
	}
`;

const BoardCont = styled.div`
	height: 70vh;
	overflow-y: scroll;
`;

const errMsg = "Please enter the course name.";

const SelectBoxStyle = {
	borderRadius: "50px",
	width: "10vw",
	margin: "0 0 auto 0",
	labelContMargin: "0",
	selectContBorder: "3px solid #000056",
};

const BoardMain = () => {
	const [postList, setPostList] = useState(samplePostList);
	const [semester, setSemester] = useState("semester1");
	const [year, setYear] = useState("2020");
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const theme = useContext(ThemeContext);

	useEffect(() => {
		// get post from api
		// set post list
		// setPostList
	}, []);

	useEffect(() => {
		if (errorMessage === errMsg) {
			setErrorMessage("");
		}

		// load result
		// set post list
	}, [course]);

	const _onSearchValChange = e => {
		setCourse(e.target.value);
	};

	const _handlePost = () => {
		console.log("navigate to post page");
	};

	const _handleSearch = () => {
		if (course === "") {
			setErrorMessage(errMsg);
			return;
		}

		console.log("search processing runs!!");
		console.log("search for ", semester, year, course);
	};

	const _handleDelete = () => {
		setCourse("");
	};

	const _handleCourseEvent = value => {
		setCourse(value);
	};

	const _handleSemesterChange = e => {
		setSemester(e.target.value);
	};

	const _handleYearChange = e => {
		setYear(e.target.value);
	};

	return (
		<Screen>
			<StyleTitle>Board</StyleTitle>
			<SearchBarCont>
				<FlexContainer>
					<SelectBox
						groups={semesterInfo}
						value={semester}
						onChange={_handleSemesterChange}
						style={SelectBoxStyle}
					/>
					<SelectBox
						groups={yearInfo}
						value={year}
						onChange={_handleYearChange}
						style={SelectBoxStyle}
					/>
				</FlexContainer>
				<SearchBarWrapper>
					<SearchBar
						value={course}
						placeholder={"Enter the course name..."}
						onChange={_onSearchValChange}
						onSubmit={_handleSearch}
						onDelete={_handleDelete}
						setValue={_handleCourseEvent}
						width='40vw'
						valuesList={sampleCourseList}
					/>
					<ValidationMessage message={errorMessage} />{" "}
				</SearchBarWrapper>
				<Button
					title='Post'
					onClick={_handlePost}
					style={{
						width: "auto",
						height: "auto",
						padding: "1% 5%",
						btnColor: theme.mainRed,
						margin: "0",
					}}
				/>
			</SearchBarCont>
			<BoardCont>
				{Object.values(postList).map((post, index) => (
					<SingleBoard
						key={index}
						userID={sampleCurrentUser.userID}
						post={post}
					/>
				))}
			</BoardCont>
		</Screen>
	);
};

export default BoardMain;
