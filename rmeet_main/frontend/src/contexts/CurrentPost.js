import React, { useState, createContext } from "react";

const CurrentPostContext = createContext({
	post: {},
	setPost: () => {},
});

const CurrentPostProvider = ({ children }) => {
	const [currentPost, setCurrentPostInfo] = useState({});
	const setCurrentPost = currentPostInfo => {
		setCurrentPostInfo(currentPostInfo);
	};
	const value = { currentPost, setCurrentPost };
	return (
		<CurrentPostContext.Provider value={value}>
			{children}
		</CurrentPostContext.Provider>
	);
};

export { CurrentPostContext, CurrentPostProvider };
