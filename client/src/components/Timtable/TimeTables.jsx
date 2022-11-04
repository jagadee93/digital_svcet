import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom';
import EachRow from '../class/EachRow';
import axios from '../../api/axios';
export const UserTimetable = ({TimeTables}) => {
  const [tableData,setTableData]=useState({})
  const params=useParams()
    useEffect(() => {
        let isMounted=true;
        const controller=new AbortController();
        const getTables = async (props) => {
                try {
                    const details = await axios.get(`/public/tables/${params.id}`, {
                    signal:controller.signal
                    });
                    setTableData(details.data);
                } catch (err) {
                    console.log(err);
                 }
            }
            getTables();
    return () =>{
        isMounted=false
        controller.abort();
    }
  }, [params.id]);
  return (
    <div> 
      <h2>{tableData?.className}timetable</h2>
      <h1>Class Name :{tableData?.className}</h1>
      <h1>class Incharge: {tableData?.ClassIncharge}</h1>
      <h1>Room no:{tableData?.roomNo}</h1>
      <h1>{}</h1>
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
                </tr>
                </thead>
                <tbody>
                   {
                    tableData?.table?.periods?.map((eachRow,index)=>{
                      return <EachRow key={index} row={eachRow} />
                    })
                  } 
          </tbody>

        </table>
        <p>{tableData?.updatedAt}</p>
    </div>
  )
}
