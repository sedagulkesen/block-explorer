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
            <button style= {buttonStyle} className="button"> Details {open ? '' : ''}</button>
        )} position="right center" closeOnDocumentClick>
        <div><b>Block hash:</b> {hash}</div>
        <div><b>Block parent hash:</b> {parentHash}</div>
        <div><b>Block difficulty:</b> {difficulty}</div>
        <div><b>Gas limit:</b> {gasLimit}</div>
        <div><b>Gas used:</b> {gasUsed}</div>
      </Popup>
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

const popupStyle = {
    width:"400px",
    height:"500px",
};
