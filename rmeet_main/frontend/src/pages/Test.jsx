import React from "react";
import { AutoSlideshow } from "../components";
import { imagesData } from "../lib/data";

function Test() {
	return <AutoSlideshow images={imagesData} delayTime={4000} />;
}

export default Test;
