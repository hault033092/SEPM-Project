import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Timetable from "./Timetable"
import Account from "./Account"
import BoardMain from "./BoardPages/BoardMain"

const Pages = () => {
  return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<BoardMain />} />
            <Route path="/board" element={<BoardMain />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/account" element={<Account />} />
        </Routes>
  )
}

export default Pages