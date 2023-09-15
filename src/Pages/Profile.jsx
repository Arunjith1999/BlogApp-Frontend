import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { getMyBlogs, getUser, getUserDetails } from '../utils/constants'
import Cookies from 'js-cookie'

const Profile = () => {
  const id = Cookies.get('user_id')
  const [userDetails, setuserDetails] = useState({})
  const [blogCount, setBlogCount] = useState('') 
  useEffect(()=>{
    refresh()
    count()
  }, [])
  const refresh = ()=>{
    axios.get(`${getUserDetails}${id}/`).then((res)=>{
           console.log(res.data);
           setuserDetails(res.data)
    })
  }
  const count =()=>{
    axios.get(`${getMyBlogs}${id}`).then((res)=>{
      setBlogCount(res.data.count)
    })
  }
  
  return (
    <section class="h-100 gradient-custom-2">
      
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card">
          <div class="rounded-top text-white d-flex flex-row" style={{backgroundColor: '#000', height:'200px'}}>
            <div class="ms-4 mt-5 d-flex flex-column" style={{width: '150px'}}>
              <img src={`http://localhost:8000${userDetails.image}`} 
                alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                style={{width:'150px', zIndex:1}}/>
              {/* <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                style={{zIndex: 1}}>
                Edit profile Pic
              </button> */}
            </div>
            <div class="ms-3" style={{marginTop:'130px'}}>
              <h5>{userDetails.username}</h5>
              <p>{userDetails.email}</p>
            </div>
          </div>
          <div class="p-4 text-black" style={{backgroundColor: '#f8f9fa'}}>
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5">{blogCount}</p>
                <p class="small text-muted mb-0">Blogs</p>
              </div>
              <div class="px-3">
                <p class="mb-1 h5">0</p>
                <p class="small text-muted mb-0">Followers</p>
              </div>
              <div>
                <p class="mb-1 h5">0</p>
                <p class="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div class="card-body p-4 text-black">
            <div class="mb-5">
              <p class="lead fw-normal mb-1">About</p>
              <div class="p-4" style={{backgroundColor:'#f8f9fa'}}>
                <p class="font-italic mb-1">Web Developer</p>
                {/* <p class="font-italic mb-1">Lives in New York</p> */}
                <p class="font-italic mb-0">Photographer</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Profile
