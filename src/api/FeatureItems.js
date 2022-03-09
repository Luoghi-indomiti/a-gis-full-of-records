import React, {Component} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

class FeatureItems extends Component {

    constructor(props) {
        super(props)

        this.state = {
            url: props.url,
            id: props.id,
            items: [],
            expanded: false
        }
    }

    expand = (e) => {

        if(!this.state.expanded) {
            axios.get(this.state.url + '/collections/' + this.state.id + '/items?f=json')
            .then(response => { 

                this.setState({
                    items: response.data.features,
                    expanded: !this.state.expanded
                })
            })
        } else {
            this.setState({
                items: [],
                expanded: !this.state.expanded
            })
        }
    }



    render() {

        const{expanded, items, id} = this.state;

        return(
            <span className="ps-2">
                <Button variant="success" onClick={this.expand}>View</Button>
                
                <Modal show={expanded} onHide={this.expand}>
                    <Modal.Header closeButton>
                    <Modal.Title>Collection content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>GeoJSON</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {items.filter(item => item.type === 'Feature').map(feature => 
                                    <Feature key={feature.id} collectionId={id} featureId={feature.id} url={this.state.url} />)}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.expand}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

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

export default FeatureItems