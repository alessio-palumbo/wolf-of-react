import React from 'react'

function StockNews({
  datetime,
  headline,
  source,
  url,
  summary
}) {
  return (
    <div className='news'>
      <p className='small text-right'>{datetime}</p>
      <h6><strong>{headline}</strong></h6>
      <p className='small'>{source}</p>
      <p className='small'>{summary}</p>
      <hr />
    </div>
  )
}

export default StockNews