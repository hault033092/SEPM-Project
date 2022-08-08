import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";

/*Main Pages */
import Home from "./Home";
import Timetable from "./Timetable";
import Account from "./Account";
import BoardMain from "./BoardPages/BoardMain";
import BoardDetail from "./BoardPages/BoardDetail";

const RootCont = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

const NavWrapper = styled(RootCont)`
	width: auto;
`;

const ScreenWrapper = styled(RootCont)`
	width: 100%;
	margin: 3% 2% 0 2%;
`;

const MainPages = () => {
	return (
		<RootCont>
			<NavWrapper>
				<NavBar />
			</NavWrapper>
			<ScreenWrapper>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/board' element={<BoardMain />} />
					<Route exact path='/board/detail' element={<BoardDetail />} />
					<Route path='/timetable' element={<Timetable />} />
					<Route path='/account' element={<Account />} />
				</Routes>
			</ScreenWrapper>
		</RootCont>
	);
};

export default MainPages;
