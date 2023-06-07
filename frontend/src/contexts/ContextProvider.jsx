import { createContext, useContext, useEffect, useState } from "react";
import AxiosClient from "../components/AxiosClient";
import AxiosAdmin from "../components/AxiosAdmin";
import Loader from "../components/Loader";

const StateContext = createContext({
    currentUser : {},
    currentAdmin : {},
    setCurrentUser : () => {},
    setCurrentAdmin : () => {},
    userToken : null,
    adminToken : null,
    setUserToken : () => {},
    setAdminToken : () => {},
    APPNAME : null,
    ADMINAPPNAME : null,
    FRONTEND_URL : null,
    BACKEND_URL : null,
});

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [currentAdmin, setCurrentAdmin] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_ACCESS_TOKEN'));
    const APPNAME = 'ENTERTAINER : ';
    const ADMINAPPNAME = 'ADMIN ENTERTAINER : ';
    const FRONTEND_URL = 'http://localhost:3000/';
    const BACKEND_URL = 'http://localhost:8000/';
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const adminAccessToken = localStorage.getItem('ADMIN_ACCESS_TOKEN');
    const [loader, setLoader] = useState(false)
    const setUserToken = (token) => {
        if(token){localStorage.setItem('ACCESS_TOKEN', token)
        }else{localStorage.removeItem('ACCESS_TOKEN')}
        _setUserToken(token)
    }
    const setAdminToken = (adminToken) => {
        if(adminToken){localStorage.setItem('ADMIN_ACCESS_TOKEN', adminToken)
        }else{localStorage.removeItem('ADMIN_ACCESS_TOKEN')}
        _setAdminToken(adminToken)
    }
    useEffect(()=>{
        if(accessToken){
            setLoader(true)
            AxiosClient.get(BACKEND_URL+'api/user')
            .then(({data})=>{
                setLoader(false)
                setCurrentUser(data)
            })
        }
        if(adminAccessToken){
            setLoader(true)
            AxiosAdmin.get(BACKEND_URL+'api/user')
            .then(({data})=>{
                setLoader(false)
                setCurrentAdmin(data)
            })
        }
    },[accessToken, adminAccessToken])
    return(
        <StateContext.Provider value={{ 
            currentUser, setCurrentUser, userToken, setUserToken, APPNAME, FRONTEND_URL, BACKEND_URL, currentAdmin, setCurrentAdmin, adminToken, setAdminToken, ADMINAPPNAME
         }}>
            {loader ? (<Loader/>) : children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)