import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import withRouter from "./Utils";
import {
    generatePath,
    Link
  } from "react-router-dom";

class Collections extends Component {


    constructor(props) {
        super(props)

        this.state = {
            url: this.props.params.url,
            collections: []
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

    // Check if current collection supports tiles
    // by checking if contains a link with correct rel
    hasTiles(current) {
        return current.links.filter(link => link.rel.includes('tiles')).length > 0
    }

    // Runs on component unmount
    componentWillUnmount() {
        this.setState({
                url: "",
                collections: []
        })
    }

    render() {
        const{collections, url} = this.state
        return(
            <div>
                <ul>
                    <h3><i className="bi bi-geo-alt" style={{ fontSize: 30 }}></i> Features collections</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th style={{width: "30%"}}>Title</th>
                            <th style={{width: "56%"}}>Description</th>
                            <th style={{width: "7%"}}>Show</th>
                            <th style={{width: "7%"}}>Tiles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.filter(collection => collection.itemType === 'feature').map(collection => 
                            <tr key={collection.id}>
                                <td>{collection.title}</td>
                                <td>{collection.description}</td>
                                <td><Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collection.id})} ><i className="bi bi-card-list" style={{ fontSize: 20 }}></i></Link></td>
                                <td>{ this.hasTiles(collection) && <Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId/tiles", {url: encodeURIComponent(url),collectionId: collection.id})} ><i className="bi bi-bricks" style={{ fontSize: 20 }}></i></Link> }</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </ul>
                <ul>
                    <h3><i className="bi bi-archive" style={{ fontSize: 30 }}></i> Records collections</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th style={{width: "30%"}}>Title</th>
                            <th style={{width: "60%"}}>Description</th>
                            <th style={{width: "10%"}}>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.filter(collection => collection.itemType === 'record').map(collection => 
                            <tr key={collection.id}>
                                <td>{collection.title}</td>
                                <td>{collection.description}</td>
                                <td><Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collection.id})} ><i className="bi bi-card-list" style={{ fontSize: 20 }}></i></Link></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </ul>
                {collections.filter(collection => collection.itemType !== 'feature' && collection.itemType !== 'record').length > 0 &&
                <ul>
                    <h3><i className="bi bi-compass" style={{ fontSize: 30 }}></i> Others*</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th style={{width: "30%"}}>Title</th>
                            <th style={{width: "60%"}}>Description</th>
                            <th style={{width: "10%"}}>Tiles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.filter(collection => collection.itemType !== 'feature' && collection.itemType !== 'record').map(collection => 
                            <tr key={collection.id}>
                                <td>{collection.title}</td>
                                <td>{collection.description}</td>
                                <td>{ this.hasTiles(collection) && <Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId/tiles", {url: encodeURIComponent(url),collectionId: collection.id})} ><i className="bi bi-bricks" style={{ fontSize: 20 }}></i></Link> }</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    <br/><p>* In this category are all the collections that do not have itemType property equal "feature" or "record".</p>
                </ul>
                }
                {collections.length} collections shown.
            </div>
            )
    }
}

export default withRouter(Collections)