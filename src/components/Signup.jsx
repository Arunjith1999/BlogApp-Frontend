import React, { useEffect, useState } from 'react'
import { FaAppStore,FaEye,FaEyeSlash } from 'react-icons/fa'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../styles/signup.css'
import axios from '../utils/axios'
// import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getPassword, postUser } from '../utils/constants'

const Signup = () => {
 
  const [type, setType] = useState('password')
  const[password, setPassword] = useState('')
  const token = Cookies.get('jwt')
  useEffect(()=>{
    if (token){
      navigate('/home')
    }
      
  },[])
  
  
  const navigate = useNavigate()
  const onSubmit = async(data)=>{
        if (password === '' ){
            toast.error('Enter Password',{
                position:toast.POSITION.TOP_CENTER,
                bodyStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              
              })
        }
        if (password.length < 5 && password.length !== 0){
            toast.error('Password too small',{
                position:toast.POSITION.TOP_CENTER,
                bodyStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              
              })
        }
        else{
         
          const formData = new FormData();
          formData.append('username',data.username)
          formData.append('email',data.email)
          formData.append('password',password)
          console.log(formData);
          axios.post(postUser,formData).then((res)=>{
            console.log(res.data);
            if (res.data.error){
                toast.error( res.data.error ,{
                    position:toast.POSITION.TOP_CENTER,
                    bodyStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  
                  })
            }
            else{
                toast.success( 'User Created Successfully✅' ,{
                    position:toast.POSITION.TOP_CENTER,
                    bodyStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  
                  })
                  
                  navigate('/')
            }
           
          })
        }


  }
  const inputPassword = (e)=>{
    setPassword(e.target.value)
  }
  const passwordHandler = ()=>{
    if (type === 'text'){
      setType('password')
    }
    else{
      setType('text')
    }
  }
  const suggestionHandler = () =>{
    axios.get(getPassword).then((res)=>{
      setPassword(res.data.password)
      
    })
  }
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
  return (
    <div className='container' style={{marginTop:'100px'}} >
        <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8 col-sm-10'>
        <h2 className='text-center mt-4 ' style={{color:'blue', fontWeight:'bold'}}>Register Your Account</h2>
        <div className='signup-icon'>
          <FaAppStore style={{width:'30px', height:'25px'}}/>
        </div>
        <div className='form-container'>
            <form  onSubmit={handleSubmit(onSubmit)}>
           

            <div className='form-group mt-4'>
                <label htmlFor="username">Username</label>
                <input type="text" className='form-control'  name='username' {...register('username',{required:true})}  />
           
            </div>
            {errors.username && <p className='text-danger'>Username Required</p> } 

            <div className='form-group mt-4'>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control '  name='email' {...register('email',{required:true})}  />
            </div>
            {errors.email && <p className='text-danger'>Email Required</p> }

            <div className='form-group mt-4' >
                <label htmlFor="password">Enter Password</label>
                <div className='input-with-icon'>

                    <input type={type} className='form-control'  name='password' onChange={inputPassword} value={password}  />
                    <span  onClick={passwordHandler} style={{ zIndex: 1 }}>
                        {type === 'password' ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
           
           
            <label style={{fontSize:'10px'}} onClick={suggestionHandler} className='suggestion'>Suggest a Strong Password</label>
            </div>
           
            <div className='mt-4'>               
                <button  type='submit' className='centered-button'>Register</button>
            </div>
            </form>
            </div>
              <label onClick={()=>{navigate('/')}} className='user'>Already a user? Login Here.</label>
            </div>
        </div>
    </div>
  )
}

export default Signup
