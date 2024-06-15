import React, { useState, useEffect } from 'react';
import './SortFilterBtn.css'

function SortFilterBtn({ movieList }) {
    const [selectedSort, setSelectedSort] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("")
    
    const handleSort = (event) => {
        setSelectedSort(event.target.value)
    }

    const handleFilter = (event) => {
        setSelectedFilter(event.target.value)
    }

    return (
        <div class="sort-filter">
            <select value={selectedSort} onChange={handleSort} className="sort-btn">
            <option value=""  className='sort-option'>Sort Movies:</option>
                <option value="Title: A-Z" onClick={handleAlpha}>Title: A-Z</option> 
                <option value="Rating">Rating</option> 
                <option value="Runtime">Runtime</option> 
            </select>
            {/* <button className="filter-btn">Filter</button> */}
            <select value={selectedFilter} onChange={handleFilter} className="filter-btn">
            <option value="" >Filter by Vote Average:</option>
                <option value="<2">{`<`}2</option> 
                <option value="2-3">2-3</option> 
                <option value="3-4">3-4</option> 
                <option value="4-5">4-5</option> 
                <option value="5-6">5-6</option> 
                <option value="6-7">6-7</option> 
                <option value="7-8">7-8</option> 
                <option value="8-9">8-9</option> 
                <option value=">9">{`>`}9</option> 
            </select>
        </div>
    )
}

export default SortFilterBtn