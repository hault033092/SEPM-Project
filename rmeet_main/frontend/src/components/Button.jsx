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
	background-color: ${props =>
		props.style.btnColor ? props.style.btnColor : props.theme.mainRed};
	border-radius: ${props =>
		props.style.borderRadius ? props.style.borderRadius : "10px"};
	border: none;
	margin: ${props => (props.style.margin ? props.style.margin : "10px 0")};
	opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
	color: #ffffff;
	cursor: pointer;
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
		btnColor: "#E60028",
		width: "100%",
		height: "auto",
		fontSize: "1vw",
		fontWeight: "500",
		textAlign: "center",
		borderRadius: "10px",
	},
};

export default Button;
