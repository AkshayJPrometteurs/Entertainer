import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const GuestLayout = () => {
    const { FRONTEND_URL, userToken } = useStateContext()
    if(userToken){return(<Navigate to={'/'}/>)}
    return (
        <Fragment>
            <div className='flex justify-center items-center h-screen p-5 md:p-0' style={{ 
                backgroundImage :  `url(${FRONTEND_URL}assets/images/guestbg.jpg)`,
                backgroundRepeat : 'no-repeat',
                backgroundSize : '100% 100%'
             }}>
                <Outlet/>
            </div>
        </Fragment>
    )
}

export default GuestLayout