import React, {Component, Suspense} from 'react'
import {Button, Dimmer, Form, Grid, Image, Input, Loader, Search, Segment} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'
import {pageLoader} from "../../hooks/pageLoader";
import GeneExpressionForm from "./modules/GeneExpressionForm";
const GeneralCluser = React.lazy(() => import("./modules/GeneralCluster"));

const initialState = {isLoading: false, value: '', selected: false, selectedGene: null, graphSetting: 'all'}

class ClusterViewer extends Component {

    state = initialState;

    createViolinDataPoints = () => {
        const colors = [
            'grey', 'green', 'blue', 'yellow', 'purple',
            'brown', 'pink', 'orange', 'red', 'dark grey', 'violet', 'salmon',
            'tomato', 'khaki', 'lavender', 'slateblue', 'lime', 'darkcyan'
        ]
        const plotTraces = [];
        const clusters = _.groupBy(this.props.modulesData.cellsByGene.cells, 'cluster_id')
        Object.keys(clusters).forEach((key) => {
            const trace = {
                y: _.map(clusters[key], 'CPM'),
                type: 'violin',
                points: 'none',
                opacity: 0.5,
                meanline: {
                    visible: true
                },
                box: {
                    visible: true
                },
                boxpoints: false,
                line: {
                    color: 'black'
                },
                fillcolor: colors[key],
                x0: "Cluster name"+key

            };
            plotTraces.push(trace)
        });
        return plotTraces
    }
    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title, selected: true, selectedGene: result.id})
        this.props.getCellsByGene(result.id)
    }
    handleSearchChange = (event) => {
        this.props.getGeneSuggestions(event.target.value);
        this.setState({value: event.target.value, selected: false})
    }
    resetSelectedGene = () => {
        this.props.resetCellByGene()
        this.setState({value: '', selectedGene: null, selected: false})
    }
    renderViolinData = (data) => {
        return (
            <>
                <Plot
                    className={'full-size large'}
                    data={data}
                    layout={{
                        height: 600,
                        hovermode: 'closest',
                        yaxis: {
                            zeroline: false,
                        }
                    }}
                />
            </>
        )
    }
    renderGenePlot = () => {
        let  violinDataPlot = null
        if (this.state.selected && _.isEmpty(this.props.modulesData.cellsByGene)) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png'/>
                </Segment>
            )
        }
        let data = {}
        if (!this.state.selected && _.isEmpty(this.props.modulesData.cellsByGene)){
            data = this.createDataPoints()
        }else{
            if(this.props.modulesData.cellsByGene.cells.length < 1)return "No data registered for this gene.";
            data = this.createGeneDataPoints()
            violinDataPlot = this.renderViolinData(this.createViolinDataPoints())
        }
        return (
            <>
                <Plot
                    className={'full-size large'}
                    data={data}
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
                {violinDataPlot}
            </>
        )
    }
    renderPlotMenu = () => {
        if (_.isEmpty(this.props.modulesData.cellsByGene)) return null;
        return <Button onClick={() => this.resetSelectedGene() }>Reset</Button>
    }
    render() {
        if (this.props.modulesData.cells.length < 1) return null
        const {isLoading, value} = this.state;
        return (
            <>
                <Grid.Row centered>
                    <Grid.Column width={16} textAlign={"center"}>
                        {this.renderPlotMenu()}
                    </Grid.Column>
                </Grid.Row>
                <Suspense fallback={pageLoader()}>
                <GeneralCluser
                    modulesData={this.props.modulesData}
                />
                </Suspense>
            </>
        )
    }
}

export default ClusterViewer
