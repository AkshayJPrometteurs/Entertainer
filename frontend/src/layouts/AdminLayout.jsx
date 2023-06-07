import React, { Fragment } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { Category, SettingsPower, Speed, VideoLibrary } from '@mui/icons-material';
import Swal from 'sweetalert2';
import AxiosAdmin from '../components/AxiosAdmin';
import TranslateIcon from '@mui/icons-material/Translate';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const AdminLayout = () => {
    const { adminToken, FRONTEND_URL, APPNAME, currentAdmin, setCurrentAdmin, setAdminToken } = useStateContext()
    function classNames(...classes) {return classes.filter(Boolean).join(' ')}
    const adminSideMenus = [
        { url : '/admin/dashboard', icon : <Speed/>, title : 'Dashboard' },
        { url : '/admin/categories', icon : <Category/>, title : 'Category' },
        { url : '/admin/subcategories', icon : <Category/>, title : 'Sub-Category' },
        { url : '/admin/languages', icon : <TranslateIcon/>, title : 'Languages' },
        { url : '/admin/tv-channel', icon : <LiveTvIcon/>, title : 'TV Channels' },
        { url : '/admin/tv-shows', icon : <LiveTvIcon/>, title : 'TV Shows' },
        { url : '/admin/shows', icon : <LiveTvIcon/>, title : 'Shows' },
        { url : '/admin/videos', icon : <VideoLibrary/>, title : 'Videos' },
    ]
    const adminLogout = () =>{
        Swal.fire({
            title: 'Do you want to logout now?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, Sure',
            confirmButtonColor: '#1a56db',
            cancelButtonColor: 'red',
            cancelButtonText: 'No, Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData()
                formData.append('admin_id', currentAdmin.id)
                AxiosAdmin.post('/admin/logout', formData)
                .then(({data})=>{
                    console.log(data)
                    setCurrentAdmin('')
                    setAdminToken(null)
                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
    }
    if(!adminToken){return(<Navigate to={'/admin/login'}/>)}
    return (
        <Fragment>
            <div className='bg-gray-100 h-screen'>
                <div className='flex'>
                    <div className='w-[14%] md:w-[15%] z-50 bg-primaryColor fixed h-full p-3 hover:w-[40%] hover:md:w-[15%] group shadow-lg'>
                        <img src={FRONTEND_URL+'assets/images/favicon.png'} alt="logo" className='bg-white rounded-full md:w-20 md:h-20 w-10 h-10 mx-auto mb-5 group-hover:w-20 group-hover:h-20' />
                        <h1 className='text-center mb-3 text-white text-xl hidden md:block group-hover:block'>Hello, {currentAdmin.name}</h1>
                        <Divider sx={{ background : 'white' }}/>
                        <div className='mt-4 grid gap-2'>
                            {adminSideMenus.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <NavLink to={data.url} className={({isActive})=>classNames(isActive ? 'bg-white text-primaryColor' : 'text-white', 'flex md:px-3 md:py-2 px-2 py-1.5 justify-center md:justify-start group-hover:justify-start group-hover:px-3 group-hover:py-2 gap-3 items-center rounded')}>
                                        {data.icon}
                                        <span className='hidden md:block group-hover:block text-sm mt-0.5'>{data.title}</span>
                                    </NavLink>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                    <div className='w-[86%] md:w-[85%] ml-[14%] md:ml-[15%]'>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar sx={{ minHeight : '50px!important', padding : '8px 15px!important' }}  className='flex items-center justify-between gap-3'>
                                    <h1 className='uppercase tracking-wider text-sm whitespace-nowrap md:text-base'>{APPNAME}ADMIN PANEL</h1>
                                    <Button startIcon={<SettingsPower/>} onClick={adminLogout} size='small' color="inherit" style={{ background : 'red', padding : '6px 20px', fontSize : '12px' }}>Logout</Button>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        <div className='p-4'>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminLayout