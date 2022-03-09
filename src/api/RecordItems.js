import React, {Component} from "react";
import axios from "axios";

class RecordItems extends Component {

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
                {!expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >+</button>}
                {expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >-</button>}
                {expanded && items.map(record => <Record key={record.id} collectionId={id} recordId={record.id} url={this.state.url} />)}
            </span>
        )
    }
}

class Record extends Component {


    constructor(props) {
        super(props)

        this.state = {
            collectionId: props.collectionId,
            recordId: props.recordId,
            record: [],
            url: props.url,
            expanded: false
        }
    }

    expand = (e) => {

        if(!this.state.expanded) {
            axios.get(this.state.url + '/collections/' + this.state.collectionId + '/items/' + this.state.recordId + '?f=json')
            .then(response => { 

                this.setState({
                    record: JSON.stringify(response.data),
                    expanded: !this.state.expanded
                })
            })
        } else {
            this.setState({
                record: [],
                expanded: !this.state.expanded
            })
        }
        
    }

    render() {
        const{expanded, record, recordId} = this.state;

        return(
            <div className="mb-3 ps-4">
                {record.properties}
                {!expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >+</button>}
                {expanded && <button type="button" className="btn btn-dark btn-sm" onClick={this.expand} >-</button>}
                {expanded && 
                    <div className="ps-4">
                        <textarea className="form-control" id={"json-" + recordId} rows="5" value={record} readOnly></textarea>
                    </div>
                }
            </div>
        )
    }

}

export default RecordItems