import React, { useState } from "react";
import { AccPageTemplate } from "../../components";
import { Verification, CreateAccount } from "../../pages";

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("");

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
