import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/*Components */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FlexContainer } from "../components";
import ProfileImg from "../components/ProfileImg";
import DropBox from "./DropBox";

/*Context */
import { CurrentPostContext } from "../contexts/CurrentPost";

/*sample data */
import user from "../lib/img/icon/user.svg";
import { dropBoxInfo } from "../lib/data";

const CursorCont = styled(FlexContainer)`
	pointer: cursor;
`;

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

const TitleCont = styled(CursorCont)`
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	margin: 1%;
	cursor: pointer;
`;

const ContentCont = styled(CursorCont)`
	padding: 1%;
	cursor: pointer;
`;

const IconSubCont = styled(FlexContainer)`
	width: 30%;
	justify-content: space-around;
`;

const IconWrapper = styled(CursorCont)`
	margin-right: 5%;
`;

const MainCont = styled(FlexContainer)`
	background-color: ${props => props.theme.screenBg};
	border: 10px solid ${props => props.theme.mainBlue};
	border-radius: 50px;
	flex-direction: column;
	justify-content: space-around;
	padding: 3%;
	margin-top: 2%;
`;

const StyledText = styled.p`
	font-weight: ${props => props.weight};
	font-size: ${props => props.size};
	color: ${props => (props.color ? props.color : "#00000")};
	margin: ${props => (props.margin ? props.margin : "0")};
`;

const SingleBoard = ({ userID, post, isDetail }) => {
	const isMyPost = useRef(post.writerID === userID);
	const userInfo = useRef(user);
	const theme = useContext(ThemeContext);
	const { setCurrentPost } = useContext(CurrentPostContext);
	const [isShowDropBox, setIsShowDropBox] = useState(false);
	const [isLikePost, setIsLikePost] = useState(false);

	const navigation = useNavigate();

	const _getUserInfo = () => {
		// get user profile from API by userID
		return { profileImg: "", likedPostsIDs: ["111", "222", "333"] };
	};

	const _updateNumOfLike = () => {
		console.log("update!");
		setIsLikePost(prev => !prev);
	};

	const _handleOnClick = () => {
		setIsShowDropBox(true);
	};

	const _handleOnMouseLeave = () => {
		setIsShowDropBox(false);
	};

	const handleNav = () => {
		setCurrentPost(post);
		navigation("/board/detail");
	};

	useEffect(() => {
		userInfo.current = _getUserInfo();
		if (userInfo.current.likedPostsIDs.includes(post.postID)) {
			setIsLikePost(true);
		}
	}, []);

	return (
		<MainCont className='mainCont' theme={theme}>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<ProfileImg
					src={userInfo.current.profileImg}
					width='5vw'
					height='5vw'
					isDropBox
				/>
				<TitleCont onClick={handleNav}>
					<StyledText weight='600' size='1.3vw'>
						{post.title}
					</StyledText>
					<StyledText weight='100' size='0.8vw'>
						Created at: {post.createdAt}
					</StyledText>
				</TitleCont>
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
			<ContentCont onClick={handleNav}>
				<StyledText weight='300' size='1vw'>
					{isDetail ? post.content : post.content.slice(0, 247) + "..."}
				</StyledText>
			</ContentCont>

			<StyledContainer className='subCont' content='flex-end' width='100%'>
				<StyledContainer
					className='IconMainCont'
					width='20%'
					content='flex-end'>
					<IconSubCont>
						<IconWrapper onClick={handleNav}>
							<FontAwesomeIcon
								icon={regular("comment")}
								fontSize='2vw'
								color={theme.commentGreen}
							/>
						</IconWrapper>
						<StyledText weight={700} size='1vw' color={theme.commentGreen}>
							{post.numOfComment}
						</StyledText>
					</IconSubCont>
					<IconSubCont onClick={_updateNumOfLike}>
						<IconWrapper>
							{isLikePost ? (
								<FontAwesomeIcon
									icon={solid("heart")}
									fontSize='2vw'
									color={theme.heartPink}
								/>
							) : (
								<FontAwesomeIcon
									icon={regular("heart")}
									fontSize='2vw'
									color={theme.heartPink}
								/>
							)}
						</IconWrapper>
						<StyledText weight={700} size='1vw' color={theme.heartPink}>
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
