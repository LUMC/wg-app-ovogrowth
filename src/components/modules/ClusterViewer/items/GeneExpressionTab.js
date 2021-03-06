import React, {Component} from 'react'
import {Dimmer, Form, Grid, Header, Image, Loader, Search, Segment, Tab} from 'semantic-ui-react'
import _ from 'lodash'
import Plot from "react-plotly.js";
import PageLoader from "../../../hooks/pageLoader";

const initialState = {activeGene:'', clusters:{}}

class GeneExpressionForm extends Component {

    state = initialState;

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(_.isEmpty(this.props.modulesData.cellsByGene)) return true
        return (nextState.activeGene !== this.state.activeGene)
    }


    renderPlotHeader = (plotType, extra ='') =>{
        const {activeGene} = this.props.modulesData
        return (
            <Header as='h4' icon textAlign='center'>
                <Header.Content>{plotType} plot - {extra} expression of gene: {activeGene}</Header.Content>
            </Header>
        )
    }
    renderViolinPlot = () => {
        return (
            <>
                {this.renderPlotHeader('Violin', 'Top 500 cells per cluster: ')}
                <Plot
                    className={'full-size large'}
                    data={this.createViolinDataPoints()}
                    layout={{
                        height: 600,
                        hovermode: 'closest',
                        yaxis: {
                            range: [0, 6],
                            zeroline: false,
                            title:{
                                text: this.props.dataset_scale
                            }
                        },
                        xaxis: {
                            showline: true,
                            zeroline: true,
                            font:{
                                size : 10
                            }
                        }
                    }}
                />
            </>
        )
    }
    createViolinDataPoints = () => {
        if (this.props.modulesData.cellsByGene.cells.length < 1)return "No data registered for this gene.";
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
                name: this.props.annotation[key].description,
                type: 'violin',
                opacity: 0.5,
                meanline: {
                    visible: true
                },
                box: {
                    visible: true
                },
                boxpoints: true,
                line: {
                    color: 'black'
                },
                showlegend: false,
                fillcolor: colors[key]
            };
            plotTraces.push(trace)
        });
        return plotTraces
    }

    createGeneDataPoints = () => {
        const name = _.map(this.props.modulesData.cellsByGene.cells, (item) => {
                return `Cluster ${item.cluster_id}, Cell type: ${this.props.annotation[item.cluster_id].description}`
        });
        const trace = {
            x: _.map(this.props.modulesData.cellsByGene.cells, 'tsne_1'),
            y: _.map(this.props.modulesData.cellsByGene.cells, 'tsne_2'),
            text: name,
            customdata: _.map(this.props.modulesData.cellsByGene.cells, 'CPM'),
            mode: 'markers',
            type: 'scattergl',
            marker: {
                color: _.map(this.props.modulesData.cellsByGene.cells, 'CPM'),
                colorbar: {
                    title: this.props.dataset_scale,
                    thicknessmode: "fraction",
                    lenmode: "fraction",
                    len: 0.5,
                    thickness: 0.01
                }
            },
            hovertemplate: "<b>%{text}</b><br><br> CPM:  %{customdata} <extra></extra>",
            opacity: 0.5,
        }
        return [trace]
    }
    renderGenePlot = () => {
        if (this.state.selected && _.isEmpty(this.props.modulesData.cellsByGene)) return PageLoader
        if (this.props.modulesData.cellsByGene.cells.length < 1)return "No data registered for this gene.";
        return (
            <>
                {this.renderPlotHeader('Cluster')}
                <Plot
                    className={'full-size large'}
                    data={this.createGeneDataPoints()}
                    layout={{
                        height: 600,
                        hovermode: 'closest',
                        yaxis: {
                            title: "tSNE_2",
                            showgrid: false,
                            zeroline: false,
                        },
                        xaxis: {
                            title: "tSNE_1",
                            showgrid: false,
                            zeroline: false,
                        }
                    }}
                />
            </>
        )
    }
    panes = [
        {
            menuItem: 'Cluster',
            render: () => <Tab.Pane attached={false}>{this.renderGenePlot()}</Tab.Pane>,
        },
        {
            menuItem: 'Violin',
            render: () => <Tab.Pane attached={false}>{this.renderViolinPlot()}</Tab.Pane>,
        },
    ]
    render() {
        const {activeGene} = this.props.modulesData
        if (activeGene !== this.state.activeGene){
            this.setState({
                activeGene: activeGene
            })
        }
        if (_.isEmpty(this.props.modulesData.cellsByGene)) return null;
        return (
            <>
                <Grid.Row centered>
                    <Grid.Column>
                        <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
                    </Grid.Column>
                </Grid.Row>
            </>
        )
    }
}

export default GeneExpressionForm
