import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/*Components */
import { FlexContainer } from "./FlexContainer";
import ProfileImg from "./ProfileImg";
import DropBox from "./DropBox";
import Image from "./Image";
import Rating from "@mui/material/Rating";

/* Data */
import solLike from "../lib/img/icon/solLike.svg";
import regLike from "../lib/img/icon/regLike.svg";

const RowCont = styled(FlexContainer)`
	width: 100%;
	align-items: flex-start;
	margin-bottom: 0.2%;
`;

const ColCont = styled(RowCont)`
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	padding: 0.5%;
`;

const MainCont = styled(RowCont)`
	width: 100%;
	height: auto;
	flex-direction: column;
	padding: 1%;
	margin-bottom: 3%;
	box-shadow: 3px 3px 14px -2px rgb(0 0 0 / 30%);
	border-radius: 20px;

	@media (max-width: 400px) {
		border-radius: 3vw;
	}
`;

const ReviewInfo = styled(ColCont)`
	align-items: flex-start;
	color: ${props => props.theme.darkX2Grey};
`;

const RatingDropBoxWrapper = styled(RowCont)`
	justify-content: flex-start;
	align-items: center;
`;

const LikeCont = styled(RowCont)`
	background-color: ${props =>
		props.isLike ? props.theme.smileBlue : "rgba(138, 138, 255, 0.5)"};
	border: 3px solid
		${props =>
			props.isLike ? props.theme.smileBlue : "rgba(138, 138, 255, 0.5)"};
	border-radius: 5px;
	padding: 0.7% 0.5%;
	width: 17vw;
	color: ${props => props.theme.fontColor};
	justify-content: space-around;
	align-items: center;
	transition: all 0.3s ease;
	outline: none;
	cursor: pointer;

	&:before {
		height: 0%;
		width: 2px;
	}

	&:hover {
		box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		-webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		-moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		color: ${props => props.theme.darkX2Grey};
	}

	@media (max-width: 820px) {
		margin: 2%;
	}

	@media (max-width: 400px) {
		width: 40%;
	}
`;

const CommentCont = styled(RowCont)`
	border: 3px solid ${props => props.theme.darkGrey};
	border-radius: 2vw;
	color: ${props => props.theme.fontColor};
	padding: 0.5% 1%;
`;

const CourseInfoSubCont = styled(RowCont)`
	height: 2.5vw;
	justify-content: space-between;
	color: ${props => props.theme.fontColor};
	padding: 1% 3%;
	margin-top: 1%;

	@media (max-width: 400px) {
		height: 2.5vw;
	}
`;

const AssignmentCont = styled(CourseInfoSubCont)`
	height: 2.5vw;
	background-color: ${props => props.theme.mainBlue};
	padding: 1% 3%;
	border-radius: 40px;
	color: ${props => props.theme.fontColorWhite};
	margin-top: 1%;

	@media (max-width: 400px) {
		height: 6vw;
	}
`;

const StudyPeriodCont = styled(RowCont)`
	justify-content: space-between;
	width: 20vw;
	padding-left: 0.5%;

	@media (max-width: 400px) {
		width: 100%;
		margin-top: 3%;
	}
`;

const DropBoxWrapper = styled(RowCont)`
	width: 8%;
	margin-left: 3%;
`;

const StyledTitle = styled.p`
	color: ${props => props.theme.mainBlue};
	font-weight: 700;
	margin-bottom: 1.5%;
	font-size: 1.1vw;
`;

const StyledSubTitle = styled(StyledTitle)`
	font-weight: 500;
	font-size: 1vw;

	@media (max-width: 400px) {
		font-weight: 300;
		font-size: 0.5vw;
	}
`;

const StyledContent = styled.p`
	font-size: ${props => (props.fontSize ? props.fontSize : "0.7vw")};
	text-decoration: ${props => (props.underline ? "underline" : "none")};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : "300")};
	color: ${props =>
		props.fontColor ? props.fontColor : props.theme.fontColor};

	@media (max-width: 400px) {
		font-size: 2px;
	}
`;

const StyledContentWhite = styled(StyledContent)`
	color: ${props => props.theme.fontColorWhite};
`;

const Review = ({ courseInfo, setModalShow, setFocusedReview }) => {
	const isMyReview = useRef(null);
	const [isLike, setIsLike] = useState(false);
	const navigation = useNavigate();

	useEffect(() => {
		isMyReview.current = true; // check courseInfo.writerID === current user ID
	}, []);

	const navigateToProfileDetail = userID => {
		navigation("/account/viewProfile/" + userID);
	};

	const _handleLike = () => {
		setIsLike(prev => !prev);
	};

	const editReview = () => {
		navigation("/review-course");
		// send a review id to edit review
	};

	const deleteReview = () => {
		setModalShow(true);
		setFocusedReview("review id");
	};

	return (
		<MainCont>
			<RowCont>
				<ProfileImg
					src={""}
					width='7%'
					height='7%'
					isShowProfile={true}
					onShowProfile={navigateToProfileDetail}
				/>
				<ReviewInfo>
					<RatingDropBoxWrapper>
						<Rating
							name='read-only'
							value={4.5}
							precision={0.5}
							readOnly
							size={"small"}
						/>
						<DropBoxWrapper>
							<DropBox onEdit={editReview} onDelete={deleteReview} />
						</DropBoxWrapper>
					</RatingDropBoxWrapper>
					<StyledContent>created at: 07-08-2022</StyledContent>
				</ReviewInfo>
				<LikeCont onClick={_handleLike} isLike={isLike}>
					{isLike ? (
						<Image
							src={solLike}
							alt={"like icon"}
							style={{
								width: "2vw",
								height: "2vw",
								filter: "brightness(0) invert(1)",
							}}
						/>
					) : (
						<Image
							src={regLike}
							alt={
								"like icon. Click here if you think the review was not helpful"
							}
							style={{
								width: "2vw",
								height: "2vw",
							}}
						/>
					)}
					<StyledContent
						fontSize={"1vw"}
						fontWeight={600}
						fontColor={isLike ? "#fff" : "#000"}>
						Helpful! (23)
					</StyledContent>
				</LikeCont>
			</RowCont>
			<StudyPeriodCont>
				<StyledTitle>Studied it in the: </StyledTitle>
				<StyledContent underline>2nd semester, 2022</StyledContent>
			</StudyPeriodCont>
			<ColCont>
				<StyledTitle>Comments:</StyledTitle>
				<CommentCont>
					<StyledContent>
						The course was very comprehensive and easy to understand. The
						instructors made sure that they are giving the information in a way
						that won't make me confused. Thank you so much for this great
						course!
					</StyledContent>
				</CommentCont>
			</ColCont>
			<RowCont>
				<ColCont>
					<StyledTitle>Assignment:</StyledTitle>
					<ColCont>
						<AssignmentCont>
							<StyledContentWhite>Quiz</StyledContentWhite>
							<StyledContentWhite>10</StyledContentWhite>
						</AssignmentCont>
						<AssignmentCont>
							<StyledContentWhite>Essay</StyledContentWhite>
							<StyledContentWhite>10</StyledContentWhite>
						</AssignmentCont>
						<AssignmentCont>
							<StyledContentWhite>Presentation</StyledContentWhite>
							<StyledContentWhite>2</StyledContentWhite>
						</AssignmentCont>
						<AssignmentCont>
							<StyledContentWhite>Quiz</StyledContentWhite>
							<StyledContentWhite>10</StyledContentWhite>
						</AssignmentCont>
					</ColCont>
				</ColCont>
				<ColCont>
					<StyledTitle>Course Info:</StyledTitle>
					<CourseInfoSubCont>
						<StyledSubTitle>Study mode:</StyledSubTitle>
						<StyledContent underline>Full face-to-face course</StyledContent>
					</CourseInfoSubCont>
					<CourseInfoSubCont>
						<StyledSubTitle>Course type:</StyledSubTitle>
						<StyledContent underline>Tutorial only</StyledContent>
					</CourseInfoSubCont>
					<CourseInfoSubCont>
						<StyledSubTitle>Recommend to: </StyledSubTitle>
						<StyledContent underline>2nd year student</StyledContent>
					</CourseInfoSubCont>
				</ColCont>
			</RowCont>
		</MainCont>
	);
};

Review.propTypes = {
	courseInfo: PropTypes.object.isRequired,
	setModalShow: PropTypes.func,
	setFocusedReview: PropTypes.func,
};

Review.defaultProps = {
	setModalShow: () => {},
	setFocusedReview: () => {},
};

export default Review;
