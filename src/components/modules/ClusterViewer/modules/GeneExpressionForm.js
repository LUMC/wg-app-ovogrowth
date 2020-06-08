import React, {Component} from 'react'
import {Form, Grid, Search} from 'semantic-ui-react'
import _ from 'lodash'

const initialState = {isLoading: false, value: ''}

class GeneExpressionForm extends Component {

    state = initialState;

    handleResultSelect = (e, {result}) => {
        this.setState({value: result.title, selected: true, selectedGene: result.id})
        this.props.getCellsByGene(result.id)
    }
    handleSearchChange = (event) => {
        this.props.getGeneSuggestions(event.target.value);
        this.setState({value: event.target.value, selected: false})
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
            </>
        )
    }
}

export default GeneExpressionForm
