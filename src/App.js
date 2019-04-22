  import React, { Component } from 'react';
  import './App.css';
  import Web3 from 'web3';
  import Block from "./components/Block";
  import Popup from "reactjs-popup";
  
  class App extends Component {

    constructor(props) {
      super(props);
      this.state = { username: "Seda", loggedIn: true, blocks: [], block:{}};
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
      this.handlePopup=this.handlePopup.bind(this);
      this.popupButton= React.createRef();
    }

    handlePopup(block){
      this.setState({block:block});
      this.popupButton.current.click();
    }
    getBlock(blockHash='latest', depth=0){
      if(depth < 10)
      {
        let obj = this
        this.web3.eth.getBlock(blockHash).then(r => {
            console.log('response status: ', r)
            obj.state.blocks.push({number: r.number, hash:r.hash, parentHash: r.parentHash, difficulty: r.difficulty, gasLimit: r.gasLimit, gasUsed: r.gasUsed });
            console.log('parent hash :' + r.parentHash);
            this.getBlock(r.parentHash, depth+1)
            console.log(obj.state.blocks);
        })
      }
      else
      {
        this.setState({blocks:this.state.blocks});
      }
    }
    addOneBlock(block){
      this.state.blocks.unshift({number:block.number, hash:block.hash, parentHash: block.parentHash, difficulty: block.difficulty, gasLimit: block.gasLimit, gasUsed: block.gasUsed}); //add block to the beginning
      this.state.blocks.pop(); //pop the oldest element in array 
      this.setState({blocks:this.state.blocks});
    }

    componentDidMount() {
      let obj=this
      this.getBlock();
      const subscription = this.web3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error) {
            console.log(result);
            return;
        }
        console.error(error);
        })
        .on("data", function(blockHeader){
            console.log(blockHeader);
            obj.addOneBlock(blockHeader);
        })
        .on("error", console.error);
    }

    render() {
      return (
        <div className="App">
            <h1 className="App-title">Welcome to {this.state.username}'s Block Explorer</h1>
            <div >     <h2 > Latest Blocks</h2></div>
          <div align = "center" id= "block" style={{ display: "block" }}>
            {this.state.blocks.map(block => (
              <Block block={block} handlePopup={this.handlePopup}/>
            ))}
          </div>
          <Popup trigger={<button style= {invisibleButton} ref={this.popupButton}> </button>}   modal>
            {close => (
              <div className="modal">
                <div className="header"> <b> Block #{this.state.block.number} </b> </div>
                <br /> 
                <div className="content">
                  {' '}
                    <div><b>Block hash:</b> {this.state.block.hash}</div>
                    <br />
                    <div><b>Block parent hash:</b> {this.state.block.parentHash}</div>
                    <br />
                    <div><b>Block difficulty:</b> {this.state.block.difficulty}</div>
                    <br />
                    <div><b>Gas limit:</b> {this.state.block.gasLimit}</div>
                    <br />
                    <div><b>Gas used:</b> {this.state.block.gasUsed}</div>
                    </div>
                <div className="actions">
                  <button style={buttonStyle}
                    className="button"
                    onClick={() => {
                      close()
                    }}>Close</button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      );
    }
  }

  export default App;

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

const invisibleButton = {
  display:"none"
};
