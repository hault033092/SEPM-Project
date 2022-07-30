import { Signin, Signup, BoardMain, BoardDetail } from "./pages";
import { ThemeProvider } from "styled-components";
import { theme } from "./lib/style/theme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Signup />
		</ThemeProvider>
	);
}

export default App;
