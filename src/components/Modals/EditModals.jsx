import React from 'react'
import { Dialog,DialogTitle,Typography,DialogContent } from '@mui/material'

const EditModals = (props) => {
  const{viewPopUp, setViewPopUp, children, title, content, id} = props
  return (
    <Dialog open ={viewPopUp} maxWidth style={{marginTop:'8rem'}}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <Typography 
                 component='div'
                 style={{textAlign:'center',flexGrow:'1',fontSize:'20px',fontWeight:'700'}}
                >
                    {title}
                </Typography>
                <button className='close-btn' onClick={()=>{setViewPopUp(false)}}>X</button>
            </div>
        </DialogTitle>
        <DialogContent dividers >
    <div>{children}</div>
    </DialogContent>
    </Dialog>
  )
}

export default EditModals
