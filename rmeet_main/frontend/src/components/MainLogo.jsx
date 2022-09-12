import Image from "./Image";
import PropTypes from "prop-types";
import MainLogoSrc from "../lib/img/logo.svg";

const MainLogo = ({ width, height }) => {
	return (
		<Image
			src={MainLogoSrc}
			alt={"RMEET main logo image"}
			style={{
				width,
				height,
			}}
		/>
	);
};
MainLogo.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default MainLogo;