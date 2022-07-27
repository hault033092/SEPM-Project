import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BoardSummary } from "../../components";

const BoardMain = () => {
	const user = {
		userID: "000000",
		userProfileImg: "https://picsum.photos/200",
	};

	const post = {
		postID: "123455",
		writerID: "111111",
		title: "Looking for 1 more team member",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
		tags: ["findTeammates", "SSET", "IT", "tag1", "tag2"],
		numOfComment: "23",
		numOfLike: "46",
		createdAt: "07-08-2022",
	};
	return <BoardSummary user={user} post={post} />;
};

export default BoardMain;
