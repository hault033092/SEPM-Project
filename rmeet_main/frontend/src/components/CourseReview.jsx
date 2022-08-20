import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/*Components */
import { FlexContainer } from "../components";
import ProfileImg from "./ProfileImg";
import Rating from "@mui/material/Rating";
import Image from "./Image";
import smile from "../lib/img/icon/smile.svg";
import unsmile from "../lib/img/icon/unsmile.svg";
import { useNavigate } from "react-router-dom";

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
	border: 0.3vw solid ${props => props.theme.mainBlue};
	border-radius: 3vw;
	flex-direction: column;
	padding: 1%;
	margin-bottom: 3%;

	&:hover {
		box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		-webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		-moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05) inset;
		color: ${props => props.theme.darkX2Grey};
	}

	@media (max-width: 400px) {
		border: 0.5vw solid ${props => props.theme.mainBlue};
		border-radius: 3vw;
	}
`;

const ReviewInfo = styled(ColCont)`
	align-items: flex-start;
	color: ${props => props.theme.darkX2Grey};
`;

const LikeCont = styled(RowCont)`
	background-color: ${props =>
		props.isLike ? props.theme.smileBlue : props.theme.unsmileBlue};
	border-radius: 40px;
	padding: 0.7% 0.5%;
	width: 100%;
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
`;

const LikeIconWrapper = styled(RowCont)`
	justify-content: space-between;
	align-items: center;
	width: auto;
`;

const CommentCont = styled(RowCont)`
	border: 3px solid ${props => props.theme.darkGrey};
	border-radius: 2vw;
	color: ${props => props.theme.fontColor};
	padding: 0.5% 1%;
`;

const CourseInfoSubCont = styled(RowCont)`
	justify-content: space-between;
	color: ${props => props.theme.darkX2Grey};
`;

const AssignmentsWrapper = styled(ColCont)`
	overflow-y: scroll;
	height: 5vw;
	padding-top: 5vw;
`;

const AssignmentCont = styled(CourseInfoSubCont)`
	background-color: ${props => props.theme.mainBlue};
	padding: 1% 3%;
	border-radius: 40px;
	color: ${props => props.theme.fontColorWhite};
	margin-top: 1%;
`;

const StudyPeriodCont = styled(RowCont)`
	justify-content: space-between;
	width: 20vw;

	@media (max-width: 400px) {
		width: 100%;
	}
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
`;

const StyledContent = styled.p`
	font-size: 1vw;
	text-decoration: ${props => (props.underline ? "underline" : "none")};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : "300")};
	color: ${props =>
		props.fontColor ? props.fontColor : props.theme.fontColor};

	@media (max-width: 400px) {
		font-size: 0.1vw;
	}
`;

const StyledContentWhite = styled(StyledContent)`
	color: ${props => props.theme.fontColorWhite};
`;

const CourseReview = () => {
	const [isLike, setIsLike] = useState(false);
	const navigation = useNavigate();
	const navigateToProfileDetail = userID => {
		navigation("/board/boardWrite/" + userID);
	};

	const _handleLike = () => {
		setIsLike(prev => !prev);
	};

	return (
		<MainCont>
			<RowCont>
				<ProfileImg
					src={""}
					width='6vw'
					height='5vw'
					isShowProfile={true}
					onShowProfile={navigateToProfileDetail}
				/>

				<ReviewInfo>
					<Rating
						name='read-only'
						value={4.5}
						precision={0.5}
						readOnly
						size={"small"}
					/>
					<StyledContent>created at: 07-08-2022</StyledContent>
				</ReviewInfo>
				<LikeCont onClick={_handleLike} isLike={isLike}>
					<LikeIconWrapper>
						<StyledContent
							fontWeight={600}
							fontColor={isLike ? "#fff" : "#000"}>
							Helpful!
						</StyledContent>
						<Image
							src={isLike ? smile : unsmile}
							alt={
								"Smile Icon. Click here if you think this review is helpful."
							}
							style={{
								width: "2vw",
								height: "2vw",
								filter: "brightness(20%)",
							}}
						/>
					</LikeIconWrapper>
					<StyledContent fontWeight={600} fontColor={isLike ? "#fff" : "#000"}>
						23
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
					<AssignmentsWrapper>
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
					</AssignmentsWrapper>
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

export default CourseReview;
