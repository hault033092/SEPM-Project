import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

/*Components */
import SingleBoard from "../../components/SingleBoard";
import ProfileImg from "../../components/ProfileImg";
import { Button, FlexContainer, Input } from "../../components";
import DropBox from "../../components/DropBox";

/*Context */
import { CurrentPostContext } from "../../contexts/CurrentPost";

/*sample data */
import { sampleCurrentUser } from "../../lib/data";

const EditCommentWrapper = styled(FlexContainer)`
	flex-direction: column;
	width: 100%;
	margin: 3%;
`;

const EditBtnWrapper = styled(FlexContainer)`
	width: 20%;
	margin-left: 80%;
	align-items: space-between;
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
				style={{
					padding: "1.5%",
					fontSize: "1.2vw",
					width: "100%",
					height: "100%",
					borderRadius: "0",
				}}
			/>
			<EditBtnWrapper>
				<Button
					title='CANCEL'
					onClick={handleOnCancel}
					style={{
						width: "60%",
						height: "auto",
						padding: "3% 5%",
						margin: "2%",
					}}
				/>
				<Button
					title='SAVE'
					onClick={_handleOnSubmit}
					style={{
						width: "60%",
						height: "auto",
						padding: "3% 5%",
						margin: "2%",
					}}
				/>
			</EditBtnWrapper>
		</EditCommentWrapper>
	);
};

const CommentCont = styled(FlexContainer)`
	width: 100%;
	margin-bottom: 1.5%;
	align-items: flex-start;
`;

const CommentWrapper = styled(FlexContainer)`
	width: 100%;
	background-color: ${props => props.theme.commentGrey};
	border-radius: 10px;
	padding: 0 1%;
	margin-left: 3%;
`;

const HeaderWrapper = styled(FlexContainer)`
	width: 100%;
	height: 100%;
`;

const DropBoxWrapper = styled(FlexContainer)`
	width: 4vw;
	height: 2vw;
`;

const TextWrapper = styled(FlexContainer)`
	border-radius: 50px;
	padding: 1.5%;
	width: 100%;
	justify-content: flex-start;
	flex-direction: column;
`;

const StyledText = styled.p`
	width: 100%;
	height: 100%;
	font-size: ${props => props.fontSize};
	font-weight: ${props => (props.fontWeight ? props.fontWeight : "300")};
	align-self: ${props => (props.alignSelf ? props.alignSelf : "flex-start")};
`;

const Comment = ({ commentInfo, isCurrentUserComment }) => {
	const writerInfo = useRef({ username: "cornsoup", profileImg: "" });
	const [isEdit, setEdit] = useState(false);

	const _handleEdit = () => {
		setEdit(true);
	};

	const _handleOnCancel = () => {
		setEdit(false);
	};

	const _onEditSubmit = () => {};

	const getCommentWriterInfo = () => {
		// get comment writer's profile image from API
		// writer id = commentInfo.writerID
		// const {username, profileImg} = fetch(``);
		// const userInfo = {username, profileImg}
		return { username: "cornsoup", profileImg: "" };
	};

	return (
		<CommentCont>
			<ProfileImg
				src={writerInfo.current.profileImg}
				width='4.5vw'
				height='4.5vw'
				isDropBox
			/>
			<CommentWrapper>
				{isEdit ? (
					<EditComment
						oldComment={commentInfo.content}
						handleOnCancel={_handleOnCancel}
					/>
				) : (
					<TextWrapper>
						<HeaderWrapper>
							<StyledText fontSize='1.5vw' fontWeight='600'>
								{writerInfo.current.username}
							</StyledText>
							<DropBoxWrapper>
								{isCurrentUserComment && !isEdit && (
									<DropBox onEdit={_handleEdit} onDelete={_handleEdit} />
								)}
							</DropBoxWrapper>
						</HeaderWrapper>
						<StyledText fontSize='1vw'>{commentInfo.content}</StyledText>
						<StyledText fontSize='0.5vw' alignSelf='flex-end'>
							{commentInfo.createdAt}
						</StyledText>
					</TextWrapper>
				)}
			</CommentWrapper>
		</CommentCont>
	);
};

const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	margin: 1%;
`;

const CommentsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	height: 50vh;
	width: 100%;
	padding: 3%;
`;

const InputWrapper = styled(FlexContainer)`
	width: 100%;
	border: 10px solid ${props => props.theme.mainRed};
`;

const BoardDetail = ({ userID = sampleCurrentUser.userID }) => {
	const [newComment, setNewComment] = useState("");
	const { currentPost } = useContext(CurrentPostContext);

	const _handleNewComment = e => {
		setNewComment(e.target.value);
	};

	const _handleCreateCmt = () => {
		setNewComment("");
		console.log("send request to creat a new comment");
		console.log("reload list of commemnt");
	};

	return (
		<Screen>
			{Object.keys(currentPost).length === 0 ? (
				<div>not found 404</div>
			) : (
				<>
					<FlexContainer>
						<SingleBoard userID={userID} post={currentPost} isDetail />
					</FlexContainer>
					<CommentsWrapper>
						{Object.values(currentPost.comments).map((item, index) => {
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
							style={{
								padding: "1.5%",
								fontSize: "1.2vw",
								width: "100%",
								height: "4vw",
								borderWidth: "0",
								borderRadius: "0",
							}}
						/>
						<Button
							title='SEND'
							onClick={_handleCreateCmt}
							style={{
								width: "auto",
								height: "4vw",
								padding: "1% 5%",
								margin: "0 0 auto 0",
								borderRadius: "0",
								fontSize: "1.5vw",
							}}
						/>
					</InputWrapper>
				</>
			)}
		</Screen>
	);
};

export default BoardDetail;
