import React, { Fragment, useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Link } from 'react-router-dom'
import AxiosClient from '../../components/AxiosClient'
import Loader from '../../components/Loader'
import CustomDivider from '../../components/helpers/CustomDivider'

const TVShows = () => {
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+'TV Shows').toUpperCase();
    const [loader, setLoader] = useState(false)
    const [tvShows, setTVShows] = useState([])
    const [tvShowsCategories, setTVShowsCategories] = useState([])
    const [tvChannels, setTVChannels] = useState([])
    const getTVShowsList = async() =>{
        setLoader(true)
        await AxiosClient.get(`/user_tv_shows_details/${'tv-shows'}`)
        .then(({data})=>{
            setLoader(false)
            setTVShows(data.tvShows)
            setTVShowsCategories(data.categories)
            setTVChannels(data.tvChannels)
        })
    }
    useEffect(()=>{getTVShowsList()},[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='px-4 md:px-6 pb-3 pt-0'>
                    <div className='my-6'>
                        <CustomDivider content={'Popular TV Shows'}/>
                        <div className='mt-5 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6'>
                            {tvShows.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <Link to={'/tv-shows/videos/'+data.tv_shows_slug} className='bg-white border border-gray-300 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white transition-all delay-200 hover:scale-105'>
                                        <img src={BACKEND_URL+'assets/images/TVShows/'+data.tv_shows_image} alt='tv_shows' className='w-full h-full md:h-40 rounded-md object-fill' />
                                    </Link>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                    <div className='my-6'>
                        <CustomDivider content={'TV Shows Categories'}/>
                        <div className='mt-5 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6'>
                            {tvShowsCategories.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <Link to={'/tv-shows/'+data.sub_category_slug} className='bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase font-bold tracking-widest text-sm md:text-base text-center flex justify-center items-center'>
                                        <h1>{data.sub_category_name}</h1>
                                    </Link>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                    <div className='my-6'>
                        <CustomDivider content={'TV Channels'}/>
                        <div className='mt-5 grid grid-cols-2 md:flex gap-4 md:gap-6'>
                            {tvChannels.map((data, id)=>{
                                return(<Fragment key={id}>
                                    <Link to={'/tv-shows/tv-channel/'+data.tv_channel_slug} className='bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase font-bold tracking-widest text-center text-sm md:text-base flex justify-center items-center'>
                                        <h1>{data.tv_channel_name}</h1>
                                    </Link>
                                </Fragment>)
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default TVShows