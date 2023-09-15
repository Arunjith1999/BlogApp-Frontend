import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaAppStore,FaEye,FaEyeSlash } from 'react-icons/fa'
import {useForm} from 'react-hook-form'
import { getUser } from '../utils/constants'
import axios from '../utils/axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate()
    const onSubmit =async(data)=>{
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password) 
        console.log(formData);
        axios.post(getUser,formData).then((res)=>{
            if (res.data.status === 'true'){
                toast.success( res.data.message,{
                    position:toast.POSITION.TOP_CENTER,
                    bodyStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  
                  })
                Cookies.set("jwt",String(res.data.jwt_token))
                Cookies.set("user_id",String(res.data.user_id))
                navigate('/home')
            }
           else{
            toast.error( 'Icorrect username or password',{
                position:toast.POSITION.TOP_CENTER,
                bodyStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              
              })
           }
        })
    }
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
  return (
    <div className='container'  style={{marginTop:'100px'}} >
        <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8 col-sm-10'>
        <h2 className='text-center mt-4 ' style={{color:'blue', fontWeight:'bold'}}>Login</h2>
        <div className='signup-icon'>
          <FaAppStore style={{width:'30px', height:'25px'}}/>
        </div>
        <div className='form-container'>
            <form  onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group mt-4'>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control '  name='email' {...register('email',{required:true})}  />
            </div>
            {errors.email && <p className='text-danger'>Email Required</p> }

            <div className='form-group mt-4' >
                <label htmlFor="password">Enter Password</label>
                <div className='input-with-icon'>
                    <input type='password' className='form-control'  name='password'  {...register('password',{required:true})}  />
                </div>
                {errors.password && <p className='text-danger'>Password Required</p> }
            </div>
           
            <div className='mt-4'>               
                <button  type='submit' className='centered-button'>Login📝</button>
            </div>
            </form>
            </div>
              <label onClick={()=>{navigate('/signup')}} className='user'>Not a User? Register Here.</label>
            </div>
        </div>
    </div>
  )
}

export default Login
