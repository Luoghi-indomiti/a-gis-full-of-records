import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import FeatureItems from "./FeatureItems";
import RecordItems from "./RecordItems";

class Collections extends Component {


    constructor(props) {
        super(props)

        this.state = {
            url: props.url,     // url of API
            collections: [],    // array with collections objects
            expanded: false       // component expanded
        }
    }

    // Runs on component mount
    componentDidMount() {
        // Gets collection from API
        axios.get(this.state.url + '/collections?f=json')
        .then(response => {

            this.setState({
                collections: response.data.collections
            })

        }).catch(error => {
            console.log('Something wrong with ' + this.state.url)
            // Not valid URL
            this.setState({
                collections: []
            })
        })
    }

    // Runs on component unmount
    componentWillUnmount() {
        this.setState({
                collections: []
        })
    }

    // Invert expanded state
    expand = (e) => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const{collections, expanded, url} = this.state
        return(
            <div>
                { 
                    // Collections are loaded but not shown
                    !expanded && 
                    <button type="button" onClick={this.expand}>Show {collections.length} features</button> 
                }
                { 
                    // Collections are shown
                    expanded && 
                    <div>
                        <ul>
                            <h3>Features collections</h3>
                            {collections.filter(collection => collection.itemType === 'feature').map(collection => 
                            <Table striped bordered hover key={collection.id}>
                                <thead>
                                    <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{collection.title}</td>
                                    <td>{collection.description}</td>
                                    <td><FeatureItems id={collection.id} url={url}></FeatureItems></td>
                                    </tr>
                                </tbody>
                            </Table>)}
                        </ul>
                        <ul>
                            <h3>Records collections</h3>
                            {collections.filter(collection => collection.itemType === 'record').map(collection => 
                            <Table striped bordered hover key={collection.id}>
                                <thead>
                                    <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{collection.title}</td>
                                    <td>{collection.description}</td>
                                    <td><RecordItems id={collection.id} url={url}></RecordItems></td>
                                    </tr>
                                </tbody>
                            </Table>)}
                        </ul>
                        <button type="button" onClick={this.expand}>Hide</button>
                    </div>
                }
            </div>
            )
    }
}

export default Collections