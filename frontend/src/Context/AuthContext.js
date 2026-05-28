import { createContext, useState } from "react";

export const AuthContext = createContext()

// Provider
export function AuthProvider({children}){
    const [user, setUser] = useState()
    const [token, setToken] = useState()

    async function login(userData,accessToken) {
        setUser(userData);
        setToken(accessToken);
        console.log("Updated login context")
    }

    async function logout() {
        setUser(null);
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{user,token,login,logout, isAuth: Boolean(token)}}>
            {children}
        </AuthContext.Provider>
    )
}
