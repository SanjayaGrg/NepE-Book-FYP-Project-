import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {


    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);
    

    let contextData = {
        user
    }

    return (
        <AuthContext.Provider value={{ 'name': 'Sanjaya' }}>
            {children}
        </AuthContext.Provider>
    )
} 