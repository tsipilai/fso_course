import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick}) => {
	return (
		<button onClick={onClick}>Moi</button>
	)
}
const Display = ({value, counter}) => {
	return (
		<p>{value} : {counter}</p>
	)
}
const Statistics = ({counterGood, counterNeutral, counterBad}) => {

	const counterSum = counterGood + counterNeutral + counterBad

	return (
		<div>
			<h1>Statistics</h1>
			<Display value="Good" counter={counterGood} />
			<Display value="Neutral" counter={counterNeutral} />
			<Display value="Bad" counter={counterBad} />
			<Display value="All" counter={counterSum} /> 
			<Display value="Average" counter={counterSum / 3} /> 
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
			<Button onClick={() => setToGood(good + 1)} />
			<Button onClick={() => setToNeutral(neutral + 1)} />
			<Button onClick={() => setToBad(bad + 1)} />
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