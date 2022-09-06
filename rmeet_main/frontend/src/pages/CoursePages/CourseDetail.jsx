import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/* Components */
import Course from "../../components/Course";
import { FlexContainer } from "../../components";
import Review from "../../components/Review";
import Image from "../../components/Image";
import CenterModal from "../../components/CenterModal";
import Button from "../../components/Button";

/* Data */
import writeReview from "../../lib/img/icon/writeReview.svg";
import PageNotFound from "../../lib/img/illustration/notFound.svg";

/*Context */
// import { CurrentUserContext } from "../../contexts/CurrentUser";

const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	padding: 1%;
`;

const ContentWrapper = styled(FlexContainer)`
	width: 100%;
	flex-direction: column;
`;

const ReviewCont = styled.div`
	width: 90%;
	height: 50vh;
	overflow-y: scroll;
	margin-top: 1%;
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

const AddCourseCont = styled(FlexContainer)`
	width: 5vw;
	height: 5vw;
	margin: 3%;
	padding: 1.2%;
	background-color: ${props => props.theme.screenBg};
	border: 0.4vw solid #ab0000;
	border-radius: 50%;
	z-index: 10;
	position: absolute;
	bottom: 0;
	right: 0;
	transition: all 0.3s ease 0s;
	cursor: pointer;
	outline: none;

	&:hover {
		background-color: #ab0000;
		transform: translateY(-7px);
	}

	@media (max-width: 820px) {
		background-color: #ab0000;
		width: 8vw;
		height: 8vw;
	}

	@media (max-width: 400px) {
		background-color: #ab0000;
		width: 10vw;
		height: 10vw;
		width: 10vw;
		height: 10vw;
	}
`;

const PageNotFoundCont = styled(FlexContainer)`
	@media (max-width: 820px) {
		flex-direction: column;
	}
`;

const MsgWrapper = styled(FlexContainer)`
	flex-direction: column;
	align-items: flex-start;
`;

const StyledText = styled.p`
	height: 100%;
	margin: ${props => (props.margin ? props.margin : "0")};
	text-decoration: ${props => (props.isUnderline ? "underline" : "none")};
	font-size: ${props => props.fontSize}vw;
	font-weight: ${props => (props.fontWeight ? props.fontWeight : "300")};

	@media (max-width: 400px) {
		font-size: ${props => props.fontSize - 0.4}vw;
	}
`;

const CourseDetail = () => {
	const [isModalShow, setIsModalShow] = useState(false);
	const [focusedReview, setFocusedReview] = useState("");
	const isPageNotFound = useRef(false);

	// const { currentUser } = useContext(CurrentUserContext);
	const navigation = useNavigate();
	const { courseId } = useParams();

	useEffect(() => {
		const client = getClient();
		getPost(client);
	}, []);

	const getClient = () => {
		// const { uid } = currentUser; 
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": window.sessionStorage.getItem("uid"),
			},
		});

		return client;
	};

	const getPost = async client => {
		try {
			console.log(courseId);
			let response = await client
				.get(`/api/posts/getPost/${courseId}`) //MEMO
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					isPageNotFound.current = true;
				});
		} catch (error) {
			console.error(error);
		}
	};

	const _handleCreateReview = () => {
		navigation("/review-course");
	};

	const _onHideModal = () => {
		setIsModalShow(false);
		setFocusedReview("");
	};

	const _onDeleteReview = () => {
		console.log("delete review!"); // delete 'focusedReview'
		_onHideModal();
	};

	return (
		<Screen>
			<StyleTitle>Course</StyleTitle>

			{isPageNotFound ? (
				<PageNotFoundCont>
					<Image
						src={PageNotFound}
						alt={"Page not found "}
						style={{ width: "35vw", height: "35vw" }}
					/>
					<MsgWrapper>
						<StyledText fontSize={3} fontWeight='600'>
							Whoops!
						</StyledText>
						<StyledText fontSize={1.5}>
							Looks like this page went on vacation!
						</StyledText>
						<Button
							title='Go Home'
							onClick={() => {
								navigation("/");
							}}
							style={{
								width: "auto",
								height: "auto",
								padding: "1% 5%",
								margin: "5% 0 0 0",
								fontSize: "1.2vw",
							}}
						/>
					</MsgWrapper>
				</PageNotFoundCont>
			) : (
				<>
					<ContentWrapper>
						<Course
							courseID={"111"}
							courseName='Genre and Historical Movements'
							LecturerName='Anas Sarwar'
							rateValue={4.5}
							isNavHidden={true}
						/>
						<ReviewCont>
							<Review
								courseInfo={{}}
								setModalShow={setIsModalShow}
								setFocusedReview={setFocusedReview}
							/>
							<Review
								courseInfo={{}}
								setModalShow={setIsModalShow}
								setFocusedReview={setFocusedReview}
							/>
							<Review
								courseInfo={{}}
								setModalShow={setIsModalShow}
								setFocusedReview={setFocusedReview}
							/>
							<Review
								courseInfo={{}}
								setModalShow={setIsModalShow}
								setFocusedReview={setFocusedReview}
							/>
						</ReviewCont>
					</ContentWrapper>
					<AddCourseCont onClick={_handleCreateReview}>
						<Image
							src={writeReview}
							alt={"Feather icon. Click here to write a review of the course"}
							style={{
								width: "100%",
								height: "100%",
							}}
						/>
					</AddCourseCont>
					<CenterModal
						header='Are you sure?'
						desc='Do you want to delete this review?'
						BtnName='Delete'
						BtnOnClick={_onDeleteReview}
						isModalShow={isModalShow}
						onHide={_onHideModal}
					/>
				</>
			)}
		</Screen>
	);
};

export default CourseDetail;
