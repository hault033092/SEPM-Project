import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 2vw;
	margin: 5px;
	color: ${props => props.color};
`;

const validationMessage = ({ message, color }) => {
	return <StyledText color={color}>{message}</StyledText>;
};

validationMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

export default validationMessage;
