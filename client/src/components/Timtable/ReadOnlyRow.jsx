import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr id={contact.id}>
      <td >{contact.day}</td>
      <td>{contact.p1}</td>
      <td>{contact.p2}</td>
      <td>{contact.p3}</td>
      <td>{contact.p4}</td>
      <td>{contact.p5}</td>
      <td>{contact.p6}</td>
      <td>{contact.p7}</td>
      <td>
        <button  className="btn btn-info"
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >  Edit
        </button>

      </td>
    </tr>
  );
};

export default ReadOnlyRow;