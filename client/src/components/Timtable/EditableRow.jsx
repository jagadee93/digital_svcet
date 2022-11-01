import React from "react";
import "../class/AddClass.css"
const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      
      <td>
       {editFormData.day}
      </td>
      <td>
        <input
          type="text"
          placeholder=""
          name="p1"
          value={editFormData.p1}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"

          placeholder="..."
          name="p2"
          value={editFormData.p2}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="..."
          name="p3"
          value={editFormData.p3}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="..."
          name="p4"
          value={editFormData.p4}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
       
          placeholder="..."
          name="p5"
          value={editFormData.p5}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
      
          placeholder="..."
          name="p6"
          value={editFormData.p6}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="..."
          name="p7"
          value={editFormData.p7}
          onChange={handleEditFormChange}
        ></input>
      </td> 
      <td>
        <button type="submit" className="btn btn-info">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;