import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { user, camera } from "../lib/img/icon/";
import Image from "./Image";

const Container = styled.div`
	width: ${props => props.width};
	height: ${props => props.height};
	border-radius: 50%;
	border: ${props => props.border};
	position: relative;
	background-color: ${props => props.theme.lightGrey};
`;

const BtnContainer = styled(Container)`
	width: 2vw;
	height: 2vw;
	padding: 5%;
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: ${props => props.theme.slideMsg};
	display: flex;
	justify-content: center;
	align-items: center;
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
						width={width} height={height}
					/>
				</BtnContainer>
			</StyledLabel>
			<StyledInput onChange={onChange} />
		</>
	);
};

const ProfileImage = ({ src, width, height, onChangePhoto, isShowButton }) => {
	return (
		<Container width={width} height={height}>
			<Image
				src={src}
				alt={"Profile Image"}
				style={{
					width,
					height,
					borderRadius: "50%",
					border: "0.2rem solid #FFFFFF",
					padding: "5%",
					outline: "0.2rem solid red"
				}}
			/>
			{isShowButton && (
				<PhotoButton onChange={onChangePhoto} width={width} height={height} />
			)}
		</Container>
	);
};

ProfileImage.propTypes = {
	src: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	onChangePhoto: PropTypes.func,
	isShowButton: PropTypes.bool,
};

ProfileImage.defaultProps = {
	src: user,
	isShowButton: false,
	onChangePhoto: () => {},
	width: "6vw",
	height: "6vw",
};

export default ProfileImage;