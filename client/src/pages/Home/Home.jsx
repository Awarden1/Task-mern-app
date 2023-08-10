import React, { useEffect, useState } from 'react'
import './Home.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import useAuth from '../../store/store';

function Home() {
  const [updateTask, setUpdateTask] = useState(false)
  const [task, setTask] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const { user, logout } = useAuth();


  const [title, setTitle] = useState('');
  const [task_id, setTaskId] = useState('');
  const [description, setDescription] = useState('');

  const loadData = async () => {
    try {
      const result =  await localStorage.getItem("token");

      if (!result) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': result
        }
      };


      const res = await axios.get('http://localhost:3001/api/task/getTask', config);

      setTask(res.data.task);
    } catch (err) {
      setTask([])
    }
  }

  useEffect(() => {
    loadData()
  }, [reload]);


  const updateTaskSubmit = async (e) => {
    e.preventDefault();

    try {
        const result =  await localStorage.getItem("token");

        if (!result) {
          return
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'token': result
          }
        };

        const res = await axios.post('http://localhost:3001/api/task/updateTask', {
            taskId: task_id,
            name: title,
            department: description,
            workingHours: selectedOption
        }, config);

        alert(res.data.message)
        setReload(!reload)
    } catch (err) {
        alert(err)
    }
}

const deleteTaskSubmit = async (taskId) => {
  try {
      const result =  await localStorage.getItem("token");

      if (!result) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': result
        }
      };

      const res = await axios.delete('http://localhost:3001/api/task/deleteTask/'+taskId, config);

      alert(res.data.message)
      setReload(!reload)
  } catch (err) {
      alert(err)
  }
}

const openUpdateTask = (id, title, description, hour) => {
  setTaskId(id);
  setTitle(title)
  setDescription(description)
  setSelectedOption(hour)
  setUpdateTask(true)
}

const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

const options = [];
for (let i = 1; i <= 100; i++) {
  options.push(<option key={i} value={i}>{i}</option>);
}


  return (
    <div>
       <div className='header-title'>
            <p>
                Welcome To Dashboard
            </p>
        </div>


        <div className='sub-Container'>
          <button onClick={logout} className='logout-button'>
            Logout
          </button>

          <NavLink to={'/logHours'} className='btn-Container'>
            Log hours
          </NavLink>

          { task.map(item => (
             <div key={item._id} className='doc-item'>
                <p>
                  Name: {item.name}
                </p>
                <p>
                Department: {item.department}
                </p>
                <p>
                Working Hours: {item.workingHours}
                </p>
                <div>
                  <button onClick={() => openUpdateTask(item._id, item.name, item.department, item.workingHours)} className='task-btn1'>
                    Update Hours
                  </button>
                  <button onClick={() => deleteTaskSubmit(item._id)} className='task-btn2'>
                    Delete Hours
                  </button>
                </div>
              </div>
          ))

          }



        </div>

        { updateTask &&
          <div className="overlay">
            <form className="overlay-modal" onSubmit={updateTaskSubmit}>
              <h1>
                Update Task
              </h1>

              <div className='overlay-modal'>
                  <p>
                    Name
                  </p>
                  <input value={title} onChange={e => setTitle(e.target.value)} />
              </div>


              <div className='overlay-modal'>
                  <p>
                    Department
                  </p>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} />
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

              <div className='overlay-btnContainer'>
                  <button type='submit' className='signIn'>
                      Update
                  </button>
                  <button onClick={() => setUpdateTask(false)} type='reset' className='signUp'>
                      Cancel
                  </button>
              </div>
            </form>
          </div>
      }
    </div>
  )
}

export default Home
