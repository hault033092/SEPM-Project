import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button.attrs(({ disabled }) => ({
	disabled: disabled,
}))`
	width: ${props => props.style.width};
	padding: ${props => props.style.padding};
	font-size: ${props => props.style.fontSize};
	font-weight: 500;
	background-color: ${props => props.style.btnColor};
	border-radius: ${props => props.style.borderRadius};
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
	onClick: PropTypes.func,
	style: PropTypes.object,
	disabled: PropTypes.bool,
};

Button.defaultProps = {
	style: {
		margin: "10px 0",
		btnColor: "#E60028",
		width: "100%",
		padding: "0.8vh 1vw",
		fontSize: "1.5vw",
		borderRadius: "10px",
	},
};

export default Button;
