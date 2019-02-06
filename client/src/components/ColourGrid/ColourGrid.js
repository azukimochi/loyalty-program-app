import React from "react"
import { Grid } from "semantic-ui-react"

const ColourGrid = props => {
    return (
        <div>
            <Grid id="colourGrid" columns={6} padded>
                {props.availableColours.map(colour => (
                    <Grid.Column textAlign="center" color={colour.colour.toLowerCase()} key={colour._id}>
                        <div id="colourDiv" onClick={() => props.setColour(colour.colour)}>{colour.colour}</div>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}

export default ColourGrid