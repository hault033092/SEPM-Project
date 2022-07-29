import { Signin, Signup, Verification, BoardMain, BoardDetail } from "./pages/";
import { ThemeProvider } from "styled-components";
import {theme} from "./lib/style/theme";

import Test from "./pages/Test"

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Signin />
		</ThemeProvider>
	);
}

export default App;
