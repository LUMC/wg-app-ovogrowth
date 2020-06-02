import React, {Component} from 'react'
import {Form, Grid, Input, Search} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'


const initialState = {isLoading: false, value: '', selected: false, tissues: [], stages: [], graphSetting:'all'}

class ClusterViewer extends Component {

    state = initialState;

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
    handleSearchChange = (event) => {
        this.props.getGeneSuggestions(event.target.value);
        this.setState({value: event.target.value, selected: false})
    }
    render() {
        if (this.props.modulesData.cells.length < 1)return null
        const {isLoading, value} = this.state;
        console.log(this.props.modulesData)
        return (
            <>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <Form>
                            <Form.Field>
                                <label>Visualize expression using the gene symbol</label>
                                <Search
                                    loading={isLoading}
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
                <Grid.Row>
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
                </Grid.Row>
            </>
        )
    }
}

export default ClusterViewer
