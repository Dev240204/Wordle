import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../Context/AuthStore';
import {AppContext} from '../../App'
import { Toaster, toast } from 'sonner'


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { url } = useContext(AppContext)

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${url}login`, {
        email,
        password,
      });
      if (response.data.success) {
        useAuthStore.getState().login(response.data.data);
        toast.success('Login successful')
        alert('Login successful')
        navigate('/');
      }
      if (response.data.status === 404) {
        toast.error('User not found',{
          position: "top-center",
        });
      }
      if (response.data.status === 401) {
        toast.error('Invalid Credentials',{
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error('Login failed:',{
        position: "top-center",
      });
      console.error('Login failed:', error.message);
    }
  };
  const title = 'WORDLE!'
  const color = ['bg-orange-300', 'bg-green-300', 'bg-yellow-300', 'bg-blue-300', 'bg-pink-300', 'bg-purple-300','bg-red-400']
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen gap-20">
      <Toaster richColors closeButton />
      <div className=''>
        {title.split('').map((letter, index) => (
          <div key={index} className={`${color[index]} p-[10px] text-2xl w-12 mx-2 sm:text-4xl sm:w-14 md:text-6xl md:w-20 md:mx-3 inline-block  font-bold rounded-full text-center`}>{letter}</div>
        ))}
      </div>
      <div className="max-w-md px-5 mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Login</h2>
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
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white rounded-md py-2 font-bold text-lg"
        >
          Login
        </button>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}><strong>Don't have an account? Register here</strong></button>
      </div>
    </div>
  );
};

export default Login;