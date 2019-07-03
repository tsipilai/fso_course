import React from 'react'

const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Content = (props) => {
    const displays = props.parts.map((part) => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
    return  (
      <div>
        {displays}
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
        <b>Number of exercises <Total /></b>
        
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

  export default Course 