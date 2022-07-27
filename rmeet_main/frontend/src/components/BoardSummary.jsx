import React, { useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ProfileImg, Button } from "../components";

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

const MainCont = styled(StyledContainer).attrs(({ theme }) => ({}))`
	background-color: ${props => props.theme.forumBg};
	border: ${props => "3px solid" + props.theme.mainBlue};
`;

const StyledText = styled.p`
	font-weight: ${props => props.weight};
	font-size: ${props => props.size};
	color: ${props => (props.color ? props.color : "#00000")};
	margin: ${props => (props.margin ? props.margin : "0")};
`;

const Tag = styled(Button).attrs(({ title, isLastTag, theme }) => ({
	title,
	style: {
		btnColor: isLastTag ? "#696969" : theme.tagBlue,
		width: "auto",
		padding: "0.8vh 1.5vw",
		margin: "0 3% 0 0",
		fontSize: "1vw",
		borderRadius: "50px",
	},
}))``;



const BoardSummary = ({ user, post }) => {
	const isMyPost = useRef(post.writerID === user.userID);
	const theme = useContext(ThemeContext);
	console.log(isMyPost.current);

	return (
		<MainCont
			className='mainCont'
			direction='column'
			content='space-around'
			padding='20px'>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<ProfileImg src={user.userProfileImg} width='6vw' height='6vw' />
				<StyledContainer width='auto' content='flex-start' self='flex-start' display={isMyPost.current ? "flex" : "none"}>
					<FontAwesomeIcon
						icon={solid("ellipsis-vertical")}
						fontSize='1.5vw'
					/>
				</StyledContainer>
			</StyledContainer>
			<StyledContainer
				className='subCont'
				direction='column'
				items='flex-start'
				width='100%'>
				<StyledText weight='600' size='1.5vw' margin='20px 0 0 0'>
					{post.title}
				</StyledText>
				<StyledText weight='100' size='0.8vw'>
					Created at: {post.createdAt}
				</StyledText>
			</StyledContainer>
			<StyledContainer className='subCont' padding='1%'>
				<StyledText weight='300' size='1.2vw'>
					{post.content.slice(0, 247)}...
				</StyledText>
			</StyledContainer>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<StyledContainer
					className='TagCont'
					width='55%'
					margin='0 5% 0 0'
					content='flex-start'>
					{post.tags.map((tag, index) => (
						<Tag key={index} title={"# " + tag} />
					))}
				</StyledContainer>
				<StyledContainer
					className='IconMainCont'
					width='40%'
					content='flex-end'>
					<StyledContainer
						className='IconSubCont'
						width='auto'
						margin='0 5% 0 0'>
						<StyledContainer width='auto' margin='0 10px 0 0'>
							<FontAwesomeIcon
								icon={regular("comment")}
								fontSize='2vw'
								color={theme.tagBlue}
							/>
						</StyledContainer>
						<StyledText weight={500} size='1vw' color={theme.tagBlue}>
							{post.numOfComment}
						</StyledText>
					</StyledContainer>
					<StyledContainer className='IconSubCont' width='auto'>
						<StyledContainer width='auto' margin='0 10px 0 0'>
							<FontAwesomeIcon
								icon={regular("face-smile")}
								fontSize='2vw'
								color={theme.mainRed}
							/>
						</StyledContainer>
						<StyledText weight={500} size='1vw' color={theme.mainRed}>
							{post.numOfLike}
						</StyledText>
					</StyledContainer>
				</StyledContainer>
			</StyledContainer>
		</MainCont>
	);
};

// ProfileImg.propTypes = {
// 	user: PropTypes.object.isRequired,
// 	post: PropTypes.object.isRequired,
// };

export default BoardSummary;
