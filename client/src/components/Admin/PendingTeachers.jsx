import React,{useEffect,useState} from 'react'
import TeacherCard from './Teachercard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import axios from "../../api/axios"
import {useNavigate,useLocation} from "react-router-dom"
function PendingTeachers() {
    const {auth}=useAuth();
    const axiosPrivate=useAxiosPrivate();
    const navigate=useNavigate();
    const location=useLocation();
    const [isApproved,setIsApproved]=useState(false)
    const [isRejected,setIsRejected]=useState(false)
        const ApproveUser=async(id) =>{
            console.log(id)
            setIsApproved(true)
            try{
            const response=await axiosPrivate.put('/pendingusers',
             JSON.stringify({ userId:id, code:5150,roles:auth?.roles}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response?.data)
            setIsApproved(false)
            }catch(err){
                console.log(err)
            }
        }
        const RejectUser=async(id) =>{
            setIsRejected(true)

            console.log("hello")
            console.log(id)
            try{
            const response=await axiosPrivate.delete(`/pendingusers/${id}`,
             JSON.stringify({ userId:id,code:5150,roles:auth?.roles }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data)
            setIsRejected(false)

            }catch(err){
                console.log(err)
            }
        }

    const [pendingUsers,setpendingUsers]=useState([])
    const [status,setStatus]=useState('')
    const [errMsg,setErrMsg]=useState('')
     
    useEffect(() =>{
        let isMounted=true;
        const controller= new AbortController();
        const getPendingpendingUsers=async() =>{
            try{
            const response = await axiosPrivate.get("/pendingusers",{
                signal:controller.signal
            })

            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            isMounted?setpendingUsers(response.data):setStatus('No pending pendingUsers found');
            if (response.data.status===204){
                setErrMsg("no pendingUsers found")
            }
            }
            
            catch (err) {
                       console.log(err)

                }
    }
    getPendingpendingUsers()
    return () =>{

        isMounted =false
        controller.abort();
    }
    
},[isApproved,isRejected])
  return (
    <>
    {
        pendingUsers.length>0?
                  pendingUsers.map((user) => {
            return <TeacherCard
            key={user._id}
            id={user._id}
            username={user.username}
            email={user.email}
            classname={user.className}
            createdat={user.createdAt}
            ApproveUser={ApproveUser}
            reject={RejectUser}
             />
        })
        
         :
         "no pending users found"
    }
    </>
  )
}

export default PendingTeachers