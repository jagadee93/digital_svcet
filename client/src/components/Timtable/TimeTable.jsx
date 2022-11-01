import React, { useState,useEffect } from "react";
import { nanoid } from "nanoid";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./TimeTable.css"; 
import data from "./MockData.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import axios from "../../api/axios";

const TimeTable = () => {
  const [contacts, setContacts] = useState(data);
  const [editFormData, setEditFormData] = useState({
    id:"",
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    p7: "",
  });
  console.log(editFormData)

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
    
      id: editContactId,
      day:editFormData.day,
      p1: editFormData.p1,
      p2: editFormData.p2,
      p3: editFormData.p3,
      p4: editFormData.p4,
      p5: editFormData.p5,
      p6: editFormData.p6,
      p7: editFormData.p7,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id:contact.id,
      day:contact.day,
      p1:contact.p1,
      p2:contact.p2,
      p3:contact.p3,
      p4:contact.p4,
      p5:contact.p5,
      p6:contact.p6,
      p7:contact.p7,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };





  const [timetable,setTimetable]=useState([])
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTimeTables = async () => {
      try {
        const response = await axios.get(`/timetable/4CSEC`,{
          signal:controller.signal
        });
        console.log(response.data, "tables");
        isMounted&&setTimetable(response.data);
      } catch (err) {

        console.error(err);
      }
    };
    getTimeTables();
    return () =>{
       isMounted = false;
      controller.abort();
     
      // controller.abort();
    }
  }, []);


  const UpdateTimetable=async() =>{
    const controller = new AbortController();
      try {
        const response = await axios.put(`/timetable/4CSEC`,{
          signal:controller.signal
        });
        console.log(response.data, "tables");
      } catch (err) {
        console.error(err);
      }
  }

return (
  
    <div className="app-container item">
      <form onSubmit={handleEditFormSubmit}>
        <div className="table">
        <table className="table" >
          <thead>
            <tr>
              <th >period</th>
              <th >1</th>
              <th >2</th>
              <th >3</th>
              <th >4</th>
              <th >5</th>
              <th >6</th>
              <th >7</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) :(
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
        
        </div>
       
      </form>
    </div>
  
  );
};

export default TimeTable;