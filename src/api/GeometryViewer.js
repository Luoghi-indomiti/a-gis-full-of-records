import React, {Component} from "react";
import axios from "axios";
import withRouter from "./Utils";
import ErrorBoundary from "./ErrorBoundary";
import baseUrl from "./baseUrl"

import {
    generatePath,
    Link
  } from "react-router-dom";

class GeometryViewer extends Component {


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
            <ErrorBoundary>

                <Link className="btn btn-dark btn-sm" to={generatePath(baseUrl + "/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collectionId})} >Back to items</Link>
            </ErrorBoundary>
            )
    }
}

export default withRouter(GeometryViewer)