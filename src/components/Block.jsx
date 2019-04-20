import React, { Component } from "react";
import Popup from "reactjs-popup";

class Block extends Component {

    handleClick() {
        console.log('this is button you clicked:', this);
    }

  render() {
    const {number,hash,parentHash,difficulty,gasLimit,gasUsed} = this.props.block;
    return (
    <div style= {divStyle}>
        <div>Block id: {number}</div>
        <Popup style= {popupStyle} trigger={open => (
            <button style= {buttonStyle} className="button">Details {open ? '' : ''}</button>
        )} position="right center" closeOnDocumentClick>
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
     alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
};

const popupStyle = {
    width:"400px",
    height:"500px",
};
