import { Signin, Signup } from "./pages";
import MainPages from "./pages/MainPages";
import { ThemeProvider } from "styled-components";
import { theme } from "./lib/style/theme";
import { CurrentPostProvider } from "./contexts/CurrentPost";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CurrentPostProvider>
				<MainPages />
			</CurrentPostProvider>
		</ThemeProvider>
	);
}

export default App;
