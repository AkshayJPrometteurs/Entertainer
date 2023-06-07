import React, { Fragment } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { Divider } from '@mui/material'
import { AccountCircle, ExitToApp, Home, LiveTv, Search, SportsBaseball, Theaters, VideoLibrary } from '@mui/icons-material'
import Swal from 'sweetalert2'
import AxiosClient from '../components/AxiosClient'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

const MainLayout = () => {
    const { FRONTEND_URL, APPNAME, currentUser, setCurrentUser, setUserToken, BACKEND_URL } = useStateContext()
    document.title = APPNAME+'Home';
    function classNames(...classes) {return classes.filter(Boolean).join(' ')}
    const navigate = useNavigate();
    const logout = () =>{
        Swal.fire({
            title: 'Do you want to sign out now?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, Sure',
            confirmButtonColor: '#1a56db',
            cancelButtonColor: 'red',
            cancelButtonText: 'No, Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData()
                formData.append('user_id', currentUser.id)
                AxiosClient.post('signout', formData)
                .then(({data})=>{
                    console.log(data)
                    setCurrentUser('')
                    setUserToken(null)
                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/')
                })
            }
        })
    }
    const sideMenus = [
        { title : 'Home', icon : <Home />, path : '/' },
        { title : 'Search', icon : <Search />, path : '/search' },
        { title : 'TV Shows', icon : <LiveTv />, path : '/tv-shows' },
        { title : 'Movies', icon : <Theaters />, path : '/movies' },
        { title : 'Web Series', icon : <OndemandVideoIcon />, path : '/web-series' },
        { title : 'Sports', icon : <SportsBaseball />, path : '/sports' },
    ];
    return (
        <Fragment>
            <div className='flex'>
                <div className='w-[15%] md:w-[5%] hover:md:w-[15%] hover:w-[50%] fixed z-50 h-full p-2 bg-primaryColor transition-all delay-200 group rounded-r-xl cursor-pointer'>
                    <img src={FRONTEND_URL+'assets/images/favicon.png'} alt="logo" className='bg-white rounded-full w-12 h-12 mx-auto mb-5' />
                    <Divider style={{ background : '#fff' }}/>
                    <div className='mt-3 h-full relative'>
                        <div className='flex flex-col justify-center gap-4 group-hover:gap-3 px-1.5 md:px-3 mb-5'>
                            <NavLink to={(currentUser && currentUser.name) ? '/profile' : '/sign-in'} className={({isActive})=>classNames(isActive ? 'bg-white text-primaryColor rounded-full group-hover:rounded-md' : 'text-white rounded-full', 'flex justify-center group-hover:justify-start items-center gap-3 py-1.5 px-1 group-hover:px-2 text-sm')}>
                                {(currentUser && currentUser.profile_image) ? (
                                    <img src={BACKEND_URL+'assets/images/ProfileImages/'+currentUser.profile_image} alt="profile_image" className='h-6 w-6 group-hover:h-8 group-hover:w-8 rounded-full'/>
                                ):(
                                    <AccountCircle />
                                )}
                                <h1 className='hidden group-hover:block text-center -ml-3 w-full tracking-wider'>{(currentUser && currentUser.name) ? currentUser.name : 'Sign In'}</h1>
                            </NavLink>
                            {sideMenus.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <NavLink to={data.path} className={({isActive})=>classNames(isActive ? 'bg-white text-primaryColor rounded-full group-hover:rounded-md' : 'text-white rounded-full', 'flex justify-center group-hover:justify-start items-center gap-3 py-1.5 px-1 group-hover:px-2 text-sm')}>
                                        {data.icon}
                                        <h1 className='hidden group-hover:block text-center -ml-6 w-full tracking-wider'>{data.title}</h1>
                                    </NavLink>
                                </Fragment>)
                            })}
                            <NavLink to={'/entertainer-exclusive'} className={({isActive})=>classNames(isActive ? 'bg-white text-primaryColor rounded-full group-hover:rounded-md' : 'text-white rounded-full', 'flex justify-center group-hover:justify-start items-center gap-3 py-1.5 px-1 text-sm')}>
                                <div className='px-2 font-bold py-0.5 rounded-full border-2 border-white'>E</div>
                                <h1 className='hidden group-hover:block text-center -ml-6 w-full tracking-wider'>E-Premium</h1>
                            </NavLink>
                            {(currentUser && currentUser.name) && (
                                <NavLink to={'/watchlist'} className={({isActive})=>classNames(isActive ? 'bg-white text-primaryColor rounded-full group-hover:rounded-md' : 'text-white rounded-full', 'flex justify-center group-hover:justify-start items-center gap-3 py-1.5 px-1 group-hover:px-2 text-sm')}>
                                    <VideoLibrary />
                                    <h1 className='hidden group-hover:block text-center -ml-6 w-full tracking-wider'>Watchlist</h1>
                                </NavLink>
                            )}
                        </div>
                        {(currentUser && currentUser.name) && (
                            <Fragment>
                                <Divider style={{ background : '#fff' }}/>
                                <div className='px-1 md:px-3.5'>
                                    <div onClick={logout} className='mt-4 py-2 px-3 text-sm flex items-center font-bold justify-center text-white cursor-pointer bg-red-600 rounded-md'>
                                        <ExitToApp/>
                                        <h1 className='hidden group-hover:block text-center -ml-6 w-full tracking-wider'>Sign Out</h1>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
                <div className='w-[85%] md:w-[95%] hover:w-full ml-[15%] md:ml-[5%]'>
                    <Outlet/>
                </div>
            </div>
        </Fragment>
    )
}

export default MainLayout