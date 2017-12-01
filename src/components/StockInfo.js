import React from 'react'

function StockInfo({
  logo,
  symbol, // NTFX
  companyName, //Netflix Inc.
  primaryExchange, // Nasdaq Global Select
  latestPrice, // 188.15
  latestSource, // Close
  week52High, // 204.38
  week52Low // 113.95
}) {
  return (
    <div className="stock">
      <img src={logo} id="logo" alt="company logo" />
      <h3>{symbol}: {companyName}</h3>
      <p>{latestPrice} ({latestSource})</p>
      <table className="table">
        <tbody>
          <tr>
            <th>Week 52 high</th>
            <th>Week52 low</th>
          </tr>
          <tr>
            <td>{week52High}</td>
            <td>{week52Low}</td>
          </tr>
        </tbody>
      </table>
      <p className="mark">Exchanges: {primaryExchange}</p>
    </div>
  )
}

export default StockInfo