import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

// loadQuoteForStock('nflx')
//   .then(quote => {
//     console.log('Loaded Netflix', quote)
//   })

class App extends Component {
  state = {
    quote: null
    // {
    //   symbol: "NTFX",
    //   companyName: "Netflix Inc.",
    //   primaryExchange: "Nasdaq Global Select",
    //   latestPrice: 188.15,
    //   latestSource: "Close",
    //   week52High: 204.38,
    //   week52Low: 113.95
    // }
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflx')
      .then(quote => {
        this.setState({ quote: quote })
      })
  }

  render() {
    const { quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>
        {quote ? (
          <StockInfo
            { ...quote} // Does the same as below
          /* symbol={quote.symbol}
          companyName="Netflix Inc."
          primaryExchange="Nasdaq Global Select"
          latestPrice={188.15}
          latestSource="Close"
          week52High={204.38}
          week52Low={113.95} */
          />
        ) : (
            <p>Loading...</p>
          )}

      </div>
    );
  }
}

export default App;
