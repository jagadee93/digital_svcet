import { useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";
import Labstatus from "./lab/labstatus";
import ReadOnlyRow from "./Timtable/ReadOnlyRow";
import LinkPage from "./LinkPage";
const Home = () => {
    const axiosPrivate=useAxiosPrivate();
    const {auth}=useAuth();
    const className=auth?.className
    const navigate = useNavigate();
    const logout = useLogout();
    const [timetable,setTimetable]=useState([])
    const [data,setData]=useState({})
    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }
    useEffect(() =>{
        let isMounted=true;
        const controller=new AbortController();
        const getOneTimetable=async()=>{
            try{
                const response=await axiosPrivate.get(`/public/tables/${className}`,{
                    signal:controller.signal
                })
                setData(response.data)
                isMounted&&setTimetable(response.data.table)
            }catch(err){
                console.log(err)
            }
        }
        getOneTimetable()
        return()=>{
            isMounted=false
            controller.abort();
        }
    },[className])
    return (
        <>
        {
            auth?.user?(<div>
                <h1>ClassName:{data?.className}</h1>
                <h1>ClassIncharge:{data?.ClassIncharge}</h1>
                <h1>Rooom no:{data?.roomNo}</h1>
                <table>
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
                {
                    timetable?.periods?.map((each,index) =>{
                        return <ReadOnlyRow key={index} contact={each}/>
                    })
                   
                }
                </tbody>
                
                </table>
                <p>updatedAt{timetable?.updatedAt}</p>
                
            </div>):<LinkPage />
        }
        </>


    )
}

export default Home
