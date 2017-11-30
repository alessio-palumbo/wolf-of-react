import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    quote: null
  }

  // The first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuoteForStock(enteredSymbol)
      .then(quote => {
        this.setState({
          quote: quote,
          error: null // Clear error
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol} does not exist`)
        }
        this.setState({ error: error })
      })
  }

  // onChangeEnteredSymbol = {target:{value}}
  onChangeEnteredSymbol = (event) => {
    this.setState({
      enteredSymbol: event.target.value.trim().toUpperCase()
    })
  }

  render() {
    const { error, enteredSymbol, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf of React</h1>

        <input
          value={enteredSymbol}
          placeholder="SyMbol e.g. NFLX"
          aria-label="Symbol"
          onChange={this.onChangeEnteredSymbol} />
        <button
          onClick={this.loadQuote}
        >
          Load Quote
        </button>
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
