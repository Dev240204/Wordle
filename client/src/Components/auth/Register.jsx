import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../Context/AuthStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const url = process.env.API_URL || 'http://localhost:5000/';

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${url}register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        useAuthStore.getState().login(response.data.data);
        toast.success('User registered successfully',{
          autoClose: 2000,
          position: "top-center",
          theme: "dark",
          closeOnClick: true,
        })
        console.log('User registered successfully:', response.data.data);
        navigate('/');
      }
      if (response.data.status === 409) {
        toast.error('Email already exists',{
          autoClose: 2000,
          position: "top-center",
          theme: "dark",
          closeOnClick: true,
        })
        console.error('Email already exists:', response.data.message);
      }
      if (response.data.status === 408) {
        toast.error('Username already exists',{
          autoClose: 2000,
          position: "top-center",
          theme: "dark",
          closeOnClick: true,
        })
        console.error('Username already exists:', response.data.message);
      }
      if(response.data.status === 400){
        toast.error('Password must be at least 5 characters',{
          autoClose: 2000,
          position: "top-center",
          theme: "dark",
          closeOnClick: true,
        })
        console.error('Password must be at least 5 characters:', response.data.message);
      }
    } catch (error) {
      toast.error('Register failed:',{
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
          closeOnClick: true,
      })
      console.error('Register failed:', error.message);
    }
  };

  const title = 'WORDLE!'
  const color = ['bg-orange-300', 'bg-green-300', 'bg-yellow-300', 'bg-blue-300', 'bg-pink-300', 'bg-purple-300','bg-red-400']

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen gap-20">
      <div className=''>
        {title.split('').map((letter, index) => (
          <div key={index} className={`${color[index]} p-[10px] text-2xl w-12 mx-2 sm:text-4xl sm:w-14 md:text-6xl md:w-20 md:mx-3 inline-block  font-bold rounded-full text-center`}>{letter}</div>
        ))}
      </div>
      <div className="max-w-md px-5 mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 border-[1px] bg-transparent rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 border-[1px] bg-transparent rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border-gray-300 border-[1px] bg-transparent rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white rounded-md py-2 font-bold text-lg"
        >
          Register
        </button>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}><strong>Already have an account? Login here</strong></button>
      </div>
    </div>
  );
};

export default Register;
