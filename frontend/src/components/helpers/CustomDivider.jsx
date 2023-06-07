import React, { Fragment } from 'react'
import { Chip, Divider } from '@mui/material'

const CustomDivider = ({content}) => {
    return (
        <Fragment>
            <Divider sx={{"&::before, &::after": {borderColor: "primary.main"}}}><Chip sx={{ fontSize : '13px!important' }} className='capitalize tracking-wider' color='primary' label={content} /></Divider>
        </Fragment>
    )
}

export default CustomDivider