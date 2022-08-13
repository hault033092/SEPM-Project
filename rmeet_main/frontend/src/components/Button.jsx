import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button.attrs(({ disabled }) => ({
	disabled: disabled,
}))`
	width: ${props => (props.style.width ? props.style.width : "100%")};
	height: ${props => (props.style.height ? props.style.height : "auto")};
	padding: ${props =>
		props.style.padding ? props.style.padding : "0.8vh 1vw"};
	font-size: ${props => (props.style.fontSize ? props.style.fontSize : "1vw")};
	font-weight: ${props =>
		props.style.fontWeight ? props.style.fontWeight : "500"};
	text-align: ${props =>
		props.style.textAlign ? props.style.textAlign : "center"};
	border-radius: ${props =>
		props.style.borderRadius ? props.style.borderRadius : "10px"};
	border: none;
	margin: ${props => (props.style.margin ? props.style.margin : "10px 0")};
	opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
	color: #ffffff;
	cursor: pointer;

	background: transparent;
	transition: all 0.3s ease;
	position: relative;
	display: inline-block;
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
		7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
	outline: none;

	background: rgb(230, 0, 40);
	background: linear-gradient(
		0deg,
		rgba(230, 0, 40, 1) 0%,
		rgba(230, 0, 40, 1) 0%,
	);
	&:before {
		height: 0%;
		width: 2px;
	}

	&:hover {
		box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
			-4px -4px 6px 0 rgba(116, 125, 136, 0.5),
			inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
			inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
	}
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
		padding: "0.8vh 1vw",
		width: "100%",
		height: "auto",
		fontSize: "1vw",
		fontWeight: "500",
		textAlign: "center",
		borderRadius: "10px",
	},
};

export default Button;
