import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ClimbCard from '../../components/Cards/ClimbCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">

        <ClimbCard 
          title="My Hardest Climb" 
          date="22nd Jan 2025" 
          desc="extremely difficult climb, many slopers"
          vlevel="V4"
          link="https://www.youtube.com/embed/ooFQ4OMFdSI"
          isStarred={true}
          onEdit={()=>{}}
          onStar={()=>{}}
          onDelete={()=>{}}

        /> 
      </div>
    </>
  )
}

export default Home
