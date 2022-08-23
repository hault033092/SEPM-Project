import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import camera from "../lib/img/icon/camera.svg";
import user from "../lib/img/icon/user.svg";
import Image from "./Image";
import { FlexContainer } from "./FlexContainer";

const Container = styled(FlexContainer)`
	width: ${props => props.width};
	height: ${props => props.height};
	border-radius: 50%;
	position: relative;
	background-color: ${props => props.theme.lightGrey};
	filter: ${props => (props.isHover ? "brightness(60%)" : "brightness(100%)")};
	cursor: pointer;
`;

const BtnContainer = styled(Container)`
	width: 2vw;
	height: 2vw;
	padding: 5%;
	position: absolute;
	background-color: ${props => props.theme.slideMsg};
	bottom: 0;
	right: 0;
	@media (max-width: 400px) {
		width: 2.5vw;
		height: 2.5vw;
	}
`;

const StyledLabel = styled.label`
	width: 2vw;
	height: 2vw;
	border-radius: 50px;
	cursor: pointer;
`;

const StyledInput = styled.input.attrs(() => ({
	type: "file",
	id: "uploadInput",
	name: "uploadInput",
	accept: "image/*",
}))`
	display: none;
`;

const PhotoButton = ({ onChange, width, height }) => {
	return (
		<>
			<StyledLabel htmlFor='uploadInput'>
				<BtnContainer width={width} height={height}>
					<Image
						src={camera}
						alt={"Camera Icon. Click here to change your profile image."}
						style={{ width: "1.5vw", height: "1.5vw" }}
					/>
				</BtnContainer>
			</StyledLabel>
			<StyledInput onChange={onChange} />
		</>
	);
};

const ProfileImg = ({
	src,
	width,
	height,
	onChangePhoto,
	isShowButton,
	isShowProfile,
	onShowProfile,
}) => {
	const [isHover, setIsHover] = useState(false);

	const _handleOnMouseEnter = () => {
		if (!isShowProfile) {
			return;
		}
		setIsHover(true);
	};

	const _handleMouseLeave = () => {
		if (!isShowProfile) {
			return;
		}
		setIsHover(false);
	};

	const _handleOnClick = () => {
		if (!isShowProfile) {
			return;
		}
		onShowProfile();
	};

	return (
		<Container
			width={width}
			height={height}
			isHover={isHover}
			onClick={_handleOnClick}
			onMouseEnter={_handleOnMouseEnter}
			onMouseLeave={_handleMouseLeave}>
			<Image
				src={src === "" ? user : src}
				alt={"Profile Image"}
				style={{
					width: "90%",
					height: "90%",
					borderRadius: "50%",
					padding: "5%",
				}}
			/>
			{isShowButton && (
				<PhotoButton onChange={onChangePhoto} width={width} height={height} />
			)}
		</Container>
	);
};

ProfileImg.propTypes = {
	src: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	onChangePhoto: PropTypes.func,
	isShowButton: PropTypes.bool,
	isShowProfile: PropTypes.bool,
	onShowProfile: PropTypes.func,
};

ProfileImg.defaultProps = {
	src: user,
	isShowButton: false,
	isShowProfile: false,
	width: "6vw",
	height: "6vw",
	onChangePhoto: () => {},
	onShowProfile: () => {},
};

export default ProfileImg;