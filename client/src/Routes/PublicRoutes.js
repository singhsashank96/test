import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import EmployeesList from '../pages/EmployeesList'
import UserDeteils from '../pages/UserDeteils'
import CreateDepartment from '../pages/CreateDepartment'
function PublicRoutes() {
  return (
    <>
    
        <Routes>
            <Route  path='/' element={<Login />} />
            <Route  path='/register' element={<Register />} />
            <Route  path='/employeeList' element={<EmployeesList />} />
            <Route  path='/userDeteils' element={<UserDeteils />} />
            <Route  path='/createDepartment' element={<CreateDepartment />} />
            <Route path="/UserDeteils" element={<UserDeteils/>} />
            <Route path='/departments' element={<CreateDepartment/>} />





        </Routes>
    </>
  )
}

export default PublicRoutes