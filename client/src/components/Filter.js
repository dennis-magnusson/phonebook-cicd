import React from 'react'

const Filter = ({ value, handleFilterChange }) => {
    return (
      <div>
        Filter names with
        <input value={value} onChange={handleFilterChange}/>
      </div>
    )
  }

export default Filter