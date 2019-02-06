import React from "react"

const QtyDropDown = props => (
    <div id="qtyDropDown">
    <span className="subHeaderP">Qty: </span>
    <select name="qty" value={props.qty} onChange={props.handleDropDownChange}>
    {props.availableQty.map((qty, index) => (
        <option key={index}>{qty}</option>
    ))}

    </select>
    </div>
)

export default QtyDropDown