import {
	logoNoTitle,
	getTeammates,
	sendMessage,
	createReview,
} from "../img/illustration";

export const sampleCourseList = [
	{
		key: "COSC2539",
		value: "Security in Computing and Information Technology",
	},
	{ key: "COSC2503", value: "Programming Project 2" },
	{ key: "COSC2740", value: "Flagship Internship (IT)" },
	{ key: "COSC2638", value: "Cloud Computing" },
	{ key: "MATH2081", value: "Mathematics for Computing" },
	{ key: "COSC2769", value: "Further Web Programming" },
];

export const sampleCurrentUser = {
	userID: "000000",
	userProfileImg: "https://picsum.photos/200",
};

export const samplePostList = {
	0: {
		postID: "111",
		writerID: "000000",
		title: "Looking for 1 more team member",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "9",
		numOfLike: "46",
		createdAt: "07-08-2022",
	},
	1: {
		postID: "222",
		writerID: "000000",
		title: "Looking for 1 more team member1",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
		comments: [
			{ writerID: "000000", content: "1111", createdAt: "2020-01-01"  },
			{ writerID: "000000", content: "2222", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "3333" , createdAt: "2020-01-01" },
		],
		numOfComment: "11",
		numOfLike: "11",
		createdAt: "07-08-2022",
	},
	2: {
		postID: "333",
		writerID: "111111",
		title: "Looking for 1 more team member2",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",

		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "22",
		numOfLike: "22",
		createdAt: "07-08-2022",
	},
	3: {
		postID: "444",
		writerID: "111111",
		title: "Looking for 1 more team member3",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",

		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "33",
		numOfLike: "33",
		createdAt: "07-08-2022",
	},
	4: {
		postID: "555",
		writerID: "111111",
		title: "Looking for 1 more team member5",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",

		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "55",
		numOfLike: "55",
		createdAt: "07-08-2022",
	},
	5: {
		postID: "666",
		writerID: "111111",
		title: "Looking for 1 more team member6",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "66",
		numOfLike: "66",
		createdAt: "07-08-2022",
	},
	6: {
		postID: "777",
		writerID: "111111",
		title: "Looking for 1 more team member7",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",

		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "77",
		numOfLike: "77",
		createdAt: "07-08-2022",
	},
	7: {
		postID: "888",
		writerID: "111111",
		title: "Looking for 1 more team member8",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",

		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "88",
		numOfLike: "88",
		createdAt: "07-08-2022",
	},
	8: {
		postID: "999",
		writerID: "111111",
		title: "Looking for 1 more team member9",
		content:
			"Hi guys, my name is Giang Nhat Khanh (s3878182) and on behalf of my ISYS2101 group, I would like to post this discussion to find the last member to complete our roster. As of right now, we have 3 team members including myself who are all familiar with the primary concepts of frontend/backend development, writing technical report documents as well as being keen communicators. Therefore, we would expect our potential teammate to fulfill these requirements in order to collaborate smoothly throughout the project. We would be grateful that someone could reply to this post and hopefully we can work together to ace this course! ",
		comments: [
			{ writerID: "000000", content: "it's me", createdAt: "2020-01-01" },
			{ writerID: "000000", content: "hello", createdAt: "2020-01-01"  },
			{ writerID: "111111", content: "hello", createdAt: "2020-01-01"  },
		],
		numOfComment: "99",
		numOfLike: "99",
		createdAt: "07-08-2022",
	},
};

export const majors = {
	SSET: [
		{ key: "BH073", value: "Electronic and Computer Systems Engineering" },
		{ key: "BH120", value: "Software Engineering" },
		{ key: "BH070", value: "Applied Science (Aviation)" },
		{ key: "BH199", value: "Science (Food Technology and Nutrition)" },
		{ key: "BH123", value: "Robotics and Mechatronics Engineering" },
		{ key: "BH154", value: "Applied Science (Psychology)" },
		{ key: "BH162", value: "Information Technology" },
	],
	SCD: [
		{ key: "BP309", value: "Design (Digital Media)" },
		{ key: "BP316", value: "Design Studies" },
		{ key: "BP222", value: "Communication (Professional Communication)" },
		{ key: "BP317", value: "Languages" },
		{ key: "BP327", value: "Fashion (Enterprise)" },
		{ key: "BP325", value: "Digital Film and Video" },
		{ key: "BP214", value: "Design (Games)" },
	],
	SBM: [
		{ key: "BP343", value: "Business" },
		{ key: "BP312", value: "Tourism and Hospitality Management" },
		{ key: "BP318", value: " Digital Marketing" },
	],
};

export const imagesData = [
	{ src: logoNoTitle, desc: "Private community\n for \n only RMIT" },
	{ src: getTeammates, desc: "Ask help\n and\n share information!" },
	{ src: sendMessage, desc: "Send message!" },
	{
		src: createReview,
		desc: "Create a course review!",
	},
];

export const semesterInfo = [
	{ key: "1", value: "semester 1" },
	{ key: "2", value: "semester 2" },
	{ key: "3", value: "semester 3" },
];

export const yearInfo = [
	{ key: "2020", value: "2020" },
	{ key: "2021", value: "2021" },
	{ key: "2022", value: "2022" },
];

export const dropBoxInfo = [
	{
		0: {
			title: "View Profile",
			onClick: () => {
				console.log("navigate to a view profile page");
			},
		},
		1: {
			title: "Send Message",
			onClick: () => {
				console.log("navigate to a send message page");
			},
		},
	},
	{
		0: {
			title: "Edit Post",
			onClick: () => {
				console.log("navigate to a edit post page");
			},
		},
		1: {
			title: "Delete Post",
			onClick: () => {
				console.log("navigate to a delete post page");
			},
		},
	},
];
