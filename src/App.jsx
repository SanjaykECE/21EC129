import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('primes'); // default to 'p' for prime numbers
  const [result, setResult] = useState(0);
  const [response, setResponse] = useState([]);
  const [prevSt, setPrevSt] = useState([]);
  const [currSt, setCurrSt] = useState([]);

  const fetchAverage = async () => {
    // Check if numberId is not null or undefined before making the API call
    if (numberId) {
      try {
        const response = await fetch(`http://20.244.56.144/numbers/${numberId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data?.numbers?.length > 0) {
          setResponse(data.numbers);
          setCurrSt((pre) => {
            setPrevSt(pre);
            let sm = 0;
            for(let i = 0; i < data.numbers.length; i++) {
              sm = sm + data.numbers[i];
            }
            setResult(sm);
            return (
              data?.numbers
            )
          })
        }
      } catch (error) {
        console.error(error);
        setResult({ error: error.message });
      }
    } else {
      // Handle the condition where numberId is not set, e.g., by setting a specific result or doing nothing
      console.log('No numberId selected, skipping fetch.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
          <h2>Select Number Type</h2>
         <select value={numberId} onChange={e => setNumberId(e.target.value)}>
          <option value="primes">Prime</option>
          <option value="fibo">Fibonacci</option>
          <option value="even">Even</option>
          <option value="rand">Random</option>
        </select>
        <button onClick={fetchAverage}>Calculate Average</button>
        {result > 0 && (
          <div>
            <p>Window Previous State: {JSON.stringify(prevSt)}</p>
            <p>Window Current State: {JSON.stringify(currSt)}</p>
            <p>Numbers: {JSON.stringify(response)}</p>
            <p>Average: {result}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;