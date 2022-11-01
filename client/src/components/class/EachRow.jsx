import React from 'react'
import { nanoid } from "nanoid";
const EachRow = ({row}) => {
  return (
    <tr key={row.id?row.id:nanoid()} id={row.id}>
        <td>{row.day?row.day:""}</td>
        <td>{row.p1}</td>
        <td>{row.p2}</td>
        <td>{row.p3}</td>
        <td>{row.p4}</td>
        <td>{row.p5}</td>
        <td>{row.p6}</td>
        <td>{row.p7}</td>
    </tr>
  )
}

export default EachRow