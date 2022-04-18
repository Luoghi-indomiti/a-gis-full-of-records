import React, {Component} from "react";
import axios from "axios";
import withRouter from "./Utils";
import ReactJson from 'react-json-view';
import {
    generatePath,
    Link
  } from "react-router-dom";

class JsonViewer extends Component {


    constructor(props) {
        super(props)

        this.state = {
            url: this.props.params.url,
            collectionId: this.props.params.collectionId,
            itemId: this.props.params.itemId,
            feature: []
        }
    }

    componentDidMount() {
        axios.get(this.state.url + '/collections/' + this.state.collectionId + '/items/' + this.state.itemId + '?f=json')
            .then(response => { 

                this.setState({
                    feature: response.data
                })
        })
    }

    render() {
        const{url, feature, collectionId} = this.state;

        return(
            <>
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collectionId})} ><i className="bi bi-arrow-left-circle" style={{ fontSize: 15 }}></i> Back to items</Link>
                <ReactJson src={feature} readOnly />
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collectionId})} ><i className="bi bi-arrow-left-circle" style={{ fontSize: 15 }}></i> Back to items</Link>
            </>
            )
    }
}

export default withRouter(JsonViewer)