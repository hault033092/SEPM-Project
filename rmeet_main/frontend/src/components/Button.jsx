import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button.attrs(({ disabled }) => ({
	disabled: disabled,
}))`
	width: ${props => (props.style.width ? props.style.width : "100%")};
	padding: 0.8vh 1vw;
	font-size: 1.7vw;
	font-weight: 500;
	background-color: ${props =>
		props.style.btnColor ? props.style.btnColor : "#E60028"};
	border-radius: 10px;
	border: none;
	margin: ${props => props.style.margin};
	opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
	color: #ffffff;
`;

const Button = ({ title, onClick, style, disabled }) => {
	return (
		<StyledButton
			type='button'
			value={title}
			onClick={onClick}
			style={style}
			disabled={disabled}>
			{title}
		</StyledButton>
	);
};

Button.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	style: PropTypes.object,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	style: {
		margin: "10px 0",
	},
};

export default Button;
