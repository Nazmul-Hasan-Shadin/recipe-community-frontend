import React, { createContext, useState } from "react";

const userContext=createContext(undefined)
const UserProvider = () => {
    const [loading,setLoading]=useState<boolean>(true)

 const [user,setUser]=useState(null)

   
  const handleUser=()=> {
     const user=;
     setUser(user)
  }

  return <userContext.Provider value={}>
  </userContext.Provider>
};

export default UserProvider;
