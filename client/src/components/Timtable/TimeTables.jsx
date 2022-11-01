import React from 'react'
import {Link } from "react-router-dom"
export const TimeTables = ({TimeTables}) => {
  return (
    <div>
      <h2>timetables</h2>
      {
        TimeTables.map((timeTable) =>{
          <Link to=`timetables/${}`>{timeTable.className} </Link>
        })

      }
    </div>



  )
}
