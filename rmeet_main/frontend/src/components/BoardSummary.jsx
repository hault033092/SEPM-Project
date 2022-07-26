import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ProfileImg, Button } from "../components";

const StyledContainer = styled.div`
	display: flex;
	width: ${props => (props.width ? props.width : "auto")};
	height: ${props => (props.height ? props.height : "auto")};
	margin: ${props => (props.margin ? props.margin : "0")};
	padding: ${props => (props.padding ? props.padding : "auto")};
	flex-direction: ${props => (props.direction ? props.direction : "row")};
	justify-content: ${props => (props.content ? props.content : "center")};
	align-items: ${props => (props.items ? props.items : "center")};
	align-self: ${props => (props.self ? props.self : "center")};
`;

const StyledText = styled.p`
	font-weight: ${props => props.weight};
	font-size: ${props => props.size};
	color: ${props => (props.color ? props.color : "#00000")};
`;

const Tag = styled(Button).attrs(({ title, isLastTag }) => ({
	title,
	style: {
		btnColor: isLastTag ? "#b0b0b0" : "#3F3FEF",
		width: "auto",
		padding: "0.8vh 1.5vw",
		margin: "0 3% 0 0",
		fontSize: "1vw",
		borderRadius: "50px",
	},
}))``;

const BoardSummary = ({ user, post }) => {
	// const [isMyPost] = useRef(null);

	return (
		<StyledContainer
			className='mainCont'
			direction='column'
			content='space-around'
			padding='3%'>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<ProfileImg width="2vw" height="2vw"/>
				<StyledContainer width='auto' content='flex-start' self='flex-start'>
					<FontAwesomeIcon
						icon={solid("ellipsis-vertical")}
						font-size='2vw'
						aria-hidden={false}
					/>
				</StyledContainer>
			</StyledContainer>
			<StyledContainer
				className='subCont'
				direction='column'
				items='flex-start'
				width='100%'>
				<StyledText weight='600' size='1.5vw'>
					Looking for 1 more team member
				</StyledText>
				<StyledText weight='100' size='0.5vw'>
					Created at: 07-08-2022
				</StyledText>
			</StyledContainer>
			<StyledContainer className='subCont' padding='1%'>
				<StyledText weight='300' size='1vw'>
					Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my
					ISYS2101 group, I would like to post this discussion to find the last
					member to complete our roster. As of right now, we have 3 team members
					including myself who are all familiar with the primary concepts of...
				</StyledText>
			</StyledContainer>
			<StyledContainer className='subCont' content='space-between' width='100%'>
				<StyledContainer
					className='TagCont'
					width='55%'
					margin='0 5% 0 0'
					content='flex-start'>
					<Tag title='# findTeammates' />
					<Tag title='# findTeammembers' />
					<Tag title='+ 5' isLastTag />
				</StyledContainer>
				<StyledContainer
					className='IconMainCont'
					width='40%'
					content='flex-end'>
					<StyledContainer className='IconSubCont' width='auto' margin="0 5% 0 0">
						<StyledContainer width='auto' margin='0 10px 0 0'>
							<FontAwesomeIcon
								icon={regular("comment")}
								font-size='2vw'
								color='#2626CC'
							/>
						</StyledContainer>
						<StyledText weight={500} size='1vw' color='#2626CC'>
							23
						</StyledText>
					</StyledContainer>
					<StyledContainer className='IconSubCont' width='auto'>
						<StyledContainer width='auto' margin='0 10px 0 0'>
							<FontAwesomeIcon
								icon={regular("face-smile")}
								font-size='2vw'
								color='#E60028'
							/>
						</StyledContainer>
						<StyledText weight={500} size='1vw' color='#E60028'>
							46
						</StyledText>
					</StyledContainer>
				</StyledContainer>
			</StyledContainer>
		</StyledContainer>
	);
};

export default BoardSummary;
