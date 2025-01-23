import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ClimbCard from '../../components/Cards/ClimbCard'
import AddEditClimbs from './AddEditClimbs'
import { MdAdd } from 'react-icons/md'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
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
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <MdAdd className="text-[32px] text-white"/>
      </button>

      <AddEditClimbs />
      </>
  )
}

export default Home
