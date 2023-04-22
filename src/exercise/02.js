// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = ({key, initialValue}) => {
  const someExpensiveComputation = () => {
    const receivedValue =  window.localStorage.getItem(key) ?? initialValue;
    return receivedValue;
  }

  const [value, setValue] = React.useState(someExpensiveComputation);

  React.useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value])

  return [value, setValue];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState({key: "name", initialName});

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='Sam' />
}

export default App
