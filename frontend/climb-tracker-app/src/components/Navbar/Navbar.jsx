import React, {useState} from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  //const [isLogin, setIsLogin] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const onLogout = () => {
    navigate("/login")
    setIsLogin(false)
  }

  const handleSearch = () => {

  }

  const onClearSearch = () => {
    setSearchQuery("")
  }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Climb Tracker</h2>


        <SearchBar 
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value)
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          /> 
    
        <ProfileInfo onLogout={onLogout}/> 
    
    </div>
  )
}

export default Navbar
