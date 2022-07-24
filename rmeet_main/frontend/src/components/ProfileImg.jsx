import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Image from "./Image";

const Container = styled.div`
	width: 10vw;
	height: 10vw;
	border-radius: 50%;
	position: relative;
	background-color: #ccc;
`;

const BtnContainer = styled(Container)`
	width: 5vw;
	height: 5vw;
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledLabel = styled.label`
	width: 5vw;
	height: 3vh;
	border-radius: 50px;
	cursor: pointer;
`;

const StyledInput = styled.input.attrs(({}) => ({
	type: "file",
	id: "uploadInput",
	name: "uploadInput",
	accept: "image/*",
}))`
	display: none;
`;

const PhotoButton = ({ onChange, iconSize }) => {
	return (
		<>
			<StyledLabel htmlFor='uploadInput'>
				<BtnContainer>
					<FontAwesomeIcon icon={solid("camera")} size={iconSize} />
				</BtnContainer>
			</StyledLabel>
			<StyledInput onChange={onChange} />
		</>
	);
};

const ProfileImg = ({ src, onChangePhoto, screenWidth, isShowButton }) => {
	const iconSize = useRef(null);

	useEffect(() => {
		if (screenWidth <= 500) {
			iconSize.current = "2xs";
		} else if (screenWidth <= 950) {
			iconSize.current = "1x";
		} else if (screenWidth <= 1300) {
			iconSize.current = "2x";
		} else if (screenWidth <= 2000) {
			iconSize.current = "3x";
		} else {
			iconSize.current = "4x";
		}
	}, [screenWidth]);

	return (
		<Container>
			<Image
				src={src}
				alt={"Profile Image"}
				style={{
					width: "10vw",
					height: "10vw",
					borderRadius: "50%",
					padding: "5%",
				}}
			/>
			{isShowButton && (
				<PhotoButton onChange={onChangePhoto} iconSize={iconSize.current} />
			)}
		</Container>
	);
};

ProfileImg.propTypes = {
	src: PropTypes.string.isRequired,
	onChangePhoto: PropTypes.func.isRequired,
	screenWidth: PropTypes.number,
	isShowButton: PropTypes.bool,
};

export default ProfileImg;
