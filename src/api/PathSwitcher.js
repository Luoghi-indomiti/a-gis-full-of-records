import React, {Component} from "react";
import Collections from "./collections";
import FeatureItems from "./FeatureItems";
import JsonViewer from "./JsonViewer";
import GeometryViewer from "./GeometryViewer";
import TilesViewer from "./TilesViewer";
import UrlLoader from "./UrlLoader";
import {
    Routes,
    Route
  } from "react-router-dom";


class PathSwitcher extends Component {

    render() {

        return(
            <div className="row">
                {
                    <div>
                        <br/>
                        <Routes>
                            <Route exact path="/" element={<UrlLoader />} />
                            <Route exact path="/:url" element={<Collections />} />
                            <Route exact path="/:url/collection/:collectionId" element={<FeatureItems />} />
                            <Route exact path="/:url/collection/:collectionId/tiles" element={<TilesViewer />} />
                            <Route exact path="/:url/collection/:collectionId/:itemId/json" element={<JsonViewer />} />
                            <Route exact path="/:url/collection/:collectionId/:itemId/map" element={<GeometryViewer />} />
                        </Routes>
                    </div>
                }
            </div>
            )
    }
}

export default PathSwitcher