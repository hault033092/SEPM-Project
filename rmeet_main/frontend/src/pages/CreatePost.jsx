import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

/*Components */
import SearchBar from "../components/SearchBar";
import { FlexContainer } from "../components/FlexContainer";
import Spinner from "../components/Spinner";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [semester, setSemester] = useState("A");
	const [year, setYear] = useState("2022");
	const [course, setCourse] = useState("");
	const [courses, setCourses] = useState([]);
	const [isSpinner, setIsSpinner] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		getCourses();
		if (location.state.mode === "update") {
			getPostInfo(location.state.postId);
		}
	}, []);

	const _onTitleChange = e => {
		setTitle(e.target.value);
	};

	const _onContentChange = e => {
		setContent(e.target.value);
	};

	const _onSemesterChange = e => {
		setSemester(e.target.value);
	};

	const _onYearChange = e => {
		setYear(e.target.value);
	};

	const _onCourseChange = e => {
		setCourse(e.target.value);
	};

	const getClient = () => {
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": window.sessionStorage.getItem("token"),
			},
		});

		return client;
	};

	const getPostInfo = async postId => {
		setIsSpinner(true);
		const client = getClient();

		try {
			let response = await client
				.get(`/api/posts/getPost/${postId}`)
				.then(response => {
					console.log(response.data);
					setTitle(response.data.title);
					setContent(response.data.content);
					setSemester(response.data.semester);
					setYear(response.data.year);
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const getCourses = async () => {
		const client = getClient();

		try {
			let response = await client
				.get("/api/course/getCourses")
				.then(response => {
					let res = [];
					for (const course of response.data) {
						let c = { courseName: course.courseName };
						res.push(c);
					}

					setCourses(res);
				})
				.catch(error => {
					console.log(error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const createPost = async postInfo => {
		setIsSpinner(true);
		const client = getClient();

		try {
			let response = await client
				.post("/api/posts/createPost", postInfo)
				.then(response => {
					navigate(`/board/${response.data.newPost}`);
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const updatePost = async postInfo => {
		setIsSpinner(true);
		const client = getClient();

		try {
			let response = await client
				.patch(`/api/posts/updatePost/${location.state.postId}`, postInfo)
				.then(response => {
					navigate(`/board/${location.state.postId}`);
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => {
					setIsSpinner(false);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmit = () => {
		const postInfo = {
			title: title === "" ? "No Title" : title,
			content: content === "" ? "No Content" : content,
			semester: semester,
			year: year,
		};

		if (location.state.mode === "create") {
			postInfo.like = "0";
			createPost(postInfo);
		} else {
			updatePost(postInfo);
		}
	};

	return (
		<>
			<PostContainer>
				<Heading>Board</Heading>
				<PostContent>
					<Field>
						<TitleInput
							type='text'
							placeholder='Enter title here...'
							onChange={_onTitleChange}
							value={title}
						/>
					</Field>
					<Field>
						<Area
							id='content'
							type='textarea'
							rows='15'
							spellcheck='false'
							value={content}
							onChange={_onContentChange}
						/>
					</Field>
					<Field>
						<SelectGroup>
							<Label htmlFor='semester'>Semester:</Label>
							<SelectBox id='semester' onChange={_onSemesterChange}>
								<Option value='A' selected>
									Semester A
								</Option>
								<Option value='B'>Semester B</Option>
								<Option value='C'>Semester C</Option>
							</SelectBox>
						</SelectGroup>
					</Field>
					<Field>
						<SelectGroup>
							<Label htmlFor='year'>Year:</Label>
							<SelectBox id='year' onChange={_onYearChange}>
								<Option value='2022' selected>
									2022
								</Option>
								<Option value='2021'>2021</Option>
								<Option value='2020'>2020</Option>
							</SelectBox>
						</SelectGroup>
					</Field>
					<Field>
						<SelectGroup>
							<Label htmlFor='course'>Course:</Label>
							<SelectBox id='course' onChange={_onCourseChange}>
								{Object.values(courses).map(course => {
									return (
										<Option value={course.courseName}>
											{course.courseName}
										</Option>
									);
								})}
							</SelectBox>
						</SelectGroup>
					</Field>
					<SubmitField>
						<CancelButton onClick={() => navigate("/board")}>
							Return
						</CancelButton>
						<SaveButton onClick={onSubmit}>Post</SaveButton>
					</SubmitField>
				</PostContent>
			</PostContainer>
			<Spinner isVisible={isSpinner} isFullSize />
		</>
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
	width: 10rem;
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
