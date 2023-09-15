import React, { useEffect, useState } from 'react'
import '../styles/allblogs.css'
import { FaSave } from 'react-icons/fa'
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from '../utils/axios'
import { getBlogs, getComment, postBlog } from '../utils/constants'
import Cookies from 'js-cookie'
import ReactPaginate from 'react-paginate'
import ViewModal from '../components/Modals/ViewModal'

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPopUps, setViewPopUps] = useState({})
  const [allComments, viewAllComments] = useState([])
  const blogsPerPage = 2; 
  
  useEffect(()=>{
    refresh_page()
  },[])
  const refresh_page = ()=>{
    axios.get(getBlogs).then((res)=>{
      console.log(res.data);
      setBlogs(res.data)
    })
  }
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  const toggleViewPopUp = (blogId) => {
    setViewPopUps((prevViewPopUps) => ({
      ...prevViewPopUps,
      [blogId]: !prevViewPopUps[blogId],
    }));
  };
  const id = Cookies.get('user_id')
    const onSubmit = async(data)=>{
      if (data.content.length < 50){
        toast.error('content must be atleast 50 words',{
          position:toast.POSITION.TOP_CENTER,
          bodyStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        
        })
      }else{

        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('content',data.content)
        console.log(formData);
        console.log(id);
        axios.post(`${postBlog}${id}`, formData).then((res)=>{
          console.log(res.data);
          if (res.data == 'Success'){
            toast.success( 'New Blog Added ✅' ,{
              position:toast.POSITION.TOP_CENTER,
              bodyStyle: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            
            })
          }
          reset()
          refresh_page()
        })
    }
      }
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const popUpHandler = (id)=>{
      toggleViewPopUp(id)
      axios.get(`${getComment}${id}`).then((res)=>{
        console.log(res.data);
        viewAllComments(res.data)
      })
    }
  return (
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-lg-5 col-md-5 col-sm-12'  style={{marginTop:'55px'}}>        
            <form onSubmit={handleSubmit(onSubmit)}>
           <div className='blog-input-box' style={{ boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderRadius:'10px'}}>
            <input type="text" name ='title' placeholder='                                               Enter Your Title..' {...register('title',{required:true})}/>
            {errors.title && <p className='text-danger'>Title Required</p> } 
            <textarea name="" id="" cols="30" rows="15" placeholder='Start writing.........✍️' {...register('content',{required:true})}></textarea>
            {errors.content && <p className='text-danger'>Content Required</p> } 
            </div>      
            <div className='d-flex justify-content-center'>
            <button className='blog-save-btn' type='submit'>Save <FaSave/></button>
          </div>
            </form>
        </div>
        <div className='col-lg-7 col-md-7 col-sm-12' style={{marginTop:'55px'}}>
          {blogs.length === 0 ? (
            <h1 className='d-flex justify-content-center' style={{fontWeight:'bold', color:'cornflowerblue'}}>No Blogs</h1>
          ):(
            <>
             {currentBlogs.map((b)=>( 
              <div className='all-blogs' style={{ boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)'}}>
                 <div className='d-flex justify-content-center'>
                <span style={{color:'blue', fontWeight:'bold'}}>Blog Created on :</span> {new Date( b.created_at).toLocaleDateString()}
                 </div>
                 <img style={{width:'100px'}} src={`http://localhost:8000${b.user_image}`} alt="image" />
                 <label htmlFor="" style={{color:'blue'}}>{b.username}</label>
                 <div className='d-flex justify-content-center' >
                    <h2 style={{  textDecoration: 'underline', color: 'blue' }}>{b.title}</h2>
                 </div>
                 <button className='view-btn' onClick={()=>popUpHandler(b.id)}>View Blog</button>
              <ViewModal
              viewPopUp ={viewPopUps[b.id]}
              setViewPopUp={()=> toggleViewPopUp(b.id)}
              title = {b.title}
              content = {b.content}
              author ={b.username}
              id = {b.id}
              allComments = {allComments}
              />
              </div>
             ))}
          </>
          )}
          <div className='pagination'>
                <ReactPaginate
                  pageCount={Math.ceil(blogs.length / blogsPerPage)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  // pageClassName={'pagination-page'}
                  activeClassName="active"
                  previousClassName="previous"
                  nextClassName="next"
                />
          </div>
        </div>
        </div>
      
    </div>
  )
}

export default AllBlogs
