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
      this.subscription=null;
    }
    handlePopup=(block)=>{
      this.setState({block:block});
      this.popupButton.current.click();
    }

    async getBlocks(){
      let lastBlock= 'latest';
      const {blocks}= this.state;
      let pushFunc= function(res){
        blocks.push(res);
        return res.parentHash;
      }

      for(var i =0;i<10; i++){
        lastBlock= await this.web3.eth.getBlock(lastBlock).then(r=> pushFunc(r));
      }
      this.setState({blocks});
    }

    addOneBlock = (block)=> {
      const {blocks} = this.state;
      this.setState({blocks:[block, ...blocks.slice(0, blocks.length - 1)]});
    }
    componentDidMount=() => {
      this.getBlocks();
      this.subscription = this.web3.eth.subscribe('newBlockHeaders', (error, result) => {
        if (!error) {
            console.log(result);
            return;
        }
        console.error(error);
        })
        .on("data", (blockHeader) => {
            this.addOneBlock(blockHeader);
        })
        .on("error", console.error);

    }
    
    componentWillUnmount= ()=> {
        // unsubscribes the subscription
        this.subscription.unsubscribe((error, success)=> {
        if (error) return console.error(error);
        if (success) {
            console.log('Successfully unsubscribed!');
        }
    });
    }

    render() {
      return (
        <div className="App">
            <h1 className="App-title">Welcome to {this.state.username}'s Block Explorer</h1>
            <div >     <h2 > Latest Blocks</h2></div>
          <div align = "center" id= "block" style={{ display: "block" }}>
            {this.state.blocks.map((block,index ) => (
              <Block key= {index} block={block} handlePopup={this.handlePopup}/>
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
