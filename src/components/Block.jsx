import React, { Component } from "react";
import Popup from "reactjs-popup";

class Block extends Component {

  render() {
    const {number,hash,parentHash,difficulty,gasLimit,gasUsed} = this.props.block;
    return (
    <div style= {divStyle}>
        <div>Block id: {number}</div>
        {/* <Popup contentStyle= {popupStyle} trigger={open => (
            <button style= {buttonStyle} className="button"> Details {open ? '' : ''}</button>
        )} position="right"  closeOnDocumentClick>
        <div><b>Block hash:</b> {hash}</div>
        <div><b>Block parent hash:</b> {parentHash}</div>
        <div><b>Block difficulty:</b> {difficulty}</div>
        <div><b>Gas limit:</b> {gasLimit}</div>
        <div><b>Gas used:</b> {gasUsed}</div>
      </Popup> */}

<Popup trigger={<button className="button"> More Details </button>}  modal>
    {close => (
      <div className="modal">
        {/* <a className="close" onClick={close}>
          &times;
        </a> */}
        <div className="header"> <b> Block #{number} </b> </div>
        <br /> 
        <div className="content">
          {' '}
            <div><b>Block hash:</b> {hash}</div>
            <br />
            <div><b>Block parent hash:</b> {parentHash}</div>
            <br />
            <div><b>Block difficulty:</b> {difficulty}</div>
            <br />
            <div><b>Gas limit:</b> {gasLimit}</div>
            <br />
            <div><b>Gas used:</b> {gasUsed}</div>
            </div>
        <div className="actions">
          <button style={buttonStyle}
            className="button"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
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
    background: "white",
    width:"600px",
    height:"150px",
};
