import React, { useState, useEffect } from 'react'

function FilterDropdown({ title, id, setValue, categories, placeHolder }) {
    const [currentGenre, setCurrentGenre] = useState(placeHolder);

    useEffect(() => {
        setCurrentGenre(placeHolder)
    }, [placeHolder]);

    const changeGenre = (catId, name) => {
        setValue(catId)
        setCurrentGenre(name)
    }
    return (
        <>
            <div className="filter__item" id={id}>
                <span className="filter__item-label">{title}: <span className="text-warning">{currentGenre}</span> </span>
                <div className="filter__item-btn " role="navigation" id="filter-genre" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {currentGenre}
                        </button>
                        <ul className="dropdown-menu">
                            {categories.map((cat,index) => (
                                <li key={index} onClick={() => changeGenre(cat.id, cat.name)}><a className="dropdown-item" href="#">{cat.name}</a></li>
                            ))}
                        </ul>
                    </div>

                    <span />
                </div>
            </div>
        </>
    )
}

export default FilterDropdown