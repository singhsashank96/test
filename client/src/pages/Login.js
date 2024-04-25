import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    try {
      const response = await fetch('http://localhost:5000/user/login', requestOptions);
      const data = await response.json();
      console.log(data); // Handle response data as needed
      if(data && data.name ){
        navigate('/UserDeteils');
        window.localStorage.setItem("UserId" , data.id)
        window.localStorage.setItem("role" , data.role)


      }
      else{
        console.log("ffjngfcjk"); // Handle response data as needed

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ margin: 'auto', paddingTop: "140px", width: '46vw' }}>
      <form onSubmit={handleSubmit}>
        <div><h2 style={{ textAlign: 'center' }}>Login</h2></div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p>If you don't have an account, please <Link to='/register'><span style={{color:'blue'}}>register</span></Link></p>
                <button type="submit" style={{ textAlign: 'center' }} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
