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
    { field: 'tv_channel_name', headerName: 'TV Channel Name', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'show_on_user_page', headerName: 'Show On User Page', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'status', headerName: 'Status', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
    { field: 'action', headerName: 'Actions', flex : 1, headerClassName : 'bg-gray-300 font-bold' },
];

const TVChannelList = () => {
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME + 'TV Channels'
    const [tvChannel, setTVChannel] = useState([])
    const [loader, setLoader] = useState(false)
    const getTVChannelList = async() => {
        setLoader(true)
        await AxiosAdmin.get('/admin/tv_channels_list')
        .then(({data})=>{
            setLoader(false)
            setTVChannel(data.tv_channel) 
        })
    }
    useEffect(()=>{ getTVChannelList() },[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <AdminPageComponent leftContent={'TV Channels List'} rightContent={
                    <Link to={'/admin/tv-channel/add-new-tv-channel'}>
                        <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize: '12px', padding: '5px 15px' }} startIcon={<ControlPoint />}>Add New TV Channel</Button>
                    </Link>
                }>
                    <DataGrid
                        sx={{ textAlign : 'center' }}
                        rows={tvChannel.map((item, index) => ({ id: index + 1, ...item }))}
                        columns={columns}
                        initialState={{pagination: { paginationModel: { page: 0, pageSize: 8 },},}}
                        pageSizeOptions={[8, 16, 32, 64]}
                    />
                </AdminPageComponent>
            )}
        </Fragment>
    )
}

export default TVChannelList