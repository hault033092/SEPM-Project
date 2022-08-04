import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ProfileImg } from "../components";
import DropBox from "./DropBox";
import user from "../lib/img/icon/user.svg";
import { dropBoxInfo } from "../lib/data";

const StyledContainer = styled.div`
	display: ${props => (props.display ? props.display : "flex")};
	width: ${props => (props.width ? props.width : "auto")};
	height: ${props => (props.height ? props.height : "auto")};
	margin: ${props => (props.margin ? props.margin : "0")};
	padding: ${props => (props.padding ? props.padding : "auto")};
	flex-direction: ${props => (props.direction ? props.direction : "row")};
	justify-content: ${props => (props.content ? props.content : "center")};
	align-items: ${props => (props.items ? props.items : "center")};
	align-self: ${props => (props.self ? props.self : "center")};
`;

const IconSubCont = styled(StyledContainer)`


`;

const MainCont = styled(StyledContainer)`
	background-color: ${props => props.theme.forumBg};
	border: 3px solid ${props => props.theme.mainBlue};
`;

const StyledText = styled.p`
	font-weight: ${props => props.weight};
	font-size: ${props => props.size};
	color: ${props => (props.color ? props.color : "#00000")};
	margin: ${props => (props.margin ? props.margin : "0")};
`;

const SingleBoard = ({ userID, post, onClick, isDetail }) => {
	const isMyPost = useRef(post.writerID === userID);
	const userInfo = useRef(user);
	const theme = useContext(ThemeContext);
	const [isShowDropBox, setIsShowDropBox] = useState(false);
	const [isLikePost, setIsLikePost] = useState(false);

	const _getUserInfo = () => {
		// get user profile from API by userID
		return { profileImg: "", likedPostsIDs: ["111", "222", "333"] };
	};

	const _updateNumOfSmile = () => {
		console.log("update!");
		setIsLikePost(prev => !prev);
	};

	const _handleOnClick = () => {
		setIsShowDropBox(true);
	};

	const _handleOnMouseLeave = () => {
		setIsShowDropBox(false);
	};

	useEffect(() => {
		userInfo.current = _getUserInfo();

		if (userInfo.current.likedPostsIDs.includes(post.postID)) {
			setIsLikePost(true);
		}
	}, []);

	return (
		<MainCont
			className='mainCont'
			direction='column'
			content='space-around'
			padding='10px 20px'
			margin='10px 0 0 0'
			theme={theme}>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<ProfileImg
					src={userInfo.current.profileImg}
					width='5vw'
					height='5vw'
					isDropBox
				/>
				<StyledContainer
					className='titleCont'
					direction='column'
					items='flex-start'
					width='100%'
					margin='0 0 0 20px'
					onClick={onClick}>
					<StyledText weight='600' size='1.3vw' margin='20px 0 0 0'>
						{post.title}
					</StyledText>
					<StyledText weight='100' size='0.8vw'>
						Created at: {post.createdAt}
					</StyledText>
				</StyledContainer>
				<StyledContainer
					width='auto'
					content='flex-start'
					self='flex-start'
					display={isMyPost.current ? "flex" : "none"}
					onClick={_handleOnClick}
					onMouseLeave={_handleOnMouseLeave}>
					<FontAwesomeIcon icon={solid("ellipsis-vertical")} fontSize='1.5vw' />
					{isShowDropBox && <DropBox options={dropBoxInfo[1]} />}
				</StyledContainer>
			</StyledContainer>
			<StyledContainer className='subCont' padding='1%'>
				<StyledText weight='300' size='1vw'>
					{isDetail ? post.content : post.content.slice(0, 247) + "..."}
				</StyledText>
			</StyledContainer>
			<StyledContainer className='subCont' content='flex-end' width='100%'>
				<StyledContainer
					className='IconMainCont'
					width='20%'
					content='flex-end'>
					<IconSubCont
						className='IconSubCont'
						width='auto'
						margin='0 25px 0 0'
						onClick={onClick}>
						<StyledContainer width='auto' margin='0 10px 0 0'>
							<FontAwesomeIcon
								icon={regular("comment")}
								fontSize='2vw'
								color={theme.tagBlue}
							/>
						</StyledContainer>
						<StyledText weight={500} size='1vw' color={theme.tagBlue}>
							{post.numOfComment}
						</StyledText>
					</IconSubCont>
					<IconSubCont
						className='IconSubCont'
						width='auto'
						onClick={_updateNumOfSmile}>
						<StyledContainer width='auto' margin='0 10px 0 0'>
							{isLikePost ? (
								<FontAwesomeIcon
									icon={solid("face-smile")}
									fontSize='2vw'
									color={theme.mainRed}
								/>
							) : (
								<FontAwesomeIcon
									icon={regular("face-smile")}
									fontSize='2vw'
									color={theme.mainRed}
								/>
							)}
						</StyledContainer>
						<StyledText weight={500} size='1vw' color={theme.mainRed}>
							{post.numOfLike}
						</StyledText>
					</IconSubCont>
				</StyledContainer>
			</StyledContainer>
		</MainCont>
	);
};

SingleBoard.propTypes = {
	userID: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	onClick: PropTypes.func,
	isDetail: PropTypes.bool,
};

SingleBoard.defaultProps = {
	onClick: () => {},
};

export default SingleBoard;
