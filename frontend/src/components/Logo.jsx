import React, { Fragment } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

const Logo = () => {
    const { FRONTEND_URL } = useStateContext()
    return (
        <Fragment>
            <Link to={'/'} className='flex justify-center items-center gap-4 mb-4'>
                <img src={FRONTEND_URL+'assets/images/favicon.png'} alt="logo" className='w-12'/>
                <h1 className='text-2xl font-extrabold uppercase tracking-wider'>Entertainer</h1>
            </Link>
        </Fragment>
    )
}

export default Logo