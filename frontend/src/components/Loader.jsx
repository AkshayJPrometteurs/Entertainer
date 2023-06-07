import { CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'

const Loader = () => {
    return (
        <Fragment>
            <div className='flex justify-center items-center fixed top-0 left-0 z-50 h-full w-full bg-white'>
                <div className='flex items-center gap-5'>
                    <CircularProgress size={'2.5rem'}/>
                    <span style={{ fontSize : '1.7rem' }} className='tracking-wider text-primaryColor uppercase font-bold'>Please Wait</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Loader