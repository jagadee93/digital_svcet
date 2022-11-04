import React,{useState} from "react";
import useAuth from "../../hooks/useAuth";

const ReadOnlyRow = (props) => {
  const {auth}=useAuth();
  const [disabled,setDisabled]=useState(true)
  return (
    <tr id={props.contact.id}>
      <td >{props.contact.day}</td>
      <td>{props.contact.p1}</td>
      <td>{props.contact.p2}</td>
      <td>{props.contact.p3}</td>
      <td>{props.contact.p4}</td>
      <td>{props.contact.p5}</td>
      <td>{props.contact.p6}</td>
      <td>{props.contact.p7}</td>
      <td>
        <button  className="btn btn-info"
          type="button"
          onClick={(event) => props.handleEditClick(event, props.contact)}
        >  Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;