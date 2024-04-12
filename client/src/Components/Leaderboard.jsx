import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = ({ showLeaderboard }) => {
  const [users, setUsers] = useState([]);
  const url = process.env.BACKEND_URL || 'http://localhost:5000/';

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

  // Render the component only if showLeaderboard is true
  return (
    <div>
      {showLeaderboard && (
        <div className="fixed top-20 right-0 h-screen w-1/4 bg-gray-200 shadow-lg">
          <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Leaderboard</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">User</th>
                  <th className="text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.score}</td>
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
