import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App';
import { RxCross2 } from "react-icons/rx";

const Leaderboard = ({ showLeaderboard, setShowLeaderboard }) => {
  const [users, setUsers] = useState([]);
  const { url } = useContext(AppContext)

  const handleclick = () => {
    setShowLeaderboard(!showLeaderboard)
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}leaderboard`);
        setUsers(response.data);
        console.log('data fetched')
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();

    const intervalId = setInterval(fetchUserData, 10000);

    return () => clearInterval(intervalId);
  }, [url]);

  return (
    <div>
      {showLeaderboard && (
        <div className="fixed top-16 right-0 h-screen w-1/4 bg-white shadow-lg text-black">
          <div className="p-4">
            <div className="pb-1 border-b-[1px] border-black flex flex-row items-center justify-between">
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <RxCross2 className='cancel text-2xl cursor-pointer' onClick={handleclick}/>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xl">Rank</th>
                  <th className="text-left text-xl">User</th>
                  <th className="text-left text-xl">Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className='text-lg'>{index + 1}</td>
                    <td className='text-lg'>{user.name}</td>
                    <td className='text-lg'>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
