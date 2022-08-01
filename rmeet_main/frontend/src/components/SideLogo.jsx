import Image from "./Image";
import PropTypes from "prop-types";
import SideLogoSrc from "../images/logo.png";

const SideLogo = ({ width, height }) => {
	return (
		<Image
			src={SideLogoSrc}
			alt={"RMEET side logo image"}
			style={{
				width,
				height,
			}}
		/>
	);
};
SideLogo.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default SideLogo;