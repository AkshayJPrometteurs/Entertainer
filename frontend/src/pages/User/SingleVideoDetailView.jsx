import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AxiosClient from '../../components/AxiosClient'
import { useStateContext } from '../../contexts/ContextProvider'
import Loader from '../../components/Loader'
import { Button, ButtonGroup, Divider } from '@mui/material'
import { Add, Download, PlayCircle, Remove, Share } from '@mui/icons-material'
import flasher from '@flasher/flasher'
import CustomDivider from '../../components/helpers/CustomDivider'

const SingleVideoDetailView = () => {
    const { category, subCategorySlug, contentSlug } = useParams()
    const { BACKEND_URL, APPNAME, currentUser } = useStateContext()
    document.title = (APPNAME+subCategorySlug).toUpperCase();
    const [videoContent, setVideoContent] = useState('')
    const [realtedVideos, setReleatedVideos] = useState([])
    const [watchlist, setWatchlist] = useState('')
    const [loader, setLoader] = useState(false)
    const getSingleVideoDetails = async() =>{
        setLoader(true)
        await AxiosClient.get(`/single_video_details/${category}/${subCategorySlug}/${contentSlug}/${currentUser.id}`)
        .then(({data})=>{
            setLoader(false)
            setVideoContent(data.data.videos)
            setWatchlist(data.data.watchlist)
            setReleatedVideos(data.data.relatedVideos)
        })
    }
    const handleWatchlist = async(video_id) =>{
        await AxiosClient.post(`/user_watchlist/${currentUser.id}/${video_id}`)
        .then(({data})=>{
            flasher.success(data.msg)
            getSingleVideoDetails()
        })
    }
    useEffect(()=>{
        getSingleVideoDetails()
        // eslint-disable-next-line
    },[subCategorySlug,contentSlug])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <Fragment>
                    <div className='flex flex-col md:flex-row gap-4 p-4'>
                        <div className='w-full md:w-[78%] bg-white rounded-md px-4 py-3'>
                            <h1 className='text-lg md:text-xl font-bold mb-2 uppercase'>{videoContent.video_title}</h1>
                            {/* <h1 className='text-sm font-bold mb-4'>{videoContent.captions}</h1> */}
                            {(videoContent && videoContent.upload_video) ? (
                                <video className='w-full md:h-[30rem] object-cover border border-gray-300 rounded-md' poster={BACKEND_URL+'assets/images/posters/'+videoContent.poster} controls controlsList="download">
                                    <source src={BACKEND_URL+'assets/videos/'+videoContent.upload_video}/>
                                </video>
                            ) : (
                                <iframe title={videoContent.video_title} className='w-full md:h-[30rem] rounded-md' src={videoContent.upload_video_url}></iframe>  
                            )}
                            <div className='mt-4'>
                                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                    {videoContent.upload_video && (
                                        <Button sx={{ background : '#fff' }} size='small' className='md:px-[16px!important] md:py-[8px!important]' variant='outlined' style={{ fontSize : '12px' }} startIcon={<Download/>}><a download={true} href={BACKEND_URL+'assets/videos/'+videoContent.upload_video}>Download</a></Button>
                                    )}
                                    <Button sx={{ background : '#fff' }} size='small' className='md:px-[16px!important] md:py-[8px!important]' variant='outlined' style={{ fontSize : '12px' }} startIcon={<Share/>}>Share Now</Button>
                                    {currentUser.name ? (
                                        <Button sx={{ background : '#fff' }} onClick={()=>handleWatchlist(videoContent.id)} size='small' className='md:px-[16px!important] py-[8px!important]' variant='outlined' style={{ fontSize : '12px' }} startIcon={watchlist ? <Remove/> : <Add/>}>{watchlist ? <span><span className='hidden md:block'>Remove From Watchlist</span><span className='block md:hidden'>Watchlist</span></span> : <span><span className='hidden md:block'>Add To Watchlist</span><span className='block md:hidden'>Watchlist</span></span>}</Button>
                                    ) : (
                                        <Button sx={{ background : '#fff' }} size='small' className='md:px-[16px!important] md:py-[8px!important]' variant='outlined' style={{ fontSize : '12px' }} startIcon={<Add/>}><Link to={'/sign-in'}>Watchlist</Link></Button>
                                    )}
                                </ButtonGroup>
                                <div className='bg-gray-200 py-3 px-4 mt-4 rounded'>
                                    <h1 className='font-bold text-sm md:text-base tracking-wide mb-2 uppercase'>More Information</h1>
                                    <Divider style={{ background : '#1a56db' }}/>
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm md:text-base'>
                                        <h1><span className='font-bold'>Category</span> : {videoContent.category_name}</h1>
                                        <h1><span className='font-bold'>Sub-Category</span> : {videoContent.sub_category_name}</h1>
                                        <h1><span className='font-bold'>Duration</span> : {videoContent.duration}</h1>
                                        <h1><span className='font-bold'>Language</span> : <span className='capitalize'>{videoContent.language}</span></h1>
                                    </div>
                                    {(videoContent.director || videoContent.released_year) && (
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm md:text-base'>
                                            {videoContent.director && (
                                                <h1><span className='font-bold'>Director</span> : {videoContent.director}</h1>
                                            )}
                                            {videoContent.released_year && (
                                                <h1><span className='font-bold'>Released Year</span> : {videoContent.released_year}</h1>
                                            )}
                                        </div>
                                    )}
                                    <div className='mt-3 text-sm md:text-base'>
                                        {videoContent.star_casts && (
                                            <h1><span className='font-bold'>Star Casts</span> : {videoContent.star_casts}</h1>
                                        )}
                                    </div>
                                    <div className='mt-3 text-sm md:text-base'>
                                        <h1 className='font-bold'>Description : </h1>
                                        <h1 className='mt-1'>{videoContent.description}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full md:w-[22%] px-4 py-3 rounded-md bg-white'>
                            <CustomDivider content={"Related Videos"}/>
                            {realtedVideos.length > 0 ? (
                                <div className='grid gap-4 mt-4'>
                                    {realtedVideos.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            <Link to={`/${category}/${data.sub_category_slug}/${data.video_slug}`}>
                                                <div className='relative shadow-md hover:scale-105 transition-all delay-200 overflow-hidden border border-gray-300 rounded-md'>
                                                    <img src={BACKEND_URL+'assets/images/posters/'+data.poster} alt="posters" className='w-full h-40' />
                                                    <div className='bg-[rgba(0,0,0,0.7)] shadow-lg absolute bottom-0 w-full px-3 py-2 rounded-md'>
                                                        <Button startIcon={<PlayCircle/>} size='small' color='secondary' className='whitespace-nowrap overflow-hidden tracking-wider'>{data.video_title}</Button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Fragment>)
                                    })}
                                </div>
                            ) : (
                                <p className='text-center mt-7'>No Related Videos</p>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default SingleVideoDetailView