import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import RecordItems from "./RecordItems";
import {
    BrowserRouter as Router,
    generatePath,
    Link
  } from "react-router-dom";

class Collections extends Component {


    constructor(props) {
        super(props)

        this.state = {
            url: props.url,     // url of API
            collections: []    // array with collections objects
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

    render() {
        const{collections, url} = this.state
        return(
            <div>
                <ul>
                    <h3>Features collections</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th style={{width: "30%"}}>Title</th>
                            <th style={{width: "60%"}}>Description</th>
                            <th style={{width: "10%"}}>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.filter(collection => collection.itemType === 'feature').map(collection => 
                            <tr key={collection.id}>
                                <td>{collection.title}</td>
                                <td>{collection.description}</td>
                                <td><Link to={generatePath("/collection/:collectionId", {collectionId: collection.id})} >Show</Link></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </ul>
                <ul>
                    <h3>Records collections</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th style={{width: "30%"}}>Title</th>
                            <th style={{width: "60%"}}>Description</th>
                            <th style={{width: "10%"}}>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.filter(collection => collection.itemType === 'record').map(collection => 
                            <tr key={collection.id}>
                                <td>{collection.title}</td>
                                <td>{collection.description}</td>
                                <td><RecordItems id={collection.id} url={url}></RecordItems></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </ul>
                {collections.length} collections shown.
            </div>
            )
    }
}

export default Collections