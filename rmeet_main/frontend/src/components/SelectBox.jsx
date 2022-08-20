import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	flex-direction: column;
	width: 100%;
	margin-bottom: ${props => (props.style.margin ? props.style.margin : "5%")};
	border: ${props => (props.style.border ? props.style.border : "none")};
`;

const LabelContainer = styled(Container)`
	display: ${props => (props.label === "" ? "none" : "block")};
	margin: ${props =>
		props.style.labelContMargin ? props.style.labelContMargin : "2vh 0"};
`;

const StyledLabel = styled.label`
	width: 100%;
	font-size: 1.2vw;
	font-weight: 600;
	color: ${props =>
		props.style.labelColor ? props.style.labelColor : props.theme.mainBlue};
`;

const StyledSelect = styled.select`
	border: ${props =>
		props.style.selectContBorder ? props.style.selectContBorder : "none"};
	color: ${props => props.theme.mainBlue};
	width: 100%;
	padding: 0.5vw;
	font-size: 1vw;
	border-radius: 10px;
	cursor: pointer;
	box-shadow: 0 2px 0 white;
`;

const SelectBox = ({ label, groups, value, onChange, isGrouped, style }) => {
	const renderOptions = options => {
		return options.map(option => {
			return (
				<option key={option.key} value={option.key}>
					{option.value}
				</option>
			);
		});
	};

	const renderOtpGroups = groups => {
		return Object.keys(groups).map((options, index) => {
			return (
				<optgroup key={index} label={options}>
					{renderOptions(groups[options])}
				</optgroup>
			);
		});
	};

	return (
		<Container style={style}>
			<LabelContainer style={style} label={label}>
				<StyledLabel htmlFor={label} style={style}>
					{label}
				</StyledLabel>
			</LabelContainer>
			<StyledSelect
				name={label}
				id={label}
				value={value}
				onChange={onChange}
				style={style}>
				{isGrouped ? renderOtpGroups(groups) : renderOptions(groups)}
			</StyledSelect>
		</Container>
	);
};

SelectBox.propTypes = {
	label: PropTypes.string,
	groups: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.object,
};

SelectBox.defaultProps = {
	label: "",
	style: {},
};

export default SelectBox;
