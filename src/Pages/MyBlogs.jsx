import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { deleteBlog, getComment, getMyBlogs } from '../utils/constants'
import '../styles/myblogs.css'
import Swal from 'sweetalert2'
import ViewModal from '../components/Modals/ViewModal'
import EditModals from '../components/Modals/EditModals'
import EditBlog from '../components/EditBlog'
import { toast } from 'react-toastify'
import Profile from './Profile'


const MyBlogs = () => {
  const [myblog, setMyBlog] = useState([])
  
  const [viewPopUps, setViewPopUps] = useState({})
  const [editPopUps, setEditPopUps] = useState({})
  const [allComments, viewAllComments] = useState([])
  const [showDeleteSwal, setShowDeleteSwal] = useState(false);
  const id = Cookies.get('user_id')
  useEffect(()=>{
    refresh()
  },[id])
  const refresh=()=>{
    axios.get(`${getMyBlogs}${id}`).then((res)=>{
      setMyBlog(res.data.blogs)
    })
  }
  const toggleViewPopUp = (blogId) => {
    setViewPopUps((prevViewPopUps) => ({
      ...prevViewPopUps,
      [blogId]: !prevViewPopUps[blogId],
    }));
  };
  const toggleEditPopUp = (blogId) =>{
    setEditPopUps((prevEditPopUps) =>({
      ...prevEditPopUps,
      [blogId]: !prevEditPopUps[blogId],
    }))
  }
  const viewPopUpHandler = (id)=>{
    toggleViewPopUp(id)
    axios.get(`${getComment}${id}`).then((res)=>{
      console.log(res.data);
      viewAllComments(res.data)
    })
  }
  const editPopUpHandler = (id)=>{
    toggleEditPopUp(id)
  }
  const deleteHandler = (id)=>{
        setShowDeleteSwal(true);
        {showDeleteSwal && (
          Swal.fire({
            title : 'Are You Sure',
            text : 'You will not able to recover this blog',
            icon: 'warning',
            showCancelButton:true,
            confirmButtonText : 'Yes, Delete it!',
            cancelButtonText : 'Cancel'
          }).then((res)=>{
            if(res.isConfirmed){
              axios.delete(`${deleteBlog}${id}`).then((res)=>{  
                if (res.data == 'Success'){
                  toast.success( 'Blog Deleted ✅' ,{
                    position:toast.POSITION.TOP_CENTER,
                    bodyStyle: {
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  
                  })
                }
                refresh()
                setShowDeleteSwal(false);
              })
            }else{
              setShowDeleteSwal(false)
            }
          })
        )}
  }
   
  return (
    <>
      <div className='container-fluid'>
      <div className=' d-flex flex-wrap justify-content-center' style={{marginTop:'55px'}}>
          {myblog.length === 0 ? (
            <h1 className=' d-flex justify-content-center' style={{fontWeight:'bold', color:'cornflowerblue'}}>No Blogs</h1>
          ):(
            <>
             {myblog.map((b)=>( 
              <div className='all-blogs' style={{ boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)'}}>
                 <div className='d-flex justify-content-center'>
                <span style={{color:'blue', fontWeight:'bold'}}>Blog Created on :</span> {new Date( b.created_at).toLocaleDateString()}
                 </div>
                 <img style={{width:'100px'}} src={`http://localhost:8000${b.user_image}`} alt="image" />
                 <label htmlFor="" style={{color:'blue'}}>{b.username}</label>
                 <div className='d-flex justify-content-center' >
                    <h2 style={{  textDecoration: 'underline', color: 'blue' }}>{b.title}</h2>
                 </div>
                 <div className='d-flex justify-content-center'>
              <button className='view-my-blog' onClick={()=>viewPopUpHandler(b.id)} >View Blog</button>
              <button className='edit-my-blog' onClick={()=>editPopUpHandler(b.id)} style={{ marginLeft: '10px' }}>Edit Blog</button>
              <button className='delete-my-blog'onClick={()=>deleteHandler(b.id)} style={{ marginLeft: '10px' }}>Delete Blog</button>
            </div>
              <ViewModal
              viewPopUp ={viewPopUps[b.id]}
              setViewPopUp={()=> toggleViewPopUp(b.id)}
              title = {b.title}
              content = {b.content}
              author ={b.username}
              id = {b.id}
              allComments = {allComments}
              />
              <EditModals
              viewPopUp = {editPopUps[b.id]}
              setViewPopUp={()=> toggleEditPopUp(b.id)}
             
              id = {b.id}
              >
               <EditBlog id = {b.id}
                title = {b.title}
                content = {b.content} 
                refresh = {refresh}
                setViewPopUp={()=> toggleEditPopUp(b.id)}
               />
              </EditModals>
              </div>
             ))}
          </>
          )}
          <div className='pagination'>
                {/* <ReactPaginate
                  pageCount={Math.ceil(blogs.length / blogsPerPage)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  // pageClassName={'pagination-page'}
                  activeClassName="active"
                  previousClassName="previous"
                  nextClassName="next"
                /> */}
          </div>
        </div>
        </div>

        </>
  )
}

export default MyBlogs
