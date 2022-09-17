import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import backArrow from "../../lib/img/icon/backArrow.svg";

const MessageBox = () => {
	const navigate = useNavigate();
	const [newMessage, setNewMessage] = useState("");

	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	// const handleSendMessage = () => {
	// 	sendMessage(newMessage);
	// 	setNewMessage("");
	// };

	return (
		<MessageBoxContainer>
			<MessageBoxContent>
				<ActionBar>
					<BackIcon
						src={backArrow}
						onClick={() => {
							navigate("/message");
						}}
					></BackIcon>
					<Username>username</Username>
				</ActionBar>
				<MessageList>
					<MessageItem className="message-item my-message">Hello</MessageItem>
					<MessageItem className="message-item received-message">
						Hi
					</MessageItem>
					<MessageItem className="message-item my-message">
						How are you?
					</MessageItem>
					<MessageItem className="message-item received-message">
						I'm fine!
					</MessageItem>
					<MessageItem className="message-item my-message">
						That's great
					</MessageItem>
					<MessageItem className="message-item received-message">
						Okay, bye :D
					</MessageItem>
					<MessageItem className="message-item my-message">
						See you soon!
					</MessageItem>
					<MessageItem className="message-item received-message">
						I don't think so :D
					</MessageItem>
				</MessageList>
				<ChatSection>
					<ChatBox
						defaultValue=""
						onChange={handleNewMessageChange}
						placeholder="Enter message..."
						rows="3"
					></ChatBox>
					<SendButton>Send</SendButton>
				</ChatSection>
			</MessageBoxContent>
		</MessageBoxContainer>
	);
};

const MessageBoxContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 1.5rem 1.5rem;

	@media screen and (max-width: 1199px) {
		position: absolute;
		justify-content: space-between;
		padding: 7rem 0 0 0;
	}
`;

const MessageBoxContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border: 0.1rem solid black;

	@media screen and (max-width: 1199px) {
		position: relative;
		flex-direction: column;
	}
`;

const ActionBar = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: #000054;

	@media screen and (max-width: 1199px) {
		justify-content: space-between;
	}
`;

const BackIcon = styled.img`
	height: 2.4rem;
	width: 2rem;
	margin-right: auto;
	transform: rotateY(180deg);

	@media screen and (max-width: 1199px) {
		height: 2rem;
		width: 1.6rem;
		margin: 0;
	}
`;

const Username = styled.h2`
	color: #ffffff;
	margin-right: auto;

	@media screen and (max-width: 1199px) {
		margin: 0;
	}
`;

const MessageList = styled.ol`
	height: 100%;
	width: 100%;
	list-style-type: none;
	overflow-y: scroll;
	margin: 0;
	padding: 0;

	// @media screen and (max-width: 1199px) {
	// 	// height: 85%;
	// }
`;

const MessageItem = styled.li`
	&.message-item {
		width: fit-content;
		max-width: 50%;
		margin: 0.6rem;
		padding: 0.6rem 1rem;
		word-break: break-word;
		border-radius: 0.4rem;
		color: #ffffff;
		font-weight: 700;
	}

	&.my-message {
		background-color: red;
		margin-left: auto;
	}

	&.received-message {
		background-color: #000054;
		margin-right: auto;
	}
`;

const ChatSection = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	align-self: end;
`;

const ChatBox = styled.textarea`
	width: 100%;
	border: 0.2rem solid red;

	&:focus {
		outline: none;
	}
`;

const SendButton = styled.button`
	border: none;
	background-color: red;
	color: #ffffff;
	font-size: 1.4rem;
	font-weight: 900;
	text-transform: uppercase;
	padding: 1.4rem 2rem;
`;

export default MessageBox;
