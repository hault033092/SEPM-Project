import React, { useState } from "react";
import AccPageTemplate from "../../components/AccPageTemplate"
import Verification from "./Verification"
import CreateAccount from "./CreateAccount"

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("s4444444@rmit.edu.vn");

	const _handleConfirmedEmail = confirmedEmail => {
		setConfirmedEmail(confirmedEmail);
	};

	return (
		<AccPageTemplate
			pageTitle={confirmedEmail !== "" ? "Create an account" : "Verification"}
			isCreateAccount={confirmedEmail !== ""}>
			{confirmedEmail !== "" ? (
				<CreateAccount studentEmail={confirmedEmail} />
			) : (
				<Verification setConfirmedEmail={_handleConfirmedEmail} />
			)}
		</AccPageTemplate>
	);
};

export default Signup;
