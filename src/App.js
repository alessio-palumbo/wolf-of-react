import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

class App extends Component {
  state = {
    erro: null,
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('dddd')
      .then(quote => {
        this.setState({ quote: quote })
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error('The stock symbol does not exist')
        }
        this.setState({ error: error })
        console.error('Error loading quote', error)
      })
  }

  render() {
    const { error, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>
        {
          error && <p>{error.message}</p>
        }
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
