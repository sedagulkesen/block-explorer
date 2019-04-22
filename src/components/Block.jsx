import React, { Component } from "react";

class Block extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const handleClick= e => this.props.handlePopup(this.props.block);
    const {number,hash,parentHash,difficulty,gasLimit,gasUsed} = this.props.block;
    return (
    <div style= {divStyle}>
        <div>Block id: {number}</div>
        <button style={buttonStyle} onClick={() => {handleClick()}}> More Details </button> 
        </div>
    );
  }
}

export default Block;

const divStyle = {
    background: "#7FD2F0",
    margin: "30px",
    width:"200px",
    height:"25px",
    padding: "30px",
    border: '3px solid black',

};

const buttonStyle = {
    background: "white",
    margin: "10px",
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
};
