import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart({
  chartData
}) {
  const data = chartData
  return (
    <div className="chart">
      <LineChart width={600} height={300} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis dataKey="close" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="close" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default Chart