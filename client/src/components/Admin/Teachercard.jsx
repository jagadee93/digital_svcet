import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function TeacherCard(props) {

  return (
  <div className='PendingMovieCard'>
    <Card>
      <Card.Header as="h5">{props.username}</Card.Header>
      <Card.Body>
        <Card.Title>{props.className}</Card.Title>
        <Card.Text>
        {props.email}
        </Card.Text>
        <p>created at   {props.createdat}</p>
        <div className='PendingMovieCard-btns'>
        <Button className='pen-btn1' onClick={() =>{
            props.ApproveUser(props.id)
        }}>Approve</Button>
        <Button className='pen-btn2' onClick={() => props.reject(props.id)}>Reject</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
}