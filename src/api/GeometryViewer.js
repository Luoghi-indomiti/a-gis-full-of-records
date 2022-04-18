import React, {Component} from "react";
import axios from "axios";
import withRouter from "./Utils";
import ErrorBoundary from "./ErrorBoundary";
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'

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
            feature: [],
            bounds: null
        }
    }

    componentDidMount() {
        axios.get(this.state.url + '/collections/' + this.state.collectionId + '/items/' + this.state.itemId + '?f=json')
            .then(response => { 

            var bbox = require('geojson-bbox');
            const bboxArray = bbox(response.data);
            const corner1 = [bboxArray[1], bboxArray[0]];
            const corner2 = [bboxArray[3], bboxArray[2]];

            this.setState({
                feature: response.data,
                bounds: [corner1, corner2]
            })

        })

    }

    render() {
        const{url, collectionId, feature, bounds} = this.state;
        

        return(
            <ErrorBoundary>

                <Link className="btn btn-dark btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collectionId})} ><i className="bi bi-arrow-left-circle" style={{ fontSize: 15 }}></i> Back to items</Link>
                {bounds && (
                <MapContainer className="leaflet-container" bounds={bounds} zoom={7}>
                <TileLayer
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeoJSON
                    attribution="Preview"
                    data={feature}
                />
                </MapContainer>
                )}
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url/collection/:collectionId", {url: encodeURIComponent(url),collectionId: collectionId})} ><i className="bi bi-arrow-left-circle" style={{ fontSize: 15 }}></i> Back to items</Link>
            </ErrorBoundary>
            )
    }
}

export default withRouter(GeometryViewer)