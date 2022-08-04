import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImage = styled.img`
	width: ${props => props.style.width};
	height: ${props => props.style.height};
	border-radius: ${props => props.style.borderRadius};
	border: ${props => props.style.border};
	padding: ${props => props.style.padding};
	outline: ${props => props.style.outline};
	
`;

const Image = ({ src, alt, style }) => {
	return <StyledImage src={src} ALT={alt} style={style} />;
};

Image.defaultProps = {
	style: { width: "auto", height: "auto", borderRadius: "0", border: "none", padding: "auto", outline: "none" },
};

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.object,
};

export default Image;