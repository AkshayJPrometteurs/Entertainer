import React, { Fragment, useEffect, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { ArrowBack, Save } from '@mui/icons-material'
import { Button, Chip, CircularProgress, Divider, MenuItem, Paper, Select, TextField } from '@mui/material'
import AxiosAdmin from '../../../components/AxiosAdmin'
import flasher from '@flasher/flasher'
import CustomDivider from '../../../components/helpers/CustomDivider'

const VideoMaster = () => {
    const { slug } = useParams()
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME+'Add New Video'
    const [formInfo, setFormInfo] = useState({
        category : '',
        subcategory : '',
        video_title : '',
        duration : '',
        released_year : '',
        star_casts : '',
        director : '',
        tv_shows : '',
        seasons : '',
        tv_channel : '',
        language : '',
        captions : '',
        status : '',
        upload_video_url : '',
        description : '',
    })
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [subcategories, setSubCategories] = useState([])
    const [languages, setLanguages] = useState([])
    const [tvChannels, setTVChannels] = useState([])
    const [tvShows, setTVShows] = useState([])
    const navigate = useNavigate()
    const handleChange = async(e) => {
        setFormInfo({...formInfo, [e.target.name]:e.target.value})
        if(e.target.name === 'category'){
            await AxiosAdmin.get(`/admin/categorywise_sub_category_list/${e.target.value}`)
            .then(({data})=>{
                setLoader(false)
                setSubCategories(data.data) 
            })
        }
    }
    const [videoFile, setVideoFile] = useState('')
    const [posterFile, setPosterFile] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('category', formInfo.category)
        formData.append('subcategory', formInfo.subcategory)
        formData.append('video_title', formInfo.video_title)
        formData.append('poster', posterFile)
        formData.append('duration', formInfo.duration)
        formData.append('released_year', formInfo.released_year)
        formData.append('star_casts', formInfo.star_casts)
        formData.append('director', formInfo.director)
        formData.append('tv_channel', formInfo.tv_channel)
        formData.append('tv_shows', formInfo.tv_shows)
        formData.append('seasons', formInfo.seasons)
        formData.append('language', formInfo.language)
        formData.append('captions', formInfo.captions)
        formData.append('status', formInfo.status)
        formData.append('upload_video', videoFile)
        formData.append('upload_video_url', formInfo.upload_video_url)
        formData.append('description', formInfo.description)
        AxiosAdmin.post('/admin/video_store', formData)
        .then(({data})=>{
            setLoader(false)
            flasher.success(data.msg)
            navigate('/admin/videos')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    const getVideoContentList = async() => {
        setLoader(true)
        await AxiosAdmin.get('/admin/get_video_content_list')
        .then(({data})=>{
            setLoader(false)
            setCategories(data.data.category)
            setLanguages(data.data.languages)
            setTVChannels(data.data.tv_channels)
            setTVShows(data.data.tv_shows)
        })
    }
    useEffect(()=>{getVideoContentList()},[])
    return (
        <Fragment>
            <AdminPageComponent leftContent={slug ? 'Edit Video' : 'Add New Video'} rightContent={
                <Link to={'/admin/videos'}>
                    <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize : '12px', padding : '5px 15px' }} startIcon={<ArrowBack/>}>Back To List</Button>
                </Link>
            }>
                <div>
                    <Paper className='p-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mb-3 md:mb-2'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold tracking-wide'>Category</label>
                                    <Select fullWidth size='small' name='category' value={formInfo.category} displayEmpty onChange={handleChange} style={{ fontSize : '14px' }} error={errors.category && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Select --</MenuItem>
                                        {categories.map((data, id)=>{ return(<MenuItem key={id} value={data.id} style={{ fontSize : '14px' }}>{data.category_name}</MenuItem>) })}
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold tracking-wide'>Sub-Category</label>
                                    <Select fullWidth size='small' name='subcategory' value={formInfo.subcategory} displayEmpty onChange={handleChange} style={{ fontSize : '14px' }} error={errors.subcategory && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Select --</MenuItem>
                                        {subcategories.map((data, id)=>{ return(<MenuItem key={id} value={data.id} style={{ fontSize : '14px' }}>{data.sub_category_name}</MenuItem>) })}
                                    </Select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Video Title</label>
                                    <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='video_title' type='text' id='video_title' value={formInfo.video_title} onChange={handleChange} margin='dense' error={errors.video_title && true}/>
                                    {errors.video_title && <p className='text-sm -mt-1 text-red-600'>{errors.video_title}</p>}
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Poster</label>
                                    <TextField style={{ fontSize : '14px' }} inputProps={{ style : { fontSize : '14px', padding: '6px 8px 15px 8px' } }}  size='small' fullWidth name='poster' type='file' id='poster' onChange={(e)=>{setPosterFile(e.target.files[0])}} margin='dense' error={errors.poster && true}/>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Duration</label>
                                    <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='duration' type='text' id='duration' value={formInfo.duration} onChange={handleChange} margin='dense' error={errors.duration && true}/>
                                </div>
                                {(formInfo.category === 1 || formInfo.category === 2) && (
                                    <Fragment>
                                        <div className='flex flex-col'>
                                            <label className='text-sm font-bold tracking-wide'>Released Year</label>
                                            <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='released_year' type='text' id='released_year' value={formInfo.released_year} onChange={handleChange} InputProps={{ maxLength : 4 }} margin='dense' error={errors.released_year && true}/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='text-sm font-bold tracking-wide'>Star Casts</label>
                                            <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='star_casts' type='text' id='star_casts' value={formInfo.star_casts} onChange={handleChange} margin='dense' error={errors.star_casts && true}/>
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className='text-sm font-bold tracking-wide'>Director</label>
                                            <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='director' type='text' id='director' value={formInfo.director} onChange={handleChange} margin='dense' error={errors.director && true}/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='text-sm font-bold tracking-wide'>Seasons</label>
                                            <Select name='seasons' value={formInfo.seasons} displayEmpty onChange={handleChange} size='small' style={{ fontSize : '14px' }} error={errors.seasons && true}>
                                                <MenuItem value="" style={{ fontSize : '14px' }}>-- Choose Season --</MenuItem>
                                                <MenuItem value={1} style={{ fontSize : '14px' }}>Season 1</MenuItem>
                                                <MenuItem value={2} style={{ fontSize : '14px' }}>Season 2</MenuItem>
                                                <MenuItem value={3} style={{ fontSize : '14px' }}>Season 3</MenuItem>
                                                <MenuItem value={4} style={{ fontSize : '14px' }}>Season 4</MenuItem>
                                                <MenuItem value={5} style={{ fontSize : '14px' }}>Season 5</MenuItem>
                                                <MenuItem value={6} style={{ fontSize : '14px' }}>Season 6</MenuItem>
                                            </Select>
                                        </div>
                                    </Fragment>
                                )}
                                {formInfo.category === 2 && (
                                    <Fragment>
                                        <div className='flex flex-col gap-2'>
                                            <label className='text-sm font-bold tracking-wide'>TV Channel</label>
                                            <Select fullWidth size='small' name='tv_channel' value={formInfo.tv_channel} displayEmpty onChange={handleChange} style={{ fontSize : '14px' }} error={errors.tv_channel && true}>
                                                <MenuItem value="" style={{ fontSize : '14px' }}>-- Select --</MenuItem>
                                                {tvChannels.map((data, id)=>{ return(<MenuItem key={id} value={data.tv_channel_slug} style={{ fontSize : '14px' }}>{data.tv_channel_name}</MenuItem>) })}
                                            </Select>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label className='text-sm font-bold tracking-wide'>TV Show</label>
                                            <Select fullWidth size='small' name='tv_shows' value={formInfo.tv_shows} displayEmpty onChange={handleChange} style={{ fontSize : '14px' }} error={errors.tv_shows && true}>
                                                <MenuItem value="" style={{ fontSize : '14px' }}>-- Select --</MenuItem>
                                                {tvShows.map((data, id)=>{ return(<MenuItem key={id} value={data.tv_shows_slug} style={{ fontSize : '14px' }}>{data.tv_shows_name}</MenuItem>) })}
                                            </Select>
                                        </div>
                                    </Fragment>
                                )}
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold tracking-wide'>Language</label>
                                    <Select fullWidth size='small' name='language' value={formInfo.language} displayEmpty onChange={handleChange} style={{ fontSize : '14px' }} error={errors.language && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Select --</MenuItem>
                                        {languages.map((data, id)=>{ return(<MenuItem key={id} value={data.languages_slug} style={{ fontSize : '14px' }}>{data.languages_name}</MenuItem>) })}
                                    </Select>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Captions</label>
                                    <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='captions' type='text' id='captions' value={formInfo.captions} onChange={handleChange} margin='dense' error={errors.captions && true}/>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold tracking-wide'>Status</label>
                                    <Select name='status' value={formInfo.status} displayEmpty onChange={handleChange} size='small' style={{ fontSize : '14px' }} error={errors.status && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Choose Status --</MenuItem>
                                        <MenuItem value={'active'} style={{ fontSize : '14px' }}>Active</MenuItem>
                                        <MenuItem value={'inactive'} style={{ fontSize : '14px' }}>Inactive</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-x-6 gap-y-2 mb-2'>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Upload Video</label>
                                    <TextField style={{ fontSize : '14px' }} inputProps={{ style : { fontSize : '14px', padding: '6px 8px 15px 8px' }}}  size='small' fullWidth name='upload_video' type='file' id='upload_video' onChange={(e)=>{setVideoFile(e.target.files[0])}} margin='dense' error={errors.upload_video && true}/>
                                </div>
                                <div className='md:mt-6'><CustomDivider content={'OR'}/></div>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-bold tracking-wide'>Upload Video URL</label>
                                    <TextField style={{ fontSize : '14px' }} size='small' fullWidth name='upload_video_url' type='url' id='upload_video_url' value={formInfo.upload_video_url} onChange={handleChange} margin='dense' error={errors.upload_video_url && true}/>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-sm font-bold tracking-wide'>Description</label>
                                <TextField rows={4} multiline style={{ fontSize : '14px' }} size='small' fullWidth name='description' type='text' id='description' value={formInfo.description} onChange={handleChange} margin='dense' error={errors.description && true}/>
                            </div>
                            <div className='mt-4 md:w-80 mx-auto'>
                                {loader ? (
                                    <Button startIcon={<CircularProgress style={{ color : '#fff' }} size={'1.3rem'}/>} variant='contained' className='tracking-wider' fullWidth>Please Wait</Button>
                                ) : (
                                    <Button startIcon={<Save/>} type='submit' variant='contained' className='tracking-wider' fullWidth>Submit Now</Button>
                                )}
                            </div>
                        </form>
                    </Paper>
                </div>
            </AdminPageComponent>
        </Fragment>
    )
}

export default VideoMaster 