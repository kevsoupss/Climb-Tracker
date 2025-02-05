import React, {useState } from 'react'
import {MdClose } from 'react-icons/md'
import axiosInstance from "../../utils/axiosInstance"


const AddEditClimbs = ({climbData, type, getAllClimbs, onClose}) => {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [vlevel, setVlevel] = useState("")
  const [link, setLink] = useState("")

  const [error, setError] = useState(null)

  const addNewClimb = async () => {
    try {
      const response = await axiosInstance.post("/add-climb", {
        title,
        desc,
        vlevel,
        link
      })

      if (response.data && response.data.climb) {
        getAllClimbs()
        onClose()
      }
    } catch( error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }
    }
  }

  const editClimb = async () => {}
  
  const handleAddClimb = () => {
    if (!title) {
      setError("Please enter a title")
      return
    }
    if (!desc) {
      setError("Please enter a description")
      return
    }
    if (!vlevel) {
      setError("Please select a V level")
      return
    }
    if (!link) {
      setError("Please enter a youtube link")
      return
    }

    setError("")

    if(type === 'edit'){
      editClimb()
    } else {
      addNewClimb()
    }
  }
  const vgrades = [
      { value: 'V0', label: 'V0' },
      { value: 'V1', label: 'V1' },
      { value: 'V2', label: 'V2' },
      { value: 'V3', label: 'V3' },
      { value: 'V4', label: 'V4' },
      { value: 'V5', label: 'V5' },
      { value: 'V6', label: 'V6' },
      { value: 'V7', label: 'V7' },
      { value: 'V8', label: 'V8' },
      { value: 'V9', label: 'V9' },
      { value: 'V10', label: 'V10' },
      { value: 'V11', label: 'V11' },
      { value: 'V12', label: 'V12' },
      { value: 'V13', label: 'V13' },
      { value: 'V14', label: 'V14' },
      { value: 'V15', label: 'V15' },
      { value: 'V16', label: 'V16' },
      { value: 'V17', label: 'V17' }
    ];

  return (
    <div className="relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500" onClick={onClose}>
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input 
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="My First Climb"
            value={title}
            onChange= {({target}) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Easy slab climb"
            rows={5}
            value={desc}
            onChange= {({target}) => setDesc(target.value)}
            
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">V-SCALE</label>
        <select 
          className="py-1 px-2 text-sm border rounded-md"
          value={vlevel}
          onChange={({target}) => setVlevel(target.value)}
        >
          {vgrades.map((vgrade) => (
            <option value={vgrade.value}>
                {vgrade.label}
            </option>
          ))}
        </select>
      </div>
    
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label ">LINK</label>
        <input 
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="ex. https://www.youtube.com/watch?v=ooFQ4OMFdSI"
            value={link}
            onChange= {({target}) => setLink(target.value.replace("watch?v=", "embed/"))}
            
        />
      </div>
    

    {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
    <button 
      className="btn-primary font-medium mt-5 p-3" 
      onClick={handleAddClimb} >
        ADD
    </button>

    </div>
  )
}

export default AddEditClimbs
