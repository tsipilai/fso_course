import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const Displays = () =>  props.parts.map((part) => 
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  )
  return  (
    <div>
      <Displays />
    </div>
  )
}

const Header = (props) => {
  return  (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {

  const Total = () => props.value.reduce((s, p) => {
    return s + p.exercises
  }, 0)
 


  

  return (
    <div>
      <p>Number of exercises <Total /></p>
      
    </div>
  )
}

const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <Header course={course.name} />   
      <Content parts={course.parts} />
      <Total value={course.parts} /> 
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

