import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 2vw;
	margin: 5px;
	color: #E60028;
`;

const ErrorMessage = ({ message }) => {
	return <StyledText>{message}</StyledText>;
};

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

export default ErrorMessage;
