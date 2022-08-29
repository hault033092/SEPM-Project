import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/* Components */
import Course from "../../components/Course";
import { FlexContainer } from "../../components";
import Review from "../../components/Review";
import Image from "../../components/Image";
import CenterModal from "../../components/CenterModal";

/* Data */
import writeReview from "../../lib/img/icon/writeReview.svg";

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

const CourseDetail = ({ courseID }) => {
	const [isModalShow, setIsModalShow] = useState(false);
	const [focusedReview, setFocusedReview] = useState("");
	const navigation = useNavigate();

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
		</Screen>
	);
};

export default CourseDetail;
