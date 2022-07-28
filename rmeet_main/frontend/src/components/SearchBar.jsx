import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const MainCont = styled.div`
	width: ${props => props.width};
	display: flex;
	flex-direction: column;
	background: #ffffff;
	border-radius: 5px;
	box-shadow: 0px 1px 5px 3px rgba(0, 0, 0, 0.15);
`;

const SearchCont = styled.div`
	display: flex;
`;

const IconCont = styled.div`
	width: 5%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: tomato;
	:focus {
		outline: none;
	}
`;

const ResCont = styled.div``;

const Input = styled.input`
	width: 95%;
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
	}
`;

const SearchBar = ({ value, onChange, tagList, onKeyPress, width }) => {
	const [matchedList, setMatchedList] = useState([]);
	const _searchMatchedList = () => {
		if (value.length <= 2) {
      setMatchedList([]);
			return;
		}
		let res = [];
		for (let idx = 0; idx < tagList.length; idx++) {
			if (tagList[idx].startsWith(value)) {
				res.push(tagList[idx]);
			}
		}

		setMatchedList(res);
	};

	return (
		<MainCont width={width}>
			<SearchCont>
				<Input
					value={value}
					onChange={onChange}
					onKeyUp={_searchMatchedList}
					isLabelHidden
				/>
				<IconCont onClick={onKeyPress}>
					<FontAwesomeIcon icon={solid("search")} fontSize='1.5vw' />
				</IconCont>
			</SearchCont>
			<ResCont className='recommendTagList'>
				<StyledUl>
					{matchedList.map((item, index) => (
						<StyledList key={index}>{item}</StyledList>
					))}
				</StyledUl>
			</ResCont>
		</MainCont>
	);
};

export default SearchBar;
