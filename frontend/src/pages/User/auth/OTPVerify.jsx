import { Button, Chip, CircularProgress, Divider, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import Logo from '../../../components/Logo'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../../contexts/ContextProvider'
import AxiosClient from '../../../components/AxiosClient'
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'

const OTPVerify = () => {
    const { APPNAME, setCurrentUser, setUserToken } = useStateContext()
    document.title = (APPNAME+'OTP Verification').toUpperCase()
    const [otp, setOtp] = useState('')
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const { state } = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData()
        formData.append('mobile', state.mobile)
        formData.append('otp', otp)
        AxiosClient.post('/user/otp_verification', formData)
        .then(({data})=>{
            setLoader(false)
            setErrors('')
            setCurrentUser(data)
            setUserToken(data.token)
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
    return (
        <Fragment>
            <div className='p-8 w-96 animate__animated animate__fadeInLeft rounded-xl bg-white shadow-md'>
                <Logo/>
                <h1 className='text-sm text-center mb-4'>Create an account? <Link className='text-blue-600 font-bold' to={'/sign-up'}>Go To Sign Up</Link></h1>
                <Divider variant="middle" ><Chip label="OR" style={{ fontSize: '13px' }} /></Divider>
                <h1 className='text-2xl font-extrabold uppercase text-center mb-2 mt-4 tracking-widest'>OTP Verification</h1>
                <form onSubmit={handleSubmit}>
                    <h1 className='font-bold text-center text-xl my-4'>+91 - {state.mobile}<span className='text-blue-600 ml-3 cursor-pointer' onClick={()=>navigate('/sign-in',{state : state.mobile})}><EditIcon/></span></h1>
                    <TextField id="otp" name='otp' value={otp} type='text' onChange={(e)=>{setOtp(e.target.value)}} label="Enter OTP" variant="outlined" fullWidth margin='normal' InputLabelProps={{ shrink: true }} onKeyPress={(e)=>{if(!/[0-9]/.test(e.key)){e.preventDefault()}}} inputProps={{ maxLength : 7 }} error={errors.otp && true}/>
                    {errors.otp && <p className='text-sm text-red-600'>{errors.otp}</p>}
                    <div className='my-4'>
                        {loader ? (
                            <Button startIcon={<CircularProgress style={{ color : '#fff' }} size={'1.3rem'}/>} variant='contained' className='tracking-wider' fullWidth>Please Wait</Button>
                        ) : (
                            <Button type='submit' variant='contained' className='tracking-wider' fullWidth>Verify OTP</Button>
                        )}
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default OTPVerify