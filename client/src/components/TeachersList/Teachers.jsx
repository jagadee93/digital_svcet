import React ,{useEffect,useState} from 'react'
import axios from '../../api/axios'
import EachTeacher from './EachTeacher'
const Teachers = () => {
    const [teachers,setTeachers]=useState([])
    useEffect(()=>{
        let isMounted=true
        const controller=new AbortController();
        const getTeachers=async()=>{
            try{
                 const result=await axios.get("public/teachers",{
                    signal:controller.signal
                 })
                 setTeachers(result.data)
        }catch(err){
            console.log(err)
        }
            }
            getTeachers();

            return ()=>{
                isMounted=false
                controller.abort()
            }
    },[])
    console.log(teachers)
  return (
    <div className='teachers'>
    {
        teachers?.map((teacher) =>{
            console.log(teacher)
            return <EachTeacher key={teacher._id} username={teacher.username} email={teacher.email} createdAt={teacher.createdAt} className={teacher.className} table={teacher.table} />
        })
    }
    </div>
  )
}

export default Teachers