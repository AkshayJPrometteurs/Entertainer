import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomDivider from '../../components/helpers/CustomDivider'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Divider, Typography } from '@mui/material'
import { PlayCircle } from '@mui/icons-material'
import Loader from '../../components/Loader'

const SeasonsTVShows = () => {
    const { category, tvShows, season } = useParams()
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+tvShows+'-'+category).toUpperCase()
    const [loader, setLoader] = useState()
    const [tvChannelVideo, setTVChannelVideo] = useState([])
    const [tvChannels, setTVChannels] = useState([])
    const [tvShowsList, setTVShowsList] = useState([])
    const [seasons, setSeasons] = useState([])
    const [forTitle, setForTitle] = useState('')
    const getTVChannelVideoList = () => {
        setLoader(true);
        AxiosClient.get(`/get_season_tv_shows/${category}/${tvShows}/${season}`)
        .then(({data})=>{
            setLoader(false)
            setTVChannelVideo(data.videos)
            setTVChannels(data.tvChannels)
            setTVShowsList(data.tvShows)
            setSeasons(data.seasons)
            setForTitle(data.forTitle)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getTVChannelVideoList()},[category, tvShows, season])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='py-4 px-6'>
                    <div className='flex flex-col-reverse md:flex-row gap-6'>
                        <div className='w-full md:w-[78%]'>
                            <CustomDivider content={(forTitle && forTitle.category_name)+' - '+(forTitle && forTitle.tv_shows_name)}/>
                            <div className='bg-white p-4 rounded-md my-4'>
                                <div className='flex items-center gap-4 mb-3.5'>
                                    {seasons.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            <Link to={`/${category}/${tvShows}/season/${data.seasons}`} className='bg-gray-300 px-3.5 py-1.5 rounded-md text-sm flex items-center gap-1'><PlayCircle sx={{ fontSize : 18 }}/> Season {data.seasons}</Link>
                                        </Fragment>)
                                    })}
                                </div>
                                {tvChannelVideo.length > 0 ? (
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6'>
                                        {tvChannelVideo.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md'>
                                                    <div className='px-4 pt-2 pb-1'>
                                                        <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                        <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                        </div>
                                                    </div>
                                                    <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-32' alt='vide_poster'/>
                                                    <div className={'p-3'}>
                                                        <Link to={`/${category}/${data.sub_category_slug}/${data.video_slug}`}>
                                                            <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Fragment>)
                                        })}
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center h-[80vh]'>
                                        <Typography variant='h3' className='uppercase tracking-wider font-bold'>Sorry! No Vidos Found</Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-full md:w-[22%]'>
                            <CustomDivider content={'Search '+(forTitle && forTitle.category_name)+' By'}/>
                            <div className='flex flex-col gap-4 mt-4'>
                                <div className='bg-white rounded-md px-4 pb-4 pt-3'>
                                    <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>Shows</h1>
                                    <Divider style={{ background : '#1a56db' }}/>
                                    <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                        {tvShowsList.map((data, id)=>{
                                            return(<Fragment key={id}>
                                                {tvShows !== data.tv_shows_slug && (
                                                    <Link to={`/${category}/videos/${data.tv_shows_slug}`} className={'border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200 flex items-center justify-center '+(tvShows === data.tv_shows_slug ? 'bg-primaryColor text-white' : 'bg-white')}>
                                                        <h1>{data.tv_shows_name}</h1>
                                                    </Link>
                                                )}
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                                <div className='bg-white rounded-md px-4 pb-4 pt-3'>
                                    <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>TV Channels</h1>
                                    <Divider style={{ background : '#1a56db' }}/>
                                    <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                        {tvChannels.map((data, id)=>{
                                            return(<Fragment key={id}>
                                                <Link to={`/${category}/tv-channel/${data.tv_channel_slug}`} className='border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200 flex items-center justify-center'>
                                                    <h1>{data.tv_channel_name}</h1>
                                                </Link>
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default SeasonsTVShows