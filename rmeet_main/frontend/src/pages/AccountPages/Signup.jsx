import React, { useState } from "react";
import AccPageTemplate from "../../components/TemplateCmp/AccPageTemplate"
import Verification from "./Verification"
import CreateAccount from "./CreateAccount"

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("12gain3701@gmail.com");

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
