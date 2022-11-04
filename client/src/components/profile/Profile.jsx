  import React, { useEffect,useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
  import "./profile.css";
  const Profile = () => {
    const {auth}=useAuth()
    const [userdata,setUserData]=useState({})
    const axiosPrivate=useAxiosPrivate();


// const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// tooltipTriggerList.forEach(tooltipTriggerEl => {
// new bootstrap.Tooltip(tooltipTriggerEl)
//   })
    useEffect(() =>{
        let isMounted=true;
        const controller=new AbortController();
        const getUserData=async() =>{
            try{
            const user=await axiosPrivate.get(`public/user/${auth?.id}`,{
                signal:controller.signal
            })
            isMounted&&setUserData(user.data)
            }catch(err){
                console.log(err)
            }
        }
        getUserData()
        return()=>{
            isMounted=true
            controller.abort();
        }
    },[])

    return (
      <div id="main" className="d-flex flex-nowrap">
                <h1 className="visually-hidden">Dash Board</h1>

                <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{width: '280px'}}>
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4">Dash Board</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link active" aria-current="page">
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg> */}
                        Profile
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg> */}
                        Timetable
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-white">
                        {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg> */}
                        AddTimetable
                        </a>
                    </li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                    </div>
                </div>
                <div className="b-example-divider b-example-vr">
                   
                <div className="cardP">
                        <div className="card-header">
                                <div className="card-header-bar">
                                <a href="#" className="btn-message"><span className="sr-only">Message</span></a>
                                <a href="#" className="btn-menu"><span className="sr-only">Menu</span></a>
                                </div>

                                <div className="card-header-slanted-edge">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200"><path className="polygon" d="M-20,200,1000,0V200Z" /></svg>
                                    <a href="#" className="btn-follow"><span className="sr-only">Follow</span></a>
                                </div>
                        </div>

                        <div className="card-body">
                            <h2 className="name">AB Manju</h2>
                            <h4 style={{color:"black"}} className="job-title">CSE  DEPT</h4>
                            <div style={{color:"black"}} className="bio">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, aperiam.</div>
                            {/* <div className="social-accounts">
                                <a href="#"><img src="https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/dribbble.svg" alt="" /><span className="sr-only">Dribbble</span></a>
                                <a href="#"><img src="https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/twitter.svg" alt="" /><span className="sr-only">Twitter</span></a>
                                <a href="#"><img src="https://res.cloudinary.com/dj14cmwoz/image/upload/v1491077480/profile-card/images/instagram.svg" alt="" /><span className="sr-only">Instagram</span></a>
                            </div> */}
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <div className="stat">
                                    <span  style={{color:'black'}} className="label">Svcet</span>
                                    <span  style={{color:'black'}} className="value">CSE</span>
                                </div>
                                <div className="stat">
                                    <span style={{color:'black'}} className="value">Lecturer</span>
                                </div>
                                {/* <div className="stat">
                                    <span className="label">Likes</span>
                                    <span className="value">320</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
    )
  }
  
  export default Profile
