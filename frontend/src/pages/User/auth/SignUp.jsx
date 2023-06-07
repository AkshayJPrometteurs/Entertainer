import { Button, CircularProgress, Divider, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../components/Logo'
import { useStateContext } from '../../../contexts/ContextProvider'
import AxiosClient from '../../../components/AxiosClient'
import LockIcon from '@mui/icons-material/Lock';
import Swal from 'sweetalert2'
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import moment from 'moment'

const Register = () => {
    const { APPNAME } = useStateContext()
    document.title = (APPNAME+'Sign Up').toUpperCase()
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [formInfo, setFormInfo] = useState({
        name : '',
        email : '',
        mobile : '',
        password : ''
    })
    const handleChange = (e) => {setFormInfo(formInfo=>({...formInfo, [e.target.name]:e.target.value}))}
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData();
        formData.append('name',formInfo.name)
        formData.append('email',formInfo.email)
        formData.append('mobile',formInfo.mobile)
        formData.append('password',formInfo.password)
        formData.append('plan_name','Trial')
        formData.append('plan_validity','15Days')
        formData.append('plan_expired_on',moment().add(15, 'days').format('D MMMM YYYY, h:mm:ss A'))
        AxiosClient.post('/user/signup', formData)
        .then(({data})=>{
            setLoader(false)
            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Fragment>
            <div className='px-8 pt-7 pb-4 max-w-md animate__animated animate__fadeInRight rounded-xl bg-white shadow-md'>
                <Logo/>
                <h1 className='text-sm text-center mb-4'>Already have an account? <Link className='text-blue-600 font-bold' to={'/sign-in'}>Go To Sign In</Link></h1>
                <Divider/>
                <h1 className='text-2xl font-extrabold uppercase text-center mb-2 mt-4 tracking-widest'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="name" name='name' value={formInfo.name} type='text' onChange={handleChange} label="Name" variant="outlined" size='small' fullWidth margin='normal' InputLabelProps={{ shrink: true }} error={errors.name && true} />
                    <TextField id="email" name='email' value={formInfo.email} type='email' onChange={handleChange} label="Email-ID" variant="outlined" size='small' fullWidth margin='normal' InputLabelProps={{ shrink: true }} error={errors.email && true} />
                    {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
                    <TextField id="mobile" name='mobile' value={formInfo.mobile} type='text' onChange={handleChange} label="Mobile No." variant="outlined" size='small' fullWidth margin='normal' InputLabelProps={{ shrink: true }} onKeyPress={(e)=>{if(!/[0-9]/.test(e.key)){e.preventDefault()}}} inputProps={{ maxLength : 10 }} error={errors.mobile && true}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    }}/>
                    {errors.mobile && <p className='text-sm text-red-600'>{errors.mobile}</p>}
                    <div className='relative'>
                        <TextField id="password" name='password' value={formInfo.password} type={showPassword ? 'text' : 'password'} onChange={handleChange} label="Create Password" variant="outlined" size='small' fullWidth margin='normal' InputLabelProps={{ shrink: true }} error={errors.password && true}/>
                        {showPassword ? (
                            <Fragment>
                                <div onClick={handleClickShowPassword}>
                                    <VisibilityOff className='absolute top-6 right-3 cursor-pointer'/>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <div onClick={handleClickShowPassword}>
                                    <Visibility className='absolute top-6 right-3 cursor-pointer'/>
                                </div>
                            </Fragment>
                        )}                        
                    </div>
                    <div className='my-4'>
                        {loader ? (
                            <Button startIcon={<CircularProgress style={{ color : '#fff' }} size={'1.3rem'}/>} variant='contained' className='tracking-wider' fullWidth>Please Wait</Button>
                        ) : (
                            <Button startIcon={<LockIcon/>} type='submit' variant='contained' className='tracking-wider' fullWidth>Sign Up Now</Button>
                        )}
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Register