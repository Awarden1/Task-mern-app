import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { Audio } from  'react-loader-spinner'

import './CreateTask.css';

function CreateTask() {
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const [loading, setLoading] = useState(false);

    const [selectedOption, setSelectedOption] = useState('');

        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
        };

        const options = [];
        for (let i = 1; i <= 100; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }


    const createTaskSubmit = async (e) => {
        e.preventDefault();

        if (titleRef.current.value === '' || descriptionRef.current.value === '' || selectedOption === "") {
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
                name: titleRef.current.value,
                department: descriptionRef.current.value,
                workingHours: selectedOption
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
                Log Hours
            </h1>

        <div className='email'>
            <h4>
                Name
            </h4>
            <input ref={titleRef}  />
        </div>


        <div className='email'>
            <h4>
                Department
            </h4>
            <textarea ref={descriptionRef} />
        </div>

        <div className='email'>
            <h4>
                Working Hours
            </h4>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select an option</option>
                {options}
            </select>
        </div>

        <div className='btnContainer'>
            <button type='submit' className='signIn'>
                log hours
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
