import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Timetable from "./Timetable"
import Account from "./Account"


import BoardMain from "./BoardPages/BoardMain";
import BoardDetail from "./BoardPages/BoardDetail";
import CreatePost from "./CreatePost"


import CourseMain from "./CoursePages/CourseMain";
import CourseDetail from "./CoursePages/CourseDetail";
import CourseReview from "./CourseReview"

const Pages = () => {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            			<Route exact path='/board' element={<BoardMain />} />
			<Route exact path='/board/detail' element={<BoardDetail />} />
			<Route exact path='/course' element={<CourseMain />} />
			<Route exact path='/course/detail' element={<CourseDetail />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/account" element={<Account />} />
            <Route path="/review-course" element={<CourseReview />}></Route>
            <Route path="/board/create-post" element={<CreatePost />}></Route>
        </Routes>
  )
}

export default Pages

