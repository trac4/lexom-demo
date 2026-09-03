'use client'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ProfilePage() {
    const router = useRouter()
    const [userProfile, setUserProfile] = useState({})
    
    useEffect(()=> {
        async function getProfile() {
        const {data} = await axios.get('/api/users/profile')
        setUserProfile(data)        
        }

        getProfile()
    }, [])
    
    const logout = async() => {
        const res = await axios.get('/api/users/logout')
        router.push('/login')
        
    }

    console.log(userProfile)
    console.log(userProfile.created)
    return (
      <div id="user-profile">
        <h2>My Profile</h2>
        <section>
          <div id='user-info'>
            <div className='user-detail'>
              <b>Name: </b>
              <p>{userProfile.username}</p>
            </div>
            <div className='user-detail'>
              <b>Joined: </b>
              <p>{new Date(userProfile.created).toLocaleDateString()}</p>
            </div>
            <div className='user-detail'>
              <b>Longest Word: </b>
              <p>
                {userProfile.longestWord !== ""? 
                  `${userProfile.longestWord} (${userProfile.longestWord?.length} letters)`
                  : "N/A"
                }
              </p>
            </div>
          </div>

          <div className='user-buttons'>
            <button onClick={logout}>Logout</button>
            <button onClick={() => router.push("/game")}>Play</button>
          </div>

        </section>
      </div>
    );
}
