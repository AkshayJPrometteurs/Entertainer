
import React, { Fragment } from 'react'

const UserPageComponent = ({children}) => {
    return (
        <Fragment>
            <div className='p-4'>
                {children}
            </div>
        </Fragment>
    )
}

export default UserPageComponent