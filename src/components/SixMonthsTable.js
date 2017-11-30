import React from 'react'

function SixMonthsTable({
  date,
  open,
  high,
  low,
  close,
  change
}) {
  return (
    <tr className="chart-tr">
      <td>{date}</td>
      <td>{open}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td>{close}</td>
      <td>{change}</td>
    </tr>
  )
}

export default SixMonthsTable