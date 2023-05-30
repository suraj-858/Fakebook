import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss';
import axios from 'axios'
import { registerRoute } from '../../apiRoutes/ApiRoutes';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState(null)
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState(null)
  const [repassword, setRepassword] = useState(null)

  const [emailChecker, setEmailChecker] = useState({
    color: '',
    validatorText: '',
    success: false,
  })
 
  //EMAIL VALIDATOR
  useEffect(() => {
    if (email === null || email === '') {
      setEmailChecker({ validatorText: null, success: false })
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailChecker({
        validatorText: 'the email address is valid',
        color: 'green',
        success: true,
      })
    } else {
      setEmailChecker({
        validatorText: 'Enter valid Email address',
        color: 'red',
        success: false,
      })
    }
  }, [email])

  //PASSWORD VALIDATOR
  const [passwordChecker, setPasswordChecker] = useState({
    validator: '',
    color: '',
    success: false,
  })
  useEffect(() => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    if (password === '' || password === null) {
      setPasswordChecker({ validator: null, success: false })
    } else if (!regex.test(password)) {
      setPasswordChecker({
        validator: 'Password is too short',
        color: 'red',
        success: false,
      })

      if (password?.length >= 8) {
        setPasswordChecker({
          validator: 'password should be minimum of 8 character',
          color: 'red',
          success: false,
        })
      }
      if (!/(?=.*\d)/.test(password)) {
        setPasswordChecker({
          validator: 'password should contain atleast one digit',
          color: 'red',
          success: false,
        })
      }
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordChecker({
          validator: 'password must contain one lowercase',
          color: 'red',
          success: false,
        })
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordChecker({
          validator: 'password must contain one Uppercase',
          color: 'red',
          success: false,
        })
      }
      if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password)) {
        setPasswordChecker({
          validator: 'password must contain one special character',
          color: 'red',
          success: false,
        })
      }
    } else {
      setPasswordChecker({
        validator: 'password is valid',
        color: 'green',
        success: true,
      })
    }
  }, [password])

  //PASSWORD CHECKER
  const [passwordMatch, setPasswordMatch] = useState({
    matcher: '',
    color: 'red',
    success: false,
  })
  useEffect(() => {
    if (repassword === null || repassword === '') {
      setPasswordMatch({ matcher: '' })
    } else if (password !== repassword) {
      setPasswordMatch({
        matcher: 'Password does not Matched',
        color: 'red',
        success: false,
      })
    } else {
      setPasswordMatch({
        matcher: 'Password Matched',
        color: 'green',
        success: true,
      })
    }
  }, [repassword])

  //method for submit button
  const [superValidator, setSuperValidator] = useState({
    validator: '',
    color: '',
    success: false,
  })
  useEffect(() => {
    if (name.length === 0 && address.length === 0) {
      setSuperValidator({ validator: '' })
    } else if (name.length < 5 || address.length < 5) {
      setSuperValidator({
        validator: 'Name & Address must contain atleast 5 characters',
        success: false,
      })
    } else {
      setSuperValidator({ validator: '', success: true })
    }
  }, [name, address])

  const SignUP = async() => {
   
      await axios.post(registerRoute, {
        username: name, 
        email: email, 
        address: address, 
        password: password

      }).then(function(response){
        const success = response.data.authtoken;
        localStorage.setItem("token", success);
        const dataSet = response?.data?.user;
        console.log({dataSet, success});


        localStorage.setItem('user-details', JSON.stringify(response?.data?.user));

        if(success){
          setSuperValidator({validator:"Registered Successfully", success: true});
          setTimeout(() => {
            
            navigate('/avatar');
          }, 200);
          
        }else{
          setSuperValidator({validator:response?.data?.error});
        }


      }).catch(function(error){
        const err = error?.response?.data?.error;
        console.log(error.response);
        setSuperValidator({validator: err, success: false})
      })


  }

  return (
    <div className="container">
      <div className="items-container">
        <div className="text-container">
          <h2>Fakebook</h2>
          <p>Connecting Aliens...</p>
        </div>
        <div className="signUp-container">
          <h3>SignUp</h3>
          <div className="inputs-container">
            <div className="input-container accurate-margin">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <span>
                <p style={{ color: `${emailChecker.color}` }}>
                  {emailChecker.validatorText}
                </p>
              </span>
            </div>

            <div className="input-container accurate-margin">
              <label htmlFor="name">Address</label>
              <input
                type="text"
                placeholder="Enter your Address"
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            <div className="input-container">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                placeholder="Your Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span>
                <p style={{ color: `${passwordChecker.color}` }}>
                  {passwordChecker.validator}
                </p>
              </span>
            </div>
            <div className="input-container">
              <label htmlFor="name">Re-type Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(event) => setRepassword(event.target.value)}
              />
              <span>
                <p style={{ color: `${passwordMatch.color}` }}>
                  {passwordMatch.matcher}
                </p>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={
              passwordChecker.success &&
              emailChecker.success &&
              passwordMatch.success &&
              superValidator.success
                ? 'btnSubmit'
                : 'btnNotSubmit'
            }
            onClick={() => {
              if (
                passwordChecker.success &&
                emailChecker.success &&
                passwordMatch.success &&
                superValidator.success
              ) {
                SignUP()
              }
            }}
          >
            Sign Up
          </button>
          <p>{superValidator.validator}</p>
          <span><Link to="/Login">Login?</Link></span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
