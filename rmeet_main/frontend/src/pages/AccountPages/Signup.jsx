import React, { useState } from "react";
import AccPageTemplate from "../../components/TemplateCmp/AccPageTemplate"
import { Verification, CreateAccount } from "../../pages";

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("asd");

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
