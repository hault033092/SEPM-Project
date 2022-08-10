import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Input from "./Input";

const MainCont = styled.div`
	width: ${props => props.width};
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	position: relative;
	margin: auto;
	position: relative;
`;

const SearchCont = styled.div`
	display: flex;
	height: 100%;
	border: 0.5vw solid ${props => props.theme.mainBlue};
	border-bottom: ${props => (props.isShow ? "none" : "0.5vw solid #000056")};
`;

const IconCont = styled.div`
	width: 15%;
	display: flex;
	justify-content: flex-end;
`;

const IconWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ResCont = styled.div`
	display: ${props => (props.isShow ? "block" : "hidden")};
`;

const StyledUl = styled.ul`
	width: ${props => props.width};
	position: absolute;
	z-index: 1;
	border: ${props => (props.isShow ? "0.5vw solid #000056" : "none")};
	border-top: none;
`;

const StyledList = styled.li`
	padding: 2%;
	list-style: none;
	font-size: 1.2vw;
	opacity: 1;
	background-color: ${props => props.theme.lightGrey};
	cursor: pointer;
	:hover {
		background-color: ${props => props.theme.hoverBlue};
	}
`;

const List = ({ value, onSetValue, onSubmit }) => {
	const _onClick = () => {
		onSetValue(value);
		onSubmit();
	};

	return (
		<div
			onClick={_onClick}
			onMouseEnter={() => {
				onSetValue(value);
			}}>
			<StyledList>{value}</StyledList>
		</div>
	);
};

const SearchBar = ({
	value,
	onChange,
	placeholder,
	valuesList,
	onSubmit,
	onDelete,
	setValue,
	width,
}) => {
	const [matchedList, setMatchedList] = useState([]);
	const [isShow, setIsShow] = useState(false);
	const _searchMatchedList = () => {
		if (value.length <= 2) {
			setMatchedList([]);
			return;
		}

		let res = [];
		for (let idx = 0; idx < valuesList.length; idx++) {
			if (valuesList[idx].value.toLowerCase().includes(value.toLowerCase())) {
				res.push(valuesList[idx].value);
			}
		}
		setMatchedList(res);
		setIsShow(true);
	};

	const _onEnterPress = e => {
		if (e.key === "Enter") {
			onSubmit();
		}
	};

	const _onSubmit = () => {
		setIsShow(false);
		setMatchedList([]);
		onSubmit();
	};

	const _onDelete = () => {
		setIsShow(false);
		onDelete();
	};

	return (
		<MainCont width={width}>
			<SearchCont isShow={isShow}>
				<Input
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onKeyUp={_searchMatchedList}
					onKeyPress={_onEnterPress}
					isLabelHidden
					style={{
						padding: "1.5%",
						fontSize: "1.2vw",
						width: "100%",
						borderWidth: "0",
						borderRadius: "0",
					}}
				/>
				<IconCont onClick={_onSubmit}>
					<IconWrapper onClick={_onDelete}>
						<FontAwesomeIcon icon={solid("x")} fontSize='1.5vw' />
					</IconWrapper>
					<IconWrapper>
						<FontAwesomeIcon icon={solid("search")} fontSize='1.5vw' />
					</IconWrapper>
				</IconCont>
			</SearchCont>
			<ResCont isShow={isShow}>
				<StyledUl width={width} isShow={isShow}>
					{matchedList.map((item, index) => (
						<List
							key={index}
							value={item}
							onSetValue={setValue}
							onSubmit={_onSubmit}
						/>
					))}
				</StyledUl>
			</ResCont>
		</MainCont>
	);
};

SearchBar.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	valuesList: PropTypes.array,
	onSubmit: PropTypes.func,
	onDelete: PropTypes.func,
	setValue: PropTypes.func,
	width: PropTypes.string,
};

export default SearchBar;
