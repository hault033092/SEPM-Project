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
import { CurrentUserContext } from "../contexts/CurrentUser";

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

const IconMainCont = styled(FlexContainer)`
	width: 20%;
	justify-content: flex-end;

	@media (max-width: 820px) {
		width: 30%;
	}
`;

const MainCont = styled(FlexContainer)`
	background-color: ${props => props.theme.screenBg};
	border: 0.3vw solid ${props => props.theme.mainBlue};
	border-radius: 3vw;
	flex-direction: column;
	justify-content: space-around;
	padding: 1.5%;
	margin-top: 2%;
	transition: all 0.3s ease;

	&:hover {
		box-shadow: ${props =>
			props.isNavHidden ? "0" : "10px 10px 5px 0px rgba(0, 0, 0, 0.2)"};
		-webkit-box-shadow: ${props =>
			props.isNavHidden ? "0" : "10px 10px 5px 0px rgba(0, 0, 0, 0.2)"};
		-moz-box-shadow: ${props =>
			props.isNavHidden ? "0" : "10px 10px 5px 0px rgba(0, 0, 0, 0.2)"};
		background-color: ${props =>
			props.isNavHidden ? props.theme.screenBg : "rgba(0, 0, 82, 0.09)"};
	}

	@media (max-width: 400px) {
		border: 0.5vw solid ${props => props.theme.mainBlue};
		border-radius: 3vw;
	}
`;

const TitleCont = styled(FlexContainer)`
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	margin: 1%;
	cursor: ${props => (props.isNavHidden ? "default" : "pointer")};
`;

const ContentCont = styled(FlexContainer)`
	width: 100%;
	padding: 1%;
	justify-content: flex-start;
	cursor: ${props => (props.isNavHidden ? "default" : "pointer")};
`;

const IconSubCont = styled(FlexContainer)`
	width: 30%;
	justify-content: space-around;
`;

const IconWrapper = styled(FlexContainer)`
	margin-right: 5%;
	cursor: ${props => (props.isNavHidden ? "default" : "pointer")};
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

const SingleBoard = ({
	post,
	isDetail,
	isNavHidden,
	setModalShow,
	setFocusedPost,
}) => {
	const isMyPost = useRef(null);
	const writerInfo = useRef(null);
	const theme = useContext(ThemeContext);
	const [isLikePost, setIsLikePost] = useState(false);

	const { currentUser } = useContext(CurrentUserContext);

	const navigation = useNavigate();

	useEffect(() => {
		// check whether the post was written by the curren user
		isMyPost.current = true; // post.writerId === currentUser.uid //MEMO
		writerInfo.current = { uid: post.user };
	}, []);

	const _updateNumOfLike = () => {
		setIsLikePost(prev => !prev);
	};

	const _onClickDelete = () => {
		setModalShow(true);
		setFocusedPost(post["_id"]);
	};

	const navigateToDetail = () => {
		if (isNavHidden) {
			return;
		}
		navigation(`/board/${post["_id"]}`); //MEMO
	};

	const navigateToEditPost = () => {
		navigation("/board/create-post", {
			state: { mode: "update", postId: post["_id"] },
		});
	};

	const navigateToProfileDetail = () => {
		navigation("/view-profile/" + post.user);
	};

	return (
		<MainCont className='mainCont' theme={theme} isNavHidden={isNavHidden}>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<ProfileImg
					src={"" /* writer profile img */}
					width='5vw'
					height='5vw'
					isShowProfile={true}
					onShowProfile={navigateToProfileDetail}
				/>
				<TitleCont isNavHidden={isNavHidden}>
					<DropBoxContentWrapper>
						<StyledText weight='600' size='1.3vw' onClick={navigateToDetail}>
							{post.title}
						</StyledText>
						<DropBoxWrapper>
							{isMyPost.current && (
								<DropBox
									onDelete={_onClickDelete}
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
			<ContentCont isNavHidden={isNavHidden} onClick={navigateToDetail}>
				<StyledText weight='300' size='1vw'>
					{isDetail ? post.content : post.content.slice(0, 247) + "..."}
				</StyledText>
			</ContentCont>
			<StyledContainer className='subCont' content='flex-end' width='100%'>
				<IconMainCont>
					<IconSubCont>
						<IconWrapper isNavHidden={isNavHidden} onClick={navigateToDetail}>
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
				</IconMainCont>
			</StyledContainer>
		</MainCont>
	);
};

SingleBoard.propTypes = {
	post: PropTypes.object.isRequired,
	onClick: PropTypes.func,
	isDetail: PropTypes.bool,
	isNavHidden: PropTypes.bool,
	setModalShow: PropTypes.func,
	setFocusedPost: PropTypes.func,
};

SingleBoard.defaultProps = {
	onClick: () => {},
	setFocusedPost: () => {},
	isNavHidden: false,
};

export default SingleBoard;
