import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { Audio } from  'react-loader-spinner'

import './CreateTask.css';
import useAuth from '../../store/store';

function CreateTask() {
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const [loading, setLoading] = useState(false);


    const createTaskSubmit = async (e) => {
        e.preventDefault();

        if (titleRef.current.value === '' || descriptionRef.current.value === '') {
            alert('Fields are empty')
            return
        }

        try {
            const result =  await localStorage.getItem("token");

            if (!result) {
                return alert('Token Invalid')
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': result
                }
            };

            setLoading(true)

            const res = await axios.post('http://localhost:3001/api/task/CreateTask', {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
            }, config);

            setLoading(false)

            alert(res.data.message)
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
        <div className='header-title'>
            <p>
                Welcome
            </p>
        </div>

        <form onSubmit={createTaskSubmit} className='div-sub-Container'>

            <h1>
                Create Task
            </h1>

        <div className='email'>
            <h4>
                Title
            </h4>
            <input ref={titleRef}  />
        </div>


        <div className='email'>
            <h4>
                Description
            </h4>
            <textarea ref={descriptionRef} />
        </div>

        <div className='btnContainer'>
            <button type='submit' className='signIn'>
                Create
            </button>
            <NavLink to={'/'} className='signUp'>
                Cancel
            </NavLink>
        </div>

        </form>

    </div>
  )
}

export default CreateTask
