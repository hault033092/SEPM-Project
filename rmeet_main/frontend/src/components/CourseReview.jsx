import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/*Components */
import { FlexContainer } from "../components";
import ProfileImg from "./ProfileImg";
import Rating from "@mui/material/Rating";
import Image from "./Image";
import smile from "../lib/img/icon/smile.svg";
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
	border-radius: 40px;
	flex-direction: column;
	padding: 1%;
  margin-bottom: 3%;
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
	width: 15%;
	color: ${props => props.theme.fontColorWhite};
	justify-content: space-around;
	align-items: center;
`;

const CommentCont = styled(RowCont)`
	border: 3px solid ${props => props.theme.darkGrey};
	border-radius: 40px;
	color: ${props => props.theme.fontColor};
	padding: 0.5% 1%;
`;

const CourseInfoSubCont = styled(RowCont)`
	justify-content: space-between;
	color: ${props => props.theme.darkX2Grey};
`;

const AssignmentsWrapper = styled(ColCont)``;

const AssignmentCont = styled(CourseInfoSubCont)`
	background-color: ${props => props.theme.mainBlue};
	padding: 1% 3%;
	border-radius: 40px;
	color: ${props => props.theme.fontColorWhite};
`;

const StudyPeriodCont = styled(RowCont)`
	justify-content: space-between;
	width: 20vw;
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
  text-decoration: ${props => props.underline ? "underline" : "none"};
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
					width='3vw'
					height='3vw'
					isShowProfile={true}
					onShowProfile={navigateToProfileDetail}
				/>
				<ReviewInfo>
					<Rating name='read-only' value={4.5} precision={0.5} readOnly />
					<StyledContent>created at: 07-08-2022</StyledContent>
				</ReviewInfo>
				<LikeCont onClick={_handleLike} isLike={isLike}>
					<StyledContent>Helpful!</StyledContent>
					<RowCont>
						<Image
							src={smile}
							alt={
								"Smile Icon. Click here if you think this review is helpful."
							}
							style={{ width: "1.5vw", height: "1.5vw" }}
						/>
						<StyledContent>23</StyledContent>
					</RowCont>
				</LikeCont>
			</RowCont>
			<StudyPeriodCont>
				<StyledTitle>Studied it in the </StyledTitle>
				<StyledContent underline>2nd semester, 2022</StyledContent>
			</StudyPeriodCont>
			<ColCont>
				<StyledTitle>Comments</StyledTitle>
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
					<StyledTitle>Assignment</StyledTitle>
					<AssignmentsWrapper>
						<AssignmentCont>
							<StyledContent>Quiz</StyledContent>
							<StyledContent>10</StyledContent>
						</AssignmentCont>
						<AssignmentCont>
							<StyledContent>Essay</StyledContent>
							<StyledContent>2</StyledContent>
						</AssignmentCont>
						<AssignmentCont>
							<StyledContent>Presentation</StyledContent>
							<StyledContent>1</StyledContent>
						</AssignmentCont>
					</AssignmentsWrapper>
				</ColCont>
				<ColCont>
					<StyledTitle>Course Info</StyledTitle>
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
