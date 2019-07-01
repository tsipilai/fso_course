import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
	console.log(props)
	return (
		<button onClick={props.onClick}>Moi</button>
	)
}
const Display = ({value, counter}) => {
	return (
		<p>{value} : {counter}</p>
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
			<h1>Statistics</h1>
			<Display value="Good" counter={good} />
			<Display value="Neutral" counter={neutral} />
			<Display value="Bad" counter={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)