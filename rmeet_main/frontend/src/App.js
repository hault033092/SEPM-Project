import React from "react";
import styled, { ThemeProvider } from "styled-components";
import InitNav from "./pages/InitNav";
import MainNav from "./pages/MainNav";
import { theme } from "./lib/style/theme";
import GlobalCSS from "./lib/style/GlobalCSS";
import NavBar from "./components/NavBar";

import { CurrentPostProvider } from "./contexts/CurrentPost";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
`;

function App() {
	const isLogin = false;

	return (
		<div className='App'>
			<GlobalCSS />
			<ThemeProvider theme={theme}>
				<CurrentPostProvider>
					<AppContainer>
						{isLogin ? (
							<>
								{<NavBar />}
								<MainNav />
							</>
						) : (
							<InitNav />
						)}
					</AppContainer>
				</CurrentPostProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
