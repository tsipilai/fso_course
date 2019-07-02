import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
	return (
		<button onClick={onClick}>{text}</button>
	)
}
const Display = ({value, counter}) => {
	return (
		<tr>
			<td>{value}</td>
			<td>{counter}</td>
		</tr>
	)
}
const Statistics = ({counterGood, counterNeutral, counterBad}) => {

	const counterSum = counterGood + counterNeutral + counterBad

	return (
		<div>
			<h1>Statistics</h1>
			{counterSum !== 0 ?  
				<div>
					<table>
						<tbody>
							<Display value="Good" counter={counterGood} />
							<Display value="Neutral" counter={counterNeutral} />
							<Display value="Bad" counter={counterBad} />
							<Display value="All" counter={counterSum} /> 
							<Display value="Average" counter={(counterGood - counterBad) / counterSum} /> 
							<Display value="Positive" counter={(counterGood) / counterSum * 100} /> 
						</tbody>
					</table>
				</div>
			 : 
				<p>not loaded</p>
			}

		</div>
	)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const setToGood = (value) => setGood(value)
	const setToNeutral = (value) => setNeutral(value)
	const setToBad = (value) => setBad(value)

  return (
    <div>
      <h1>Give feedback</h1>
			<Button onClick={() => setToGood(good + 1)} text="good" />
			<Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setToBad(bad + 1)} text="bad" />
			<Statistics 
			counterGood={good}
			counterNeutral={neutral}
			counterBad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)