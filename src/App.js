import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Wolf of React</h1>
        <StockInfo
          symbol="NTFX"
          companyName="Netflix Inc."
          primaryExchange="Nasdaq Global Select"
          latestPrice={188.15}
          latestSource="Close"
          week52High={204.38}
          week52Low={113.95}
        />
      </div>
    );
  }
}

export default App;
