import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { theme } from "../lib/style/theme";

const StyledText = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 1vw;
	font-weight: 400;
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
	color: theme.mainRed,
};

export default ValidationMessage;
