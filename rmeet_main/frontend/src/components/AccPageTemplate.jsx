import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FlexContainer } from "./FlexContainer";
import AutoSlideshow from "./AutoSlideshow";
import MainLogo from "./MainLogo";

/* Data */
import logoNoTitle from "../lib/img/illustration/logoNoTitle.svg";
import getTeammates from "../lib/img/illustration/getTeammates.svg";
import sendMessage from "../lib/img/illustration/sendMessage.svg";
import createReview from "../lib/img/illustration/createReview.svg";

/* Styled Components */
const MainCont = styled(FlexContainer)`
	width: 80vw;
	height: 90vh;
	margin: 5vh auto;
	background-color: ${props => props.theme.screenColor};
	@media (max-width: 820px) {
		width: 70vw;
		flex-direction: column;
	}
`;

const SideCont = styled(FlexContainer)`
	width: 90%;
	flex-direction: column;
	justify-content: space-between;
	margin-right: 5vw;
`;

const InputCont = styled(FlexContainer)`
	flex-direction: column;
	width: ${props => (props.isCreateAccount ? "100%" : "70%")};
	height: ${props => (props.isCreateAccount ? "100%" : "90%")};
	padding: 3%;
	background-color: ${props => props.theme.mainBlue};
	border-radius: 30px;
`;

const StyledTitle = styled.p`
	color: ${props => props.theme.fontColorWhite};
	font-weight: 700;
	font-size: 2.5vw;
	margin: 2vw;
`;

/* Data */
const imagesData = [
	{ src: logoNoTitle, desc: "Private community\n for \n only RMIT" },
	{ src: getTeammates, desc: "Ask help\n and\n share information!" },
	{ src: sendMessage, desc: "Send message!" },
	{
		src: createReview,
		desc: "Create a course review!",
	},
];

const AccPageTemplate = ({ children, pageTitle, isCreateAccount }) => {
	return (
		<MainCont>
			<SideCont>
				<MainLogo width='30vw' height='30vh' />
				<AutoSlideshow images={imagesData} delayTime={4000} />
			</SideCont>
			<InputCont isCreateAccount={isCreateAccount}>
				<StyledTitle>{pageTitle}</StyledTitle>
				{children}
			</InputCont>
		</MainCont>
	);
};

AccPageTemplate.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	isCreateAccount: PropTypes.bool,
};

export default AccPageTemplate;
