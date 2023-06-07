import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomDivider from '../../components/helpers/CustomDivider'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Divider, Typography } from '@mui/material'
import Loader from '../../components/Loader'
import { PlayCircle } from '@mui/icons-material'

const LanguagesVideos = () => {
    const { category, language } = useParams()
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+category+' '+language).toUpperCase()
    const [loader, setLoader] = useState()
    const [languageCategoryVideo, setLanguageCategoryVideo] = useState([])
    const [videoLanguages, setVideoLanguages] = useState([])
    const [forTitle, setForTitle] = useState([])
    const getLanguageCategoryVideoList = () => {
        setLoader(true);
        AxiosClient.get(`/get_language_category_video_lists/${category}/${language}`)
        .then(({data})=>{
            setLoader(false)
            setLanguageCategoryVideo(data.videos)
            setVideoLanguages(data.videoLanguages)
            setForTitle(data.forTitle)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getLanguageCategoryVideoList()},[category,language])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='py-4 px-6'>
                    <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-6'>
                        <div className='w-full md:w-[78%]'>
                            <CustomDivider content={(forTitle && forTitle.category_name)+' - '+language}/> 
                            <div className='my-4'>
                                {languageCategoryVideo.length > 0 ? (
                                    <div className='grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6'>
                                        {languageCategoryVideo.map((data,id)=>{
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
                                                            <Link to={`/${category}/${data.sub_category_slug}/${data.video_slug}`}>
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
                                ) : (
                                    <div className='flex justify-center items-center md:h-[80vh]'>
                                        <Typography variant='h4' className='uppercase tracking-wider font-bold text-center'>Sorry! No Vidos Found</Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='w-full md:w-[22%]'>
                            <CustomDivider content={'Search '+(forTitle && forTitle.category_name)+' By'}/>
                            <div className='bg-white rounded-md px-4 pb-4 pt-3 my-4'>
                                <h1 className='text-center font-bold tracking-wider mb-2 text-sm'>Languages</h1>
                                <Divider style={{ background : '#1a56db' }}/>
                                <div className='grid grid-cols-3 md:grid-cols-2 gap-3 mt-4'>
                                    {videoLanguages.map((data, id)=>{
                                        return(<Fragment key={id}>
                                            {language !== data.languages_slug && (
                                                <Link to={`/${category}/language/${data.languages_slug}`} className={'border border-gray-300 p-2 rounded-lg shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-200 flex items-center justify-center '+(language === data.languages_slug ? 'bg-primaryColor text-white' : 'bg-white')}>
                                                    <h1>{data.languages_name}</h1>
                                                </Link>
                                            )}
                                        </Fragment>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default LanguagesVideos