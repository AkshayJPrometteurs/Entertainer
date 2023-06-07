import React, { Fragment, useEffect, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { ArrowBack, Save } from '@mui/icons-material'
import { Button, CircularProgress, MenuItem, Paper, Select, TextField } from '@mui/material'
import AxiosAdmin from '../../../components/AxiosAdmin'
import flasher from '@flasher/flasher'

const TVChannelMaster = () => {
    const { slug } = useParams()
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME+'Add New TV Show'
    const [formInfo, setFormInfo] = useState({
        tv_shows_name : '',
        status : ''
    })
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [tvShowsImage, setTVShowsImage] = useState('');
    const handleChange = (e) => {setFormInfo({...formInfo, [e.target.name]:e.target.value})}
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('tv_shows_name', formInfo.tv_shows_name)
        formData.append('tv_shows_image', tvShowsImage)
        formData.append('status', formInfo.status)
        AxiosAdmin.post('/admin/tv_shows_store', formData)
        .then(({data})=>{
            setLoader(false)
            flasher.success(data.msg)
            navigate('/admin/tv-shows')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    const [tvChannel, setTVChannel] = useState([])
    const getTVChannelList = () => {
        setLoader(true);
        AxiosAdmin.get('/admin/tv_channels_list')
        .then(({data})=>{
            setLoader(false)
            setTVChannel(data.tv_channel)
        })
    }
    useEffect(()=>{getTVChannelList()},[])
    return (
        <Fragment>
            <AdminPageComponent leftContent={slug ? 'Edit TV Show' : 'Add New TV Show'} rightContent={
                <Link to={'/admin/tv-shows'}>
                    <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize : '12px', padding : '5px 15px' }} startIcon={<ArrowBack/>}>Back To List</Button>
                </Link>
            }>
                <div className='flex justify-center items-center gap-4 h-[65vh]'>
                    <Paper className='p-5 w-80'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid mb-2'>
                                <label className='text-sm'>Enter TV Show Name</label>
                                <TextField size='small' fullWidth name='tv_shows_name' type='text' id='tv_shows_name' value={formInfo.tv_shows_name} onChange={handleChange} margin='dense' error={errors.tv_shows_name && true}/>
                                {errors.tv_shows_name && <p className='text-sm -mt-1 text-red-600'>{errors.tv_shows_name}</p>}
                            </div>
                            <div className='grid mb-2'>
                                <label className='text-sm'>TV Show Image</label>
                                <TextField size='small' fullWidth name='tv_shows_image' type='file' id='tv_shows_image' margin='dense' error={errors.tv_shows_image && true} inputProps={{ style : { fontSize : '14px', padding: '6px 8px 13px 6px' }}} onChange={(e)=>{setTVShowsImage(e.target.files[0])}}/>
                            </div>
                            <div className='grid mb-6'>
                                <label className='text-sm mb-2'>Status</label>
                                <Select name='status' value={formInfo.status} displayEmpty onChange={handleChange} size='small' style={{ fontSize : '14px' }} error={errors.status && true}>
                                    <MenuItem value="" style={{ fontSize : '14px' }}>-- Choose Status --</MenuItem>
                                    <MenuItem value={'active'} style={{ fontSize : '14px' }}>Active</MenuItem>
                                    <MenuItem value={'inactive'} style={{ fontSize : '14px' }}>Inactive</MenuItem>
                                </Select>
                            </div>
                            <div>
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

export default TVChannelMaster