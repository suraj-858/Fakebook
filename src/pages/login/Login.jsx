import React, { useEffect, useState } from 'react'
import './style.scss'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginRoute } from '../../apiRoutes/ApiRoutes'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // FOR EMAIL VALIDATIONS
  const [emailChecker, setEmailChecker] = useState({
    validator: '',
    color: '',
    success: false,
  })

  useEffect(() => {
    if (email.length === 0) {
      setEmailChecker({ validator: '' })
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailChecker({
        validator: '',
        color: 'green',
        success: true,
      })
    } else {
      setEmailChecker({
        validator: 'Invalid Email Address',
        color: 'red',
        success: false,
      })
    }
  }, [email])

  //FOR PASSWORD VALIDATIONS
  const [passwordChecker, setPasswordChecker] = useState({
    validator: '',
    color: '',
    success: false,
  })

  useEffect(() => {
    if (password.length === 0) {
      setPasswordChecker({ validator: '', success: false })
    } else if (password.length < 8) {
      setPasswordChecker({
        validator: 'Password must contain 8 characters',
        color: 'red',
        success: false,
      })
    } else {
      setPasswordChecker({
        validator: '',
        color: 'green',
        success: true,
      })
    }
  }, [password])

  const userLogin = async() =>{
    
    await axios.post(loginRoute, {
            email: email, 
            password: password

        }).then(function(response){
          console.log(response?.data?.authtoken)
          localStorage.setItem("user-token", response?.data?.authtoken);

            console.log(response?.data?.user?._id)

            localStorage.setItem("userId", response?.data?.user?._id);

            setPasswordChecker({validator: response?.data?.error, color:"green", success:true});

            if(response?.data?.authtoken){
              setTimeout(() => {
                navigate('/home')
              }, 100);

            }

          }).catch(function(error){
            if(error?.response?.data?.error === "Invalid Password"){
              setPasswordChecker({
                validator:error?.response?.data?.error, color:"red", success: false
              })
            }else{
              setEmailChecker({
                validator: error?.response?.data?.error, color:"red", success:false
              });
            }
            console.log(error?.response?.data?.error);

    })
    
  }

  return (
    <div className="containers">
      <div className="item-container">
      <section className="text-section">
        <h3>Fakebook</h3>
        <p>Connecting aliens...</p>
      </section>
      <section className="login-section">
        <h3>Login</h3>
        <div className="login-container">
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <span>
              <p style={{ color: `${emailChecker.color}` }} className="">
                {emailChecker.validator}
              </p>
            </span>
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <span>
              <p style={{ color: `${passwordChecker.color}` }}>
                {passwordChecker.validator}
              </p>
            </span>
          </div>

          <button
            className={
              emailChecker.success && passwordChecker.success
                ? 'login'
                : 'offLogin'
            }
            onClick={() =>{
              if(emailChecker.success && passwordChecker.success){
                userLogin()
              }
            }}
          >
            Login
          </button>
          <hr />
          <button id="create" onClick={() =>navigate("/signUp")}>Create new account</button>
        </div>
      </section>
      </div>
    </div>
  )
}

export default Login
