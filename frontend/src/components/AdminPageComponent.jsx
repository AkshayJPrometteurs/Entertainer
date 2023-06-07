import { Divider } from '@mui/material'
import React, { Fragment } from 'react'

const AdminPageComponent = ({children, leftContent, rightContent}) => {
    return (
        <Fragment>
            <div className='flex justify-between items-center gap-4 mb-3 tracking-wide'>
                <h1 className='font-bold text-base md:text-lg'>{leftContent}</h1>
                {rightContent}
            </div>
            <Divider sx={{ background : '#1a56db' }}/>
            <div className='mt-3'>
                {children}
            </div>
        </Fragment>
    )
}

export default AdminPageComponent