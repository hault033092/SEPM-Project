import React from "react";
import styled, { ThemeProvider } from "styled-components";
import InitNav from "./pages/InitNav";
import MainNav from "./pages/MainNav";
import { theme } from "./lib/style/theme";
import { CurrentPostProvider } from "./contexts/CurrentPost";
import NavBar from "./components/NavBar";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
`;

function App() {
	const currentUser = false;
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<CurrentPostProvider>
					{currentUser ? (
						<AppContainer>
							<NavBar />
							<MainNav />
						</AppContainer>
					) : (
						<InitNav />
					)}
				</CurrentPostProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
