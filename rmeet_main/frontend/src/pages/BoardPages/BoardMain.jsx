import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*Components */
import SingleBoard from "../../components/SingleBoard";
import SearchBar from "../../components/SearchBar";
import SelectBox from "../../components/SelectBox";
import Button from "../../components/Button";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components";
import CenterModal from "../../components/CenterModal";
import Spinner from "../../components/Spinner";

/*Context */
// import { CurrentUserContext } from "../../contexts/CurrentUser";

/* Styled Components */
const Screen = styled(FlexContainer)`
	width: 80%;
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

	@media (max-width: 820px) {
		flex-direction: column;
	}
`;

const SearchBtnWrapper = styled(FlexContainer)`
	width: 100%;
	align-items: flex-start;
`;

const SelectBoxWrapper = styled(FlexContainer)`
	width: 50%;

	@media (max-width: 820px) {
		margin-bottom: 1vh;
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
	width: 90%;
	height: 1vw;
	@media (max-width: 820px) {
		margin: 0;
	}
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

const BoardCont = styled.div`
	width: 100%;
	height: 70vh;
	overflow-y: scroll;
`;

const SelectBoxStyle = {
	borderRadius: "50px",
	width: "100%",
	margin: "0 3% 0 0",
	labelContMargin: "0",
	selectContBorder: "3px solid #000056",
};

/* Data */
const semesterInfo = [
	{ key: "1", value: "semester 1" },
	{ key: "2", value: "semester 2" },
	{ key: "3", value: "semester 3" },
];

const yearInfo = [
	{ key: "2020", value: "2020" },
	{ key: "2021", value: "2021" },
	{ key: "2022", value: "2022" },
];

const sampleCourseList = [
	{
		key: "COSC2539",
		value: "Security in Computing and Information Technology",
	},
	{ key: "COSC2503", value: "Programming Project 2" },
	{ key: "COSC2740", value: "Flagship Internship (IT)" },
	{ key: "COSC2638", value: "Cloud Computing" },
	{ key: "MATH2081", value: "Mathematics for Computing" },
	{ key: "COSC2769", value: "Further Web Programming" },
];

const errMsg = "Please enter the course name.";

const BoardMain = () => {
	const [postList, setPostList] = useState([]);
	const [semester, setSemester] = useState("semester1");
	const [year, setYear] = useState("2020");
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isModalShow, setIsModalShow] = useState(false);
	const [focusedPost, setFocusedPost] = useState("");
	const [isSpinner, setIsSpinner] = useState(false);

	// const { currentUser } = useContext(CurrentUserContext);
	const theme = useContext(ThemeContext);

	const navigation = useNavigate();

	useEffect(() => {
		const client = getClient();
		getPosts(client);
	}, []);

	const getClient = () => {
		// const { uid } = currentUser; // get current user's token
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": window.sessionStorage.getItem("uid"),
			},
		});

		return client;
	};

	const getPosts = async client => {
		setIsSpinner(true);
		try {
			let response = await client
				.get("/api/posts/getPosts")
				.then(response => {
					setPostList(response.data);
				})
				.catch(error => {
					console.log(error);
				}).finally(()=>{
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}

	};

	const _onSearchValChange = e => {
		if (errorMessage === errMsg) {
			setErrorMessage("");
		}

		setCourse(e.target.value);
	};

	const _onHideModal = () => {
		setIsModalShow(false);
		setFocusedPost("");
	};

	const _onDeletePost = async () => {
		const client = getClient();
		try {
			let response = await client
				.delete(`/api/posts/${focusedPost}`)
				.then(response => {
					getPosts(client);
				})
				.catch(error => {
					console.log(error);
				});
		} catch (error) {
			console.error(error);
		}

		_onHideModal();
	};

	const _handleCreatePost = () => {
		navigation("/board/create-post", { state: { mode: "create" } });
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
				<SelectBoxWrapper>
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
				</SelectBoxWrapper>
				<SearchBtnWrapper>
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
						onClick={_handleCreatePost}
						style={{
							width: "15vw",
							height: "auto",
							padding: "1% 5%",
							btnColor: theme.mainRed,
							margin: "0",
						}}
					/>
				</SearchBtnWrapper>
			</SearchBarCont>
			{isSpinner ? (
				<Spinner isVisible={isSpinner} />
			) : (
				<BoardCont>
					{Object.values(postList).map((post, index) => (
						<SingleBoard
							key={index}
							post={post}
							setModalShow={setIsModalShow}
							setFocusedPost={setFocusedPost}
						/>
					))}
				</BoardCont>
			)}
			<CenterModal
				header='Are you sure?'
				desc='Do you want to delete this post?'
				BtnName='Delete'
				BtnOnClick={_onDeletePost}
				isModalShow={isModalShow}
				onHide={_onHideModal}
			/>
		</Screen>
	);
};

export default BoardMain;
