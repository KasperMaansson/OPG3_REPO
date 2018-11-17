import React, { Component } from 'react';

class MyText extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <p>{this.props.textToDisplay}</p>

         );
    }
}
 
export default MyText;