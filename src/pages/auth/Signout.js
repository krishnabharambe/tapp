import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function Signout() {
    const [done, setdone] = useState(false)
    useEffect(() => {
        localStorage.removeItem("token");
        setdone(true)
    },[])


  return (
    <div>{done? <Navigate to="/login" /> : ""}Signout</div>
  )
}
