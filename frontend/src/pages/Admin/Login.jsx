import React, { Fragment, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import { Button, CircularProgress, Divider, TextField } from '@mui/material'
import AxiosAdmin from '../../components/AxiosAdmin'
import { Info } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
    const { FRONTEND_URL, setAdminToken, setCurrentAdmin, adminToken } = useStateContext()
    const [formInfo, setFormInfo] = useState({
        email : '',
        password : ''
    })
    const [errors, setErrors] = useState([])
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {setFormInfo({...formInfo,[e.target.name]:e.target.value})}
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('email', formInfo.email)
        formData.append('password', formInfo.password)
        await AxiosAdmin.post('/admin/login', formData)
        .then(({data})=>{
            setLoader(false)
            setCurrentAdmin(data)
            setAdminToken(data.adminToken)
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/admin/dashboard')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    if(adminToken){return(<Navigate to={'/admin/dashboard'}/>)}
    return (
        <Fragment>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-white border border-gray-200 rounded-md p-8'>
                    <div className='flex items-center gap-4 mb-4'>
                        <img src={FRONTEND_URL+'assets/images/favicon.png'} alt="logo" className='w-14 h-14' />
                        <h1 className='uppercase text-center text-2xl font-bold tracking-wider w-full -ml-4'>Admin Login</h1>
                    </div>
                    <Divider style={{ background : '#1a56db' }}/>
                    {errors.credentials_error && (
                        <div className='mt-4 bg-red-600 text-white flex items-center gap-2 py-2 px-4 rounded-md'>
                            <Info/>
                            <span>{errors.credentials_error}</span>
                        </div>
                    )}
                    <div className='mt-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <label htmlFor='email'>Email Address</label>
                                <TextField size='small' id='email' name='email' type='email' value={formInfo.email} onChange={handleChange} fullWidth margin='dense' error={errors.email && true}/>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='password'>Password</label>
                                <TextField size='small' id='password' name='password' type='password' value={formInfo.password} onChange={handleChange} fullWidth margin='dense' error={errors.password && true}/>
                            </div>
                            <div>
                                {loader ? (
                                    <Button startIcon={<CircularProgress style={{ color : '#fff' }} size={'1.3rem'}/>} variant='contained' className='tracking-wider' fullWidth>Please Wait</Button>
                                ) : (
                                    <Button type='submit' variant='contained' className='tracking-wider' fullWidth>Login Now</Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login