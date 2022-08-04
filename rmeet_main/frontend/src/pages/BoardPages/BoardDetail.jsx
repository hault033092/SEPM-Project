import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SingleBoard from "../../components/SingleBoard";
import ProfileImg from "../../components/ProfileImg";
import { Button, FlexContainer, Input } from "../../components";
import { samplePostList, sampleCurrentUser, dropBoxInfo } from "../../lib/data";
import DropBox from "../../components/DropBox";

const EditCommentWrapper = styled(FlexContainer)`
	flex-direction: column;
	width: 100%;
`;

const EditBtnWrapper = styled(FlexContainer)`
	width: 100%;
	justify-content: flex-end;
`;

const EditComment = ({ oldComment, handleOnCancel }) => {
	const [value, setValue] = useState(oldComment);

	const _handleOnSubmit = () => {
		console.log("reload website to display a list of comments");
	};

	const _handleValueChange = e => {
		setValue(e.target.value);
	};

	return (
		<EditCommentWrapper>
			<Input
				value={value}
				maxLength={256}
				onChange={_handleValueChange}
				onKeyPress={_handleOnSubmit}
				isLabelHidden
				isMultipleLine
			/>
			<EditBtnWrapper>
				<Button title='CANCEL' onClick={handleOnCancel} />
				<Button title='SAVE' onClick={_handleOnSubmit} />
			</EditBtnWrapper>
		</EditCommentWrapper>
	);
};

const CommentWrapper = styled(FlexContainer)`
	width: 100%;
`;

const DropBoxWrapper = styled(FlexContainer)``;

const TextWrapper = styled(FlexContainer)`
	background-color: ${props => props.theme.darkGrey};
	border-radius: 50px;
	padding: 3%;
	width: 90%;
	justify-content: flex-start;
	margin-right: 5%;
`;

const StyledText = styled.p`
	font-size: 1vw;
`;

const Comment = ({ commentInfo, isCurrentUserComment }) => {
	const writerInfo = useRef("");
	const [isShow, setIsShow] = useState(false);
	const [isEdit, setEdit] = useState(false);

	const _onShowDropBox = () => {
		if (isEdit) {
			return;
		}

		setIsShow(true);
	};

	const _onUnshowDropBox = () => {
		setIsShow(false);
	};

	const _handleEdit = () => {
		setEdit(true);
		setIsShow(false);
	};

	const _handleOnCancel = () => {
		setEdit(false);
		setIsShow(false);
	};

	const _onEditSubmit = () => {};

	const options = {
		0: {
			title: "Edit comment",
			onClick: _handleEdit,
		},
		1: {
			title: "Delete comment",
			onClick: _handleEdit,
		},
	};

	const getCommentWriterInfo = () => {
		// get comment writer's profile image from API
		// writer id = commentInfo.writerID
		// const {username, profileImg} = fetch(``);
		// const userInfo = {username, profileImg}
		return { username: "cornsoup", profileImg: "" };
	};
	useEffect(() => {
		writerInfo.current = getCommentWriterInfo();
	}, []);

	return (
		<CommentWrapper>
			<ProfileImg
				src={writerInfo.current.profileImg}
				width='4.5vw'
				height='4.5vw'
				isDropBox
			/>
			{isEdit ? (
				<EditComment
					oldComment={commentInfo.content}
					handleOnCancel={_handleOnCancel}
				/>
			) : (
				<TextWrapper>
					<StyledText>{writerInfo.current.username}</StyledText>
					<StyledText>{commentInfo.content}</StyledText>
					<StyledText>{commentInfo.createdAt}</StyledText>
				</TextWrapper>
			)}

			{isCurrentUserComment && !isEdit && (
				<DropBoxWrapper
					onClick={_onShowDropBox}
					onMouseLeave={_onUnshowDropBox}>
					<FontAwesomeIcon icon={solid("ellipsis-vertical")} fontSize='1.5vw' />
					{isShow && <DropBox options={options} />}
				</DropBoxWrapper>
			)}
		</CommentWrapper>
	);
};

const Nav = styled(FlexContainer)`
	width: 20%;
	height: 100%;
`;

const Screen = styled(FlexContainer)`
	width: 70%;
	height: 100%;
	margin: 5% 0;
	flex-direction: column;
	border: 3px solid tomato;
`;

const CommentsWrapper = styled(FlexContainer)`
	flex-direction: column;
	width: 100%;
`;

const InputWrapper = styled(FlexContainer)`
	width: 100%;
`;
const BoardDetail = ({
	userID = sampleCurrentUser.userID,
	post = samplePostList[0],
}) => {
	const [newComment, setNewComment] = useState("");

	const _handleNewComment = e => {
		setNewComment(e.target.value);
	};

	const _handleCreateCmt = () => {
		setNewComment("");
		console.log("send request to creat a new comment");
		console.log("reload list of commemnt");
	};

	return (
		<FlexContainer height='100%'>
			<Nav></Nav>
			<Screen>
				<FlexContainer>
					<SingleBoard userID={userID} post={post} isDetail />
				</FlexContainer>
				<CommentsWrapper>
					{Object.values(post.comments).map((item, index) => {
						return (
							<Comment
								key={index}
								commentInfo={item}
								isCurrentUserComment={item.writerID === userID}
							/>
						);
					})}
				</CommentsWrapper>
				<InputWrapper>
					<Input
						value={newComment}
						placeholder='Create a new comment!'
						maxLenght={256}
						onChange={_handleNewComment}
						onKeyPress={_handleCreateCmt}
						isLabelHidden
						isMultipleLine
					/>
					<Button title='SEND' onClick={_handleCreateCmt} />
				</InputWrapper>
			</Screen>
		</FlexContainer>
	);
};

BoardDetail.propTypes = {
	post: PropTypes.object.isRequired,
};

export default BoardDetail;
