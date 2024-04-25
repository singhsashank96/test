import React, { useState } from 'react';
import { ToastContainer , toast } from 'react-toastify';
import { useNavigate , Link } from 'react-router-dom'; 

function Register() {
  const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(data.message == "User registered successfully"){
        toast("User registered successfully");
        setFormData(initialFormData);
        navigate('/login')
      } 
      else{
        toast(data.message)
      }

      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', paddingTop: "80px", width: '46vw' }}>
      <form onSubmit={handleSubmit}>
        <div><h2 style={{ textAlign: 'center' }}>Register</h2></div>
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputname" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputNumber" className="form-label">Number</label>
          <input type="number" className="form-control" id="exampleInputNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputaddress" className="form-label">City/address</label>
          <input type="text" className="form-control" id="exampleInputaddress" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="mb-3 ">
          <select className="form-select" id="floatingSelectDisabled" aria-label="Floating label disabled select example" name="role" value={formData.role} onChange={handleChange}>
            <option defaultValue>Role</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <p>If you already have an account, please <Link to="/" style={{color:"blue"}}>login</Link>.</p>               

        <button type="submit" style={{ textAlign: 'center' }} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Register;
