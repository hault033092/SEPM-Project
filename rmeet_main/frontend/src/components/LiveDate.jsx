import React from "react";
import '.LiveDate.css'

const LiveDate = () => {
    const d = new Date()

    const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    const day = weekDays[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

    return (
        <div className="main">
            <div className="date">
                <h1>{day}</h1>
                <h2 id="date">{date}</h2>
                <h2 id="month">{month}</h2>
                <h2 id="year">{year}</h2>
            </div>
        </div>
    )
}

export default LiveDate