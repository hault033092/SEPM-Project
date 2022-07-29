import React, { useState } from "react";
import styled from "styled-components";

import {
	BoardSummary,
	StyledContainer,
	SearchBar,
	Button,
} from "../../components";

import {
	sampleTagList,
	sampleCurrentUser,
	samplePostList,
} from "../../lib/data";

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

const SearchBarCont = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
	justify-content: space-between;
	z-index: 999;
`;

const BoardCont = styled.div`
	height: 90%;
	overflow-y: scroll;
`;

const BoardMain = () => {
	const [searchTag, setSearchTag] = useState("");
	const [postList, setPostList] = useState(samplePostList);

	const _onSearchValChange = e => {
		setSearchTag(e.target.value);
	};

	const _handlePost = () => {
		console.log("navigate to post page");
	};

	const _handleBoardOnClick = () => {
		console.log("navigate to board detail page");
	};

	const _handleSearch = () => {
		console.log("search processing runs!!");
		console.log("search for", searchTag);
		// setPostList(newPostList)
	};

	const _handleDelete = () => {
		setSearchTag("");
	};

	const _handleTagEvent = value => {
		setSearchTag(value);
	};

	return (
		<StyledContainer height='100%'>
			<Nav></Nav>
			<Screen>
				<h1>Board</h1>
				<SearchBarCont>
					<SearchBar
						value={searchTag}
						onChange={_onSearchValChange}
						onSubmit={_handleSearch}
						onDelete={_handleDelete}
						setValue={_handleTagEvent}
						width='75%'
						valuesList={sampleTagList}
					/>
					<Button title='Post' onClick={_handlePost} style={{ width: "20%" }} />
				</SearchBarCont>
				<BoardCont>
					{Object.values(postList).map((post, index) => (
						<BoardSummary
							key={index}
							user={sampleCurrentUser}
							post={post}
							onClick={_handleBoardOnClick}
						/>
					))}
				</BoardCont>
			</Screen>
		</StyledContainer>
	);
};

export default BoardMain;
