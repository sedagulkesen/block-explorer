import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';


class App extends Component {
  
  async componentDidMount() {

  const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://localhost:3001'), null, {});

  const latestBlockNo = await web3.eth.getBlockNumber();

  console.log(latestBlockNo);   

  web3.eth.getBlock(latestBlockNo).then(console.log);



  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
