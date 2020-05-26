import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist";
import _ from 'lodash'
import Page from "../../Page";

class ClusterViewer extends Component {

    componentDidMount() {
        this.props.getCells()
    }

    createDataPoints = (data) =>{
        console.log(data)
        const plotTraces = [];
        const clusters = _.groupBy(data, 'cluster_id')
        Object.keys(clusters).forEach( (key) => {
            let items = _.remove(clusters[key], function (currentObject) {
                return currentObject.count !== "nan";
            });
            const trace = {
                x: _.map(items, 'tsne_1'),
                y: _.map(items, 'tsne_2'),
                mode: 'markers',
                type: 'scatter',
                name: key,
                opacity: 0.5,
                marker: {
                    size: 20
                }
            };
            plotTraces.push(trace)
        });
        return plotTraces
    }
    render() {
        const Plot = createPlotlyComponent(Plotly);
        if (this.props.modulesData.cells.length < 1)return null
        return (
            <Grid.Column width={16}>
                <Plot
                    className={'full-size large'}
                    data={this.createDataPoints(this.props.modulesData.cells)}
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
