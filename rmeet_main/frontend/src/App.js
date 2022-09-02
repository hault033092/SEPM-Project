import React from "react";
import styled, { ThemeProvider } from "styled-components";
import MainNav from "./pages/MainNav";
import { theme } from "./lib/style/theme";
import GlobalCSS from "./lib/style/GlobalCSS";

/* Context */
import { CurrentUserProvider } from "./contexts/CurrentUser";

const AppContainer = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

function App() {
	return (
		<div className='App'>
			<GlobalCSS />
			<ThemeProvider theme={theme}>
				<CurrentUserProvider>
					<AppContainer>
						<MainNav />

					</AppContainer>
				</CurrentUserProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
