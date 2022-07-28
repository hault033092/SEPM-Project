import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
	BoardSummary,
	StyledContainer,
	SearchBar,
	Button,
} from "../../components";
import { sampleTagList, currentUser, postList } from "../../lib/data/data";

const Nav = styled(StyledContainer)`
	width: 20%;
	height: 100%;
`;

const Screen = styled(StyledContainer)`
	width: 70%;
	height: 100%;
	margin: 5% 0;
	flex-direction: column;
	border: 3px solid tomato;
`;

const StickyCont = styled.div`
	background-color: #fff;
	width: 100%;
	position: sticky;
	top: 0;
	display: flex;
	z-index: 999;
`;

const BoardMain = () => {
	const [searchTag, setSearchTag] = useState("");

	const _onSearchValChange = e => {
		setSearchTag(e.target.value);
	};

	const _handlePost = () => {
		console.log("navigate to post page");
	};

	



	return (
		<StyledContainer height='100%'>
			<Nav></Nav>
			<Screen>
				<StickyCont>
					<SearchBar
						value={searchTag}
						onChange={_onSearchValChange}
						width='70%'
						tagList={sampleTagList}
					/>
					<Button title='Post' onClick={_handlePost} style={{ width: "20%" }} />
				</StickyCont>
				<div style={{border: "3px solid violet"}}>
				{Object.values(postList).map((post, index) => (
						<BoardSummary key={index} user={currentUser} post={post} />
					))}
				</div>
			</Screen>
		</StyledContainer>
	);
};

export default BoardMain;
