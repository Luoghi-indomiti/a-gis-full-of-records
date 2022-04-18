import React, {Component} from "react";
import axios from "axios";
import Collections from "./collections";
import FeatureItems from "./FeatureItems";
import JsonViewer from "./JsonViewer";
import GeometryViewer from "./GeometryViewer";
import {
    Routes,
    Route,
    Link,
    generatePath,
  } from "react-router-dom";


class ApiLoader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: '',
            conforms: 0
        }
    }

    checkUrl = (e) => {
        // Updates the state of the component onChange
        this.setState({
            url : e.target.value,
            conforms: 0
        })

        // Conformances to verify
        const features_core = 'http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core'
        const features_geojson = 'http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson'
        const records_geojson = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/core'
        const records_json = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/json'
        const records_html = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/html'

        // Checks after the URL has a minimal length
        if(e.target.value.length > 9) {
            console.log('Checking ' + e.target.value + '/conformance?f=json with a timeout of 5 seconds')
            // HTTP get with axios
            axios.get(e.target.value + '/conformance?f=json', {timeout: 5000})
                .then(response => {
                    if(response.data && response.data.conformsTo) {
                        // Checks conformance
                        if((response.data.conformsTo.includes(features_core) 
                            && response.data.conformsTo.includes(features_geojson))
                            || (response.data.conformsTo.includes(records_geojson)
                            && response.data.conformsTo.includes(records_json)
                            && response.data.conformsTo.includes(records_html))) {
                            // Valid OGC API
                            this.setState({
                                conforms: 1
                            })
                        } else {
                            // Missing required conformance
                            this.setState({
                                conforms: -2
                            })
                        }
                    } else {
                        // Not valid OGC API
                        this.setState({
                            conforms: -1
                        })
                    }
                })
                .catch(error => {
                        // Not valid URL
                        this.setState({
                            conforms: -3
                        })
                })
        }
    }

    render() {
        const{url,conforms} = this.state

        return(
            <div className="row">
                <label>Put your OGC API URL here: </label>
                <input type='text' name='url' value={url} onChange={this.checkUrl}></input>
                <br/>
                {
                    conforms < 0 && 
                    <div>
                        {conforms === -1 && <div className="alert alert-danger">It doesn't seem an OGC Open API</div>}
                        {conforms === -2 && <div className="alert alert-warning">Missing required conformance</div>}
                        {conforms === -3 && <div className="alert alert-warning">Not a valid URL</div>}
                    </div>
                }
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url", {url: encodeURIComponent(url)})} >Load collections</Link>
                {
                    <div>
                        <br/>
                        <Routes>
                            <Route exact path="/" element={<div />} />
                            <Route exact path="/:url" element={<Collections />} />
                            <Route exact path="/:url/collection/:collectionId" element={<FeatureItems />} />
                            <Route exact path="/:url/collection/:collectionId/:itemId/json" element={<JsonViewer />} />
                            <Route exact path="/:url/collection/:collectionId/:itemId/map" element={<GeometryViewer />} />
                        </Routes>
                    </div>
                }
            </div>
            )
    }
}

export default ApiLoader