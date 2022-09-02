import React, { useState } from "react";
import AccPageTemplate from "../../components/AccPageTemplate";
import Verification from "./Verification";
import CreateAccount from "./CreateAccount";

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("");
	const [isSpinner, setIsSpinner] = useState(false);

	const _handleConfirmedEmail = confirmedEmail => {
		setConfirmedEmail(confirmedEmail);
	};

	return (
		<AccPageTemplate
			pageTitle={confirmedEmail !== "" ? "Create an account" : "Verification"}
			isSpinnerVisible={isSpinner}
			isCreateAccount={confirmedEmail !== ""}>
			{confirmedEmail !== "" ? (
				<CreateAccount
					studentEmail={confirmedEmail}
					setIsSpinner={setIsSpinner}
				/>
			) : (
				<Verification setConfirmedEmail={_handleConfirmedEmail} />
			)}
		</AccPageTemplate>
	);
};

export default Signup;
