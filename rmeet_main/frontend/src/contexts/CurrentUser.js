import React, { useState, createContext } from "react";

const CurrentUserContext = createContext({
	currentUser: { uid: null, token: null },
	setCurrentUser: () => {},
});

const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUserInfo] = useState({});
	const setCurrentUser = ({ token }) => {
		setCurrentUserInfo({ token });
	};
	const value = { currentUser, setCurrentUser };
	return (
		<CurrentUserContext.Provider value={value}>
			{children}
		</CurrentUserContext.Provider>
	);
};

export { CurrentUserContext, CurrentUserProvider };
