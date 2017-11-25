import React, {Component} from 'react';

class Responses extends Component {



  render(){

    let total =
      this.props.responses.a.length +
      this.props.responses.b.length +
      this.props.responses.c.length +
      this.props.responses.d.length;

    let aPercent = this.props.responses.a.length/total;
    let bPercent = this.props.responses.b.length/total;
    let cPercent = this.props.responses.c.length/total;
    let dPercent = this.props.responses.d.length/total;

    function classMeUp(input){
      if(input === Math.max(aPercent, bPercent, cPercent, dPercent)){
        return 'winner'
      } else {
        return ''
      }
    }

    function calcStyle(decimal){
      // alert(decimal)
      return {
        width: decimal*100 + "%"
      }
    }

    return(
        <ul className="responses">

        {(this.props.options.a) ?
          <li>
            <h5>{this.props.options.a}</h5>
            <div className={classMeUp(aPercent)} style={calcStyle(aPercent)}><span>{parseInt(aPercent*100)}%</span></div>
          </li>
        : null}
        {(this.props.options.b) ?
          <li>
            <h5>{this.props.options.b}</h5>
            <div className={classMeUp(bPercent)} style={calcStyle(bPercent)}><span>{parseInt(bPercent*100)}%</span></div>
          </li>
        : null}
        {(this.props.options.c) ?
          <li>
            <h5>{this.props.options.c}</h5>
            <div className={classMeUp(cPercent)} style={calcStyle(cPercent)}><span>{parseInt(cPercent*100)}%</span></div>
          </li>
        : null}
        {(this.props.options.d) ?
          <li>
            <h5>{this.props.options.d}</h5>
            <div className={classMeUp(dPercent)} style={calcStyle(dPercent)}><span>{parseInt(dPercent*100)}%</span></div>
          </li>
        : null}

        </ul>
    )
  }
}

export default Responses;
