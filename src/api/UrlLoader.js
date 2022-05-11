import React, {Component} from "react";
import axios from "axios";
import {
    Link,
    generatePath,
  } from "react-router-dom";

class UrlLoader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            features_core: 0,
            features_geojson: 0,
            records_geojson: 0,
            records_json: 0,
            records_html: 0,
            tiles_core: 0,
            tiles_tileset: 0,
            tiles_tileset_list: 0,
            tiles_dataset_tilesets: 0,
            tiles_geodata_tilesets: 0,
            tiles_png: 0,
            tiles_mvt: 0
        }
    }

    checkUrl = (e) => {
        // Updates the state of the component onChange
        this.setState({
            url : e.target.value,
            conforms: 0
        })

        // Conformances to verify
        const features_core_url = 'http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core'
        const features_geojson_url = 'http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson'
        const records_geojson_url = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/core'
        const records_json_url = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/json'
        const records_html_url = 'http://www.opengis.net/spec/ogcapi-records-1/1.0/conf/html'
        const tiles_core_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/core'
        const tiles_tileset_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/tileset'
        const tiles_tileset_list_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/tilesets-list'
        const tiles_dataset_tilesets_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/dataset-tilesets'
        const tiles_geodata_tilesets_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/geodata-tilesets'
        const tiles_png_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/png'
        const tiles_mvt_url = 'http://www.opengis.net/spec/ogcapi-tiles-1/1.0/req/mvt'

        // Checks after the URL has a minimal length
        if(e.target.value.length > 9) {
            console.log('Checking ' + e.target.value + '/conformance?f=json with a timeout of 5 seconds')
            // HTTP get with axios
            axios.get(e.target.value + '/conformance?f=json', {timeout: 5000})
                .then(response => {
                    if(response.data && response.data.conformsTo) {
                        // Checks conformance
                        if(response.data.conformsTo.includes(features_core_url)) { this.setState({features_core : 1}) }
                        if(response.data.conformsTo.includes(features_geojson_url)) { this.setState({features_geojson : 1}) }
                        if(response.data.conformsTo.includes(records_geojson_url)) { this.setState({records_geojson : 1}) }
                        if(response.data.conformsTo.includes(records_json_url)) { this.setState({records_json : 1}) }
                        if(response.data.conformsTo.includes(records_html_url)) { this.setState({records_html : 1}) }
                        if(response.data.conformsTo.includes(tiles_core_url)) { this.setState({tiles_core : 1}) }
                        if(response.data.conformsTo.includes(tiles_tileset_url)) { this.setState({tiles_tileset : 1}) }
                        if(response.data.conformsTo.includes(tiles_tileset_list_url)) { this.setState({tiles_tileset_list : 1}) }
                        if(response.data.conformsTo.includes(tiles_dataset_tilesets_url)) { this.setState({tiles_dataset_tilesets : 1}) }
                        if(response.data.conformsTo.includes(tiles_geodata_tilesets_url)) { this.setState({tiles_geodata_tilesets : 1}) }
                        if(response.data.conformsTo.includes(tiles_png_url)) { this.setState({tiles_png : 1}) }
                        if(response.data.conformsTo.includes(tiles_mvt_url)) { this.setState({tiles_mvt : 1}) }

                        const{features_core,features_geojson,records_geojson,records_json,records_html,tiles_core,tiles_geodata_tilesets} = this.state

                        if((features_core && features_geojson)
                            || (records_geojson && records_json && records_html)
                            || (tiles_core && tiles_geodata_tilesets)) {
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
                <Link className="btn btn-dark btn-sm" to={generatePath("/:url/", {url: encodeURIComponent(url)})} >Load collections</Link>
            </div>
            )
    }
}

export default UrlLoader