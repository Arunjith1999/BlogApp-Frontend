import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import MyBlogs from './MyBlogs'
import Profile from './Profile'
import AllBlogs from './AllBlogs'
import '../styles/home.css'
import { FaAppStore} from 'react-icons/fa'
import Cookies from 'js-cookie'



const Home = () => {
    
   
    const navigate = useNavigate()
    const [status,setStatus] = useState('')
    console.log(status);
    
    
    const handleClick = (s)=>{
        setStatus(s)
    }
    const handleLogout = ()=>{
          Cookies.remove('jwt')
          Cookies.remove('user_id')
          navigate('/')

    }
    const renderContent = ()=>{
        
            switch (status) {
              case 'blogs':
                return <AllBlogs/>
              case 'myblog':
                return <MyBlogs/>
              case 'profile':
                return <Profile/>
              default:
                return <AllBlogs/>
            }
         
    }
  return (
    <div className='page-wrapper'>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:'cornflowerblue'}}>
        <div className="container-fluid">
           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <FaAppStore style={{width:'30px', height:'25px', color:'white', marginTop:'10px'}}/>
                <Link className="nav-link active ms-5" style={{color:'white', fontWeight:'bold'}} onClick={()=>handleClick('blogs')} >Blogs</Link>
                <Link className="nav-link ms-5" style={{color:'white', fontWeight:'bold'}} aria-current="page" onClick={()=>handleClick('myblog')}>My Blogs</Link>
                <Link className="nav-link ms-5" style={{color:'white', fontWeight:'bold'}} onClick={()=>handleClick('profile')}>Profile</Link>
                {/* <a className="nav-link ms-5" tabindex="-1" aria-disabled="true">Logout <FontAwesomeIcon icon={faLock}  /></a> */}
            </div>
            <div className="navbar-nav ms-auto">
              <a className="nav-link ms-5" style={{color:'white', fontWeight:'bold'}} tabIndex="-1" aria-disabled="true" onClick={handleLogout}>
                Logout 
              </a>
            </div>
            </div>
        </div>
      </nav>
                       


{renderContent()}
      
    </div>
  )
}

export default Home
