import React, {Component} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {
    useParams
  } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        // etc...
      />
    );
};

class FeatureItems extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: props.url,
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

    render() {

        const{items, collectionId} = this.state;

        return(
            <span className="ps-2">
                <h2>{collectionId}</h2>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>GeoJSON</th>
                            </tr>
                    </thead>
                    <tbody>
                        {items.filter(item => item.type === 'Feature').map(feature => 
                            <Feature key={feature.id} collectionId={collectionId} featureId={feature.id} url={this.state.url} />)}
                    </tbody>
                </Table>

            </span>
        )
    }
}

class Feature extends Component {


    constructor(props) {
        super(props)

        this.state = {
            collectionId: props.collectionId,
            featureId: props.featureId,
            feature: [],
            url: props.url,
            expanded: false
        }
    }

    expand = (e) => {

        if(!this.state.expanded) {
            axios.get(this.state.url + '/collections/' + this.state.collectionId + '/items/' + this.state.featureId + '?f=json')
            .then(response => { 

                this.setState({
                    feature: JSON.stringify(response.data),
                    expanded: !this.state.expanded
                })
            })
        } else {
            this.setState({
                feature: [],
                expanded: !this.state.expanded
            })
        }
        
    }

    render() {
        const{expanded, feature, featureId} = this.state;

        return(
            <>
                <tr>
                <td>{featureId}</td>
                <td>{!expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >+</button>}
                    {expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >-</button>}
                    {expanded && 
                    <div className="ps-4">
                        <textarea className="form-control" id={"json-" + featureId} rows="5"  value={feature} readOnly></textarea>
                    </div>
                }</td>
                </tr>
            </>
        )
    }

}

export default withRouter(FeatureItems)