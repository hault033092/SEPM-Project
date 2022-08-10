import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Account from "./Account";
import BoardMain from "./BoardPages/BoardMain";
import BoardDetail from "./BoardPages/BoardDetail";

const Pages = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route exact path='/board' element={<BoardMain />} />
			<Route exact path='/board/detail' element={<BoardDetail />} />
			<Route path='/account' element={<Account />} />
		</Routes>
	);
};

export default Pages;
