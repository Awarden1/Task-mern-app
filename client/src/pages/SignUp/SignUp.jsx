import React, { useRef, useState } from 'react'
import './SignUp.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { Audio } from  'react-loader-spinner'

function SignUp() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [loading, setLoading] = useState(false);

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

            const res = await axios.post('/api/auth/CreateUser', {
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
                Kristiania
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
