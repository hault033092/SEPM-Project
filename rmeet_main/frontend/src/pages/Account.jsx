import { React, useState } from "react"
import styled from "styled-components"
import { user } from "../lib/img/icon";
import ProfileImage from "../components/ProfileImage"

const Account = () => {
    const [profileImg, setProfileImg] = useState(user);

    const _handleProfileImgChange = e => {
		const {
			target: { files },
		} = e;

		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = readDataCompleted => {
			const {
				currentTarget: { result },
			} = readDataCompleted;
			setProfileImg(result);
		};
		reader.readAsDataURL(theFile);
	};

    return (
        <AccountContainer>
            <Heading>Account Details</Heading>
            <AccountContent>
                <PersonalInfo>
                    <Title>Personal Info</Title>
                    <ProfileImage
					src={profileImg}
                    width= "8rem"
                    height= "8rem"
					onChangePhoto={_handleProfileImgChange}
					isShowButton />
                    <Field>
                        <Label htmlFor="email">Email:</Label>
                        <InputField id="email" type="email" value="s1234567@rmit.edu.vn"></InputField>
                    </Field>
                    <Field>
                        <Label htmlFor="username">Username:</Label>
                        <InputField id="username" type="text" value="John Doe"></InputField>
                    </Field>
                    <Field>
                        <Label htmlFor="password">Password:</Label>
                        <InputField id="password" type="password" value="123456789"></InputField>
                    </Field>
                    <Button>Sign out</Button>
                    <Button>Delete Account</Button>
                </PersonalInfo>
                <AcademicInfo>
                    <Title>Academic Info</Title>
                    <Field>
                        <Label htmlFor="major">Major:</Label>
                        <InputField id="major" type="text" value="Information Technology"></InputField>
                    </Field>
                    <Field>
                        <Label htmlFor="bio">Your Bio:</Label>
                        <Area id="bio" type="textarea" rows="5" spellcheck="false" value="Pop culture fanatic. Incurable food specialist. Beer buff. Baconaholic. Twitter enthusiast. Music fan."></Area>
                    </Field>
                    <Field>
                        <Label htmlFor="courses">Completed course(s):</Label>
                        <Area id="courses" type="textarea" rows="15" spellcheck="false" value=""></Area>
                        <AddButton>+ Add Course</AddButton>
                    </Field>
                    <SubmitField>
                        <CancelButton>Cancel Changes</CancelButton>
                        <SaveButton>Save Changes</SaveButton>                
                    </SubmitField>
                </AcademicInfo>
            </AccountContent>
        </AccountContainer>
    )
}

const AccountContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.5rem 0;
    margin: 0 auto;
`

const AccountContent = styled.div`
    height: inherit;
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    color: black;
    font-weight: 900;
`

const PersonalInfo = styled.div`
    height: inherit;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #00005433;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: 0.2rem solid #000054;
    padding: 1.5rem 1.5rem;
`

const AcademicInfo = styled.div`
    height: inherit;
    width: 65%;
    display: flex;
    align-items: center;
    // justify-content: space-around;
    flex-direction: column;
    background-color: #00005433;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem; 
    border-left: 0.2rem solid #000054;
    padding: 1.5rem 3rem;
`

const Title = styled.h2`
    font-family: "Orbitron", sans-serif;
    font-size: 1.6rem;
    color: #000054;
`

const Label = styled.label`
    font-weight: 700;
    color: #000054;
`

const InputField = styled.input`
    border-radius: 1rem;
    border: none;
    text-align: center;
    transition: 0.25s ease-in-out;
    padding: 0.5rem 0;

    &:focus {
        transform: scale(1.05, 1.05);
        background-color: lightskyblue;
    }
`

const Area = styled.textarea`
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: none;
    transition: 0.25s ease-in-out;

    &:focus {
        transform: scaleX(1.05);
        background-color: lightskyblue;
    }
`

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const SubmitField = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`

const Button = styled.button`
    width: 100%;
    border-radius: 1rem;
    border: none;
    padding: 0.5rem 0;
    background-color: red;
    color: #FFFFFF;
    font-weight: 700;
    transition: 0.25s ease-in-out;

    &:hover {
        opacity: 0.75;
    }
`

const AddButton = styled(Button)`
    width: 8rem;
    border-radius: 0.5rem;
    background-color: #000054;
    margin: 0.5rem 0;
`

const CancelButton = styled(Button)`
    width: 8rem;
`

const SaveButton = styled(Button)`
    width: 8rem;
`

export default Account;