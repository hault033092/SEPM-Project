import React from "react"
import styled from "styled-components"

const MessageBox = () => {
    const [newMessage, setNewMessage] = React.useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
      };

  return (
    <MessageBoxContainer>
        <Heading>Your messages</Heading>
        <MessageBoxContent>
            <MessageList>

            </MessageList>
            <ChatSection>
                <ChatBox value="" onChange={handleNewMessageChange} placeholder="Enter message..." rows="3"></ChatBox>
                <SendButton onClick={handleSendMessage}>Send</SendButton>
            </ChatSection>
        </MessageBoxContent>
    </MessageBoxContainer>
  )
}

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
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    color: black;
    font-weight: 900;
`

const MessageBoxContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1199px) {
        height: auto;
        position: relative;
        flex-direction: column;
        padding: 1rem 0;
    }
`

const MessageList = styled.ol`
    list-style-type: none;
`

const ChatSection = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ChatBox = styled.textarea`
    width: 85%;

`

export default MessageBox;