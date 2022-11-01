import React from 'react'
import EachRow from './EachRow'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function EachTable({id,name,periods,roomNo,classIncharge,onDelete}) {


  const axiosPrivate=useAxiosPrivate();

  return (
    <Card bg={"red"}
    key={id}
    id={id}
    style={{ width: '80%' }}
    className="mb-2">
      <Card.Body>

        <Card.Title>ClassName:{name}</Card.Title>
        <Card.Title>RoomNo{roomNo}</Card.Title>
        <Card.Title>ClassIncharge:{classIncharge?classIncharge:"not specified"}</Card.Title>
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
                    periods?.map((eachRow,index)=>{
                      return <EachRow row={eachRow} />
                    })
                  }
          </tbody>

            </table>
        <Button onClick={() =>onDelete(id)}>delete</Button>
      </Card.Body>
    </Card>
  );
}

export default EachTable ;