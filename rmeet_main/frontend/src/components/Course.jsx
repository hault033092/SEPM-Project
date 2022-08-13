import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/*Components */
import { FlexContainer } from "../components";
import Image from "./Image";
import detailArrow from "../lib/img/icon/detailArrow.svg";
import Rating from "@mui/material/Rating";

const MainCont = styled(FlexContainer)`
	width: 100%;
	border: 0.5vw solid ${props => props.theme.mainBlue};
	border-radius: 40px;
	margin-bottom: 3%;
	padding: 1%;
	padding-left: 3%;
	cursor: pointer;
`;

const SubCont = styled(FlexContainer)``;

const DetailIconWrapper = styled(FlexContainer)`
	width: 10%;
`;

const ContentCont = styled(FlexContainer)`
	width: 75%;
	flex-direction: column;
	align-items: flex-start;
`;

const RateCont = styled(FlexContainer)`
	width: auto;
	align-self: flex-start;
	justify-content: space-between;
`;

const StyledTitle = styled.p`
	font-size: 1.5vw;
	font-weight: 800;
	margin-bottom: 3%;
`;

const StyledContent = styled.p`
	font-size: 1vw;
`;

const Course = ({
	courseID,
	courseName,
	LecturerName,
	rateValue,
	isNavHidden,
}) => {
	const navigation = useNavigate();

	const _handleOnClick = () => {
		// send courseID
		if (isNavHidden) {
			return;
		}
		navigation("/course/detail");
	};

	return (
		<MainCont onClick={_handleOnClick}>
			<ContentCont>
				<StyledTitle>{courseName}</StyledTitle>
				<StyledContent>{LecturerName}</StyledContent>
			</ContentCont>
			<RateCont>
				<Rating name='read-only' value={rateValue} precision={0.5} readOnly />
				<StyledContent>{rateValue}</StyledContent>
			</RateCont>
			{isNavHidden || (
				<DetailIconWrapper>
					<Image
						src={detailArrow}
						alt={"Navigate user to course review detail page"}
						style={{
							width: "2vw",
							height: "3vw",
						}}
					/>
				</DetailIconWrapper>
			)}
		</MainCont>
	);
};

Course.propTypes = {
	courseID: PropTypes.string.isRequired,
	courseName: PropTypes.string.isRequired,
	LecturerName: PropTypes.string.isRequired,
	rateValue: PropTypes.number.isRequired,
	isNavHidden: PropTypes.bool,
};

Course.defaultProps = {
	isNavHidden: false,
};

export default Course;
