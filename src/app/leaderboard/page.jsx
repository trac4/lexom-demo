import React from 'react'
import Score from '../Components/Score'

export default function Leaderboard() {
  const dummyData = [
    {name: 'test',
     score: 100000
    },
    {name: 'test2',
     score: 100,
    }
  ]

  const leaderboard = dummyData.map ((data,idx) => (
    <tr key= {data.name}>
        <td>{idx + 1}</td>
        <td> {data.score}</td>
        <td> {data.name}</td>
    </tr>
  )
  )
    return (
    
    <div id= 'leaderboard'>
        <h1>DAILY LEADERBOARDS</h1>
        <table>
            <thead id='leaderboard-header'>
                <tr>
                    <th>Rank</th>
                    <th>score</th>
                    <th>person</th>
                </tr>
            </thead>
            <tbody>
                {leaderboard}
            </tbody>
        </table>
    </div>
  )
}
