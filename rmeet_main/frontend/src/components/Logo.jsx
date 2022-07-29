import Image from "./Image";
import PropTypes from "prop-types";
import {logo} from "../lib/img/illustration";

const Logo = ({ width, height }) => {
	return (
		<Image
			src={logo}
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
