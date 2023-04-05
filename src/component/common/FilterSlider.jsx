import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
function FilterSlider({ title, id, minVal, maxVal, step, range,setRange,currentLngCode='en'}) {

    const log = (value) => {
        setRange(value)
    }

    useEffect(() => {
        setRange([minVal, maxVal])
    }, []);

    return (
        <div className="filter__item" id={id} >
            <span className="filter__item-label pb-1"><span className="text-light">{title}: </span><span className="text-warning">{currentLngCode==='ar'?range[1] + '-' + range[0]:range[0] + '-' + range[1]}</span></span>
            <div className="filter__item-btn" role="navigation" id="filter-genre" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="mt-2" style={{ width: 150 }}>
                    <Slider range step={step} min={minVal} max={maxVal} defaultValue={[minVal, maxVal]} onChange={log} />
                </div>
                <span />
            </div>
        </div>
    )
}

export default FilterSlider