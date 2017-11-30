import React, { Component } from 'react'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.css'
import StockInfo from './components/StockInfo'
import StockNews from './components/StockNews'
import SixMonthsTable from './components/SixMonthsTable'
import Chart from './components/Chart'
import { loadQuoteForStock, loadCompanyLogo, loadNews, loadSixMonths } from './api/iex'

class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'AAPL',
    logo: 'AAPL',
    quote: null,
    news: [],
    history: [],
    sixmonths: [],
    displayHistory: false
  }

  componentDidMount() {
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol, history } = this.state

    const promises = [
      loadQuoteForStock(enteredSymbol),
      loadCompanyLogo(enteredSymbol),
      loadNews(enteredSymbol),
      loadSixMonths(enteredSymbol)
    ]

    Promise.all(promises)
      .then(data => {
        console.log(this.state.history)
        this.setState({
          quote: data[0],
          logo: data[1],
          news: data[2],
          sixmonths: data[3],
          history: [...history, { quote: data[0], logo: data[1] }]
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

  loadHistory = (event) => {
    this.setState({
      displayHistory: !this.state.displayHistory
    })
  }

  render() {
    const { error, enteredSymbol, logo, quote, history, news, sixmonths, displayHistory } = this.state

    return (
      <div className="App" >
        <h1 className='text-center'>Wolf of React</h1>
        <br />
        <div className='row'>

          {/* Quote and news column */}
          <div className='col-md-5 left-bar'>
            <input
              value={enteredSymbol}
              placeholder="SyMbol e.g. NFLX"
              aria-label="Symbol"
              onChange={this.onChangeEnteredSymbol} />
            <button onClick={this.loadQuote} className='quote-btn'>
              Load Quote
            </button>
            <button onClick={this.loadHistory} className='history-btn'>
              History
            </button>

            {/* Quote */}
            {
              error && <p>{error.message}</p>
            }
            {
              quote ? (
                <StockInfo
                  logo={logo}
                  { ...quote}
                />

              ) : (
                  <p>Loading...</p>
                )
            }
            <hr />

            {/* News */}
            <h4 className='text-center'>Latest News</h4>
            <hr />
            {
              news.map((latestNews, index) => (
                <StockNews key={index} {...latestNews} />
              ))
            }
          </div>

          {/* Right data-column */}
          <div className="col-md-7 text-center">

            {/* Toggle history */}
            {
              displayHistory === true ?
                <div>
                  <h3>History</h3> {
                    history.reverse().map((historyItem, index) => (
                      !!historyItem ?
                        <StockInfo
                          key={index}
                          logo={historyItem.logo}
                          {...historyItem.quote}
                        /> :
                        null
                    ))}
                </div> :
                null
            }

            {/* Chart */}
            <h4>Six Months Chart</h4>
            <Chart chartData={sixmonths} />
            <hr />

            {/* Table */}
            <h4>Six Months Data</h4>
            <div className="table">
              <table className="inner-table">
                <thead>
                  <tr className="chart-tr">
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sixmonths.map((data, index) => (
                      <SixMonthsTable key={index} {...data} />
                    ))
                  }
                </tbody>
              </table>
            </div>
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
