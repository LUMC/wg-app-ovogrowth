import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'

class ClusterViewer extends Component {

    createDataPoints = (data) => {
        console.log(data)
        const plotTraces = [];
        const clusters = _.groupBy(data, 'cluster_id')
        Object.keys(clusters).forEach((key) => {
            let items = _.remove(clusters[key], function (currentObject) {
                return currentObject.count !== "nan";
            });
            const trace = {
                x: _.map(items, 'tsne_1'),
                y: _.map(items, 'tsne_2'),
                mode:'markers',
                type: 'scattergl',
                name: key,
                hovertemplate: '<b>'+key+"</b>",
                opacity: 0.5,
            };
            plotTraces.push(trace)
        });
        return plotTraces
    }
    render() {
        if (this.props.modulesData.cells.length < 1)return null
        return (
            <Grid.Column width={16}>
                <Plot
                    className={'full-size large'}
                    data={this.createDataPoints(this.props.modulesData.cells)}
                    layout={{

                        showlegend: true,
                        height: 600,
                        hovermode: 'closest',
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
