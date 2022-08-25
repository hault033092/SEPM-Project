import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CurrentUserContext } from "../contexts/CurrentUser";

/* Sign in & Sign up page */
import Signin from "./AccountPages/Signin";
import Signup from "./AccountPages/Signup";

/* Homepage */
import Home from "./Home";

/* Board Pages */
import BoardMain from "./BoardPages/BoardMain";
import BoardDetail from "./BoardPages/BoardDetail";
import CreatePost from "./CreatePost";

/* Board Pages */
import CourseMain from "./CoursePages/CourseMain";
import CourseDetail from "./CoursePages/CourseDetail";
import CourseReview from "./CourseReview";

/* Message Pages */
import MessageMain from "./MessagePages/MessageMain";

/* Account Pages */
import Account from "./Account";

const MainNav = () => {
	const { currentUser } = useContext(CurrentUserContext);

	return (
		<>
			{currentUser.token ? (
				<>
					<NavBar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route exact path='/board' element={<BoardMain />} />
						<Route exact path='/board/detail' element={<BoardDetail />} />
						<Route path='/board/create-post' element={<CreatePost />} />
						<Route exact path='/course' element={<CourseMain />} />
						<Route exact path='/course/detail' element={<CourseDetail />} />
						<Route path='/review-course' element={<CourseReview />} />
						<Route path='/message' element={<MessageMain />} />
						<Route path='/account' element={<Account />} />
					</Routes>
				</>
			) : (
				<Routes>
					<Route path='/' element={<Signin />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			)}
		</>
	);
};

export default MainNav;
