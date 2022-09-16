import React, { useState } from "react";
import AccPageTemplate from "../../components/AccPageTemplate";
import Verification from "./Verification";
import CreateAccount from "./CreateAccount";

const Signup = () => {
	const [confirmedEmail, setConfirmedEmail] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const _handleConfirmedEmail = confirmedEmail => {
		setConfirmedEmail(confirmedEmail);
	};

	return (
		<AccPageTemplate
			pageTitle={confirmedEmail !== "" ? "Create an account" : "Verification"}
			isCreateAccount={confirmedEmail !== ""}
			isSpinnerVisible={isVisible}>
			{confirmedEmail !== "" ? (
				<CreateAccount
					studentEmail={confirmedEmail}
					setIsSpinner={setIsVisible}
				/>
			) : (
				<Verification
					setConfirmedEmail={_handleConfirmedEmail}
					setIsSpinner={setIsVisible}
				/>
			)}
		</AccPageTemplate>
	);
};

export default Signup;
