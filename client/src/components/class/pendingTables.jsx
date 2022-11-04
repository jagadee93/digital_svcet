import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
import EachTable from './EachTable';
import useAuth from '../../hooks/useAuth';
const PendingTables = () => {
  const { auth } = useAuth()

  const [timeTables, setTimetables] = useState()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [approveStatus, setApproveStatus] = useState(false)
  const [errMsg, setErrmsg] = useState('')
  //if(!auth.user) navigate('/login', { state: { from: location }, replace: true });

  const deleteTable = async (id) => {
    console.log(id)
    try {
      const response = axiosPrivate.delete(`timetable/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setDeleteStatus(true)
      setErrmsg("successfully deleted")
    } catch (err) {
      console.log(err)
      setErrmsg(err)
    }
  }
  const approveTable = async (id) => {
    console.log(id)
    try {
      const response = axiosPrivate.put(`timetable/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log(response)
      setApproveStatus(true)
      setErrmsg("successfully deleted")
    } catch (err) {
      console.log(err)
      setErrmsg(err)
    }
  }
  useEffect(() => {
    console.log("hello")
    let isMounted = true
    const controller = new AbortController();
    const getTimeTables = async () => {
      try {
        const response = await axiosPrivate.get("/timetable/pending", {
          signal: controller.signal
        });
        setTimetables(response.data);
        setDeleteStatus(false)
        setApproveStatus(false)
        setErrmsg("")
      }
      catch (err) {
        console.log(err)

      }
    }
    getTimeTables();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [deleteStatus,approveStatus])
  return (
    <>
      <div style={{ backGroundColor: "red" }} >
        <p
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">
          {errMsg}
        </p>

        {
          timeTables?.length ?
            timeTables.map((each, index) => {
              console.log("every", index, each)
              return <EachTable
                key={each._id}
                id={each._id}
                name={each.className}
                periods={each.table.periods}
                updatedAt={each.table.updatedAt}
                roomNo={each.roomNo}
                classIncharge={each.ClassIncharge}
                onDelete={deleteTable}
                onApprove={approveTable}
              />
            }) : "no time tables found"
        }

      </div>
    </>
  )
}

export default PendingTables
