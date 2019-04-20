import React, { Component } from "react";
import Popup from "reactjs-popup";

class Block extends Component {

    handleClick() {
        console.log('this is button you clicked:', this);
    }

  render() {
    const {number,hash,parentHash,difficulty,gasLimit,gasUsed} = this.props.block;
    return (
      <div style= {divStyle} >
        <div>Block id: {number}</div>
        {/* <Popup trigger={<button>Details</button>} position="right center">
      <div>Block hash: {hash}</div>
      <div>Block parent hash: {parentHash}</div>
    </Popup> */}

    <Popup style= {popupStyle} trigger={open => (
      <button style= {buttonStyle} className="button">Details {open ? '' : ''}</button>
    )}
    position="right center"
    closeOnDocumentClick>
    <div>Block hash: {hash}</div>
      <div>Block parent hash: {parentHash}</div>
      <div>Block difficulty: {difficulty}</div>
      <div>Gas limit: {gasLimit}</div>
      <div>Gas used: {gasUsed}</div>
      </Popup>
      </div>
    );
  }
}

export default Block;

const divStyle = {
  background: "#7FD2F0",
  margin: "30px",
  width:"300px",
  padding: "30px",
  border: '5px solid pink'
};

const buttonStyle = {
    background: "pink",
    margin: "30px",
    width:"60px",
    height:"40px",
    // padding: "30px",
    border: '5px coral'
  };

  const popupStyle = {
    margin: "30px",
    width:"400px",
    height:"500px",
  };
