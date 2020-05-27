import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash'

class ClusterViewer extends Component {

    createDataPoints = (data) =>{
        const plotTraces = [];
        const clusters = _.groupBy(data, 'cluster_id')
        Object.keys(clusters).forEach( (key) => {
            const datapoints = clusters[key].map( (item) => {
                return [parseFloat(item.tsne_1), parseFloat(item.tsne_2)]
            });
            const trace = {
                data: datapoints,
                name: "Label "+key,
                opacity: 0.7,
                marker: {
                    height: 1,
                    width: 1,
                    symbol: 'circle'
                },
                animation: false
            };
            plotTraces.push(trace)
        });
        return plotTraces
    }
    render() {
        if (this.props.modulesData.cells.length < 1)return null
        return (
            <Grid.Column width={16}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        plotOptions: {
                            series: {
                                events: {
                                    legendItemClick: function (e) {
                                        e.preventDefault();
                                    }
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            backgroundColor: '#FFFFFF'
                        },
                        chart: {
                            type: 'scatter',
                            zoomType:'xy',
                            height: '800px'
                        },
                        exporting: {
                            enabled: true
                        },
                        navigator: {
                            enabled: true
                        },
                        title: {
                            text: 'My chart'
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>'
                        },
                        yAxis:[{
                            lineWidth: 0,
                            title:""
                        }],
                        allowPointSelect: false,
                        series: this.createDataPoints(this.props.modulesData.cells)
                    }}
                />
            </Grid.Column>
        )
    }
}

export default ClusterViewer
