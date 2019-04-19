  import React, { Component,  } from 'react';
  import logo from './logo.svg';
  import './App.css';
  import Web3 from 'web3';
  import Block from "./components/Block";

  class App extends Component {

    constructor(props) {
      super(props);
      this.state = { username: "Seda", loggedIn: true, blocks: []};
      // const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://localhost:3001'), null, {});
    }
    getMyBlock(){
        const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://localhost:3001'), null, {});
        let obj = this
        web3.eth.getBlock('latest').then(r => {
            console.log('response status: ', r)
            obj.state.blocks.push({number: r.number, hash:r.hash, parentHash: r.parentHash });
            // obj.state.blocks.push(r.parentHash);
            console.log('parent hash :' + r.parentHash);
            this.setState({blocks:obj.state.blocks});
            console.log(obj.state.blocks);
        })
    }

    async componentDidMount() {
    
      this.getMyBlock();

    }

    render() {
      return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to {this.state.username} APP</h1>
            <h2 > Latest Blocks</h2>
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
