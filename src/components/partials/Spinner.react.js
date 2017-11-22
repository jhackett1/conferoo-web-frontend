import React, { Component } from 'react';

class Spinner extends Component {
  render() {

    var bigStyle = {
        margin: "150px auto",
        textAlign: "center",
        display: "block",
        color: "#dfdfdf",
        fontSize: "400%"
    };

    var smallStyle = {
        textAlign: "center",
        display: "inline-block",
        color: "#dfdfdf",
        marginLeft: "15px"
    };

    const isLoading = this.props.isLoading;

    if(isLoading){
      return (
        <span style={(this.props.size === 'inline') ? smallStyle : bigStyle} className="fa fa-circle-o-notch fa-spin"></span>
      );
    } else {
      return null;
    }
  }
}

export default Spinner;
