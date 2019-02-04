import React from "react"

const ColourDropDown = props => (
    <div>
    <select name="colour" value={props.colour} onChange={props.handleColourChange}>
    <option value="None">Select a colour</option>
    {props.availableColours.map(colour => (
        <option key={colour._id}>{colour.colour}</option>
    ))}
    </select>
    </div>
)

export default ColourDropDown