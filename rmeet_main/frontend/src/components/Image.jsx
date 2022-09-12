import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImage = styled.img`
	width: ${props => (props.style.width ? props.style.width : "auto")};
	height: ${props => (props.style.height ? props.style.height : "auto")};
	border-radius: ${props =>
		props.style.borderRadius ? props.style.borderRadius : "0"};
	border: ${props => (props.style.border ? props.style.border : "none")};
	padding: ${props => (props.style.padding ? props.style.padding : "auto")};
	outline: ${props => (props.style.outline ? props.style.outline : "none")};
	filter: ${props => (props.style.filter ? props.style.filter : "none")};
`;

const Image = ({ src, alt, style }) => {
	return <StyledImage src={src} ALT={alt} style={style} />;
};

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.object,
};

Image.defaultProps = {
	style: {
		width: "auto",
		height: "auto",
		borderRadius: "0",
		border: "none",
		padding: "auto",
		outline: "none",
		filter: "none",
	},
};

export default Image;
