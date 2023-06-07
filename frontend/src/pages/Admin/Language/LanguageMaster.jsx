import React, { Fragment, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { ArrowBack, Save } from '@mui/icons-material'
import { Button, CircularProgress, MenuItem, Paper, Select, TextField } from '@mui/material'
import AxiosAdmin from '../../../components/AxiosAdmin'
import flasher from '@flasher/flasher'

const LanguagesMaster = () => {
    const { slug } = useParams()
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME+'Add New Language'
    const [formInfo, setFormInfo] = useState({
        languages_name : '',
        status : ''
    })
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const handleChange = (e) => {setFormInfo({...formInfo, [e.target.name]:e.target.value})}
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('languages_name', formInfo.languages_name)
        formData.append('status', formInfo.status)
        AxiosAdmin.post('/admin/languages_store', formData)
        .then(({data})=>{
            setLoader(false)
            flasher.success(data.msg)
            navigate('/admin/languages')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    return (
        <Fragment>
            <AdminPageComponent leftContent={slug ? 'Edit Language' : 'Add New Language'} rightContent={
                <Link to={'/admin/languages'}>
                    <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize : '12px', padding : '5px 15px' }} startIcon={<ArrowBack/>}>Back To List</Button>
                </Link>
            }>
                <div className='flex justify-center items-center gap-4 h-[65vh]'>
                    <Paper className='p-5 w-80'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid mb-1'>
                                <label className='text-sm'>Enter Languages Name</label>
                                <TextField size='small' fullWidth name='languages_name' type='text' id='languages_name' value={formInfo.languages_name} onChange={handleChange} margin='dense' error={errors.languages_name && true}/>
                                {errors.languages_name && <p className='text-sm -mt-1 text-red-600'>{errors.languages_name}</p>}
                            </div>
                            <div className='grid mb-6'>
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

export default LanguagesMaster