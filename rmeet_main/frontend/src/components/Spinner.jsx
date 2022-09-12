import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/* Components */
import { Spinner as BootSpinner } from "react-bootstrap";
import { FlexContainer } from "./FlexContainer";

const SpinnerCont = styled(FlexContainer)`
	flex-direction: column;
	width: 100%;
	height: 100%;
	background-color: ${props => (props.fullSize ? "#7a7a7a63" : "none")};
	z-index: ${props => (props.fullSize ? "30" : "none")};
	position: ${props => (props.fullSize ? "absolute" : "none")};
`;

const LoadingMsg = styled.p`
	color: #454545;
	font-weight: 600;
	font-size: 2vw;
	margin: 2vw;
`;

const Spinner = ({ isVisible, isFullSize }) => {
	return isVisible ? (
		<SpinnerCont fullSize={isFullSize}>
			<BootSpinner
				animation='border'
				role='status'
				style={{
					width: "3rem",
					height: "3rem",
					borderWidth: "0.5rem",
				}}>
				<span className='visually-hidden'>Loading...</span>
			</BootSpinner>
			<LoadingMsg>Loading...</LoadingMsg>
		</SpinnerCont>
	) : null;
};

Spinner.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	isFullSize: PropTypes.bool,
};

export default Spinner;
