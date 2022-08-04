import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleBoard from "../../components/SingleBoard";
import { StyledContainer } from "../../components/StyledContainer";
import SearchBar from "../../components/SearchBar";
import SelectBox from "../../components/SelectBox";
import Button from "../../components/Button";
import ValidationMessage from "../../components/ValidationMessage";
import {
	sampleCurrentUser,
	samplePostList,
	semesterInfo,
	yearInfo,
	sampleCourseList,
} from "../../lib/data/data";
import { FlexContainer } from "../../components";

const Nav = styled(StyledContainer)`
	width: 20%;
	height: 100%;
`;

const Screen = styled(StyledContainer)`
	width: 70%;
	height: 100%;
	margin: 5% 0;
	flex-direction: column;
	border: 3px solid tomato;
`;

const SearchBarCont = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
	justify-content: space-between;
	z-index: 999;
`;

const BoardCont = styled.div`
	height: 90%;
	overflow-y: scroll;
`;

const errMsg = "Please enter the course name.";



const SelectBoxStyle = {
	border: "3px solid #000054",
	borderRadius: "50px",
	width: "auto",
	padding: "3%",
};

const BoardMain = () => {
	const [postList, setPostList] = useState(samplePostList);
	const [semester, setSemester] = useState("semester1");
	const [year, setYear] = useState("2020");
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		// get post from api
		// set post list // setPostList
	}, []);

	useEffect(() => {
		if (errorMessage === errMsg) {
			setErrorMessage("");
		}
	}, [course]);

	const _onSearchValChange = e => {
		setCourse(e.target.value);
	};

	const _handlePost = () => {
		console.log("navigate to post page");
	};

	const _handleBoardOnClick = () => {
		console.log("navigate to board detail page");
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
		setSemester(e.value.target);
	};

	const _handleYearChange = e => {
		setYear(e.value.target);
	};

	return (
		<StyledContainer height='100%'>
			<Nav></Nav>
			<Screen>
				<h1>Board</h1>
				<SearchBarCont>
					<SelectBox
						label='Semester'
						groups={semesterInfo}
						value={semester}
						onChange={_handleSemesterChange}
						style={SelectBoxStyle}
					/>
					<SelectBox
						label='Year'
						groups={yearInfo}
						value={year}
						onChange={_handleYearChange}
						style={SelectBoxStyle}
					/>
					<SearchBar
						value={course}
						onChange={_onSearchValChange}
						onSubmit={_handleSearch}
						onDelete={_handleDelete}
						setValue={_handleCourseEvent}
						width='75%'
						valuesList={sampleCourseList}
					/>
					<Button title='Post' onClick={_handlePost} style={{ width: "20%" }} />
				</SearchBarCont>
				{errorMessage && <ValidationMessage message={errorMessage} />}
				<BoardCont>
					{Object.values(postList).map((post, index) => (
						<SingleBoard
							key={index}
							userID={sampleCurrentUser.userID}
							post={post}
							onClick={_handleBoardOnClick}
						/>
					))}
				</BoardCont>
			</Screen>
		</StyledContainer>
	);
};

export default BoardMain;
