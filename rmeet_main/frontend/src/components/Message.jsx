import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FlexContainer } from "./FlexContainer";
import Image from "./Image";
import detailArrow from "../lib/img/icon/detailArrow.svg";

const MainCont = styled(FlexContainer)`
	width: 100%;
	border: 0.35vw solid ${props => props.theme.mainBlue};
	border-radius: 40px;
	margin-bottom: 3%;
	padding: 1%;
	padding-left: 3%;
	cursor: ${props => (props.isNavHidden ? "default" : "pointer")};
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
		-webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
		background-color: ${props =>
			props.isNavHidden ? props.theme.screenBg : "rgba(0, 0, 82, 0.037)"};
	}

	@media (max-width: 400px) {
		border: 0.5vw solid ${props => props.theme.mainBlue};
		border-radius: 30px;
	}
`;

const MessageWrapper = styled(FlexContainer)`
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
`;

const StyledName = styled.p`
	font-size: 1vw;
	font-weight: 600;
`;

const StyledMessage = styled.p`
	font-size: 0.7vw;
	font-weight: 300;
	margin-top: 1%;
`;

const StyledTime = styled.p`
	font-size: 0.6vw;
	color: #4b4b4b;
	align-self: flex-end;
`;

const Message = ({ recipient, lastMessage, onNavigate }) => {
	return (
		<MainCont onClick={onNavigate}>
			<MessageWrapper>
				<StyledName>{recipient}</StyledName>
				<StyledMessage>{lastMessage}</StyledMessage>
				<StyledTime>14:34, 08-07-2022</StyledTime>
			</MessageWrapper>
			<Image
				src={detailArrow}
				alt={"Navigate user to chat page"}
				style={{
					width: "2vw",
					height: "3vw",
				}}
			/>
		</MainCont>
	);
};

Message.propTypes = {
	recipient: PropTypes.string.isRequired,
	lastMessage: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

Message.defaultProps = {};

export default Message;
