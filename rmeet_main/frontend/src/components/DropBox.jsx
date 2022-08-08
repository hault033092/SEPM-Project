import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FlexContainer } from "./FlexContainer";

const OptionsWrapper = styled(FlexContainer)`
	width: 10vw;
	flex-direction: column;
	justify-content: space-between;
	padding: 2%;
	cursor: pointer;
	background-color: ${props => props.theme.lightGrey};
`;

const OptionCont = styled(OptionsWrapper)`
	z-index: 999;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	margin: 0 3%;
	padding: 5%;
	background-color: ${props => props.theme.screenBg};
	border-radius: 5px;
	:hover {
		background-color: ${props => props.theme.tagColor};
	}
`;
const StyledText = styled.p`
	font-weight: 600;
	font-size: 1vw;
	color: ${props => props.theme.fontColor};
`;
const DropBox = ({ options }) => {
	return (
		<OptionsWrapper>
			{Object.values(options).map((option, index) => (
				<OptionCont key={index} onClick={option.onClick}>
					<StyledText>{option.title}</StyledText>
				</OptionCont>
			))}
		</OptionsWrapper>
	);
};

DropBox.propTypes = {
	options: PropTypes.object.isRequired,
};

export default DropBox;
