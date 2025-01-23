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
                <h6 className="text-sm font-medium">{vlevel} - {title}</h6>
                <span className="text-xs text-slate-500">{date}</span> 
            </div>
            <FaStar className={`icon-btn ${isStarred ? 'text-primary' : 'text-slate-200'}`} onClick={onStar}/>
        </div>
      <iframe src={link} title="Youtube video" allowFullScreen></iframe>
      <p className="text-xs text-slate-600 mt-2">{desc?.slice(0,60)}</p>

      
        <div className="flex items-center gap-2">
            <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
            <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete} />
        </div>
      
    </div>
  )
}

export default ClimbCard
