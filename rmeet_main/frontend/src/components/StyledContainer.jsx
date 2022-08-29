import styled from "styled-components";

export const StyledContainer = styled.div`
	display: ${props => (props.display ? props.display : "flex")};
	width: ${props => (props.width ? props.width : "auto")};
	height: ${props => (props.height ? props.height : "auto")};
	margin: ${props => (props.margin ? props.margin : "0")};
	padding: ${props => (props.padding ? props.padding : "auto")};
	flex-direction: ${props => (props.direction ? props.direction : "row")};
	justify-content: ${props => (props.content ? props.content : "center")};
	align-items: ${props => (props.items ? props.items : "center")};
	align-self: ${props => (props.self ? props.self : "center")};
`;