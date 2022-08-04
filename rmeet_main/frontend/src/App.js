import { Signin, Signup } from "./pages";
import BoardMain from "./pages/BoardPages/BoardMain";
import BoardDetail from "./pages/BoardPages/BoardDetail";
import { ThemeProvider } from "styled-components";
import { theme } from "./lib/style/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BoardMain />
		</ThemeProvider>
	);
}

export default App;
