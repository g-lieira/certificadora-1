import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

function AuthProvider ({children}) {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  return (
    <AuthContext.Provider value={{auth, setAuth, userId, setUserId, currentQuestion, setCurrentQuestion}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider