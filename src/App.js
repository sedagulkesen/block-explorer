  import React, { Component,  } from 'react';
  import './App.css';
  import Web3 from 'web3';
  import Block from "./components/Block";

  class App extends Component {

    constructor(props) {
      super(props);
      this.state = { username: "Seda", loggedIn: true, blocks: []};
      //this.addOneBlock= this.addOneBlock.bind(this);
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
        }
    
    getBlock(blockHash='latest', depth=0){
      if(depth < 10)
      {
        let obj = this
        this.web3.eth.getBlock(blockHash).then(r => {
            console.log('response status: ', r)
            obj.state.blocks.push({number: r.number, hash:r.hash, parentHash: r.parentHash });
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
      this.state.blocks.unshift({number:block.number, hash:block.hash, parentHash: block.parentHash});
      this.state.blocks.pop();
      console.log("inside add one block "+ this.state.blocks);
      console.log("inside add one block i am length"+ this.state.blocks.length);
      //console.log(this.state.blocks
      this.setState({blocks:this.state.blocks});
      console.log("inside add one block i am length 2   "+ this.state.blocks.length);
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
            //obj.getBlock(blockHeader.hash);
            // obj.state.blocks.push({number:blockHeader.number, hash:blockHeader.hash, parentHash: blockHeader.parentHash});
            // console.log("burda basss " + obj.state.blocks.length);
            // obj.setState({blocks:obj.state.blocks});

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
