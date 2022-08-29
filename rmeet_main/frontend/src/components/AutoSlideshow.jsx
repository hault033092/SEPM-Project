import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Image from "./Image";

const SlideShow = styled.div`
	margin: 0 auto;
	overflow: hidden;
	width: 35vw;
	max-width: 600px;
	@media (max-width: 820px) {
		display: none;
	}
`;
const SlideShowSlider = styled.div`
	white-space: nowrap;
	transition: ease 1000ms;
`;
const Slide = styled.div`
	display: inline-block;
	position: relative;
	height: 40vh;
	width: 100%;
`;
const SlideShowDots = styled.div`
	text-align: center;
`;
const SlideShowDot = styled.div`
	display: inline-block;
	height: 15px;
	width: 15px;
	border-radius: 50%;
	cursor: pointer;
	margin: 0 5px;

	background-color: ${props =>
		props.isCurrentSlide ? props.theme.mainBlue : props.theme.darkGrey};
`;

const Desc = styled.p`
	position: absolute;
	width: auto;
	height: 0;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	text-align: center;
	font-weight: 700;
	font-size: 2vw;
	color: ${props => props.theme.slideMsg};
`;

const AutoSlideshow = ({ images, delayTime }) => {
	const [currentIdx, setCurrentIdx] = React.useState(0);
	const timeoutRef = React.useRef(null);

	const ImgStyle = { width: "100%", height: "100%", filter: "brightness(20%)" };

	const resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const handleChangeIdx = () => {
		const numOfImg = images.length;
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setCurrentIdx(prevIndex =>
					prevIndex === numOfImg - 1 ? 0 : prevIndex + 1
				),
			delayTime
		);
	};

	useEffect(() => {
		handleChangeIdx();
		return () => {
			resetTimeout();
		};
	}, [currentIdx]);

	return (
		<SlideShow>
			<SlideShowSlider
				style={{ transform: `translate3d(${-currentIdx * 100}%, 0, 0)` }}>
				{images.map((item, index) => (
					<Slide key={index}>
						<Image src={item.src} style={ImgStyle} />
						<Desc>{item.desc}</Desc>
					</Slide>
				))}
			</SlideShowSlider>

			<SlideShowDots>
				{images.map((item, index) => (
					<SlideShowDot
						key={index}
						isCurrentSlide={currentIdx === index}
						onClick={() => {
							setCurrentIdx(index);
						}}></SlideShowDot>
				))}
			</SlideShowDots>
		</SlideShow>
	);
};
AutoSlideshow.propTypes = {
	images: PropTypes.array.isRequired,
	delayTime: PropTypes.number.isRequired,
};
export default AutoSlideshow;
