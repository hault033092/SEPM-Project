import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 100%;
	font-weight: 600;
	margin: 5px;
	color: ${props => props.color};
`;

const ValidationMessage = ({ message, color }) => {
	return <StyledText color={color}>{message}</StyledText>;
};

ValidationMessage.propTypes = {
	message: PropTypes.string.isRequired,
	color: PropTypes.string,
};

ValidationMessage.defaultProps = {
	color: "#E60028",
};

export default ValidationMessage;
