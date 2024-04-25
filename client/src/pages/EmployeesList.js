import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EmployeesList() {
  const userRole = window.localStorage.getItem('role');
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '' ,
    department: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/employees');
        const data = await response.json();
        setEmployees(data.data); // Update employees state with fetched data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmployees(); // Call fetchEmployees function when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  const handleUpdate = async (id) => {
    const employeeToUpdate = employees.find(employee => employee._id === id);
    if (employeeToUpdate) {
      setUpdateData({
        id: employeeToUpdate._id,
        name: employeeToUpdate.name,
        email: employeeToUpdate.email,
        phoneNumber: employeeToUpdate.phoneNumber,
        address: employeeToUpdate.address ,
        department: employeeToUpdate.department 
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    
  };

  const handleChange = (e) => {
    console.log(e)
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    console.log(updateData)
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/update/${updateData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updateData.name,
          email: updateData.email,
          phoneNumber: updateData.phoneNumber,
          address: updateData.address ,
          department : updateData.department

        })
      });
      if (response.ok) {
        console.log('Employee updated successfully');
        setUpdateData({
          id: '',
          name: '',
          email: '',
          phoneNumber: '',
          address: ''
        });
        setOpen(false);
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setEmployees(employees.filter(employee => employee._id !== id));
        console.log('Employee deleted successfully');
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const [filter, setFilter] = useState({ name: '', location: '', sortOrder: '' });

  useEffect(() => {
    fetchEmployees();
  }, [filter]); // Refetch data when filter changes

  const fetchEmployees = async () => {
    try {
      let url = 'http://localhost:5000/user/employees';
      if (filter.name || filter.location || filter.sortOrder) {
        url += `?name=${filter.name}&location=${filter.location}&sortOrder=${filter.sortOrder}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };



  return (
    <>
      <Navbar />

      <div style={{
        paddingTop: "108px",
        margin: "auto",
        width: "70vw"
      }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          {/* <div>
            <TextField
              label="Name"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
            <TextField
              label="Location"
              name="location"
              value={filter.location}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </div> */}
          {/* <div>
            <Button
              variant="outlined"
              onClick={() => setFilter({ ...filter, sortOrder: 'asc' })}
            >
              Ascending
            </Button>
            <Button
              variant="outlined"
              onClick={() => setFilter({ ...filter, sortOrder: 'desc' })}
            >
              Descending
            </Button>
          </div> */}
        </div>
        <h2 style={{ textAlign: "center" }}>Employee List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address</th>
              <th scope="col">Departments</th>
              {userRole !== "employee" ? <th scope="col">Actions</th> : ''}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id}>
                <th scope="row">{index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.address}</td>
                <td>{employee.department && employee.department ? employee.department : ""}</td>

                 {userRole !== "employee" &&
                 <>
                  <td>
                  <button onClick={() => handleUpdate(employee._id)}>Update</button>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
                 </>
                 
}
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
          }}
        >
          <DialogTitle>Update Employee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={updateData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={updateData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="standard"
              value={updateData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              value={updateData.address}
              onChange={handleChange}
            />
             <TextField
              margin="dense"
              id="department"
              name="department"
              label="Department"
              type="text"
              fullWidth
              variant="standard"
              value={updateData.department}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default EmployeesList;
