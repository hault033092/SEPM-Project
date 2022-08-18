import React from 'react'
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const CourseReview = () => {
    const navigate = useNavigate();

    return (
        <ReviewContainer>
            <Heading>Account Details</Heading>
            <ReviewContent>
                <Label htmlFor="courseName">*Course name:</Label>
                <ReviewInputField id="courseName" type="text" value="" placeholder="Enter course name" required></ReviewInputField>
                <ReviewToggle>
                    <Text>Please write a review to help other students:</Text>
                    <ReviewInputField id="skipReview" type="radio" value="Skip" name="choice" style={{width: "auto",}}></ReviewInputField>
                    <Label htmlFor="skipReview">Skip for now!</Label>
                    <ReviewInputField id="doReview" type="radio" value="Review" name="choice" style={{width: "auto",}}></ReviewInputField>
                    <Label htmlFor="doReview">Leave a review!</Label>
                </ReviewToggle>
                <MainReview>
                    <ReviewSection>
                        <Title>Overall Review</Title>
                        <ReviewField>
                            <Label htmlFor="courseNameReview">Course name:</Label>
                            <ReviewInputField id="courseNameReview" type="text" value="" placeholder="Enter course name"></ReviewInputField>
                        </ReviewField>
                        <ReviewField>
                            <Label htmlFor="rating">Rating (out of 5):</Label>
                        </ReviewField>
                        <ReviewField>
                            <SelectGroup>
                                <Label htmlFor="semester">Completed semester:</Label>
                                <SelectBox id="semester">
                                    <Option value=""></Option>
                                    <Option value="october">October</Option>
                                    <Option value="june">June</Option>
                                    <Option value="february">February</Option>
                                </SelectBox>
                            </SelectGroup>
                            <SelectGroup>
                                <Label htmlFor="year">Completed year:</Label>
                                <SelectBox id="year">
                                    <Option value=""></Option>
                                    <Option value="2022">2022B</Option>
                                    <Option value="2022">2022A</Option>
                                    <Option value="2021">2021C</Option>
                                </SelectBox>
                            </SelectGroup>
                        </ReviewField>
                        <ReviewField>
                            <Label htmlFor="lecturerName">Lecturer name:</Label>
                            <ReviewInputField id="lecturerName" type="text" value="" placeholder="Enter lecturer name"></ReviewInputField>
                        </ReviewField>
                            <Label htmlFor="review">Detailed review:</Label>
                            <Area id="review" type="textarea" rows="3" spellcheck="false" value=""></Area>
                    </ReviewSection>
                    <AssignmentSection>
                        <Title>Assignments</Title>
                        <ReviewField>
                            <Label htmlFor="type">Assignment type:</Label>
                            <SelectBox id="type">
                                <Option value=""></Option>
                                <Option value="quiz">Quiz</Option>
                                <Option value="team">Team</Option>
                                <Option value="individual">Individual</Option>
                            </SelectBox>
                        </ReviewField>
                        <ReviewField>
                            <Label htmlFor="quantity">Quantity:</Label>
                            <ReviewInputField id="quantity" type="number" value=""></ReviewInputField>
                        </ReviewField>
                        <AddButton>+ Add assignment</AddButton>
                    </AssignmentSection>
                </MainReview>
                <CourseInfo>
                    <Title>Course Information</Title>
                    <ReviewField>
                        <Text>Study mode:</Text>
                        <ReviewInputField id="mode1" type="radio" value="Offline" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="mode1">Offline</Label>
                        <ReviewInputField id="mode2" type="radio" value="Online" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="mode2">Online</Label>
                        <ReviewInputField id="mode3" type="radio" value="Hybrid" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="mode3">Hybrid</Label>
                    </ReviewField>
                    <ReviewField>
                        <Text>Course type:</Text>
                        <ReviewInputField id="type1" type="radio" value="Lecture" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="type1">Lecture only</Label>
                        <ReviewInputField id="type2" type="radio" value="Tutorial" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="type2">Tutorial only</Label>
                        <ReviewInputField id="type3" type="radio" value="Both" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="type3">Hybrid</Label>
                    </ReviewField>
                    <ReviewField>
                        <Text>Recommended:</Text>
                        <ReviewInputField id="first" type="radio" value="1st" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="first">1st year students</Label>
                        <ReviewInputField id="second" type="radio" value="2nd" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="second">2nd year students</Label>
                        <ReviewInputField id="third" type="radio" value="3rd" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="third">3rd year students</Label>
                        <ReviewInputField id="any" type="radio" value="all" name="option" style={{width: "auto",}}></ReviewInputField>
                        <Label htmlFor="any">All students</Label>
                    </ReviewField>
                </CourseInfo>
                <SubmitField>
                    <CancelButton onClick={() => {navigate("/account")}}>Cancel</CancelButton>
                    <SaveButton>Save course</SaveButton>
                </SubmitField>
            </ReviewContent> 
        </ReviewContainer>
    )
}

const ReviewContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 1.5rem;
    margin: 0 auto;
`

const Heading = styled.h1`
    font-family: "Orbitron", sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    color: black;
    font-weight: 900;
`

const Title = styled.h2`
    font-family: "Orbitron", sans-serif;
    font-size: 1.6rem;
    color: #000054;
`

const ReviewContent = styled.div`
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: #FFFFFF;
    border-radius: 1rem;
    border: 0.4rem solid #000054;
    padding: 0 1.5rem;
`

const ReviewField = styled.div`
    width: 100%;
    display: flex;
`

const MainReview = styled.div`
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

const ReviewSection = styled.div`
    width: 66%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #00005433;
    padding: 1rem 1rem;
    border-radius: 1rem;
`

const AssignmentSection = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #00005433;
    padding: 1rem 1rem;
    border-radius: 1rem;
`

const CourseInfo = styled.div`
    height: 25%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: #00005433;
    border-radius: 1rem;
    padding: 1rem 1rem;
`

const Label = styled.label`
    font-weight: 700;
    color: #000054;
    margin-right: 1rem;
    width: 10rem;
    display: flex;
    align-items: center;
`

const ReviewInputField = styled.input`
    width: 100%;
    border-radius: 1rem;
    border: 0.2rem solid black;
    margin-right: 0.5rem;
    text-align: center;
    transition: 0.25s ease-in-out;

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
    cursor: default;

    &:focus {
        transform: scaleX(1.05);
        background-color: lightskyblue;
    }
`

const ReviewToggle = styled.div`
    width: 100%;
    display: flex;
`

const Text = styled.p`
    color: #000054;
    font-weight: 700;
    margin-right: 1.5rem;
`

const SelectGroup = styled.div`
    display: flex;
    margin-right: 2rem;
`

const SelectBox = styled.select`
    width: 6rem;
    border-radius: 1rem;
    border: none;
    text-align: center;
    display: flex;
`

const Option = styled.option`
    color: #000054;
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
    display: flex;
    align-items: center;
    justify-content: center;
`

const CancelButton = styled(Button)`
    width: 8rem;
`

const SaveButton = styled(Button)`
    width: 8rem;
`

export default CourseReview;