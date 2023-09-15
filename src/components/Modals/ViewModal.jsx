import React, { useEffect, useState } from 'react'
import { Dialog,DialogTitle,Typography,DialogContent } from '@mui/material'
import {FaArrowRight} from 'react-icons/fa'
import axios from '../../utils/axios'
import  '../../styles/modals.css'
import { getComment, getcomment, postComment } from '../../utils/constants'
import Cookies from 'js-cookie'

const MAX_CONTENT_LENGTH = 200;


const ViewModal = (props) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const [viewComments, setViewComments] = useState(false)
    const [comment, setComment]  =useState('')
    
    const{viewPopUp, setViewPopUp, content, title, author, id, allComments} = props
    console.log(allComments);
    const user_id = Cookies.get('user_id')
    
    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
      }; 
   
    const commentHandler =(e)=>{ 
          setComment(e.target.value)
    }
  
    const submitHandler =(event)=>{
        event.preventDefault();
        const formData = new FormData() 
        formData.append('comment',comment)
        axios.post(`${postComment}${id}/${user_id}`,formData).then((res)=>{
            setComment('')
        })
    }
      const truncatedContent = isTruncated
        ? content.slice(0, MAX_CONTENT_LENGTH)
        : content;

    

    return (
        <Dialog open ={viewPopUp}  >
            <DialogTitle>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className='author'>✍️{author}</div>
                    
                        <div  className='blog-title'>{title}</div>
                        
                    
                    <button className='close-btn' onClick={()=>{setViewPopUp(false)}}>X</button>
                </div>
            </DialogTitle>
            <DialogContent dividers >
        <div>{truncatedContent}
          {content.length > MAX_CONTENT_LENGTH && (
            <button className='read-more-btn' onClick={toggleTruncate}>
              {isTruncated ? <span style={{color:'red'}}>  Read More....</span> : <span style={{color:'red'}}>  ...Read Less</span>}
            </button>
          )}
          </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" onChange={commentHandler} className='comment-field' value={comment} placeholder='Enter your comment...' />
        {comment.length === 0 ?(
        <span  style={{ color: 'grey', zIndex: 1, marginLeft: '-25px' }}>
          <FaArrowRight />
        </span>
        ):(
            <span onClick={submitHandler} style={{ color: 'blue', zIndex: 1, marginLeft: '-25px' }}>
            <FaArrowRight />
          </span>
        )}
      </div>
            
            <div className='comments-container'>
            {allComments.length === 0 ? (
  <div className='comment'>
    <span style={{color:'grey'}}>No Comments Yet...</span>
  </div>
) : (
        allComments.map((c, index) => (
            <div key={index} className='comment'>
            <span  style={{color:'grey'}}>{c.content}  ✍️{c.username}</span>
            </div>
        ))
        )}
</div>
        </DialogContent>
        </Dialog>
      )
}

export default ViewModal
