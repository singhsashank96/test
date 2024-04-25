import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
const navigate = useNavigate();
  
const HandleLogout=()=>{
  window.localStorage.clear();
  navigate('/')
}


const role = window.localStorage.getItem('role');

  return (
    <div><nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/userDeteils">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page"   to="/userDeteils">Home</Link>
          </li>
          

            <li class="nav-item">
            <Link class="nav-link " aria-disabled="true"  to='/employeeList' >Employee-List</Link>
          </li>
{
  role !== "employee" && 
  <li class="nav-item">
            <Link class="nav-link "  to='/departments' aria-disabled="true" >Departments</Link>
          </li>
}
          
        
       
         
          <li class="nav-item">
            <a class="nav-link " aria-disabled="true" onClick={HandleLogout}>Logout</a>
          </li>
        </ul>
        {/* <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar