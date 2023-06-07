import React, { Fragment, useEffect, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'
import { useStateContext } from '../../../contexts/ContextProvider'
import { DataGrid } from '@mui/x-data-grid';
import AxiosAdmin from '../../../components/AxiosAdmin'
import Loader from '../../../components/Loader'

const columns = [
    { field: 'id', headerName: 'Sr. No.', flex : 1, headerClassName : 'bg-gray-300 font-bold text-center' },
    { field: 'shows_type', headerName: 'Show Type', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'shows_name', headerName: 'Show Name', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'status', headerName: 'Status', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'action', headerName: 'Actions', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
];

const AllShowsList = () => {
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME + 'All Shows'
    const [shows, setShows] = useState([])
    const [loader, setLoader] = useState(false)
    const getShowsList = async() => {
        setLoader(true)
        await AxiosAdmin.get('/admin/shows_list')
        .then(({data})=>{
            setLoader(false)
            setShows(data.shows) 
        })
    }
    useEffect(()=>{ getShowsList() },[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <AdminPageComponent leftContent={'All Shows List'} rightContent={
                    <Link to={'/admin/shows/add-new-shows'}>
                        <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize: '12px', padding: '5px 15px' }} startIcon={<ControlPoint />}>Add New Show</Button>
                    </Link>
                }>
                    <DataGrid
                        sx={{ textAlign : 'center' }}
                        rows={shows.map((item, index) => ({ id: index + 1, ...item }))}
                        columns={columns}
                        initialState={{pagination: { paginationModel: { page: 0, pageSize: 8 },},}}
                        pageSizeOptions={[8, 16, 32, 64]}
                    />
                </AdminPageComponent>
            )}
        </Fragment>
    )
}

export default AllShowsList