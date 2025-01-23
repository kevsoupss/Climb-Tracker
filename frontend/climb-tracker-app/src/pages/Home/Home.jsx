import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ClimbCard from '../../components/Cards/ClimbCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">

        <ClimbCard /> 
      </div>
    </>
  )
}

export default Home
