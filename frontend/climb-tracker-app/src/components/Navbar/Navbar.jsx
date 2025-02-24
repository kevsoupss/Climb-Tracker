import React, {useState} from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from "react-router-dom"

const Navbar = ({userInfo, onSearchClimb, handleClearSearch}) => {
  const navigate = useNavigate()
  //const [isLogin, setIsLogin] = useState(props.login)
  const [searchQuery, setSearchQuery] = useState("")

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchClimb(searchQuery)
    }
  }

  const onClearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }
  return (
    <div className="bg-white flex  justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Climb Tracker</h2>

      { userInfo ? <>
        <SearchBar 
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value)
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        /> 
      
       <ProfileInfo userInfo = {userInfo} onLogout={onLogout}/> 
      </>
        
      : null

      }
      
        
    
    </div>
  )
}

export default Navbar
