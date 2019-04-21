  import React, { Component,  } from 'react';
  import './App.css';
  import Web3 from 'web3';
  import Block from "./components/Block";

  class App extends Component {

    constructor(props) {
      super(props);
      this.state = { username: "Seda", loggedIn: true, blocks: []};
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
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
      //console.log("inside add one block "+ this.state.blocks);
      //console.log("inside add one block i am length"+ this.state.blocks.length);
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
            <div >     <h2 > Latest Blocks</h2></div>
          <div align = "center" id= "block" style={{ display: "block" }}>
            {this.state.blocks.map(block => (
              <Block block={block} />
            ))}
          </div>
        </div>
      );
    }
  }

  export default App;
