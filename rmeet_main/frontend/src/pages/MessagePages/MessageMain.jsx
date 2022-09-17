import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/*Components */
import SearchBar from "../../components/SearchBar";
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

const ValidationMessage = styled.p`
	align-items: flex-start;
	width: 100%;
	font-size: 1vw;
	font-weight: 400;
	margin: 5px;
	color: ${props => props.color};
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
					<ValidationMessage color='#E60028'>{errorMessage}</ValidationMessage>
				</ErrMsgWrapper>
			</SearchBarWrapper>

			<MessageCont>
				<Message
					recipient={"lovely cat"}
					lastMessage={
						"He is really clear on what you need to learn to get a good grade. Are you willing to stu..."
					}
					onNavigate={() => {
						navigation("/message-box/lovely-cat");
					}}
				/>
				<Message
					recipient={"bubble"}
					lastMessage={
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque arcu eu tincidunt scelerisque. Sed tincidunt, sem et varius convallis, neque tortor condimentum arcu, in rutrum neque tortor ut ligula. Vivamus pellentesque quis nibh non iaculis. Aenean in leo velit. Pellentesque at dui non mauris vehicula bibendum nec eu dolor. "
					}
					onNavigate={() => {
						navigation("/message-box/:chatId");
					}}
				/>
				<Message
					recipient={"appleapple"}
					lastMessage={
						"Praesent eu sem volutpat, fringilla felis id, pellentesque nulla. Aenean a mollis odio. Praesent odio eros, dictum in tincidunt ege..."
					}
					onNavigate={() => {
						navigation("/message-box/:chatId");
					}}
				/>
				<Message
					recipient={"blackDog"}
					lastMessage={
						"elementum eget sem. Duis tempor, lacus eu dapibus fermentum, dolor est tempor nunc, a molestie sem erat id dolor..."
					}
					onNavigate={() => {
						navigation("/message-box/:chatId");
					}}
				/>
				<Message
					recipient={"pizza"}
					lastMessage={
						"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestasu..."
					}
					onNavigate={() => {
						navigation("/message-box/:chatId");
					}}
				/>
				<Message
					recipient={"crying cat"}
					lastMessage={
						"Cras tincidunt libero sed magna pellentesque ultrices. Nulla gravida mattis consectetur..."
					}
					onNavigate={() => {
						navigation("/message-box/:chatId");
					}}
				/>
			</MessageCont>
		</Screen>
	);
};

export default MessageMain;
