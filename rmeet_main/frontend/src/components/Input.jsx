import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
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

const StyledInput = styled.input.attrs(({ isPassword, disabled }) => ({
	type: isPassword ? "password" : "text",
	disabled: disabled,
}))`
	width: ${props => props.style.width};
	padding: ${props => props.style.padding};
	font-size: ${props => props.style.fontSize};
	border-radius: 10px;
	border-width: 2px;
	background-color: ${props => (props.disabled ? "#d7d7d7" : "#fff")};
`;

const StyledTextarea = styled.textarea`
	width: ${props => props.style.width};
	height: 18vh;
	padding: ${props => props.style.padding};
	font-size: ${props => props.style.fontSize};
	border-radius: 10px;
	border-width: 2px;
	resize: none;
	background-color: #fff;
`;

const Input = ({
	label,
	value,
	placeholder,
	maxLength,
	onChange,
	onKeyPress,
	isPassword,
	isLabelHidden,
	isRequired,
	disabled,
	style,
	isMultipleLine,
}) => {
	const _onKeyPress = e => {
		if (e.key === "Enter") {
			onKeyPress();
		}
	};

	return (
		<Container>
			{isLabelHidden || (
				<LabelContainer>
					<StyledLabel htmlFor={label}>
						{isRequired ? "*" : ""}
						{label} :{" "}
					</StyledLabel>
				</LabelContainer>
			)}
			{isMultipleLine ? (
				<StyledTextarea
					id={label}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onKeyPress={_onKeyPress}
					maxLength={maxLength}
					style={style}
				/>
			) : (
				<StyledInput
					id={label}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onKeyPress={_onKeyPress}
					maxLength={maxLength}
					style={style}
					isPassword={isPassword}
					disabled={disabled}
				/>
			)}
		</Container>
	);
};

Input.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func,
	style: PropTypes.object,
	isPassword: PropTypes.bool,
	isLabelHidden: PropTypes.bool,
	isRequired: PropTypes.bool,
	disabled: PropTypes.bool,
};

Input.defaultProps = {
	onKeyPress: () => {},
	onChange: () => {},
	style: { width: "100%", padding: "0.8vh 1vw", fontSize: "1vw" },
};

export default Input;