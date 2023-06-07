import React, { Fragment, useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Divider, Typography } from '@mui/material'
import Loader from '../../components/Loader'
import { Link, useParams } from 'react-router-dom'
import { PlayCircle } from '@mui/icons-material'
import CustomDivider from '../../components/helpers/CustomDivider'

const ContentwiseVideoLists = () => {
    const { APPNAME, BACKEND_URL } = useStateContext()
    const { category, subCategorySlug } = useParams()
    document.title = APPNAME+(subCategorySlug.replace('-',' ')).toUpperCase();
    const [videosLists, setVideosLists] = useState([])
    const [trendingVideos, setTrendingVideos] = useState([])
    const [loader, setLoader] = useState(false)
    const [realetdCategories, setRelatedCategories] = useState([])
    const [videoLanguages, setVideoLanguages] = useState([])
    const [tvChannels, setTVChannels] = useState([])
    const [forTitle, setForTitle] = useState('')
    const getVideoList = async() => {
        setLoader(true)
        await AxiosClient.get(`/user_contentwise_video_list/${category}/${subCategorySlug}`)
        .then(({data})=>{
            setLoader(false)
            setVideosLists(data.data.videos)
            setRelatedCategories(data.data.relatedSubCategories)
            setTrendingVideos(data.data.trendingVideos)
            setVideoLanguages(data.data.videoLanguages)
            setTVChannels(data.data.tvChannels)
            setForTitle(data.data.forTitle)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getVideoList()},[category,subCategorySlug])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='px-5 py-3'>
                    <div className='flex flex-col-reverse md:flex-row gap-1 md:gap-6'>
                        <div className='w-full md:w-[78%]'>
                            <CustomDivider content={(forTitle && forTitle.category_name)+' - '+(forTitle && forTitle.sub_category_name)}/>
                            {(videosLists && videosLists.length > 0) ? (
                                <Fragment>
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 my-4'>
                                        {videosLists.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                {data.seasons === null ? (
                                                    <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <div className='px-4 pt-2 pb-1'>
                                                            <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                            <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                            </div>
                                                        </div>
                                                        <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-28' alt='vide_poster'/>
                                                        <div className={'p-3'}>
                                                            <Link to={`/${category}/${subCategorySlug}/${data.video_slug}`}>
                                                                <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <img src={BACKEND_URL+'assets/images/TVShows/'+data.tv_shows_image} className='w-full h-full rounded-md' alt='vide_poster'/>
                                                    </Link>
                                                )}
                                            </Fragment>)
                                        })}
                                    </div>
                                    {trendingVideos.length > 0 && (
                                        <Fragment>
                                            <CustomDivider content={'Trending '+(forTitle && forTitle.category_name)}/>
                                            <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 mt-4'>
                                                {trendingVideos.map((data,id)=>{
                                                    return(<Fragment key={id}>
                                                        {data.seasons === null ? (
                                                            <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                                <div className='px-4 pt-2 pb-1'>
                                                                    <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                                    <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                                        <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                                        <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                                    </div>
                                                                </div>
                                                                <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-28' alt='vide_poster'/>
                                                                <div className={'p-3'}>
                                                                    <Link to={`/${category}/${subCategorySlug}/${data.video_slug}`}>
                                                                        <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                                <img src={BACKEND_URL+'assets/images/TVShows/'+data.tv_shows_image} className='w-full h-full rounded-md' alt='vide_poster'/>
                                                            </Link>
                                                        )}
                                                    </Fragment>)
                                                })}
                                            </div>
                                        </Fragment>
                                    )}
                                </Fragment>
                            ) : (
                                <div className='flex justify-center items-center md:h-[80vh] mt-4'>
                                    <Typography variant='h4' className='uppercase tracking-wider font-bold text-center'>Sorry! No Vidos Found</Typography>
                                </div>
                            )}
                        </div>
                        <div className='w-full md:w-[22%]'>
                            <CustomDivider content={'Search '+(forTitle && forTitle.category_name)+' By'}/>
                            <div className='flex flex-col gap-5 my-4'>
                                <div className='bg-white rounded-md px-4 pb-4 pt-3'>
                                    <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>Categories</h1>
                                    <Divider style={{ background : '#1a56db' }}/>
                                    <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                        {realetdCategories.map((data, id)=>{
                                            return(<Fragment key={id}>
                                                <Link to={`/${category}/${data.sub_category_slug}`} className='bg-white border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200'>
                                                    <h1>{data.sub_category_name}</h1>
                                                </Link>
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                                <div className='bg-white rounded-md px-4 pb-4 pt-3'>
                                    <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>Languages</h1>
                                    <Divider style={{ background : '#1a56db' }}/>
                                    <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                        {videoLanguages.map((data, id)=>{
                                            return(<Fragment key={id}>
                                                <Link to={`/${category}/language/${data.languages_slug}`} className='bg-white border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200'>
                                                    <h1>{data.languages_name}</h1>
                                                </Link>
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                                {category === 'tv-shows' && (
                                    <div className='bg-white rounded-md px-4 pb-4 pt-3'>
                                        <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>TV Channels</h1>
                                        <Divider style={{ background : '#1a56db' }}/>
                                        <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                            {tvChannels.map((data, id)=>{
                                                return(<Fragment key={id}>
                                                    <Link to={`/${category}/tv-channel/${data.tv_channel_slug}`} className='bg-white border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200 flex items-center justify-center'>
                                                        <h1>{data.tv_channel_name}</h1>
                                                    </Link>
                                                </Fragment>)
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ContentwiseVideoLists