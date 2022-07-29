import React from "react";

import './FilterCheckbox.css'

function FilterCheckbox() {
    return (
        <label className="filter-checkbox">
            <input className="filter-checkbox__invisible-checkbox" type="checkbox" />
            <div className="filter-checkbox__visible-checkbox">
                <div className="filter-checkbox__toggle"></div>
            </div>
            <span className="filter-checkbox__title">Короткометражки </span>
        </label >

    )
}

export default FilterCheckbox;