import React, { useRef, useState, useEffect } from 'react'
import './SignUp.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Audio } from  'react-loader-spinner'

function SignUp() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      (async() => {
        try {
          const result =  await localStorage.getItem("token");

          if (!result) {
            setUser(null)
            return
          }

          const config = {
            headers: {
              'Content-Type': 'application/json',
              'token': result
            }
          };


          const res = await axios.get('http://localhost:3001/api/auth/', config);

          setUser(res.data.user);
        } catch (err) {
          setUser(null)
        }
      })();
    }, []);

    if (user) {
        return navigate('/home');
    }

    const signUpSubmit = async (e) => {
        e.preventDefault();

        if (emailRef.current.value === '' || passwordRef.current.value === '') {
            alert('Fields are empty')
            return
        }

        try {

            setLoading(true)

            const config = {
                headers: {
                  'Content-Type': 'application/json',
                }
              };

            const res = await axios.post('http://localhost:3001/api/auth/CreateUser', {
                email: emailRef.current.value,
                password: emailRef.current.value,
            }, config);

            setLoading(false)

            console.log(res.data)

            alert(res.data.message);

        } catch (err) {
            setLoading(false)
            alert(err)
        }
    }

    if (loading) {
        return <div className='audio-loader'>
            <Audio
                height = "80"
                width = "80"
                radius = "9"
                color = 'green'
                ariaLabel = 'three-dots-loading'
                wrapperStyle
                wrapperClass
            />
        </div>
    }


  return (
    <div>
        <form onSubmit={signUpSubmit} className='subContainer'>
            <h1>
                Task Mern App
            </h1>

            <div className='email'>
                <h4>
                    Email
                </h4>
                <input   ref={emailRef} />
            </div>


            <div className='email'>
                <h4>
                    Password
                </h4>
                <input  ref={passwordRef}  />
            </div>

            <div className='btnContainer'>
                <button type='submit' className='signIn'>
                    Sign Up
                </button>
                <NavLink to={'/'} className='signUp'>
                    Cancel
                </NavLink>
            </div>

        </form>
    </div>
  )
}

export default SignUp
