import { Button, Chip, CircularProgress, Divider, TextField } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import Logo from '../../../components/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import AxiosClient from '../../../components/AxiosClient'
import flasher from '@flasher/flasher'

const Login = () => {
    const { APPNAME } = useStateContext()
    document.title = (APPNAME+'Sign In').toUpperCase()
    const [mobile, setMobile] = useState('')
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const { state } = useLocation();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('mobile', mobile)
        AxiosClient.post('/user/signin', formData)
        .then(({data})=>{
            setLoader(false)
            setErrors('')
            flasher.success(data.message)
            navigate('/otp-verification',{state : data})
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    useEffect(()=>{
        if(state){
            setMobile(state)
        }
    },[state])
    return (
        <Fragment>
            <div className='p-8 w-96 animate__animated animate__fadeInLeft rounded-xl bg-white shadow-md'>
                <Logo/>
                <h1 className='text-sm text-center mb-4'>Create an account? <Link className='text-blue-600 font-bold' to={'/sign-up'}>Go To Sign Up</Link></h1>
                <Divider variant="middle" ><Chip label="OR" style={{ fontSize: '13px' }} /></Divider>
                <h1 className='text-2xl font-extrabold uppercase text-center mb-2 mt-4 tracking-widest'>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="mobile" name='mobile' value={mobile} type='text' onChange={(e)=>{setMobile(e.target.value)}} label="Mobile No." variant="outlined" fullWidth margin='normal' InputLabelProps={{ shrink: true }} onKeyPress={(e)=>{if(!/[0-9]/.test(e.key)){e.preventDefault()}}} inputProps={{ maxLength : 10 }} error={errors.mobile && true}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    }}
                    />
                    {errors.mobile && <p className='text-sm text-red-600'>{errors.mobile}</p>}
                    <div className='my-4'>
                        {loader ? (
                            <Button startIcon={<CircularProgress style={{ color : '#fff' }} size={'1.3rem'}/>} variant='contained' className='tracking-wider' fullWidth>Please Wait</Button>
                        ) : (
                            <Button startIcon={<LockOpenIcon/>} type='submit' variant='contained' className='tracking-wider' fullWidth>Sign In Now</Button>
                        )}
                    </div>
                    <Divider variant="middle"><Chip label="OR" /></Divider>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <Button startIcon={<GoogleIcon/>} type='submit' variant='outlined' className='tracking-wider' fullWidth>Google</Button>
                        <Button startIcon={<FacebookIcon/>} type='submit' variant='outlined' className='tracking-wider' fullWidth>Facebook</Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login