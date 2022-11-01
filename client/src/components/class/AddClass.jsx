import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import "./AddClass.css";
import data from "./MockData.json";
import ReadOnlyRow from "../../components/Timtable/ReadOnlyRow";
import EditableRow from "../../components/Timtable/EditableRow";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
const App = () => {


  const { auth } = useAuth();
  const id = auth?.id
  const user = auth?.user
  const navigate = useNavigate();
  const location = useLocation();
  // if (!auth.user) navigate('/login', { state: { from: location }, replace: true });
  const axiosPrivate = useAxiosPrivate()
  const roomNoref = useRef()
  const [success, setSuccess] = useState(false)
  const [contacts, setContacts] = useState(data);
  const [ErrMsg, setErrMsg] = useState('')
  const [roomNo, setRoomNo] = useState('')
  const [classTeacher, setClassTeacher] = useState('')
  const [className, setClassName] = useState('')
  const errRef = useRef();
  const [addFormData, setAddFormData] = useState({

    day: "",
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    p7: "",
  });

  const [editFormData, setEditFormData] = useState({
    day: "",
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    p7: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      day: addFormData.day,
      p1: addFormData.p1,
      p2: addFormData.p2,
      p3: addFormData.p3,
      p4: addFormData.p4,
      p5: addFormData.p5,
      p6: addFormData.p6,
      p7: addFormData.p7
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: nanoid(),
      day: addFormData.day,
      p1: addFormData.p1,
      p2: addFormData.p2,
      p3: addFormData.p3,
      p4: addFormData.p4,
      p5: addFormData.p5,
      p6: addFormData.p6,
      p7: addFormData.p7
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
      day: contact.day,
      p1: contact.p1,
      p2: contact.p2,
      p3: contact.p3,
      p4: contact.p4,
      p5: contact.p5,
      p6: contact.p6,
      p7: contact.p7,
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

  // console.log(contacts)


  useEffect(() => {
    roomNoref.current.focus()
  }, [])

//   useEffect(() => {
//     setErrMsg('');
// }, [, pwd, matchPwd,email])

  //   

  const handleAddTimeTable = async (e) => {
    try {
      const response = await axiosPrivate.post("/timetable",
        JSON.stringify({ className: className, roomNo: roomNo, classTeacher: classTeacher, table: contacts, id, user }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setContacts([])
      setEditFormData('')
      setClassName('')
      setClassTeacher('')
      setRoomNo('')
      setSuccess(true);
        console.log(response)
        setErrMsg("success fully added waiting for approval")
      //clear state and controlled inputs
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('please fill all fields');
      } else if (err.response?.status === 403) {
        setErrMsg('already movie exists ')
      } else {
        setErrMsg("failed")
      }

    }
  }
  return (
    <div className="app-container">
                  <p
                    ref={errRef}
                    className={ErrMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive">
                    {ErrMsg}
                  </p>


      <div className="input">
        <label htmlFor="" >
          ClassName
        </label>
        <input type="text"
          required="required"
          id="class"
          ref={roomNoref}
          value={className} onChange={(e) => setClassName(e.target.value)} />
        <label htmlFor="roomno" >
          Roomno
        </label>

        <input type="text"
          id="roomno" value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          required="required"
        />
        <label htmlFor="classi" >
          ClassIncharge
        </label>

        <input
          type="text"
          id="classi"
          required="required"
          value={classTeacher} onChange={(e) => setClassTeacher(e.target.value)} />
      </div>
      <form onSubmit={handleEditFormSubmit}>

        <table>
          <thead>
            <tr>
              <th>period</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contacts?.map((contact) => (
                <>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </>
              ))}
          </tbody>
        </table>
      </form>



      <div className="app-container">
        <h2>Add a field</h2>
        <form onSubmit={handleAddFormSubmit}>
          <label htmlFor="day">Day</label>
          <input
            id="day"
            type="text"
            name="day"
            required="required"
            placeholder="Enter a day/time..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">1</label>
          <input
            type="text"
            name="p1"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">2</label>
          <input
            type="text"
            name="p2"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">3</label>
          <input
            type="text"
            name="p3"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">4</label>
          <input
            type="text"
            name="p4"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">5</label>
          <input
            type="text"
            name="p5"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">6</label>
          <input
            type="text"
            name="p6"
            required="required"
            placeholder="Enter..."
            onChange={handleAddFormChange}
          />
          <label htmlFor="day">7</label>
          <input
            type="text"
            name="p7"
            required="required"
            placeholder="..."
            onChange={handleAddFormChange}
          />
          <button className="btn btn-info" type="submit">Add</button>

        </form>
        <div className="addTimeable">
          <button className="addTimetable" onClick={() => handleAddTimeTable()}>Add time table</button>
        </div>
      </div>
    </div>
  );
};

export default App;