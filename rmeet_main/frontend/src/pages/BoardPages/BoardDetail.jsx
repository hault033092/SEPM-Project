import React, { useRef, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/*Components */
import SingleBoard from "../../components/SingleBoard";
import ProfileImg from "../../components/ProfileImg";
import { FlexContainer } from "../../components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import DropBox from "../../components/DropBox";
import CenterModal from "../../components/CenterModal";
import Image from "../../components/Image";
import PageNotFound from "../../lib/img/illustration/notFound.svg";

/*Context */
import { CurrentUserContext } from "../../contexts/CurrentUser";

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
	justify-content: space-between;
	align-items: flex-start;
`;

const UserNameDateWrapper = styled(FlexContainer)`
	flex-direction: row;
	width: 100%;
	justify-content: flex-start;
`;

const DropBoxWrapper = styled(FlexContainer)`
	width: 4vw;
	height: 2vw;
`;

const TextWrapper = styled(FlexContainer)`
	border-radius: 50px;
	padding: 1.5%;
	width: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;

const StyledText = styled.p`
	height: 100%;
	margin: ${props => (props.margin ? props.margin : "0")};
	text-decoration: ${props => (props.isUnderline ? "underline" : "none")};
	font-size: ${props => props.fontSize}vw;
	font-weight: ${props => (props.fontWeight ? props.fontWeight : "300")};

	@media (max-width: 400px) {
		font-size: ${props => props.fontSize - 0.4}vw;
	}
`;

const Comment = ({ commentInfo, isCurrentUserComment, onDelete }) => {
	const writerInfo = useRef({ username: "pizza", profileImg: "" });
	const [isEdit, setEdit] = useState(false);

	const navigation = useNavigate();

	const _handleEdit = () => {
		setEdit(true);
	};

	const _handleDelete = () => {
		onDelete();
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

	const navigateToProfileDetail = userID => {
		navigation("/account/" + userID);
	};

	return (
		<CommentCont>
			<ProfileImg
				src={writerInfo.current.profileImg}
				width='4.5vw'
				height='4.5vw'
				isShowProfile={true}
				onShowProfile={navigateToProfileDetail}
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
							<UserNameDateWrapper>
								<StyledText fontSize={1.5} fontWeight='600'>
									{writerInfo.current.username}
								</StyledText>
								<StyledText fontSize={0.5} margin='0 0 0 1%' isUnderline={true}>
									{commentInfo.createdAt}
								</StyledText>
							</UserNameDateWrapper>
							<DropBoxWrapper>
								{isCurrentUserComment && !isEdit && (
									<DropBox onEdit={_handleEdit} onDelete={_handleDelete} />
								)}
							</DropBoxWrapper>
						</HeaderWrapper>
						<StyledText fontSize={1}>{commentInfo.content}</StyledText>
					</TextWrapper>
				)}
			</CommentWrapper>
		</CommentCont>
	);
};

const Screen = styled(FlexContainer)`
	width: 85%;
	height: 100%;
	flex-direction: column;
	padding: 1%;
`;

const BoardWrapper = styled(FlexContainer)`
	width: 85%;
`;

const CommentsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	height: 50vh;
	width: 85%;
	padding: 3%;
`;

const InputWrapper = styled(FlexContainer)`
	width: 100%;
	border: 3px solid ${props => props.theme.mainRed};
	border-radius: 40px;
	padding: 1%;

	@media (max-width: 400px) {
		padding: 3%;
	}
`;

const ScreenCommentCont = styled(FlexContainer)`
	width: 88%;
	justify-content: space-between;
	margin-bottom: 0.5%;
`;

const StyleTitle = styled.h1`
	font-size: 5vh;
	font-weight: 800;
	@media (max-width: 820px) {
		font-size: 5vh;
		font-weight: 600;
	}

	@media (max-width: 400px) {
		font-size: 3vh;
		font-weight: 600;
	}
`;

const PageNotFoundCont = styled(FlexContainer)`
	@media (max-width: 820px) {
		flex-direction: column;
	}
`;

const MsgWrapper = styled(FlexContainer)`
	flex-direction: column;
	align-items: flex-start;
`;

/* Data */
const currentPost = {
	postID: "111",
	writerID: "000000",
	title: "Looking for 1 more team member",
	content:
		"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
	comments: [
		{
			writerID: "000000",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut eros bibendum dolor ultrices facilisis quis sed lacus. Sed eu eros vitae nulla auctor pellentesque. Pellentesque mi nisi, fermentum et cursus sed, suscipit ut enim. Ut pretium, tellus egestas fringilla rhoncus, metus purus imperdiet nisi, sit amet tincidunt dolor sem ac turpis. Suspendisse potenti. ",
			createdAt: "2020-01-01",
		},
		{ writerID: "000000", content: "hello", createdAt: "2020-01-01" },
		{
			writerID: "111111",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut eros bibendum dolor ultrices facilisis quis sed lacus. Sed eu eros vitae nulla auctor pellentesque. Pellentesque mi nisi, fermentum et cursus sed, suscipit ut enim. Ut pretium, tellus egestas fringilla rhoncus, metus purus imperdiet nisi, sit amet tincidunt dolor sem ac turpis. Suspendisse potenti. ",
			createdAt: "2020-01-01",
		},
		{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
		{ writerID: "000000", content: "hello", createdAt: "2020-01-01" },
		{ writerID: "111111", content: "hello", createdAt: "2020-01-01" },
		{ writerID: "222222", content: "it's me", createdAt: "2020-01-01" },
		{ writerID: "000000", content: "hello", createdAt: "2020-01-01" },
		{ writerID: "111111", content: "hello", createdAt: "2020-01-01" },
	],
	numOfComment: "9",
	numOfLike: "46",
	createdAt: "07-08-2022",
};

const BoardDetail = () => {
	const [newComment, setNewComment] = useState("");
	const [isModalShow, setIsModalShow] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState("");
	const isPageNotFound = useRef(false);

	const { currentUser } = useContext(CurrentUserContext);
	const navigation = useNavigate();
	const { postId } = useParams();

	useEffect(() => {
		const client = getClient();
		getPost(client);
	}, []);

	const getClient = () => {
		const { uid } = currentUser;
		const client = axios.create({
			baseURL: "http://localhost:8080",
			headers: {
				"auth-token": uid,
			},
		});

		return client;
	};

	const getPost = async client => {
		try {
			console.log(postId);
			let response = await client
				.get(`/api/posts/getPost/${postId}`)
				.then(response => {
					console.log(response.data);
					if (response.data === null) {
						isPageNotFound.current = true;
					}
				})
				.catch(error => {
					isPageNotFound.current = true;
				});
		} catch (error) {
			console.error(error);
		}
	};

	const _onDelete = () => {
		setIsModalShow(false);
		setDeleteTarget("");
		if (deleteTarget === "post") {
			// delete post

			navigation("/board");
			return;
		}

		// delete comment
		// reload page
	};

	const _onClickDeletePost = () => {
		setIsModalShow(true);
		setDeleteTarget("post");
	};

	const _onClickDeleteComment = () => {
		setIsModalShow(true);
		setDeleteTarget("comment");
	};

	const _handleNewComment = e => {
		setNewComment(e.target.value);
	};

	const _handleCreateCmt = () => {
		setNewComment("");
		console.log("send request to create a new comment");
		console.log("reload list of comment");
	};

	return (
		<Screen>
			<StyleTitle>Board</StyleTitle>
			{isPageNotFound ? (
				<PageNotFoundCont>
					<Image
						src={PageNotFound}
						alt={"Page not found "}
						style={{ width: "35vw", height: "35vw" }}
					/>
					<MsgWrapper>
						<StyledText fontSize={3} fontWeight='600'>
							Whoops!
						</StyledText>
						<StyledText fontSize={1.5}>
							Looks like this page went on vacation!
						</StyledText>
						<Button
							title='Go Home'
							onClick={() => {
								navigation("/");
							}}
							style={{
								width: "auto",
								height: "auto",
								padding: "1% 5%",
								margin: "5% 0 0 0",
								fontSize: "1.2vw",
							}}
						/>
					</MsgWrapper>
				</PageNotFoundCont>
			) : (
				<>
					<BoardWrapper>
						<SingleBoard
							post={currentPost}
							setModalShow={_onClickDeletePost}
							isDetail
							isNavHidden={true}
						/>
					</BoardWrapper>
					<CommentsWrapper>
						{Object.values(currentPost.comments).map((item, index) => {
							return (
								<Comment
									key={index}
									commentInfo={item}
									isCurrentUserComment={true /* MEMO */}
									onDelete={_onClickDeleteComment}
								/>
							);
						})}
					</CommentsWrapper>
					<ScreenCommentCont>
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
									padding: "0 0.5%",
									fontSize: "1.3vw",
									width: "100%",
									height: "auto",
									borderWidth: "0",
									borderRadius: "0",
									margin: "0",
								}}
							/>
						</InputWrapper>
						<Button
							title='SEND'
							onClick={_handleCreateCmt}
							style={{
								width: "auto",
								height: "auto",
								padding: "1% 5%",
								margin: "0 0 0 2%",
								fontSize: "1.2vw",
							}}
						/>
					</ScreenCommentCont>
					<CenterModal
						header='Are you sure?'
						desc={`Are you sure you want to delete this ${deleteTarget}?`}
						BtnName='Delete'
						BtnOnClick={_onDelete}
						isModalShow={isModalShow}
						onHide={() => setIsModalShow(false)}
					/>
				</>
			)}
		</Screen>
	);
};

export default BoardDetail;
