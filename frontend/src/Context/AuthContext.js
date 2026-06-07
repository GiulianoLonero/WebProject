import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

// Provider
export function AuthProvider({children}){
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const checkLogged = async ()=>{
            try{
                const response = await axios.get("http://localhost:5000/api/v1/auth/refresh", {
                    withCredentials: true
                });
                setToken(response.data.accessToken);
                setUser(response.data.user);
            }catch (error) {
                setToken(null);
                setUser(null);
            } finally{
                setIsLoading(false)
            }
        }
        checkLogged();
    },[])
    
    async function login(userData,accessToken) {
        setUser(userData);
        setToken(accessToken);
        console.log("Updated login context")
    }

    async function logout() {
        try{
            await axios.post("http://localhost:5000/api/v1/auth/logout",{},{
                withCredentials: true
            });
        }catch (error){
            console.error("Server error",error);
        }finally{
            setUser(null);
            setToken(null)
        }
        
    }

    return (
        <AuthContext.Provider value={{user,token,login,logout, isLoading, isAuth: Boolean(token)}}>
            {children}
        </AuthContext.Provider>
    )
}
