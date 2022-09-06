import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CurrentUserContext } from "../contexts/CurrentUser";

/* Sign in & Sign up page */
import Signin from "./AccountPages/Signin";
import Signup from "./AccountPages/Signup";
import ResetPassword from "./AccountPages/ResetPassword";

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
import UserProfile from "./UserProfile"

const MainNav = () => {
	const { currentUser } = useContext(CurrentUserContext);

	return (
		<>
			{currentUser.uid || window.sessionStorage.getItem("isLogin")? (
				<>
					<NavBar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route exact path='/board' element={<BoardMain />} />
						<Route path='/board/:postId' element={<BoardDetail />} />
						<Route path='/board/create-post' element={<CreatePost />} />
						<Route exact path='/course' element={<CourseMain />} />
						<Route exact path='/course/:courseId' element={<CourseDetail />} />
						<Route path='/review-course' element={<CourseReview />} />
						<Route path='/message' element={<MessageMain />} />
						<Route path='/account' element={<Account />} />
						<Route path='/view-profile/:userId' element={<UserProfile />} />
					</Routes>
				</>
			) : (
				<Routes>
					<Route path='/' element={<Signin />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/forgotPassword' element={<Signup />} />
					<Route path='/resetPassword' element={<ResetPassword />} />
				</Routes>
			)}
		</>
	);
};

export default MainNav;
