import React from "react";
import { Routes, Route } from "react-router-dom";

import Signin from "./AccountPages/Signin";
import Signup from "./AccountPages/Signup";

const Pages = () => {
	return (
		<Routes>
			<Route path='/' element={<Signin />} />
			<Route path='/signup' element={<Signup />} />
		</Routes>
	);
};

export default Pages;