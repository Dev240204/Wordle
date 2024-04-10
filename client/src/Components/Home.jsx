import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../Context/AuthStore';


const Home = (props) => {
    const [name, setName] = useState("");
    const [data, setData] = useState([{}]);
    const url = process.env.BACKEND_URL || 'http://localhost:5000/';
    const fetchdata = async() => {
      try{
        const response = await axios.get(`${url}`);
        setData(response.data.data)
      }catch(error)
      {
        console.log(error)
      }
    }
    const handleSubmit = async(e) => {
      e.preventDefault()
      try{
        const response = await axios.post(`${url}test`, { name : name });
        if (response.data.success) {
          console.log('Data saved successfully:', response.data.data);
        } else {
          console.error('Failed to save data:', response.data.message);
        }
      }catch(error)
      {
        console.log(error)
      }
      fetchdata()
    }
    const handleLogout = () => {
      useAuthStore.getState().logout();
    }
    return (
      <div>
        <h1 className="text-5xl">Wordle</h1>
        <form
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Full name</label>
          <input
            value={name}
            name="name"
            onChange={(e) =>
              setName(e.target.value)
            }
            id="name"
            placeholder="full Name"
          />
          <button type="submit">Submit</button>
        </form>
        {/* <div>
          {data.map((item) => {
            return (
              <div key={item.name}>
                <h3>{item.name}</h3>
              </div>
            );
          })}
        </div> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}

export default Home