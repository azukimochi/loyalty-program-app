import React from "react"

const ColourDropDown = props => (
    <div id="colourDropDown">
        <span className="subHeaderP">Colour: </span>
    <select name="colour" value={props.colour} onChange={props.handleDropDownChange}>
    {props.availableColours.map(colour => (
        <option key={colour._id}>{colour.colour}</option>
    ))}
    </select>
    </div>
)

export default ColourDropDown