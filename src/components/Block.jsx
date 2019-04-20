import React, { Component } from "react";

class Block extends Component {
  render() {
    const {number,hash,parentHash} = this.props.block;
    return (
      <div style= {divStyle} >
        <div>Block id:{number}</div>
        <div>Block hash: {hash}</div>
        <div>My parent hash : {parentHash}</div>
      </div>
    );
  }
}

export default Block;

const divStyle = {
  background: "#7FD2F0",
  margin: "30px",
  padding: "30px"
};
