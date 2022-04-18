import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import withRouter from "./Utils";
import {
    generatePath,
    Link
  } from "react-router-dom";

class FeatureItems extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: this.props.params.url,
            collectionId: this.props.params.collectionId,
            items: []
        }
    }

    componentDidMount() {

        axios.get(this.state.url + '/collections/' + this.state.collectionId + '/items?f=json')
        .then(response => { 

            this.setState({
                items: response.data.features
            })
        })
    }

    goodTheFirstOne = (elem) => {
        if(elem.title) return elem.title + ' - ' + elem.id
        if(elem.name) return elem.name + ' - ' + elem.id
        if(elem.properties.title) return elem.properties.title + ' - ' + elem.id
        if(elem.properties.name) return elem.properties.name + ' - ' + elem.id
        if(elem.id) return elem.id
        if(elem.fid) return elem.fid
    }

    render() {

        const{url, items, collectionId} = this.state;

        return(
            <span className="ps-2">
                <h2><i className="bi bi-info-square" style={{ fontSize: 30 }}></i> {collectionId}</h2>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Data</th>
                            <th>Map</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(feature => 
                            <tr key={feature.id}>
                                <td>{this.goodTheFirstOne(feature)}</td>
                                <td><Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId/:itemId/json", {url: encodeURIComponent(url),collectionId: collectionId, itemId: feature.id})} > <i className="bi bi-filetype-json" style={{ fontSize: 20 }}></i></Link></td>
                                <td><Link className="btn btn-info btn-sm" to={generatePath("/:url/collection/:collectionId/:itemId/map", {url: encodeURIComponent(url),collectionId: collectionId, itemId: feature.id})} > <i className="bi bi-map" style={{ fontSize: 20 }}></i></Link></td>
                        </tr>)}
                    </tbody>
                </Table>
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url", {url: encodeURIComponent(this.state.url)})} ><i className="bi bi-arrow-left-circle" style={{ fontSize: 15 }}></i> Back to collections</Link>
            </span>
        )
    }
}


export default withRouter(FeatureItems)