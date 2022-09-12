import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Account from "./Account"
import CourseReview from "./CourseReview"
import CreatePost from "./CreatePost"
import MessageBox from "./MessageBox"

const Pages = () => {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/review-course" element={<CourseReview />}></Route>
            <Route path="/board/create-post" element={<CreatePost />}></Route>
            <Route path="/message-box" element={<MessageBox />}></Route>
        </Routes>
  )
}

export default Pages