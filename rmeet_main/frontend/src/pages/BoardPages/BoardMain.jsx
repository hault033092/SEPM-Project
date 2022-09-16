import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*Components */
import SingleBoard from "../../components/SingleBoard";
import SearchBar from "../../components/SearchBar";
import SelectBox from "../../components/SelectBox";
import Button from "../../components/Button";
import { FlexContainer } from "../../components/FlexContainer";
import CenterModal from "../../components/CenterModal";
import Spinner from "../../components/Spinner";

/* Styled Components */
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

const ValidationMessage = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 1vw;
	font-weight: 400;
	margin: 5px;
	color: ${props => props.color};
`;

/* Data */
const semesterInfo = [
	{ key: "A", value: "semester A" },
	{ key: "B", value: "semester B" },
	{ key: "C", value: "semester C" },
];

const yearInfo = [
	{ key: "2020", value: "2020" },
	{ key: "2021", value: "2021" },
	{ key: "2022", value: "2022" },
];

const errMsg = "Please enter the course name.";

const BoardMain = () => {
	const [postList, setPostList] = useState([]);
	const [semester, setSemester] = useState("A");
	const [year, setYear] = useState("2020");
	const [course, setCourse] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isModalShow, setIsModalShow] = useState(false);
	const [focusedPost, setFocusedPost] = useState("");
	const [searchCourses, setSearchCourses] = useState([]);
	const [isSpinner, setIsSpinner] = useState(false);

	const theme = useContext(ThemeContext);

	const navigation = useNavigate();

	useEffect(() => {
		const client = getClient();
		getPosts(client);
		getRecommendedCourses(client);
	}, []);

	const getClient = () => {
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": window.sessionStorage.getItem("token"),
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
				})
				.finally(() => {
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const getRecommendedCourses = async client => {
		try {
			let response = await client
				.get("/api/course/getCourses")
				.then(response => {
					let res = [];
					for (const course of response.data) {
						const c = { key: course.courseId, value: course.courseName };
						res.push(c);
					}
					setSearchCourses(res);
				})
				.catch(error => {
					console.log(error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const getSearchResult = async () => {
		setIsSpinner(true);
		const client = getClient();
		try {
			let response = await client
				.get("/api/posts/getPosts")
				.then(response => {
					setPostList(response.data);
					const res = postList.filter(post => {
						console.log(post);
						if (post.semester !== undefined && post.year !== undefined) {
							if (post.semester === semester && post.year === year) {
								return true;
							}
						}
					});
					console.log(semester);
					console.log("res", res);
					setPostList(res);
				})
				.catch(error => {
					console.log(error);
				})
				.finally(() => {
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
				.delete(`/api/posts/deletePost/${focusedPost}`)
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
		getSearchResult();
	};

	const _handleDelete = async () => {
		setCourse("");
		const client = getClient();
		await getPosts(client);
	};

	const _handleCourseEvent = value => {
		setCourse(value);
	};

	const _handleSemesterChange = e => {
		const res = e.target.value;
		setSemester(res.charAt(res.length - 1)); // store the last char of the str
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
							valuesList={searchCourses}
						/>
						<ErrMsgWrapper>
							<ValidationMessage color='#E60028'>
								{errorMessage}
							</ValidationMessage>
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
			<BoardCont>
				{Object.values(postList).map((post, index) => {
					if (post.like === undefined) {
						post.like = 0;
					}
					const commentsArr = [];
					const add = {
						comments: commentsArr,
						numOfComment: commentsArr.length,
						createdAt: "dd-mm-yyyy",
					};

					const res = { ...post, ...add };

					return (
						<SingleBoard
							key={index}
							post={res}
							setModalShow={setIsModalShow}
							setFocusedPost={setFocusedPost}
						/>
					);
				})}
			</BoardCont>
			<CenterModal
				header='Are you sure?'
				desc='Do you want to delete this post?'
				BtnName='Delete'
				BtnOnClick={_onDeletePost}
				isModalShow={isModalShow}
				onHide={_onHideModal}
			/>
			<Spinner isVisible={isSpinner} />
		</Screen>
	);
};

export default BoardMain;
