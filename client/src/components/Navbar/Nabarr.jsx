import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaUserAstronaut } from 'react-icons/fa';
import SvcetLogo from "./SvcetLogo.png";
import useLogout from '../../hooks/useLogout';


function Navbarr() {
  const { auth } = useAuth(); 
  const navigate = useNavigate();
  const logout = useLogout();
  console.log(auth?.user)
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="container-fluid">
    <Navbar className="navabar" bg="dark" expand="lg">
    <Container fluid>
      
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        ><Link className="navLink" to="/" ><img width={60} height={60}src={SvcetLogo} /></Link>
          
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink" to="/addclass">
            AddClass
          </Link>
          <NavDropdown  style={{color:""}} title="timetables" id="collasible-nav-dropdown">
       <Link to="#home">Home</Link>
        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
         </NavDropdown.Item>
       <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
          {auth.user?<Link className="navLink" onClick={signOut} to="/">Logout</Link>:<Link className="navLink" to="/login">Login</Link>}
          {auth?.roles?.includes(5150)?
          <Link className="navLink" to="/pendingteachers">pendingteachers</Link>
          :auth?.roles?.includes(1984)?<><h4 className="nav-text">Critic</h4></>
          :auth?.roles?.includes(2001)?<><h4 className="nav-text">viewer</h4></>
          :<Link className="navLink" to="/register">Register</Link>}
        

        {
           
            auth?.roles?.includes(5150)?
            <Link className="navLink" to="/pendingtimetables">Pending timetables</Link>:''
        }


          </Nav>
        <span style={{ }} className={'profile'}>
        {auth?.roles?.includes(5150) ? (
    <Link to={"/users"}>
      {" "}
      users  <FaUserAstronaut size={30}  />
    </Link>
  ) : auth?.user ? (
    <Link to={"/profile"}>
      {auth.user + " "} <FaUserAstronaut size={30} />
    </Link>
  ) : (
    <Link to={"/login"}>
      {" "}
      <FaUserAstronaut size={30}/>
    </Link>
  )
}
      </span>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  );
}

export default Navbarr;




// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{margin:0}} >
// <Container style={{margin:'0px'}}>
//   <Link to="/"> <img width={70} height={70} src={SvcetLogo} /></Link>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="me-auto">
//       <Link to="/teachers">Teachers</Link>
//       {/*map all the classes avalible here */}
//       {}
//       <Link to="/addclass">Add class</Link>
//       <NavDropdown title="timetables" id="collasible-nav-dropdown">
//         <Link to="#home">Home</Link>
//         <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">
//           Another action
//         </NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">
//           Separated link
//         </NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//     <Nav>
//     {auth.user?<Link className="navLink" onClick={signOut} to="/">Logout</Link>:<Link className="navLink" to="/login">Login</Link>}
//     {auth?.roles?.includes(5150)?
//     <Link className="navLink" to="/admin">PendingMovies</Link>
//     :auth?.roles?.includes(1984)?<><h4 className="nav-text">Teacher</h4></>
//     :auth?.roles?.includes(2001)?<><h4 className="nav-text">Student</h4></>
//     :<Link className="navLink" to="/register">Register</Link>}
//   {
// auth?.roles?.includes(5150) ? (
// <Link to={"/users"}>
// {" "}
// users  <FaUserAstronaut />
// </Link>
// ) : auth?.user ? (
// <Link to={"/profile"}>
// {auth.user + " "} <FaUserAstronaut />
// </Link>
// ) : (
// <Link to={"/login"}>
// {" "}
// <FaUserAstronaut />
// </Link>
// )
// }

//     </Nav>
//   </Navbar.Collapse>
// </Container>
// </Navbar>