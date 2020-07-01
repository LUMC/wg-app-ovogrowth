import React, {Component, Suspense} from 'react'
import {Button, Dimmer, Form, Grid, Image, Input, Loader, Search, Segment} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'
import PageLoader from "../../hooks/pageLoader";
import GeneExpressionForm from "./items/GeneExpressionForm";
const GeneralCluser = React.lazy(() => import("./items/GeneralCluster"));
const GeneExpressionTab = React.lazy(() => import("./items/GeneExpressionTab"));

const initialState = {isLoading: false, value: '', selected: false, selectedGene: null, graphSetting: 'all'}

class ClusterViewer extends Component {

    state = initialState;

    render() {
        if (this.props.modulesData.cells.length < 1) return null
        return (
            <>
                <GeneExpressionForm
                    getCellsByGene={this.props.getCellsByGene}
                    getGeneSuggestions={this.props.getGeneSuggestions}
                    modulesData={this.props.modulesData}
                    resetCellByGene={this.props.resetCellByGene}
                />
                <Suspense fallback={<PageLoader frame={true}/>}>
                <GeneralCluser
                    collection={this.props.collection}
                    modulesData={this.props.modulesData}
                />
                </Suspense>
                <Suspense fallback={
                    (!_.isEmpty(this.props.modulesData.cellsByGene))?<PageLoader frame={true}/>:null
                }>
                    <GeneExpressionTab
                        collection={this.props.collection}
                        modulesData={this.props.modulesData}
                    />
                </Suspense>
            </>
        )
    }
}

export default ClusterViewer
