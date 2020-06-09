import React from 'react';
import {Grid, Image, Segment} from "semantic-ui-react";
import loadingLogo from '../../assets/img/short-paragraph.png'

const renderSegment = () =>{
    return (
        <Segment loading>
            <Image src={loadingLogo}/>
        </Segment>
    )
}
export default (props) => {
    if (props.frame) return (<Grid.Row>
        <Grid.Column width={16} textAlign={"center"}>
            {renderSegment()}
        </Grid.Column>
    </Grid.Row>)
    return renderSegment()
}