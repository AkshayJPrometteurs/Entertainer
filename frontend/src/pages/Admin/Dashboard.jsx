import React, { Fragment } from 'react'
import AdminPageComponent from '../../components/AdminPageComponent'
import moment from 'moment'
import { useStateContext } from '../../contexts/ContextProvider'

const Dashboard = () => {
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME+'Dashboard'
    return (
        <Fragment>
            <AdminPageComponent leftContent={'Dashboard'} rightContent={
                <h1 className='font-bold text-base md:text-lg'>Today : {moment().format('DD-MMMM-YYYY')}</h1>
            }>
        
            </AdminPageComponent>
        </Fragment>
    )
}

export default Dashboard