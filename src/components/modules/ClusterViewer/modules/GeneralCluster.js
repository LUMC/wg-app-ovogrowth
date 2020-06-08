import React, {Component} from 'react'
import {Grid,} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'
import {pageLoader} from "../../../hooks/pageLoader";

const initialState = {isLoading: false, value: '', selected: false, selectedGene: null, graphSetting: 'all'}

class GeneralCluser extends Component {

    state = initialState;

    createDataPoints = () => {
        const plotTraces = [];
        const clusters = _.groupBy(this.props.modulesData.cells, 'cluster_id')
        Object.keys(clusters).forEach((key) => {
            const trace = {
                x: _.map(clusters[key], 'tsne_1'),
                y: _.map(clusters[key], 'tsne_2'),
                mode: 'markers',
                type: 'scattergl',
                name: key,
                text: _.map(clusters[key], 'cluster_id'),
                hovertemplate: "<b>Cell-type cluster %{text}</b> <extra></extra>",
                opacity: 0.5,

            };
            plotTraces.push(trace)
        });
        return plotTraces
    }
    renderGenePlot = () => {
        if (this.state.selected && _.isEmpty(this.props.modulesData.cellsByGene)) return pageLoader()
        return (
            <>
                <Plot
                    className={'full-size large'}
                    data={this.createDataPoints()}
                    layout={{
                        height: 600,
                        hovermode: 'closest',
                        yaxis: {
                            title: "test",
                            showgrid: false,
                            zeroline: false,
                        },
                        xaxis: {
                            title: "test",
                            showgrid: false,
                            zeroline: false,
                        }
                    }}
                />
            </>
        )
    }
    render() {
        if (this.props.modulesData.cells.length < 1) return pageLoader()
        return (
            <>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {this.renderGenePlot()}
                    </Grid.Column>
                </Grid.Row>
            </>
        )
    }
}

export default GeneralCluser
