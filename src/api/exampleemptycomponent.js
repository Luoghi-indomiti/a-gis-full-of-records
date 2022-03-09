import React, {Component} from "react";
import axios from "axios";

class ExampleEmptyComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            url: ''
        }
    }

    // Generic function
    genericFunction = (e) => {
        // Get with Axios
        axios.get(this.state.url + '?f=json')
        .then(response => { 

            this.setState({
                // Load data
            })

        })
    }

    render() {
        const{url} = this.state
        return(
            <div>{url}</div>
            )
    }
}

export default ExampleEmptyComponent