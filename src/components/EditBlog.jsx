import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import {useForm} from 'react-hook-form'
import { patchBlog } from '../utils/constants'
import axios from '../utils/axios' 
import { toast } from 'react-toastify'


const EditBlog = (props) => {
    const {id, title, content, setViewPopUp, refresh} = props
  
    
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const onSubmit = async(data)=>{
         const formData = new FormData()
         formData.append('title',data.title)
         formData.append('content', data.content)
         axios.patch(`${patchBlog}${id}`,formData).then((res)=>{
            console.log(res.data);
            if (res.data.status == 'Success'){
                toast.success( 'Blog Updated  ✅' ,{
                  position:toast.POSITION.TOP_CENTER,
                  bodyStyle: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                
                })
                refresh()
                setViewPopUp(false)
              }
         })
    }
  return (
    <div>
        <div className='col-lg-12 col-md-12 col-sm-12'  style={{marginTop:'55px'}}>        
            <form onSubmit={handleSubmit(onSubmit)}>
           <div className='blog-input-box' style={{ boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderRadius:'10px'}}>
            <input type="text" name ='title' defaultValue={title} {...register('title',{required:true})}/>
            {errors.title && <p className='text-danger'>Title Required</p> } 
            <textarea name="" id="" cols="30" rows="12" defaultValue={content}
         
           {...register('content',{required:true})}></textarea>
            {errors.content && <p className='text-danger'>Content Required</p> } 
            </div>       
            <div className='d-flex justify-content-center'>
            <button  style={{padding:'5px', border:'none',borderRadius:'5px', backgroundColor:'cornflowerblue', color:'white'}} type='submit'>Update <FaSave/></button>
          </div>
            </form>
        </div>
    </div>
  )
}

export default EditBlog
