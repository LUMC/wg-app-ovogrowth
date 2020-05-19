import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Plot from 'react-plotly.js'

class ClusterViewer extends Component {

    generateFakeData = (n) =>{
        const y = []
        const x = []
        for(let i=0; i < n; i++){
            y.push(Math.floor(Math.random() * 1000000)+1)
            x.push(Math.floor(Math.random() * 1000000)+1)
        }
        console.log(x)
        return {
            x: x,
            y: y,
            mode: 'markers',
            type: 'scatter',
            opacity: 0.5,
            marker: {
                size: 2
            }
        };
    }
    render() {
        return (
            <Grid.Column width={16}>
                <Plot
                    className={'full-size large'}
                    data={[this.generateFakeData(10000)]}
                    layout={{
                        showlegend: true,
                        height: 600, hovermode: 'closest',
                        yaxis:{
                            title: "test"
                        },
                        xaxis:{
                            title: "test"
                        }
                    }}
                />
            </Grid.Column>
        )
    }
}

export default ClusterViewer
