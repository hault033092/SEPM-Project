import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Account from "./Account";
import BoardMain from "./BoardPages/BoardMain";
import BoardDetail from "./BoardPages/BoardDetail";
import Signin from "./AccountPages/Signin";
import Signup from "./AccountPages/Signup";

const Pages = () => {
	return (
		<Routes>
			<Route path='/' element={<Signin />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/home' element={<Home />} />
			<Route exact path='/board' element={<BoardMain />} />
			<Route exact path='/board/detail' element={<BoardDetail />} />
			<Route path='/account' element={<Account />} />
		</Routes>
	);
};

export default Pages;
