import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Pages from "./pages/Pages";
import { theme } from "./lib/style/theme";
import GlobalCSS from "./lib/style/GlobalCSS";
import NavBar from "./components/NavBar";

import { CurrentPostProvider } from "./contexts/CurrentPost";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
`;

function App() {
	return (
		<div className='App'>
			<GlobalCSS />
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
