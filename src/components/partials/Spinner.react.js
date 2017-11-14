import React, { Component } from 'react';

class Spinner extends Component {
  render() {

    var spinnerStyle = {
        margin: "150px auto",
        textAlign: "center",
        display: "block",
        color: "#dfdfdf",
        fontSize: "400%"
    };

    const isLoading = this.props.isLoading;

    if(isLoading){
      return (
        <span style={spinnerStyle} className="fa fa-circle-o-notch fa-spin"></span>
      );
    } else {
      return null;
    }
  }
}

export default Spinner;
