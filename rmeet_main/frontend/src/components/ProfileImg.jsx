import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DefaultImg from "../lib/img/user.svg";
import Image from "./Image";

const Container = styled.div`
	width: ${props => (props.width ? props.width : "5vw")};
	height: ${props => (props.height ? props.height : "5vw")};
	border-radius: 50%;
	position: relative;
	background-color: #ccc;
`;

const BtnContainer = styled(Container)`
	width: ${props => (props.width ? props.width : "5vw")};
	height: ${props => (props.height ? props.height : "5vw")};
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

const PhotoButton = ({ onChange, iconSize, width, height }) => {
	return (
		<>
			<StyledLabel htmlFor='uploadInput'>
				<BtnContainer width={width} height={height}>
					<FontAwesomeIcon icon={solid("camera")} size={iconSize} />
				</BtnContainer>
			</StyledLabel>
			<StyledInput onChange={onChange} />
		</>
	);
};

const ProfileImg = ({
	screenWidth,
	src,
	width,
	height,
	onChangePhoto,
	isShowButton,
}) => {
	const iconSize = useRef(null);

	useEffect(() => {
		if (screenWidth === 0) {
			return;
		}

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
		<Container width={width} height={height}>
			<Image
				src={src}
				alt={"Profile Image"}
				style={{
					width,
					height,
					borderRadius: "50%",
					padding: "5%",
				}}
			/>
			{isShowButton && (
				<PhotoButton
					onChange={onChangePhoto}
					iconSize={iconSize.current}
					width={width}
					height={height}
				/>
			)}
		</Container>
	);
};

ProfileImg.propTypes = {
	screenWidth: PropTypes.number,
	src: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	onChangePhoto: PropTypes.func,
	isShowButton: PropTypes.bool,
};

ProfileImg.defaultProps = {
	screenWidth: 0,
	src: DefaultImg,
	isShowButton: false,
	onChangePhoto: () => {},
	width: "10vw",
	height: "10vw",
};

export default ProfileImg;
