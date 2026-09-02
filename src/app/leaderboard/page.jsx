'use client'
import React,{useState, useEffect} from 'react'
import axios from 'axios'

export default function LeaderboardPage() {
  const dummyData = [
    { name: "test", score: 100000 },
    { name: "test2", score: 100 },
  ];

  const dummyboard = dummyData.map((data, idx) => (
    <tr key={data.name}>
      <td>{idx + 1}</td>
      <td> {data.score}</td>
      <td> {data.name}</td>
    </tr>
  ));

  const [userInfo, setUserInfo] = useState("");
  const [apiData, setApiData] = useState([]);
  const [rank, setRank] = useState(null) //is to be set with the rank of the user

  useEffect(() => {
    async function getLeaderboard() {
      const { data: { user_id, leaderboard } } = await axios.get("/api/game/leaderboard");
      setUserInfo(user_id);
      setApiData(leaderboard);
    }
    getLeaderboard();
  }, []);

  console.log(apiData, userInfo);

  let message
  if (userInfo === null) {
    message = 'Log in to play to submit a score for a chance to appear on the leaderboard!'
  } else {
    if (Number.isInteger(rank)) message = `You ranked No. ${rank} on the leaderboard!`
    else message = 'Play a game for a chance to appear on the leaderboard!'
  }

  return (
    <div id="leaderboard">
      <h1>DAILY LEADERBOARDS</h1>
      {message !== undefined && <p>{message}</p>}
      <table>
        <thead id="leaderboard-header">
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Person</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((data, idx) => {
            if (userInfo === data.submitted_userId._id) setRank(idx + 1);
            return (
              <tr className={userInfo === data.submitted_userId._id ? "current-user" : ""} key={Math.random()}>
                <td>{idx + 1}</td>
                <td> {data.score}</td>
                <td> {data.submitted_userId.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
