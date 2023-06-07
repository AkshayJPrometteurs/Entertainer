import React, { Fragment, useState } from 'react'
import CustomDivider from '../../../components/helpers/CustomDivider'
import { Button, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { useStateContext } from '../../../contexts/ContextProvider'
import moment from 'moment'
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import AxiosClient from '../../../components/AxiosClient'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'

const PlanUpgrade = () => {
    const { APPNAME, currentUser } = useStateContext();
    document.title = APPNAME+'PLAN UPGRADE';
    const upgradePlans = [
        { title: 'Super', value : 'super', price : 'Rs.899', content : [
            <ul>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch All Videos</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch Recent Crickets Matches</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> 2 Device Logged In</li>
                <li className='my-2.5'><GppBadIcon className='text-red-600'/> Watch Entertainer Premium TV Shows</li>
                <li className='my-2.5'><GppBadIcon className='text-red-600'/> Watch Entertainer Premium Movies</li>
            </ul>
        ] },
        { title: 'Premium', value : 'premium', price : 'Rs.1499', content : [
            <ul>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch All Videos</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch Recent Crickets Matches</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> 4 Device Logged In</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch Entertainer Premium TV Shows</li>
                <li className='my-2.5'><GppGoodIcon className='text-green-600'/> Watch Entertainer Premium Movies</li>
            </ul>
        ] },
    ]
    const [formInfo, setFormInfo] = useState({
        plan_name : 'super',
        plan_validity : '',
        plan_expired_on : ''
    })
    const handleChange = (e) => {setFormInfo({...formInfo,[e.target.name]:e.target.value})}
    if(formInfo.plan_validity === '1Month'){
        formInfo.plan_expired_on = moment().add(1, 'months').format('D MMMM YYYY, h:mm:ss A');
    }else if(formInfo.plan_validity === '1Year'){
        formInfo.plan_expired_on = moment().add(1, 'years').format('D MMMM YYYY, h:mm:ss A');
    }else if(formInfo.plan_validity === '2Year'){
        formInfo.plan_expired_on = moment().add(2, 'years').format('D MMMM YYYY, h:mm:ss A');
    }else if(formInfo.plan_validity === '4Year'){
        formInfo.plan_expired_on = moment().add(4, 'years').format('D MMMM YYYY, h:mm:ss A');
    }
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true);
        AxiosClient.post(`plan_store/${currentUser.id}`, formInfo)
        .then(({data})=>{
            setLoader(false);
            Swal.fire({
                icon: 'success',
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors);
        })
    }
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='p-6'>
                    <CustomDivider content={'Choose Plan For Upgrade'}/>
                    <div className='md:flex md:justify-center my-6 md:h-[80vh] md:items-center'>
                        <FormControl className='w-full md:w-3/5 bg-white shadow-xl p-[1.5rem!important] rounded-md'>
                            <form onSubmit={handleSubmit}>
                                <RadioGroup onChange={handleChange} defaultValue="super" name="plan_name" sx={{ display : "grid" }} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    {upgradePlans.map((data, id)=>{
                                        return(<Fragment key={id}>
                                            <FormControlLabel sx={{ position : 'relative' }} value={data.value} control={<Radio size='large' color='secondary' sx={{ position : 'absolute', left : 10, top : 10, color: '#fff' }} />} labelPlacement='bottom' label={
                                                <div className='p-4 bg-black rounded-md text-white' sx={{ width : '100%!important' }}>
                                                    <Typography variant='h4' className='text-center uppercase font-extrabold tracking-widest'>{data.title}</Typography>
                                                    <Divider sx={{ margin : '10px 0', background : '#fff' }}/>
                                                    <h1 className='text-2xl font-bold text-center'>{data.price} {data.price !== 'Free' && '/-'}</h1>
                                                    <h1 className='font-bold my-3'>Benefits :</h1>
                                                    {data.content}
                                                </div>
                                            }/>
                                        </Fragment>)
                                    })}
                                </RadioGroup>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-6'>
                                    <div className='w-full grid'>
                                        <label htmlFor='plan_validity' className='mb-2'>Choose Plan Validity</label>
                                        <Select id='plan_validity' size='small' onChange={handleChange} name='plan_validity' value={formInfo.plan_validity} error={errors.plan_validity && true}>
                                            <MenuItem value={'1Month'}>1 Month</MenuItem>
                                            <MenuItem value={'1Year'}>1 Year</MenuItem>
                                            <MenuItem value={'2Year'}>2 Year</MenuItem>
                                            <MenuItem value={'4Year'}>4 Year</MenuItem>
                                        </Select>
                                    </div>
                                    <div className='w-full grid'>
                                        <label className='mb-2'>Plan Expired On</label>
                                        <TextField size='small' className='bg-gray-200' fullWidth InputProps={{ readOnly: true}} onChange={handleChange} name='plan_expired_on' value={formInfo.plan_expired_on}/>
                                    </div>
                                </div>
                                <Button type='submit' variant='contained' fullWidth>Upgrade Now</Button>
                            </form>
                        </FormControl>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default PlanUpgrade