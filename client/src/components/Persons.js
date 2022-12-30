

import React from 'react'

const Persons = ({ persons, removeName }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => 
              <tr key={person.name}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td><button onClick={() => removeName(person)}>remove</button></td>
              </tr>
          )}
        </tbody>
      </table>
    )
  }

export default Persons