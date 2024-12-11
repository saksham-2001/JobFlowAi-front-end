import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MFAverify = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to verify the OTP here
    axios.post("http://localhost:3001/auth/mfa/mfaverify", { email, otp }, {withCredentials: true})
      .then(result => {

        if (result.data.success) {
          console.log("OTP verified");
          navigate('/home');
        }
      })
      .catch(err => {
        console.log(err);
        if(err.status==401){
          alert("Invalid OTP. Please try again");
        }
      })


  };

  return (
    <div>
      <div className="auth-container">
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter your OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
        </form>



        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default MFAverify;
