import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MainCont = styled.div`
	width: ${props => props.width};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 5px;
	box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.15);
`;

const SearchCont = styled.div`
	display: flex;
`;

const IconCont = styled.div`
	width: 25%;
	display: flex;
`;

const IconWrapper = styled.div`
	width: 30%;
	margin-left: 5%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: tomato;
`;

const ResCont = styled.div``;

const Input = styled.input`
	width: 100%;
	border: none;
	height: 100%;
	border-radius: 5px;
	padding: 0px 40px 0px 10px;
	font-size: 18px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
	:focus {
		outline: none;
	}
`;

const StyledUl = styled.ul`
	width: 95%;
`;

const StyledList = styled.li`
	list-style: none;
	border-radius: 3px;
	opacity: 1;
	padding: 8px 12px;
	transition: all 0.5s linear;
	background-color: ${props => props.theme.screenBg};

	:hover {
		background: #ececec;
		cursor: pointer;
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
	valuesList,
	onSubmit,
	onDelete,
	setValue,
	width,
}) => {
	const [matchedList, setMatchedList] = useState([]);
	const _searchMatchedList = () => {
		if (value.length <= 2) {
			setMatchedList([]);
			return;
		}

		let res = [];
		for (let idx = 0; idx < valuesList.length; idx++) {
			if (valuesList[idx].toLowerCase().includes(value.toLowerCase())) {
				res.push(valuesList[idx]);
			}
		}
		setMatchedList(res);
	};

	const _onEnterPress = e => {
		if (e.key === "Enter") {
			onSubmit();
		}
	};

	const _onSubmit = () => {
		setMatchedList([]);
		onSubmit();
	};

	return (
		<MainCont width={width}>
			<SearchCont>
				<Input
					value={value}
					onChange={onChange}
					onKeyUp={_searchMatchedList}
					onKeyPress={_onEnterPress}
					isLabelHidden
					style={{ padding: "1.5%", fontSize: "1.2vw" }}
				/>
				<IconCont onClick={_onSubmit}>
					{value.length > 0 && (
						<IconWrapper onClick={onDelete}>
							<FontAwesomeIcon icon={solid("x")} fontSize='1.5vw' />
						</IconWrapper>
					)}
					<IconWrapper>
						<FontAwesomeIcon icon={solid("search")} fontSize='1.5vw' />
					</IconWrapper>
				</IconCont>
			</SearchCont>
			<ResCont className='recommendValuesList'>
				<StyledUl>
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

export default SearchBar;
