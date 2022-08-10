

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Pages from "./pages/Pages";
import { theme } from "./lib/style/theme";
import { CurrentPostProvider } from "./contexts/CurrentPost";
import NavBar from "./components/NavBar";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
`;


function App() {
	return (
		<div className='App'>
		<ThemeProvider theme={theme}>
			<CurrentPostProvider>
				<AppContainer>
					<NavBar />
					<Pages />
				</AppContainer>
			</CurrentPostProvider>
		</ThemeProvider>
		</div>
	);
}

export default App;

