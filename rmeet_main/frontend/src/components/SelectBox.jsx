import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	flex-direction: column;
	width: 100%;
	margin-bottom: 5%;
`;

const LabelContainer = styled(Container)`
	margin: 2vh 0;
`;

const StyledLabel = styled.label`
	width: 100%;
	font-size: 1.2vw;
	font-weight: 600;
	color: #ffffff;
`;

const StyledSelect = styled.select`
	border: none;
	color: #000054;
	width: 100%;
	padding: 0.5vw 0.5vh;
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
			<LabelContainer>
				<StyledLabel htmlFor={label}>*{label} : </StyledLabel>
			</LabelContainer>
			<StyledSelect name={label} id={label} value={value} onChange={onChange}>
				{isGrouped ? renderOtpGroups(groups) : renderOptions(groups)}
			</StyledSelect>
		</Container>
	);
};

SelectBox.propTypes = {
	label: PropTypes.string.isRequired,
	groups: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.object,
};

export default SelectBox;
