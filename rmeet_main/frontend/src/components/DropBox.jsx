import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FlexContainer } from "./FlexContainer";
import Image from "./Image";
import editIcon from "../lib/img/icon/editIcon.svg";
import deleteIcon from "../lib/img/icon/deleteIcon.svg";

const OptionsWrapper = styled(FlexContainer)`
	justify-content: flex-end;
	width: 100%;
	height: 100%;
`;

const IconCont = styled(OptionsWrapper)`
	cursor: pointer;
`;

const DropBox = ({onEdit, onDelete}) => {
	return (
		<OptionsWrapper>
			<IconCont onClick={onEdit}>
				<Image
					src={editIcon}
					alt={"edit icon"}
					style={{ width: "1.5vw", height: "1.5vw" }}
				/>
			</IconCont>
			<IconCont onClick={onDelete}>
				<Image
					src={deleteIcon}
					alt={"delete icon"}
					style={{ width: "1.5vw", height: "1.5vw" }}
				/>
			</IconCont>
		</OptionsWrapper>
	);
};

DropBox.propTypes = {
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default DropBox;
