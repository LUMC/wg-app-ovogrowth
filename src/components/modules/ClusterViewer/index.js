import React, {Component, Suspense} from 'react'
import {Button, Dimmer, Form, Grid, Image, Input, Loader, Search, Segment} from 'semantic-ui-react'
import Plot from 'react-plotly.js';
import _ from 'lodash'
import PageLoader from "../../hooks/pageLoader";
import GeneExpressionForm from "./items/GeneExpressionForm";
import Iframe from "react-iframe";
const GeneralCluser = React.lazy(() => import("./items/GeneralCluster"));
const GeneExpressionTab = React.lazy(() => import("./items/GeneExpressionTab"));

const initialState = {isLoading: false, value: '', selected: false, selectedGene: null, graphSetting: 'all', ds:''}

class ClusterViewer extends Component {

    state = initialState;

    componentDidMount() {
        this.props.setActiveDataset(this.props.alias_ref)
        this.props.getCells()
    }
    render() {
        if (this.state.ds !== this.props.modulesData.activeDataset){
            this.setState({ds:this.props.alias_ref})
            this.props.setActiveDataset(this.props.alias_ref)
            this.props.getCells()
        }
        if (this.props.modulesData.cells.length < 1 ) return null
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
                    dataset={this.state.ds}
                    collection={this.props.collection}
                    modulesData={this.props.modulesData}
                />
                </Suspense>
                <Suspense fallback={
                    (!_.isEmpty(this.props.modulesData.cellsByGene))?<PageLoader frame={true}/>:null
                }>
                    <GeneExpressionTab
                        dataset={this.state.ds}
                        collection={this.props.collection}
                        modulesData={this.props.modulesData}
                    />
                </Suspense>
                <Iframe url="https://ana-edu04.lumc.nl/leafletviewer.html?id=ftm3_ot1_cl2_g17"
                        className="iframe"
                        display="initial"
                        position="relative"/>
            </>
        )
    }
}

export default ClusterViewer
