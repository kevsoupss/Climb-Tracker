import React from 'react'
import { FaStar } from 'react-icons/fa'

import {MdCreate, MdDelete} from 'react-icons/md'
const ClimbCard = ({
    title, 
    date, 
    desc, 
    vlevel, 
    link,
    isStarred, 
    color, 
    onEdit,
    onStar, 
    onDelete}) => {
  return (
    <div className="border rounded p-4 bg-white hover:showdow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sl font-medium">{vlevel} - {title}</h6>
                
            </div>
            <FaStar className={` icon-btn ${isStarred ? 'text-primary' : 'text-slate-200'}`} onClick={onStar}/>
        </div>
        <span className="text-xs text-slate-500">{date}</span> 
        <div className="flex items-center justify-center mt-3">
            <iframe src={link} title="Youtube video" allowFullScreen></iframe>
        </div>
        
      

      <div className="flex items-center justify-between mt-2">
        <p className="text-xm text-slate-600 mt-2">{desc?.slice(0,60)}</p>
        <div className="flex items-center gap-2">
            <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
            <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
        </div>
        </div>
      
    </div>
  )
}

export default ClimbCard
