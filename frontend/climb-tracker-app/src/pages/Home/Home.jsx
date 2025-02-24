import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ClimbCard from '../../components/Cards/ClimbCard'
import AddEditClimbs from './AddEditClimbs'
import {format, formatISO} from "date-fns"
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'
import { useNavigate} from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type:"add",
    data:null
  })

  const [userInfo, setUserInfo] = useState(null)
  const [allClimbs, setAllClimbs] = useState(null)

  const [isSearch, setIsSearch] = useState(false)

  const navigate = useNavigate()

  const handleEdit = (climbDetails) => {
    setOpenAddEditModal({isShown: true, data: climbDetails, type: "edit"})
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user")
      
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        localStorage.clear()
        navigate("/login")
      }
    }
  }

  const getAllClimbs = async () => {
    try {
      const response = await axiosInstance.get("/get-all-climbs")

      if (response.data && response.data.climb) {
  
        setAllClimbs(response.data.climb)
      }
    } catch( error) {
      console.log("An unexpected error occured. Please try again.")
    }
  }

  const deleteClimb = async (data) => {
    const climbId = data._id
    try {
      const response = await axiosInstance.delete("/delete-climb/" + climbId)
      if (response.data && !response.data.error) {
        getAllClimbs()
      }
    } catch( error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Unexpected error occured.")
      }
    }
  }

  const onSearchClimb = async(query) => {
    try {
      const response = await axiosInstance.get("/search-climb", {
        params: {query}
      })
      
      if (response.data && response.data.climb) {
        setIsSearch(true);
        setAllClimbs(response.data.climb)
      }
    } catch( error) {
      console.log(error)
    }
  }

  const updateIsStarred = async(climbdata) => {
    const climbId = climbdata._id
    try {
      const response = await axiosInstance.put("/update-climb-starred/" + climbId, {
        "isStarred": !climbdata.isStarred
      })

      if (response.data && response.data.climb) {
        getAllClimbs()
      } 
    } catch( error) {
      console.log(error)
    }

  }

  const handleClearSearch = () =>{
    setIsSearch(false)
    getAllClimbs()
  }

  useEffect(() => {
    getAllClimbs()
    getUserInfo()
    return () => {

    }
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} login={true} onSearchClimb={onSearchClimb} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          { allClimbs?.map((item, index) => {
            console.log("?") 
            return (
            <ClimbCard 
              key={item._id}
              title={item.title}
              date={format(item.createdOn, 'do MMM yyyy')}
              desc={item.desc}
              vlevel={item.vlevel}
              link={item.link}
              isStarred={item.isStarred}
              onEdit={()=>handleEdit(item)}
              onStar={()=>updateIsStarred(item)}
              onDelete={()=>deleteClimb(item)}

            /> 
            )           
          }) || []}
 
          
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null})
      }}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 ">

      <AddEditClimbs 
        type={openAddEditModal.type}
        climbData = {openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({ isShown: false, type:"add", data:null} )
        }}
        getAllClimbs={getAllClimbs}
        />
        
      </ Modal>
      </>
  )
}

export default Home
