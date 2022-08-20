import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Course from "../../components/Course";

/*Components */
import { FlexContainer } from "../../components";
import CourseReview from "../../components/CourseReview";

const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	padding: 1%;
`;

const ContentWrapper = styled(FlexContainer)`
	width: 100%;
	flex-direction: column;
`;

const ReviewCont = styled.div`
	height: 70vh;
	overflow-y: scroll;
	width: 100%;
	margin-top: 3%;
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

const CourseDetail = ({ courseID }) => {
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
					<CourseReview />
					<CourseReview />
					<CourseReview />
					<CourseReview />
				</ReviewCont>
			</ContentWrapper>
		</Screen>
	);
};

export default CourseDetail;
