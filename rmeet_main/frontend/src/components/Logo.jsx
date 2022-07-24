import Image from "./Image";
import PropTypes from "prop-types";
import LogoSrc from "../lib/img/logo.svg";

const Logo = ({ width, height }) => {
	return (
		<Image
			src={LogoSrc}
			alt={"RMEET logo image"}
			style={{
				width,
				height,
			}}
		/>
	);
};
Logo.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
};

export default Logo;
