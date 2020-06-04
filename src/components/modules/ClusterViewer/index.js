import React, {Component} from 'react'
import {Button, Dimmer, Form, Grid, Image, Input, Loader, Search, Segment} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'


const initialState = {isLoading: false, value: '', selected: false, selectedGene: null, graphSetting: 'all'}

class ClusterViewer extends Component {

    state = initialState;

    createGeneDataPoints = () => {
        const trace = {
            x: _.map(this.props.modulesData.cellsByGene.cells, 'tsne_1'),
            y: _.map(this.props.modulesData.cellsByGene.cells, 'tsne_2'),
            text: _.map(this.props.modulesData.cellsByGene.cells, 'cluster_id'),
            customdata: _.map(this.props.modulesData.cellsByGene.cells, 'CPM'),
            mode: 'markers',
            type: 'scattergl',
            marker: {
                color: _.map(this.props.modulesData.cellsByGene.cells, 'CPM'),
                colorbar: {
                    title: "CPM",
                    thicknessmode: "fraction",
                    lenmode: "fraction",
                    len: 0.5,
                    thickness: 0.01
                }
            },
            hovertemplate: "<b>Cell-type cluster %{text}</b><br><br> CPM:  %{customdata} <extra></extra>",
            opacity: 0.5,
        }
        return [trace]
    }
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
    renderGenePlot = () => {
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
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field>
                                <label>Visualize expression using the gene symbol</label>
                                <Search
                                    loading={isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                        leading: true,
                                    })}
                                    results={this.props.modulesData.geneSuggestions}
                                    value={value}
                                    {...this.props}
                                />
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={16} textAlign={"center"}>
                        {this.renderPlotMenu()}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {this.renderGenePlot()}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
            </>
        )
    }
}

export default ClusterViewer
