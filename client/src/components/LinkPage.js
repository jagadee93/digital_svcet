import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"
const LinkPage = () => {
        const [tablesData,setTablesData]=useState([])
        useEffect(() =>{
        let isMounted=true
        const controller=new AbortController()
        const getAllTimeTables=async()=>{
            try{
                const result=await axios.get("/public/tables",{
                    signal:controller.signal
                })
                setTablesData(result?.data)
            }catch(err){
                console.log(err)
            }
        }
        getAllTimeTables();
        return () =>{
            isMounted=false
            controller.abort()
        }

    },[])
    return (
        <section className="register">
            <h1 className="heading">All Class Timetables </h1>
            
               {
                tablesData?.map((each,index) =>{
                    return (
                    <div className="eachLink">
                    <Link key={index} to={`public/tables/${each.className}`}><span className="linkPage-span">{(each.className).toUpperCase()}</span></Link>
                    </div>)
                })
               } 
        </section>
    )
}

export default LinkPage
