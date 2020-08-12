import React, {Component, Suspense} from 'react'
import _ from 'lodash'
import PageLoader from "../../hooks/pageLoader";
import GeneExpressionForm from "./items/GeneExpressionForm";
import {Dropdown, Grid, Header} from "semantic-ui-react";
import {Form} from "semantic-ui-react";
const GeneralCluser = React.lazy(() => import("./items/GeneralCluster"));
const GeneExpressionTab = React.lazy(() => import("./items/GeneExpressionTab"));

const initialState = {isLoading: false,
    value: '', selected: false, selectedGene: null,
    graphSetting: 'all', ds:'', datasetOptions: [], datasetIndex:0
}

class ClusterViewer extends Component {

    state = initialState;

    setDataset = (e, data) =>{
        this.setState({
            ds: data.value,
            index: data.n
        });

        this.props.setActiveDataset(data.value)
        this.props.getCells()
    }
    componentDidMount() {
        const activeDs = this.props.collection[0].dataset;
        this.setState({
            ds: activeDs.id,
            datasetOptions:
                this.props.collection.map((item, key) =>{
                    return {
                        n:key,
                        text: item.type,
                        value: item.dataset.id
                    }
                })});
        this.props.setActiveDataset(activeDs.id)
        this.props.getCells()
    }
    render() {
        if (this.props.modulesData.cells.length < 1 ) return null
        return (
            <>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Select a dataset type</label>
                        <Dropdown value={this.state.ds} placeholder='Stage' search selection
                                  options={this.state.datasetOptions}
                                  onChange={this.setDataset}
                        />
                    </Form.Field>
                </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column >
                        <Header as='h3' dividing>
                            {this.props.collection[this.state.datasetIndex].type}
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Suspense fallback={<PageLoader frame={true}/>}>
                    <GeneralCluser
                        dataset={this.state.ds}
                        collection={this.props.collection}
                        modulesData={this.props.modulesData}
                    />
                </Suspense>
                <GeneExpressionForm
                    getCellsByGene={this.props.getCellsByGene}
                    getGeneSuggestions={this.props.getGeneSuggestions}
                    modulesData={this.props.modulesData}
                    resetCellByGene={this.props.resetCellByGene}
                />
                <Suspense fallback={
                    (!_.isEmpty(this.props.modulesData.cellsByGene))?<PageLoader frame={true}/>:null
                }>
                    <GeneExpressionTab
                        dataset={this.state.ds}
                        collection={this.props.collection}
                        modulesData={this.props.modulesData}
                    />
                </Suspense>
            </>
        )
    }
}

export default ClusterViewer
