import React, { Fragment, useEffect, useState } from 'react'
import AdminPageComponent from '../../../components/AdminPageComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import { ArrowBack, Save } from '@mui/icons-material'
import { Button, CircularProgress, MenuItem, Paper, Select, TextField } from '@mui/material'
import AxiosAdmin from '../../../components/AxiosAdmin'
import flasher from '@flasher/flasher'
import Loader from '../../../components/Loader'

const SubCategoryMaster = () => {
    const { slug } = useParams()
    const { ADMINAPPNAME } = useStateContext()
    document.title = ADMINAPPNAME+'Add New Sub-Category'
    const [formInfo, setFormInfo] = useState({
        category : '',
        sub_category_name : '',
        status : ''
    })
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const handleChange = (e) => {setFormInfo({...formInfo, [e.target.name]:e.target.value})}
    const [iconFile, setIconFile] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('category', formInfo.category)
        formData.append('sub_category_name', formInfo.sub_category_name)
        formData.append('icon', iconFile)
        formData.append('status', formInfo.status)
        AxiosAdmin.post('/admin/sub_category_store', formData)
        .then(({data})=>{
            setLoader(false)
            flasher.success(data.msg)
            navigate('/admin/subcategories')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    const [categories, setCategories] = useState([])
    const getCategoryList = async() => {
        setLoader(true)
        await AxiosAdmin.get('/admin/category_list')
        .then(({data})=>{
            setLoader(false)
            setCategories(data.data) 
        })
    }
    useEffect(()=>{ getCategoryList() },[])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <AdminPageComponent leftContent={slug ? 'Edit Sub-Category' : 'Add New Sub-Category'} rightContent={
                    <Link to={'/admin/categories'}>
                        <Button variant='contained' size='small' className='tracking-wide' style={{ fontSize : '12px', padding : '5px 15px' }} startIcon={<ArrowBack/>}>Back To List</Button>
                    </Link>
                }>
                    <div className='flex justify-center items-center gap-4 h-[65vh]'>
                        <Paper className='p-5 w-96'>
                            <form onSubmit={handleSubmit}>
                                <div className='grid mb-4'>
                                    <label className='text-sm mb-2'>Category</label>
                                    <Select name='category' value={formInfo.category} displayEmpty onChange={handleChange} size='small' style={{ fontSize : '14px' }} error={errors.category && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Choose --</MenuItem>
                                        {categories.map((data,id)=>{return(<MenuItem key={id} value={data.id} style={{ fontSize : '14px' }}>{data.category_name}</MenuItem>)})}
                                    </Select>
                                </div>
                                <div className='grid mb-3'>
                                    <label className='text-sm'>Enter Sub-Category Name</label>
                                    <TextField size='small' fullWidth name='sub_category_name' type='text' id='sub_category_name' value={formInfo.sub_category_name} onChange={handleChange} margin='dense' error={errors.sub_category_name && true}/>
                                    {errors.sub_category_name && <p className='text-sm -mt-1 text-red-600'>{errors.sub_category_name}</p>}
                                </div>
                                <div className='grid mb-3'>
                                    <label className='text-sm'>Choose Icon</label>
                                    <TextField size='small' fullWidth name='icon' type='file' id='icon' value={formInfo.icon} onChange={(e)=>{setIconFile(e.target.files[0])}} margin='dense' error={errors.icon && true} inputProps={{ style : { padding: '6px 6px 12px 6px' } }}/>
                                    {errors.icon && <p className='text-sm -mt-1 text-red-600'>{errors.icon}</p>}
                                </div>
                                <div className='grid mb-6'>
                                    <label className='text-sm mb-2'>Status</label>
                                    <Select name='status' value={formInfo.status} displayEmpty onChange={handleChange} size='small' style={{ fontSize : '14px' }} error={errors.status && true}>
                                        <MenuItem value="" style={{ fontSize : '14px' }}>-- Choose --</MenuItem>
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
            )}
        </Fragment>
    )
}

export default SubCategoryMaster