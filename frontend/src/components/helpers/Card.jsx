import React, { Fragment } from 'react'

const Card = ({children,addClass}) => {
    return (
        <Fragment>
            <div className={'border shadow-xl rounded-md '+(addClass)}>
                {children}
            </div>
        </Fragment>
    )
}

export default Card