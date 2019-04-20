  import React, { Component,  } from 'react';
  import './App.css';
  import Web3 from 'web3';
  import Block from "./components/Block";

  class App extends Component {

    constructor(props) {
      super(props);
      this.state = { username: "Seda", loggedIn: true, blocks: []};
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
      // this.web3 = new Web3(Web3.givenProvider || new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws')), null, {});
    }
    
    getBlock(blockHash='latest', depth=0){
      if(depth < 10)
      {
        let obj = this
        this.web3.eth.getBlock(blockHash).then(r => {
            console.log('response status: ', r)
            obj.state.blocks.push({number: r.number, hash:r.hash, parentHash: r.parentHash });
            // obj.state.blocks.push(r.parentHash);
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
  
    componentDidMount() {
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
        })
        .on("error", console.error);
    
        // // unsubscribes the subscription
        // subscription.unsubscribe(function(error, success){
        //     if (success) {
        //         console.log('Successfully unsubscribed!');
        //     }
        // });
    }

    render() {
      return (
        <div className="App">
            <h1 className="App-title">Welcome to {this.state.username}'s Block Explorer</h1>
            <div>     <h2 > Latest Blocks</h2></div>
          <div id= "block" style={{ display: "block" }}>
            {this.state.blocks.map(block => (
              <Block block={block} />
            ))}
          </div>
        </div>
      );
    }
  }

  export default App;
