import React, { Fragment, useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Link } from 'react-router-dom'
import AxiosClient from '../../components/AxiosClient'
import Loader from '../../components/Loader'
import CustomDivider from '../../components/helpers/CustomDivider'
import { PlayCircle } from '@mui/icons-material'

const Sports = () => {
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = APPNAME+'SPORTS'
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [recentlyAddedSports, setRecentlyAddedSports] = useState([])
    const getSportsDetailsList = async() =>{
        setLoader(true)
        await AxiosClient.get(`/user_sports_details/${'sports'}`)
        .then(({data})=>{
            setLoader(false)
            setCategories(data.categories)
            setRecentlyAddedSports(data.recentlyAddedSports)
        })
    }
    useEffect(()=>{getSportsDetailsList()},[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='px-5 py-3'>
                    <div>
                        <CustomDivider content={'Popular Sports'}/>
                        <div className='my-4 md:my-4 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4'>
                            {categories.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <Link to={'/sports/'+data.sub_category_slug} className='bg-white border border-gray-300 py-3 md:py-4 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase font-bold tracking-widest text-xs md:text-base text-center flex items-center'>
                                        <h1 className='w-full text-center'>{data.sub_category_name}</h1>
                                    </Link>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                    <div>
                        <CustomDivider content={'Recently Added Sports'}/>
                        <div className='grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-6 my-4'>
                            {recentlyAddedSports.map((data,id)=>{
                                return(<Fragment key={id}>
                                    <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                        <div className='px-4 pt-2 pb-1'>
                                            <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                            <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                            </div>
                                        </div>
                                        <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-32' alt='vide_poster'/>
                                        <div className={'p-3'}>
                                            <Link to={`/movies/${data.sub_category_slug}/${data.video_slug}`}>
                                                <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                            </Link>
                                        </div>
                                    </div>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Sports