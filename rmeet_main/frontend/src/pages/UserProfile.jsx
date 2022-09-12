import React from "react"
import styled from "styled-components"
import ProfileImg from "../components/ProfileImg"
import DefaultImg from "../lib/img/icon/user.svg"

const UserProfile = () => {
  return (
    <ProfileContainer>
        <Heading>User Profile</Heading>
        <ProfileContent>
            <PersonalInfo>
                <Title>Personal Info</Title>
                <ProfileImg
					src={DefaultImg}
                    width= "8rem"
                    height= "8rem"
                />
                <Field>
                    <Label htmlFor="username">Username:</Label>
                    <InputField id="username" type="text" value="John Doe"></InputField>
                </Field>
                <Field>
                    <Label htmlFor="gender">Gender:</Label>
                    <SelectBox id="gender">
                        <Option value=""></Option>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="unspecified">Unspecified</Option>
                    </SelectBox>
                </Field>
                <Field>
                    <Label htmlFor="email">Email:</Label>
                    <InputField id="email" type="email" value="s1234567@rmit.edu.vn"></InputField>
                </Field>
                <Field>
                    <Label htmlFor="password">Password:</Label>
                    <InputField id="password" type="password" value="123456789"></InputField>
                </Field>
            </PersonalInfo>
            <AcademicInfo>
                <Title>Academic Info</Title>
                <Field>
                    <Label htmlFor="major">Major:</Label>
                    <InputField id="major" type="text" value="Information Technology"></InputField>
                </Field>
                <Field>
                    <Label htmlFor="bio">Bio:</Label>
                    <Area id="bio" type="textarea" rows="5" spellcheck="false" value="Pop culture fanatic. Incurable food specialist. Beer buff. Baconaholic. Twitter enthusiast. Music fan."></Area>
                </Field>
                <Field>
                    <Label htmlFor="courses">Completed course(s):</Label>
                    <Area id="courses" type="textarea" rows="10" spellcheck="false" value=""></Area>
                </Field>
            </AcademicInfo>
        </ProfileContent>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 1.5rem;
    margin: 0 auto;

    @media screen and (max-width: 1199px) {
        position: absolute;
        justify-content: space-between;
        padding: 7rem 0 0 0;
    }
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    color: black;
    font-weight: 900;
`

const ProfileContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1199px) {
        height: auto;
        position: relative;
        flex-direction: column;
        padding: 1rem 0;
    }
`

const PersonalInfo = styled.div`
    height: inherit;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: #00005433;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: 0.2rem solid #000054;
    padding: 1.2rem 1.2rem 10rem 1.2rem;

    @media screen and (max-width: 1199px) {
        height: 80vh;
        width: 90%;
        border-top-right-radius: 1rem;
        border-bottom-left-radius: 0;
        border-bottom: 0.2rem solid #000054;
        border-right: none;
    }
`

const AcademicInfo = styled.div`
    height: inherit;
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: #00005433;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem; 
    border-left: 0.2rem solid #000054;
    padding: 1.2rem 1.2rem 8rem 1.2rem;

    @media screen and (max-width: 1199px) {
        height: 80vh;
        width: 90%;
        border-bottom-left-radius: 1rem;
        border-top-right-radius: 0;
        border-top: 0.2rem solid #000054;
        border-left: none;
    }
`

const Title = styled.h2`
    font-family: "Orbitron", sans-serif;
    font-size: 1.6rem;
    color: #000054;
`

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-weight: 700;
    color: #000054;
    margin-right: 1rem;
    width: 10rem;
    display: flex;
    align-items: center;
`

const InputField = styled.input`
    border-radius: 1rem;
    border: none;
    text-align: center;
    transition: 0.25s ease-in-out;

    &:focus {
        transform: scale(1.05, 1.05);
        background-color: lightskyblue;
    }
`

const SelectBox = styled.select`
    width: 100%;
    border-radius: 1rem;
    border: none;
    text-align: center;
    display: flex;
`

const Option = styled.option`
    color: #000054;
`

const Area = styled.textarea`
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: none;
    transition: 0.25s ease-in-out;
    cursor: default;

    &:focus {
        transform: scaleX(1.05);
        background-color: lightskyblue;
    }
`

export default UserProfile;
