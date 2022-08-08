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
`;

const SearchCont = styled.div`
	display: flex;
	height: 100%;
	border: 3px solid ${props => props.theme.mainBlue};
`;

const IconCont = styled.div`
	width: 15%;
	display: flex;
	justify-content: flex-end;
	background-color: ${props => props.theme.mainBlue};
`;

const IconWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ResCont = styled.div`
	display: ${props => (props.isShow ? "block" : "hidden")};
	border: 2px solid tomato;
	z-index: 999;
`;

const StyledUl = styled.ul`
	width: ${props => props.width};
`;

const StyledList = styled.li`
	padding: 2%;
	list-style: none;
	opacity: 1;
	background-color: ${props => props.theme.screenBg};
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
			<SearchCont>
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
						<FontAwesomeIcon
							icon={solid("x")}
							fontSize='1.5vw'
							color={"#fff"}
						/>
					</IconWrapper>
					<IconWrapper>
						<FontAwesomeIcon
							icon={solid("search")}
							fontSize='1.5vw'
							color={"#fff"}
						/>
					</IconWrapper>
				</IconCont>
			</SearchCont>
			<ResCont isShow={isShow}>
				<StyledUl width={width}>
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
