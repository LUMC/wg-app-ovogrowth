
import React, {Component} from 'react'
import ModuleLoader from './modules/moduleLoader'
import {Grid, Header} from "semantic-ui-react";
import {pageLoader} from "./hooks/pageLoader";

class Page extends Component{
    state = {loaded: false}
    componentDidMount() {
        this.setState({loaded:true})
    }
    componentWillUnmount() {
        this.setState({loaded: false})
    }

    getCollection (collection){
        if (!collection){
            return null
        }
        if (collection in this.props.collections){
            return this.props.collections[collection]
        }
        else{
            return null
        }
    }
    renderSpecificModule = (name) => {

    }
    renderModules(){
        return this.props.config.settings.map(
            (setting, key) =>{
                if (setting.module === 'form'){
                    return(
                        <ModuleLoader
                            modulesData={this.props.modulesData}
                            getGeneSuggestions={this.props.getGeneSuggestions}
                            getCells={this.props.getCells}
                            getCellsByGene={this.props.getCellsByGene}
                            resetCellByGene={this.props.resetCellByGene}
                            setActiveDataset={this.props.setActiveDataset}
                            onSubmit={this.props.onSubmit}
                            page={this.props.config.name}
                            key={`module-${this.props.config.reference}-${key}`}
                            collection={{
                                'form': this.getCollection(setting.collection),
                                'inputs': this.getCollection('inputs')
                            }}
                            setting={setting}
                            protocolStatus={this.props.protocolStatus}
                        />
                    )
                }
                if (setting.module === 'cluster-viewer'){
                    return(
                        <ModuleLoader
                            modulesData={this.props.modulesData}
                            getGeneSuggestions={this.props.getGeneSuggestions}
                            getCells={this.props.getCells}
                            getCellsByGene={this.props.getCellsByGene}
                            resetCellByGene={this.props.resetCellByGene}
                            setActiveDataset={this.props.setActiveDataset}
                            onSubmit={this.props.onSubmit}
                            page={this.props.config.name}
                            key={`module-${this.props.config.reference}-${key}`}
                            collection={{
                                'ds': this.getCollection(setting.collection),
                                'annotation': this.getCollection('cluster_annotation')
                            }}
                            setting={setting}
                            protocolStatus={this.props.protocolStatus}
                        />
                    )
                }
                return (
                    <ModuleLoader
                        modulesData={this.props.modulesData}
                        getCells={this.props.getCells}
                        getGeneSuggestions={this.props.getGeneSuggestions}
                        getCellsByGene={this.props.getCellsByGene}
                        setActiveDataset={this.props.setActiveDataset}
                        resetCellByGene={this.props.resetCellByGene}
                        page={this.props.config.name}
                        key={`module-${this.props.config.reference}-${key}`}
                        collection={this.getCollection(setting.collection)}
                        setting={setting}
                    />
                )
            }
        )
    }
    render() {
        if (!this.props.path){
            return null
        }
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' dividing>
                            {this.props.config.name}
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                {this.renderModules()}
            </Grid>
        )
    }

}
export  default  Page;