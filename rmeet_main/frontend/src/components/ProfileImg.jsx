import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import camera from "../lib/img/icon/camera.svg";
import userDefault from "../lib/img/icon/user.svg";
import Image from "./Image";
import { FlexContainer } from "./FlexContainer";
import { useEffect } from "react";

const Container = styled(FlexContainer)`
	width: ${props => props.width};
	height: ${props => props.height};
	border-radius: 50%;
	position: relative;
	background: ${props => props.theme.slideMsg};
	filter: ${props => (props.isHover ? "brightness(60%)" : "brightness(100%)")};
	cursor: pointer;
`;

const BtnContainer = styled(Container)`
	width: 2vw;
	height: 2vw;
	padding: 5%;
	position: absolute;
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

const PhotoButton = ({ onUploadPhoto, setImgSrc, width, height }) => {
	const _onUploadPhoto = async e => {
		const {
			target: { files },
		} = e;

		const theFile = files[0];
		const reader = new FileReader();

		reader.onloadend = readDataCompleted => {
			const {
				currentTarget: { result },
			} = readDataCompleted;
			setImgSrc(result);
		};
		reader.readAsDataURL(theFile);

		const res = await onUploadPhoto(e);
	};

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
			<StyledInput onChange={_onUploadPhoto} />
		</>
	);
};

const ProfileImg = ({
	src,
	width,
	height,
	onUploadPhoto,
	isShowButton,
	isShowProfile,
	onShowProfile,
}) => {
	const [isHover, setIsHover] = useState(false);
	const [imgSrc, setImgSrc] = useState("");

	useEffect(() => {
		setImgSrc(src === "" ? userDefault : src);
	}, []);

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
				src={imgSrc}
				alt={"Profile Image"}
				style={{
					width: "100%",
					height: "100%",
					borderRadius: "50%",
					padding: "5%",
				}}
			/>
			{isShowButton && (
				<PhotoButton
					onUploadPhoto={onUploadPhoto}
					setImgSrc={setImgSrc}
					width={width}
					height={height}
				/>
			)}
		</Container>
	);
};

ProfileImg.propTypes = {
	src: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	onUploadPhoto: PropTypes.func,
	isShowButton: PropTypes.bool,
	isShowProfile: PropTypes.bool,
	onShowProfile: PropTypes.func,
};

ProfileImg.defaultProps = {
	src: userDefault,
	isShowButton: false,
	isShowProfile: false,
	width: "6vw",
	height: "6vw",
	onUploadPhoto: () => {},
	onShowProfile: () => {},
};

export default ProfileImg;
