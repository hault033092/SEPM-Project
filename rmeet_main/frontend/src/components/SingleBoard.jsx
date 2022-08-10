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

const CursorCont = styled(FlexContainer)`
	cursor: pointer;
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
	padding: 1.5%;
	margin-top: 2%;
	z-index: -1;
`;

const StyledText = styled.p`
	font-weight: ${props => props.weight};
	font-size: ${props => props.size};
	color: ${props => (props.color ? props.color : "#00000")};
	margin: ${props => (props.margin ? props.margin : "0")};
`;

const DropBoxContentWrapper = styled(FlexContainer)`
	justify-content: space-between;
	width: 100%;
`;

const DropBoxWrapper = styled(FlexContainer)`
	width: 4vw;
	height: 2vw;
`;

const SingleBoard = ({ userID, post, isDetail }) => {
	const isMyPost = useRef(post.writerID === userID);
	const userInfo = useRef(user);
	const theme = useContext(ThemeContext);
	const { setCurrentPost } = useContext(CurrentPostContext);
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

	const navigateToDetail = () => {
		setCurrentPost(post);
		navigation("/board/detail");
	};

	const navigateToEditPost = () => {
		navigation("/board/boardWrite");
	};

	const navigateToProfileDetail = (userID) => {
		navigation("/board/boardWrite" + userID);
	}

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
					isShowProfile={true}
					onShowProfile={navigateToProfileDetail}
				/>
				<TitleCont>
					<DropBoxContentWrapper>
						<StyledText weight='600' size='1.3vw' onClick={navigateToDetail}>
							{post.title}
						</StyledText>
						<DropBoxWrapper>
							{isMyPost.current && (
								<DropBox
									onDelete={navigateToEditPost}
									onEdit={navigateToEditPost}
								/>
							)}
						</DropBoxWrapper>
					</DropBoxContentWrapper>
					<StyledText weight='100' size='0.8vw'>
						Created at: {post.createdAt}
					</StyledText>
				</TitleCont>
			</StyledContainer>
			<ContentCont onClick={navigateToDetail}>
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
						<IconWrapper onClick={navigateToDetail}>
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
