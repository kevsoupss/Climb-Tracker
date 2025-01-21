import React from 'react'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input 
        type="text"
        placeholder="Search climbs"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
