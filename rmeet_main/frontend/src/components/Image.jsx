import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImage = styled.img`
	width: ${props => props.style.width};
	height: ${props => props.style.height};
	border-radius: ${props => props.style.borderRadius};
	padding: ${props => props.style.padding};
	object-fit: fill;
	filter: ${props => props.style.filter};
`;

const Image = ({ src, alt, style }) => {
	return <StyledImage src={src} ALT={alt} style={style} />;
};

Image.defaultProps = {
	style: { width: "auto", height: "auto", borderRadius: "0", padding: "auto", filter: "none"},
};

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.object,
};

export default Image;
