'use client'
import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';

export default function LeaderboardPage() {

  const [userInfo, setUserInfo] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [rank, setRank] = useState(null) //is to be set with the rank of the user

  useEffect(() => {
    async function getLeaderboard() {
      const { data: { user_id, leaderboard } } = await axios.get("/api/game/leaderboard");
      setUserInfo(user_id);
      setLeaderboardData(leaderboard);
    }
    getLeaderboard();
  }, []);

  console.log(leaderboardData, userInfo);

  let message
  if (userInfo === null) {
    message = <p><Link href={'/login'}>Log in</Link> or <Link href={'/signup'}>register</Link> to play to submit a score for a chance to appear on the leaderboard!</p>
  } else {
    if (Number.isInteger(rank)) message = <p>You ranked No. {rank}!</p>
    else message = <p>Play a game for a chance to appear on the leaderboard!</p>
  }

  return (
    <div id="leaderboard">
      <h2>LEADERBOARDS</h2>
      {message}
      {rank !== null && <p><Link href={'/game'}>Play again</Link> to improve your score</p>}
      <table>
        <thead id="leaderboard-header">
          <tr>
            <th className='rank-col'>Rank</th>
            <th className='score-col'>Score</th>
            <th className='player-col'>Player</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((data, idx) => {
            if (userInfo === data.submitted_userId._id) setRank(idx + 1);
            return (
              <tr className={userInfo === data.submitted_userId._id ? "current-user" : ""} key={Math.random()}>
                <td className='rank-col'>{idx + 1}</td>
                <td className='score-col'> {data.score.toFixed(2)}</td>
                <td className='player-col'> {data.submitted_userId.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
