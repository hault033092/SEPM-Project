import React, { useEffect, useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useNavigate } from "react-router-dom";

/*Components */
import SearchBar from "../../components/SearchBar";
import ValidationMessage from "../../components/ValidationMessage";
import { FlexContainer } from "../../components/FlexContainer";
import Message from "../../components/Message";

/*Sample Data */
import { sampleCourseList } from "../../lib/data/data";

/* Styled Component */
const Screen = styled(FlexContainer)`
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	padding: 1%;
`;

const SearchBarWrapper = styled(FlexContainer)`
	width: 90%;
	flex-direction: column;
	justify-content: flex-start;
	padding: 2% 5%;

	@media (max-width: 820px) {
		margin: 0;
	}
`;

const ErrMsgWrapper = styled.div`
	width: 90%;
	height: 1vw;

	@media (max-width: 820px) {
		margin: 0;
	}
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

const MessageCont = styled.div`
	width: 90%;
	margin-top: 1vw;
	height: 70vh;
	overflow-y: scroll;
`;

/* Data */
const errMsg = "Please enter the username.";

const MessageMain = () => {
	const [chatList, setChatList] = useState();
	const [chat, setChat] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigation = useNavigate();

	const _onSearchValChange = e => {
		if (errorMessage === errMsg) {
			setErrorMessage("");
		}

		setChat(e.target.value);
	};

	const _handleSearch = () => {
		if (chat === "") {
			setErrorMessage(errMsg);
			return;
		}

		console.log("search processing runs!!");
	};

	const _handleDelete = () => {
		setChat("");
	};

	const _handleMessageEvent = value => {
		setChat(value);
	};

	return (
		<Screen>
			<StyleTitle>Message</StyleTitle>
			<SearchBarWrapper>
				<SearchBar
					value={chat}
					placeholder={"Enter the username you want to chat!"}
					onChange={_onSearchValChange}
					onSubmit={_handleSearch}
					onDelete={_handleDelete}
					setValue={_handleMessageEvent}
					valuesList={sampleCourseList}
				/>
				<ErrMsgWrapper>
					<ValidationMessage message={errorMessage} />
				</ErrMsgWrapper>
			</SearchBarWrapper>

			<MessageCont>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {}}
				/>
			</MessageCont>
		</Screen>
	);
};

export default MessageMain;
