import React from 'react'
import {throwError} from "../../utils/generalHelpers";
import Iframe from "react-iframe";
import {Button, Grid, Header, Icon} from "semantic-ui-react";
import Parser from "html-react-parser";

const ImageModule = (props) =>{
    console.log(props.collection)
    if(props.collection.length < 0){
        throwError.module(`ImageModule not rendered, type: ${props.moduleName} not found`);
        return null;
    }
    return props.collection.map((image) => {
        return (
            <>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h3' dividing>
                            {image.name}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                            {Parser(image.description)}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                <Button className={'button-external'} as={'a'} href={image.img_url} target={'_blank'}>
                    <span>External site &nbsp;</span> <Icon name='external alternate' />
                </Button>
                    </Grid.Column>
                </Grid.Row>
            <Iframe url={image.img_url}
                    allow={"fullscreen"}
                    scrolling="no"
                    className="iframe"
                    display="initial"
                    position="relative"
            />
            </>
        )
    })
};

export default ImageModule