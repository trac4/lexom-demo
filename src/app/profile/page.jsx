'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
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
    const testDate = new Date().toISOString()
    return (
    <div>
        <h2>{userProfile.username}</h2>
        <section>
            <div>
                <p><b>Joined: </b>{new Date(userProfile.created).toLocaleDateString()}</p>
                <p><b>Longest Word: </b> {userProfile.longestWord !== ''? userProfile.longestWord :'N/A'}</p>
            </div>

            <button onClick={logout}>Logout</button>
        </section>
    </div>
  )
}
