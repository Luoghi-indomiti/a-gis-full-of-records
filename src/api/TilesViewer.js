import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import MVT from 'ol/format/MVT';
import OGCVectorTile from 'ol/source/OGCVectorTile';
import VectorTileLayer from 'ol/layer/VectorTile';
import Stamen from 'ol/source/Stamen';
import { transform } from 'ol/proj'


function TilesViewer(props) {

    // set intial state
    const [map, setMap] = useState()
    const [featuresLayer, setFeaturesLayer] = useState()
    const [setSelectedCoord] = useState()

    // pull refs
    const mapElement = useRef()

    // create state ref that can be accessed in OpenLayers onclick callback function
    //  https://stackoverflow.com/a/60643670
    const mapRef = useRef()
    mapRef.current = map

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect(() => {

        // map click handler
        const handleMapClick = (event) => {

            // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
            //  https://stackoverflow.com/a/60643670
            const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

            // transform coord to EPSG 4326 standard Lat Long
            const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

            // set React state
            setSelectedCoord(transormedCoord)

            console.log(transormedCoord)

        }

        // create and add vector source layer
        const initalFeaturesLayer = new VectorTileLayer({
            source: new OGCVectorTile({
                url: 'https://maps.ecere.com/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad',
                format: new MVT(),
            }),
        })

        // create map
        const initialMap = new Map({
            target: mapElement.current,
            layers: [

                // USGS Topo
                new TileLayer({
                    source: new Stamen({
                        layer: 'toner',
                    })
                }),

                initalFeaturesLayer

            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2
            }),
            controls: []
        })

        // set map onclick handler
        initialMap.on('click', handleMapClick)

        // save map and vector layer references to state
        setMap(initialMap)
        setFeaturesLayer(initalFeaturesLayer)

    }, [setSelectedCoord])

    // update map if features prop changes - logic formerly put into componentDidUpdate
    useEffect(() => {

        if (props.features && props.features.length) { // may be null on first render

            // set features to map
            featuresLayer.setSource(
                new OGCVectorTile({
                    url: 'https://maps.ecere.com/ogcapi/collections/NaturalEarth:cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad',
                    format: new MVT()
                })
            )

            // fit map to feature extent (with 100px of padding)
            map.getView().fit(featuresLayer.getSource().getExtent(), {
                padding: [100, 100, 100, 100]
            })

        }

    }, [props.features, featuresLayer, map])

    // render component
    return (
        <div ref={mapElement} className="map-container"></div>
    )

}

export default TilesViewer